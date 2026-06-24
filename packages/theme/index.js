import {
  getAssetByPath,
  getAssetsByCategory,
  getAssetsBySurface
} from '@santi020k/theme-core'

export const packageName = '@santi020k/theme'

export const colors = [
  { name: 'theme-bg', light: '268 20% 98%', dark: '260 43% 8%', lightContrast: '268 20% 98%', darkContrast: '260 43% 8%', description: 'Page background' },
  { name: 'surface', light: '268 20% 100%', dark: '260 30% 12%', description: 'Card and panel surfaces' },
  { name: 'surface-muted', light: '268 20% 96%', dark: '260 25% 15%', lightContrast: '268 18% 94%', darkContrast: '260 25% 15%', description: 'Muted surfaces' },
  { name: 'surface-strong', light: '268 15% 90%', dark: '260 20% 21%', lightContrast: '268 14% 88%', darkContrast: '260 20% 20%', description: 'Strong surfaces' },
  { name: 'line', light: '268 15% 84%', dark: '260 15% 30%', lightContrast: '268 18% 66%', darkContrast: '260 15% 48%', description: 'Borders and dividers' },
  { name: 'ink', light: '268 10% 20%', dark: '260 10% 88%', description: 'Primary text and headings' },
  { name: 'ink-soft', light: '268 8% 36%', dark: '260 8% 72%', lightContrast: '268 12% 24%', darkContrast: '260 10% 84%', description: 'Body and secondary text' },
  { name: 'ink-muted', light: '268 6% 28%', dark: '260 6% 56%', lightContrast: '268 10% 18%', darkContrast: '260 8% 76%', description: 'Muted labels and captions' },
  { name: 'brand', light: '264 92% 47%', dark: '264 90% 58%', lightContrast: '264 92% 40%', darkContrast: '264 90% 62%', description: 'Primary brand purple' },
  { name: 'brand-solid', light: '264 92% 42%', dark: '264 90% 52%', lightContrast: '264 92% 38%', darkContrast: '264 90% 55%', description: 'Saturated fills for accessible controls' },
  { name: 'brand-soft', light: '264 60% 94%', dark: '264 45% 18%', lightContrast: '264 60% 92%', darkContrast: '264 45% 22%', description: 'Tinted surfaces and selections' },
  { name: 'accent', light: '264 95% 57%', dark: '264 90% 68%', description: 'Hovers and active states' },
  { name: 'glow', light: '264 95% 70%', dark: '264 85% 50%', description: 'Background gradients and highlights' }
]

export const typography = {
  display: '"Montserrat", "Avenir Next", sans-serif',
  body: '"Montserrat", "Avenir Next", "Segoe UI", sans-serif',
  mono: '"Montserrat", "SFMono-Regular", "SF Mono", monospace',
  source: 'self-hosted',
  weights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
}

export const staticAssets = {
  'favicon.svg': 'assets/favicons/favicon.svg',
  'favicon-16x16.png': 'assets/favicons/favicon-16x16.png',
  'favicon-32x32.png': 'assets/favicons/favicon-32x32.png',
  'apple-touch-icon.png': 'assets/favicons/apple-touch-icon.png',
  'apple-touch-icon.webp': 'assets/favicons/apple-touch-icon.webp',
  'icons/icon-192.webp': 'assets/favicons/icon-192.webp',
  'icons/icon-512.webp': 'assets/favicons/icon-512.webp',
  'logos/logo-square.webp': 'assets/logos/logo-square.webp',
  'logos/logo-santi020k.webp': 'assets/logos/logo-santi020k.webp'
}

const assetPaths = [
  'assets/banners/banner-1.png',
  'assets/banners/banner-1.webp',
  'assets/banners/banner-2.png',
  'assets/banners/banner-2.webp',
  'assets/banners/banner-3.png',
  'assets/banners/banner-3.webp',
  'assets/banners/banner-4.png',
  'assets/banners/banner-4.webp',
  'assets/banners/banner-5.png',
  'assets/banners/banner-5.webp',
  'assets/chrome/icons/icon-light.svg',
  'assets/chrome/icons/icon-light128.png',
  'assets/chrome/icons/icon-light16.png',
  'assets/chrome/icons/icon-light48.png',
  'assets/chrome/icons/icon-light512.png',
  'assets/chrome/icons/icon.svg',
  'assets/chrome/icons/icon128.png',
  'assets/chrome/icons/icon16.png',
  'assets/chrome/icons/icon48.png',
  'assets/chrome/icons/icon512.png',
  'assets/chrome/images/adaptive_assets_diagonal.webp',
  'assets/chrome/images/adaptive_background.svg',
  'assets/chrome/images/dark.png',
  'assets/chrome/images/light.png',
  'assets/chrome/images/theme_ntp_background.png',
  'assets/chrome/images/theme_ntp_background.webp',
  'assets/chrome/images/theme_ntp_background_light.png',
  'assets/chrome/images/theme_ntp_background_light.webp',
  'assets/chrome/images/wallpaper.heic',
  'assets/chrome/store/marquee-banner-light.png',
  'assets/chrome/store/marquee-banner.png',
  'assets/chrome/store/promo-tile-light.png',
  'assets/chrome/store/promo-tile.png',
  'assets/chrome/store/screenshot-incognito-light.png',
  'assets/chrome/store/screenshot-incognito.jpg',
  'assets/chrome/store/screenshot-incognito.png',
  'assets/chrome/store/screenshot-main-light.png',
  'assets/chrome/store/screenshot-main.png',
  'assets/chrome/store/screenshot-ntp-light.png',
  'assets/chrome/store/screenshot-ntp.png',
  'assets/favicons/apple-touch-icon.png',
  'assets/favicons/apple-touch-icon.webp',
  'assets/favicons/favicon-16x16.png',
  'assets/favicons/favicon-16x16.webp',
  'assets/favicons/favicon-32x32.png',
  'assets/favicons/favicon-32x32.webp',
  'assets/favicons/favicon.svg',
  'assets/favicons/icon-192.png',
  'assets/favicons/icon-192.webp',
  'assets/favicons/icon-512.png',
  'assets/favicons/icon-512.webp',
  'assets/logos/logo-santi020k-dark.png',
  'assets/logos/logo-santi020k-dark.svg',
  'assets/logos/logo-santi020k-dark.webp',
  'assets/logos/logo-santi020k.png',
  'assets/logos/logo-santi020k.svg',
  'assets/logos/logo-santi020k.webp',
  'assets/logos/logo-square.png',
  'assets/logos/logo-square.svg',
  'assets/logos/logo-square.webp',
  'assets/vscode/icon.png',
  'assets/vscode/icon.svg',
  'assets/vscode/previews/preview-dark.png',
  'assets/vscode/previews/preview-dark.svg',
  'assets/vscode/previews/preview-hc-dark.png',
  'assets/vscode/previews/preview-light.png',
  'assets/vscode/previews/preview-light.svg',
  'assets/wallpapers/wallpaper-1-desktop.png',
  'assets/wallpapers/wallpaper-1-desktop.webp',
  'assets/wallpapers/wallpaper-1-mobile.png',
  'assets/wallpapers/wallpaper-1-mobile.webp',
  'assets/wallpapers/wallpaper-2-desktop.png',
  'assets/wallpapers/wallpaper-2-desktop.webp',
  'assets/wallpapers/wallpaper-2-mobile.png',
  'assets/wallpapers/wallpaper-2-mobile.webp',
  'assets/wallpapers/wallpaper-3-desktop.png',
  'assets/wallpapers/wallpaper-3-desktop.webp',
  'assets/wallpapers/wallpaper-3-mobile.png',
  'assets/wallpapers/wallpaper-3-mobile.webp',
  'assets/wallpapers/wallpaper.png',
  'assets/wallpapers/wallpaper.webp'
]

const formatFromPath = path => path.slice(path.lastIndexOf('.') + 1)

const categoryFromPath = path => {
  if (path.includes('/logos/')) {
    return 'logo'
  }

  if (path.includes('/favicons/')) {
    return 'favicon'
  }

  if (path.includes('/banners/')) {
    return 'banner'
  }

  if (path.includes('/wallpapers/')) {
    return 'wallpaper'
  }

  if (path.includes('/previews/')) {
    return 'preview'
  }

  if (path.includes('/screenshots/') || path.includes('/screenshot-')) {
    return 'screenshot'
  }

  if (path.includes('/store/')) {
    return 'store'
  }

  if (path.includes('/icons/')) {
    return 'icon'
  }

  return 'theme'
}

const surfaceFromPath = path => {
  if (path.startsWith('assets/chrome/')) {
    return 'chrome'
  }

  if (path.startsWith('assets/vscode/')) {
    return 'vscode'
  }

  return 'brand'
}

const variantFromPath = path => {
  if (path.includes('light')) {
    return 'light'
  }

  if (path.includes('dark')) {
    return 'dark'
  }

  return 'both'
}

const descriptionFromPath = path => {
  const filename = path.slice(path.lastIndexOf('/') + 1)

  const readableName = filename
    .replace(/\.[^.]+$/, '')
    .replaceAll('-', ' ')
    .replaceAll('_', ' ')

  return `Santi020k ${readableName} asset`
}

export const assets = assetPaths.map(path => ({
  path,
  category: categoryFromPath(path),
  description: descriptionFromPath(path),
  format: formatFromPath(path),
  variant: variantFromPath(path),
  surface: surfaceFromPath(path)
}))

export const manifest = {
  packageName,
  staticAssets,
  assets
}

export const voice = {
  personality: ['Direct', 'Concise', 'Technical', 'Personal', 'Honest'],
  vocabulary: [
    'calm systems',
    'clear delivery',
    'architecture',
    'automation',
    'developer experience',
    'resilient',
    'well-crafted'
  ],
  avoidVocabulary: [
    'leverage',
    'synergy',
    'utilize',
    'seamless',
    'robust',
    'cutting-edge'
  ],
  toneByContext: {
    homepage: 'Confident, identity-first, one clear call to action',
    docs: 'Minimal and practical',
    code: 'Explain why, keep examples short',
    error: 'Light and friendly, never robotic'
  }
}

export const config = {
  name: 'Santi020k',
  packageName,
  description: 'Design tokens, logos, icons, wallpapers, and theme-family assets for Santi020k projects.',
  colors,
  typography,
  assets: manifest,
  voice,
  darkMode: 'data-theme',
  darkModeVariant: '[data-theme="dark"] &',
  accessibilityTarget: 'AA',
  meta: {
    css: '@santi020k/theme/tokens.css',
    tokens: '@santi020k/theme/tokens.json',
    tailwind: '@santi020k/theme/tailwind'
  }
}

export const getAsset = path => getAssetByPath(manifest, path)

export const getAssets = category => getAssetsByCategory(manifest, category)

export const getSurfaceAssets = surface => getAssetsBySurface(manifest, surface)
