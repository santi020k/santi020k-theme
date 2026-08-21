/* eslint-disable no-console -- This CLI reports a concise preset validation result. */

import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const presets = [
  {
    file: 'santi020k-light.codex-theme.json',
    variant: 'light',
    colors: { accent: '#6319be', ink: '#302e36', surface: '#f8f6fd', diffAdded: '#28a745', diffRemoved: '#c0392b', skill: '#6319be' }
  },
  {
    file: 'santi020k-dark.codex-theme.json',
    variant: 'dark',
    colors: { accent: '#752df0', ink: '#dfdde3', surface: '#0d0a15', diffAdded: '#7daea3', diffRemoved: '#ea6962', skill: '#9b69f6' }
  }
]

for (const presetDefinition of presets) {
  const themePath = resolve(import.meta.dirname, '..', 'themes', presetDefinition.file)
  const preset = JSON.parse(readFileSync(themePath, 'utf8'))
  const { theme } = preset

  if (preset.codeThemeId !== 'codex' || preset.variant !== presetDefinition.variant) throw new Error(`${presetDefinition.file} has an invalid Codex variant.`)

  const hasStandardSettings = theme.contrast === 45 &&
    theme.opaqueWindows === false &&
    theme.fonts?.code === null &&
    theme.fonts?.ui === null

  if (!hasStandardSettings) {
    throw new Error(`${presetDefinition.file} must preserve the standard Codex settings.`)
  }

  for (const [color, expected] of Object.entries(presetDefinition.colors)) {
    const actual = theme.semanticColors?.[color] ?? theme[color]

    if (actual !== expected) throw new Error(`Expected ${presetDefinition.file} ${color} to be ${expected}.`)
  }
}

console.log('✓ Santi020k light and dark Codex presets validated.')
