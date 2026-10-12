import { bindPageLifecycle } from '../utils/page-lifecycle'

/** Preserve normal new-tab gestures and the native link fallback. */
const shouldOpenPreviewDialog = (event: MouseEvent): boolean => !event.defaultPrevented && event.button === 0 &&
  !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey

bindPageLifecycle('hub', signal => {
  const pathname = window.location.pathname
  const previews = new Map<string, { dialog: HTMLDialogElement, link: HTMLAnchorElement, kind: string, slug: string }>()

  const previewUrl = (kind: string, slug?: string) => {
    const url = new URL(window.location.href)

    url.searchParams.delete('wallpaper')

    url.searchParams.delete('banner')

    if (slug) url.searchParams.set(kind, slug)

    return url
  }

  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-wallpaper-dialog], [data-banner-dialog]')) {
    const kind = link.dataset.bannerDialog ? 'banner' : 'wallpaper'
    const id = link.dataset[`${kind}Dialog`]
    const slug = link.dataset[`${kind}Slug`]
    const dialog = id ? document.getElementById(id) : null

    if (!slug || !(dialog instanceof HTMLDialogElement)) continue

    previews.set(`${kind}:${slug}`, { dialog, link, kind, slug })

    link.setAttribute('aria-haspopup', 'dialog')

    link.addEventListener('click', event => {
      if (!shouldOpenPreviewDialog(event) || dialog.open) return

      event.preventDefault()

      dialog.dispatchEvent(new Event('artwork:preview'))

      dialog.showModal()

      // Keep Astro's scroll and navigation state; a preview is part of this page.
      window.history.replaceState(window.history.state, '', previewUrl(kind, slug))
    }, { signal })

    dialog.addEventListener('close', () => {
      // Native close events are queued: ignore one if this preview already reopened.
      if (dialog.open || window.location.pathname !== pathname) return

      if (new URL(window.location.href).searchParams.get(kind) === slug) {
        window.history.replaceState(window.history.state, '', previewUrl(kind))
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

    const params = new URL(window.location.href).searchParams
    const selected = [...previews.values()].find(preview => params.get(preview.kind) === preview.slug)

    for (const preview of previews.values()) {
      if (preview !== selected && preview.dialog.open) preview.dialog.close()
    }

    if (selected && !selected.dialog.open) selected.dialog.showModal()

    for (const { dialog, kind, slug } of previews.values()) {
      const share = dialog.querySelector<HTMLElement>('[data-wallpaper-share], [data-banner-share]')

      if (share) share.dataset.copyValue = previewUrl(kind, slug).href
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
