import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { createCards } from '@santi020k/og'
import { definePageMetadata } from '@santi020k/og/metadata'
import { definePresetConfig } from '@santi020k/og/presets'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const catalog = [
  ['website', 'og-image', 'Theme family', 'theme.santi020k.com', 'Theme Family', 'One violet system across every surface.', '#945df4'],
  ['vscode-website', 'og-image', 'VS Code color theme', 'theme.santi020k.com/vscode/', 'VS Code Theme', 'Six focused variants for long sessions.', '#945df4'],
  ['chrome-website', 'og-image', 'Chrome browser theme', 'theme.santi020k.com/chrome/', 'Chrome Theme', 'Dark and light browser chrome.', '#b48df7'],
  ['zed-website', 'og-image', 'Zed theme', 'theme.santi020k.com/zed/', 'Zed Theme', 'Calm violet variants for a fast editor.', '#945df4'],
  ['codex-website', 'og-image', 'Codex custom themes', 'theme.santi020k.com/codex/', 'Codex Theme', 'Dark and light. One-line import.', '#945df4'],
  ['website', 'og-raycast', 'Raycast Theme', 'theme.santi020k.com/raycast/', 'Raycast Theme', 'Dark and light. One-click import.', '#945df4'],
  ['website', 'og-slack', 'Slack Theme', 'theme.santi020k.com/slack/', 'Slack Theme', 'Calm violet workspace colors.', '#945df4'],
  ['website', 'og-jetbrains', 'JetBrains Theme', 'theme.santi020k.com/jetbrains/', 'JetBrains Theme', 'UI and editor colors, together.', '#945df4'],
  ['website', 'og-xcode', 'Xcode Theme', 'theme.santi020k.com/xcode/', 'Xcode Theme', 'Native editor and console colors.', '#945df4'],
  ['website', 'og-obsidian', 'Obsidian Theme', 'theme.santi020k.com/obsidian/', 'Obsidian Theme', 'A calm violet space for your notes.', '#945df4'],
  ['website', 'og-neovim', 'Neovim Theme', 'theme.santi020k.com/neovim/', 'Neovim Theme', 'Syntax, diagnostics, and terminal colors.', '#945df4'],
  ['website', 'og-iphone', 'iPhone Setup', 'theme.santi020k.com/iphone/', 'iPhone Setup', 'Wallpapers and a coordinated Home Screen.', '#945df4'],
  ['website', 'og-appearance', 'Wallpaper Appearance', 'theme.santi020k.com/gallery/appearance/', 'Wallpaper Appearance', 'Paired light and dark wallpaper setup.', '#945df4'],
  ['website', 'og-design', 'Visual Guide', 'theme.santi020k.com/design/', 'Visual Guide', 'Color, typography, and shared tokens.', '#945df4'],
  ['website', 'og-support', 'Theme Support', 'theme.santi020k.com/support/', 'Theme Support', 'Bug reports, coverage, and releases.', '#945df4'],
  ['website', 'og-gallery', 'Wallpaper Gallery', 'theme.santi020k.com/gallery/', 'Wallpaper Gallery', 'Eight designs. Light and dark downloads.', '#945df4'],
  ['website', 'og-archive', 'Classic Archive', 'theme.santi020k.com/gallery/archive/', 'Classic Archive', 'Earlier wallpapers, banners, and logos.', '#945df4'],
  ['terminal-website', 'og-image', 'Terminal theme', 'theme.santi020k.com/terminal/', 'Terminal Theme', 'Color and prompt, in sync.', '#945df4'],
  ['terminal-website', 'og-zsh', 'Curated shell setup', 'theme.santi020k.com/terminal/docs/zsh/', 'Zsh Setup', 'Fast shell tools, configured together.', '#b48df7'],
  ['terminal-website', 'og-iterm2', 'Terminal color scheme', 'theme.santi020k.com/terminal/docs/terminal-colors/', 'iTerm2 Colors', 'Dark and light. Full ANSI coverage.', '#89b8c8'],
  ['terminal-website', 'og-starship', 'Powerline prompt preset', 'theme.santi020k.com/terminal/docs/starship/', 'Starship Prompt', 'Powerline shape. Santi020k focus.', '#945df4'],
  ['terminal-website', 'og-ports', 'Generated color presets', 'theme.santi020k.com/terminal/docs/terminal-colors/', 'Terminal Ports', 'One palette for five more terminals.', '#7daea3']
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
