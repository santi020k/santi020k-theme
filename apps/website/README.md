# Theme Hub Website

Static Astro site for [theme.santi020k.com](https://theme.santi020k.com), the entry point for the Santi020k Theme family.

The hub links visitors to the dedicated VS Code, Chrome, Terminal, and Zed theme sites, gives a compact cross-surface preview, and keeps future theme surfaces visible without turning the root site into a portfolio page.

## Stack

- Runtime: Astro with plain HTML, CSS, and JavaScript
- Shared tokens and helpers: `@santi020k/theme`
- Source: `src/pages/index.astro`, `src/main.js`, `src/styles.css`; home compositions in `src/styles/home.css`
- Public assets: `public/`
- Build output: `dist/`

## Commands

Run commands from the repository root.

| Command                 | What it does                                 |
| ----------------------- | -------------------------------------------- |
| `pnpm run site:dev`     | Starts the local hub dev server on port 4174 |
| `pnpm run site:build`   | Builds the production site                   |
| `pnpm run site:preview` | Previews the production build on port 4174   |
| `pnpm run validate`     | Runs the full monorepo validation suite      |

## Maintenance Notes

- Keep product links aligned with their canonical routes under `https://theme.santi020k.com/`.
- Preserve visible focus styles, external-link safety, and the dark/light toggle.
- The `/design/` palette reveals HEX, RGB, and HSL values through each swatch's keyboard-accessible Color codes disclosure. Values read active shared CSS tokens and stay synchronized with appearance changes and page navigation instead of maintaining a second palette.
- Keep preview assets in `public/` aligned with current package screenshots.
- The Sculpted home page pairs an open hero with a workspace detail strip, a featured VS Code preview, numbered tool rows, one package code surface, and image-led wallpaper downloads. Featured wallpapers pair Ceramic light, Satin dark, and Dune light in their full desktop proportions, with edition-specific downloads. Home styles stay scoped to `.home-page`; shared navigation and product pages keep their own composition.
- The home theme cards use `src/components/ThemeCardPreview.astro`: canonical VS Code screenshots, generated Chrome store artwork, and labeled illustrative previews for other tools. Preview colors derive from the paired VS Code theme sources and follow site appearance. Keep illustrative scenes free of private data and do not present them as native captures.
- Read [`../../docs/brand-guidelines.md`](../../docs/brand-guidelines.md) before changing copy, color, imagery, or product naming.

For deeper implementation notes, see [`WEBSITE.md`](WEBSITE.md).
