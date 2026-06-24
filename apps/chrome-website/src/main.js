import './styles.css'

import {
  bindPreferredSiteThemeSync,
  bindSiteNavigation,
  rootInDarkMode,
  setSiteTheme,
  SITE_DESKTOP_NAV_QUERY,
  SITE_REDUCED_MOTION_QUERY,
  SITE_REVEAL_DARK_BACKGROUND,
  SITE_REVEAL_LIGHT_BACKGROUND,
  SITE_TOUCH_POINTER_QUERY,
  syncSiteThemeToggle
} from '@santi020k/theme-core/site'

const circularReveal = (button, isDark, newTheme) => {
  if (window.matchMedia(SITE_TOUCH_POINTER_QUERY).matches) {
    setSiteTheme(newTheme)

    return
  }

  const rect = button.getBoundingClientRect()
  const x = Math.round(rect.left + rect.width / 2)
  const y = Math.round(rect.top + rect.height / 2)

  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  const overlay = document.createElement('div')

  overlay.setAttribute('aria-hidden', 'true')

  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '99999',
    pointerEvents: 'none',
    backgroundColor: isDark ? SITE_REVEAL_DARK_BACKGROUND : SITE_REVEAL_LIGHT_BACKGROUND,
    clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
    willChange: 'clip-path'
  })

  document.body.appendChild(overlay)

  setSiteTheme(newTheme)

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.style.transition = 'clip-path 580ms cubic-bezier(0.4, 0, 0.2, 1)'

      overlay.style.clipPath = `circle(0px at ${x}px ${y}px)`

      const done = () => overlay.remove()

      overlay.addEventListener('transitionend', done, { once: true })

      setTimeout(done, 750)
    })
  })
}

// ── Boot ──────────────────────────────────────────────────────────────────────
const toggle = document.querySelector('.theme-toggle')
const header = document.querySelector('.site-header')
const navToggle = document.querySelector('.nav-toggle')
const navLinks = document.querySelectorAll('.nav-links a')
const desktopNavQuery = window.matchMedia(SITE_DESKTOP_NAV_QUERY)

syncSiteThemeToggle(toggle)

bindSiteNavigation({
  desktopNavQuery,
  header,
  navLinks,
  navToggle
})

bindPreferredSiteThemeSync({
  onThemeChange: () => syncSiteThemeToggle(toggle)
})

if (toggle) {
  let isAnimating = false

  toggle.addEventListener('click', () => {
    if (isAnimating) return

    const isDark = rootInDarkMode()
    const newTheme = isDark ? 'light' : 'dark'

    isAnimating = true

    if (window.matchMedia(SITE_REDUCED_MOTION_QUERY).matches) {
      setSiteTheme(newTheme)

      syncSiteThemeToggle(toggle)

      isAnimating = false

      return
    }

    circularReveal(toggle, isDark, newTheme)

    syncSiteThemeToggle(toggle)

    setTimeout(() => { isAnimating = false }, 800)
  })
}

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
