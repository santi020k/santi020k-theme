import { createSitemap } from '../utils/sitemap.mjs'

const pages = import.meta.glob('./**/*.astro')

export const GET = () => new Response(createSitemap(Object.keys(pages).map(path => `/pages/${path.slice(2)}`)), {
  headers: { 'Content-Type': 'application/xml; charset=utf-8' }
})
