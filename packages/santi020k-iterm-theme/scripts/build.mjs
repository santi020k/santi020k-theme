import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { palettes } from '../palettes.mjs'

const root = resolve(import.meta.dirname, '..')
const componentNames = ['Red', 'Green', 'Blue']

const colorKeys = [
  ['Background Color', 'background'], ['Foreground Color', 'foreground'], ['Bold Color', 'bold'],
  ['Cursor Color', 'cursor'], ['Cursor Text Color', 'cursorText'], ['Selection Color', 'selection'],
  ['Selected Text Color', 'selectedText'], ['Link Color', 'link'], ['Badge Color', 'badge'],
]

const colorDict = hex => {
  const values = hex.slice(1).match(/.{2}/gu).map(value => Number.parseInt(value, 16) / 255)
  const components = values.map((value, index) => `\n\t\t<key>${componentNames[index]} Component</key>\n\t\t<real>${value.toFixed(6)}</real>`).join('')

  return `<dict>${components}\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t</dict>`
}

const render = palette => {
  const entries = colorKeys.map(([label, key]) => `\t<key>${label}</key>\n\t${colorDict(palette[key])}`)

  for (const [index, color] of palette.ansi.entries()) entries.push(`\t<key>Ansi ${index} Color</key>\n\t${colorDict(color)}`)

  return `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">\n<dict>\n${entries.join('\n')}\n</dict>\n</plist>\n`
}

await mkdir(resolve(root, 'themes'), { recursive: true })

for (const palette of Object.values(palettes)) {
  await writeFile(resolve(root, 'themes', `${palette.name}.itermcolors`), render(palette))
}

console.log(`Generated ${Object.keys(palettes).length} iTerm2 color presets.`)
