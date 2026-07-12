import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { palettes } from '../palettes.mjs'
import { renderPreviewSvg } from './preview-assets.mjs'

const destination = resolve(import.meta.dirname, '../assets/previews')
await mkdir(destination, { recursive: true })
for (const palette of Object.values(palettes)) await writeFile(resolve(destination, `starship-${palette.slug}.svg`), renderPreviewSvg(palette))
console.log(`Generated ${Object.keys(palettes).length} deterministic Starship preview references.`)
