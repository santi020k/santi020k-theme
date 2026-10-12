import { bannerDownloadHref, bannerLayouts } from '../../../../artwork/banner-catalog.mjs'
import { exportProfiles } from '../../../../artwork/wallpaper-catalog.mjs'
import { bindPageLifecycle } from '../utils/page-lifecycle'

bindPageLifecycle('hub', signal => {
  for (const root of document.querySelectorAll<HTMLElement>('[data-banner-design]')) {
    const slug = root.dataset.bannerDesign
    const form = root.querySelector<HTMLFormElement>('[data-banner-form]')

    if (!slug || !form) continue

    const appearance = form.querySelector<HTMLSelectElement>('[name="appearance"]')
    const layout = form.querySelector<HTMLSelectElement>('[name="layout"]')
    const profile = form.querySelector<HTMLSelectElement>('[name="profile"]')
    const download = form.querySelector<HTMLAnchorElement>('[data-banner-download]')

    if (!appearance || !layout || !profile || !download) continue

    const update = () => {
      const href = bannerDownloadHref(slug, appearance.value, layout.value, profile.value)
      const size = bannerLayouts.find(item => item.id === layout.value)
      const format = exportProfiles.find(item => item.id === profile.value)

      if (!href || !size || !format) return

      download.href = href

      download.download = href.slice(href.lastIndexOf('/') + 1)

      const label = `${appearance.value === 'dark' ? 'Dark' : 'Light'} · ${size.name}`
      const caption = root.querySelector<HTMLElement>('[data-banner-caption]')
      const selection = root.querySelector<HTMLElement>('[data-banner-selection]')

      if (caption) caption.textContent = label

      if (selection) selection.textContent = `${label} · ${size.width} × ${size.height} · ${format.label}`

      for (const preview of root.querySelectorAll<HTMLImageElement>('[data-banner-preview]')) {
        preview.hidden = preview.dataset.appearance !== appearance.value || preview.dataset.layout !== layout.value
      }
    }

    root.closest('dialog')?.addEventListener('artwork:preview', () => {
      layout.value = document.body.dataset.galleryFilter === 'covers' ? 'square' : 'wide'

      layout.dispatchEvent(new Event('change', { bubbles: true }))
    }, { signal })

    form.addEventListener('change', update, { signal })

    form.addEventListener('submit', event => {
      event.preventDefault()
    }, { signal })

    update()
  }

  return undefined
})
