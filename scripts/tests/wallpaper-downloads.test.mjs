import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'
import { describe, expect, it } from 'vitest'

import { appearances, downloadHref, exportProfiles, previewHref, resolutions, wallpaperDesigns, wallpaperHref } from '../../artwork/wallpaper-catalog.mjs'

const publicRoot = new URL('../../apps/website/public/', import.meta.url)

describe('Wallpaper detail and download contracts', () => {
  it('rejects unsupported designs, appearances, resolutions, and profiles', () => {
    expect(downloadHref('../escape', 'dark', '1920x1080', 'webp-high')).toBeUndefined()

    expect(downloadHref('halo', 'night', '1920x1080', 'webp-high')).toBeUndefined()

    expect(downloadHref('halo', 'dark', '9999x9999', 'webp-high')).toBeUndefined()

    expect(downloadHref('halo', 'dark', '1920x1080', 'svg')).toBeUndefined()
  })

  it('provides unique pages, image sitemap entries, and distinct descriptive content', async () => {
    const sitemap = await readFile(new URL('sitemap.xml', publicRoot), 'utf8')

    expect(new Set(wallpaperDesigns.map(design => design.slug)).size).toBe(wallpaperDesigns.length)

    expect(new Set(wallpaperDesigns.map(design => design.description)).size).toBe(wallpaperDesigns.length)

    for (const design of wallpaperDesigns) {
      expect(sitemap).toContain(`https://theme.santi020k.com${wallpaperHref(design.slug)}`)

      expect(sitemap).toContain(`https://theme.santi020k.com${previewHref(design.slug)}`)

      expect(design.story.length).toBeGreaterThan(100)
    }
  })

  it.each(wallpaperDesigns)('exports every supported size and encoding for $name', async design => {
    const unique = new Set()

    for (const appearance of appearances) {
      for (const size of resolutions) {
        for (const profile of exportProfiles) {
          const href = downloadHref(design.slug, appearance, size.id, profile.id)

          expect(href).toBeDefined()

          if (!href) throw new Error('Missing supported download URL')

          unique.add(href)

          const metadata = await sharp(fileURLToPath(new URL(`.${href}`, publicRoot))).metadata()

          expect(metadata).toMatchObject({ width: size.width, height: size.height, format: profile.extension === 'jpg' ? 'jpeg' : profile.extension, hasAlpha: false })
        }
      }
    }

    expect(unique.size).toBe(40)
  })

  it('offers a genuinely smaller WEBP option for the same artwork and size', async () => {
    const small = await readFile(new URL('downloads/wallpapers-v1/halo/halo-dark-desktop-1920x1080-webp-small.webp', publicRoot))
    const high = await readFile(new URL('downloads/wallpapers-v1/halo/halo-dark-desktop-1920x1080-webp-high.webp', publicRoot))

    expect(small.length).toBeLessThan(high.length)
  })
})
