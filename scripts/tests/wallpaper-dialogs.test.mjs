import { afterEach, describe, expect, it, vi } from 'vitest'

const { lifecycle } = vi.hoisted(() => ({ lifecycle: vi.fn() }))

vi.mock('../../apps/website/src/utils/page-lifecycle', () => ({ bindPageLifecycle: lifecycle }))

await import('../../apps/website/src/scripts/wallpaper-dialogs.ts')

const initialize = lifecycle.mock.calls[0][1]

class Dialog extends EventTarget {
  open = false
  showModal = vi.fn(() => { this.open = true })
  close = vi.fn(() => {
    this.open = false

    this.dispatchEvent(new Event('close'))
  })
}

const setup = (missing = false) => {
  const link = Object.assign(new EventTarget(), {
    dataset: { wallpaperDialog: 'wallpaper-dialog-halo' },
    setAttribute: vi.fn(), focus: vi.fn(), isConnected: true
  })

  const dialog = new Dialog()
  const controller = new AbortController()

  vi.stubGlobal('HTMLDialogElement', Dialog)

  vi.stubGlobal('document', {
    querySelectorAll: selector => {
      if (selector === '[data-wallpaper-dialog]') return [link]

      return dialog.open ? [dialog] : []
    },
    getElementById: () => missing ? null : dialog
  })

  const cleanup = initialize(controller.signal)

  const click = (properties = {}) => {
    const event = new Event('click', { cancelable: true })

    Object.assign(event, { button: 0, metaKey: false, ctrlKey: false, altKey: false, shiftKey: false }, properties)

    link.dispatchEvent(event)

    return event
  }

  return { click, cleanup, controller, dialog, link }
}

afterEach(() => vi.unstubAllGlobals())

describe('wallpaper preview navigation', () => {
  it('opens a modal on ordinary activation and restores focus when dismissed', () => {
    const { click, dialog, link } = setup()

    expect(click().defaultPrevented).toBe(true)

    expect(dialog.open).toBe(true)

    expect(link.setAttribute).toHaveBeenCalledWith('aria-haspopup', 'dialog')

    dialog.close()

    expect(link.focus).toHaveBeenCalledWith({ preventScroll: true })
  })

  it.each([{ metaKey: true }, { ctrlKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }])('preserves native modified navigation: %j', gesture => {
    const { click, dialog } = setup()

    expect(click(gesture).defaultPrevented).toBe(false)

    expect(dialog.showModal).not.toHaveBeenCalled()
  })

  it('keeps the page link usable if its modal is unavailable', () => {
    const { click, link } = setup(true)

    expect(click().defaultPrevented).toBe(false)

    expect(link.setAttribute).not.toHaveBeenCalled()
  })

  it('closes overlays and removes listeners when the route is disposed', () => {
    const { click, cleanup, controller, dialog, link } = setup()

    click()

    controller.abort()

    cleanup()

    expect(dialog.open).toBe(false)

    expect(link.focus).not.toHaveBeenCalled()

    expect(click().defaultPrevented).toBe(false)

    expect(dialog.showModal).toHaveBeenCalledTimes(1)
  })
})
