import { copyFile, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

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
      'apps/zed-website/public/favicon.svg'
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
  }
]

const assets = assetGroups.flatMap(({ source, targets }) =>
  targets.map(target => ({ source, target: resolve(repoRoot, target) })))

if (process.argv.includes('--check')) {
  const mismatches = []

  for (const { source, target } of assets) {
    const [sourceContents, targetContents] = await Promise.all([
      readFile(source),
      readFile(target)
    ])

    if (!sourceContents.equals(targetContents)) mismatches.push(target)
  }

  if (mismatches.length > 0) {
    throw new Error(`Brand assets are out of sync:\n${mismatches.join('\n')}`)
  }

  console.log('Verified the canonical Santi020k brand mark across theme-family assets.')
} else {
  await Promise.all(assets.map(({ source, target }) => copyFile(source, target)))

  console.log('Synced the canonical Santi020k brand mark to theme-family assets.')
}
