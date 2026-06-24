# santi020k-theme

Monorepo for the Santi020k theme family: the VS Code extension, the Chrome browser theme, and their websites.

## Workspaces

- `packages/santi020k-theme` - published VS Code extension package
- `packages/santi020k-chrome-theme` - Chrome Web Store theme package
- `packages/theme` - public `@santi020k/theme` token and asset package
- `packages/theme-core` - public `@santi020k/theme-core` helpers for token and asset packages
- `apps/website` - theme hub for `theme.santi020k.com`
- `apps/vscode-website` - VS Code theme site for `vscode.santi020k.com`
- `apps/chrome-website` - Chrome theme site for `chrome.santi020k.com`
- `packages/santi020k-theme/scripts` and `packages/santi020k-theme/tests` - VS Code validation, release, and theme tooling
- `apps/vscode-website/scripts` and `apps/vscode-website/tests` - VS Code website version sync tooling

## Common Commands

```bash
pnpm install
pnpm run validate
pnpm run package:extension
pnpm run site:dev
pnpm run site:vscode:dev
pnpm run site:chrome:dev
pnpm run commit
```

## Brand Guidance

Use [`docs/brand-guidelines.md`](docs/brand-guidelines.md) as the source of truth for product names, palette language, voice, screenshots, assets, website consistency, and AI agent guidance.

## Versioning And Environment

- VS Code theme releases are managed by Changesets for `packages/santi020k-theme`.
- Chrome theme releases keep `packages/santi020k-chrome-theme/package.json` and both Chrome manifests in sync.
- Website app package versions are private workspace metadata, not public theme versions.
- Copy `.env.example` to `.env` for local release or deploy credentials; `.env` stays ignored.

The full extension README lives in [`packages/santi020k-theme/README.md`](packages/santi020k-theme/README.md).

The project architecture is documented in [`docs/architecture.md`](docs/architecture.md).
