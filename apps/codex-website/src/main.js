import './styles.css'

import {
  bindPreferredSiteThemeSync,
  bindSiteNavigation,
  SITE_HUB_DESKTOP_NAV_QUERY,
  syncSiteThemeToggle
} from '@santi020k/theme/site'

const toggle = document.querySelector('.theme-toggle')
const header = document.querySelector('.site-header')
const navToggle = document.querySelector('.nav-toggle')
const navLinks = document.querySelectorAll('.nav-links a')

syncSiteThemeToggle(toggle)

toggle?.addEventListener('ui:theme-change', () => syncSiteThemeToggle(toggle))

bindSiteNavigation({
  desktopNavQuery: window.matchMedia(SITE_HUB_DESKTOP_NAV_QUERY),
  header,
  navLinks,
  navToggle
})

bindPreferredSiteThemeSync({ onThemeChange: () => syncSiteThemeToggle(toggle) })

document.querySelector('.copy-theme')?.addEventListener('click', async event => {
  const preset = event.currentTarget.dataset.theme

  if (!preset) return

  await navigator.clipboard.writeText(preset)

  event.currentTarget.textContent = 'Copied'

  window.setTimeout(() => {
    event.currentTarget.textContent = 'Copy theme'
  }, 1800)
})
