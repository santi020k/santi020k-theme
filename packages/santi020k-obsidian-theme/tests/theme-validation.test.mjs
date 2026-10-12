import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { validateObsidianTheme } from '../scripts/validate.mjs'

const css = readFileSync(new URL('../theme.css', import.meta.url), 'utf8')
const manifest = JSON.parse(readFileSync(new URL('../manifest.json', import.meta.url), 'utf8'))

describe('Obsidian installation artifacts', () => {
  it('supports both appearances with readable code and selected text', () => {
    expect(() => validateObsidianTheme(css, manifest)).not.toThrow()
  })

  it('rejects missing modes and unreadable selected text', () => {
    expect(() => validateObsidianTheme(css.replace('.theme-light', '.missing'), manifest)).toThrow()

    expect(() => validateObsidianTheme(css.replace(/--text-selection: #[\da-f]+;/, '--text-selection: #dfdde3;'), manifest)).toThrow()
  })

  it('rejects remote resources and invalid installation metadata', () => {
    expect(() => validateObsidianTheme(css + '@import "https://example.com/font.css";', manifest)).toThrow()

    expect(() => validateObsidianTheme(css, { ...manifest, version: 'latest' })).toThrow()
  })
})
