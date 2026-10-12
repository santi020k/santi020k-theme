import {
  bindPreferredSiteThemeSync,
  bindSiteNavigation,
  SITE_HUB_DESKTOP_NAV_QUERY,
  syncSiteThemeToggle
} from '@santi020k/theme/site'

import { bindPageLifecycle } from '../../website/src/utils/page-lifecycle'

bindPageLifecycle('codex', () => {
  const toggle = document.querySelector('.theme-toggle')
  const header = document.querySelector('.site-header')
  const navToggle = document.querySelector('.nav-toggle')
  const navLinks = document.querySelectorAll('.nav-links a')

  syncSiteThemeToggle(toggle)

  toggle?.addEventListener('ui:theme-change', () => syncSiteThemeToggle(toggle))

  const disposeNavigation = bindSiteNavigation({
    desktopNavQuery: window.matchMedia(SITE_HUB_DESKTOP_NAV_QUERY),
    header,
    navLinks,
    navToggle
  })

  const disposePreference = bindPreferredSiteThemeSync({ onThemeChange: () => syncSiteThemeToggle(toggle) })

  return () => {
    disposeNavigation()

    disposePreference()
  }
})
