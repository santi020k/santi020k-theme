import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { createCards } from '@santi020k/og'
import { definePageMetadata } from '@santi020k/og/metadata'
import { definePresetConfig } from '@santi020k/og/presets'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const catalog = [
  ['website', 'og-image', 'Theme family', 'theme.santi020k.com', 'Theme Family', 'One violet system across every surface.', '#945df4'],
  ['vscode-website', 'og-image', 'VS Code color theme', 'vscode.santi020k.com', 'VS Code Theme', 'Six focused variants for long sessions.', '#945df4'],
  ['chrome-website', 'og-image', 'Chrome browser theme', 'chrome.santi020k.com', 'Chrome Theme', 'Dark and light browser chrome.', '#b48df7'],
  ['zed-website', 'og-image', 'Zed theme', 'zed.santi020k.com', 'Zed Theme', 'Calm violet variants for a fast editor.', '#945df4'],
  ['codex-website', 'og-image', 'Codex custom themes', 'codex.santi020k.com', 'Codex Theme', 'Dark and light. One-line import.', '#945df4'],
  ['terminal-website', 'og-image', 'Terminal theme', 'terminal.santi020k.com', 'Terminal Theme', 'Color and prompt, in sync.', '#945df4'],
  ['terminal-website', 'og-zsh', 'Curated shell setup', 'terminal.santi020k.com/zsh', 'Zsh Setup', 'Fast shell tools, configured together.', '#b48df7'],
  ['terminal-website', 'og-iterm2', 'Terminal color scheme', 'terminal.santi020k.com/iterm2', 'iTerm2 Colors', 'Dark and light. Full ANSI coverage.', '#89b8c8'],
  ['terminal-website', 'og-starship', 'Powerline prompt preset', 'terminal.santi020k.com/starship', 'Starship Prompt', 'Powerline shape. Santi020k focus.', '#945df4'],
  ['terminal-website', 'og-ports', 'Generated color presets', 'terminal.santi020k.com/ports', 'Terminal Ports', 'One palette for five more terminals.', '#7daea3']
]

const pages = catalog.map(([app, output, badge, domain, title, description, accent]) => definePageMetadata({
  accent,
  app,
  badge,
  description,
  domain,
  image: { alt: `${title} — Santi020k Theme`, output: `apps/${app}/public/${output}.png` },
  pathname: new URL(`https://${domain}`).pathname,
  title
}))

export default definePresetConfig({
  cards: createCards(pages, page => ({
    accent: page.accent,
    badge: page.badge,
    description: page.description,
    domain: page.domain,
    title: page.title,
    variant: 'product'
  }), {
    formats: ['svg'],
    output: page => page.image.output
  }),
  clean: true,
  concurrency: 'auto',
  outputDirectory: '.',
  preset: {
    brand: {
      logo: 'packages/theme/assets/logos/logo-square.svg',
      name: 'Santi020k Theme'
    },
    decoration: (_data, _context, { accent, theme }) => `
      <g transform="translate(786 174)">
        <rect x="8" y="12" width="164" height="118" rx="24" fill="${theme.panel}" stroke="${accent}" stroke-opacity="0.58"/>
        <rect x="38" y="42" width="78" height="13" rx="6.5" fill="${accent}"/>
        <rect x="38" y="76" width="104" height="13" rx="6.5" fill="${theme.foreground}" opacity="0.38"/>
        <rect x="38" y="101" width="62" height="10" rx="5" fill="${theme.foreground}" opacity="0.22"/>
        <rect x="192" y="54" width="146" height="112" rx="24" fill="${theme.panel}" stroke="${theme.foreground}" stroke-opacity="0.20"/>
        <rect x="218" y="80" width="94" height="18" rx="9" fill="${theme.foreground}" opacity="0.16"/>
        <rect x="218" y="116" width="44" height="28" rx="9" fill="${accent}"/>
        <rect x="274" y="116" width="38" height="28" rx="9" fill="${theme.foreground}"/>
        <rect x="78" y="158" width="202" height="112" rx="24" fill="${theme.panel}" stroke="${theme.foreground}" stroke-opacity="0.20"/>
        <circle cx="118" cy="214" r="20" fill="${accent}"/>
        <rect x="154" y="192" width="90" height="14" rx="7" fill="${theme.foreground}" opacity="0.60"/>
        <rect x="154" y="224" width="64" height="11" rx="5.5" fill="${theme.foreground}" opacity="0.26"/>
      </g>`,
    theme: { accent: '#945df4', background: '#0d0718', panel: '#1c1528' }
  },
  root
})
