import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { raycastThemes } from '../palettes.mjs'

const outputDirectory = resolve(import.meta.dirname, '..', 'themes')

const colorOrder = [
  'background',
  'backgroundSecondary',
  'text',
  'selection',
  'loader',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'magenta'
]

mkdirSync(outputDirectory, { recursive: true })

for (const theme of raycastThemes) {
  const slug = theme.appearance === 'dark' ? 'santi020k-dark' : 'santi020k-light'
  const parameters = new URLSearchParams()

  for (const [key, value] of Object.entries(theme)) {
    if (key !== 'colors') parameters.set(key, value)
  }

  parameters.set(
    'colors',
    colorOrder.map(color => theme.colors[color]).join(',')
  )

  writeFileSync(
    resolve(outputDirectory, `${slug}.json`),
    `${JSON.stringify(theme, null, 2)}\n`
  )

  writeFileSync(
    resolve(outputDirectory, `${slug}.url.txt`),
    `raycast://theme?${parameters.toString()}\n`
  )
}

console.log('✓ Raycast themes generated.')
