import { getSiteUrls, SITE_URLS } from '@santi020k/theme/site'
import { describe, expect, it } from 'vitest'

describe('website environment URLs', () => {
  it('uses public domains by default', () => {
    expect(getSiteUrls()).toBe(SITE_URLS.production)

    expect(getSiteUrls().hub).toBe('https://theme.santi020k.com/')
  })

  it('uses one local site with product routes in development', () => {
    expect(getSiteUrls(true)).toEqual({
      hub: 'http://127.0.0.1:4174/',
      vscode: 'http://127.0.0.1:4174/vscode/',
      chrome: 'http://127.0.0.1:4174/chrome/',
      codex: 'http://127.0.0.1:4174/codex/',
      terminal: 'http://127.0.0.1:4174/terminal/',
      zed: 'http://127.0.0.1:4174/zed/',
      raycast: 'http://127.0.0.1:4174/raycast/',
      slack: 'http://127.0.0.1:4174/slack/',
      jetbrains: 'http://127.0.0.1:4174/jetbrains/',
      xcode: 'http://127.0.0.1:4174/xcode/'
    })
  })
})
