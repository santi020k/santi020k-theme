import './styles.css'

import {
  bindPreferredSiteThemeSync,
  bindSiteNavigation,
  rootInDarkMode,
  setSiteTheme,
  SITE_DESKTOP_NAV_QUERY,
  syncSiteThemeToggle
} from '@santi020k/theme/site'

const toggle = document.querySelector('.theme-toggle')

syncSiteThemeToggle(toggle)

bindSiteNavigation({ desktopNavQuery: window.matchMedia(SITE_DESKTOP_NAV_QUERY), header: document.querySelector('.site-header'), navLinks: document.querySelectorAll('nav a'), navToggle: document.querySelector('.nav-toggle') })

bindPreferredSiteThemeSync({ onThemeChange: () => syncSiteThemeToggle(toggle) })

toggle?.addEventListener('click', () => {
  setSiteTheme(rootInDarkMode() ? 'light' : 'dark')

  syncSiteThemeToggle(toggle)
})

const terminal = document.querySelector('.terminal')

for (const button of document.querySelectorAll('[data-preset]')) button.addEventListener('click', () => {
  terminal.dataset.terminalTheme = button.dataset.preset

  for (const item of document.querySelectorAll('[data-preset]')) {
    const active = item === button

    item.classList.toggle('is-active', active)

    item.setAttribute('aria-pressed', String(active))
  }
})
