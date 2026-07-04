import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

import { fromExtensionPackage, fromRepoRoot } from './paths.mjs'

const packageShikiThemes = [
  {
    source: fromExtensionPackage('themes/santi020k-dark-color-theme.json'),
    target: fromRepoRoot('packages/theme/shiki/santi020k-dark.json')
  },
  {
    source: fromExtensionPackage('themes/santi020k-light-color-theme.json'),
    target: fromRepoRoot('packages/theme/shiki/santi020k-light.json')
  },
  {
    source: fromExtensionPackage('themes/santi020k-hc-dark-color-theme.json'),
    target: fromRepoRoot('packages/theme/shiki/santi020k-hc-dark.json')
  },
  {
    source: fromExtensionPackage('themes/santi020k-hc-light-color-theme.json'),
    target: fromRepoRoot('packages/theme/shiki/santi020k-hc-light.json')
  }
]

const stripJsonComments = raw => raw
  .replaceAll(/\/\*[\s\S]*?\*\//g, '')
  .replaceAll(/^\s*\/\/.*$/gm, '')

for (const { source, target } of packageShikiThemes) {
  const theme = JSON.parse(stripJsonComments(readFileSync(source, 'utf8')))

  mkdirSync(dirname(target), { recursive: true })

  writeFileSync(target, `${JSON.stringify(theme, null, 2)}\n`)

  console.log(`Generated ${target}`)
}
