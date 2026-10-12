import { bindPageLifecycle } from '../utils/page-lifecycle'

/** Preserve normal new-tab gestures and the native link fallback. */
const shouldOpenWallpaperDialog = (event: MouseEvent): boolean => !event.defaultPrevented && event.button === 0 &&
  !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey

bindPageLifecycle('hub', signal => {
  for (const link of document.querySelectorAll<HTMLAnchorElement>('[data-wallpaper-dialog]')) {
    const id = link.dataset.wallpaperDialog
    const dialog = id ? document.getElementById(id) : null

    if (!(dialog instanceof HTMLDialogElement)) continue

    link.setAttribute('aria-haspopup', 'dialog')

    link.addEventListener('click', event => {
      if (!shouldOpenWallpaperDialog(event) || dialog.open) return

      event.preventDefault()

      dialog.showModal()
    }, { signal })

    dialog.addEventListener('close', () => {
      if (link.isConnected) link.focus({ preventScroll: true })
    }, { signal })
  }

  return () => {
    for (const dialog of document.querySelectorAll<HTMLDialogElement>('.wallpaper-dialog[open]')) dialog.close()
  }
})
