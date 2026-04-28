import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('package.json', 'utf8'))
const extensionId = `${pkg.publisher}.${pkg.name}`

const run = (command, args, options = {}) => {
  execFileSync(command, args, {
    stdio: 'inherit',
    ...options
  })
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

const publishedVersions = getMarketplaceVersions()

if (publishedVersions.has(pkg.version)) {
  console.log(`${extensionId}@${pkg.version} is already published. Skipping Marketplace publish.`)
  process.exit(0)
}

run('npm', ['run', 'validate'])
run('npx', ['vsce', 'publish'])
