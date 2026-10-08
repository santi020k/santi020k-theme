<p align="center">
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/README.md">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/santi020k/santi020k-theme/main/docs/assets/readme/workspace-dark.svg">
      <img src="https://raw.githubusercontent.com/santi020k/santi020k-theme/main/docs/assets/readme/workspace-light.svg" alt="Santi020k Theme — Calm contrast. A violet thread through your tools." width="1200" height="220">
    </picture>
  </a>
</p>

<h1 align="center">Foundation helpers</h1>

<p align="center">
  <a href="https://www.npmjs.com/package/@santi020k/theme-core"><img src="https://img.shields.io/npm/v/@santi020k/theme-core?style=flat-square&amp;color=6319be" alt="Published npm version"></a>
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-13967e?style=flat-square" alt="License: MIT"></a>
</p>

<p align="center">
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/README.md">Project overview</a> ·
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/packages/theme-core/package.json">Package manifest</a> ·
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/packages/theme-core/CHANGELOG.md">Changelog</a> ·
  <a href="#resources">Resources</a>
</p>

<details>
<summary>On this page</summary>

- [Install](#install)
- [Exports](#exports)
- [Token Helpers](#token-helpers)
- [Site Helpers](#site-helpers)
- [Development](#development)
- [License](#license)
- [Resources](#resources)

</details>

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

| Export                        | Use it for                                   |
| ----------------------------- | -------------------------------------------- |
| `@santi020k/theme-core`       | Combined public helper surface               |
| `@santi020k/theme-core/types` | Shared token and asset manifest type helpers |
| `@santi020k/theme-core/utils` | Token generation and asset lookup utilities  |
| `@santi020k/theme-core/site`  | Static website theme and navigation helpers  |

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

| Command                                            | What it does                            |
| -------------------------------------------------- | --------------------------------------- |
| `pnpm --filter @santi020k/theme-core run build`    | Syntax-checks all package entry points  |
| `pnpm --filter @santi020k/theme-core run validate` | Runs the package validation shortcut    |
| `pnpm run validate`                                | Runs the full monorepo validation suite |

Theme toggle synchronization preserves the control semantics: native buttons use `aria-pressed`, switches use `aria-checked`, and the incompatible state attribute is removed.

Preferred appearance sync follows repeated operating-system changes until a valid light/dark
choice is stored. It does not save the operating-system preference as a user choice, and
unavailable browser storage falls back to the operating-system appearance.

## License

MIT.

## Resources

[Project overview](https://github.com/santi020k/santi020k-theme/blob/main/README.md) · [Contributing](https://github.com/santi020k/santi020k-theme/blob/main/CONTRIBUTING.md) · [License](https://github.com/santi020k/santi020k-theme/blob/main/LICENSE)
