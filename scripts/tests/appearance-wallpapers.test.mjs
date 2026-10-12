import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vitest'

import { wallpaperDesigns } from '../../artwork/wallpaper-catalog.mjs'

const root = new URL('../../', import.meta.url)
const file = path => fileURLToPath(new URL(path, root))
const hash = path => createHash('sha256').update(readFileSync(file(path))).digest('hex')
const script = file('scripts/wallpapers/appearance.swift')
const light = file('artwork/minimal-v2/halo-light-desktop.png')
const dark = file('artwork/minimal-v2/halo-dark-desktop.png')

describe('paired macOS wallpapers', () => {
  it('ships every catalog design with fingerprints of its current source pair and generator', () => {
    const expected = {
      generator: hash('scripts/wallpapers/appearance.swift'),
      entries: wallpaperDesigns.map(design => ({
        slug: design.slug,
        file: `${design.slug}.heic`,
        sourceHashes: ['light', 'dark'].map(mode => hash(`artwork/${design.directory}/${design.family}-${mode}-desktop.png`)),
        sha256: hash(`artwork/appearance/${design.slug}.heic`)
      }))
    }

    expect(JSON.parse(readFileSync(file('artwork/appearance/manifest.json'), 'utf8'))).toEqual(expected)
  })

  it.skipIf(process.platform !== 'darwin')('round trips through ImageIO and rejects reversed, missing, and non-HEIC inputs', () => {
    const temporary = mkdtempSync(join(tmpdir(), 'theme-appearance-'))
    const output = join(temporary, 'wallpaper.heic')
    const run = args => spawnSync('swift', [script, ...args], { encoding: 'utf8' })

    try {
      const built = run(['build', light, dark, output])

      expect(built.stderr).toBe('')

      expect(built.status).toBe(0)

      expect(run(['check', light, dark, output]).status).toBe(0)

      expect(run(['check', dark, light, output]).stderr).toContain('does not match its source')

      expect(run(['check', light, dark, light]).stderr).toContain('Expected HEIC')

      expect(run(['build', join(temporary, 'missing.png'), dark, output]).status).not.toBe(0)

      expect(run([]).stderr).toContain('Usage:')
    } finally {
      rmSync(temporary, { recursive: true, force: true })
    }
  }, 60000)
})
