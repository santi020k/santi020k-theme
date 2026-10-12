/** Keep the native surface open until its exit finishes; cancel stale completions. */
export const createMenuMotion = (surface: HTMLElement, distance: number) => {
  let animation: Animation | undefined
  let closing = false

  const cancel = () => {
    animation?.cancel()

    animation = undefined

    closing = false
  }

  const play = (opening: boolean, finish?: () => void) => {
    if (!opening && closing) return

    cancel()

    closing = !opening

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || typeof surface.animate !== 'function') {
      closing = false

      finish?.()

      return
    }

    const hidden = { opacity: 0, transform: `translateY(${distance}px)` }
    const visible = { opacity: 1, transform: 'translateY(0)' }

    animation = surface.animate(opening ? [hidden, visible] : [visible, hidden], {
      duration: opening ? 260 : 180,
      easing: opening ? 'cubic-bezier(.22, 1, .36, 1)' : 'cubic-bezier(.4, 0, 1, 1)',
      fill: 'both'
    })

    animation.onfinish = () => {
      cancel()

      finish?.()
    }
  }

  return { play, cancel }
}
