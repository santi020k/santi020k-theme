# Contributing

## Setup

```bash
pnpm install --frozen-lockfile
```

## Validate Changes

Run the full validation before opening a PR or publishing:

```bash
pnpm run validate
```

This checks the theme JSON files, builds the websites, validates the Chrome theme package, and packages the VS Code extension locally.

For a faster package metadata check, run:

```bash
pnpm run validate:marketplace
```

## Changesets

For user-visible changes, add a changeset:

```bash
pnpm run changeset
```

Use `patch` for fixes, `minor` for new theme coverage or project capabilities, and `major` only for breaking marketplace or compatibility changes.

## Environment Files

- `.env.example` is the tracked template for local release and deploy variables.
- `.env` is ignored and stores local secret values such as `VSCE_PAT` and `OVSX_PAT`.
- The VS Code extension release uses `VSCE_PAT` and `OVSX_PAT`.
- The Chrome Web Store release uses the `CHROME_WEBSTORE_*` variables.
- Website deploys should use app-specific Cloudflare Pages project names for the hub, VS Code site, and Chrome site.

## Local Extension Testing

Open this repository in VS Code and press `F5` to launch an Extension Development Host. After editing a theme file, reload the development host window to see the latest colors.

The VS Code extension package lives in `packages/santi020k-theme`, the Chrome theme package lives in `packages/santi020k-chrome-theme`, the hub website lives in `apps/website`, the VS Code website lives in `apps/vscode-website`, and the Chrome website lives in `apps/chrome-website`.

## Release Checklist

- Run `pnpm run validate`
- Merge feature PRs with changesets into `main`
- Merge the generated release PR
- The release workflow publishes the new version to the VS Code Marketplace with `VSCE_PAT`
- The release workflow publishes the same VSIX to Open VSX with `OVSX_PAT`
- The websites deploy to Cloudflare Pages with `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, and the app-specific project variables from `.env.example`
