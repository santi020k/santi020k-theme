import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { palettes } from '../palettes.mjs'

const root = resolve(import.meta.dirname, '..')
const requiredKeys = ['Background Color', 'Foreground Color', 'Cursor Color', 'Selection Color', ...Array.from({ length: 16 }, (_, index) => `Ansi ${index} Color`)]

for (const palette of Object.values(palettes)) {
  const path = resolve(root, 'themes', `${palette.name}.itermcolors`)
  const contents = await readFile(path, 'utf8')

  if (!contents.startsWith('<?xml version="1.0"') || !contents.includes('<plist version="1.0">')) {
    throw new Error(`${palette.name}: invalid plist header`)
  }

  for (const key of requiredKeys) {
    if (!contents.includes(`<key>${key}</key>`)) throw new Error(`${palette.name}: missing ${key}`)
  }
}

console.log(`Validated ${Object.keys(palettes).length} iTerm2 color presets.`)
