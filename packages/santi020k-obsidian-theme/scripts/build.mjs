import assert from 'node:assert/strict'
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { readPortPalette } from '../../../scripts/lib/port-palette.mjs'

const variables = appearance => {
  const p = readPortPalette(appearance)

  return {
    'background-primary': p.background,
    'background-primary-alt': p.surface,
    'background-secondary': p.surface,
    'background-secondary-alt': p.background,
    'background-modifier-border': p.border,
    'background-modifier-border-hover': p.muted,
    'background-modifier-border-focus': p.accent,
    'background-modifier-hover': p.selection,
    'background-modifier-active-hover': p.selection,
    'background-modifier-form-field': p.background,
    'background-modifier-error': `color-mix(in srgb, ${p.error} 15%, ${p.background})`,
    'background-modifier-success': `color-mix(in srgb, ${p.success} 15%, ${p.background})`,
    'interactive-normal': p.surface,
    'interactive-hover': p.selection,
    'interactive-accent': p.button,
    'interactive-accent-hover': p.button,
    'text-on-accent': p.buttonText,
    'text-normal': p.foreground,
    'text-muted': p.muted,
    'text-faint': p.muted,
    'text-accent': p.accent,
    'text-accent-hover': p.accent,
    'text-error': p.error,
    'text-warning': p.warning,
    'text-success': p.success,
    'text-selection': p.selection,
    'text-highlight-bg': p.selection,
    'caret-color': p.accent,
    'color-accent': p.accent,
    'color-accent-1': p.accent,
    'color-accent-2': p.accent,
    'color-red': p.error,
    'color-orange': p.warning,
    'color-yellow': p.string,
    'color-green': p.success,
    'color-cyan': p.info,
    'color-blue': p.function,
    'color-purple': p.accent,
    'color-pink': p.property,
    'code-background': p.surface,
    'code-normal': p.foreground,
    'code-comment': p.comment,
    'code-function': p.function,
    'code-keyword': p.keyword,
    'code-important': p.keyword,
    'code-operator': p.operator,
    'code-property': p.property,
    'code-punctuation': p.muted,
    'code-string': p.string,
    'code-tag': p.type,
    'code-value': p.number,
    'link-color': p.accent,
    'link-color-hover': p.accent,
    'link-external-color': p.accent,
    'link-external-color-hover': p.accent,
    'tag-color': p.accent,
    'tag-background': p.selection,
    'nav-item-color': p.muted,
    'nav-item-color-active': p.foreground,
    'nav-item-background-active': p.selection,
    'tab-text-color-active': p.foreground,
    'tab-background-active': p.background,
    'titlebar-background': p.surface,
    'titlebar-background-focused': p.surface,
    'ribbon-background': p.surface,
    'status-bar-background': p.surface,
    'graph-text': p.foreground,
    'graph-line': p.muted,
    'graph-node': p.accent,
    'table-border-color': p.border,
    'blockquote-border-color': p.accent,
    'checkbox-color': p.button,
    'checkbox-color-hover': p.button,
    'checkbox-marker-color': p.buttonText
  }
}

const css = ['/* Generated from the canonical Santi020k palette. Edit scripts/build.mjs. */',
  ...['dark', 'light'].map(appearance => `.theme-${appearance} {\n${Object.entries(variables(appearance)).map(([key, value]) => `  --${key}: ${value};`).join('\n')}\n}`),
  `/* Keep native fonts, text sizing, mobile toolbars and keyboard behavior. */
body {
  --h1-color: var(--text-normal);
  --h2-color: var(--text-accent);
  --h3-color: var(--text-normal);
  --h4-color: var(--text-normal);
  --h5-color: var(--text-muted);
  --h6-color: var(--text-muted);
  --link-decoration: underline;
  --link-external-decoration: underline;
  --file-line-width: 46rem;
  --line-height-normal: 1.65;
}

body.is-mobile {
  --file-margins: var(--size-4-4);
}
`
].join('\n\n')

/** @param {URL} [root] */
export const buildObsidianTheme = (root = new URL('../', import.meta.url)) => {
  const pkg = JSON.parse(readFileSync(new URL('package.json', root), 'utf8'))
  const versions = JSON.parse(readFileSync(new URL('versions.json', root), 'utf8'))

  assert.ok(versions && typeof versions === 'object' && !Array.isArray(versions), 'Expected an Obsidian version mapping')

  for (const [version, minimum] of Object.entries(versions)) {
    assert.match(version, /^\d+\.\d+\.\d+$/, 'Invalid historical Obsidian version')

    assert.equal(typeof minimum, 'string', 'Invalid historical Obsidian app minimum')

    assert.match(minimum, /^\d+\.\d+\.\d+$/, 'Invalid historical Obsidian app minimum')
  }

  const manifest = {
    name: 'Santi020k',
    version: pkg.version,
    minAppVersion: '1.10.6',
    author: 'Santiago Molina',
    authorUrl: 'https://santi020k.com'
  }

  writeFileSync(new URL('theme.css', root), css)

  writeFileSync(new URL('manifest.json', root), JSON.stringify(manifest, null, 2) + '\n')

  writeFileSync(new URL('versions.json', root), JSON.stringify({ ...versions, [pkg.version]: manifest.minAppVersion }, null, 2) + '\n')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildObsidianTheme()

  console.log('Generated Obsidian dark and light theme.')
}
