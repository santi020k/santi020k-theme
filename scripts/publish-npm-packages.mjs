import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

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
const packageMetadataUrl = (name) => new URL(name.replace('/', '%2F'), registry)

const isPublished = async (name, version) => {
  const response = await fetch(packageMetadataUrl(name))

  if (response.status === 404) {
    return false
  }

  if (!response.ok) {
    throw new Error(`Unable to check npm package ${name}: ${response.status} ${response.statusText}`)
  }

  const metadata = await response.json()

  return Boolean(metadata.versions?.[version])
}

const createNpmUserConfig = (token) => {
  const configDir = mkdtempSync(join(tmpdir(), 'santi020k-npm-'))
  const configPath = join(configDir, '.npmrc')
  const registryUrl = new URL(registry)

  writeFileSync(configPath, [
    `registry=${registry}`,
    `//${registryUrl.host}${registryUrl.pathname}:_authToken=${token}`,
    'provenance=true',
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

    run('pnpm', ['--dir', dir, 'publish', '--access', 'public', '--registry', registry, '--no-git-checks'], {
      env: {
        NPM_CONFIG_USERCONFIG: configPath,
        NODE_AUTH_TOKEN: token,
      },
    })
  }
} finally {
  rmSync(configDir, { force: true, recursive: true })
}
