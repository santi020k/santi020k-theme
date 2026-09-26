import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(import.meta.dirname, '..')
const packageJsonPath = resolve(root, 'package.json')
const pluginXmlPath = resolve(root, 'src', 'main', 'resources', 'META-INF', 'plugin.xml')
const versionPattern = /<version>[^<]+<\/version>/u

export const syncPluginVersion = ({
  packagePath = packageJsonPath,
  pluginPath = pluginXmlPath
} = {}) => {
  const pkg = JSON.parse(readFileSync(packagePath, 'utf8'))
  const pluginXml = readFileSync(pluginPath, 'utf8')

  if (!versionPattern.test(pluginXml)) {
    throw new Error(`${pluginPath} is missing a plugin version`)
  }

  const nextPluginXml = pluginXml.replace(versionPattern, `<version>${pkg.version}</version>`)

  if (nextPluginXml !== pluginXml) {
    writeFileSync(pluginPath, nextPluginXml)
  }

  return pkg.version
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const version = syncPluginVersion()

  console.log(`Synced JetBrains plugin.xml version to ${version}`)
}
