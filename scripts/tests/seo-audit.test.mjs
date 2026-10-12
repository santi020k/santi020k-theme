import { describe, expect, it } from 'vitest'

import { socialPreviewHref } from '../../artwork/wallpaper-catalog.mjs'
import config from '../../og.audit.config.mjs'

const page = {
  alternates: [],
  canonical: 'https://theme.santi020k.com/terminal/docs/zsh/',
  description: 'Configure Zsh shell tools with the Santi020k terminal setup.',
  file: 'terminal/docs/zsh/index.html',
  image: 'https://theme.santi020k.com/terminal/og-zsh.png',
  indexable: true,
  route: '/terminal/docs/zsh/',
  schemaTypes: ['TechArticle', 'BreadcrumbList'],
  title: 'Zsh setup — Santi020k Terminal docs'
}

const audit = overrides => config.rules.flatMap(rule => rule({ directory: 'dist', page: { ...page, ...overrides } }))

describe('page SEO contracts', () => {
  it('accepts page-specific documentation metadata', () => {
    expect(audit({})).toEqual([])
  })

  it('requires structured documentation breadcrumbs and the correct social card', () => {
    const issues = audit({ image: 'https://theme.santi020k.com/terminal/og-image.png', schemaTypes: ['TechArticle'] })

    expect(issues.map(issue => issue.code)).toEqual(['missing-docs-breadcrumb', 'unexpected-product-image'])
  })

  it('requires an explicit contract for newly added routes', () => {
    expect(audit({ route: '/new/' }).map(issue => issue.code)).toEqual(['missing-route-contract'])
  })

  it('checks dynamic wallpaper titles, images, and image schema', () => {
    expect(audit({ route: '/gallery/halo/', title: 'Halo Wallpaper', image: `https://theme.santi020k.com${socialPreviewHref('halo')}`, schemaTypes: ['WebPage', 'ImageObject'] })).toEqual([])

    expect(audit({ route: '/gallery/halo/' }).map(issue => issue.code)).toEqual(['missing-product-keyword', 'missing-product-schema', 'unexpected-product-image'])
  })
})
