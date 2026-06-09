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
  'window.activeBorder': '#334155',
  'window.inactiveBorder': '#1e293b',
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
  'dropdown.background': '#111827',
  'button.secondaryBackground': '#261d3a',
  'button.secondaryForeground': '#c8b8e8',
  'statusBar.background': '#0e0919',
  'statusBar.foreground': '#b8a8d8',
  'tab.activeBackground': '#120c1e',
  'tab.activeForeground': '#e8e0f0',
  'terminal.background': '#0e0919',
  'terminal.foreground': '#e8e0f0',
  'multiDiffEditor.background': '#020617',
  'multiDiffEditor.headerBackground': '#0f172a',
  'multiDiffEditor.border': '#334155',
  'mergeEditor.change.background': '#312e8130',
  'mergeEditor.change.word.background': '#312e8150',
  'mergeEditor.conflict.unhandledUnfocused.border': '#f8717180',
  'mergeEditor.conflict.unhandledFocused.border': '#f87171',
  'mergeEditor.conflict.handledUnfocused.border': '#22c55e80',
  'mergeEditor.conflict.handledFocused.border': '#22c55e',
  'mergeEditor.conflictingLines.background': '#312e8130',
  'terminal.inactiveSelectionBackground': '#312e8130',
  'terminal.findMatchBackground': '#312e8180',
  'terminal.findMatchBorder': '#a78bfa',
  'terminal.findMatchHighlightBackground': '#312e8150',
  'terminal.findMatchHighlightBorder': '#8b5cf6',
  'terminal.tab.activeBorder': '#a78bfa',
  'terminalStickyScroll.background': '#020617',
  'terminalStickyScroll.border': '#334155',
  'terminalStickyScrollHover.background': '#0f172a',
  'inlineChat.foreground': '#f8fafc',
  'inlineChatInput.background': '#0f172a',
  'inlineChatInput.border': '#334155',
  'inlineChatInput.focusBorder': '#8b5cf6',
  'inlineChatDiff.inserted': '#22c55e30',
  'inlineChatDiff.removed': '#f8717130',
  'chat.avatarBackground': '#312e81',
  'chat.avatarForeground': '#ffffff',
  'chat.linesAddedForeground': '#22c55e',
  'chat.linesRemovedForeground': '#f87171',
  'chat.requestBubbleBackground': '#1e293b',
  'chat.requestBubbleHoverBackground': '#334155',
  'interactive.activeCodeBorder': '#8b5cf6',
  'interactive.inactiveCodeBorder': '#334155',
  'notebook.editorBackground': '#020617',
  'notebook.cellBorderColor': '#334155',
  'notebook.cellEditorBackground': '#0f172a',
  'notebook.focusedCellBorder': '#8b5cf6',
  'notebook.focusedEditorBorder': '#a78bfa',
  'notebook.outputContainerBackgroundColor': '#020617',
  'notebook.outputContainerBorderColor': '#334155',
  'notebookStatusErrorIcon.foreground': '#f87171',
  'notebookStatusRunningIcon.foreground': '#facc15',
  'notebookStatusSuccessIcon.foreground': '#22c55e',
  'commandCenter.background': '#111827',
  'commandCenter.activeBackground': '#1f2937',
  'commandCenter.border': '#334155',
  'editorStickyScroll.background': '#020617',
  'editorStickyScroll.border': '#334155',
  'settings.headerForeground': '#f8fafc',
  'settings.modifiedItemIndicator': '#8b5cf6',
  'editorMultiCursor.primary.foreground': '#a78bfa',
  'editorMultiCursor.secondary.foreground': '#a78bfa80',
  'editorIndentGuide.background1': '#334155',
  'editorIndentGuide.activeBackground1': '#475569'
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
  test('accepts all 12 checked-in theme variants', () => {
    expect(validateThemes()).toBe(12)
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

  test('rejects low contrast after alpha foreground compositing', () => {
    const file = writeTheme(
      'low-contrast-alpha', makeTheme({
        'editor.background': '#ffffff',
        'editor.foreground': '#00000020'
      })
    )

    expect(() => validateThemes([file])).toThrow(/editor\.foreground on editor\.background contrast/)
  })

  test('rejects missing color required for contrast check with a descriptive error', () => {
    const colors = { ...completeColors }

    delete colors['statusBar.foreground']

    expect(() => validateThemes([writeTheme('missing-contrast-color', { ...makeTheme(), colors })])).toThrow(
      /missing colors\.statusBar\.foreground/
    )
  })

  test('applies decorative floor to semantic punctuation tokens', () => {
    // #686868 on #020617 is ~3.6:1 — passes the 3.0 decorative floor but not the 4.5 WCAG AA floor
    const theme = makeTheme({ 'editor.background': '#020617', 'editor.foreground': '#f8fafc' })

    theme.semanticTokenColors = { punctuation: '#686868' }

    expect(() => validateThemes([writeTheme('semantic-punctuation', theme)])).not.toThrow()
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

  test('rejects color key drift across variants', () => {
    const base = writeTheme('base', makeTheme())

    const driftedColors = {
      ...completeColors,
      'custom.extraColor': '#ffffff'
    }

    const drifted = writeTheme('drifted', {
      ...makeTheme(),
      colors: driftedColors
    })

    expect(() => validateThemes([base, drifted])).toThrow(
      /drifted\.json colors must match .*base\.json: extra custom\.extraColor/
    )
  })
})
