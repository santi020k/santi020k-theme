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

for (const button of document.querySelectorAll('[data-preset]')) button.addEventListener('click', () => {
  const terminal = button.closest('.terminal')

  terminal.dataset.terminalTheme = button.dataset.preset

  for (const item of terminal.querySelectorAll('[data-preset]')) {
    const active = item === button

    item.classList.toggle('is-active', active)

    item.setAttribute('aria-pressed', String(active))
  }
})

for (const button of document.querySelectorAll('[data-copy]')) button.addEventListener('click', async () => {
  const original = button.textContent

  try {
    await navigator.clipboard.writeText(button.dataset.copy)

    button.textContent = 'Copied'
  } catch {
    button.textContent = 'Select text'
  }

  setTimeout(() => { button.textContent = original }, 1800)
})
