import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { createTerminalPaletteFromVSCodeColors } from '@santi020k/theme'

const root = resolve(import.meta.dirname, '..')

const readVSCodeColors = variant => {
  const path = resolve(root, '..', 'santi020k-theme', 'themes', `santi020k-${variant}-color-theme.json`)
  const raw = readFileSync(path, 'utf8')
  const stripped = raw.replaceAll(/\/\/.*$/gm, '').replaceAll(/\/\*[\s\S]*?\*\//g, '')

  return JSON.parse(stripped).colors
}

const output = Object.fromEntries(
  ['dark', 'light'].map(variant => [variant, createTerminalPaletteFromVSCodeColors(readVSCodeColors(variant))])
)

writeFileSync(resolve(root, 'vscode-colors.json'), `${JSON.stringify(output, null, 2)}\n`)

console.log('✓ Updated vscode-colors.json from the VS Code theme palette.')
