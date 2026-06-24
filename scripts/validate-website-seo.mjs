import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import sharp from 'sharp'

const sites = [
  {
    app: 'website',
    canonical: 'https://theme.santi020k.com/',
    image: 'https://theme.santi020k.com/og-image.png',
    keyword: 'Themes',
    schemaType: 'CollectionPage',
  },
  {
    app: 'vscode-website',
    canonical: 'https://vscode.santi020k.com/',
    image: 'https://vscode.santi020k.com/og-image.png',
    keyword: 'VS Code Color Theme',
    schemaType: 'SoftwareApplication',
  },
  {
    app: 'chrome-website',
    canonical: 'https://chrome.santi020k.com/',
    image: 'https://chrome.santi020k.com/og-image.png',
    keyword: 'Chrome Browser Theme',
    schemaType: 'SoftwareApplication',
  },
]

const root = resolve(import.meta.dirname, '..')
const errors = []

const attrValue = (tag, attr) => {
  const match = tag.match(new RegExp(`${attr}=(["'])(.*?)\\1`, 'i'))

  return match?.[2] ?? ''
}

const findMeta = (html, attr, value) => {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? []

  return tags.find((tag) => attrValue(tag, attr) === value)
}

const metaContent = (html, attr, value) => {
  const tag = findMeta(html, attr, value)

  return tag ? attrValue(tag, 'content') : ''
}

const linkHref = (html, rel) => {
  const tags = html.match(/<link\b[^>]*>/gi) ?? []
  const tag = tags.find((candidate) => attrValue(candidate, 'rel') === rel)

  return tag ? attrValue(tag, 'href') : ''
}

const titleText = (html) => html.match(/<title>(.*?)<\/title>/is)?.[1].trim() ?? ''

const jsonLdBlocks = (html) =>
  [...html.matchAll(/<script\b[^>]*type=(["'])application\/ld\+json\1[^>]*>(.*?)<\/script>/gis)]
    .map(([, , raw]) => JSON.parse(raw.trim()))

const requireEqual = (site, label, actual, expected) => {
  if (actual !== expected) {
    errors.push(`${site.app}: expected ${label} to be ${expected}, got ${actual || 'missing'}`)
  }
}

const requirePresent = (site, label, actual) => {
  if (!actual) {
    errors.push(`${site.app}: missing ${label}`)
  }
}

for (const site of sites) {
  const htmlPath = resolve(root, 'apps', site.app, 'index.html')
  const html = await readFile(htmlPath, 'utf8')
  const title = titleText(html)

  requirePresent(site, 'title', title)

  if (!title.includes(site.keyword)) {
    errors.push(`${site.app}: title should include "${site.keyword}"`)
  }

  requirePresent(site, 'meta description', metaContent(html, 'name', 'description'))

  requireEqual(site, 'canonical URL', linkHref(html, 'canonical'), site.canonical)

  requireEqual(site, 'robots', metaContent(html, 'name', 'robots'), 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1')

  requireEqual(site, 'og:type', metaContent(html, 'property', 'og:type'), 'website')

  requireEqual(site, 'og:url', metaContent(html, 'property', 'og:url'), site.canonical)

  requirePresent(site, 'og:site_name', metaContent(html, 'property', 'og:site_name'))

  requireEqual(site, 'og:locale', metaContent(html, 'property', 'og:locale'), 'en_US')

  requirePresent(site, 'og:title', metaContent(html, 'property', 'og:title'))

  requirePresent(site, 'og:description', metaContent(html, 'property', 'og:description'))

  requireEqual(site, 'og:image', metaContent(html, 'property', 'og:image'), site.image)

  requireEqual(site, 'og:image:width', metaContent(html, 'property', 'og:image:width'), '1200')

  requireEqual(site, 'og:image:height', metaContent(html, 'property', 'og:image:height'), '630')

  requirePresent(site, 'og:image:alt', metaContent(html, 'property', 'og:image:alt'))

  requireEqual(site, 'twitter:card', metaContent(html, 'name', 'twitter:card'), 'summary_large_image')

  requireEqual(site, 'twitter:site', metaContent(html, 'name', 'twitter:site'), '@santi020k')

  requireEqual(site, 'twitter:creator', metaContent(html, 'name', 'twitter:creator'), '@santi020k')

  requireEqual(site, 'twitter:url', metaContent(html, 'name', 'twitter:url'), site.canonical)

  requirePresent(site, 'twitter:title', metaContent(html, 'name', 'twitter:title'))

  requirePresent(site, 'twitter:description', metaContent(html, 'name', 'twitter:description'))

  requireEqual(site, 'twitter:image', metaContent(html, 'name', 'twitter:image'), site.image)

  requirePresent(site, 'twitter:image:alt', metaContent(html, 'name', 'twitter:image:alt'))

  const schemas = jsonLdBlocks(html)

  if (!schemas.some((schema) => schema['@type'] === site.schemaType)) {
    errors.push(`${site.app}: missing JSON-LD ${site.schemaType}`)
  }

  const imagePath = resolve(root, 'apps', site.app, 'public', 'og-image.png')
  const metadata = await sharp(imagePath).metadata()

  if (metadata.width !== 1200 || metadata.height !== 630) {
    errors.push(`${site.app}: og-image.png should be 1200x630, got ${metadata.width}x${metadata.height}`)
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))

  process.exit(1)
}

console.log(`Validated SEO and Open Graph metadata for ${sites.length} websites.`)
