export type TokenMode = 'light' | 'dark'

export interface ColorToken {
  name: string
  light: string
  dark: string
  lightContrast?: string
  darkContrast?: string
  description?: string
}

export interface TypographyConfig {
  display: string
  body: string
  mono: string
  source: 'self-hosted' | 'google-fonts' | 'cdn' | 'system'
  importUrl?: string
  weights: number[]
}

export type BrandAssetCategory =
  | 'logo'
  | 'favicon'
  | 'banner'
  | 'wallpaper'
  | 'icon'
  | 'font'
  | 'og-image'
  | 'photo'
  | 'preview'
  | 'screenshot'
  | 'store'
  | 'theme'

export type BrandSurface = 'brand' | 'website' | 'vscode' | 'chrome'

export interface BrandAsset {
  path: string
  category: BrandAssetCategory
  description: string
  format: string
  variant?: 'light' | 'dark' | 'both'
  surface?: BrandSurface
  width?: number
  height?: number
}

export interface AssetManifest {
  packageName: string
  staticAssets: Record<string, string>
  assets: BrandAsset[]
}

export interface VoiceConfig {
  personality: string[]
  vocabulary: string[]
  avoidVocabulary: string[]
  toneByContext: Record<string, string>
}

export type DarkModeStrategy = 'data-theme' | 'class' | 'media-query'

export interface BrandConfig {
  name: string
  packageName: string
  description: string
  colors: ColorToken[]
  typography: TypographyConfig
  assets: AssetManifest
  voice: VoiceConfig
  projects?: Record<string, unknown>
  darkMode: DarkModeStrategy
  darkModeVariant?: string
  accessibilityTarget: 'AA' | 'AAA'
  meta?: Record<string, unknown>
}
