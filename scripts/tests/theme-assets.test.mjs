import { stat } from 'node:fs/promises'

import { describe, expect, it } from 'vitest'

import { assets } from '../../packages/theme/index.js'
import * as tailwind from '../../packages/theme/tailwind.js'

const packageRoot = new URL('../../packages/theme/', import.meta.url)

describe('public shared theme package', () => {
  it('offers one canonical Tailwind export', () => {
    expect(Object.keys(tailwind)).toEqual(['theme'])
  })

  it('lists each asset once and resolves every manifest entry to a file', async () => {
    const paths = assets.map(asset => asset.path)

    expect(new Set(paths).size).toBe(paths.length)

    await Promise.all(paths.map(async path => {
      const file = await stat(new URL(path, packageRoot))

      expect(file.isFile(), path).toBe(true)
    }))
  })
})
