import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const baseThemes = [
  { file: 'themes/santi020k-dark-color-theme.json', name: 'santi020k dark' },
  { file: 'themes/santi020k-light-color-theme.json', name: 'santi020k light' },
  { file: 'themes/santi020k-hc-dark-color-theme.json', name: 'santi020k hc dark' },
  { file: 'themes/santi020k-hc-light-color-theme.json', name: 'santi020k hc light' }
]

function addFontStyle(style, newStyle) {
  if (!style) return newStyle

  if (style.includes(newStyle)) return style

  return `${newStyle} ${style}`.trim()
}

baseThemes.forEach(base => {
  const themePath = join(process.cwd(), base.file)
  let raw

  try {
    raw = readFileSync(themePath, 'utf8')
  } catch {
    console.warn(`Could not read ${base.file}, skipping.`)

    return
  }

  const cleanRaw = raw
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/^\s*\/\/.*$/gm, '')

  const baseThemeObj = JSON.parse(cleanRaw)
  // Generate Bold Variant
  const boldTheme = JSON.parse(JSON.stringify(baseThemeObj))

  boldTheme.name = `${base.name} bold`

  if (boldTheme.semanticTokenColors) {
    for (const key in boldTheme.semanticTokenColors) {
      const val = boldTheme.semanticTokenColors[key]

      if (typeof val === 'string') {
        boldTheme.semanticTokenColors[key] = { foreground: val, bold: true }
      } else if (typeof val === 'object') {
        val.bold = true
      }
    }
  }

  if (boldTheme.tokenColors) {
    boldTheme.tokenColors.forEach(token => {
      if (token.settings) {
        token.settings.fontStyle = addFontStyle(token.settings.fontStyle, 'bold')
      }
    })
  }

  writeFileSync(
    join(process.cwd(), base.file.replace('.json', '').replace('-color-theme', '-bold-color-theme.json')), JSON.stringify(boldTheme, null, 2)
  )

  // Generate Italic Variant
  const italicTheme = JSON.parse(JSON.stringify(baseThemeObj))

  italicTheme.name = `${base.name} italic`

  if (italicTheme.semanticTokenColors) {
    for (const key in italicTheme.semanticTokenColors) {
      const val = italicTheme.semanticTokenColors[key]

      if (typeof val === 'string') {
        italicTheme.semanticTokenColors[key] = { foreground: val, italic: true }
      } else if (typeof val === 'object') {
        val.italic = true
      }
    }
  }

  if (italicTheme.tokenColors) {
    italicTheme.tokenColors.forEach(token => {
      if (token.settings) {
        token.settings.fontStyle = addFontStyle(token.settings.fontStyle, 'italic')
      }
    })
  }

  writeFileSync(
    join(process.cwd(), base.file.replace('.json', '').replace('-color-theme', '-italic-color-theme.json')), JSON.stringify(italicTheme, null, 2)
  )
})

console.log('Variants generated successfully.')
