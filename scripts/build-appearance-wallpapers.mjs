import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { wallpaperDesigns } from '../artwork/wallpaper-catalog.mjs'

const root = resolve(import.meta.dirname, '..')
const directory = resolve(root, 'artwork/appearance')
const argumentsList = process.argv.slice(2)

if (argumentsList.length > 1 || argumentsList.some(value => value !== '--check')) throw new Error('Usage: build-appearance-wallpapers.mjs [--check]')

const check = argumentsList.includes('--check')

if (process.platform !== 'darwin') throw new Error('Appearance wallpaper generation and native checks require macOS ImageIO.')

await mkdir(directory, { recursive: true })

/** @param {string} path */
const hash = async path => createHash('sha256').update(await readFile(path)).digest('hex')
const generator = await hash(resolve(root, 'scripts/wallpapers/appearance.swift'))
const entries = []

for (const design of wallpaperDesigns) {
  const inputs = ['light', 'dark'].map(mode => `artwork/${design.directory}/${design.family}-${mode}-desktop.png`)
  const file = `${design.slug}.heic`
  const result = spawnSync('swift', [resolve(root, 'scripts/wallpapers/appearance.swift'), check ? 'check' : 'build', ...inputs.map(path => resolve(root, path)), resolve(directory, file)], { stdio: 'inherit' })

  if (result.error) throw result.error

  if (result.status !== 0) throw new Error(`Appearance wallpaper ${check ? 'validation' : 'generation'} failed: ${design.slug}`)

  entries.push({ slug: design.slug, file, sourceHashes: await Promise.all(inputs.map(path => hash(resolve(root, path)))), sha256: await hash(resolve(directory, file)) })
}

const manifest = `${JSON.stringify({ generator, entries }, null, 2)}\n`
const manifestPath = resolve(directory, 'manifest.json')

if (check) {
  if (await readFile(manifestPath, 'utf8') !== manifest) throw new Error('Appearance assets or sources changed. Run pnpm run generate:appearance on macOS.')
} else await writeFile(manifestPath, manifest)
