import { afterEach, describe, expect, it, vi } from 'vitest'

const { lifecycle } = vi.hoisted(() => ({ lifecycle: vi.fn() }))

vi.mock('../../apps/website/src/utils/page-lifecycle', () => ({ bindPageLifecycle: lifecycle }))

await import('../../apps/website/src/scripts/wallpaper-dialogs.ts')

const initialize = lifecycle.mock.calls[0][1]

class Dialog extends EventTarget {
  open = false
  share = { dataset: {} }
  querySelector = () => this.share
  showModal = vi.fn(() => { this.open = true })
  close = vi.fn(() => {
    this.open = false

    // Browsers deliver close after the current task, including after URL restoration.
    queueMicrotask(() => this.dispatchEvent(new Event('close')))
  })
}

const setup = ({ missing = false, url = 'https://theme.example/gallery/' } = {}) => {
  const entries = ['halo', 'tide', 'studio', 'orbit'].map(slug => ({
    slug,
    link: Object.assign(new EventTarget(), {
      dataset: ['studio', 'orbit'].includes(slug) ? { bannerDialog: `banner-dialog-${slug}`, bannerSlug: slug } : { wallpaperDialog: `wallpaper-dialog-${slug}`, wallpaperSlug: slug },
      setAttribute: vi.fn(), focus: vi.fn(), isConnected: true, getClientRects: () => [{}]
    }),
    dialog: new Dialog()
  }))

  const controller = new AbortController()

  const browser = Object.assign(new EventTarget(), {
    location: new URL(url),
    history: {
      state: { index: 3, scrollY: 500, scrollX: 0 },
      replaceState: vi.fn((_state, _title, target) => { browser.location = new URL(target) })
    }
  })

  vi.stubGlobal('window', browser)

  vi.stubGlobal('HTMLDialogElement', Dialog)

  vi.stubGlobal('document', {
    querySelectorAll: () => entries.map(entry => entry.link),
    getElementById: id => missing ? null : entries.find(entry => (entry.link.dataset.wallpaperDialog ?? entry.link.dataset.bannerDialog) === id)?.dialog
  })

  const cleanup = initialize(controller.signal)
  const { link, dialog } = entries[0]

  const click = (properties = {}) => {
    const event = new Event('click', { cancelable: true })

    Object.assign(event, { button: 0, metaKey: false, ctrlKey: false, altKey: false, shiftKey: false }, properties)

    link.dispatchEvent(event)

    return event
  }

  const restore = target => {
    browser.location = new URL(target, browser.location)

    browser.dispatchEvent(new Event('popstate'))
  }

  return { click, cleanup, controller, dialog, link, browser, entries, restore }
}

afterEach(() => vi.unstubAllGlobals())

describe('wallpaper preview navigation', () => {
  it('shares ordinary activation without losing unrelated URL or Astro history state', async () => {
    const { click, dialog, link, browser } = setup({ url: 'https://theme.example/gallery/?collection=minimal#wallpapers' })
    const state = browser.history.state

    expect(click().defaultPrevented).toBe(true)

    expect(dialog.open).toBe(true)

    expect(link.setAttribute).toHaveBeenCalledWith('aria-haspopup', 'dialog')

    expect(browser.location.href).toBe('https://theme.example/gallery/?collection=minimal&wallpaper=halo#wallpapers')

    expect(browser.history.replaceState.mock.calls[0][0]).toBe(state)

    expect(dialog.share.dataset.copyValue).toBe(browser.location.href)

    dialog.close()

    await Promise.resolve()

    expect(link.focus).toHaveBeenCalledWith({ preventScroll: true })

    expect(browser.location.href).toBe('https://theme.example/gallery/?collection=minimal#wallpapers')
  })

  it.each([{ metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }])('preserves native modified navigation: %j', gesture => {
    const { click, dialog, browser } = setup()

    expect(click(gesture).defaultPrevented).toBe(false)

    expect(dialog.showModal).not.toHaveBeenCalled()

    expect(browser.history.replaceState).not.toHaveBeenCalled()
  })

  it('keeps the page link usable if its modal is unavailable', () => {
    const { click, link } = setup({ missing: true })

    expect(click().defaultPrevented).toBe(false)

    expect(link.setAttribute).not.toHaveBeenCalled()
  })

  it('opens an existing shared URL on arrival or reload and copies the current origin', () => {
    const { dialog, browser } = setup({ url: 'http://127.0.0.1:4321/gallery/?wallpaper=halo' })

    expect(dialog.open).toBe(true)

    expect(dialog.share.dataset.copyValue).toBe(browser.location.href)

    expect(browser.history.replaceState).not.toHaveBeenCalled()
  })

  it.each(['unknown', encodeURIComponent('<script>'), ''])('ignores unknown preview values without rewriting the URL: %s', slug => {
    const { entries, browser } = setup({ url: `https://theme.example/gallery/?wallpaper=${slug}` })

    expect(entries.every(entry => !entry.dialog.open)).toBe(true)

    expect(browser.history.replaceState).not.toHaveBeenCalled()
  })

  it('restores a different preview from history without closing it or stealing its focus', async () => {
    const { dialog, link, entries, restore, browser } = setup({ url: 'https://theme.example/gallery/?wallpaper=halo' })

    restore('?wallpaper=tide')

    await Promise.resolve()

    expect(dialog.open).toBe(false)

    expect(entries[1].dialog.open).toBe(true)

    expect(link.focus).not.toHaveBeenCalled()

    expect(browser.location.search).toBe('?wallpaper=tide')

    expect(browser.history.replaceState).not.toHaveBeenCalled()
  })

  it('closes a restored preview when history no longer selects a wallpaper', async () => {
    const { dialog, link, restore, browser } = setup({ url: 'https://theme.example/gallery/?wallpaper=halo' })

    restore('/gallery/')

    await Promise.resolve()

    expect(dialog.open).toBe(false)

    expect(link.focus).toHaveBeenCalledWith({ preventScroll: true })

    expect(browser.history.replaceState).not.toHaveBeenCalled()
  })

  it('ignores a queued close event if the preview has already reopened', async () => {
    const { dialog, link, click, browser } = setup({ url: 'https://theme.example/gallery/?wallpaper=halo' })

    dialog.close()

    click()

    await Promise.resolve()

    expect(dialog.open).toBe(true)

    expect(browser.location.search).toBe('?wallpaper=halo')

    expect(link.focus).not.toHaveBeenCalled()
  })

  it('does not rewrite another route while a close is pending', async () => {
    const { dialog, browser, restore, link } = setup({ url: 'https://theme.example/gallery/?wallpaper=halo' })

    dialog.close()

    restore('/support/?wallpaper=halo')

    await Promise.resolve()

    expect(browser.location.pathname).toBe('/support/')

    expect(browser.history.replaceState).not.toHaveBeenCalled()

    expect(link.focus).not.toHaveBeenCalled()
  })

  it('closes overlays and removes listeners before Astro swaps routes', async () => {
    const { click, cleanup, controller, dialog, link, browser, restore } = setup()

    click()

    controller.abort()

    cleanup()

    await Promise.resolve()

    restore('/gallery/?wallpaper=tide')

    expect(dialog.open).toBe(false)

    expect(link.focus).not.toHaveBeenCalled()

    expect(click().defaultPrevented).toBe(false)

    expect(dialog.showModal).toHaveBeenCalledTimes(1)

    expect(browser.history.replaceState).toHaveBeenCalledTimes(1)
  })
})


describe('banner preview navigation', () => {
  it('restores a banner and shares its own URL without altering wallpaper links', async () => {
    const { entries, browser } = setup({ url: 'https://theme.example/gallery/?banner=studio' })
    const { dialog, link } = entries[2]

    expect(dialog.open).toBe(true)

    expect(dialog.share.dataset.copyValue).toBe(browser.location.href)

    expect(entries[0].dialog.open).toBe(false)

    dialog.close()

    await Promise.resolve()

    expect(browser.location.search).toBe('')

    expect(link.focus).toHaveBeenCalledWith({ preventScroll: true })
  })

  it('restores history across artwork kinds without leaving a second modal open', async () => {
    const { entries, restore } = setup({ url: 'https://theme.example/gallery/?wallpaper=halo' })

    restore('?banner=orbit')

    await Promise.resolve()

    expect(entries.map(entry => entry.dialog.open)).toEqual([false, false, false, true])

    expect(entries[0].link.focus).not.toHaveBeenCalled()

    restore('?wallpaper=tide')

    await Promise.resolve()

    expect(entries.map(entry => entry.dialog.open)).toEqual([false, true, false, false])
  })
})
