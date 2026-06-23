# santi020k-theme

Monorepo for the `santi020k-theme` VS Code color theme extension and its preview website.

## Workspaces

- `packages/santi020k-theme` - published VS Code extension package
- `apps/website` - marketing and preview website
- `scripts` and `tests` - repository validation, release, and theme tooling

## Common Commands

```bash
pnpm install
pnpm run validate
pnpm run package:extension
pnpm run site:dev
pnpm run commit
```

The full extension README lives in [`packages/santi020k-theme/README.md`](packages/santi020k-theme/README.md).
