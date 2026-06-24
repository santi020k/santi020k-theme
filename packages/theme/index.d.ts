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
export declare const colors: ColorToken[]
export declare const typography: TypographyConfig
export declare const staticAssets: Record<string, string>
export declare const assets: BrandAsset[]
export declare const manifest: AssetManifest
export declare const voice: VoiceConfig
export declare const config: BrandConfig
export declare function getAsset(path: string): BrandAsset | undefined
export declare function getAssets(category: BrandAssetCategory): BrandAsset[]
export declare function getSurfaceAssets(surface: BrandSurface): BrandAsset[]
