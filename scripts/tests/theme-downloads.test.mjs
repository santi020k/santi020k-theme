import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'
import { describe, expect, it } from 'vitest'

const root = new URL('../../', import.meta.url)
const downloads = new URL('apps/website/public/downloads/ports/', root)
const readZip = (archive, entry) => execFileSync('unzip', ['-p', fileURLToPath(new URL(archive, downloads)), entry], { maxBuffer: 20 * 1024 * 1024 })

describe('installable theme downloads', () => {
  it('ships the Obsidian folder with original filenames and the matching generated CSS', () => {
    const manifest = JSON.parse(readZip('santi020k-obsidian.zip', 'Santi020k/manifest.json').toString())

    expect(manifest).toMatchObject({ name: 'Santi020k', authorUrl: 'https://santi020k.com' })

    expect(readZip('santi020k-obsidian.zip', 'Santi020k/theme.css')).toEqual(readFileSync(new URL('packages/santi020k-obsidian-theme/theme.css', root)))

    expect(readZip('santi020k-obsidian.zip', 'Santi020k/README.md').toString()).toContain('iPhone and iPad')
  })

  it('places Neovim colors at the native runtime path within the archive', () => {
    expect(readZip('santi020k-neovim.zip', 'colors/santi020k.lua')).toEqual(readFileSync(new URL('santi020k.lua', downloads)))

    expect(readZip('santi020k-neovim.zip', 'LICENSE').length).toBeGreaterThan(500)
  })

  it('includes four unchanged portrait PNGs, paired by appearance and screen', async () => {
    for (const appearance of ['dark', 'light']) {
      for (const [screen, directory, design] of [['lock', 'minimal-v2', 'halo'], ['home', 'minimal-v1', 'contour']]) {
        const image = readZip('santi020k-iphone.zip', `santi020k-${appearance}-${screen}.png`)

        expect(image.equals(readFileSync(new URL(`packages/theme/assets/wallpapers/${directory}/${design}-${appearance}-mobile.png`, root)))).toBe(true)

        expect(await sharp(image).metadata()).toMatchObject({ width: 1170, height: 2532, format: 'png' })
      }
    }

    expect(readZip('santi020k-iphone.zip', 'SETUP.md').toString()).toContain('Restore your previous setup')
  })
})
