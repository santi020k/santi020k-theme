import type {
  AssetManifest,
  BrandAsset,
  BrandAssetCategory,
  BrandConfig,
  BrandSurface,
  ColorToken,
  TypographyConfig,
  VoiceConfig
} from '@santi020k/theme-core'

export declare const packageName: '@santi020k/theme'
export declare const chromeThemeVariants: ['dark', 'light']
export declare const chromeThemeContrastPairs: {
  fg: string
  bg: string
  label: string
}[]
export declare const chromeRuntimeAssetEntries: {
  destination: string
  source: string
}[]
export type ChromeThemeVariant = typeof chromeThemeVariants[number]
export type RgbColor = [number, number, number]
export declare const colors: ColorToken[]
export declare const typography: TypographyConfig
export declare const staticAssets: Record<string, string>
export declare const assets: BrandAsset[]
export declare const manifest: AssetManifest
export declare const voice: VoiceConfig
export declare const config: BrandConfig
export declare function isChromeThemeVariant(variant: string): variant is ChromeThemeVariant
export declare function hexToRgb(hex: string): RgbColor
export declare function darkenRgb(rgb: RgbColor | number[], factor: number): RgbColor
export declare function darkenHex(hex: string, factor: number): RgbColor
export declare function clampRgb(rgb: RgbColor | number[]): RgbColor
export declare function getRgbLuminance(rgb: RgbColor | number[]): number
export declare function getRgbContrastRatio(rgb1: RgbColor | number[], rgb2: RgbColor | number[]): number
export declare function createChromeThemeFromVSCodeColors(
  vscodeColors: Record<string, string>,
  variant?: ChromeThemeVariant
): {
  colors: Record<string, RgbColor>
  properties: Record<string, string | number>
}
export declare function getAsset(path: string): BrandAsset | undefined
export declare function getAssets(category: BrandAssetCategory): BrandAsset[]
export declare function getSurfaceAssets(surface: BrandSurface): BrandAsset[]
