import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { palettes } from '../palettes.mjs'
import { promptVariants, starshipFilename } from '../prompt-presets.mjs'

import { renderAlacritty, renderGhostty, renderIterm, renderKitty, renderStarship, renderWezterm, renderWindowsTerminal } from './build.mjs'
import { renderPreviewSvg } from './preview-assets.mjs'

const root = resolve(import.meta.dirname, '..')
const websiteStarship = resolve(root, '../../apps/terminal-website/public/starship')
const websitePorts = resolve(root, '../../apps/terminal-website/public/ports')
const checks = []

for (const palette of Object.values(palettes)) {
  checks.push([resolve(root, 'iterm2', `${palette.name}.itermcolors`), renderIterm(palette)])

  const portChecks = [
    ['ghostty', `santi020k-${palette.slug}`, renderGhostty(palette)],
    ['kitty', `santi020k-${palette.slug}.conf`, renderKitty(palette)],
    ['wezterm', `santi020k-${palette.slug}.lua`, renderWezterm(palette)],
    ['windows-terminal', `santi020k-${palette.slug}.json`, renderWindowsTerminal(palette)],
    ['alacritty', `santi020k-${palette.slug}.toml`, renderAlacritty(palette)],
  ]

  for (const [directory, filename, rendered] of portChecks) {
    checks.push([resolve(root, directory, filename), rendered])

    checks.push([resolve(websitePorts, directory, filename), rendered])
  }

  checks.push([resolve(root, 'assets/previews', `starship-${palette.slug}.svg`), renderPreviewSvg(palette)])

  for (const variantKey of Object.keys(promptVariants)) {
    const filename = starshipFilename(palette.slug, variantKey)
    const rendered = renderStarship(palette, variantKey)

    checks.push([resolve(root, 'starship', filename), rendered])

    checks.push([resolve(websiteStarship, filename), rendered])
  }
}

for (const [path, expected] of checks) {
  const actual = await readFile(path, 'utf8')

  if (actual !== expected) throw new Error(`Generated file is stale: ${path}`)
}

console.log(`Verified ${checks.length} generated terminal assets are current.`)
