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
  { directory: 'sculpted-v2', families: ['tide', 'dune', 'veil'], archive: 'santi020k-sculpted-wallpapers-v2.zip' },
  { directory: 'signature-v1', families: ['signature'], archive: 'santi020k-signature-wallpapers-v1.zip' }
]

for (const collection of collections) {
  const sourceDirectory = resolve(root, 'artwork', collection.directory)
  const outputDirectory = resolve(root, 'packages/theme/assets/wallpapers', collection.directory)

  const names = collection.families.flatMap(family =>
    ['dark', 'light'].flatMap(variant =>
      Object.keys(dimensions).map(device => ({ name: `${family}-${variant}-${device}`, device }))))

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
  for (const name of names.map(entry => entry.name).sort()) {
    archive.file(resolve(outputDirectory, `${name}.webp`), { date, name: `${name}.webp` })
  }

  await Promise.all([archive.finalize(), completion])

  console.log(`Exported ${names.length} ${collection.directory} wallpapers and the WEBP collection archive.`)
}
