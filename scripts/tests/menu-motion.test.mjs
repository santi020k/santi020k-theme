import { afterEach, describe, expect, it, vi } from 'vitest'

import { createMenuMotion } from '../../apps/website/src/utils/menu-motion.ts'

const setup = (reduced = false) => {
  vi.stubGlobal('window', { matchMedia: () => ({ matches: reduced }) })

  const animations = []

  const surface = { animate: vi.fn(() => {
    const animation = { cancel: vi.fn(), onfinish: undefined }

    animations.push(animation)

    return animation
  }) }

  return { surface, animations, motion: createMenuMotion(surface, 20) }
}

afterEach(() => vi.unstubAllGlobals())

describe('menu motion', () => {
  it('keeps the surface open until the exit finishes and releases animation styles', () => {
    const { surface, animations, motion } = setup()
    const close = vi.fn()

    motion.play(false, close)

    expect(close).not.toHaveBeenCalled()

    expect(surface.animate.mock.calls[0][1].duration).toBe(180)

    animations[0].onfinish()

    expect(close).toHaveBeenCalledOnce()

    expect(animations[0].cancel).toHaveBeenCalledOnce()
  })

  it('ignores repeated dismissals and cancels an exit when reopening', () => {
    const { animations, motion } = setup()

    motion.play(false)

    motion.play(false)

    expect(animations).toHaveLength(1)

    motion.play(true)

    expect(animations[0].cancel).toHaveBeenCalledOnce()

    expect(animations).toHaveLength(2)
  })

  it('closes immediately without animation for reduced motion', () => {
    const { surface, motion } = setup(true)
    const close = vi.fn()

    motion.play(false, close)

    expect(surface.animate).not.toHaveBeenCalled()

    expect(close).toHaveBeenCalledOnce()
  })

  it('removes pending motion when a page is disposed', () => {
    const { animations, motion } = setup()

    motion.play(true)

    motion.cancel()

    expect(animations[0].cancel).toHaveBeenCalledOnce()
  })
})
