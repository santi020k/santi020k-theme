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
