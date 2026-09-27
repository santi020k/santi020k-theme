import { spawnSync } from 'node:child_process'
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  reportChangesetsRelease,
} from './changesets-release-output.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const isCI = process.env.CI === 'true'
const registry = process.env.NPM_CONFIG_REGISTRY || 'https://registry.npmjs.org/'

const hasGitHubOidc = Boolean(
  process.env.GITHUB_ACTIONS === 'true'
  && process.env.ACTIONS_ID_TOKEN_REQUEST_URL
  && process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN,
)

const {
  NODE_AUTH_TOKEN: _nodeAuthToken,
  NPM_TOKEN: _npmToken,
  ...trustedPublishingEnv
} = process.env

const publishPackages = [
  { dir: 'packages/theme-core', name: '@santi020k/theme-core' },
  { dir: 'packages/theme', name: '@santi020k/theme' },
]

const run = (command, args, options = {}) => {
  const { env = {}, ...spawnOptions } = options

  const result = spawnSync(command, args, {
    cwd: root,
    env: {
      ...trustedPublishingEnv,
      ...env,
    },
    stdio: 'inherit',
    shell: process.platform === 'win32',
    ...spawnOptions,
  })

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    throw new Error(`${command} ${args.join(' ')} failed with exit code ${result.status ?? 1}`)
  }
}

const readPackage = (dir) => JSON.parse(readFileSync(resolve(root, dir, 'package.json'), 'utf8'))
const packageMetadataUrl = (name) => new URL(encodeURIComponent(name), registry)

const isPublished = async (name, version) => {
  const response = await fetch(packageMetadataUrl(name))

  if (response.status === 404) {
    return false
  }

  if (!response.ok) {
    throw new Error(`Unable to check npm package ${name}: ${response.status} ${response.statusText}`)
  }

  const metadata = await response.json()
  const versionMap = new Map(Object.entries(metadata.versions ?? {}))

  return versionMap.has(version)
}

const unpublished = []

for (const { dir, name } of publishPackages) {
  const pkg = readPackage(dir)

  if (!(await isPublished(name, pkg.version))) {
    unpublished.push({ dir, name, pkg })
  }
}

if (unpublished.length === 0) {
  console.log('All npm packages are already published. Skipping npm publish.')

  for (const { dir, name } of publishPackages) {
    const pkg = readPackage(dir)

    await reportChangesetsRelease({ directory: dir, name, root, version: pkg.version })
  }

  process.exit(0)
}

if (!hasGitHubOidc) {
  const message = `GitHub Actions OIDC is unavailable. Skipping npm Trusted Publishing for ${unpublished.map(({ name, pkg }) => `${name}@${pkg.version}`).join(', ')}.`

  if (isCI) {
    throw new Error(message)
  }

  console.warn(message)

  process.exit(0)
}

for (const { dir, name, pkg } of unpublished) {
  console.log(`Publishing ${name}@${pkg.version} to npm with Trusted Publishing...`)

  const packageDirectory = resolve(root, dir)
  const packDirectory = mkdtempSync(join(tmpdir(), 'santi020k-npm-pack-'))

  try {
    run('pnpm', ['pack', '--pack-destination', packDirectory], {
      cwd: packageDirectory,
    })

    const tarballs = readdirSync(packDirectory).filter((filename) => filename.endsWith('.tgz'))

    if (tarballs.length !== 1) {
      throw new Error(`Expected one packed tarball for ${name}, found ${tarballs.length}.`)
    }

    run('npm', ['publish', resolve(packDirectory, tarballs[0]), '--access', 'public'], {
      cwd: packageDirectory,
    })
  } finally {
    rmSync(packDirectory, { force: true, recursive: true })
  }
}

for (const { dir, name } of publishPackages) {
  const pkg = readPackage(dir)

  await reportChangesetsRelease({ directory: dir, name, root, version: pkg.version })
}
