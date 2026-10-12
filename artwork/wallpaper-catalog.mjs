/** Wallpaper designs with permanent pages and downloads, including archived designs. */
export const wallpaperDesigns = [
  {
    slug: 'halo', name: 'Halo', collection: 'minimal', directory: 'minimal-v2', family: 'halo',
    tagline: 'A quiet circle. An open canvas.',
    description: 'A minimal violet wallpaper with a single circular recess, a fine rim, and a small terminal prompt. Available for desktop and phone in light and dark.',
    story: 'Halo takes the personal website’s quiet surfaces and reduces them to one circular gesture. The shallow recess sits at the edge of the frame, leaving the rest of the screen open for your work.',
    detail: 'The dark edition uses deep plum and a muted violet rim. The light edition uses pale lilac and a soft inward shadow. Phone compositions keep the upper canvas clear for a clock and widgets.',
    alt: 'A shallow circular recess with a fine violet rim and a small purple terminal prompt'
  },
  {
    slug: 'contour', name: 'Contour', collection: 'minimal', directory: 'minimal-v1', family: 'contour',
    tagline: 'A little shape. A lot of space.',
    description: 'Minimal desktop and phone wallpaper inspired by the santi020k website: one sculpted curve, a small purple prompt, and generous negative space.',
    story: 'Contour borrows the sculpted corner of the personal website’s navigation. A single matte plane enters from the edge, with a fine violet outline and a small inset prompt.',
    detail: 'Pale lilac and deep ink editions share the same quiet composition. The phone versions move the curve toward the bottom, leaving room for a clock without placing it over the artwork.',
    alt: 'A fine S-shaped contour across a matte surface with a tiny purple terminal prompt'
  },
  {
    slug: 'glass', name: 'Glass', collection: 'signature', directory: 'signature-v1', family: 'signature',
    tagline: 'Light, held in violet glass.',
    description: 'Purple glass wallpaper with the Santi020k terminal mark among translucent forms. Download light and dark desktop and phone versions.',
    story: 'Glass places the familiar terminal prompt among translucent violet lenses and spheres. Reflections give the scene depth while the open background keeps it usable as a wallpaper.',
    detail: 'The dark scene emphasizes luminous edges against ink. The light scene reveals softer lavender reflections. Each phone composition arranges the glass around the lower part of the screen.',
    alt: 'A purple terminal prompt tile surrounded by translucent violet glass forms'
  },
  {
    slug: 'satin', name: 'Satin', collection: 'signature', directory: 'signature-v2', family: 'satin',
    tagline: 'Soft folds. A familiar signature.',
    description: 'Violet satin wallpaper with a small Santi020k prompt tile, soft fabric folds, and light or dark compositions for desktop and phone.',
    story: 'Satin brings the terminal mark into a softer setting. Broad fabric folds catch the light and lead toward the purple prompt without filling every part of the canvas.',
    detail: 'Choose dark for deeper violet shadows or light for gentler fabric highlights. The portrait artwork is composed separately to leave breathing room above the subject.',
    alt: 'A purple terminal prompt tile resting among flowing violet satin folds'
  },
  {
    slug: 'ceramic', name: 'Ceramic', collection: 'signature', directory: 'signature-v2', family: 'ceramic',
    tagline: 'Matte forms. Gentle shadows.',
    description: 'A sculptural ceramic wallpaper with matte violet forms and the Santi020k terminal prompt. Light and dark downloads for desktop and phone.',
    story: 'Ceramic explores solid, matte shapes around the terminal prompt. Soft lighting and rounded forms create depth without the reflections of the Glass collection.',
    detail: 'The paired appearances keep the same material character, from pale lavender to deep plum. Independently arranged phone scenes keep their focal forms below the clock area.',
    alt: 'Matte sculptural ceramic forms arranged around a small purple terminal prompt'
  },
  {
    slug: 'tide', name: 'Tide', collection: 'sculpted', directory: 'sculpted-v2', family: 'tide',
    tagline: 'Violet, in motion.',
    description: 'An abstract violet satin wallpaper with flowing folds and soft light. Unbranded light and dark artwork for desktop and phone.',
    story: 'Tide follows the movement of satin across the frame. The broad folds create a slow visual rhythm, with highlights that fade into quiet space.',
    detail: 'There is no logo or text in this design. Light and dark editions retain the fabric’s soft character, and the phone images use their own compositions rather than a desktop crop.',
    alt: 'Flowing violet satin folds with soft highlights and open negative space'
  },
  {
    slug: 'dune', name: 'Dune', archived: true, collection: 'sculpted', directory: 'sculpted-v2', family: 'dune',
    tagline: 'A landscape for your screen.',
    description: 'Violet dune wallpaper with soft sand ridges and a quiet horizon. Download unbranded light and dark desktop and phone artwork.',
    story: 'Dune turns the violet palette into a landscape of soft ridges. Light traces the sand while the open horizon leaves the composition calm and spacious.',
    detail: 'The artwork contains no text or brand mark. Dark and light landscapes offer different moods, with separate portrait compositions designed around a phone screen.',
    alt: 'Soft violet sand ridges beneath a calm open horizon'
  },
  {
    slug: 'veil', name: 'Veil', archived: true, collection: 'sculpted', directory: 'sculpted-v2', family: 'veil',
    tagline: 'Depth, softly diffused.',
    description: 'Frosted glass wallpaper with soft violet light and layered translucency. Unbranded desktop and phone downloads in light and dark.',
    story: 'Veil lets light pass through frosted glass, softening the shapes behind it. The composition uses translucency and gentle violet color instead of a central logo.',
    detail: 'Choose pale lavender diffusion or deeper violet contrast. The phone editions preserve the material’s soft depth while keeping space available for the lock screen.',
    alt: 'Frosted glass forms diffusing soft violet light'
  }
]

export const currentWallpaperDesigns = wallpaperDesigns.filter(design => !('archived' in design && design.archived))

export const appearances = ['dark', 'light']
export const devices = ['desktop', 'mobile']
export const exportProfiles = [
  { id: 'webp-small', label: 'WEBP · Smaller file', extension: 'webp', quality: 80 },
  { id: 'webp-high', label: 'WEBP · High quality', extension: 'webp', quality: 94 },
  { id: 'jpg-high', label: 'JPG · High quality', extension: 'jpg', quality: 92 },
  { id: 'png-lossless', label: 'PNG · Lossless', extension: 'png', quality: 100 }
]
export const resolutions = [
  { id: '1920x1080', device: 'desktop', width: 1920, height: 1080, label: '1920 × 1080 · Full HD' },
  { id: '2560x1440', device: 'desktop', width: 2560, height: 1440, label: '2560 × 1440 · QHD' },
  { id: '3840x2160', device: 'desktop', width: 3840, height: 2160, label: '3840 × 2160 · 4K size' },
  { id: '1080x2340', device: 'mobile', width: 1080, height: 2340, label: '1080 × 2340 · Phone' },
  { id: '1170x2532', device: 'mobile', width: 1170, height: 2532, label: '1170 × 2532 · Phone' }
]

/** @param {string} slug */
export const wallpaperHref = slug => `/gallery/${slug}/`

/** @param {string} slug */
export const socialPreviewHref = slug => `/downloads/wallpapers-v1/${slug}/social.webp`

/**
 * @param {string} slug
 * @param {string} appearance
 * @param {string} resolutionId
 * @param {string} profileId
 */
export const downloadHref = (slug, appearance, resolutionId, profileId) => {
  const design = wallpaperDesigns.find(item => item.slug === slug)
  const resolution = resolutions.find(item => item.id === resolutionId)
  const profile = exportProfiles.find(item => item.id === profileId)

  if (!design || !resolution || !profile || !appearances.includes(appearance)) return undefined

  return `/downloads/wallpapers-v1/${slug}/${slug}-${appearance}-${resolution.device}-${resolution.id}-${profile.id}.${profile.extension}`
}

/** @param {string} slug @param {string} appearance @param {string} device */
export const previewHref = (slug, appearance = 'dark', device = 'desktop') => {
  const href = downloadHref(slug, appearance, device === 'mobile' ? '1080x2340' : '1920x1080', 'webp-high')

  if (!href) throw new Error(`Unknown wallpaper preview: ${slug}`)

  return href
}
