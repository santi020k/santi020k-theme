import { afterEach, describe, expect, it, vi } from 'vitest'

import { bindPageLifecycle } from '../../apps/website/src/utils/page-lifecycle.ts'

class PageDocument extends EventTarget {
  body = new EventTarget()
  page = 'hub'
  querySelector() { return { getAttribute: () => this.page } }
  swap(page) {
    this.dispatchEvent(new Event('astro:before-swap'))

    this.body = new EventTarget()

    this.page = page

    this.dispatchEvent(new Event('astro:page-load'))
  }
}

afterEach(() => vi.unstubAllGlobals())

describe('Astro page lifecycle', () => {
  it('initializes once per document and again on a returning route', () => {
    const document = new PageDocument()

    vi.stubGlobal('document', document)

    const setup = vi.fn(() => undefined)

    bindPageLifecycle('hub', setup)

    document.dispatchEvent(new Event('astro:page-load'))

    expect(setup).toHaveBeenCalledTimes(1)

    document.swap('vscode')

    expect(setup).toHaveBeenCalledTimes(1)

    document.swap('hub')

    expect(setup).toHaveBeenCalledTimes(2)
  })

  it('aborts global event listeners and disposes subscriptions before swapping', () => {
    const document = new PageDocument()

    vi.stubGlobal('document', document)

    const cleanup = vi.fn()
    const listener = vi.fn()

    const setup = vi.fn(signal => {
      document.addEventListener('test', listener, { signal })

      return cleanup
    })

    bindPageLifecycle('hub', setup)

    document.dispatchEvent(new Event('test'))

    expect(listener).toHaveBeenCalledTimes(1)

    document.swap('vscode')

    document.dispatchEvent(new Event('test'))

    expect(listener).toHaveBeenCalledTimes(1)

    expect(cleanup).toHaveBeenCalledTimes(1)

    expect(setup.mock.calls[0][0].aborted).toBe(true)
  })

  it('initializes a previously loaded route module when its page is reached', () => {
    const document = new PageDocument()

    vi.stubGlobal('document', document)

    const setup = vi.fn(() => undefined)

    bindPageLifecycle('terminal', setup)

    expect(setup).not.toHaveBeenCalled()

    document.swap('terminal')

    expect(setup).toHaveBeenCalledTimes(1)
  })

  it('rebinds shared navigation across every page', () => {
    const document = new PageDocument()

    vi.stubGlobal('document', document)

    const setup = vi.fn(() => undefined)

    bindPageLifecycle('*', setup)

    document.swap('gallery')

    expect(setup).toHaveBeenCalledTimes(2)
  })
})
