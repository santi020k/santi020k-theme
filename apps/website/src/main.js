import './styles.css'

const STORAGE_KEY = 'theme'
const rootInDarkMode = () => document.documentElement.getAttribute('data-theme') === 'dark'

const setTheme = theme => {
  if (theme !== 'light' && theme !== 'dark') return

  const root = document.documentElement

  root.setAttribute('data-theme', theme)

  localStorage.setItem(STORAGE_KEY, theme)
}

const syncToggle = toggle => {
  if (toggle) toggle.setAttribute('aria-checked', String(rootInDarkMode()))
}

const toggle = document.querySelector('.theme-toggle')
const header = document.querySelector('.site-header')
const navToggle = document.querySelector('.nav-toggle')
const navLinks = document.querySelectorAll('.nav-links a')
const desktopNavQuery = window.matchMedia('(min-width: 900px)')

const setNavOpen = isOpen => {
  if (!header || !navToggle) return

  header.toggleAttribute('data-nav-open', isOpen)

  navToggle.setAttribute('aria-expanded', String(isOpen))
}

syncToggle(toggle)

if (toggle) {
  toggle.addEventListener('click', () => {
    setTheme(rootInDarkMode() ? 'light' : 'dark')

    syncToggle(toggle)
  })
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

window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', event => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    setTheme(event.matches ? 'light' : 'dark')

    syncToggle(toggle)
  }
})
