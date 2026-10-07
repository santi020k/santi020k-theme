import { stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'
import { describe, expect, it } from 'vitest'

import { getAssets } from '../../packages/theme/index.js'

const packageRoot = new URL('../../packages/theme/', import.meta.url)

describe('Sculpted wallpaper downloads', () => {
  it('exposes twelve complete light/dark desktop/phone pairs of PNG and WEBP downloads', async () => {
    const assets = getAssets('wallpaper').filter(asset => asset.path.includes('/sculpted-v2/'))

    expect(assets).toHaveLength(24)

    for (const family of ['tide', 'dune', 'veil']) {
      for (const variant of ['dark', 'light']) {
        for (const device of ['desktop', 'mobile']) {
          for (const format of ['png', 'webp']) {
            const path = `assets/wallpapers/sculpted-v2/${family}-${variant}-${device}.${format}`

            expect(assets.some(asset => asset.path === path)).toBe(true)

            const image = await sharp(fileURLToPath(new URL(path, packageRoot))).metadata()

            expect(image).toMatchObject(device === 'desktop'
              ? { format, width: 3840, height: 2160, hasAlpha: false }
              : { format, width: 1170, height: 2532, hasAlpha: false })
          }
        }
      }
    }
  })

  it('retains previous Sculpted and Classic files and their archives', async () => {
    const legacyAssets = getAssets('wallpaper').filter(asset => !asset.path.includes('/sculpted-v2/'))

    expect(legacyAssets.some(asset => asset.path.endsWith('/fold-dark-desktop.svg'))).toBe(true)

    expect(legacyAssets.some(asset => asset.path.endsWith('/wallpaper-1-desktop.png'))).toBe(true)

    for (const asset of legacyAssets) {
      expect((await stat(new URL(asset.path, packageRoot))).size).toBeGreaterThan(0)
    }

    for (const name of ['santi020k-wallpapers.zip', 'santi020k-sculpted-wallpapers.zip', 'santi020k-sculpted-wallpapers-v2.zip']) {
      const file = new URL(`../../apps/website/public/downloads/${name}`, import.meta.url)
      const { size } = await stat(file)

      expect(size).toBeGreaterThan(0)

      expect(size).toBeLessThan(25 * 1024 * 1024)
    }
  })
})
