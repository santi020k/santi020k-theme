import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const packageJsonPath = 'package.json'
const websiteIndexPath = 'website/index.html'
const softwareVersionPattern = /("softwareVersion":\s*")([^"]+)(")/

export const syncWebsiteVersion = ({
  packagePath = packageJsonPath,
  websitePath = websiteIndexPath
} = {}) => {
  const pkg = JSON.parse(readFileSync(packagePath, 'utf8'))
  const html = readFileSync(websitePath, 'utf8')

  if (!softwareVersionPattern.test(html)) {
    throw new Error(`${websitePath} is missing JSON-LD softwareVersion`)
  }

  const updatedHtml = html.replace(softwareVersionPattern, `$1${pkg.version}$3`)

  if (updatedHtml !== html) {
    writeFileSync(websitePath, updatedHtml)
  }

  return pkg.version
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const version = syncWebsiteVersion()

  console.log(`Synced website softwareVersion to ${version}`)
}
