import { downloadHref, exportProfiles, resolutions } from '../../../../artwork/wallpaper-catalog.mjs'
import { bindPageLifecycle } from '../utils/page-lifecycle'

const readControls = (form: HTMLFormElement) => {
  const appearance = form.querySelector<HTMLSelectElement>('[name="appearance"]')
  const device = form.querySelector<HTMLSelectElement>('[name="device"]')
  const desktopResolution = form.querySelector<HTMLSelectElement>('[name="desktop-resolution"]')
  const mobileResolution = form.querySelector<HTMLSelectElement>('[name="mobile-resolution"]')
  const profile = form.querySelector<HTMLSelectElement>('[name="profile"]')
  const download = form.querySelector<HTMLAnchorElement>('[data-wallpaper-download]')

  if (!appearance || !device || !desktopResolution || !mobileResolution || !profile || !download) return

  return { appearance, device, desktopResolution, mobileResolution, profile, download }
}

const updatePreview = (root: HTMLElement, appearance: string, device: string, description: string) => {
  const label = `${appearance === 'dark' ? 'Dark' : 'Light'} · ${device === 'mobile' ? 'Phone' : 'Desktop'}`
  const selection = root.querySelector<HTMLElement>('[data-wallpaper-selection]')
  const caption = root.querySelector<HTMLElement>('[data-wallpaper-caption]')

  if (selection) selection.textContent = `${label} · ${description}`

  if (caption) caption.textContent = label

  for (const preview of root.querySelectorAll<HTMLImageElement>('[data-wallpaper-preview]')) {
    preview.hidden = preview.dataset.appearance !== appearance || preview.dataset.device !== device
  }
}

const bindWallpaper = (root: HTMLElement, signal: AbortSignal) => {
  const form = root.querySelector<HTMLFormElement>('[data-wallpaper-form]')
  const slug = root.dataset.wallpaperDesign

  if (!form || !slug) return

  const controls = readControls(form)

  if (!controls) return

  const { appearance, device, desktopResolution, mobileResolution, profile, download } = controls

  const update = () => {
    const resolution = device.value === 'mobile' ? mobileResolution : desktopResolution

    for (const field of form.querySelectorAll<HTMLElement>('[data-wallpaper-resolution]')) {
      field.hidden = field.dataset.wallpaperResolution !== device.value
    }

    const href = downloadHref(slug, appearance.value, resolution.value, profile.value)
    const size = resolutions.find(item => item.id === resolution.value)
    const format = exportProfiles.find(item => item.id === profile.value)

    if (!href || size?.device !== device.value || !format) return

    download.href = href

    download.download = href.slice(href.lastIndexOf('/') + 1)

    updatePreview(root, appearance.value, device.value, `${size.width} × ${size.height} · ${format.label}`)
  }

  form.addEventListener('change', update, { signal })

  form.addEventListener('submit', event => {
    event.preventDefault()
  }, { signal })

  update()

  return undefined
}

bindPageLifecycle('hub', signal => {
  for (const root of document.querySelectorAll<HTMLElement>('[data-wallpaper-design]')) bindWallpaper(root, signal)

  return undefined
})
