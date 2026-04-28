import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, test } from 'vitest'

import { validateThemes } from '../scripts/validate-themes.mjs'

const tempDirs = []

const completeColors = {
  foreground: '#f8fafc',
  descriptionForeground: '#cbd5e1',
  errorForeground: '#f87171',
  'editor.background': '#020617',
  'editor.foreground': '#f8fafc',
  'editorWidget.background': '#0f172a',
  'editorWidget.foreground': '#f8fafc',
  'editorHoverWidget.background': '#111827',
  'editorSuggestWidget.background': '#111827',
  'input.background': '#0f172a',
  'input.foreground': '#f8fafc',
  'button.background': '#312e81',
  'button.foreground': '#ffffff',
  'quickInput.background': '#111827',
  'quickInput.foreground': '#f8fafc',
  'notifications.background': '#111827',
  'notifications.foreground': '#f8fafc',
  'textLink.foreground': '#a78bfa',
  'checkbox.background': '#111827',
  'dropdown.background': '#111827'
}

const writeTheme = (name, theme) => {
  const dir = mkdtempSync(join(tmpdir(), 'santi-theme-'))
  const file = join(dir, `${name}.json`)

  tempDirs.push(dir)

  writeFileSync(file, JSON.stringify(theme, null, 2))

  return file
}

const makeTheme = colors => ({
  name: 'Fixture Theme',
  type: 'dark',
  colors: {
    ...completeColors,
    ...colors
  },
  semanticHighlighting: true,
  tokenColors: []
})

afterEach(() => {
  while (tempDirs.length > 0) {
    rmSync(tempDirs.pop(), {
      force: true,
      recursive: true
    })
  }
})

describe('theme validation', () => {
  test('accepts the checked-in dark and light themes', () => {
    expect(validateThemes()).toBe(2)
  })

  test('rejects missing required color coverage', () => {
    const colors = { ...completeColors }

    delete colors['quickInput.background']

    expect(() => validateThemes([writeTheme('missing-color', { ...makeTheme(), colors })])).toThrow(
      /missing colors\.quickInput\.background/
    )
  })

  test('rejects invalid color values', () => {
    const file = writeTheme('invalid-color', makeTheme({ 'button.background': 'indigo' }))

    expect(() => validateThemes([file])).toThrow(/button\.background has invalid hex color indigo/)
  })

  test('rejects low contrast foreground and background pairs', () => {
    const file = writeTheme(
      'low-contrast', makeTheme({
        'editor.background': '#111111',
        'editor.foreground': '#151515',
        foreground: '#151515'
      })
    )

    expect(() => validateThemes([file])).toThrow(/editor\.foreground on editor\.background contrast/)
  })

  test('rejects duplicate workbench color keys before JSON parsing hides them', () => {
    const file = writeTheme('duplicate-color', makeTheme())

    const raw = `{
  "name": "Duplicate Color Fixture",
  "type": "dark",
  "colors": {
    "foreground": "#ffffff",
    "foreground": "#eeeeee"
  },
  "semanticHighlighting": true,
  "tokenColors": []
}
`

    writeFileSync(file, raw)

    expect(() => validateThemes([file])).toThrow(/duplicate color keys: foreground/)
  })
})
