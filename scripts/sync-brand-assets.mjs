import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import sharp from 'sharp'

const repoRoot = resolve(import.meta.dirname, '..')
const canonicalSvg = resolve(repoRoot, 'packages/theme/assets/logos/logo-square.svg')
const canonicalPng = resolve(repoRoot, 'packages/theme/assets/logos/logo-square.png')
const canonicalWebp = resolve(repoRoot, 'packages/theme/assets/logos/logo-square.webp')

const assetGroups = [
  {
    source: canonicalSvg,
    targets: [
      'favicon.svg',
      'apps/website/public/favicon.svg',
      'apps/vscode-website/public/favicon.svg',
      'apps/zed-website/public/favicon.svg',
      'apps/chrome-website/public/icons/icon.svg',
      'apps/terminal-website/public/favicon.svg'
    ]
  },
  {
    source: canonicalPng,
    targets: [
      'apps/website/public/icon-512.png',
      'apps/vscode-website/public/icon-512.png',
      'apps/zed-website/public/icon-512.png'
    ]
  },
  {
    source: canonicalWebp,
    targets: ['packages/theme/assets/projects/santi020k-theme/logo.webp']
  },
  {
    source: canonicalPng,
    size: 32,
    targets: ['apps/terminal-website/public/favicon-32x32.png']
  },
  {
    source: canonicalPng,
    size: 180,
    targets: ['apps/terminal-website/public/apple-touch-icon.png']
  }
]

const assets = assetGroups.flatMap(({ size, source, targets }) =>
  targets.map(target => ({ size, source, target: resolve(repoRoot, target) })))

const renderAsset = async ({ size, source }) => {
  if (!size) return readFile(source)

  return sharp(source).resize(size, size).png({ compressionLevel: 9 }).toBuffer()
}

if (process.argv.includes('--check')) {
  const mismatches = []

  for (const asset of assets) {
    const { target } = asset

    const [sourceContents, targetContents] = await Promise.all([
      renderAsset(asset),
      readFile(target)
    ])

    if (!sourceContents.equals(targetContents)) mismatches.push(target)
  }

  if (mismatches.length > 0) {
    throw new Error(`Brand assets are out of sync:\n${mismatches.join('\n')}`)
  }

  console.log('Verified the canonical Santi020k brand mark across theme-family assets.')
} else {
  await Promise.all(
    assets.map(async asset => writeFile(asset.target, await renderAsset(asset))))

  console.log('Synced the canonical Santi020k brand mark to theme-family assets.')
}
