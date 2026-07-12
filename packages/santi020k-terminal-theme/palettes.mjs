import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { createTerminalPaletteFromVSCodeColors } from '@santi020k/theme'

const root = resolve(import.meta.dirname, '..')

const readVSCodeColors = async variant => {
  const raw = await readFile(resolve(root, 'santi020k-theme', 'themes', `santi020k-${variant}-color-theme.json`), 'utf8')
  const stripped = raw.replaceAll(/\/\/.*$/gm, '').replaceAll(/\/\*[\s\S]*?\*\//g, '')

  return JSON.parse(stripped).colors
}

const [dark, light] = await Promise.all([readVSCodeColors('dark'), readVSCodeColors('light')])

export const palettes = {
  dark: {
    name: 'Santi020k Dark',
    slug: 'dark',
    bold: '#ffffff', cursorText: '#0d0a15', selection: '#322b40', selectedText: '#ffffff', link: '#b48df7', badge: '#5a0fdb',
    ...createTerminalPaletteFromVSCodeColors(dark),
  },
  light: {
    name: 'Santi020k Light',
    slug: 'light',
    bold: '#17141d', cursorText: '#ffffff', selection: '#ddd8f0', selectedText: '#17141d', link: '#6319be', badge: '#6319be',
    ...createTerminalPaletteFromVSCodeColors(light),
  },
}
