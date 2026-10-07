import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { describe, expect, test } from 'vitest'

import { validateZedTheme } from '../scripts/theme-validation.mjs'

const family = JSON.parse(readFileSync(resolve(import.meta.dirname, '..', 'themes', 'santi020k.json'), 'utf8'))
const makeTheme = () => structuredClone(family.themes[0])

describe('Zed native theme validation', () => {
  test.each(family.themes)('accepts $name', theme => {
    expect(() => validateZedTheme(theme)).not.toThrow()
  })

  test('rejects unsupported selection token', () => {
    const theme = makeTheme()

    theme.style.element_selection_background = '#945df466'

    expect(() => validateZedTheme(theme)).toThrow(/Unsupported Zed token/)
  })

  test('rejects invalid UI color', () => {
    const theme = makeTheme()

    theme.style.text = 'purple'

    expect(() => validateZedTheme(theme)).toThrow(/Invalid Zed color/)
  })

  test('rejects non-string UI colors', () => {
    const theme = makeTheme()

    theme.style.text = 123

    expect(() => validateZedTheme(theme)).toThrow(/Invalid Zed color/)
  })

  test('rejects invalid syntax foreground', () => {
    const theme = makeTheme()

    theme.style.syntax.keyword.color = '#gggggg'

    expect(() => validateZedTheme(theme)).toThrow(/Invalid Zed syntax color/)
  })
})
