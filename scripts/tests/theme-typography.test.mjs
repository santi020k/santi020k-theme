import { readFileSync } from 'node:fs'

import { describe, expect, it } from 'vitest'

import { fontFamily, typography } from '../../packages/theme/index.js'
import { tailwindTheme,theme } from '../../packages/theme/tailwind.js'

const readThemeFile = path => readFileSync(new URL(`../../packages/theme/${path}`, import.meta.url), 'utf8')

describe('public theme typography', () => {
  it('preserves a monospace stack across JavaScript and Tailwind consumers', () => {
    expect(typography.mono).toBe('"Fira Code", "SFMono-Regular", "SF Mono", monospace')

    expect(fontFamily.mono).toBe(typography.mono)

    expect(theme.fonts).toEqual(fontFamily)

    expect(tailwindTheme.fonts).toEqual(fontFamily)
  })

  it('keeps raw JSON tokens aligned with the JavaScript contract', () => {
    expect(JSON.parse(readThemeFile('tokens/tokens.json')).typography).toEqual(typography)
  })

  it.each(['typography.css', 'tokens/tokens.css'])('keeps the CSS font stack aligned in %s', path => {
    expect(readThemeFile(path)).toContain(`--santi020k-font-mono: ${typography.mono};`)
  })
})
