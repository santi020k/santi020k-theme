import { readFile } from 'node:fs/promises'

import sharp from 'sharp'
import { describe, expect, it } from 'vitest'

const readAsset = path => readFile(new URL(`../../${path}`, import.meta.url))

describe('real VS Code screenshot assets', () => {
  it.each(['dark', 'light', 'hc-dark', 'hc-light'])('preserves captured pixels and synced copies for %s', async variant => {
    const file = `preview-${variant}`
    const source = await readAsset(`packages/santi020k-theme/assets/source/previews/${file}.jpg`)
    const png = await readAsset(`packages/santi020k-theme/assets/previews/${file}.png`)
    const metadata = await sharp(png).metadata()

    expect(metadata.format).toBe('png')

    expect(metadata.width).toBe(2400)

    expect(metadata.height).toBe(1600)

    const capturedPixels = await sharp(source).raw().toBuffer()
    const previewPixels = await sharp(png).raw().toBuffer()

    expect(previewPixels.equals(capturedPixels)).toBe(true)

    for (const directory of ['packages/theme/assets/vscode/previews', 'apps/vscode-website/public', 'apps/website/public', 'apps/zed-website/public']) {
      expect((await readAsset(`${directory}/${file}.png`)).equals(png)).toBe(true)
    }

    const svg = await readAsset(`packages/theme/assets/vscode/previews/${file}.svg`)

    expect(svg.toString()).toContain(`href="data:image/png;base64,${png.toString('base64')}"`)
  })
})
