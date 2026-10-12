// @vitest-environment jsdom
import { afterEach, describe, expect, it } from 'vitest'

import { bindAppearanceControls } from '../../apps/website/src/utils/appearance-controls'

let dispose = () => {}

afterEach(() => {
  dispose()

  document.body.innerHTML = ''

  document.documentElement.removeAttribute('data-theme')

  document.documentElement.classList.remove('dark')
})

const setup = () => {
  document.body.innerHTML = '<button class="family-theme-toggle"></button><button class="family-mobile-appearance" role="switch"></button>'

  document.documentElement.setAttribute('data-theme', 'dark')

  dispose = bindAppearanceControls()

  return [...document.querySelectorAll('button')]
}

describe('shared appearance controls', () => {
  it('keeps both controls and the icon class synchronized through repeated OS changes', async () => {
    const [desktop, mobile] = setup()

    for (const theme of ['dark', 'light', 'dark', 'light']) {
      document.documentElement.setAttribute('data-theme', theme)

      await Promise.resolve()

      expect(document.documentElement.classList.contains('dark')).toBe(theme === 'dark')

      expect(desktop.getAttribute('aria-pressed')).toBe(String(theme === 'dark'))

      expect(mobile.getAttribute('aria-checked')).toBe(String(theme === 'dark'))

      expect(mobile.hasAttribute('aria-pressed')).toBe(false)
    }
  })

  it('disposes the previous controls and initializes the next page from its appearance', async () => {
    const [oldDesktop] = setup()

    dispose()

    document.documentElement.setAttribute('data-theme', 'light')

    await Promise.resolve()

    expect(oldDesktop.getAttribute('aria-pressed')).toBe('true')

    document.body.innerHTML = '<button class="family-mobile-appearance"></button>'

    dispose = bindAppearanceControls()

    expect(document.documentElement.classList.contains('dark')).toBe(false)

    expect(document.querySelector('button')?.getAttribute('aria-pressed')).toBe('false')
  })
})
