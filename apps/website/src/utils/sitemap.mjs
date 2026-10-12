import { bannerDesigns, bannerHref, bannerLayouts, bannerPreviewHref } from '../../../../artwork/banner-catalog.mjs'
import { appearances, devices, previewHref, wallpaperDesigns } from '../../../../artwork/wallpaper-catalog.mjs'

const origin = 'https://theme.santi020k.com'

/** @param {string} value */
const escapeXml = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll('\'', '&#39;')

/** Use Astro page sources so new static routes cannot drift from the sitemap.
 * @param {readonly string[]} pageFiles
 */
export const createSitemap = pageFiles => {
  const routes = new Set(pageFiles.filter(file => !file.includes('[')).map(file => {
    const path = file.replace(/^.*\/pages\//, '').replace(/\.astro$/, '').replace(/(^|\/)index$/, '')

    return `/${path}${path && !path.endsWith('/') ? '/' : ''}`
  }))

  const images = new Map(wallpaperDesigns.map(design => {
    const route = `/gallery/${design.slug}/`

    routes.add(route)

    const files = appearances.flatMap(appearance => devices.map(device => previewHref(design.slug, appearance, device)))

    return [route, files]
  }))

  for (const design of bannerDesigns) {
    const route = bannerHref(design.slug)

    routes.add(route)

    const files = []

    for (const appearance of appearances) {
      for (const layout of bannerLayouts) files.push(bannerPreviewHref(design.slug, appearance, layout.id))
    }

    images.set(route, files)
  }

  const urls = [...routes].sort().map(route => {
    const imageEntries = (images.get(route) ?? []).map(image => `<image:image><image:loc>${escapeXml(new URL(image, origin).href)}</image:loc></image:image>`).join('')

    return `  <url><loc>${escapeXml(new URL(route, origin).href)}</loc>${imageEntries}</url>`
  })

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`
}
