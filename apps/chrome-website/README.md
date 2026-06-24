# Chrome Theme Website

Static Vite site for [chrome.santi020k.com](https://chrome.santi020k.com), the product page for the Santi020k Chrome browser theme.

The page should connect the browser theme to the wider Santi020k Theme family, show the actual Chrome visual direction, and send users to the dark and light Chrome Web Store listings.

## Stack

- Runtime: Vite with plain HTML, CSS, and JavaScript
- Shared tokens and helpers: `@santi020k/theme`
- Source: `index.html`, `src/main.js`, `src/styles.css`
- Vite config: `vite.config.js`
- Public assets: `public/`
- Build output: `dist/`

## Commands

Run commands from the repository root.

| Command | What it does |
| --- | --- |
| `pnpm run site:chrome:dev` | Starts the local Chrome site dev server on port 4175 |
| `pnpm run site:chrome:build` | Builds the production site |
| `pnpm run site:chrome:preview` | Previews the production build on port 4175 |
| `pnpm run validate:chrome` | Validates the Chrome theme package |
| `pnpm run validate` | Runs the full monorepo validation suite |

## Maintenance Notes

- Keep Web Store links aligned with the dark and light listings in `packages/santi020k-chrome-theme/README.md`.
- Keep website-only SEO assets in this app and store listing assets in `packages/santi020k-chrome-theme/store/`.
- Preserve visible focus styles, reduced-motion handling, external-link safety, and responsive behavior.
- Read [`../../docs/brand-guidelines.md`](../../docs/brand-guidelines.md) before changing copy, color, imagery, or product naming.

For deeper implementation notes, see [`WEBSITE.md`](WEBSITE.md).
