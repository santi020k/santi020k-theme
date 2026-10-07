/** Keep native section links current without changing URLs or scroll behavior. */
export const bindContextNavigation = (signal: AbortSignal): (() => void) => {
  const navigation = document.querySelector('.family-context-navigation nav')
  const header = document.querySelector('.family-header-stack')

  const entries = Array.from(navigation?.querySelectorAll<HTMLAnchorElement>('a[href]') ?? [])
    .flatMap(link => {
      const url = new URL(link.href, window.location.href)
      const current = window.location

      if (url.origin !== current.origin || url.pathname !== current.pathname || url.search !== current.search) return []

      let section: HTMLElement | null = null

      if (url.hash) {
        try {
          section = document.getElementById(decodeURIComponent(url.hash.slice(1)))
        } catch {
          return []
        }

        if (!section) return []
      }

      return [{ link, hash: url.hash, section }]
    })

  const overview = entries.find(entry => !entry.hash)
  let frame = 0

  const select = (active: typeof overview) => {
    if (!active) return

    for (const entry of entries) {
      if (entry === active) entry.link.setAttribute('aria-current', entry.section ? 'location' : 'page')
      else entry.link.removeAttribute('aria-current')
    }
  }

  const syncPosition = () => {
    frame = 0

    const padding = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
    const boundary = Math.max(header?.getBoundingClientRect().bottom ?? 0, padding)
    let active = overview
    let closestTop = Number.NEGATIVE_INFINITY

    for (const entry of entries) {
      if (!entry.section) continue

      const top = entry.section.getBoundingClientRect().top
      const margin = Number.parseFloat(getComputedStyle(entry.section).scrollMarginTop) || 0

      if (top <= boundary + margin + 1 && top > closestTop) {
        active = entry

        closestTop = top
      }
    }

    select(active)
  }

  const schedulePosition = () => {
    if (!frame) frame = window.requestAnimationFrame(syncPosition)
  }

  const syncHash = () => {
    const active = entries.find(entry => entry.hash === window.location.hash)

    if (active) select(active)
    else schedulePosition()
  }

  for (const entry of entries) {
    entry.link.addEventListener('click', event => {
      const modified = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey

      if (event.defaultPrevented || event.button !== 0 || modified) return

      select(entry)
    }, { signal })
  }

  window.addEventListener('scroll', schedulePosition, { passive: true, signal })

  window.addEventListener('resize', schedulePosition, { signal })

  window.addEventListener('load', schedulePosition, { signal })

  window.addEventListener('hashchange', syncHash, { signal })

  window.addEventListener('popstate', syncHash, { signal })

  syncHash()

  schedulePosition()

  return () => {
    window.cancelAnimationFrame(frame)
  }
}
