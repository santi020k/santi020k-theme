export type Santi020kShikiThemeVariant = 'dark' | 'hcDark' | 'hcLight' | 'light'
export type Santi020kShikiThemeType = 'dark' | 'hc-dark' | 'hc-light' | 'light'

export interface Santi020kShikiTokenColor {
  name?: string
  scope?: string | string[]
  settings?: Record<string, string | number | boolean | undefined>
}

export interface Santi020kShikiSemanticTokenColor {
  foreground?: string
  bold?: boolean
  italic?: boolean
  underline?: boolean
}

export interface Santi020kShikiTheme {
  name: string
  type: Santi020kShikiThemeType
  colors: Record<string, string>
  semanticHighlighting?: boolean
  semanticTokenColors?: Record<string, string | Santi020kShikiSemanticTokenColor>
  tokenColors: Santi020kShikiTokenColor[]
}

export declare const santi020kDarkShikiTheme: Santi020kShikiTheme & {
  name: 'santi020k dark'
  type: 'dark'
}

export declare const santi020kHcDarkShikiTheme: Santi020kShikiTheme & {
  name: 'santi020k hc dark'
  type: 'hc-dark'
}

export declare const santi020kHcLightShikiTheme: Santi020kShikiTheme & {
  name: 'santi020k hc light'
  type: 'hc-light'
}

export declare const santi020kLightShikiTheme: Santi020kShikiTheme & {
  name: 'santi020k light'
  type: 'light'
}

export declare const santi020kShikiThemes: {
  dark: typeof santi020kDarkShikiTheme
  hcDark: typeof santi020kHcDarkShikiTheme
  hcLight: typeof santi020kHcLightShikiTheme
  light: typeof santi020kLightShikiTheme
}

export declare const santi020kShikiThemeVariants: readonly Santi020kShikiThemeVariant[]

export declare function getSanti020kShikiTheme(
  variant: Santi020kShikiThemeVariant
): typeof santi020kShikiThemes[Santi020kShikiThemeVariant]
