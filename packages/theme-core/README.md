# @santi020k/theme-core

Small shared helpers and types for Santi020k token packages, asset manifests, and static websites.

Most projects should install `@santi020k/theme` directly. Use `@santi020k/theme-core` when you are building a new Santi020k package or website that needs the underlying token generation, asset lookup, or site behavior helpers.

**Website:** [theme.santi020k.com](https://theme.santi020k.com)

**npm:** [npmjs.com/package/@santi020k/theme-core](https://www.npmjs.com/package/@santi020k/theme-core)

## Install

```bash
pnpm add @santi020k/theme-core
```

This package is ESM-only and expects Node `>=22.18.0`.

## Exports

| Export | Use it for |
| --- | --- |
| `@santi020k/theme-core` | Combined public helper surface |
| `@santi020k/theme-core/types` | Shared token and asset manifest type helpers |
| `@santi020k/theme-core/utils` | Token generation and asset lookup utilities |
| `@santi020k/theme-core/site` | Static website theme and navigation helpers |

## Token Helpers

```js
import { generateTokensCSS } from '@santi020k/theme-core'
import { config } from '@santi020k/theme'

const css = generateTokensCSS(config)
```

Useful utilities include:

- `generateCSSProperties`
- `generateHighContrastProperties`
- `generateTailwindTheme`
- `generateTokensCSS`
- `getAssetByPath`
- `getAssetsByCategory`
- `getAssetsBySurface`

## Site Helpers

The website apps use the `site` export for shared browser behavior:

- preferred light/dark theme detection
- local storage-backed theme sync
- dark-mode root state helpers
- mobile navigation state
- reduced-motion and pointer media query constants

```js
import {
  bindPreferredSiteThemeSync,
  bindSiteNavigation,
  syncSiteThemeToggle
} from '@santi020k/theme-core/site'
```

## Development

| Command | What it does |
| --- | --- |
| `pnpm --filter @santi020k/theme-core run build` | Syntax-checks all package entry points |
| `pnpm --filter @santi020k/theme-core run validate` | Runs the package validation shortcut |
| `pnpm run validate` | Runs the full monorepo validation suite |

## License

MIT.
