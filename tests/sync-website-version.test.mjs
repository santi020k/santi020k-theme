import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, test } from 'vitest'

import { syncWebsiteVersion } from '../scripts/sync-website-version.mjs'

const tempDirs = []

const createFixture = ({ htmlVersion = '0.0.0', packageVersion = '9.8.7' } = {}) => {
  const root = mkdtempSync(join(tmpdir(), 'santi-sync-version-'))

  tempDirs.push(root)

  mkdirSync(join(root, 'website'))

  const packagePath = join(root, 'package.json')
  const websitePath = join(root, 'website/index.html')

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

  test('rejects website HTML without softwareVersion metadata', () => {
    const fixture = createFixture()

    writeFileSync(fixture.websitePath, '<main>No structured data here</main>')

    expect(() => syncWebsiteVersion(fixture)).toThrow(/missing JSON-LD softwareVersion/)
  })
})
