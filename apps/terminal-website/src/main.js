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

for (const tabList of document.querySelectorAll('[data-tabs]')) {
  const tabs = [...tabList.querySelectorAll('[role="tab"]')]
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls'))).filter(Boolean)

  const selectTab = (selectedTab, focus = false) => {
    for (const tab of tabs) {
      const active = tab === selectedTab

      tab.setAttribute('aria-selected', String(active))

      tab.tabIndex = active ? 0 : -1
    }

    for (const panel of panels) panel.hidden = panel.id !== selectedTab.getAttribute('aria-controls')

    if (focus) selectedTab.focus()
  }

  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener('click', () => selectTab(tab))

    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return

      event.preventDefault()

      const nextIndex = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length

      selectTab(tabs[nextIndex], true)
    })
  }
}
