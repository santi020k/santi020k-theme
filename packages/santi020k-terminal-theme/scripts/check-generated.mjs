import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { palettes } from '../palettes.mjs'
import { promptVariants, starshipFilename } from '../prompt-presets.mjs'

import { renderIterm, renderStarship } from './build.mjs'
import { renderPreviewSvg } from './preview-assets.mjs'

const root = resolve(import.meta.dirname, '..')
const websiteStarship = resolve(root, '../../apps/terminal-website/public/starship')
const checks = []

for (const palette of Object.values(palettes)) {
  checks.push([resolve(root, 'iterm2', `${palette.name}.itermcolors`), renderIterm(palette)])

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
