# Chrome Theme Website

Astro source module for the [Santi020k Chrome theme page](https://theme.santi020k.com/chrome/) in the consolidated theme-family site.

The page should connect the browser theme to the wider Santi020k Theme family, show the actual Chrome visual direction, and send users to the dark and light Chrome Web Store listings.

## Stack

- Runtime: Astro with plain HTML, CSS, and JavaScript
- Shared tokens and helpers: `@santi020k/theme`
- Source: `src/pages/index.astro`, `src/main.js`, `src/styles.css`
- Public assets: `public/`
- Composed build output: `apps/website/dist/chrome/`

## Commands

Run commands from the repository root.

| Command | What it does |
| --- | --- |
| `pnpm run site:dev` | Starts the consolidated site dev server on port 4174 |
| `pnpm run site:build` | Builds the consolidated production site |
| `pnpm run site:preview` | Previews the consolidated production build on port 4174 |
| `pnpm run validate:chrome` | Validates the Chrome theme package |
| `pnpm run validate` | Runs the full monorepo validation suite |

## Maintenance Notes

- Keep Web Store links aligned with the dark and light listings in `packages/santi020k-chrome-theme/README.md`.
- Keep website-only SEO assets in this app and store listing assets in `packages/santi020k-chrome-theme/store/`.
- Preserve visible focus styles, reduced-motion handling, external-link safety, and responsive behavior.
- Read [`../../docs/brand-guidelines.md`](../../docs/brand-guidelines.md) before changing copy, color, imagery, or product naming.

For deeper implementation notes, see [`WEBSITE.md`](WEBSITE.md).
