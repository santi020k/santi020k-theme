# santi020k-theme

Monorepo for the Santi020k theme family: the VS Code extension, the Chrome browser theme, and their websites.

## Workspaces

- `packages/santi020k-theme` - published VS Code extension package
- `packages/santi020k-chrome-theme` - Chrome Web Store theme package
- `apps/website` - theme hub for `theme.santi020k.com`
- `apps/vscode-website` - VS Code theme site for `vscode.santi020k.com`
- `scripts` and `tests` - repository validation, release, and theme tooling

## Common Commands

```bash
pnpm install
pnpm run validate
pnpm run package:extension
pnpm run site:dev
pnpm run site:vscode:dev
pnpm run commit
```

The full extension README lives in [`packages/santi020k-theme/README.md`](packages/santi020k-theme/README.md).
