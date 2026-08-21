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

for (const button of document.querySelectorAll('.copy-theme')) {
  button.addEventListener('click', async () => {
    const preset = button.dataset.theme

    if (!preset) return

    await navigator.clipboard.writeText(preset)

    button.textContent = 'Copied'

    window.setTimeout(() => {
      button.textContent = 'Copy theme'
    }, 1800)
  })
}
