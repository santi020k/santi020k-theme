import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import { definePresetConfig } from '@santi020k/og/presets'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const cards = [
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

export default definePresetConfig({
  cards: cards.flatMap(([app, output, badge, domain, title, description, accent]) => {
    const data = { accent, badge, description, domain, title, variant: 'product' }
    const base = `apps/${app}/public/${output}`

    return [
      { data, output: `${base}.svg` },
      { data, output: `${base}.png` }
    ]
  }),
  clean: true,
  concurrency: 'auto',
  outputDirectory: '.',
  preset: {
    brand: { name: 'Santi020k Theme' },
    theme: { accent: '#945df4', background: '#0d0718', panel: '#1c1528' }
  },
  root
})
