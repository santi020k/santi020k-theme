import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
const extensionId = `${pkg.publisher}.${pkg.name}`
const vsixPath = `${pkg.name}-${pkg.version}.vsix`

const run = (command, args, options = {}) => {
  execFileSync(command, args, {
    stdio: 'inherit',
    ...options
  })
}

const readJsonUrl = async (url) => {
  const response = await fetch(url)

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Request failed for ${url}: ${response.status} ${response.statusText}`)
  }

  return response.json()
}

const getMarketplaceVersions = () => {
  try {
    const output = execFileSync('npx', ['vsce', 'show', extensionId, '--json'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    })
    const extension = JSON.parse(output)
    return new Set(extension.versions?.map((version) => version.version) ?? [])
  } catch {
    return new Set()
  }
}

const getOpenVsxVersions = async () => {
  try {
    const extension = await readJsonUrl(`https://open-vsx.org/api/${pkg.publisher}/${pkg.name}`)
    return new Set(extension?.allVersions ? Object.keys(extension.allVersions) : [])
  } catch (error) {
    console.warn(`Unable to check Open VSX versions: ${error.message}`)
    return new Set()
  }
}

const publishMarketplace = () => {
  if (!process.env.VSCE_PAT) {
    console.log('VSCE_PAT is not set. Skipping Visual Studio Marketplace publish.')
    return
  }

  run('npx', ['vsce', 'publish', '--packagePath', vsixPath, '--skip-duplicate'])
}

const publishOpenVsx = () => {
  if (!process.env.OVSX_PAT) {
    console.log('OVSX_PAT is not set. Skipping Open VSX publish.')
    return
  }

  run('npx', ['ovsx', 'publish', vsixPath, '--skip-duplicate', '-p', process.env.OVSX_PAT])
}

const marketplaceVersions = getMarketplaceVersions()
const openVsxVersions = await getOpenVsxVersions()
const shouldPublishMarketplace = !marketplaceVersions.has(pkg.version)
const shouldPublishOpenVsx = !openVsxVersions.has(pkg.version)

if (!shouldPublishMarketplace && !shouldPublishOpenVsx) {
  console.log(`${extensionId}@${pkg.version} is already published to both registries.`)
  process.exit(0)
}

run('npm', ['run', 'validate'])

if (shouldPublishMarketplace) {
  publishMarketplace()
} else {
  console.log(`${extensionId}@${pkg.version} is already published to Visual Studio Marketplace.`)
}

if (shouldPublishOpenVsx) {
  publishOpenVsx()
} else {
  console.log(`${extensionId}@${pkg.version} is already published to Open VSX.`)
}
