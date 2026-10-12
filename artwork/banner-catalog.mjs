import { appearances, exportProfiles } from './wallpaper-catalog.mjs'

export const bannerDesigns = [
  {
    slug: 'studio', name: 'Studio', tagline: 'A small space for big ideas.',
    description: 'Ceramic arches, violet glass, and a familiar terminal mark. Download Studio as a wide banner or square cover in light and dark.',
    story: 'Studio brings the terminal mark into a quiet still life of ceramic, glass, and stone. The wide banner leaves open space beside the arrangement; the square cover brings the objects together into a separate, centered composition.',
    alt: 'A ceramic arch, violet glass panel, and purple terminal tile in a softly lit studio'
  },
  {
    slug: 'orbit', name: 'Orbit', tagline: 'A little gravity. A lot of space.',
    description: 'A floating violet glass sphere with delicate metal rings. Download Orbit as a wide banner or square cover in light and dark.',
    story: 'Orbit suspends a violet glass sphere inside two fine rings. The wide banner gives the sculpture room to float; the square cover places it at the center. Paired light and dark editions retain the same composition and material character.',
    alt: 'A floating violet glass sphere encircled by two thin intersecting metal rings'
  }
]

export const bannerLayouts = [
  { id: 'wide', name: 'Wide banner', width: 2160, height: 720, label: 'Wide banner · 2160 × 720' },
  { id: 'square', name: 'Square cover', width: 1200, height: 1200, label: 'Square cover · 1200 × 1200' }
]

/** @param {string} slug */
export const bannerHref = slug => `/gallery/banners/${slug}/`

/** @param {string} slug @param {string} appearance @param {string} layoutId @param {string} profileId */
export const bannerDownloadHref = (slug, appearance, layoutId, profileId) => {
  const design = bannerDesigns.find(item => item.slug === slug)
  const layout = bannerLayouts.find(item => item.id === layoutId)
  const profile = exportProfiles.find(item => item.id === profileId)

  if (!design || !layout || !profile || !appearances.includes(appearance)) return undefined

  return `/downloads/banners-v1/${slug}/${slug}-${appearance}-${layout.id}-${layout.width}x${layout.height}-${profile.id}.${profile.extension}`
}

/** @param {string} slug @param {string} appearance @param {string} layout */
export const bannerPreviewHref = (slug, appearance = 'dark', layout = 'wide') => {
  if (!bannerDownloadHref(slug, appearance, layout, 'webp-high')) throw new Error(`Unknown banner preview: ${slug}`)

  return `/downloads/banners-v1/${slug}/${slug}-${appearance}-${layout}-preview.webp`
}

/** @param {string} slug */
export const bannerSocialHref = slug => `/downloads/banners-v1/${slug}/social.webp`
