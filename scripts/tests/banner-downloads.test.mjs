import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'
import { describe, expect, it } from 'vitest'

import { createSitemap } from '../../apps/website/src/utils/sitemap.mjs'
import { bannerDesigns, bannerDownloadHref, bannerHref, bannerLayouts, bannerPreviewHref, bannerSocialHref } from '../../artwork/banner-catalog.mjs'
import { appearances, exportProfiles } from '../../artwork/wallpaper-catalog.mjs'

const publicRoot = new URL('../../apps/website/public/', import.meta.url)

describe('Banner and cover downloads', () => {
  it.each([
    ['../escape', 'dark', 'wide', 'webp-high'],
    ['studio', 'night', 'wide', 'webp-high'],
    ['studio', 'dark', 'desktop', 'webp-high'],
    ['studio', 'dark', 'wide', 'svg']
  ])('rejects unsupported selection %s / %s / %s / %s', (slug, appearance, layout, profile) => {
    expect(bannerDownloadHref(slug, appearance, layout, profile)).toBeUndefined()
  })

  it.each(bannerDesigns)('exports all appearances, compositions, and encodings for $name', async design => {
    const urls = new Set()
    const sitemap = createSitemap(['/pages/gallery/banners/[slug].astro'])

    expect(sitemap.split(`https://theme.santi020k.com${bannerHref(design.slug)}</loc>`)).toHaveLength(2)

    for (const appearance of appearances) {
      for (const layout of bannerLayouts) {
        const master = await sharp(fileURLToPath(new URL(`../../artwork/banners-v1/${design.slug}-${appearance}-${layout.id}.png`, import.meta.url))).metadata()

        expect(master.width).toBeGreaterThanOrEqual(layout.width)

        expect(master.height).toBeGreaterThanOrEqual(layout.height)

        const preview = bannerPreviewHref(design.slug, appearance, layout.id)

        expect(sitemap).toContain(`https://theme.santi020k.com${preview}`)

        expect(await sharp(fileURLToPath(new URL(`.${preview}`, publicRoot))).metadata()).toMatchObject({ width: layout.width / 2, height: layout.height / 2, format: 'webp' })

        for (const profile of exportProfiles) {
          const href = bannerDownloadHref(design.slug, appearance, layout.id, profile.id)

          if (!href) throw new Error('Missing supported banner download')

          urls.add(href)

          expect(await sharp(fileURLToPath(new URL(`.${href}`, publicRoot))).metadata()).toMatchObject({ width: layout.width, height: layout.height, format: profile.extension === 'jpg' ? 'jpeg' : profile.extension, hasAlpha: false })
        }
      }
    }

    expect(urls.size).toBe(16)

    expect(await sharp(fileURLToPath(new URL(`.${bannerSocialHref(design.slug)}`, publicRoot))).metadata()).toMatchObject({ width: 1200, height: 630, format: 'webp' })
  })

  it('keeps appearances distinct and offers smaller WEBP downloads', async () => {
    const bytes = async (appearance, profile) => {
      const href = bannerDownloadHref('studio', appearance, 'wide', profile)

      if (!href) throw new Error('Missing banner fixture')

      return readFile(new URL(`.${href}`, publicRoot))
    }

    const dark = await bytes('dark', 'webp-high')

    expect(dark.equals(await bytes('light', 'webp-high'))).toBe(false)

    expect((await bytes('dark', 'webp-small')).length).toBeLessThan(dark.length)
  })
})
