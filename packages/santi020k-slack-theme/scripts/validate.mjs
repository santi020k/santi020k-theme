import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

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
  const legacy = readFileSync(resolve(root, `santi020k-${appearance}.legacy.txt`), 'utf8').trim().split(',')

  if (theme.appearance !== appearance || legacy.length !== 8) {
    throw new Error(`Slack ${appearance} theme has invalid metadata or legacy color count.`)
  }

  for (const color of [...legacy, ...Object.values(theme.roles)]) {
    if (!/^#[\dA-F]{6}$/i.test(color)) throw new Error(`Invalid Slack color: ${color}`)
  }

  if (contrast(theme.roles.primaryText, theme.roles.canvas) < 4.5) {
    throw new Error(`Slack ${appearance} primary text must meet 4.5:1 contrast.`)
  }

  if (contrast(theme.roles.activeItemText, theme.roles.activeItem) < 4.5) {
    throw new Error(`Slack ${appearance} active item must meet 4.5:1 contrast.`)
  }
}

console.log('✓ Slack dark and light themes validated.')
