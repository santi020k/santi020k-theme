import type {
  AssetManifest,
  BrandAsset,
  BrandAssetCategory,
  BrandConfig,
  BrandSurface,
  ColorToken,
  TokenMode
} from './types.js'

export function generateCSSProperties(tokens: ColorToken[], mode: TokenMode): string
export function generateHighContrastProperties(tokens: ColorToken[], mode: TokenMode): string
export function generateTokensCSS(config: BrandConfig): string
export function generateTailwindTheme(config: BrandConfig): string
export function getAssetByPath(manifest: AssetManifest, path: string): BrandAsset | undefined
export function getAssetsByCategory(
  manifest: AssetManifest,
  category: BrandAssetCategory
): BrandAsset[]
export function getAssetsBySurface(manifest: AssetManifest, surface: BrandSurface): BrandAsset[]
