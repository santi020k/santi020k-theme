import { downloadHref, exportProfiles, resolutions } from '../../../../artwork/wallpaper-catalog.mjs'
import { bindPageLifecycle } from '../utils/page-lifecycle'

const readControls = (form: HTMLFormElement) => {
  const appearance = form.querySelector<HTMLSelectElement>('[name="appearance"]')
  const device = form.querySelector<HTMLSelectElement>('[name="device"]')
  const resolution = form.querySelector<HTMLSelectElement>('[name="resolution"]')
  const profile = form.querySelector<HTMLSelectElement>('[name="profile"]')
  const download = form.querySelector<HTMLAnchorElement>('[data-wallpaper-download]')

  if (!appearance || !device || !resolution || !profile || !download) return

  return { appearance, device, resolution, profile, download }
}

const syncResolution = (select: HTMLSelectElement, device: string) => {
  for (const option of select.options) {
    option.disabled = option.dataset.device !== device

    option.hidden = option.disabled
  }

  if (!resolutions.some(size => size.id === select.value && size.device === device)) {
    select.value = device === 'mobile' ? '1170x2532' : '2560x1440'
  }
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

bindPageLifecycle('hub', signal => {
  const root = document.querySelector<HTMLElement>('[data-wallpaper-design]')
  const form = root?.querySelector<HTMLFormElement>('[data-wallpaper-form]')
  const slug = root?.dataset.wallpaperDesign

  if (!root || !form || !slug) return

  const controls = readControls(form)

  if (!controls) return

  const { appearance, device, resolution, profile, download } = controls

  const update = () => {
    syncResolution(resolution, device.value)

    const href = downloadHref(slug, appearance.value, resolution.value, profile.value)
    const size = resolutions.find(item => item.id === resolution.value)
    const format = exportProfiles.find(item => item.id === profile.value)

    if (!href || !size || !format) return

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
})
