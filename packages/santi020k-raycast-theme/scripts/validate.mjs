import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { contrastRatio } from '../../../scripts/lib/color-contrast.mjs'

const requiredColors = [
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

for (const appearance of ['dark', 'light']) {
  const root = resolve(import.meta.dirname, '..', 'themes')
  const theme = JSON.parse(readFileSync(resolve(root, `santi020k-${appearance}.json`), 'utf8'))
  const importUrl = readFileSync(resolve(root, `santi020k-${appearance}.url.txt`), 'utf8').trim()

  if (theme.appearance !== appearance || theme.version !== '1') {
    throw new Error(`Invalid Raycast ${appearance} metadata.`)
  }

  for (const color of requiredColors) {
    if (!/^#[\dA-F]{6}$/i.test(theme.colors[color])) {
      throw new Error(`Invalid Raycast ${appearance} color: ${color}`)
    }
  }

  if (contrastRatio(theme.colors.text, theme.colors.background) < 4.5) {
    throw new Error(`Raycast ${appearance} primary text must meet 4.5:1 contrast.`)
  }

  const parsedUrl = new URL(importUrl)

  if (parsedUrl.protocol !== 'raycast:' || parsedUrl.hostname !== 'theme') {
    throw new Error(`Raycast ${appearance} import URL is invalid.`)
  }

  if (parsedUrl.searchParams.get('colors')?.split(',').length !== requiredColors.length) {
    throw new Error(`Raycast ${appearance} import URL must include all colors.`)
  }
}

console.log('✓ Raycast dark and light themes validated.')
