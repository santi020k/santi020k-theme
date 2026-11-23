import { execFileSync } from 'node:child_process'
import { appendFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

export const gitEnvironment = (environment = process.env) => Object.fromEntries(Object.entries(environment).filter(([key]) => !key.startsWith('GIT_')))

export const classifyPaths = paths => ({
  mode: paths.length > 0 && paths.every(path => /^apps\/(website|(?:vscode|chrome|terminal|zed|codex)-website)\/(src|public|tests)\//u.test(path)) ? 'affected' : 'full',
})

const independentThemeChecks = new Set([
  'validate:themes', 'validate:chrome', 'validate:terminal', 'validate:zed',
  'validate:codex', 'validate:raycast', 'validate:slack', 'validate:jetbrains',
  'validate:xcode', 'validate:obsidian', 'validate:neovim', 'package:extension',
])

export const selectValidationScripts = command => {
  const scripts = command.split('&&').map(part => /^pnpm run ([a-z][a-z0-9:-]*)$/u.exec(part.trim())?.[1])

  if (scripts.some(script => !script)) return ['validate']

  return scripts.filter(script => !independentThemeChecks.has(script))
}

// Native wallpaper validation needs a macOS runner, so it only runs when its inputs can change.
const appearanceInputs = /^(?:artwork\/|scripts\/wallpapers\/|scripts\/build-appearance-wallpapers\.mjs$|scripts\/ci-scope\.mjs$|\.github\/workflows\/validate\.yml$)/u

export const requiresAppearance = paths => paths.length === 0 || paths.some(path => appearanceInputs.test(path))

const releaseBranch = env => /^(release\/|changeset-release\/)/u.test(env.GITHUB_HEAD_REF ?? '')

const fullEvent = env => Boolean(env.GITHUB_EVENT_NAME && env.GITHUB_EVENT_NAME !== 'pull_request') ||
  releaseBranch(env)

const readPaths = ({ cwd, base, head, env }) => {
  const git = args => execFileSync('git', args, {
    cwd, env: gitEnvironment(env), encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe']
  })

  const revision = ref => git(['rev-parse', '--verify', '--end-of-options', `${ref}^{commit}`]).trim()
  const commands = [['diff', '--no-renames', '--name-only', '-z', `${revision(base)}...${revision(head)}`]]

  if (head === 'HEAD') commands.push(
    ['diff', '--no-renames', '--name-only', '-z', '--cached'],
    ['diff', '--no-renames', '--name-only', '-z'],
    ['ls-files', '--others', '--exclude-standard', '-z']
  )

  return [...new Set(commands.flatMap(args => git(args).split('\0').filter(Boolean)))]
}

export const planScope = ({ cwd = process.cwd(), base, head = 'HEAD', full = false, env = process.env } = {}) => {
  if (full || !base || fullEvent(env)) return classifyPaths([])

  try {
    return classifyPaths(readPaths({ cwd, base, head, env }))
  } catch {
    return classifyPaths([])
  }
}

const comparesHistory = env => ['pull_request', 'push'].includes(env.GITHUB_EVENT_NAME ?? '') && !releaseBranch(env)

/**
 * Pull requests and pushes compare committed history. Release branches, manual runs,
 * missing bases and unreadable history always keep the native check.
 */
export const planAppearance = ({ cwd = process.cwd(), base, head = 'HEAD', full = false, env = process.env } = {}) => {
  if (full || !base || !comparesHistory(env)) return true

  try {
    return requiresAppearance(readPaths({ cwd, base, head, env }))
  } catch {
    return true
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const options = { base: process.env.CI_BASE_SHA, head: process.env.CI_HEAD_SHA || 'HEAD', full: process.argv.includes('--full') }
  const plan = { ...planScope(options), appearance: planAppearance(options) }

  process.stdout.write(`${JSON.stringify(plan)}\n`)

  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(process.env.GITHUB_OUTPUT, Object.entries(plan).map(([key, value]) => `${key}=${value}`).join('\n') + '\n')
  }
}
