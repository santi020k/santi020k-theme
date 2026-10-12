/** Bind each document once and dispose global listeners before Astro swaps it. */
export const bindPageLifecycle = (page: string, setup: (signal: AbortSignal) => undefined | (() => void)): void => {
  let boundBody: HTMLElement | undefined
  let dispose: (() => void) | undefined

  const initialize = () => {
    if (document.readyState === 'loading' || boundBody === document.body) return

    if (page !== '*' && document.querySelector('meta[name="theme-page"]')?.getAttribute('content') !== page) return

    boundBody = document.body

    const controller = new AbortController()
    const cleanup = setup(controller.signal)

    dispose = () => {
      controller.abort()

      cleanup?.()
    }
  }

  document.addEventListener('astro:before-swap', () => {
    dispose?.()

    dispose = undefined

    boundBody = undefined
  })

  document.addEventListener('DOMContentLoaded', initialize, { once: true })
  document.addEventListener('astro:page-load', initialize)

  initialize()
}
