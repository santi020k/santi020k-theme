import { cp, mkdir, rm } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const output = resolve(root, 'apps/website/public')
const siteAssets = ['vscode', 'chrome', 'terminal', 'zed', 'codex']

for (const product of siteAssets) {
  const source = resolve(root, `apps/${product}-website/public`)
  const destination = resolve(output, product)

  await rm(destination, { recursive: true, force: true })

  await mkdir(destination, { recursive: true })

  await cp(source, destination, { recursive: true, force: true })
}

const terminalPackage = resolve(root, 'packages/santi020k-terminal-theme')
const terminalOutput = resolve(output, 'terminal')

const generatedGroups = [
  ['iterm2', 'themes'],
  ['starship', 'starship'],
  ['zsh', 'zsh'],
  ['ghostty', 'ports/ghostty'],
  ['kitty', 'ports/kitty'],
  ['wezterm', 'ports/wezterm'],
  ['alacritty', 'ports/alacritty'],
  ['windows-terminal', 'ports/windows-terminal']
]

for (const [source, destination] of generatedGroups) {
  const destinationPath = resolve(terminalOutput, destination)

  await mkdir(destinationPath, { recursive: true })

  await cp(resolve(terminalPackage, source), destinationPath, { recursive: true, force: true })
}

console.log('Synced product assets into the consolidated website public directory.')
