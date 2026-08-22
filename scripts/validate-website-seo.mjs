import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import sharp from 'sharp'

const origin = 'https://theme.santi020k.com'
const root = resolve(import.meta.dirname, '..')
const output = resolve(root, 'apps/website/dist')
const robots = 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'

const pages = [
  { route: '/', keyword: 'Themes', schema: 'CollectionPage', image: '/og-image.png' },
  { route: '/gallery/', keyword: 'Gallery', schema: 'CollectionPage', image: '/og-image.png' },
  { route: '/vscode/', keyword: 'VS Code', schema: 'SoftwareApplication', image: '/vscode/og-image.png' },
  { route: '/chrome/', keyword: 'Chrome', schema: 'SoftwareApplication', image: '/chrome/og-image.png' },
  { route: '/zed/', keyword: 'Zed', schema: 'SoftwareApplication', image: '/zed/og-image.png' },
  { route: '/codex/', keyword: 'Codex', schema: 'SoftwareApplication', image: '/codex/og-image.png' },
  { route: '/raycast/', keyword: 'Raycast', schema: 'SoftwareApplication', image: '/og-image.png' },
  { route: '/slack/', keyword: 'Slack', schema: 'SoftwareApplication', image: '/og-image.png' },
  { route: '/jetbrains/', keyword: 'JetBrains', schema: 'SoftwareApplication', image: '/og-image.png' },
  { route: '/xcode/', keyword: 'Xcode', schema: 'SoftwareApplication', image: '/og-image.png' },
  { route: '/terminal/', keyword: 'Terminal', schema: 'CollectionPage', image: '/terminal/og-image.png' },
  { route: '/terminal/configure/', keyword: 'Configure', schema: 'WebApplication', image: '/terminal/og-image.png' },
  { route: '/terminal/docs/', keyword: 'Getting started', schema: 'TechArticle', image: '/terminal/og-image.png' },
  { route: '/terminal/docs/zsh/', keyword: 'Zsh', schema: 'TechArticle', image: '/terminal/og-image.png' },
  { route: '/terminal/docs/shells/', keyword: 'Bash and Fish', schema: 'TechArticle', image: '/terminal/og-image.png' },
  { route: '/terminal/docs/starship/', keyword: 'Starship', schema: 'TechArticle', image: '/terminal/og-image.png' },
  { route: '/terminal/docs/terminal-colors/', keyword: 'Terminal colors', schema: 'TechArticle', image: '/terminal/og-image.png' },
  { route: '/terminal/docs/cli/', keyword: 'CLI', schema: 'TechArticle', image: '/terminal/og-image.png' }
]

const attrValue = (tag, attr) => {
  const attributes = [...tag.matchAll(/\s([^\s=]+)=(["'])(.*?)\2/gu)]

  return attributes.find(([, name]) => name.toLowerCase() === attr.toLowerCase())?.[3] ?? ''
}

const metaContent = (html, attr, value) => {
  const tags = html.match(/<meta\b[^>]*>/giu) ?? []
  const tag = tags.find(candidate => attrValue(candidate, attr) === value)

  return tag ? attrValue(tag, 'content') : ''
}

const linkHref = (html, rel) => {
  const tags = html.match(/<link\b[^>]*>/giu) ?? []
  const tag = tags.find(candidate => attrValue(candidate, 'rel') === rel)

  return tag ? attrValue(tag, 'href') : ''
}

const jsonLdBlocks = html => [...html.matchAll(/<script\b[^>]*type=(["'])application\/ld\+json\1[^>]*>(.*?)<\/script>/gis)]
  .map(([, , raw]) => {
    try {
      return JSON.parse(raw.trim())
    } catch {
      return null
    }
  })
  .filter(Boolean)

const schemaContainsType = (schema, type) => {
  if (Array.isArray(schema)) return schema.some(value => schemaContainsType(value, type))

  if (!schema || typeof schema !== 'object') return false

  return schema['@type'] === type || Object.values(schema).some(value => schemaContainsType(value, type))
}

const errors = []
const checkedImages = new Set()

for (const page of pages) {
  const canonical = `${origin}${page.route}`
  const htmlPath = resolve(output, page.route.slice(1), 'index.html')
  const html = await readFile(htmlPath, 'utf8')
  const title = html.match(/<title>(.*?)<\/title>/isu)?.[1].trim() ?? ''
  const imageUrl = `${origin}${page.image}`

  const equal = (label, actual, expected) => {
    if (actual !== expected) errors.push(`${page.route}: expected ${label} to be ${expected}, got ${actual || 'missing'}`)
  }

  const present = (label, value) => {
    if (!value) errors.push(`${page.route}: missing ${label}`)
  }

  present('title', title)

  if (!title.toLowerCase().includes(page.keyword.toLowerCase())) errors.push(`${page.route}: title should include ${page.keyword}`)

  present('meta description', metaContent(html, 'name', 'description'))

  equal('canonical URL', linkHref(html, 'canonical'), canonical)

  equal('robots', metaContent(html, 'name', 'robots'), robots)

  equal('og:type', metaContent(html, 'property', 'og:type'), 'website')

  equal('og:url', metaContent(html, 'property', 'og:url'), canonical)

  present('og:site_name', metaContent(html, 'property', 'og:site_name'))

  equal('og:locale', metaContent(html, 'property', 'og:locale'), 'en_US')

  present('og:title', metaContent(html, 'property', 'og:title'))

  present('og:description', metaContent(html, 'property', 'og:description'))

  equal('og:image', metaContent(html, 'property', 'og:image'), imageUrl)

  equal('og:image:width', metaContent(html, 'property', 'og:image:width'), '1200')

  equal('og:image:height', metaContent(html, 'property', 'og:image:height'), '630')

  present('og:image:alt', metaContent(html, 'property', 'og:image:alt'))

  equal('twitter:card', metaContent(html, 'name', 'twitter:card'), 'summary_large_image')

  equal('twitter:url', metaContent(html, 'name', 'twitter:url'), canonical)

  equal('twitter:image', metaContent(html, 'name', 'twitter:image'), imageUrl)

  present('twitter:image:alt', metaContent(html, 'name', 'twitter:image:alt'))

  if (!jsonLdBlocks(html).some(schema => schemaContainsType(schema, page.schema))) {
    errors.push(`${page.route}: missing JSON-LD ${page.schema}`)
  }

  if (!checkedImages.has(page.image)) {
    const metadata = await sharp(resolve(output, page.image.slice(1))).metadata()

    if (metadata.width !== 1200 || metadata.height !== 630) {
      errors.push(`${page.image}: expected 1200x630, got ${metadata.width}x${metadata.height}`)
    }

    checkedImages.add(page.image)
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))

  process.exit(1)
}

console.log(`Validated SEO metadata for ${pages.length} consolidated website routes and ${checkedImages.size} social images.`)
