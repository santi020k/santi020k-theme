import { hexToRgb } from '@santi020k/theme'

export type PaletteColor = {
  name: string
  description: string
  label?: string
} & ({ token: string, value?: never, lightValue?: never } | { token?: never, value: string, lightValue?: string })

export const formatPaletteColor = (value: string) => {
  const hex = value.trim()

  if (!/^#[\da-f]{6}$/i.test(hex)) return null

  const [red, green, blue] = hexToRgb(hex)
  const r = red / 255
  const g = green / 255
  const b = blue / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  const lightness = (max + min) / 2
  const saturation = delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1))
  let hue = 0

  if (delta !== 0) {
    if (max === r) hue = (g - b) / delta
    else if (max === g) hue = (b - r) / delta + 2
    else hue = (r - g) / delta + 4
  }

  const round = (number: number) => Math.round(number * 10) / 10

  return {
    hex: hex.toUpperCase(),
    rgb: `rgb(${red} ${green} ${blue})`,
    hsl: `hsl(${round((hue * 60 + 360) % 360)} ${round(saturation * 100)}% ${round(lightness * 100)}%)`
  }
}
