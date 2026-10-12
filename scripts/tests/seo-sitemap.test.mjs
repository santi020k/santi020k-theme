import { describe, expect, it } from 'vitest'

import { createSitemap } from '../../apps/website/src/utils/sitemap.mjs'
import { wallpaperDesigns } from '../../artwork/wallpaper-catalog.mjs'

const origin = 'https://theme.santi020k.com'

describe('consolidated SEO sitemap', () => {
  it('discovers root, flat, nested, and newly added static pages without indexing parameters', () => {
    const xml = createSitemap(['/pages/index.astro', '/pages/support.astro', '/pages/terminal/docs/index.astro', '/pages/new/index.astro', '/pages/gallery/[slug].astro'])

    for (const path of ['/', '/support/', '/terminal/docs/', '/new/']) {
      expect(xml).toContain(`<loc>${origin}${path}</loc>`)
    }

    expect(xml).not.toContain('[slug]')

    expect(xml).not.toContain('/index/')

    expect(xml).not.toContain('changefreq')

    expect(xml).not.toContain('lastmod')
  })

  it('lists each wallpaper once with all four indexable appearance/device images', () => {
    const xml = createSitemap(['/pages/gallery/[slug].astro'])

    for (const design of wallpaperDesigns) {
      expect(xml.split(`<loc>${origin}/gallery/${design.slug}/</loc>`)).toHaveLength(2)
    }

    expect(xml.match(/<image:loc>/g)).toHaveLength(wallpaperDesigns.length * 4)

    expect(xml).toContain('-light-mobile-1080x2340-webp-high.webp')

    expect(xml).toContain('-dark-desktop-1920x1080-webp-high.webp')
  })

  it('escapes XML and emits deterministic, duplicate-free routes', () => {
    const files = ['/pages/b.astro', '/pages/a&b.astro', '/pages/b.astro']

    expect(createSitemap(files)).toBe(createSitemap([...files].reverse()))

    expect(createSitemap(files)).toContain('/a&amp;b/</loc>')

    expect(createSitemap(files).split(`<loc>${origin}/b/</loc>`)).toHaveLength(2)
  })
})
