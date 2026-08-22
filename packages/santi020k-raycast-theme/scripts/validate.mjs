import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

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

const hexToRgb = color => color.match(/[\dA-F]{2}/gi).map(value => Number.parseInt(value, 16) / 255)

const luminance = color => hexToRgb(color)
  .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
  .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0)

const contrast = (foreground, background) => {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)

  return (values[0] + 0.05) / (values[1] + 0.05)
}

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

  if (contrast(theme.colors.text, theme.colors.background) < 4.5) {
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
