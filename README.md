# Santi020k Theme

Monorepo for the Santi020k Theme family: a calm violet theme system spanning VS Code, Chrome, shared brand packages, and static product websites.

The brand source of truth is [`docs/brand-guidelines.md`](docs/brand-guidelines.md). Read it before changing colors, product names, screenshots, icons, website copy, store metadata, or shared assets.

## Workspaces

| Workspace | Purpose |
| --- | --- |
| `packages/santi020k-theme` | Published VS Code extension with dark, light, high-contrast, bold, and italic variants |
| `packages/santi020k-chrome-theme` | Chrome Web Store theme package, synced from the VS Code palette |
| `packages/theme` | Public `@santi020k/theme` package for tokens, assets, metadata, and Chrome mapping helpers |
| `packages/theme-core` | Public `@santi020k/theme-core` helper package for token generation, asset lookup, and website behavior |
| `apps/website` | Theme family hub for `theme.santi020k.com` |
| `apps/vscode-website` | VS Code theme product site for `vscode.santi020k.com` |
| `apps/chrome-website` | Chrome theme product site for `chrome.santi020k.com` |

## Quick Start

```bash
pnpm install
pnpm run validate
```

Use Node `>=22.18.0` and pnpm `10.32.1`.

## Common Commands

| Command | What it does |
| --- | --- |
| `pnpm run validate` | Builds packages, checks spelling, validates themes and marketplace metadata, tests, lints, and packages the VS Code extension |
| `pnpm run validate:themes` | Validates the VS Code theme JSON files |
| `pnpm run validate:marketplace` | Checks VS Code extension marketplace readiness |
| `pnpm run validate:chrome` | Lints, validates contrast, and dry-runs Chrome packaging |
| `pnpm run package:extension` | Builds and packages the VS Code extension as a VSIX |
| `pnpm run package:chrome` | Builds Chrome Web Store zip files |
| `pnpm run site:dev` | Starts the theme hub website |
| `pnpm run site:vscode:dev` | Starts the VS Code theme website |
| `pnpm run site:chrome:dev` | Starts the Chrome theme website |
| `pnpm run changeset` | Creates a release changeset |
| `pnpm run commit` | Opens the conventional commit prompt |

## Working On The Theme Family

- Start brand-sensitive work in [`docs/brand-guidelines.md`](docs/brand-guidelines.md).
- Keep VS Code dark and light theme changes paired unless the task is explicitly single-variant.
- Keep Chrome manifests synced from the VS Code theme through `pnpm run sync:themes`.
- Keep website copy concrete, developer-facing, and aligned with the published domains.
- Add a changeset for user-visible package, docs, release, website, or theme changes.

## Documentation Map

- [`docs/architecture.md`](docs/architecture.md) explains the repo architecture.
- [`packages/santi020k-theme/README.md`](packages/santi020k-theme/README.md) is the marketplace-facing VS Code extension README.
- [`packages/santi020k-chrome-theme/README.md`](packages/santi020k-chrome-theme/README.md) covers Chrome theme development and Web Store packaging.
- [`packages/theme/README.md`](packages/theme/README.md) documents shared tokens and assets.
- [`packages/theme-core/README.md`](packages/theme-core/README.md) documents shared helper APIs.
- [`apps/website/README.md`](apps/website/README.md), [`apps/vscode-website/README.md`](apps/vscode-website/README.md), and [`apps/chrome-website/README.md`](apps/chrome-website/README.md) cover the static sites.

## License

MIT. See [LICENSE](LICENSE).
