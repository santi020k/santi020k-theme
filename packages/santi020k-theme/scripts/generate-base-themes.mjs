import { readFileSync, writeFileSync } from 'node:fs'

import { fromExtensionPackage } from './paths.mjs'

const baseThemeSources = [
  {
    source: fromExtensionPackage('src/tokens/vscode/base-themes/dark.json'),
    target: fromExtensionPackage('themes/santi020k-dark-color-theme.json')
  },
  {
    source: fromExtensionPackage('src/tokens/vscode/base-themes/light.json'),
    target: fromExtensionPackage('themes/santi020k-light-color-theme.json')
  },
  {
    source: fromExtensionPackage('src/tokens/vscode/base-themes/hc-dark.json'),
    target: fromExtensionPackage('themes/santi020k-hc-dark-color-theme.json')
  }
]

for (const { source, target } of baseThemeSources) {
  const theme = JSON.parse(readFileSync(source, 'utf8'))

  writeFileSync(target, `${JSON.stringify(theme, null, 2)}\n`)

  console.log(`Generated ${target}`)
}
