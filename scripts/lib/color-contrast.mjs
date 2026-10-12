// Shared contrast math for build and validation tooling. Alpha backgrounds
// composite over white; foregrounds composite over the resolved background.
const parseHex = hex => {
  if (typeof hex !== 'string' || !/^#(?:[\da-f]{6}|[\da-f]{8})$/i.test(hex)) {
    throw new Error('Expected a six- or eight-digit hex color')
  }

  const value = hex.slice(1, 7)
  const alpha = hex.length === 9 ? Number.parseInt(hex.slice(7, 9), 16) / 255 : 1

  return {
    alpha,
    rgb: [
      Number.parseInt(value.slice(0, 2), 16),
      Number.parseInt(value.slice(2, 4), 16),
      Number.parseInt(value.slice(4, 6), 16)
    ]
  }
}

const compositeRgb = (foreground, background) => foreground.rgb.map((channel, index) => {
  const backgroundChannel = background.rgb.at(index)

  if (backgroundChannel === undefined) {
    throw new Error(`Missing background RGB channel at index ${index}`)
  }

  return Math.round(channel * foreground.alpha + backgroundChannel * (1 - foreground.alpha))
})

const resolveRgb = (foreground, background) => {
  if (foreground.alpha === 1) {
    return foreground.rgb
  }

  return compositeRgb(foreground, background)
}

const luminance = rgb => {
  const [red, green, blue] = rgb.map(channel => {
    const value = channel / 255

    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

export const contrastRatio = (foreground, background) => {
  const backgroundColor = parseHex(background)

  const resolvedBackground = {
    alpha: 1,
    rgb: resolveRgb(backgroundColor, { alpha: 1, rgb: [255, 255, 255] })
  }

  const resolvedForeground = resolveRgb(parseHex(foreground), resolvedBackground)
  const lighter = Math.max(luminance(resolvedForeground), luminance(resolvedBackground.rgb))
  const darker = Math.min(luminance(resolvedForeground), luminance(resolvedBackground.rgb))

  return (lighter + 0.05) / (darker + 0.05)
}
