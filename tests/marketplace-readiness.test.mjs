import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { afterEach, describe, expect, test } from 'vitest'

import { checkMarketplaceReadiness, requiredIgnorePatterns } from '../scripts/check-marketplace-readiness.mjs'

const tempDirs = []

const packageJson = {
  name: 'santi020k-theme',
  displayName: 'Santi020k Theme',
  description: 'Fixture package',
  version: '1.2.0',
  publisher: 'santi020k',
  homepage: 'https://theme.santi020k.com',
  repository: {
    type: 'git',
    url: 'https://github.com/santi020k/santi020k-theme'
  },
  bugs: {
    url: 'https://github.com/santi020k/santi020k-theme/issues'
  },
  sponsor: {
    url: 'https://github.com/sponsors/santi020k'
  },
  license: 'MIT',
  engines: {
    vscode: '^1.75.0'
  },
  extensionKind: ['ui', 'workspace'],
  capabilities: {
    untrustedWorkspaces: {
      supported: true
    },
    virtualWorkspaces: true
  },
  categories: ['Themes'],
  keywords: [
    'theme',
    'color-theme',
    'dark',
    'dark-theme',
    'light',
    'light-theme',
    'high-contrast',
    'purple',
    'indigo',
    'semantic'
  ],
  icon: 'icon.png',
  galleryBanner: {
    color: '#120c1e',
    theme: 'dark'
  },
  contributes: {
    themes: [
      {
        label: 'santi020k dark',
        uiTheme: 'vs-dark',
        path: './themes/santi020k-dark-color-theme.json'
      },
      {
        label: 'santi020k light',
        uiTheme: 'vs',
        path: './themes/santi020k-light-color-theme.json'
      },
      {
        label: 'santi020k hc dark',
        uiTheme: 'hc-black',
        path: './themes/santi020k-hc-dark-color-theme.json'
      }
    ]
  }
}

const writeFile = (root, path, content = '') => {
  const file = join(root, path)

  mkdirSync(dirname(file), { recursive: true })

  writeFileSync(file, content)
}

const pngHeader = (width = 128, height = 128) => {
  const buffer = Buffer.alloc(24)

  buffer.writeUInt32BE(0x89504e47, 0)

  buffer.writeUInt32BE(width, 16)

  buffer.writeUInt32BE(height, 20)

  return buffer
}

const createFixturePackage = ({
  ignorePatterns = requiredIgnorePatterns,
  icon = pngHeader(),
  lockVersion = packageJson.version,
  pkg = packageJson
} = {}) => {
  const root = mkdtempSync(join(tmpdir(), 'santi-marketplace-'))

  tempDirs.push(root)

  for (const file of [
    'README.md',
    'CHANGELOG.md',
    'LICENSE',
    'assets/preview-dark.png',
    'assets/preview-hc-dark.png',
    'assets/preview-light.png',
    'themes/santi020k-dark-color-theme.json',
    'themes/santi020k-hc-dark-color-theme.json',
    'themes/santi020k-light-color-theme.json',
    '.agents/skills/vscode-theme-maintainer/SKILL.md',
    '.agents/skills/marketplace-release-manager/SKILL.md',
    '.agents/skills/theme-accessibility-auditor/SKILL.md',
    '.agents/skills/repo-ci-triager/SKILL.md'
  ]) {
    writeFile(root, file)
  }

  writeFile(
    root, 'website/index.html', `<script type="application/ld+json">{ "softwareVersion": "${pkg.version}" }</script>`
  )

  writeFile(root, '.vscodeignore', `${ignorePatterns.join('\n')}\n`)

  writeFile(root, 'package.json', JSON.stringify(pkg, null, 2))

  writeFile(
    root, 'package-lock.json', JSON.stringify(
      {
        version: lockVersion,
        packages: {
          '': {
            version: lockVersion
          }
        }
      }, null, 2
    )
  )

  writeFile(root, 'icon.png', icon)

  return root
}

afterEach(() => {
  while (tempDirs.length > 0) {
    rmSync(tempDirs.pop(), {
      force: true,
      recursive: true
    })
  }
})

describe('marketplace readiness', () => {
  test('accepts the checked-in package metadata and release files', () => {
    expect(checkMarketplaceReadiness()).toBe(true)
  })

  test('accepts a complete fixture package', () => {
    expect(checkMarketplaceReadiness(createFixturePackage())).toBe(true)
  })

  test('rejects missing VSIX ignore coverage', () => {
    const ignorePatterns = requiredIgnorePatterns.filter(pattern => pattern !== 'tests/**')

    expect(() => checkMarketplaceReadiness(createFixturePackage({ ignorePatterns }))).toThrow(
      /.vscodeignore should exclude tests\/\*\*/
    )
  })

  test('rejects mismatched package-lock versions', () => {
    expect(() => checkMarketplaceReadiness(createFixturePackage({ lockVersion: '1.1.0' }))).toThrow(
      /package-lock\.json version does not match package\.json/
    )
  })

  test('rejects missing high contrast theme contribution', () => {
    const pkg = {
      ...packageJson,
      contributes: {
        themes: packageJson.contributes.themes.filter(theme => theme.uiTheme !== 'hc-black')
      }
    }

    expect(() => checkMarketplaceReadiness(createFixturePackage({ pkg }))).toThrow(
      /package\.json must contribute \.\/themes\/santi020k-hc-dark-color-theme\.json/
    )
  })

  test('rejects mismatched website structured-data version', () => {
    const root = createFixturePackage()

    writeFile(
      root, 'website/index.html', '<script type="application/ld+json">{ "softwareVersion": "0.0.0" }</script>'
    )

    expect(() => checkMarketplaceReadiness(root)).toThrow(
      /website JSON-LD softwareVersion must match package\.json version/
    )
  })

  test('rejects non-128px marketplace icons', () => {
    expect(() => checkMarketplaceReadiness(createFixturePackage({ icon: pngHeader(512, 512) }))).toThrow(
      /icon\.png must be 128x128; found 512x512/
    )
  })

  test('rejects unsupported virtual workspace metadata', () => {
    const pkg = {
      ...packageJson,
      capabilities: {
        ...packageJson.capabilities,
        virtualWorkspaces: false
      }
    }

    expect(() => checkMarketplaceReadiness(createFixturePackage({ pkg }))).toThrow(
      /must declare support for virtual workspaces/
    )
  })
})
