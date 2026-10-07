import { afterEach, describe, expect, it, vi } from 'vitest'

import { bindContextNavigation, bindHeaderScrollOffset } from '../../apps/website/src/utils/context-navigation.ts'

class NavigationLink extends EventTarget {
  constructor(href) {
    super()

    this.href = href

    this.attributes = new Map()
  }

  setAttribute(name, value) { this.attributes.set(name, value) }
  removeAttribute(name) { this.attributes.delete(name) }
}

const setup = (path = '/vscode/', hash = '') => {
  const links = ['Overview', 'Variants', 'Settings', 'Palette', 'Missing', 'Other'].map((label, index) => {
    const href = ['/vscode/', '/vscode/#variants', '/vscode/#settings', '/vscode/#palette', '/vscode/#missing', '/terminal/'][index]
    const link = new NavigationLink(href)

    link.label = label

    return link
  })

  const sections = new Map(['variants', 'settings', 'palette'].map((id, index) => [id, {
    top: 500 + index * 500,
    margin: 80,
    getBoundingClientRect() { return { top: this.top } },
  }]))

  const document = {
    documentElement: { padding: 148 },
    querySelector: selector => selector.endsWith('nav')
      ? { querySelectorAll: () => links }
      : { getBoundingClientRect: () => ({ bottom: 140 }) },
    getElementById: id => sections.get(id) ?? null,
  }

  const window = new EventTarget()
  let pending

  window.location = new URL(`https://theme.test${path}${hash}`)

  window.requestAnimationFrame = vi.fn(callback => {
    pending = callback

    return 1
  })

  window.cancelAnimationFrame = vi.fn(() => { pending = undefined })

  vi.stubGlobal('document', document)

  vi.stubGlobal('window', window)

  vi.stubGlobal('getComputedStyle', element => ({ scrollPaddingTop: `${element.padding ?? 0}px`, scrollMarginTop: `${element.margin ?? 0}px` }))

  const controller = new AbortController()
  const dispose = bindContextNavigation(controller.signal)

  const flush = () => {
    const callback = pending

    pending = undefined

    callback?.()
  }

  const active = () => links.filter(link => link.attributes.has('aria-current')).map(link => link.label)

  return { links, sections, window, controller, dispose, flush, active }
}

afterEach(() => vi.unstubAllGlobals())

describe('product section navigation', () => {
  it('moves the single current location as sections cross the sticky header, then restores Overview at the top', () => {
    const page = setup()

    page.flush()

    expect(page.active()).toEqual(['Overview'])

    page.sections.get('variants').top = -100

    page.sections.get('settings').top = 228

    page.window.dispatchEvent(new Event('scroll'))

    page.flush()

    expect(page.active()).toEqual(['Settings'])

    expect(page.links[2].attributes.get('aria-current')).toBe('location')

    page.sections.get('variants').top = 500

    page.sections.get('settings').top = 1000

    page.window.dispatchEvent(new Event('scroll'))

    page.flush()

    expect(page.active()).toEqual(['Overview'])

    expect(page.links[0].attributes.get('aria-current')).toBe('page')
  })

  it('highlights ordinary link activation immediately without changing native navigation', () => {
    const page = setup()
    const event = new Event('click', { cancelable: true })

    Object.assign(event, { button: 0 })

    page.links[3].dispatchEvent(event)

    expect(page.active()).toEqual(['Palette'])

    expect(event.defaultPrevented).toBe(false)

    expect(page.window.location.hash).toBe('')
  })

  it('ignores modified clicks and links to other routes or missing sections', () => {
    const page = setup()
    const event = new Event('click')

    Object.assign(event, { button: 0, ctrlKey: true })

    page.links[1].dispatchEvent(event)

    page.links[4].dispatchEvent(new Event('click'))

    page.links[5].dispatchEvent(new Event('click'))

    expect(page.active()).toEqual(['Overview'])
  })

  it('initializes deep links and follows hash changes and browser history', () => {
    const page = setup('/vscode/', '#settings')

    expect(page.active()).toEqual(['Settings'])

    page.window.location.hash = '#palette'

    page.window.dispatchEvent(new Event('hashchange'))

    expect(page.active()).toEqual(['Palette'])

    page.window.location.hash = ''

    page.window.dispatchEvent(new Event('popstate'))

    expect(page.active()).toEqual(['Overview'])
  })

  it('does not select Overview from another page on a documentation route', () => {
    const page = setup('/terminal/docs/')

    page.flush()

    expect(page.active()).toEqual([])
  })

  it('coalesces scroll updates and cancels pending work when the document is replaced', () => {
    const page = setup()

    page.flush()

    page.window.requestAnimationFrame.mockClear()

    page.window.dispatchEvent(new Event('scroll'))

    page.window.dispatchEvent(new Event('scroll'))

    expect(page.window.requestAnimationFrame).toHaveBeenCalledTimes(1)

    page.controller.abort()

    page.dispose()

    page.window.dispatchEvent(new Event('scroll'))

    expect(page.window.cancelAnimationFrame).toHaveBeenCalledWith(1)

    expect(page.window.requestAnimationFrame).toHaveBeenCalledTimes(1)
  })
})

describe('section anchor offset', () => {
  it('tracks the rendered header height and disposes its observer on page replacement', () => {
    const properties = new Map()

    const style = {
      getPropertyValue: name => properties.get(name) ?? '',
      setProperty: (name, value) => properties.set(name, value),
      removeProperty: name => properties.delete(name),
    }

    let height = 140
    const header = { getBoundingClientRect: () => ({ height }) }
    let resize
    const disconnect = vi.fn()
    const observe = vi.fn()

    vi.stubGlobal('document', { documentElement: { style }, querySelector: () => header })

    vi.stubGlobal('ResizeObserver', class {
      constructor(callback) { resize = callback }
      observe = observe
      disconnect = disconnect
    })

    const dispose = bindHeaderScrollOffset()

    expect(properties.get('--family-header-height')).toBe('140px')

    expect(observe).toHaveBeenCalledWith(header)

    height = 150

    resize()

    expect(properties.get('--family-header-height')).toBe('150px')

    dispose()

    expect(disconnect).toHaveBeenCalledTimes(1)

    expect(properties.has('--family-header-height')).toBe(false)
  })
})
