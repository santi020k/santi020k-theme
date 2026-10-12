import { rootInDarkMode, syncSiteThemeToggle } from '@santi020k/theme/site'

/** Keep both header controls aligned with explicit and system appearance changes. */
export const bindAppearanceControls = (): (() => void) => {
  const root = document.documentElement
  const controls = document.querySelectorAll<HTMLButtonElement>('.family-theme-toggle, .family-mobile-appearance')

  const sync = () => {
    root.classList.toggle('dark', rootInDarkMode(root))

    for (const control of controls) syncSiteThemeToggle(control, root)
  }

  const observer = new MutationObserver(sync)

  observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })

  sync()

  return () => {
    observer.disconnect()
  }
}
