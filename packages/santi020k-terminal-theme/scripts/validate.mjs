import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { palettes } from '../palettes.mjs'

const root = resolve(import.meta.dirname, '..')
const requiredKeys = ['Background Color', 'Foreground Color', 'Cursor Color', 'Selection Color', ...Array.from({ length: 16 }, (_, index) => `Ansi ${index} Color`)]

for (const palette of Object.values(palettes)) {
  const path = resolve(root, 'iterm2', `${palette.name}.itermcolors`)
  const contents = await readFile(path, 'utf8')

  if (!contents.startsWith('<?xml version="1.0"') || !contents.includes('<plist version="1.0">')) {
    throw new Error(`${palette.name}: invalid plist header`)
  }

  for (const key of requiredKeys) {
    if (!contents.includes(`<key>${key}</key>`)) throw new Error(`${palette.name}: missing ${key}`)
  }

  const starshipPath = resolve(root, 'starship', `santi020k-${palette.slug}.toml`)
  const starship = await readFile(starshipPath, 'utf8')

  for (const expected of ['palette = "santi020k"', '[palettes.santi020k]', '[directory]', '[git_branch]', '[character]']) {
    if (!starship.includes(expected)) throw new Error(`${palette.name}: Starship preset missing ${expected}`)
  }
}

console.log(`Validated ${Object.keys(palettes).length} iTerm2 presets and ${Object.keys(palettes).length} Starship presets.`)
