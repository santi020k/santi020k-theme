export const SITE_THEME_LIGHT = 'light'
export const SITE_THEME_DARK = 'dark'
export const SITE_THEME_ATTRIBUTE = 'data-theme'
export const SITE_THEME_STORAGE_KEY = 'theme'
export const SITE_THEME_PREFERENCE_QUERY = '(prefers-color-scheme: light)'
export const SITE_DESKTOP_NAV_QUERY = '(min-width: 941px)'
export const SITE_HUB_DESKTOP_NAV_QUERY = '(min-width: 900px)'
export const SITE_TOUCH_POINTER_QUERY = '(hover: none) and (pointer: coarse)'
export const SITE_REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
export const SITE_REVEAL_DARK_BACKGROUND = '#110c1d'
export const SITE_REVEAL_LIGHT_BACKGROUND = '#f8f6fd'

export const isSiteTheme = theme => theme === SITE_THEME_LIGHT || theme === SITE_THEME_DARK

export const readStoredSiteTheme = storage => {
  try {
    return storage?.getItem?.(SITE_THEME_STORAGE_KEY)
  } catch {
    
  }
}

const writeStoredSiteTheme = (storage, theme) => {
  try {
    storage?.setItem?.(SITE_THEME_STORAGE_KEY, theme)
  } catch {
    // Storage can be unavailable in hardened browser contexts.
  }
}

export const getPreferredSiteTheme = ({
  mediaQueryList = globalThis.matchMedia?.(SITE_THEME_PREFERENCE_QUERY),
  storage = globalThis.localStorage
} = {}) => {
  const storedTheme = readStoredSiteTheme(storage)

  if (isSiteTheme(storedTheme)) return storedTheme

  return mediaQueryList?.matches ? SITE_THEME_LIGHT : SITE_THEME_DARK
}

export const rootInDarkMode = (root = globalThis.document?.documentElement) =>
  root?.getAttribute(SITE_THEME_ATTRIBUTE) === SITE_THEME_DARK

export const setSiteTheme = (
  theme,
  {
    root = globalThis.document?.documentElement,
    storage = globalThis.localStorage
  } = {}
) => {
  if (!isSiteTheme(theme) || !root) return false

  root.setAttribute(SITE_THEME_ATTRIBUTE, theme)

  writeStoredSiteTheme(storage, theme)

  return true
}

export const syncSiteThemeToggle = (
  toggle,
  root = globalThis.document?.documentElement
) => {
  if (toggle) toggle.setAttribute('aria-checked', String(rootInDarkMode(root)))
}

export const setSiteNavOpen = (
  isOpen,
  {
    header,
    navToggle
  } = {}
) => {
  if (!header || !navToggle) return

  if (isOpen) {
    header.setAttribute('data-nav-open', 'true')
  } else {
    header.removeAttribute('data-nav-open')
  }

  navToggle.setAttribute('aria-expanded', String(isOpen))
}

export const bindSiteNavigation = ({
  desktopNavQuery,
  documentRef = globalThis.document,
  header,
  navLinks = [],
  navToggle
} = {}) => {
  const closeNav = () => setSiteNavOpen(false, { header, navToggle })

  const toggleNav = () => {
    const isOpen = navToggle?.getAttribute('aria-expanded') === 'true'

    setSiteNavOpen(!isOpen, { header, navToggle })
  }

  const closeOnEscape = event => {
    if (event.key === 'Escape') closeNav()
  }

  const closeOnDesktop = event => {
    if (event.matches) closeNav()
  }

  navToggle?.addEventListener?.('click', toggleNav)

  for (const link of navLinks) {
    link.addEventListener('click', closeNav)
  }

  documentRef?.addEventListener?.('keydown', closeOnEscape)

  desktopNavQuery?.addEventListener?.('change', closeOnDesktop)

  return () => {
    navToggle?.removeEventListener?.('click', toggleNav)

    for (const link of navLinks) {
      link.removeEventListener('click', closeNav)
    }

    documentRef?.removeEventListener?.('keydown', closeOnEscape)

    desktopNavQuery?.removeEventListener?.('change', closeOnDesktop)
  }
}

export const bindPreferredSiteThemeSync = ({
  mediaQueryList = globalThis.matchMedia?.(SITE_THEME_PREFERENCE_QUERY),
  onThemeChange,
  root = globalThis.document?.documentElement,
  storage = globalThis.localStorage
} = {}) => {
  const syncPreferredTheme = event => {
    if (readStoredSiteTheme(storage)) return

    setSiteTheme(event.matches ? SITE_THEME_LIGHT : SITE_THEME_DARK, { root, storage })

    onThemeChange?.()
  }

  mediaQueryList?.addEventListener?.('change', syncPreferredTheme)

  return () => {
    mediaQueryList?.removeEventListener?.('change', syncPreferredTheme)
  }
}
