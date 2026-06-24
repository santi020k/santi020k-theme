# santi020k-theme

Monorepo for the Santi020k theme family: the VS Code extension, the Chrome browser theme, and their websites.

## Workspaces

- `packages/santi020k-theme` - published VS Code extension package
- `packages/santi020k-chrome-theme` - Chrome Web Store theme package
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

The full extension README lives in [`packages/santi020k-theme/README.md`](packages/santi020k-theme/README.md).

The project architecture is documented in [`docs/architecture.md`](docs/architecture.md).
