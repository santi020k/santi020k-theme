import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const themeFiles = [
  'themes/santi020k-dark-color-theme.json',
  'themes/santi020k-light-color-theme.json',
  'themes/santi020k-hc-dark-color-theme.json'
]

const requiredColorKeys = [
  'foreground',
  'descriptionForeground',
  'errorForeground',
  'window.activeBorder',
  'window.inactiveBorder',
  'editor.background',
  'editor.foreground',
  'editorWidget.background',
  'editorWidget.foreground',
  'editorHoverWidget.background',
  'editorSuggestWidget.background',
  'input.background',
  'input.foreground',
  'button.background',
  'button.foreground',
  'button.secondaryBackground',
  'button.secondaryForeground',
  'quickInput.background',
  'quickInput.foreground',
  'notifications.background',
  'notifications.foreground',
  'textLink.foreground',
  'checkbox.background',
  'dropdown.background',
  'statusBar.background',
  'statusBar.foreground',
  'tab.activeBackground',
  'tab.activeForeground',
  'terminal.background',
  'terminal.foreground'
]

const modernSurfaceColorKeys = [
  'multiDiffEditor.background',
  'multiDiffEditor.headerBackground',
  'multiDiffEditor.border',
  'mergeEditor.change.background',
  'mergeEditor.change.word.background',
  'mergeEditor.conflict.unhandledUnfocused.border',
  'mergeEditor.conflict.unhandledFocused.border',
  'mergeEditor.conflict.handledUnfocused.border',
  'mergeEditor.conflict.handledFocused.border',
  'mergeEditor.conflictingLines.background',
  'terminal.inactiveSelectionBackground',
  'terminal.findMatchBackground',
  'terminal.findMatchBorder',
  'terminal.findMatchHighlightBackground',
  'terminal.findMatchHighlightBorder',
  'terminal.tab.activeBorder',
  'terminalStickyScroll.background',
  'terminalStickyScroll.border',
  'terminalStickyScrollHover.background',
  'inlineChat.foreground',
  'inlineChatInput.background',
  'inlineChatInput.border',
  'inlineChatInput.focusBorder',
  'inlineChatDiff.inserted',
  'inlineChatDiff.removed',
  'chat.avatarBackground',
  'chat.avatarForeground',
  'chat.linesAddedForeground',
  'chat.linesRemovedForeground',
  'chat.requestBubbleBackground',
  'chat.requestBubbleHoverBackground',
  'interactive.activeCodeBorder',
  'interactive.inactiveCodeBorder',
  'notebook.editorBackground',
  'notebook.cellBorderColor',
  'notebook.cellEditorBackground',
  'notebook.focusedCellBorder',
  'notebook.focusedEditorBorder',
  'notebook.outputContainerBackgroundColor',
  'notebook.outputContainerBorderColor',
  'notebookStatusErrorIcon.foreground',
  'notebookStatusRunningIcon.foreground',
  'notebookStatusSuccessIcon.foreground'
]

const contrastPairs = [
  ['editor.foreground', 'editor.background', 4.5],
  ['foreground', 'editor.background', 4.5],
  ['input.foreground', 'input.background', 4.5],
  ['button.foreground', 'button.background', 4.5],
  ['quickInput.foreground', 'quickInput.background', 4.5],
  ['notifications.foreground', 'notifications.background', 4.5],
  ['terminal.foreground', 'terminal.background', 4.5],
  ['statusBar.foreground', 'statusBar.background', 4.5],
  ['tab.activeForeground', 'tab.activeBackground', 4.5],
  ['button.secondaryForeground', 'button.secondaryBackground', 4.5]
]

// Minimum contrast for syntax token foreground against editor.background.
// Decorative tokens (comments, punctuation) get a lower floor since they are
// intentionally de-emphasised; all other syntax tokens must meet WCAG AA.
const DECORATIVE_TOKEN_MIN_RATIO = 3
const SYNTAX_TOKEN_MIN_RATIO = 4.5

const isDecorativeScope = scope => (
  scope === 'comment' ||
  scope.startsWith('comment.') ||
  scope === 'punctuation' ||
  scope.startsWith('punctuation.') ||
  // Blockquotes are intentionally secondary content in markdown editors
  scope === 'markup.quote' ||
  // Deprecated markers rely on strikethrough as their primary visual signal
  scope === 'invalid.deprecated'
)

const hexColorPattern = /^#(?:[0-9a-f]{6}|[0-9a-f]{8})$/i

const parseHex = hex => {
  const value = hex.slice(1, 7)
  const alpha = hex.length === 9 ? Number.parseInt(hex.slice(7, 9), 16) / 255 : 1

  return {
    alpha,
    rgb: [
      Number.parseInt(value.slice(0, 2), 16),
      Number.parseInt(value.slice(2, 4), 16),
      Number.parseInt(value.slice(4, 6), 16)
    ]
  }
}

const compositeRgb = (foreground, background) => foreground.rgb.map((channel, index) => (
  Math.round(channel * foreground.alpha + background.rgb[index] * (1 - foreground.alpha))
))

const resolveRgb = (foreground, background) => {
  if (foreground.alpha === 1) {
    return foreground.rgb
  }

  return compositeRgb(foreground, background)
}

const luminance = rgb => {
  const [red, green, blue] = rgb.map(channel => {
    const value = channel / 255

    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

const contrastRatio = (foreground, background) => {
  const backgroundColor = parseHex(background)

  const resolvedBackground = {
    alpha: 1,
    rgb: resolveRgb(backgroundColor, { alpha: 1, rgb: [255, 255, 255] })
  }

  const resolvedForeground = resolveRgb(parseHex(foreground), resolvedBackground)
  const lighter = Math.max(luminance(resolvedForeground), luminance(resolvedBackground.rgb))
  const darker = Math.min(luminance(resolvedForeground), luminance(resolvedBackground.rgb))

  return (lighter + 0.05) / (darker + 0.05)
}

const validateTokenContrast = (file, theme) => {
  const bg = theme.colors['editor.background']
  const errors = []

  for (const rule of (theme.tokenColors || [])) {
    const fg = rule.settings?.foreground

    if (!fg || !hexColorPattern.test(fg)) continue

    let scopes

    if (Array.isArray(rule.scope)) {
      scopes = rule.scope
    } else if (rule.scope) {
      scopes = [rule.scope]
    } else {
      scopes = []
    }

    const decorative = scopes.length > 0 && scopes.every(s => isDecorativeScope(s))
    const minRatio = decorative ? DECORATIVE_TOKEN_MIN_RATIO : SYNTAX_TOKEN_MIN_RATIO
    const ratio = contrastRatio(fg, bg)

    if (ratio < minRatio) {
      errors.push(
        `"${rule.name || scopes.join(', ')}" foreground ${fg}: ${ratio.toFixed(2)} (min ${minRatio})`
      )
    }
  }

  for (const [token, value] of Object.entries(theme.semanticTokenColors || {})) {
    const fg = typeof value === 'string' ? value : value?.foreground

    if (!fg || !hexColorPattern.test(fg)) continue

    const decorative = isDecorativeScope(token)
    const minRatio = decorative ? DECORATIVE_TOKEN_MIN_RATIO : SYNTAX_TOKEN_MIN_RATIO
    const ratio = contrastRatio(fg, bg)

    if (ratio < minRatio) {
      errors.push(
        `semantic "${token}" foreground ${fg}: ${ratio.toFixed(2)} (min ${minRatio})`
      )
    }
  }

  if (errors.length > 0) {
    throw new Error(`${file} has token contrast violations:\n  ${errors.join('\n  ')}`)
  }
}

const findDuplicateColorKeys = raw => {
  const colorsMatch = raw.match(/"colors"\s*:\s*\{/)

  if (!colorsMatch) return []

  // Walk the raw text from the opening { of the colors object, tracking brace
  // depth while skipping over string contents so escaped braces inside values
  // or comments don't corrupt the depth count.
  let i = colorsMatch.index + colorsMatch[0].length
  let depth = 1

  while (i < raw.length && depth > 0) {
    if (raw[i] === '"') {
      i++

      while (i < raw.length && raw[i] !== '"') {
        if (raw[i] === '\\') i++

        i++
      }
    } else if (raw[i] === '{') {
      depth++
    } else if (raw[i] === '}') {
      depth--
    }

    i++
  }

  const colorsBlock = raw.slice(colorsMatch.index + colorsMatch[0].length, i - 1)
  const seen = new Set()
  const duplicates = new Set()
  const keyPattern = /^\s*"([^"]+)"\s*:/gm
  let match

  while ((match = keyPattern.exec(colorsBlock))) {
    if (seen.has(match[1])) {
      duplicates.add(match[1])
    }

    seen.add(match[1])
  }

  return [...duplicates]
}

const validateHexMap = (file, colors) => {
  for (const [key, value] of Object.entries(colors)) {
    if (typeof value !== 'string') {
      throw new Error(`${file} colors.${key} must be a string color value`)
    }

    if (!hexColorPattern.test(value)) {
      throw new Error(`${file} colors.${key} has invalid hex color ${value}`)
    }
  }
}

const validateThemeColorParity = themes => {
  if (themes.length < 2) return

  const [baseTheme] = themes
  const baseKeys = new Set(Object.keys(baseTheme.theme.colors))

  for (const { file, theme } of themes.slice(1)) {
    const keys = new Set(Object.keys(theme.colors))
    const missing = [...baseKeys].filter(key => !keys.has(key)).sort()
    const extra = [...keys].filter(key => !baseKeys.has(key)).sort()

    if (missing.length > 0 || extra.length > 0) {
      const details = [
        missing.length > 0 ? `missing ${missing.join(', ')}` : '',
        extra.length > 0 ? `extra ${extra.join(', ')}` : ''
      ].filter(Boolean).join('; ')

      throw new Error(`${file} colors must match ${baseTheme.file}: ${details}`)
    }
  }
}

export const validateThemes = (files = themeFiles) => {
  const parsedThemes = []

  for (const file of files) {
    const raw = readFileSync(file, 'utf8')

    const cleanRaw = raw
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/^\s*\/\/.*$/gm, '')

    const theme = JSON.parse(cleanRaw)
    const duplicateColorKeys = findDuplicateColorKeys(raw)

    parsedThemes.push({ file, theme })

    if (!theme.name || !theme.type || !theme.colors || !theme.tokenColors) {
      throw new Error(`${file} is missing required theme sections`)
    }

    if (duplicateColorKeys.length > 0) {
      throw new Error(`${file} has duplicate color keys: ${duplicateColorKeys.join(', ')}`)
    }

    if (theme.semanticHighlighting !== true) {
      throw new Error(`${file} must enable semanticHighlighting`)
    }

    validateHexMap(file, theme.colors)

    for (const key of [...requiredColorKeys, ...modernSurfaceColorKeys]) {
      if (!theme.colors[key]) {
        throw new Error(`${file} is missing colors.${key}`)
      }
    }

    for (const [foregroundKey, backgroundKey, minimumRatio] of contrastPairs) {
      if (!theme.colors[foregroundKey] || !theme.colors[backgroundKey]) {
        throw new Error(
          `${file} is missing colors required for contrast check: ${[foregroundKey, backgroundKey].filter(k => !theme.colors[k]).join(', ')}`
        )
      }

      const ratio = contrastRatio(theme.colors[foregroundKey], theme.colors[backgroundKey])

      if (ratio < minimumRatio) {
        throw new Error(
          `${file} ${foregroundKey} on ${backgroundKey} contrast is ${ratio.toFixed(2)}; expected ${minimumRatio}`
        )
      }
    }

    validateTokenContrast(file, theme)
  }

  validateThemeColorParity(parsedThemes)

  return files.length
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(`Validated ${validateThemes()} theme files`)
}
