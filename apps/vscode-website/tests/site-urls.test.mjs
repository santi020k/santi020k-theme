import { getSiteUrls, SITE_URLS } from '@santi020k/theme/site'
import { describe, expect, it } from 'vitest'

describe('website environment URLs', () => {
  it('uses public domains by default', () => {
    expect(getSiteUrls()).toBe(SITE_URLS.production)

    expect(getSiteUrls().hub).toBe('https://theme.santi020k.com/')
  })

  it('uses distinct local ports in development', () => {
    expect(getSiteUrls(true)).toEqual({
      hub: 'http://127.0.0.1:4174/',
      vscode: 'http://127.0.0.1:4176/',
      chrome: 'http://127.0.0.1:4175/',
      terminal: 'http://127.0.0.1:4177/'
    })
  })
})
