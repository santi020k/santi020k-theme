import { createHash } from 'node:crypto'
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import sharp from 'sharp'

import { bannerDesigns, bannerDownloadHref, bannerLayouts, bannerPreviewHref, bannerSocialHref } from '../artwork/banner-catalog.mjs'
import { appearances, exportProfiles } from '../artwork/wallpaper-catalog.mjs'

const root = resolve(import.meta.dirname, '..')
const publicDirectory = resolve(root, 'apps/website/public')
const cacheDirectory = resolve(root, 'apps/website/.astro/banner-downloads')
const generator = await readFile(import.meta.filename)
/** @param {string} href */
const destination = href => resolve(publicDirectory, `.${href}`)

/** @param {string} path @param {string} fingerprint @param {string[]} outputs */
const cached = async (path, fingerprint, outputs) => {
  try {
    if (await readFile(path, 'utf8') !== fingerprint) return false

    await Promise.all(outputs.map(output => access(output)))

    return true
  } catch {
    return false
  }
}

await mkdir(cacheDirectory, { recursive: true })

let created = 0
const variants = appearances.flatMap(appearance => bannerLayouts.map(layout => ({ appearance, layout })))

for (const design of bannerDesigns) {
  await mkdir(destination(`/downloads/banners-v1/${design.slug}/`), { recursive: true })

  for (const { appearance, layout } of variants) {
    const source = await readFile(resolve(root, 'artwork/banners-v1', `${design.slug}-${appearance}-${layout.id}.png`))
    const metadata = await sharp(source).metadata()

    if (!metadata.width || !metadata.height || metadata.width < layout.width || metadata.height < layout.height || Math.abs(metadata.width / metadata.height - layout.width / layout.height) > 0.01) {
      throw new Error(`Banner master has insufficient dimensions or an unexpected ratio: ${design.slug}-${appearance}-${layout.id}`)
    }

    const outputs = exportProfiles.map(profile => {
      const href = bannerDownloadHref(design.slug, appearance, layout.id, profile.id)

      if (!href) throw new Error(`Invalid banner export: ${design.slug}`)

      return { profile, path: destination(href) }
    })

    const preview = destination(bannerPreviewHref(design.slug, appearance, layout.id))
    const fingerprint = createHash('sha256').update(source).update(generator).update(JSON.stringify({ layout, exportProfiles, sharp: sharp.versions })).digest('hex')
    const cachePath = resolve(cacheDirectory, `${design.slug}-${appearance}-${layout.id}`)

    if (await cached(cachePath, fingerprint, [...outputs.map(output => output.path), preview])) continue

    for (const { profile, path } of outputs) {
      const pipeline = sharp(source).resize(layout.width, layout.height).flatten()

      if (profile.extension === 'png') await pipeline.png({ compressionLevel: 9 }).toFile(path)
      else if (profile.extension === 'jpg') await pipeline.jpeg({ quality: profile.quality }).toFile(path)
      else await pipeline.webp({ quality: profile.quality, effort: 4 }).toFile(path)

      created += 1
    }

    await sharp(source).resize(layout.width / 2, layout.height / 2).webp({ quality: 90 }).toFile(preview)

    await writeFile(cachePath, fingerprint)
  }

  // A dedicated landscape social crop leaves the downloadable compositions intact.
  await sharp(resolve(root, 'artwork/banners-v1', `${design.slug}-light-square.png`)).resize(1200, 630).webp({ quality: 90 }).toFile(destination(bannerSocialHref(design.slug)))
}

console.log(`Generated ${created} banner downloads and 2 social previews; unchanged downloads reused.`)
