import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import sharp from 'sharp'

const repoRoot = resolve(import.meta.dirname, '..')
const sourceDirectory = resolve(repoRoot, 'packages/santi020k-theme/assets/source/previews')
const variants = ['dark', 'light', 'hc-dark', 'hc-light']

const pngDirectories = [
  'packages/santi020k-theme/assets/previews',
  'packages/theme/assets/vscode/previews',
  'apps/vscode-website/public',
  'apps/website/public',
  'apps/zed-website/public'
]

// Screenshots are the source of truth. Never draw or recolor an editor preview.
for (const variant of variants) {
  const file = `preview-${variant}`
  const capture = await readFile(resolve(sourceDirectory, `${file}.jpg`))
  const { width, height } = await sharp(capture).metadata()

  if (!width || !height) {
    throw new Error(`Missing screenshot dimensions: ${file}`)
  }

  const png = await sharp(capture).png().toBuffer()

  for (const directory of pngDirectories) {
    await mkdir(resolve(repoRoot, directory), { recursive: true })

    await writeFile(resolve(repoRoot, directory, `${file}.png`), png)
  }

  // Preserve existing public SVG exports as wrappers around the real capture.
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><image width="${width}" height="${height}" href="data:image/png;base64,${png.toString('base64')}"/></svg>\n`
  const sourceSvg = resolve(sourceDirectory, `${file}.svg`)

  await writeFile(sourceSvg, svg)

  await copyFile(sourceSvg, resolve(repoRoot, 'packages/theme/assets/vscode/previews', `${file}.svg`))
}

const lightPreview = resolve(repoRoot, 'packages/santi020k-theme/assets/previews/preview-light.png')

await sharp(lightPreview).webp({ quality: 90 }).toFile(resolve(repoRoot, 'packages/theme/assets/projects/santi020k-theme/preview-light.webp'))

console.log('Synchronized real VS Code screenshots and compatible SVG exports')
