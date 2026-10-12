import { describe, expect, it } from 'vitest'

import { contrastRatio } from '../lib/color-contrast.mjs'

describe('shared color contrast', () => {
  it('measures identical colors and the black/white extremes', () => {
    expect(contrastRatio('#000000', '#000000')).toBe(1)

    expect(contrastRatio('#ffffff', '#ffffff')).toBe(1)

    expect(contrastRatio('#000000', '#ffffff')).toBe(21)

    expect(contrastRatio('#ffffff', '#000000')).toBe(21)
  })

  it('distinguishes the normal-text threshold without rounding the ratio', () => {
    expect(contrastRatio('#767676', '#ffffff')).toBeGreaterThan(4.5)

    expect(contrastRatio('#777777', '#ffffff')).toBeLessThan(4.5)

    expect(contrastRatio('#777777', '#ffffff')).toBeCloseTo(4.478089, 6)

    expect(contrastRatio('#abcdef', '#123456')).toBe(contrastRatio('#123456', '#abcdef'))
  })

  it('accepts mixed case and explicit opaque alpha', () => {
    expect(contrastRatio('#AbCdEfFF', '#123456ff')).toBe(contrastRatio('#abcdef', '#123456'))
  })

  it('composites translucent foregrounds against their background', () => {
    expect(contrastRatio('#00000000', '#ffffff')).toBe(1)

    expect(contrastRatio('#00000080', '#ffffff')).toBe(contrastRatio('#7f7f7f', '#ffffff'))

    expect(contrastRatio('#ffffff80', '#000000')).toBe(contrastRatio('#808080', '#000000'))
  })

  it('resolves translucent backgrounds over white before the foreground', () => {
    expect(contrastRatio('#000000', '#00000000')).toBe(21)

    expect(contrastRatio('#00000080', '#00000080')).toBe(contrastRatio('#3f3f3f', '#7f7f7f'))
  })

  it.each(['', '#fff', '#1234567', '#123456789', '#gggggg', '123456', '#123456junk', null, undefined, 123456])(
    'rejects invalid foreground and background colors: %s', value => {
      expect(() => contrastRatio(value, '#ffffff')).toThrow('Expected a six- or eight-digit hex color')

      expect(() => contrastRatio('#000000', value)).toThrow('Expected a six- or eight-digit hex color')
    }
  )
})
