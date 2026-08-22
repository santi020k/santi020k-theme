/**
 * @typedef {'vscode' | 'chrome' | 'terminal' | 'zed' | 'codex' | 'raycast' | 'slack' | 'jetbrains' | 'xcode'} ProductSlug
 */

/** @type {Array<{slug: ProductSlug, name: string, category: string, summary: string}>} */
export const products = [
  { slug: 'vscode', name: 'VS Code', category: 'Editor', summary: 'Dark, light, high-contrast, bold, and italic variants for VS Code-compatible editors.' },
  { slug: 'chrome', name: 'Chrome', category: 'Browser', summary: 'Matching dark and light browser chrome with the same violet system.' },
  { slug: 'terminal', name: 'Terminal', category: 'Command line', summary: 'Terminal colors, Starship prompts, shell setup, and a guided configurator.' },
  { slug: 'zed', name: 'Zed', category: 'Editor', summary: 'Dark and light editor variants generated from the shared palette.' },
  { slug: 'codex', name: 'Codex', category: 'Developer tool', summary: 'Import-ready dark and light custom theme presets.' },
  { slug: 'raycast', name: 'Raycast', category: 'Launcher', summary: 'Raycast Pro custom themes with one-click dark and light import URLs.' },
  { slug: 'slack', name: 'Slack', category: 'Collaboration', summary: 'Custom workspace colors supplied as legacy import strings and semantic maps.' },
  { slug: 'jetbrains', name: 'JetBrains', category: 'IDE', summary: 'A complete UI and editor plugin for Android Studio and JetBrains IDEs.' },
  { slug: 'xcode', name: 'Xcode', category: 'IDE', summary: 'Native dark and light editor and debug-console color themes.' }
]
