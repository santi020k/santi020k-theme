# VS Code Theme Website

Static Vite site for [vscode.santi020k.com](https://vscode.santi020k.com), the product page for the `santi020k-theme` VS Code extension.

The page should make the theme visible immediately, link directly to Marketplace and Open VSX install paths, and show real previews of the dark, light, and high-contrast variants.

## Stack

- Runtime: Vite with plain HTML, CSS, and JavaScript
- Shared helpers: `@santi020k/theme-core`
- Source: `index.html`, `src/main.js`, `src/styles.css`
- Version sync: `scripts/sync-website-version.mjs`
- Tests: `tests/sync-website-version.test.mjs`
- Public assets: `public/`
- Build output: `dist/`

## Commands

Run commands from the repository root.

| Command | What it does |
| --- | --- |
| `pnpm run site:vscode:dev` | Starts the local VS Code site dev server on port 4176 |
| `pnpm run site:vscode:build` | Builds the production site |
| `pnpm run site:vscode:preview` | Previews the production build on port 4176 |
| `pnpm run sync:website-version` | Syncs website JSON-LD version data from the VS Code extension package |
| `pnpm run test` | Runs repo tests, including website version sync tests |
| `pnpm run validate` | Runs the full monorepo validation suite |

## Maintenance Notes

- Keep install links pointed at the Visual Studio Marketplace and Open VSX listings.
- Keep visible focus styles, reduced-motion handling, external-link safety, and responsive navigation intact.
- Update `softwareVersion` through `pnpm run sync:website-version` rather than editing it by hand.
- Keep previews in `public/` aligned with `packages/santi020k-theme/assets/previews/`.
- Read [`../../docs/brand-guidelines.md`](../../docs/brand-guidelines.md) before changing copy, color, imagery, or product naming.

For the detailed style guide, token map, component notes, and SEO checklist, see [`WEBSITE.md`](WEBSITE.md).
