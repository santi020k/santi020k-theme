import { describe, expect, it } from 'vitest'

import { formatPaletteColor } from '../../apps/website/src/palette-colors.ts'

describe('palette color formats', () => {
  it('formats the active dark and light violet tokens as CSS colors', () => {
    expect(formatPaletteColor(' #9b66ff ')).toEqual({
      hex: '#9B66FF', rgb: 'rgb(155 102 255)', hsl: 'hsl(260.8 100% 70%)'
    })

    expect(formatPaletteColor('#6319be')).toEqual({
      hex: '#6319BE', rgb: 'rgb(99 25 190)', hsl: 'hsl(266.9 76.7% 42.2%)'
    })
  })

  it.each([
    ['#000000', 'hsl(0 0% 0%)'],
    ['#FFFFFF', 'hsl(0 0% 100%)'],
    ['#808080', 'hsl(0 0% 50.2%)'],
    ['#ff0000', 'hsl(0 100% 50%)'],
    ['#00ff00', 'hsl(120 100% 50%)'],
    ['#0000ff', 'hsl(240 100% 50%)'],
    ['#ff00ff', 'hsl(300 100% 50%)']
  ])('handles neutral and hue boundaries for %s', (hex, hsl) => {
    expect(formatPaletteColor(hex)?.hsl).toBe(hsl)
  })

  it.each(['', '#123', '#12345678', '#gggggg', 'rgb(1 2 3)', 'transparent'])('does not invent values for unsupported input %s', value => {
    expect(formatPaletteColor(value)).toBeNull()
  })
})
