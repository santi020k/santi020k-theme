import { execFileSync, spawnSync } from 'node:child_process'
import { chmod, mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

import { parse } from 'smol-toml'

import { palettes } from '../palettes.mjs'
import { promptVariants, runtimeModules, starshipFilename } from '../prompt-presets.mjs'

// cspell:ignore compinit pipefail precmd ZDOTDIR

const root = resolve(import.meta.dirname, '..')
const requiredKeys = ['Background Color', 'Foreground Color', 'Cursor Color', 'Selection Color', ...Array.from({ length: 16 }, (_, index) => `Ansi ${index} Color`)]

for (const palette of Object.values(palettes)) {
  const path = resolve(root, 'iterm2', `${palette.name}.itermcolors`)
  const contents = await readFile(path, 'utf8')

  if (!contents.startsWith('<?xml version="1.0"') || !contents.includes('<plist version="1.0">')) {
    throw new Error(`${palette.name}: invalid plist header`)
  }

  for (const key of requiredKeys) {
    if (!contents.includes(`<key>${key}</key>`)) throw new Error(`${palette.name}: missing ${key}`)
  }

  const portFiles = [
    ['ghostty', `santi020k-${palette.slug}`],
    ['kitty', `santi020k-${palette.slug}.conf`],
    ['wezterm', `santi020k-${palette.slug}.lua`],
    ['windows-terminal', `santi020k-${palette.slug}.json`],
    ['alacritty', `santi020k-${palette.slug}.toml`],
  ]

  for (const [directory, filename] of portFiles) {
    const port = await readFile(resolve(root, directory, filename), 'utf8')

    for (const color of [palette.background, palette.foreground, palette.cursor, ...palette.ansi]) {
      if (!port.includes(color)) throw new Error(`${palette.name} ${directory}: missing canonical color ${color}`)
    }

    if (directory === 'windows-terminal') JSON.parse(port)

    if (directory === 'alacritty') parse(port)
  }

  for (const [variantKey, variant] of Object.entries(promptVariants)) {
    const starshipPath = resolve(root, 'starship', starshipFilename(palette.slug, variantKey))
    const starship = await readFile(starshipPath, 'utf8')
    let config

    try { config = parse(starship) } catch (error) { throw new Error(`${palette.name} ${variant.name}: invalid TOML`, { cause: error }) }

    if (config.palette !== 'santi020k' || !config.palettes?.santi020k) throw new Error(`${palette.name} ${variant.name}: missing palette`)

    if (config.os.symbols.Macos !== variant.symbols.macos || config.git_branch.symbol !== variant.symbols.git) {
      throw new Error(`${palette.name} ${variant.name}: generated symbols do not match shared preset metadata`)
    }

    const configSections = new Map(Object.entries(config))

    for (const runtime of runtimeModules) {
      if (configSections.get(runtime)?.disabled !== !variant.runtimes) throw new Error(`${palette.name} ${variant.name}: incorrect ${runtime} state`)
    }
  }
}

const starship = process.env.STARSHIP_BIN || 'starship'

if (spawnSync(starship, ['--version'], { stdio: 'ignore' }).status === 0) {
  for (const palette of Object.values(palettes)) {
    for (const variantKey of Object.keys(promptVariants)) {
      const config = resolve(root, 'starship', starshipFilename(palette.slug, variantKey))
      const prompt = execFileSync(starship, ['prompt', '--path', root, '--status', '1'], { env: { ...process.env, TERM: 'xterm-256color', STARSHIP_CONFIG: config }, encoding: 'utf8' })

      if (!prompt.includes('\u001B[')) throw new Error(`${palette.name} ${variantKey}: Starship smoke test did not render a styled prompt`)
    }
  }
} else console.log('Skipped Starship rendering smoke tests because the Starship CLI is unavailable.')

const autoTheme = await readFile(resolve(root, 'zsh', 'santi020k-auto-theme.zsh'), 'utf8')

for (const expected of ['AppleInterfaceStyle', 'STARSHIP_CONFIG', 'santi020k-dark.toml', 'santi020k-light.toml', 'add-zsh-hook precmd']) {
  if (!autoTheme.includes(expected)) throw new Error(`Zsh auto theme missing ${expected}`)
}

const zshSetup = await readFile(resolve(root, 'zsh', 'santi020k.zsh'), 'utf8')

for (const expected of ['compinit', 'zoxide init zsh', 'fzf --zsh', 'zsh-autosuggestions', 'zsh-syntax-highlighting', 'starship init zsh']) {
  if (!zshSetup.includes(expected)) throw new Error(`Zsh setup missing ${expected}`)
}

const installer = await readFile(resolve(root, 'zsh', 'install.zsh'), 'utf8')

for (const expected of ['set -euo pipefail', 'brew install', 'git-delta', 'santi020k.zsh', 'SOURCE_LINE', 'tlsv1.2']) {
  if (!installer.includes(expected)) throw new Error(`Zsh installer missing ${expected}`)
}

const cli = resolve(root, 'bin', 'santi020k-terminal')
const cliContents = await readFile(cli, 'utf8')

for (const expected of ['install_config', 'doctor', 'uninstall_config', 'santi020k/tap/santi020k-terminal']) {
  if (!cliContents.includes(expected)) throw new Error(`Terminal CLI missing ${expected}`)
}

const sandbox = await mkdtemp(resolve(tmpdir(), 'santi020k-terminal-'))

try {
  await chmod(cli, 0o755)

  const env = { ...process.env, HOME: sandbox, XDG_CONFIG_HOME: resolve(sandbox, '.config'), ZDOTDIR: sandbox, SANTI020K_ASSET_DIR: root }

  execFileSync(cli, ['install'], { env, encoding: 'utf8' })

  execFileSync(cli, ['install'], { env, encoding: 'utf8' })

  const managedZsh = await readFile(resolve(sandbox, '.config', 'santi020k-terminal', 'santi020k.zsh'), 'utf8')
  const sandboxZshrc = await readFile(resolve(sandbox, '.zshrc'), 'utf8')

  if (managedZsh !== zshSetup) throw new Error('Terminal CLI did not install the packaged Zsh setup')

  if (sandboxZshrc.split('Santi020k Terminal').length !== 2) throw new Error('Terminal CLI installation is not idempotent')

  execFileSync(cli, ['uninstall'], { env, encoding: 'utf8' })

  const cleanedZshrc = await readFile(resolve(sandbox, '.zshrc'), 'utf8')

  if (cleanedZshrc.includes('santi020k-terminal/santi020k.zsh')) throw new Error('Terminal CLI uninstall left its source line in .zshrc')
} finally {
  await rm(sandbox, { force: true, recursive: true })
}

console.log(`Validated ${Object.keys(palettes).length} palettes across six terminal formats, ${Object.keys(palettes).length * Object.keys(promptVariants).length} parsed Starship presets, the Zsh setup, and the terminal CLI lifecycle.`)
