import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'

import { describe, expect, it } from 'vitest'

import {
  SITE_THEME_ATTRIBUTE, SITE_THEME_DARK, SITE_THEME_LIGHT,
  SITE_THEME_PREFERENCE_QUERY, SITE_THEME_STORAGE_KEY
} from '../../packages/theme-core/site.js'

const component = readFileSync(new URL('../../apps/website/src/components/PageTransitions.astro', import.meta.url), 'utf8')
const script = component.match(/<script is:inline define:vars=[\s\S]*?>([\s\S]*?)<\/script>/u)?.[1]

const initialize = (saved, prefersLight, blocked = false) => {
  const attributes = new Map()

  const context = {
    SITE_THEME_ATTRIBUTE, SITE_THEME_DARK, SITE_THEME_LIGHT,
    SITE_THEME_PREFERENCE_QUERY, SITE_THEME_STORAGE_KEY,
    document: { documentElement: { setAttribute: (name, value) => attributes.set(name, value) } },
    window: { matchMedia: () => ({ matches: prefersLight }) }
  }

  Object.defineProperty(context, 'localStorage', {
    get() {
      if (blocked) throw new Error('Storage denied')

      return { getItem: () => saved }
    }
  })

  if (!script) throw new Error('Missing synchronous appearance bootstrap')

  runInNewContext(script, context)

  return attributes.get(SITE_THEME_ATTRIBUTE)
}

describe('shared appearance before first paint', () => {
  it.each(['light', 'dark'])('preserves explicit %s preference', theme => {
    expect(initialize(theme, theme !== 'light')).toBe(theme)
  })

  it.each([null, 'invalid'])('follows the system with stored value %s', saved => {
    expect(initialize(saved, true)).toBe('light')

    expect(initialize(saved, false)).toBe('dark')
  })

  it('uses system appearance when access to storage itself throws', () => {
    expect(initialize(null, true, true)).toBe('light')

    expect(initialize(null, false, true)).toBe('dark')
  })
})
