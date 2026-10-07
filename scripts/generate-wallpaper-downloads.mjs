import { createHash } from 'node:crypto'
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'

import sharp from 'sharp'

import { appearances, downloadHref, exportProfiles, resolutions, socialPreviewHref, wallpaperDesigns } from '../artwork/wallpaper-catalog.mjs'

const root = resolve(import.meta.dirname, '..')
const publicDirectory = resolve(root, 'apps/website/public')
const cacheDirectory = resolve(root, 'apps/website/.astro/wallpaper-downloads')
const generator = await readFile(import.meta.filename)

/** @param {string} cachePath @param {string} fingerprint @param {string[]} files */
const hasCachedFiles = async (cachePath, fingerprint, files) => {
  try {
    if (await readFile(cachePath, 'utf8') !== fingerprint) return false

    await Promise.all(files.map(file => access(file)))

    return true
  } catch {
    return false
  }
}

await mkdir(cacheDirectory, { recursive: true })

let created = 0
const variants = wallpaperDesigns.flatMap(design => appearances.flatMap(appearance => ['desktop', 'mobile'].map(device => ({ design, appearance, device }))))

for (const { design, appearance, device } of variants) {
  const source = await readFile(resolve(root, 'artwork', design.directory, `${design.family}-${appearance}-${device}.png`))
  const sizes = resolutions.filter(item => item.device === device)
  const fingerprint = createHash('sha256').update(source).update(generator).update(JSON.stringify({ sizes, exportProfiles, sharp: sharp.versions })).digest('hex')
  const cachePath = resolve(cacheDirectory, `${design.slug}-${appearance}-${device}`)

  const outputs = sizes.flatMap(size => exportProfiles.map(profile => {
    const href = downloadHref(design.slug, appearance, size.id, profile.id)

    if (!href) throw new Error(`Invalid wallpaper export: ${design.slug}`)

    return { size, profile, destination: resolve(publicDirectory, `.${href}`) }
  }))

  if (await hasCachedFiles(cachePath, fingerprint, outputs.map(output => output.destination))) continue

  // Limit memory to four encoders at a time.
  for (let index = 0; index < outputs.length; index += 4) {
    await Promise.all(outputs.slice(index, index + 4).map(async ({ size, profile, destination }) => {
      const pipeline = sharp(source).resize(size.width, size.height, { fit: 'cover', position: 'centre' }).flatten()

      await mkdir(dirname(destination), { recursive: true })

      if (profile.extension === 'png') await pipeline.png({ compressionLevel: 9 }).toFile(destination)
      else if (profile.extension === 'jpg') await pipeline.jpeg({ quality: profile.quality }).toFile(destination)
      else await pipeline.webp({ quality: profile.quality, effort: 4 }).toFile(destination)

      created += 1
    }))
  }

  await writeFile(cachePath, fingerprint)
}

for (const design of wallpaperDesigns) {
  const source = resolve(root, 'artwork', design.directory, `${design.family}-dark-desktop.png`)
  const destination = resolve(publicDirectory, `.${socialPreviewHref(design.slug)}`)

  await sharp(source).resize(1200, 630, { fit: 'cover' }).webp({ quality: 90 }).toFile(destination)
}

console.log(`Generated ${created} wallpaper downloads and 8 social previews; unchanged downloads reused.`)
