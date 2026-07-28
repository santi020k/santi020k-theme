import './styles.css'

import {
  bindPreferredSiteThemeSync,
  bindSiteNavigation,
  SITE_DESKTOP_NAV_QUERY,
  syncSiteThemeToggle
} from '@santi020k/theme/site'

// ── Boot ──────────────────────────────────────────────────────────────────────
// The theme toggle is Lumen's <ThemeToggle>, which already animates the
// switch with its own circular reveal effect (see UIPrimitives). We only
// need to keep the button's aria state in sync with the current theme.
const toggle = document.querySelector('.theme-toggle')
const header = document.querySelector('.site-header')
const navToggle = document.querySelector('.nav-toggle')
const navLinks = document.querySelectorAll('.nav-links a')
const desktopNavQuery = window.matchMedia(SITE_DESKTOP_NAV_QUERY)

syncSiteThemeToggle(toggle)

if (toggle) {
  toggle.addEventListener('ui:theme-change', () => syncSiteThemeToggle(toggle))
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

// Clipboard: copy the load-unpacked hint
const installBtn = document.querySelector('.button-copy-install')

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('chrome://extensions')

      const original = installBtn.innerHTML

      installBtn.innerHTML = '<span class="command">Copied chrome://extensions!</span>'

      setTimeout(() => { installBtn.innerHTML = original }, 2000)
    } catch {
      // clipboard not available — no-op
    }
  })
}

const preview = document.querySelector('.browser-mockup')
const previewControls = document.querySelectorAll('[data-preview-theme]')

if (preview && previewControls.length > 0) {
  for (const control of previewControls) {
    control.addEventListener('click', () => {
      const variant = control.dataset.previewTheme

      preview.dataset.previewVariant = variant

      for (const item of previewControls) {
        const active = item === control

        item.classList.toggle('is-active', active)

        item.setAttribute('aria-pressed', String(active))
      }
    })
  }
}
