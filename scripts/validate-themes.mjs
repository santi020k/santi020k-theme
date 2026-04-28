import { readFileSync } from 'node:fs'

const themeFiles = [
  'themes/santi020k-dark-color-theme.json',
  'themes/santi020k-light-color-theme.json'
]

const requiredColorKeys = [
  'foreground',
  'descriptionForeground',
  'errorForeground',
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
  'quickInput.background',
  'quickInput.foreground',
  'notifications.background',
  'notifications.foreground',
  'textLink.foreground',
  'checkbox.background',
  'dropdown.background'
]

const contrastPairs = [
  ['editor.foreground', 'editor.background', 4.5],
  ['foreground', 'editor.background', 4.5],
  ['input.foreground', 'input.background', 4.5],
  ['button.foreground', 'button.background', 4.5],
  ['quickInput.foreground', 'quickInput.background', 4.5],
  ['notifications.foreground', 'notifications.background', 4.5]
]

const hexColorPattern = /^#(?:[0-9a-f]{6}|[0-9a-f]{8})$/i

const parseHex = (hex) => {
  const value = hex.slice(1, 7)
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16)
  ]
}

const luminance = (hex) => {
  const [red, green, blue] = parseHex(hex).map((channel) => {
    const value = channel / 255
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

const contrastRatio = (foreground, background) => {
  const lighter = Math.max(luminance(foreground), luminance(background))
  const darker = Math.min(luminance(foreground), luminance(background))
  return (lighter + 0.05) / (darker + 0.05)
}

const findDuplicateColorKeys = (raw) => {
  const colorsBlock = raw.match(/"colors"\s*:\s*\{([\s\S]*?)\n\s*\},\n\s*"(?:semanticHighlighting|tokenColors)"/)

  if (!colorsBlock) {
    return []
  }

  const seen = new Set()
  const duplicates = new Set()
  const keyPattern = /^\s*"([^"]+)"\s*:/gm
  let match

  while ((match = keyPattern.exec(colorsBlock[1]))) {
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

for (const file of themeFiles) {
  const raw = readFileSync(file, 'utf8')
  const theme = JSON.parse(raw)
  const duplicateColorKeys = findDuplicateColorKeys(raw)

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

  for (const key of requiredColorKeys) {
    if (!theme.colors[key]) {
      throw new Error(`${file} is missing colors.${key}`)
    }
  }

  for (const [foregroundKey, backgroundKey, minimumRatio] of contrastPairs) {
    const ratio = contrastRatio(theme.colors[foregroundKey], theme.colors[backgroundKey])

    if (ratio < minimumRatio) {
      throw new Error(
        `${file} ${foregroundKey} on ${backgroundKey} contrast is ${ratio.toFixed(2)}; expected ${minimumRatio}`
      )
    }
  }
}

console.log(`Validated ${themeFiles.length} theme files`)
