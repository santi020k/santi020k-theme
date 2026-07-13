# Theme Hub Website

Static Astro site for [theme.santi020k.com](https://theme.santi020k.com), the entry point for the Santi020k Theme family.

The hub links visitors to the dedicated VS Code, Chrome, and iTerm2 theme sites, gives a compact cross-surface preview, and keeps future theme surfaces visible without turning the root site into a portfolio page.

## Stack

- Runtime: Astro with plain HTML, CSS, and JavaScript
- Shared tokens and helpers: `@santi020k/theme`
- Source: `src/pages/index.astro`, `src/main.js`, `src/styles.css`
- Public assets: `public/`
- Build output: `dist/`

## Commands

Run commands from the repository root.

| Command | What it does |
| --- | --- |
| `pnpm run site:dev` | Starts the local hub dev server on port 4174 |
| `pnpm run site:build` | Builds the production site |
| `pnpm run site:preview` | Previews the production build on port 4174 |
| `pnpm run validate` | Runs the full monorepo validation suite |

## Maintenance Notes

- Keep product links aligned with `https://vscode.santi020k.com/` and `https://chrome.santi020k.com/`.
- Preserve visible focus styles, external-link safety, and the dark/light toggle.
- Keep preview assets in `public/` aligned with current package screenshots.
- Read [`../../docs/brand-guidelines.md`](../../docs/brand-guidelines.md) before changing copy, color, imagery, or product naming.

For deeper implementation notes, see [`WEBSITE.md`](WEBSITE.md).
