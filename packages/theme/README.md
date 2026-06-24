# @santi020k/theme

Shared Santi020k Theme tokens, assets, metadata, and Chrome color mapping helpers.

Use this package when a website, app, or theme surface needs the public Santi020k visual system: CSS custom properties, Tailwind v4 tokens, package metadata, project assets, or the Chrome manifest color mapping derived from the VS Code palette.

**Website:** [theme.santi020k.com](https://theme.santi020k.com)

**npm:** [npmjs.com/package/@santi020k/theme](https://www.npmjs.com/package/@santi020k/theme)

## Install

```bash
pnpm add @santi020k/theme
```

This package is ESM-only and expects Node `>=22.18.0`.

## Exports

| Export | Use it for |
| --- | --- |
| `@santi020k/theme` | JS tokens, metadata, asset lookup, Chrome theme helpers |
| `@santi020k/theme/site` | Shared website theme and navigation helpers |
| `@santi020k/theme/site.css` | Shared website-ready color and typography variables |
| `@santi020k/theme/typography.css` | Shared Montserrat font-family variables |
| `@santi020k/theme/tokens.css` | CSS custom properties and Tailwind v4 `@theme` values |
| `@santi020k/theme/tokens.json` | Raw token data |
| `@santi020k/theme/tailwind` | Tailwind-compatible theme object |
| `@santi020k/theme/assets/*` | Package-relative static asset imports |
| `@santi020k/theme/docs/*` | Packaged documentation such as brand guidance |

## CSS Tokens

```css
@import '@santi020k/theme/tokens.css';

.panel {
  color: hsl(var(--ink));
  background: hsl(var(--surface));
  border-color: hsl(var(--line));
}
```

The CSS export includes raw HSL custom properties and Tailwind v4 `@theme` mappings. Prefer these tokens over one-off colors when building Santi020k surfaces.

For Santi020k product websites, use the site stylesheet instead. It exposes the same public color language as CSS-ready colors, plus the shared typography variables:

```css
@import '@santi020k/theme/site.css';

.panel {
  color: var(--ink);
  background: var(--surface);
  border-color: var(--line);
}
```

Use `data-santi020k-site="hub"` on the root element for the family hub palette offsets.

## Typography

Montserrat is the canonical Santi020k web font. Import the typography-only CSS when a project only needs the shared font variables:

```css
@import '@santi020k/theme/typography.css';

html {
  font-family: var(--santi020k-font-sans);
}
```

Consumers should load Montserrat from their preferred delivery path, such as Google Fonts or a self-hosted copy. The package exposes the family stacks, not renamed or repackaged font files. Tailwind v4 font mappings remain available through `@santi020k/theme/tokens.css`.

## JavaScript

```js
import { colors, config, getAssets, projects } from '@santi020k/theme'
import { theme } from '@santi020k/theme/tailwind'

const logos = getAssets('logo')
const project = projects.santi020kTheme

console.log(colors, config.colors, theme.colors.brand, logos, project.title)
```

## Assets

```js
import logoUrl from '@santi020k/theme/assets/logos/logo-santi020k.webp'
import vscodePreview from '@santi020k/theme/assets/vscode/previews/preview-dark.png'
import projectCover from '@santi020k/theme/assets/projects/santi020k-theme/cover.webp'
```

The asset tree includes:

- `assets/logos`, `assets/favicons`, `assets/banners`, and `assets/wallpapers`
- `assets/vscode` for extension icons and previews
- `assets/chrome` for Chrome theme icons, images, and store media
- `assets/projects/santi020k-theme` for portfolio-ready cover, logo, and preview media

For package metadata and static copy targets, import `manifest` from the root export.

## Chrome Theme Helpers

The Chrome theme package uses this package to keep Chrome manifests centered on the VS Code palette.

Useful exports include:

- `chromeThemeVariants`
- `chromeThemeVariantManifests`
- `chromeThemeSourceTokenRoles`
- `chromeThemeContrastPairs`
- `createChromeThemeFromVSCodeColors`

Use these helpers instead of duplicating Chrome color mappings in app or package code.

## Development

| Command | What it does |
| --- | --- |
| `pnpm --filter @santi020k/theme run build` | Syntax-checks the package entry points |
| `pnpm --filter @santi020k/theme run validate` | Runs the package validation shortcut |
| `pnpm run validate` | Runs the full monorepo validation suite |

## Brand Source

The canonical brand guide lives in [`../../docs/brand-guidelines.md`](../../docs/brand-guidelines.md). A package copy is available at `@santi020k/theme/docs/brand-guidelines.md` for consumers that need the guidance from the published package.

## License

MIT.
