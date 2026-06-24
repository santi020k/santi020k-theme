import './styles.css'

import {
  bindPreferredSiteThemeSync,
  bindSiteNavigation,
  rootInDarkMode,
  setSiteTheme,
  SITE_HUB_DESKTOP_NAV_QUERY,
  syncSiteThemeToggle
} from '@santi020k/theme-core/site'

const toggle = document.querySelector('.theme-toggle')
const header = document.querySelector('.site-header')
const navToggle = document.querySelector('.nav-toggle')
const navLinks = document.querySelectorAll('.nav-links a')
const desktopNavQuery = window.matchMedia(SITE_HUB_DESKTOP_NAV_QUERY)

syncSiteThemeToggle(toggle)

if (toggle) {
  toggle.addEventListener('click', () => {
    setSiteTheme(rootInDarkMode() ? 'light' : 'dark')

    syncSiteThemeToggle(toggle)
  })
}

bindSiteNavigation({
  desktopNavQuery,
  header,
  navLinks,
  navToggle
})

bindPreferredSiteThemeSync({
  onThemeChange: () => syncSiteThemeToggle(toggle)
})
