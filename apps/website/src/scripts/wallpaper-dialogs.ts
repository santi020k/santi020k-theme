import { bindPageLifecycle } from '../utils/page-lifecycle'

/** Preserve normal new-tab gestures and the native link fallback. */
const shouldOpenWallpaperDialog = (event: MouseEvent): boolean => !event.defaultPrevented && event.button === 0 &&
  !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey

bindPageLifecycle('hub', signal => {
  const pathname = window.location.pathname
  const previews = new Map<string, { dialog: HTMLDialogElement, link: HTMLAnchorElement }>()

  const previewUrl = (slug?: string) => {
    const url = new URL(window.location.href)

    if (slug) url.searchParams.set('wallpaper', slug)
    else url.searchParams.delete('wallpaper')

    return url
  }

  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-wallpaper-dialog]')) {
    const id = link.dataset.wallpaperDialog
    const slug = link.dataset.wallpaperSlug
    const dialog = id ? document.getElementById(id) : null

    if (!slug || !(dialog instanceof HTMLDialogElement)) continue

    previews.set(slug, { dialog, link })

    link.setAttribute('aria-haspopup', 'dialog')

    link.addEventListener('click', event => {
      if (!shouldOpenWallpaperDialog(event) || dialog.open) return

      event.preventDefault()

      dialog.showModal()

      // Keep Astro's scroll and navigation state; a preview is part of this page.
      window.history.replaceState(window.history.state, '', previewUrl(slug))
    }, { signal })

    dialog.addEventListener('close', () => {
      // Native close events are queued: ignore one if this preview already reopened.
      if (dialog.open || window.location.pathname !== pathname) return

      if (new URL(window.location.href).searchParams.get('wallpaper') === slug) {
        window.history.replaceState(window.history.state, '', previewUrl())
      }

      const anotherPreviewOpen = [...previews.values()].some(preview => preview.dialog.open)

      if (!anotherPreviewOpen && link.isConnected && link.getClientRects().length) {
        link.focus({ preventScroll: true })
      }
    }, { signal })
  }

  if (!previews.size) return

  const restorePreview = () => {
    if (window.location.pathname !== pathname) return

    const slug = new URL(window.location.href).searchParams.get('wallpaper')
    const selected = slug ? previews.get(slug) : undefined

    for (const preview of previews.values()) {
      if (preview !== selected && preview.dialog.open) preview.dialog.close()
    }

    if (selected && !selected.dialog.open) selected.dialog.showModal()

    for (const [name, { dialog }] of previews) {
      const share = dialog.querySelector<HTMLElement>('[data-wallpaper-share]')

      if (share) share.dataset.copyValue = previewUrl(name).href
    }
  }

  window.addEventListener('popstate', restorePreview, { signal })

  restorePreview()

  return () => {
    for (const { dialog } of previews.values()) {
      if (dialog.open) dialog.close()
    }
  }
})
