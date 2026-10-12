import { describe, expect, it } from 'vitest'

import { config } from '../../packages/theme/index.js'
import { generateTokensCSS } from '../../packages/theme-core/utils.js'

const collectTokenContexts = css => {
  const contexts = []
  const blocks = []
  const segments = css.replaceAll(/\/\*[\s\S]*?\*\//g, '').split(/([{};])/)
  let statement = ''

  for (const segment of segments) {
    if (segment === '{') {
      blocks.push(statement.trim())

      statement = ''
    } else if (segment === '}') {
      expect(blocks.length).toBeGreaterThan(0)

      blocks.pop()

      statement = ''
    } else if (segment === ';') {
      if (statement.trim().startsWith('--sample:')) {
        contexts.push({ blocks: [...blocks], declaration: statement.trim() })
      }

      statement = ''
    } else {
      statement += segment
    }
  }

  expect(blocks).toEqual([])

  return contexts
}

describe('generated token CSS contrast overrides', () => {
  it.each(['data-theme', 'class', 'media-query'])('keeps dark contrast rules inside both media conditions with %s', darkMode => {
    const css = generateTokensCSS({
      ...config,
      colors: [{ dark: 'dark', darkContrast: 'dark-contrast', light: 'light', lightContrast: 'light-contrast', name: 'sample' }],
      darkMode,
      darkModeVariant: undefined
    })

    const contexts = collectTokenContexts(css)
    const lightContrast = contexts.find(context => context.declaration === '--sample: light-contrast')
    const darkContrast = contexts.find(context => context.declaration === '--sample: dark-contrast')

    expect(lightContrast.blocks).toEqual(['@media (prefers-contrast: more)', ':root,\n  :root[data-theme="light"]'])

    const darkConditions = {
      'class': [':root.dark'],
      'data-theme': [':root[data-theme="dark"]'],
      'media-query': ['@media (prefers-color-scheme: dark)', ':root']
    }

    expect(darkContrast.blocks).toEqual(['@media (prefers-contrast: more)', ...darkConditions[darkMode]])
  })

  it.each([
    { darkContrast: 'dark-contrast' },
    { lightContrast: 'light-contrast' },
    {}
  ])('emits balanced media-query CSS with optional contrast values %j', contrast => {
    const css = generateTokensCSS({
      ...config,
      colors: [{ dark: 'dark', light: 'light', name: 'sample', ...contrast }],
      darkMode: 'media-query',
      darkModeVariant: undefined
    })

    expect(collectTokenContexts(css)).toHaveLength(2 + Object.keys(contrast).length)
  })
})
