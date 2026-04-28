import { readFileSync } from 'node:fs'

const themeFiles = [
  'themes/santi020k-dark-color-theme.json',
  'themes/santi020k-light-color-theme.json'
]

const requiredColorKeys = [
  'editor.background',
  'editor.foreground',
  'editorWidget.background',
  'editorWidget.foreground',
  'foreground',
  'input.background',
  'button.background',
  'quickInput.background',
  'notifications.background'
]

for (const file of themeFiles) {
  const theme = JSON.parse(readFileSync(file, 'utf8'))

  if (!theme.name || !theme.type || !theme.colors || !theme.tokenColors) {
    throw new Error(`${file} is missing required theme sections`)
  }

  if (theme.semanticHighlighting !== true) {
    throw new Error(`${file} must enable semanticHighlighting`)
  }

  for (const key of requiredColorKeys) {
    if (!theme.colors[key]) {
      throw new Error(`${file} is missing colors.${key}`)
    }
  }
}

console.log(`Validated ${themeFiles.length} theme files`)
