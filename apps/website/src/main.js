import './styles.css'

import {
  bindPreferredSiteThemeSync,
  bindSiteNavigation,
  SITE_HUB_DESKTOP_NAV_QUERY,
  syncSiteThemeToggle
} from '@santi020k/theme/site'

const toggle = document.querySelector('.theme-toggle')
const header = document.querySelector('.site-header')
const navToggle = document.querySelector('.nav-toggle')
const navLinks = document.querySelectorAll('.nav-links a')
const desktopNavQuery = window.matchMedia(SITE_HUB_DESKTOP_NAV_QUERY)

syncSiteThemeToggle(toggle)

if (toggle) {
  toggle.addEventListener('ui:theme-change', () => syncSiteThemeToggle(toggle))
}

bindSiteNavigation({
  desktopNavQuery,
  header,
  navLinks,
  navToggle
})

bindPreferredSiteThemeSync({
  onThemeChange: () => syncSiteThemeToggle(toggle)
})

const filterButtons = document.querySelectorAll('[data-filter]')
const assetCards = document.querySelectorAll('[data-category]')
const galleryCount = document.querySelector('[data-gallery-count]')

for (const button of filterButtons) {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter
    let visibleCount = 0

    for (const item of filterButtons) item.setAttribute('aria-pressed', String(item === button))

    for (const card of assetCards) {
      const visible = selectedFilter === 'all' || card.dataset.category === selectedFilter

      card.hidden = !visible

      if (visible) visibleCount += 1
    }

    if (galleryCount) galleryCount.textContent = String(visibleCount)
  })
}

const assetDialog = document.querySelector('.asset-dialog')
const dialogImage = assetDialog?.querySelector('img')
const dialogTitle = assetDialog?.querySelector('h2')

for (const previewButton of document.querySelectorAll('[data-preview-src]')) {
  previewButton.addEventListener('click', () => {
    if (!assetDialog || !dialogImage || !dialogTitle) return

    dialogImage.src = previewButton.dataset.previewSrc

    dialogImage.alt = previewButton.dataset.previewAlt

    dialogTitle.textContent = previewButton.dataset.previewTitle

    assetDialog.showModal()
  })
}

assetDialog?.querySelector('.dialog-close')?.addEventListener('click', () => assetDialog.close())

assetDialog?.addEventListener('click', event => {
  if (event.target === assetDialog) assetDialog.close()
})

const backToTop = document.querySelector('.back-to-top')

if (backToTop) {
  const toggleBackToTop = () => backToTop.classList.toggle('is-visible', window.scrollY > 600)

  toggleBackToTop()

  window.addEventListener('scroll', toggleBackToTop, { passive: true })

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}
