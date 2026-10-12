import { expect, it } from 'vitest'

import { websiteLinkText } from '../lib/website-link-text.mjs'

it('preserves a download URL split across syntax-highlighting spans', () => {
  const html = '<pre>curl https://theme.santi020k.com/terminal/starship/santi020k<span class="token">-dark</span>.toml</pre>'

  expect(websiteLinkText(html)).toContain('https://theme.santi020k.com/terminal/starship/santi020k-dark.toml')
})

it('separates adjacent block and sitemap content', () => {
  expect(websiteLinkText('<loc>https://example.com/a/</loc><changefreq>monthly</changefreq>')).toBe(' https://example.com/a/  monthly ')
})
