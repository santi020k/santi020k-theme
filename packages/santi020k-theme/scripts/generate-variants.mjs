import { readFileSync, writeFileSync } from 'node:fs'

import { fromExtensionPackage } from './paths.mjs'

const baseThemes = [
  { file: fromExtensionPackage('themes/santi020k-dark-color-theme.json'), name: 'santi020k dark' },
  { file: fromExtensionPackage('themes/santi020k-light-color-theme.json'), name: 'santi020k light' },
  { file: fromExtensionPackage('themes/santi020k-hc-dark-color-theme.json'), name: 'santi020k hc dark' },
  { file: fromExtensionPackage('themes/santi020k-hc-light-color-theme.json'), name: 'santi020k hc light' }
]

const addFontStyle = function (style, newStyle) {
  if (!style) return newStyle

  if (style.includes(newStyle)) return style

  return `${newStyle} ${style}`.trim()
}

for (const base of baseThemes) {
  const themePath = base.file
  let raw

  try {
    raw = readFileSync(themePath, 'utf8')
  } catch {
    console.warn(`Could not read ${base.file}, skipping.`)

    continue
  }

  const cleanRaw = raw
    .replaceAll(/\/\*[\s\S]*?\*\//g, '')
    .replaceAll(/^\s*\/\/.*$/gm, '')

  const baseThemeObj = JSON.parse(cleanRaw)
  // Generate Bold Variant
  const boldTheme = JSON.parse(JSON.stringify(baseThemeObj))

  boldTheme.name = `${base.name} bold`

  if (boldTheme.semanticTokenColors) {
    boldTheme.semanticTokenColors = Object.fromEntries(Object.entries(boldTheme.semanticTokenColors).map(([key, val]) => {
      if (typeof val === 'string') {
        return [key, { foreground: val, bold: true }]
      }

      if (val && typeof val === 'object') {
        return [key, { ...val, bold: true }]
      }

      return [key, val]
    }))
  }

  if (boldTheme.tokenColors) {
    for (const token of boldTheme.tokenColors) {
      if (token.settings) {
        token.settings.fontStyle = addFontStyle(token.settings.fontStyle, 'bold')
      }
    }
  }

  writeFileSync(
    base.file.replace('.json', '').replace('-color-theme', '-bold-color-theme.json'), JSON.stringify(boldTheme, null, 2)
  )

  // Generate Italic Variant
  const italicTheme = JSON.parse(JSON.stringify(baseThemeObj))

  italicTheme.name = `${base.name} italic`

  if (italicTheme.semanticTokenColors) {
    italicTheme.semanticTokenColors = Object.fromEntries(Object.entries(italicTheme.semanticTokenColors).map(([key, val]) => {
      if (typeof val === 'string') {
        return [key, { foreground: val, italic: true }]
      }

      if (val && typeof val === 'object') {
        return [key, { ...val, italic: true }]
      }

      return [key, val]
    }))
  }

  if (italicTheme.tokenColors) {
    for (const token of italicTheme.tokenColors) {
      if (token.settings) {
        token.settings.fontStyle = addFontStyle(token.settings.fontStyle, 'italic')
      }
    }
  }

  writeFileSync(
    base.file.replace('.json', '').replace('-color-theme', '-italic-color-theme.json'), JSON.stringify(italicTheme, null, 2)
  )
}

console.log('Variants generated successfully.')
