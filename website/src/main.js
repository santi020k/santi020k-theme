import './styles.css'

const STORAGE_KEY = 'theme'
const rootInDarkMode = () => document.documentElement.getAttribute('data-theme') === 'dark'

const setTheme = theme => {
  if (theme !== 'light' && theme !== 'dark') return

  const root = document.documentElement

  if (root.getAttribute('data-theme') === theme) return

  root.setAttribute('data-theme', theme)

  localStorage.setItem(STORAGE_KEY, theme)
}

const PREVIEW_DATA = {
  dark: {
    filename: 'santi020k-dark-color-theme.json',
    name: '\'santi020k dark\'',
    bg: '\'#120c1e\'',
    accent: '\'#c090ff\''
  },
  light: {
    filename: 'santi020k-light-color-theme.json',
    name: '\'santi020k light\'',
    bg: '\'#f8f6fd\'',
    accent: '\'#6319be\''
  }
}

const updatePreview = () => {
  const data = PREVIEW_DATA[rootInDarkMode() ? 'dark' : 'light']
  const el = cls => document.querySelector(cls)
  const filename = el('.preview-filename')
  const name = el('.preview-theme-name')
  const bg = el('.preview-bg-color')
  const accent = el('.preview-accent-color')

  if (filename) filename.textContent = data.filename

  if (name) name.textContent = data.name

  if (bg) bg.textContent = data.bg

  if (accent) accent.textContent = data.accent
}

const syncToggle = toggle => {
  if (toggle) toggle.setAttribute('aria-checked', String(rootInDarkMode()))
}

const circularReveal = (button, isDark, newTheme) => {
  // Skip clip-path animation on touch/coarse-pointer: GPU-expensive and hurts INP
  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    setTheme(newTheme)

    return
  }

  const rect = button.getBoundingClientRect()
  const x = Math.round(rect.left + rect.width / 2)
  const y = Math.round(rect.top + rect.height / 2)

  const maxRadius = Math.hypot(
    Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y)
  )

  const overlay = document.createElement('div')

  overlay.setAttribute('aria-hidden', 'true')

  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '99999',
    pointerEvents: 'none',
    backgroundColor: isDark ? '#120c1e' : '#f8f6fd',
    clipPath: `circle(${maxRadius}px at ${x}px ${y}px)`,
    willChange: 'clip-path'
  })

  document.body.appendChild(overlay)

  setTheme(newTheme)

  // Double rAF: first frame commits the append + initial clip-path to the
  // compositor; second frame starts the collapse. Avoids forced sync layout.
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
// Theme is already set by the anti-FOUC inline script in <head>.
// We just need to sync the toggle button state and preview content.

const toggle = document.querySelector('.theme-toggle')

syncToggle(toggle)

updatePreview()

// Respect OS-level theme changes (only when user has no stored preference)
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    setTheme(e.matches ? 'light' : 'dark')

    syncToggle(toggle)

    updatePreview()
  }
})

// Theme toggle button
if (toggle) {
  let isAnimating = false

  toggle.addEventListener('click', () => {
    if (isAnimating) return

    const isDark = rootInDarkMode()
    const newTheme = isDark ? 'light' : 'dark'

    isAnimating = true

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTheme(newTheme)
      syncToggle(toggle)
      updatePreview()

      isAnimating = false

      return
    }

    circularReveal(toggle, isDark, newTheme)
    syncToggle(toggle)
    updatePreview()

    setTimeout(() => {
      isAnimating = false
    }, 800)
  })
}
