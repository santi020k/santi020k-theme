import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import pkg from '../package.json' with { type: 'json' }

const root = resolve(import.meta.dirname, '..')
const resources = resolve(root, 'src', 'main', 'resources')
const pluginXml = readFileSync(resolve(resources, 'META-INF', 'plugin.xml'), 'utf8')
const bundledJar = '/Applications/Android Studio.app/Contents/jbr/Contents/Home/bin/jar'

const jarExecutable = process.platform === 'darwin' && existsSync(bundledJar) ?
  bundledJar :
  'jar'

const hexToRgb = color => color.match(/[\dA-F]{2}/gi).map(value => Number.parseInt(value, 16) / 255)

const luminance = color => hexToRgb(color)
  .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
  .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0)

const contrast = (foreground, background) => {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)

  return (values[0] + 0.05) / (values[1] + 0.05)
}

if (!pluginXml.includes('<id>com.santi020k.theme</id>')) throw new Error('JetBrains plugin ID is missing.')

if (!pluginXml.includes(`<version>${pkg.version}</version>`)) throw new Error('JetBrains plugin version must match package.json.')

for (const appearance of ['dark', 'light']) {
  const suffix = appearance === 'dark' ? 'Dark' : 'Light'
  const theme = JSON.parse(readFileSync(resolve(resources, 'themes', `santi020k-${appearance}.theme.json`), 'utf8'))
  const scheme = readFileSync(resolve(resources, 'themes', `Santi020k${suffix}.xml`), 'utf8')

  if (theme.dark !== (appearance === 'dark') || theme.name !== `Santi020k ${suffix}`) {
    throw new Error(`JetBrains ${appearance} theme metadata is invalid.`)
  }

  for (const role of ['canvas', 'surface', 'border', 'text', 'brand', 'error', 'warning', 'success']) {
    if (!/^#[\dA-F]{6}$/i.test(theme.colors[role])) throw new Error(`Invalid JetBrains ${appearance} role: ${role}`)
  }

  if (contrast(theme.colors.text, theme.colors.canvas) < 4.5) {
    throw new Error(`JetBrains ${appearance} editor text must meet 4.5:1 contrast.`)
  }

  if (!scheme.startsWith('<scheme') || !scheme.includes(`name="Santi020k ${suffix}"`)) {
    throw new Error(`JetBrains ${appearance} editor scheme is invalid.`)
  }

  for (const attribute of ['DEFAULT_TEXT', 'DEFAULT_KEYWORD', 'DEFAULT_STRING', 'DEFAULT_LINE_COMMENT', 'ERRORS_ATTRIBUTES']) {
    if (!scheme.includes(`name="${attribute}"`)) throw new Error(`Missing ${attribute} from JetBrains ${appearance} scheme.`)
  }
}

const artifact = resolve(root, 'dist', `santi020k-jetbrains-theme-${pkg.version}.jar`)
const listResult = spawnSync(jarExecutable, ['--list', '--file', artifact], { encoding: 'utf8' })

if (listResult.status !== 0) throw new Error(listResult.stderr || 'Unable to inspect the JetBrains plugin artifact.')

for (const entry of ['META-INF/plugin.xml', 'themes/santi020k-dark.theme.json', 'themes/santi020k-light.theme.json', 'themes/Santi020kDark.xml', 'themes/Santi020kLight.xml']) {
  if (!listResult.stdout.split('\n').includes(entry)) throw new Error(`JetBrains plugin artifact is missing ${entry}.`)
}

console.log('✓ JetBrains and Android Studio dark and light themes validated.')
