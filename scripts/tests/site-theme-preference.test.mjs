import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  bindPreferredSiteThemeSync,
  getPreferredSiteTheme,
  readStoredSiteTheme,
  setSiteTheme
} from '../../packages/theme-core/site.js'

const createRoot = () => {
  const attributes = new Map()

  return {
    getAttribute: name => attributes.get(name),
    setAttribute: (name, value) => attributes.set(name, value)
  }
}

const createStorage = (initialTheme = null) => {
  let theme = initialTheme

  return {
    getItem: vi.fn(() => theme),
    setItem: vi.fn((_key, value) => { theme = value })
  }
}

const dispatchPreference = (mediaQueryList, matches) => {
  const event = new Event('change')

  Object.defineProperty(event, 'matches', { value: matches })

  mediaQueryList.dispatchEvent(event)
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('preferred site appearance', () => {
  it('follows repeated OS changes without persisting an explicit choice', () => {
    const mediaQueryList = new EventTarget()
    const root = createRoot()
    const storage = createStorage()
    const onThemeChange = vi.fn()
    const dispose = bindPreferredSiteThemeSync({ mediaQueryList, onThemeChange, root, storage })

    dispatchPreference(mediaQueryList, true)

    expect(root.getAttribute('data-theme')).toBe('light')

    dispatchPreference(mediaQueryList, false)

    expect(root.getAttribute('data-theme')).toBe('dark')

    expect(onThemeChange).toHaveBeenCalledTimes(2)

    expect(storage.setItem).not.toHaveBeenCalled()

    dispose()

    dispatchPreference(mediaQueryList, true)

    expect(root.getAttribute('data-theme')).toBe('dark')

    expect(onThemeChange).toHaveBeenCalledTimes(2)
  })

  it('stops following the OS when the user explicitly selects an appearance', () => {
    const mediaQueryList = new EventTarget()
    const root = createRoot()
    const storage = createStorage()
    const onThemeChange = vi.fn()
    const dispose = bindPreferredSiteThemeSync({ mediaQueryList, onThemeChange, root, storage })

    dispatchPreference(mediaQueryList, true)

    expect(setSiteTheme('dark', { root, storage })).toBe(true)

    dispatchPreference(mediaQueryList, true)

    expect(root.getAttribute('data-theme')).toBe('dark')

    expect(storage.setItem).toHaveBeenCalledWith('theme', 'dark')

    expect(onThemeChange).toHaveBeenCalledTimes(1)

    dispose()
  })

  it('ignores invalid saved values during initial selection and subsequent changes', () => {
    const mediaQueryList = new EventTarget()
    const root = createRoot()
    const storage = createStorage('invalid')

    expect(getPreferredSiteTheme({ mediaQueryList: { matches: true }, storage })).toBe('light')

    const dispose = bindPreferredSiteThemeSync({ mediaQueryList, root, storage })

    dispatchPreference(mediaQueryList, true)

    expect(root.getAttribute('data-theme')).toBe('light')

    dispatchPreference(mediaQueryList, false)

    expect(root.getAttribute('data-theme')).toBe('dark')

    dispose()
  })

  it('handles unavailable storage methods and missing values', () => {
    const storage = {
      getItem() { throw new Error('Storage denied') },
      setItem() { throw new Error('Storage denied') }
    }

    const root = createRoot()

    expect(readStoredSiteTheme(createStorage())).toBeUndefined()

    expect(getPreferredSiteTheme({ mediaQueryList: { matches: true }, storage })).toBe('light')

    expect(setSiteTheme('dark', { root, storage })).toBe(true)

    expect(root.getAttribute('data-theme')).toBe('dark')
  })

  it('handles browser contexts where merely accessing localStorage throws', () => {
    vi.stubGlobal('localStorage', undefined)

    Object.defineProperty(globalThis, 'localStorage', {
      configurable: true,
      get() { throw new Error('Storage denied') }
    })

    const mediaQueryList = new EventTarget()
    const root = createRoot()

    expect(getPreferredSiteTheme({ mediaQueryList: { matches: true } })).toBe('light')

    expect(setSiteTheme('dark', { root })).toBe(true)

    const dispose = bindPreferredSiteThemeSync({ mediaQueryList, root })

    dispatchPreference(mediaQueryList, true)

    expect(root.getAttribute('data-theme')).toBe('light')

    dispose()
  })
})
