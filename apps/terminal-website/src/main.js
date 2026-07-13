import './styles.css'

import {
  bindPreferredSiteThemeSync,
  bindSiteNavigation,
  rootInDarkMode,
  setSiteTheme,
  SITE_DESKTOP_NAV_QUERY,
  syncSiteThemeToggle
} from '@santi020k/theme/site'

// cspell:ignore configurator

const toggle = document.querySelector('.theme-toggle')

syncSiteThemeToggle(toggle)

bindSiteNavigation({ desktopNavQuery: window.matchMedia(SITE_DESKTOP_NAV_QUERY), header: document.querySelector('.site-header'), navLinks: document.querySelectorAll('#primary-navigation a'), navToggle: document.querySelector('.nav-toggle') })

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

for (const button of document.querySelectorAll('[data-copy-dynamic]')) button.addEventListener('click', async () => {
  const original = button.textContent
  const value = button.previousElementSibling?.textContent || ''

  try { await navigator.clipboard.writeText(value);

 button.textContent = 'Copied' } catch { button.textContent = 'Select text' }

  setTimeout(() => { button.textContent = original }, 1800)
})

const updateConfigurator = configurator => {
  const form = configurator.querySelector('form')
  const preview = configurator.querySelector('.terminal')
  const setup = configurator.querySelector('[data-config-command]')
  const custom = configurator.querySelector('[data-custom-command]')
  const prompt = configurator.querySelector('[data-prompt-command]')
  const data = new FormData(form)
  const shell = data.get('shell')
  const preset = data.get('prompt')
  const terminal = data.get('terminal')
  const palette = data.get('palette')
  const modules = data.getAll('module')
  const runtimeModules = modules.filter(module => module !== 'docker_context')
  const runtimeLabels = { golang: 'go 1.24', nodejs: 'node v22', python: 'python 3.13', rust: 'rust 1.85' }

  setup.textContent = `santi020k-terminal configure ${shell} ${preset} ${terminal} ${palette}`

  preview.dataset.terminalTheme = palette

  preview.dataset.promptVariant = preset

  preview.dataset.hasRuntime = String(runtimeModules.length > 0 && preset !== 'minimal')

  for (const runtime of preview.querySelectorAll('.runtime')) runtime.textContent = runtimeLabels[runtimeModules[0]] || runtimeModules[0] || ''

  for (const button of preview.querySelectorAll('[data-preset]')) {
    const active = button.dataset.preset === palette

    button.classList.toggle('is-active', active)

    button.setAttribute('aria-pressed', String(active))
  }

  const defaults = ['nodejs', 'python', 'docker_context']
  const customized = preset !== 'minimal' && (modules.length !== defaults.length || modules.some(module => !defaults.includes(module)))

  custom.hidden = !customized

  prompt.textContent = `santi020k-terminal prompt build my-prompt ${modules.join(',') || 'none'} ${palette}`
}

for (const configurator of document.querySelectorAll('[data-configurator]')) {
  const form = configurator.querySelector('form')

  form.addEventListener('change', () => updateConfigurator(configurator))

  updateConfigurator(configurator)
}

const selectTab = (tabs, panels, selectedTab, focus = false) => {
  for (const tab of tabs) {
    const active = tab === selectedTab

    tab.setAttribute('aria-selected', String(active))

    tab.tabIndex = active ? 0 : -1
  }

  for (const panel of panels) panel.hidden = panel.id !== selectedTab.getAttribute('aria-controls')

  if (focus) selectedTab.focus()
}

for (const tabList of document.querySelectorAll('[data-tabs]')) {
  const tabs = [...tabList.querySelectorAll('[role="tab"]')]
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls'))).filter(Boolean)

  for (const [index, tab] of tabs.entries()) {
    tab.addEventListener('click', () => selectTab(tabs, panels, tab))

    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return

      event.preventDefault()

      let nextIndex

      if (event.key === 'Home') nextIndex = 0
      else if (event.key === 'End') nextIndex = tabs.length - 1
      else nextIndex = (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length

      const nextTab = tabs.at(nextIndex)

      if (nextTab) selectTab(tabs, panels, nextTab, true)
    })
  }
}
