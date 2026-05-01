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
    themeName: 'santi020k dark'
  },
  light: {
    filename: 'santi020k-light-color-theme.json',
    themeName: 'santi020k light'
  },
  hc: {
    filename: 'santi020k-hc-dark-color-theme.json',
    themeName: 'santi020k hc dark'
  }
}

const SNIPPETS = {
  json: data => `<span class="muted">// focused without glare</span>
{
  <span class="keyword">"name"</span>: <span class="string">'${data.themeName}'</span>,
  <span class="keyword">"type"</span>: <span class="string">'dark'</span>,
  <span class="keyword">"semanticHighlighting"</span>: <span class="keyword">true</span>
}`,
  rust: () => `<span class="muted">// Precise lifetimes</span>
<span class="keyword">impl</span>&lt;<span class="string">'a</span>&gt; Parser&lt;<span class="string">'a</span>&gt; {
  <span class="keyword">pub fn</span> <span class="function">new</span>(input: <span class="keyword">&'a</span> str) -&gt; <span class="keyword">Self</span> {
    <span class="keyword">Self</span> { input }
  }
}`,
  go: () => `<span class="muted">// Clear built-ins</span>
<span class="keyword">func</span> <span class="function">main</span>() {
  items := <span class="function">make</span>([]<span class="keyword">string</span>, <span class="number">0</span>)
  <span class="keyword">if</span> <span class="function">len</span>(items) == <span class="number">0</span> {
    <span class="function">println</span>(<span class="string">"Empty"</span>)
  }
}`
}

let currentPreviewLang = 'json'
let currentPreviewTheme = 'dark'

const updatePreview = (lang = currentPreviewLang, theme = currentPreviewTheme) => {
  currentPreviewLang = lang
  currentPreviewTheme = theme

  const data = PREVIEW_DATA[theme]
  const container = document.querySelector('.editor-preview')
  const codeEl = document.querySelector('.preview-code')
  const filenameEl = document.querySelector('.preview-filename')
  const langSelect = document.querySelector('.preview-lang-select')
  const themeSelect = document.querySelector('.preview-theme-select')

  if (container) container.setAttribute('data-preview-theme', theme)

  if (filenameEl) filenameEl.textContent = data.filename

  if (codeEl) codeEl.innerHTML = SNIPPETS[lang](data)

  if (langSelect) langSelect.value = lang

  if (themeSelect) themeSelect.value = theme
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
    backgroundColor: isDark ? '#110c1d' : '#f8f6fd',
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
const header = document.querySelector('.site-header')
const navToggle = document.querySelector('.nav-toggle')
const navLinks = document.querySelectorAll('.nav-links a')
const desktopNavQuery = window.matchMedia('(min-width: 941px)')

syncToggle(toggle)

const langSelect = document.querySelector('.preview-lang-select')
const themeSelect = document.querySelector('.preview-theme-select')
let manualPreviewTheme = false

if (langSelect) {
  langSelect.addEventListener('change', e => {
    updatePreview(e.target.value, currentPreviewTheme)
  })
}

if (themeSelect) {
  themeSelect.addEventListener('change', e => {
    manualPreviewTheme = true
    updatePreview(currentPreviewLang, e.target.value)
  })
}

const syncPreviewWithSite = () => {
  if (!manualPreviewTheme) {
    updatePreview(currentPreviewLang, rootInDarkMode() ? 'dark' : 'light')
  } else {
    updatePreview()
  }
}

syncPreviewWithSite()

const setNavOpen = isOpen => {
  if (!header || !navToggle) return

  if (isOpen) {
    header.setAttribute('data-nav-open', 'true')
  } else {
    header.removeAttribute('data-nav-open')
  }

  navToggle.setAttribute('aria-expanded', String(isOpen))
}

if (navToggle) {
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true'

    setNavOpen(!isOpen)
  })
}

for (const link of navLinks) {
  link.addEventListener('click', () => setNavOpen(false))
}

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setNavOpen(false)
})

desktopNavQuery.addEventListener('change', event => {
  if (event.matches) setNavOpen(false)
})

// Respect OS-level theme changes (only when user has no stored preference)
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    setTheme(e.matches ? 'light' : 'dark')

    syncToggle(toggle)

    syncPreviewWithSite()
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

      syncPreviewWithSite()

      isAnimating = false

      return
    }

    circularReveal(toggle, isDark, newTheme)

    syncToggle(toggle)

    syncPreviewWithSite()

    setTimeout(() => {
      isAnimating = false
    }, 800)
  })
}
