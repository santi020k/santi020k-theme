import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, test } from 'vitest'

import { syncPluginVersion } from '../scripts/sync-plugin-version.mjs'

const tempDirs = []

const createFixture = ({ packageVersion = '9.8.7', pluginVersion = '0.1.0' } = {}) => {
  const root = mkdtempSync(join(tmpdir(), 'santi-jetbrains-version-'))
  const packagePath = join(root, 'package.json')
  const pluginPath = join(root, 'META-INF/plugin.xml')

  tempDirs.push(root)

  mkdirSync(join(root, 'META-INF'), { recursive: true })

  writeFileSync(packagePath, JSON.stringify({ version: packageVersion }, null, 2))

  writeFileSync(pluginPath, `<idea-plugin>\n  <version>${pluginVersion}</version>\n</idea-plugin>\n`)

  return { packagePath, pluginPath }
}

afterEach(() => {
  while (tempDirs.length > 0) {
    rmSync(tempDirs.pop(), { force: true, recursive: true })
  }
})

describe('JetBrains plugin version sync', () => {
  test('updates plugin.xml from package.json', () => {
    const fixture = createFixture()

    expect(syncPluginVersion(fixture)).toBe('9.8.7')

    expect(readFileSync(fixture.pluginPath, 'utf8')).toContain('<version>9.8.7</version>')
  })

  test('rejects plugin metadata without a version element', () => {
    const fixture = createFixture()

    writeFileSync(fixture.pluginPath, '<idea-plugin></idea-plugin>')

    expect(() => syncPluginVersion(fixture)).toThrow(/missing a plugin version/u)
  })
})
