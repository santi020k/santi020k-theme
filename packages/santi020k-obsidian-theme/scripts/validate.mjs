import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { contrastRatio } from '../../santi020k-theme/scripts/validate-themes.mjs'

export const validateObsidianTheme = (css, manifest) => {
  assert.equal(manifest.name, 'Santi020k')

  assert.match(manifest.version, /^\d+\.\d+\.\d+$/)

  assert.match(manifest.minAppVersion, /^\d+\.\d+\.\d+$/)

  assert.equal(manifest.authorUrl, 'https://santi020k.com')

  assert.doesNotMatch(css, /!important|@import|url\(/i, 'Theme must be self-contained and preserve native overrides')

  for (const appearance of ['dark', 'light']) {
    const block = css.match(new RegExp(`\\.theme-${appearance} \\{([^}]+)\\}`))?.[1]

    assert.ok(block, `Missing ${appearance} appearance`)

    const variables = new Map([...block.matchAll(/--([\w-]+):\s*([^;]+);/g)].map(match => [match[1], match[2]]))

    const color = name => {
      const value = variables.get(name)

      assert.match(value ?? '', /^#[\da-f]{6}$/i, `Missing or invalid ${name}`)

      return value
    }

    for (const foreground of ['text-normal', 'text-muted', 'text-faint', 'text-accent', 'text-error', 'text-warning', 'text-success', 'code-comment', 'code-normal', 'code-function', 'code-keyword', 'code-string', 'code-value']) {
      for (const background of ['background-primary', 'background-secondary', 'text-selection']) {
        assert.ok(contrastRatio(color(foreground), color(background)) >= 4.5, `${appearance}: ${foreground} on ${background}`)
      }
    }

    assert.ok(contrastRatio(color('text-on-accent'), color('interactive-accent')) >= 4.5)
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  validateObsidianTheme(
    readFileSync(new URL('../theme.css', import.meta.url), 'utf8'),
    JSON.parse(readFileSync(new URL('../manifest.json', import.meta.url), 'utf8'))
  )

  console.log('Validated Obsidian manifest, offline CSS and dark/light text contrast.')
}
