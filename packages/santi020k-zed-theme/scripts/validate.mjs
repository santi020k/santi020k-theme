import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const themePath = resolve(root, 'themes', 'santi020k.json')
const packageJsonPath = resolve(root, 'package.json')
const extensionTomlPath = resolve(root, 'extension.toml')
const licensePath = resolve(root, 'LICENSE')
const schemaUrl = 'https://zed.dev/schema/themes/v0.2.0.json'
const theme = JSON.parse(readFileSync(themePath, 'utf8'))
const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
const extensionToml = readFileSync(extensionTomlPath, 'utf8')

const readTomlString = key => {
  const match = extensionToml.match(new RegExp(`^${key} = "([^"]+)"$`, 'm'))

  return match?.[1]
}

const readTomlNumber = key => {
  const match = extensionToml.match(new RegExp(`^${key} = (\\d+)$`, 'm'))

  return match ? Number(match[1]) : undefined
}

const requiredManifestFields = [
  'id',
  'name',
  'version',
  'description',
  'repository'
]

for (const field of requiredManifestFields) {
  if (!readTomlString(field)) {
    throw new Error(`extension.toml is missing ${field}`)
  }
}

if (readTomlString('id') !== 'santi020k-theme') {
  throw new Error('extension.toml id must be "santi020k-theme"')
}

if (readTomlString('name') !== 'Santi020k Theme') {
  throw new Error('extension.toml name must be "Santi020k Theme"')
}

if (readTomlString('version') !== pkg.version) {
  throw new Error('extension.toml version must match package.json version')
}

if (readTomlNumber('schema_version') !== 1) {
  throw new Error('extension.toml schema_version must be 1')
}

if (
  !extensionToml.includes('authors = ["Santiago Molina <hi@santi020k.com>"]')
) {
  throw new Error('extension.toml must declare the package author')
}

if (
  !existsSync(licensePath) ||
  !readFileSync(licensePath, 'utf8').startsWith('MIT License')
) {
  throw new Error('Zed extension package must include an MIT LICENSE file')
}

if (theme.$schema !== schemaUrl) {
  throw new Error(`Expected $schema to be ${schemaUrl}`)
}

if (theme.name !== 'Santi020k Theme') {
  throw new Error('Expected theme family name to be "Santi020k Theme"')
}

if (!Array.isArray(theme.themes) || theme.themes.length !== 2) {
  throw new Error('Expected exactly two Zed themes: dark and light')
}

for (const entry of theme.themes) {
  if (!entry.name || !entry.appearance || !entry.style) {
    throw new Error(
      'Each Zed theme entry must include name, appearance, and style'
    )
  }

  if (!['dark', 'light'].includes(entry.appearance)) {
    throw new Error(
      `Invalid appearance for ${entry.name}: ${entry.appearance}`
    )
  }

  const requiredStyleKeys = [
    'background',
    'border',
    'editor.background',
    'editor.foreground',
    'surface.background',
    'tab.active_background',
    'tab.inactive_background',
    'terminal.background',
    'terminal.foreground',
    'text',
    'title_bar.background',
    'syntax'
  ]

  for (const key of requiredStyleKeys) {
    if (!(key in entry.style)) {
      throw new Error(`Missing required style key for ${entry.name}: ${key}`)
    }
  }

  const requiredSyntaxKeys = [
    'comment',
    'function',
    'keyword',
    'string',
    'type',
    'variable'
  ]

  for (const key of requiredSyntaxKeys) {
    if (!(key in entry.style.syntax)) {
      throw new Error(`Missing required syntax key for ${entry.name}: ${key}`)
    }
  }
}

console.log('✓ Zed theme structure validated.')
