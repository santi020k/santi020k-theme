# Zed Theme Website

Astro source module for the [Santi020k Zed theme page](https://theme.santi020k.com/zed/) in the consolidated theme-family site.

The page should connect the Zed theme to the wider Santi020k Theme family, show the actual Zed visual direction, and give users a clear local install path for the generated theme package.

## Stack

- Runtime: Astro with plain HTML, CSS, and JavaScript
- Shared tokens and helpers: `@santi020k/theme`
- Source: `src/pages/index.astro`, `src/main.js`, `src/styles.css`
- Public assets: `public/`
- Composed build output: `apps/website/dist/zed/`

## Commands

Run commands from the repository root.

| Command                     | What it does                                      |
| --------------------------- | ------------------------------------------------- |
| `pnpm run site:dev`         | Starts the consolidated site dev server on port 4174 |
| `pnpm run site:build`       | Builds the consolidated production site              |
| `pnpm run site:preview`     | Previews the consolidated production build on port 4174 |
| `pnpm run validate:zed`     | Validates the Zed theme package                   |
| `pnpm run validate`         | Runs the full monorepo validation suite           |

## Maintenance Notes

- Keep install instructions aligned with `packages/santi020k-zed-theme/README.md`.
- Keep website-only SEO assets in this app and theme generation logic in `packages/santi020k-zed-theme/`.
- Preserve visible focus styles, reduced-motion handling, external-link safety, and responsive behavior.
- Read [`../../docs/brand-guidelines.md`](../../docs/brand-guidelines.md) before changing copy, color, imagery, or product naming.

For deeper implementation notes, see [`WEBSITE.md`](WEBSITE.md).
