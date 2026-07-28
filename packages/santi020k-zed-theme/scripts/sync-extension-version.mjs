import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const packageJsonPath = resolve(root, 'package.json')
const extensionTomlPath = resolve(root, 'extension.toml')
const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf8'))
const extensionToml = readFileSync(extensionTomlPath, 'utf8')
const nextExtensionToml = extensionToml.replace(/^version = "[^"]+"$/m, `version = "${pkg.version}"`)

if (nextExtensionToml === extensionToml && !extensionToml.includes(`version = "${pkg.version}"`)) {
  throw new Error('Unable to update version in extension.toml')
}

writeFileSync(extensionTomlPath, nextExtensionToml)

console.log(`Synced Zed extension.toml version to ${pkg.version}`)
