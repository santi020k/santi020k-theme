import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, test } from 'vitest'

import { syncWebsiteVersion } from '../scripts/sync-website-version.mjs'

const tempDirs = []

const createFixture = ({ htmlVersion = '0.0.0', packageVersion = '9.8.7' } = {}) => {
  const root = mkdtempSync(join(tmpdir(), 'santi-sync-version-'))

  tempDirs.push(root)

  mkdirSync(join(root, 'website/src/pages'), { recursive: true })

  const packagePath = join(root, 'package.json')
  const websitePath = join(root, 'website/src/pages/index.astro')

  writeFileSync(packagePath, JSON.stringify({ version: packageVersion }, null, 2))

  writeFileSync(
    websitePath, `<script type="application/ld+json">{ "softwareVersion": "${htmlVersion}" }</script>`
  )

  return {
    packagePath,
    websitePath
  }
}

afterEach(() => {
  while (tempDirs.length > 0) {
    rmSync(tempDirs.pop(), {
      force: true,
      recursive: true
    })
  }
})

describe('website version sync', () => {
  test('updates JSON-LD softwareVersion from package.json', () => {
    const fixture = createFixture()

    expect(syncWebsiteVersion(fixture)).toBe('9.8.7')

    expect(readFileSync(fixture.websitePath, 'utf8')).toContain('"softwareVersion": "9.8.7"')
  })

  test('updates single-quoted JavaScript metadata produced by ESLint formatting', () => {
    const fixture = createFixture('1.0.0', '1.0.0')

    writeFileSync(fixture.websitePath, '<script>{ softwareVersion: \'1.0.0\' }</script>')

    writeFileSync(fixture.packagePath, JSON.stringify({ version: '9.8.7' }))

    syncWebsiteVersion(fixture)

    expect(readFileSync(fixture.websitePath, 'utf8')).toContain('softwareVersion: \'9.8.7\'')
  })

  test('rejects website HTML without softwareVersion metadata', () => {
    const fixture = createFixture()

    writeFileSync(fixture.websitePath, '<main>No structured data here</main>')

    expect(() => syncWebsiteVersion(fixture)).toThrow(/missing JSON-LD softwareVersion/)
  })
})
