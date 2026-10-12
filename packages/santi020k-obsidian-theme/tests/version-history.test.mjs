import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

import { afterEach, describe, expect, it } from 'vitest'

import { buildObsidianTheme } from '../scripts/build.mjs'

const directories = []

afterEach(() => {
  for (const directory of directories.splice(0)) rmSync(directory, { recursive: true, force: true })
})

const fixture = history => {
  const directory = mkdtempSync(join(tmpdir(), 'obsidian-history-'))
  const root = pathToFileURL(`${directory}/`)

  directories.push(directory)

  writeFileSync(new URL('package.json', root), JSON.stringify({ version: '0.2.0' }))

  writeFileSync(new URL('versions.json', root), history)

  writeFileSync(new URL('theme.css', root), 'previous theme')

  return root
}

describe('Obsidian release compatibility history', () => {
  it('preserves older app minima while adding the next release idempotently', () => {
    const root = fixture(JSON.stringify({ '0.1.0': '1.8.0' }))

    buildObsidianTheme(root)

    const result = readFileSync(new URL('versions.json', root), 'utf8')

    expect(JSON.parse(result)).toEqual({ '0.1.0': '1.8.0', '0.2.0': '1.10.6' })

    expect(JSON.parse(readFileSync(new URL('manifest.json', root), 'utf8'))).toMatchObject({ version: '0.2.0', minAppVersion: '1.10.6' })

    buildObsidianTheme(root)

    expect(readFileSync(new URL('versions.json', root), 'utf8')).toBe(result)
  })

  it('initializes the first version from an empty history', () => {
    const root = fixture('{}')

    buildObsidianTheme(root)

    expect(JSON.parse(readFileSync(new URL('versions.json', root), 'utf8'))).toEqual({ '0.2.0': '1.10.6' })
  })

  it.each(['null', '[]', '{', '{"invalid":"1.8.0"}', '{"0.1.0":17}', '{"0.1.0":"invalid"}'])('rejects corrupt history without overwriting artifacts: %s', source => {
    const root = fixture(source)

    expect(() => buildObsidianTheme(root)).toThrow()

    expect(readFileSync(new URL('versions.json', root), 'utf8')).toBe(source)

    expect(readFileSync(new URL('theme.css', root), 'utf8')).toBe('previous theme')
  })
})
