import { describe, expect, it } from 'vitest'

import { getGalleryAssets } from '../../apps/website/src/data/gallery-assets.js'
import { currentWallpaperDesigns, downloadHref, wallpaperHref } from '../../artwork/wallpaper-catalog.mjs'

describe('Gallery curation', () => {
  it('shows only the six current wallpaper designs once each', () => {
    const assets = getGalleryAssets()

    expect(assets.map(asset => asset.design?.name)).toEqual(['Halo', 'Contour', 'Glass', 'Satin', 'Ceramic', 'Tide'])

    expect(assets.every(asset => asset.category === 'wallpapers')).toBe(true)

    expect(assets).toHaveLength(currentWallpaperDesigns.length)
  })

  it('archives Dune and Veil once each with all earlier wallpapers and brand assets', () => {
    const assets = getGalleryAssets(true)

    expect(assets.filter(asset => asset.design).map(asset => asset.design?.name)).toEqual(['Dune', 'Veil'])

    expect(assets.filter(asset => asset.category === 'wallpapers' && !asset.design)).toHaveLength(11)

    expect(assets.filter(asset => asset.category === 'banners')).toHaveLength(5)

    expect(assets.filter(asset => asset.category === 'logos')).toHaveLength(3)

    expect(assets.some(asset => getGalleryAssets().includes(asset))).toBe(false)
  })

  it('omits VS Code screenshot cards from both galleries', () => {
    expect([...getGalleryAssets(), ...getGalleryAssets(true)].some(asset => asset.title.startsWith('VS Code'))).toBe(false)
  })

  it.each(['dune', 'veil'])('preserves the permanent page and downloadable variants for %s', slug => {
    expect(wallpaperHref(slug)).toBe(`/gallery/${slug}/`)

    expect(downloadHref(slug, 'dark', '1920x1080', 'webp-high')).toContain(`/wallpapers-v1/${slug}/`)

    expect(downloadHref(slug, 'light', '1170x2532', 'png-lossless')).toContain(`${slug}-light-mobile`)
  })
})
