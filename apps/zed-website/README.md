# Zed Theme Website

Static Astro site for [zed.santi020k.com](https://zed.santi020k.com), the product page for the Santi020k Zed theme.

The page should connect the Zed theme to the wider Santi020k Theme family, show the actual Zed visual direction, and give users a clear local install path for the generated theme package.

## Stack

- Runtime: Astro with plain HTML, CSS, and JavaScript
- Shared tokens and helpers: `@santi020k/theme`
- Source: `src/pages/index.astro`, `src/main.js`, `src/styles.css`
- Public assets: `public/`
- Build output: `dist/`

## Commands

Run commands from the repository root.

| Command                     | What it does                                      |
| --------------------------- | ------------------------------------------------- |
| `pnpm run site:zed:dev`     | Starts the local Zed site dev server on port 4178 |
| `pnpm run site:zed:build`   | Builds the production site                        |
| `pnpm run site:zed:preview` | Previews the production build on port 4178        |
| `pnpm run validate:zed`     | Validates the Zed theme package                   |
| `pnpm run validate`         | Runs the full monorepo validation suite           |

## Maintenance Notes

- Keep install instructions aligned with `packages/santi020k-zed-theme/README.md`.
- Keep website-only SEO assets in this app and theme generation logic in `packages/santi020k-zed-theme/`.
- Preserve visible focus styles, reduced-motion handling, external-link safety, and responsive behavior.
- Read [`../../docs/brand-guidelines.md`](../../docs/brand-guidelines.md) before changing copy, color, imagery, or product naming.

For deeper implementation notes, see [`WEBSITE.md`](WEBSITE.md).
