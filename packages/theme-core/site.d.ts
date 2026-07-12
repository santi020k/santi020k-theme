export const SITE_THEME_LIGHT: 'light'
export const SITE_THEME_DARK: 'dark'
export const SITE_THEME_ATTRIBUTE: 'data-theme'
export const SITE_THEME_STORAGE_KEY: 'theme'
export const SITE_THEME_PREFERENCE_QUERY: '(prefers-color-scheme: light)'
export const SITE_DESKTOP_NAV_QUERY: '(min-width: 941px)'
export const SITE_HUB_DESKTOP_NAV_QUERY: '(min-width: 900px)'
export const SITE_TOUCH_POINTER_QUERY: '(hover: none) and (pointer: coarse)'
export const SITE_REDUCED_MOTION_QUERY: '(prefers-reduced-motion: reduce)'
export const SITE_REVEAL_DARK_BACKGROUND: '#110c1d'
export const SITE_REVEAL_LIGHT_BACKGROUND: '#f8f6fd'

export interface SiteUrls {
  readonly hub: string
  readonly vscode: string
  readonly chrome: string
  readonly terminal: string
}

export const SITE_URLS: {
  readonly production: SiteUrls
  readonly development: SiteUrls
}

export function getSiteUrls(development?: boolean): SiteUrls

export type SiteTheme = typeof SITE_THEME_LIGHT | typeof SITE_THEME_DARK

export interface SiteThemePreferenceOptions {
  mediaQueryList?: MediaQueryList
  storage?: Storage
}

export interface SiteThemeOptions {
  root?: HTMLElement
  storage?: Storage
}

export interface SiteNavigationOptions {
  desktopNavQuery?: MediaQueryList
  documentRef?: Document
  header?: HTMLElement | null
  navLinks?: Iterable<Element>
  navToggle?: HTMLElement | null
}

export interface PreferredSiteThemeSyncOptions extends SiteThemeOptions {
  mediaQueryList?: MediaQueryList
  onThemeChange?: () => void
}

export function isSiteTheme(theme: unknown): theme is SiteTheme
export function readStoredSiteTheme(storage?: Storage): string | undefined
export function getPreferredSiteTheme(options?: SiteThemePreferenceOptions): SiteTheme
export function rootInDarkMode(root?: HTMLElement): boolean
export function setSiteTheme(theme: unknown, options?: SiteThemeOptions): boolean
export function syncSiteThemeToggle(toggle?: HTMLElement | null, root?: HTMLElement): void
export function setSiteNavOpen(isOpen: boolean, options?: SiteNavigationOptions): void
export function bindSiteNavigation(options?: SiteNavigationOptions): () => void
export function bindPreferredSiteThemeSync(options?: PreferredSiteThemeSyncOptions): () => void
