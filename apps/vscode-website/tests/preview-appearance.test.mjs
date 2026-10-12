// @vitest-environment jsdom
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'

const fixture = `
  <button class="theme-toggle" id="desktop-theme"></button>
  <button class="family-mobile-appearance" id="mobile-theme"></button>
  <div class="preview-theme-select"><select>
    <option value="dark">Dark</option><option value="light">Light</option>
    <option value="hc">HC Dark</option><option value="hclight">HC Light</option>
  </select></div>
  <div class="editor-preview"><span class="preview-filename"></span><pre class="preview-code"></pre></div>
`

const element = selector => {
  const found = document.querySelector(selector)

  if (!found) throw new Error(`Missing fixture element: ${selector}`)

  return found
}

const changeAppearance = (control, theme) => {
  document.documentElement.setAttribute('data-theme', theme)

  element(`#${control}-theme`).dispatchEvent(new CustomEvent('ui:theme-change', {
    bubbles: true,
    detail: { theme }
  }))
}

beforeAll(async () => {
  vi.stubGlobal('matchMedia', () => Object.assign(new EventTarget(), { matches: false }))

  await import('../src/main.js')
})

afterAll(() => vi.unstubAllGlobals())

beforeEach(() => {
  document.head.innerHTML = '<meta name="theme-page" content="vscode">'

  document.body.innerHTML = fixture

  document.documentElement.setAttribute('data-theme', 'dark')

  document.dispatchEvent(new Event('astro:page-load'))
})

afterEach(() => {
  document.dispatchEvent(new Event('astro:before-swap'))

  document.head.innerHTML = ''

  document.body.innerHTML = ''
})

describe('VS Code preview appearance', () => {
  it.each(['desktop', 'mobile'])('follows the %s appearance control until a preview is selected', control => {
    changeAppearance(control, 'light')

    expect(element('.editor-preview').getAttribute('data-preview-theme')).toBe('light')

    expect(element('.preview-filename').textContent).toBe('santi020k-light-color-theme.json')

    expect(element('.preview-code').textContent).toContain('"type": "light"')

    changeAppearance(control, 'dark')

    expect(element('.editor-preview').getAttribute('data-preview-theme')).toBe('dark')
  })

  it('preserves a manually selected high-contrast preview when the page appearance changes', () => {
    const select = element('.preview-theme-select select')

    if (!(select instanceof HTMLSelectElement)) throw new Error('Expected a native Select fallback')

    select.value = 'hclight'

    select.dispatchEvent(new Event('change', { bubbles: true }))

    changeAppearance('mobile', 'light')

    changeAppearance('desktop', 'dark')

    expect(element('.editor-preview').getAttribute('data-preview-theme')).toBe('hclight')

    expect(select.value).toBe('hclight')
  })

  it('stops updating a departing page and binds the returning page', () => {
    document.dispatchEvent(new Event('astro:before-swap'))

    changeAppearance('mobile', 'light')

    expect(element('.editor-preview').getAttribute('data-preview-theme')).toBe('dark')

    document.body.innerHTML = fixture

    document.dispatchEvent(new Event('astro:page-load'))

    expect(element('.editor-preview').getAttribute('data-preview-theme')).toBe('light')

    changeAppearance('mobile', 'dark')

    expect(element('.editor-preview').getAttribute('data-preview-theme')).toBe('dark')
  })
})
