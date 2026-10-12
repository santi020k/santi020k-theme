import { readFileSync } from 'node:fs'

import { contrastRatio } from './color-contrast.mjs'

/** Keep native ports on the canonical palette, with opaque, readable selections. */
export const readPortPalette = appearance => {
  if (!['dark', 'light'].includes(appearance)) throw new Error('Unsupported appearance')

  const theme = JSON.parse(readFileSync(new URL(`../../packages/santi020k-theme/src/tokens/vscode/base-themes/${appearance}.json`, import.meta.url), 'utf8'))

  const color = name => {
    const value = theme.colors[name]

    if (!/^#[\da-f]{6}$/i.test(value)) throw new Error(`Expected opaque color: ${name}`)

    return value
  }

  const background = color('editor.background')
  const foreground = color('editor.foreground')
  const surface = color('editorWidget.background')
  const selection = color('editorSuggestWidget.selectedBackground')
  const backgrounds = [background, surface, selection]

  // Retain the hue while bringing faint source colors up to normal-text contrast
  // on native selections, which do not replace syntax foreground colors.
  const readable = value => {
    if (!/^#[\da-f]{6}$/i.test(value)) throw new Error('Expected opaque syntax color')

    for (let step = 0; step <= 100; step += 1) {
      const candidate = '#' + [1, 3, 5].map(offset => {
        const start = Number.parseInt(value.slice(offset, offset + 2), 16)
        const end = Number.parseInt(foreground.slice(offset, offset + 2), 16)

        return Math.round(start + (end - start) * step / 100).toString(16).padStart(2, '0')
      }).join('')

      if (backgrounds.every(bg => contrastRatio(candidate, bg) >= 4.5)) return candidate
    }

    throw new Error('Canonical foreground does not meet native port contrast')
  }

  const syntax = name => {
    const value = theme.semanticTokenColors[name]

    return readable(typeof value === 'string' ? value : value.foreground)
  }

  return {
    background, foreground, surface, selection,
    border: color('editorWidget.border'),
    muted: readable(color('descriptionForeground')),
    accent: readable(color('textLink.activeForeground')),
    button: color('button.background'),
    buttonText: color('button.foreground'),
    comment: syntax('comment'),
    keyword: syntax('keyword'),
    string: syntax('string'),
    number: syntax('number'),
    type: syntax('type'),
    function: syntax('function'),
    property: syntax('property'),
    operator: syntax('operator'),
    error: readable(color('editorError.foreground')),
    warning: readable(color('editorWarning.foreground')),
    success: readable(color('terminal.ansiGreen')),
    info: readable(color('terminal.ansiCyan')),
    terminal: ['Black', 'Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White',
      'BrightBlack', 'BrightRed', 'BrightGreen', 'BrightYellow', 'BrightBlue', 'BrightMagenta', 'BrightCyan', 'BrightWhite']
      .map(name => color(`terminal.ansi${name}`))
  }
}
