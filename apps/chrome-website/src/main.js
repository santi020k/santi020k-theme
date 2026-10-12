import {
  bindPreferredSiteThemeSync,
  bindSiteNavigation,
  SITE_DESKTOP_NAV_QUERY,
  syncSiteThemeToggle
} from '@santi020k/theme/site'

import { bindPageLifecycle } from '../../website/src/utils/page-lifecycle'

bindPageLifecycle('chrome', () => {
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

  const disposeNavigation = bindSiteNavigation({
    desktopNavQuery,
    header,
    navLinks,
    navToggle
  })

  const disposePreference = bindPreferredSiteThemeSync({
    onThemeChange: () => syncSiteThemeToggle(toggle)
  })

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

  return () => {
    disposeNavigation()

    disposePreference()
  }
})
