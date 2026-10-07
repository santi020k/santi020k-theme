import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { describe, expect, test } from 'vitest'

import { validateXcodeTheme } from '../scripts/theme-validation.mjs'

// cspell:ignore xccolortheme

const readTheme = appearance => readFileSync(resolve(import.meta.dirname, '..', 'themes', `Santi020k ${appearance}.xccolortheme`), 'utf8')

const replaceColor = (contents, key, color) => contents.replace(
  new RegExp(`(<key>${key.replaceAll('.', '\\.')}</key>\\s*<string>)[^<]*(</string>)`),
  `$1${color}$2`
)

describe('native Xcode artifact contrast', () => {
  test.each(['Dark', 'Light'])('accepts %s editor, highlighted syntax, and console text', appearance => {
    expect(() => validateXcodeTheme(readTheme(appearance))).not.toThrow()
  })

  test('rejects unreadable serialized plain text rather than checking a hard-coded palette', () => {
    const theme = replaceColor(readTheme('Dark'), 'xcode.syntax.plain', '0.05 0.04 0.08 1')

    expect(() => validateXcodeTheme(theme)).toThrow(/xcode.syntax.plain on DVTSourceTextBackground contrast/)
  })

  test('rejects syntax that passes on the canvas but becomes unreadable on selection', () => {
    // Original dark violet keyword color was readable on the canvas, but 3.69:1 on selection.
    const theme = replaceColor(readTheme('Dark'), 'xcode.syntax.keyword', '0.607843 0.411765 0.964706 1')

    expect(() => validateXcodeTheme(theme)).toThrow(/DVTSourceTextSelectionColor contrast/)
  })

  test('rejects invalid native RGB channels', () => {
    const theme = replaceColor(readTheme('Light'), 'xcode.syntax.keyword', '2 0 0 1')

    expect(() => validateXcodeTheme(theme)).toThrow(/opaque RGB color/)
  })

  test('rejects missing debug-console text roles', () => {
    const theme = readTheme('Dark').replace('<key>DVTConsoleDebuggerPromptTextColor</key>', '<key>MissingColor</key>')

    expect(() => validateXcodeTheme(theme)).toThrow(/missing DVTConsoleDebuggerPromptTextColor/)
  })
})
