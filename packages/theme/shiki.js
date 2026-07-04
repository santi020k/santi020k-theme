import darkTheme from './shiki/santi020k-dark.json' with { type: 'json' }
import hcDarkTheme from './shiki/santi020k-hc-dark.json' with { type: 'json' }
import hcLightTheme from './shiki/santi020k-hc-light.json' with { type: 'json' }
import lightTheme from './shiki/santi020k-light.json' with { type: 'json' }

export const santi020kDarkShikiTheme = darkTheme
export const santi020kHcDarkShikiTheme = hcDarkTheme
export const santi020kHcLightShikiTheme = hcLightTheme
export const santi020kLightShikiTheme = lightTheme

export const santi020kShikiThemes = {
  dark: santi020kDarkShikiTheme,
  hcDark: santi020kHcDarkShikiTheme,
  hcLight: santi020kHcLightShikiTheme,
  light: santi020kLightShikiTheme
}

export const santi020kShikiThemeVariants = Object.freeze(['dark', 'hcDark', 'hcLight', 'light'])

export const getSanti020kShikiTheme = variant => {
  switch (variant) {
    case 'dark':
      return santi020kDarkShikiTheme

    case 'hcDark':
      return santi020kHcDarkShikiTheme

    case 'hcLight':
      return santi020kHcLightShikiTheme

    case 'light':
      return santi020kLightShikiTheme

    default:
      throw new Error(`Unknown Santi020k Shiki theme variant: ${variant}`)
  }
}
