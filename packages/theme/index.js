import {
  getAssetByPath,
  getAssetsByCategory,
  getAssetsBySurface
} from '@santi020k/theme-core'

export const packageName = '@santi020k/theme'

export const chromeThemeVariants = ['dark', 'light']

export const chromeThemeVariantManifests = {
  dark: {
    manifest: 'manifest.json',
    output: 'santi020k-chrome-theme.zip'
  },
  light: {
    manifest: 'manifest-light.json',
    output: 'santi020k-chrome-theme-light.zip'
  }
}

export const chromeThemeImageRequirements = {
  theme_ntp_background: {
    format: 'png',
    minWidth: 3840,
    minHeight: 2160
  }
}

export const chromeThemeSourceTokenRoles = [
  { chrome: 'bookmark_text', source: 'editor.foreground' },
  { chrome: 'button_background', source: 'sideBar.background', transform: 'buttonSurface' },
  { chrome: 'control_background', source: 'tab.border' },
  { chrome: 'frame', source: 'titleBar.activeBackground' },
  { chrome: 'frame_inactive', source: 'titleBar.activeBackground', transform: 'inactiveFrame' },
  { chrome: 'frame_incognito', source: 'titleBar.activeBackground', transform: 'incognitoFrame' },
  { chrome: 'frame_incognito_inactive', source: 'titleBar.activeBackground', transform: 'inactiveIncognitoFrame' },
  { chrome: 'background_tab', source: 'tab.inactiveBackground' },
  { chrome: 'ntp_background', source: 'editor.background' },
  { chrome: 'ntp_header', source: 'sideBar.background' },
  { chrome: 'ntp_link', source: 'textLink.foreground' },
  { chrome: 'ntp_link_underline', source: 'textLink.foreground' },
  { chrome: 'ntp_section', source: 'sideBar.background' },
  { chrome: 'ntp_section_link', source: 'textLink.activeForeground' },
  { chrome: 'ntp_section_text', source: 'icon.foreground' },
  { chrome: 'ntp_text', source: 'editor.foreground' },
  { chrome: 'omnibox_background', source: 'editor.background' },
  { chrome: 'omnibox_text', source: 'editor.foreground' },
  { chrome: 'tab_background_separator', source: 'tab.border' },
  { chrome: 'tab_background_text', source: 'chrome.variant.inactiveTabText' },
  { chrome: 'tab_background_text_inactive', source: 'tab.inactiveForeground' },
  { chrome: 'tab_background_text_incognito', source: 'tab.inactiveForeground' },
  { chrome: 'tab_background_text_incognito_inactive', source: 'tab.unfocusedInactiveForeground' },
  { chrome: 'tab_line', source: 'tab.activeBorder' },
  { chrome: 'tab_text', source: 'tab.activeForeground' },
  { chrome: 'toolbar', source: 'sideBar.background' },
  { chrome: 'toolbar_button_icon', source: 'icon.foreground' },
  { chrome: 'toolbar_text', source: 'editor.foreground' }
]

export const chromeThemeContrastPairs = [
  { fg: 'tab_text', bg: 'frame', label: 'Active Tab Text' },
  { fg: 'tab_background_text', bg: 'background_tab', label: 'Inactive Tab Text' },
  { fg: 'tab_background_text_inactive', bg: 'background_tab', label: 'Unfocused Tab Text', minRatio: 3 },
  { fg: 'tab_background_text_incognito', bg: 'frame_incognito', label: 'Incognito Tab Text', minRatio: 3 },
  { fg: 'tab_background_text_incognito_inactive', bg: 'frame_incognito_inactive', label: 'Incognito Inactive Tab Text', minRatio: 3 },
  { fg: 'tab_line', bg: 'frame', label: 'Active Tab Accent', minRatio: 3 },
  { fg: 'bookmark_text', bg: 'toolbar', label: 'Bookmark Text' },
  { fg: 'ntp_text', bg: 'ntp_background', label: 'NTP Text' },
  { fg: 'ntp_link', bg: 'ntp_background', label: 'NTP Link' },
  { fg: 'ntp_section_text', bg: 'ntp_section', label: 'NTP Section Text' },
  { fg: 'ntp_section_link', bg: 'ntp_section', label: 'NTP Section Link' },
  { fg: 'omnibox_text', bg: 'omnibox_background', label: 'Omnibox Text' },
  { fg: 'toolbar_text', bg: 'toolbar', label: 'Toolbar Text' },
  { fg: 'toolbar_button_icon', bg: 'toolbar', label: 'Toolbar Icons', minRatio: 3 }
]

export const chromeRuntimeAssetEntries = [
  { destination: 'icons', source: 'assets/chrome/icons' },
  { destination: 'images', source: 'assets/chrome/images' }
]

export const isChromeThemeVariant = variant => chromeThemeVariants.includes(variant)

export const hexToRgb = hex => {
  const value = hex.slice(0, 7)
  const normalized = value.replace('#', '')
  const parsed = Number.parseInt(normalized, 16)

  return [parsed >> 16 & 0xff, parsed >> 8 & 0xff, parsed & 0xff]
}

export const darkenRgb = (rgb, factor) => rgb.map(value => Math.round(value * factor))

export const darkenHex = (hex, factor) => darkenRgb(hexToRgb(hex), factor)

export const clampRgb = rgb => rgb.map(value => Math.max(0, Math.min(255, value)))

export const getRgbLuminance = rgb => {
  const [r, g, b] = rgb.map(value => {
    const s = value / 255

    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

export const getRgbContrastRatio = (rgb1, rgb2) => {
  const l1 = getRgbLuminance(rgb1)
  const l2 = getRgbLuminance(rgb2)

  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

export const createChromeThemeFromVSCodeColors = (vscodeColors, variant = 'dark') => {
  if (!isChromeThemeVariant(variant)) {
    throw new Error(`Invalid Chrome theme variant: ${variant}`)
  }

  const vscodeColorMap = new Map(Object.entries(vscodeColors))

  const hex = (token, fallback) => {
    const value = vscodeColorMap.get(token) || fallback

    if (!value) throw new Error(`Missing VS Code token: ${token}`)

    return value.slice(0, 7)
  }

  const frame = hex('titleBar.activeBackground')
  const toolbar = hex('sideBar.background')
  const editorBg = hex('editor.background')
  const editorFg = hex('editor.foreground')
  const iconFg = hex('icon.foreground')
  const link = hex('textLink.foreground')
  const linkActive = hex('textLink.activeForeground')
  const tabBorder = hex('tab.border')
  const tabInactiveBg = hex('tab.inactiveBackground')
  const tabActiveFg = hex('tab.activeForeground')
  const tabInactiveFg = hex('tab.inactiveForeground')
  const tabAccent = hex('tab.activeBorder')
  const unfocusedFg = hex('tab.unfocusedInactiveForeground')
  const tabBackgroundText = variant === 'light' ? '#604c8a' : '#a19da8'

  const colors = {
    bookmark_text: hexToRgb(editorFg),
    button_background: darkenHex(toolbar, variant === 'dark' ? 1.25 : 0.95),
    control_background: hexToRgb(tabBorder),

    frame: hexToRgb(frame),
    frame_inactive: darkenHex(frame, 0.85),
    frame_incognito: variant === 'dark' ? darkenHex(frame, 0.72) : [35, 29, 48],
    frame_incognito_inactive: variant === 'dark' ? darkenHex(frame, 0.2) : [28, 21, 40],

    background_tab: hexToRgb(tabInactiveBg),

    ntp_background: hexToRgb(editorBg),
    ntp_header: hexToRgb(toolbar),
    ntp_link: hexToRgb(link),
    ntp_link_underline: hexToRgb(link),
    ntp_section: hexToRgb(toolbar),
    ntp_section_link: hexToRgb(linkActive),
    ntp_section_text: hexToRgb(iconFg),
    ntp_text: hexToRgb(editorFg),

    omnibox_background: hexToRgb(editorBg),
    omnibox_text: hexToRgb(editorFg),

    tab_background_separator: hexToRgb(tabBorder),
    tab_background_text: hexToRgb(tabBackgroundText),
    tab_background_text_inactive: hexToRgb(tabInactiveFg),
    tab_background_text_incognito: hexToRgb(tabInactiveFg),
    tab_background_text_incognito_inactive: hexToRgb(unfocusedFg),
    tab_line: hexToRgb(tabAccent),
    tab_text: hexToRgb(tabActiveFg),

    toolbar: hexToRgb(toolbar),
    toolbar_button_icon: hexToRgb(iconFg),
    toolbar_text: hexToRgb(editorFg)
  }

  const properties = {
    ntp_background_alignment: 'center',
    ntp_background_repeat: 'no-repeat',
    ntp_logo_alternate: variant === 'dark' ? 1 : 0
  }

  return {
    colors: Object.fromEntries(
      Object.entries(colors).map(([key, rgb]) => [key, clampRgb(rgb)])
    ),
    properties
  }
}

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
  source: 'google-fonts',
  importUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap',
  weights: [100, 200, 300, 400, 500, 600, 700, 800, 900]
}

export const fontFamily = {
  sans: typography.body,
  display: typography.display,
  mono: typography.mono
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
  'logos/logo-santi020k.webp': 'assets/logos/logo-santi020k.webp',
  'projects/santi020k-theme/cover.webp': 'assets/projects/santi020k-theme/cover.webp',
  'projects/santi020k-theme/cover-horizontal.webp': 'assets/projects/santi020k-theme/cover-horizontal.webp',
  'projects/santi020k-theme/cover-vertical.webp': 'assets/projects/santi020k-theme/cover-vertical.webp',
  'projects/santi020k-theme/logo.webp': 'assets/projects/santi020k-theme/logo.webp',
  'projects/santi020k-theme/preview-light.webp': 'assets/projects/santi020k-theme/preview-light.webp'
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
  'assets/projects/santi020k-theme/cover-horizontal.webp',
  'assets/projects/santi020k-theme/cover-v2.webp',
  'assets/projects/santi020k-theme/cover-vertical.webp',
  'assets/projects/santi020k-theme/cover.webp',
  'assets/projects/santi020k-theme/logo.webp',
  'assets/projects/santi020k-theme/preview-light.webp',
  'assets/vscode/icon.png',
  'assets/vscode/icon.svg',
  'assets/vscode/previews/preview-dark.png',
  'assets/vscode/previews/preview-dark.svg',
  'assets/vscode/previews/preview-hc-dark.png',
  'assets/vscode/previews/preview-hc-dark.svg',
  'assets/vscode/previews/preview-hc-light.png',
  'assets/vscode/previews/preview-hc-light.svg',
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
  if (path.startsWith('assets/projects/') && path.endsWith('/logo.webp')) {
    return 'logo'
  }

  if (path.startsWith('assets/projects/') && (path.includes('/cover') || path.includes('/preview'))) {
    return 'preview'
  }

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

  if (path.startsWith('assets/projects/')) {
    return 'website'
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

export const projects = {
  santi020kTheme: {
    slug: 'santi020k-theme',
    title: 'Santi020k Theme',
    description: 'Designed and shipped a VS Code theme extension with matched dark and light variants, marketplace publishing, registry automation, and a focused documentation site.',
    role: 'Creator',
    startingDate: '28 Apr 2026',
    githubUrl: 'https://github.com/santi020k/santi020k-theme',
    liveDemoUrl: 'https://theme.santi020k.com/',
    typesId: 'personal',
    impactMetrics: [
      'Published across the VS Code Marketplace and Open VSX',
      'Built dark and light variants from one coherent color language',
      'Automated validation, packaging, and registry publishing'
    ],
    technologies: [
      'Visual Studio Code',
      'VS Code Extension',
      'Theme Design',
      'JavaScript',
      'Node.js',
      'Vitest',
      'ESLint',
      'CI-CD',
      'GitHub Actions',
      'Open Source',
      'Developer Experience (DX)',
      'Developer Documentation',
      'Accessibility',
      'Testing',
      'Design Systems'
    ],
    coverImage: {
      src: 'assets/projects/santi020k-theme/cover.webp',
      horizontal: 'assets/projects/santi020k-theme/cover-horizontal.webp',
      vertical: 'assets/projects/santi020k-theme/cover-vertical.webp',
      logo: 'assets/projects/santi020k-theme/logo.webp',
      logoAspect: 'square',
      logoSurface: 'dark',
      alt: 'Santi020k Theme logo on a deep indigo geometric cover with editor UI artwork'
    },
    previewImage: 'assets/projects/santi020k-theme/preview-light.webp'
  }
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
  projects,
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
