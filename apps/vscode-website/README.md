# VS Code Theme Website

Astro source module for the [`santi020k-theme` VS Code page](https://theme.santi020k.com/vscode/) in the consolidated theme-family site.

The page should make the theme visible immediately, link directly to Marketplace and Open VSX install paths, and show real previews of the dark, light, and high-contrast variants.

## Stack

- Runtime: Astro with plain HTML, CSS, and JavaScript
- Shared tokens and helpers: `@santi020k/theme`
- Source: `src/pages/index.astro`, `src/main.js`, `src/styles.css`
- Version sync: `scripts/sync-website-version.mjs`
- Tests: `tests/sync-website-version.test.mjs`
- Public assets: `public/`
- Composed build output: `apps/website/dist/vscode/`

## Commands

Run commands from the repository root.

| Command | What it does |
| --- | --- |
| `pnpm run site:dev` | Starts the consolidated site dev server on port 4174 |
| `pnpm run site:build` | Builds the consolidated production site |
| `pnpm run site:preview` | Previews the consolidated production build on port 4174 |
| `pnpm run sync:website-version` | Syncs website JSON-LD version data from the VS Code extension package |
| `pnpm run test` | Runs repo tests, including website version sync tests |
| `pnpm run validate` | Runs the full monorepo validation suite |

The interactive editor preview separates the filename from an open toolbar: the language sits on the left as an editor tab, with theme and style controls on the right. Controls size to their values and wrap when space is limited. Lumen custom select lists provide keyboard navigation, type-to-jump, a checkmark for the selected option, and scrollable options, with compact 36px controls and 44px targets on touch devices. Hidden native controls synchronize preview state and provide a fallback when JavaScript is unavailable. Colors follow the selected editor theme independently of the page theme.

## Maintenance Notes

- Keep install links pointed at the Visual Studio Marketplace and Open VSX listings.
- Keep visible focus styles, reduced-motion handling, external-link safety, and responsive navigation intact.
- Update `softwareVersion` through `pnpm run sync:website-version` rather than editing it by hand.
- Keep previews in `public/` aligned with `packages/santi020k-theme/assets/previews/`.
- Read [`../../docs/brand-guidelines.md`](../../docs/brand-guidelines.md) before changing copy, color, imagery, or product naming.

For the detailed style guide, token map, component notes, and SEO checklist, see [`WEBSITE.md`](WEBSITE.md).
