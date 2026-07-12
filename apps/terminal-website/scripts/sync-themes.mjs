import { copyFile, mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '../../..')

const portFiles = {
  alacritty: ['santi020k-dark.toml', 'santi020k-light.toml'],
  ghostty: ['santi020k-dark', 'santi020k-light'],
  kitty: ['santi020k-dark.conf', 'santi020k-light.conf'],
  wezterm: ['santi020k-dark.lua', 'santi020k-light.lua'],
  'windows-terminal': ['santi020k-dark.json', 'santi020k-light.json'],
}

const destinations = [
  { source: resolve(root, 'packages/santi020k-terminal-theme/iterm2'), destination: resolve(root, 'apps/terminal-website/public/themes'), files: ['Santi020k Dark.itermcolors', 'Santi020k Light.itermcolors'] },
  { source: resolve(root, 'packages/santi020k-terminal-theme/starship'), destination: resolve(root, 'apps/terminal-website/public/starship'), files: ['santi020k-dark.toml', 'santi020k-light.toml', 'santi020k-dark-portable.toml', 'santi020k-light-portable.toml', 'santi020k-dark-minimal.toml', 'santi020k-light-minimal.toml'] },
  { source: resolve(root, 'packages/santi020k-terminal-theme/zsh'), destination: resolve(root, 'apps/terminal-website/public/zsh'), files: ['install.zsh', 'santi020k.zsh', 'santi020k-auto-theme.zsh'] },
  ...['ghostty', 'kitty', 'wezterm', 'windows-terminal', 'alacritty'].map(format => ({
    source: resolve(root, 'packages/santi020k-terminal-theme', format),
    destination: resolve(root, 'apps/terminal-website/public/ports', format),
    // Format comes from the fixed literal list above.
    // eslint-disable-next-line security/detect-object-injection
    files: portFiles[format],
  })),
]

for (const group of destinations) {
  await mkdir(group.destination, { recursive: true })

  for (const file of group.files) await copyFile(resolve(group.source, file), resolve(group.destination, file))
}

console.log('Synced terminal presets into the Terminal website.')
