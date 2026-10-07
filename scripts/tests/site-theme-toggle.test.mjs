import { describe, expect, it } from 'vitest'

import { syncSiteThemeToggle } from '../../packages/theme-core/site.js'

const createElement = attributes => {
  const values = new Map(Object.entries(attributes))

  return {
    getAttribute: name => values.get(name) ?? null,
    removeAttribute: name => values.delete(name),
    setAttribute: (name, value) => values.set(name, value)
  }
}

describe('theme toggle accessibility state', () => {
  it.each(['dark', 'light'])('uses pressed state for native buttons in %s mode', theme => {
    const toggle = createElement({ 'aria-checked': 'true' })

    syncSiteThemeToggle(toggle, createElement({ 'data-theme': theme }))

    expect(toggle.getAttribute('aria-pressed')).toBe(String(theme === 'dark'))

    expect(toggle.getAttribute('aria-checked')).toBeNull()
  })

  it.each(['dark', 'light'])('preserves switch semantics in %s mode', theme => {
    const toggle = createElement({ 'aria-pressed': 'true', role: 'switch' })

    syncSiteThemeToggle(toggle, createElement({ 'data-theme': theme }))

    expect(toggle.getAttribute('aria-checked')).toBe(String(theme === 'dark'))

    expect(toggle.getAttribute('aria-pressed')).toBeNull()
  })

  it('allows missing optional controls and roots', () => {
    expect(() => syncSiteThemeToggle(null)).not.toThrow()

    const toggle = createElement({})

    syncSiteThemeToggle(toggle, undefined)

    expect(toggle.getAttribute('aria-pressed')).toBe('false')
  })
})
