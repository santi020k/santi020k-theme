import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { contrastRatio } from '../../../scripts/lib/color-contrast.mjs'

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

  if (contrastRatio(theme.roles.primaryText, theme.roles.canvas) < 4.5) {
    throw new Error(`Slack ${appearance} primary text must meet 4.5:1 contrast.`)
  }

  if (contrastRatio(theme.roles.activeItemText, theme.roles.activeItem) < 4.5) {
    throw new Error(`Slack ${appearance} active item must meet 4.5:1 contrast.`)
  }
}

console.log('✓ Slack dark and light themes validated.')
