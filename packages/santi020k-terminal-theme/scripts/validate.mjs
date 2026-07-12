import { execFileSync, spawnSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { parse } from 'smol-toml'

import { palettes } from '../palettes.mjs'
import { promptVariants, runtimeModules, starshipFilename } from '../prompt-presets.mjs'

// cspell:ignore compinit pipefail precmd

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

    for (const runtime of runtimeModules) {
      if (config[runtime].disabled !== !variant.runtimes) throw new Error(`${palette.name} ${variant.name}: incorrect ${runtime} state`)
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

console.log(`Validated ${Object.keys(palettes).length} palettes across six terminal formats, ${Object.keys(palettes).length * Object.keys(promptVariants).length} parsed Starship presets, and the Zsh setup.`)
