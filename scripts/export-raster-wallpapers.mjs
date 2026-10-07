import { createWriteStream } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { resolve } from 'node:path'
import { finished } from 'node:stream/promises'

import { ZipArchive } from 'archiver'
import sharp from 'sharp'

const root = resolve(import.meta.dirname, '..')
const archiveDirectory = resolve(root, 'apps/website/public/downloads')

const dimensions = {
  desktop: { width: 3840, height: 2160 },
  mobile: { width: 1170, height: 2532 }
}

const collections = [
  { directory: 'sculpted-v2', families: ['tide', 'dune', 'veil'], archive: 'santi020k-sculpted-wallpapers-v2.zip', include: [] },
  { directory: 'signature-v1', families: ['signature'], archive: 'santi020k-signature-wallpapers-v1.zip', include: [] },
  { directory: 'signature-v2', families: ['satin', 'ceramic'], archive: 'santi020k-signature-wallpapers-v2.zip', include: ['signature-v1'] },
  { directory: 'minimal-v1', families: ['contour'], archive: 'santi020k-minimal-wallpapers-v1.zip', include: [] },
  { directory: 'minimal-v2', families: ['halo'], archive: 'santi020k-minimal-wallpapers-v2.zip', include: ['minimal-v1'] }
]

/** @param {string[]} families */
const wallpaperNames = families => families.flatMap(family =>
  ['dark', 'light'].flatMap(variant =>
    Object.keys(dimensions).map(device => ({ name: `${family}-${variant}-${device}`, device }))))

for (const collection of collections) {
  const sourceDirectory = resolve(root, 'artwork', collection.directory)
  const outputDirectory = resolve(root, 'packages/theme/assets/wallpapers', collection.directory)
  const names = wallpaperNames(collection.families)

  await mkdir(outputDirectory, { recursive: true })

  // Artwork is authored separately for each orientation. This only creates display exports.
  for (const { name, device } of names) {
    const source = resolve(sourceDirectory, `${name}.png`)
    const output = resolve(outputDirectory, name)
    const image = sharp(source).resize({ ...dimensions[device], fit: 'cover', position: 'centre' })

    await Promise.all([
      image.clone().png({ compressionLevel: 9 }).toFile(`${output}.png`),
      image.clone().webp({ quality: 94, effort: 6 }).toFile(`${output}.webp`)
    ])
  }

  await mkdir(archiveDirectory, { recursive: true })

  const output = createWriteStream(resolve(archiveDirectory, collection.archive))
  const archive = new ZipArchive({ statConcurrency: 1, zlib: { level: 9 } })
  const completion = finished(output)
  const date = new Date('2026-01-01T00:00:00Z')

  archive.on('error', error => output.destroy(error))

  archive.on('warning', error => output.destroy(error))

  archive.pipe(output)

  // WEBP keeps the complete pack small; lossless PNG downloads are available individually.
  const includedCollections = [collection, ...collections.filter(candidate => collection.include.includes(candidate.directory))]

  for (const included of includedCollections) {
    for (const name of wallpaperNames(included.families).map(entry => entry.name).sort()) {
      const path = resolve(root, 'packages/theme/assets/wallpapers', included.directory, `${name}.webp`)

      archive.file(path, { date, name: `${name}.webp` })
    }
  }

  await Promise.all([archive.finalize(), completion])

  console.log(`Exported ${names.length} ${collection.directory} wallpapers and the WEBP collection archive.`)
}
