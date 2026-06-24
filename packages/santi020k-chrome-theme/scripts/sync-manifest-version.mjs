#!/usr/bin/env node
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { chromeThemeVariantManifests } from '@santi020k/theme'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const pkg = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'))
const manifestFiles = [...new Set(Object.values(chromeThemeVariantManifests).map(({ manifest }) => manifest))]

for (const manifestFile of manifestFiles) {
  const manifestPath = resolve(root, manifestFile)
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

  if (manifest.version === pkg.version) {
    console.log(`${manifestFile} already at ${pkg.version}`)

    continue
  }

  manifest.version = pkg.version

  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`)

  console.log(`Updated ${manifestFile} to ${pkg.version}`)
}
