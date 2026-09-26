import { defineAuditConfig } from '@santi020k/og/audit/config'
import { standardAuditRules } from '@santi020k/og/audit/rules'

const siteUrl = 'https://theme.santi020k.com'

const expectations = new Map([
  ['/', { image: '/og-image.png', keyword: 'Themes', schema: 'CollectionPage' }],
  ['/gallery/', { image: '/og-image.png', keyword: 'Gallery', schema: 'CollectionPage' }],
  ['/vscode/', { image: '/vscode/og-image.png', keyword: 'VS Code', schema: 'SoftwareApplication' }],
  ['/chrome/', { image: '/chrome/og-image.png', keyword: 'Chrome', schema: 'SoftwareApplication' }],
  ['/zed/', { image: '/zed/og-image.png', keyword: 'Zed', schema: 'SoftwareApplication' }],
  ['/codex/', { image: '/codex/og-image.png', keyword: 'Codex', schema: 'SoftwareApplication' }],
  ['/raycast/', { image: '/og-image.png', keyword: 'Raycast', schema: 'SoftwareApplication' }],
  ['/slack/', { image: '/og-image.png', keyword: 'Slack', schema: 'SoftwareApplication' }],
  ['/jetbrains/', { image: '/og-image.png', keyword: 'JetBrains', schema: 'SoftwareApplication' }],
  ['/xcode/', { image: '/og-image.png', keyword: 'Xcode', schema: 'SoftwareApplication' }],
  ['/terminal/', { image: '/terminal/og-image.png', keyword: 'Terminal', schema: 'CollectionPage' }],
  ['/terminal/configure/', { image: '/terminal/og-image.png', keyword: 'Configure', schema: 'WebApplication' }],
  ['/terminal/docs/', { image: '/terminal/og-image.png', keyword: 'Getting started', schema: 'TechArticle' }],
  ['/terminal/docs/zsh/', { image: '/terminal/og-image.png', keyword: 'Zsh', schema: 'TechArticle' }],
  ['/terminal/docs/shells/', { image: '/terminal/og-image.png', keyword: 'Bash and Fish', schema: 'TechArticle' }],
  ['/terminal/docs/starship/', { image: '/terminal/og-image.png', keyword: 'Starship', schema: 'TechArticle' }],
  ['/terminal/docs/terminal-colors/', { image: '/terminal/og-image.png', keyword: 'Terminal colors', schema: 'TechArticle' }],
  ['/terminal/docs/cli/', { image: '/terminal/og-image.png', keyword: 'CLI', schema: 'TechArticle' }]
])

const productContracts = ({ page }) => {
  const expected = expectations.get(page.route)

  if (!expected) return []

  const issues = []

  const add = (code, message) => issues.push({
    code,
    file: page.file,
    message,
    route: page.route,
    severity: 'error'
  })

  if (!page.title?.toLowerCase().includes(expected.keyword.toLowerCase())) {
    add('missing-product-keyword', `Title must include ${expected.keyword}.`)
  }

  if (!page.schemaTypes.includes(expected.schema)) {
    add('missing-product-schema', `JSON-LD is missing required @type ${expected.schema}.`)
  }

  const expectedImage = new URL(expected.image, siteUrl).href

  if (page.image !== expectedImage) {
    add('unexpected-product-image', `Expected social image ${expectedImage}, received ${page.image ?? 'missing'}.`)
  }

  return issues
}

export default defineAuditConfig({
  directory: 'apps/website/dist',
  maxImageBytes: 5_000_000,
  root: import.meta.dirname,
  rules: [productContracts],
  siteUrl,
  ...standardAuditRules({
    alternates: false,
    redirects: false,
    robots: { expectedSitemaps: [new URL('/sitemap.xml', siteUrl).href] },
    sitemap: { reportOrphans: true, severity: 'error' }
  })
})
