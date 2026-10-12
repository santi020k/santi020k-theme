import { afterEach, describe, expect, it, vi } from 'vitest'

import { downloadHref } from '../../artwork/wallpaper-catalog.mjs'

const { lifecycle } = vi.hoisted(() => ({ lifecycle: vi.fn() }))

vi.mock('../../apps/website/src/utils/page-lifecycle', () => ({ bindPageLifecycle: lifecycle }))

await import('../../apps/website/src/scripts/wallpaper-downloads.ts')

const initialize = lifecycle.mock.calls[0][1]

const workspace = slug => {
  const controls = {
    appearance: { value: 'dark' }, device: { value: 'desktop' },
    'desktop-resolution': { value: '2560x1440' },
    'mobile-resolution': { value: '1170x2532' },
    profile: { value: 'webp-high' }
  }

  const download = { href: '', download: '' }
  const caption = { textContent: '' }
  const selection = { textContent: '' }
  const previews = ['dark', 'light'].flatMap(appearance => ['desktop', 'mobile'].map(device => ({ dataset: { appearance, device }, hidden: false })))
  const fields = ['desktop', 'mobile'].map(device => ({ dataset: { wallpaperResolution: device }, hidden: device === 'mobile' }))

  const form = Object.assign(new EventTarget(), {
    querySelector: selector => selector === '[data-wallpaper-download]' ? download : controls[selector.match(/name="([\w-]+)"/u)?.[1]],
    querySelectorAll: () => fields
  })

  const root = {
    dataset: { wallpaperDesign: slug },
    querySelector: selector => ({ '[data-wallpaper-form]': form, '[data-wallpaper-caption]': caption, '[data-wallpaper-selection]': selection })[selector],
    querySelectorAll: () => previews
  }

  return { root, form, controls, download, caption, selection, previews, fields }
}

afterEach(() => vi.unstubAllGlobals())

describe('wallpaper download workspaces', () => {
  it('updates the selected design only, with valid phone sizes and a matching preview and download', () => {
    const halo = workspace('halo')
    const dune = workspace('dune')
    const controller = new AbortController()

    vi.stubGlobal('document', { querySelectorAll: () => [halo.root, dune.root] })

    initialize(controller.signal)

    halo.controls.device.value = 'mobile'

    halo.controls.appearance.value = 'light'

    halo.controls.profile.value = 'png-lossless'

    halo.form.dispatchEvent(new Event('change'))

    expect(halo.controls['mobile-resolution'].value).toBe('1170x2532')

    expect(halo.download.href).toBe(downloadHref('halo', 'light', '1170x2532', 'png-lossless'))

    expect(halo.caption.textContent).toBe('Light · Phone')

    expect(halo.previews.filter(preview => !preview.hidden).map(preview => preview.dataset)).toEqual([{ appearance: 'light', device: 'mobile' }])

    expect(halo.fields.filter(field => !field.hidden).map(field => field.dataset.wallpaperResolution)).toEqual(['mobile'])

    halo.controls['mobile-resolution'].value = '1080x2340'

    halo.form.dispatchEvent(new Event('change'))

    expect(halo.download.href).toBe(downloadHref('halo', 'light', '1080x2340', 'png-lossless'))

    expect(dune.download.href).toBe(downloadHref('dune', 'dark', '2560x1440', 'webp-high'))

    halo.controls.device.value = 'desktop'

    halo.form.dispatchEvent(new Event('change'))

    expect(halo.controls['desktop-resolution'].value).toBe('2560x1440')

    expect(halo.fields.filter(field => !field.hidden).map(field => field.dataset.wallpaperResolution)).toEqual(['desktop'])

    halo.controls.device.value = 'mobile'

    halo.form.dispatchEvent(new Event('change'))

    expect(halo.controls['mobile-resolution'].value).toBe('1080x2340')

    expect(halo.download.href).toBe(downloadHref('halo', 'light', '1080x2340', 'png-lossless'))

    const event = new Event('submit', { cancelable: true })

    halo.form.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(true)

    const currentHref = halo.download.href

    controller.abort()

    halo.controls.appearance.value = 'dark'

    halo.form.dispatchEvent(new Event('change'))

    expect(halo.download.href).toBe(currentHref)
  })

  it('does not generate a download for an unsupported design', () => {
    const unknown = workspace('missing')

    vi.stubGlobal('document', { querySelectorAll: () => [unknown.root] })

    initialize(new AbortController().signal)

    expect(unknown.download.href).toBe('')
  })
})
