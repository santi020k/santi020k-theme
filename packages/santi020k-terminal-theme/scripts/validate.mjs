import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { palettes } from '../palettes.mjs'

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

  const starshipPath = resolve(root, 'starship', `santi020k-${palette.slug}.toml`)
  const starship = await readFile(starshipPath, 'utf8')

  for (const expected of ['palette = "santi020k"', '[palettes.santi020k]', '[directory]', '[git_branch]', '[character]']) {
    if (!starship.includes(expected)) throw new Error(`${palette.name}: Starship preset missing ${expected}`)
  }

  for (const expected of ['Macos = ""', 'symbol = "git"', 'symbol = "node "', 'format = "[  $time  ]($style)"']) {
    if (!starship.includes(expected)) throw new Error(`${palette.name}: Starship preset does not match the website preview: missing ${expected}`)
  }
}

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

console.log(`Validated ${Object.keys(palettes).length} iTerm2 presets, ${Object.keys(palettes).length} Starship presets, and the Zsh setup.`)
