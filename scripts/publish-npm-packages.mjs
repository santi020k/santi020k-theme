import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  changesetsReleaseTag,
  shouldReportChangesetsRelease,
  writeChangesetsRelease,
} from './changesets-release-output.mjs'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const isCI = process.env.CI === 'true'
const registry = process.env.NPM_CONFIG_REGISTRY || 'https://registry.npmjs.org/'

const publishPackages = [
  { dir: 'packages/theme-core', name: '@santi020k/theme-core' },
  { dir: 'packages/theme', name: '@santi020k/theme' },
]

const run = (command, args, options = {}) => {
  const { env = {}, ...spawnOptions } = options

  const result = spawnSync(command, args, {
    cwd: root,
    env: {
      ...process.env,
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
const changesetsOutput = process.env.CHANGESETS_OUTPUT

const readPreviousPackageVersion = (dir) => {
  const packagePath = `${dir}/package.json`

  const result = spawnSync('git', ['show', `HEAD^:${packagePath}`], {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    throw new Error(`Unable to read ${packagePath} from the parent commit: ${result.stderr.trim()}`)
  }

  return JSON.parse(result.stdout).version
}

const githubReleaseExists = async (tag) => {
  const repository = process.env.GITHUB_REPOSITORY
  const token = process.env.GITHUB_TOKEN

  if (!repository || !token) {
    throw new Error('GITHUB_REPOSITORY and GITHUB_TOKEN are required to report Changesets releases.')
  }

  const apiUrl = process.env.GITHUB_API_URL || 'https://api.github.com'

  const response = await fetch(`${apiUrl}/repos/${repository}/releases/tags/${encodeURIComponent(tag)}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  if (response.status === 404) {
    return false
  }

  if (!response.ok) {
    throw new Error(`Unable to check GitHub Release ${tag}: ${response.status} ${response.statusText}`)
  }

  return true
}

const reportRelease = async (dir, name, version) => {
  if (!changesetsOutput) {
    return
  }

  const previousVersion = readPreviousPackageVersion(dir)
  const tag = changesetsReleaseTag(name, version)
  const releaseExists = await githubReleaseExists(tag)

  if (!shouldReportChangesetsRelease({ currentVersion: version, previousVersion, releaseExists })) {
    return
  }

  writeChangesetsRelease({ name, outputPath: changesetsOutput, version })

  console.log(`Reported ${tag} to Changesets for tag and GitHub Release creation.`)
}

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

const createNpmUserConfig = (token) => {
  const configDir = mkdtempSync(join(tmpdir(), 'santi020k-npm-'))
  const configPath = join(configDir, '.npmrc')
  const registryUrl = new URL(registry)

  writeFileSync(configPath, [
    `registry=${registry}`,
    `//${registryUrl.host}${registryUrl.pathname}:_authToken=${token}`,
    '',
  ].join('\n'), { mode: 0o600 })

  return { configDir, configPath }
}

const token = process.env.NODE_AUTH_TOKEN || process.env.NPM_TOKEN
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

    await reportRelease(dir, name, pkg.version)
  }

  process.exit(0)
}

if (!token) {
  const message = `NPM_TOKEN is not set. Skipping npm publish for ${unpublished.map(({ name, pkg }) => `${name}@${pkg.version}`).join(', ')}.`

  if (isCI) {
    throw new Error(message)
  }

  console.warn(message)

  process.exit(0)
}

const { configDir, configPath } = createNpmUserConfig(token)

try {
  for (const { dir, name, pkg } of unpublished) {
    console.log(`Publishing ${name}@${pkg.version} to npm...`)

    run('pnpm', ['publish', '--access', 'public'], {
      cwd: resolve(root, dir),
      env: {
        NPM_CONFIG_USERCONFIG: configPath,
        NODE_AUTH_TOKEN: token,
        NPM_CONFIG_PROVENANCE: 'true',
      },
    })
  }
} finally {
  rmSync(configDir, { force: true, recursive: true })
}

for (const { dir, name } of publishPackages) {
  const pkg = readPackage(dir)

  await reportRelease(dir, name, pkg.version)
}
