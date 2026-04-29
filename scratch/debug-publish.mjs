import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
const extensionId = `${pkg.publisher}.${pkg.name}`

const getMarketplaceVersions = () => {
  try {
    console.log(`Checking versions for ${extensionId}...`)
    const output = execFileSync('npx', ['vsce', 'show', extensionId, '--json'], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe']
    })

    const extension = JSON.parse(output)
    return extension.versions?.map(version => version.version) ?? []
  } catch (e) {
    console.error('Error fetching marketplace versions:', e.message)
    return []
  }
}

const readJsonUrl = async url => {
  try {
    const response = await fetch(url)
    if (response.status === 404) return null
    if (!response.ok) throw new Error(`Status ${response.status}`)
    return response.json()
  } catch (e) {
    console.error(`Error fetching Open VSX versions from ${url}:`, e.message)
    return null
  }
}

const getOpenVsxVersions = async () => {
  const extension = await readJsonUrl(`https://open-vsx.org/api/${pkg.publisher}/${pkg.name}`)
  return extension?.allVersions ? Object.keys(extension.allVersions) : []
}

console.log('--- MARKETPLACE ---')
const mv = getMarketplaceVersions()
console.log('Versions:', mv)

console.log('--- OPEN VSX ---')
const ov = await getOpenVsxVersions()
console.log('Versions:', ov)

console.log('--- LOCAL ---')
console.log('Version:', pkg.version)
