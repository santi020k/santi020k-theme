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

This checks types, theme output, accessibility, SEO, spelling, tests, lint, and package readiness; builds the consolidated website; and packages the VS Code extension locally. Run `pnpm audit --audit-level=low` to check the complete dependency graph without advisory exemptions.

For a faster package metadata check, run:

```bash
pnpm run validate:marketplace
```

## Brand Consistency

Read [`docs/brand-guidelines.md`](docs/brand-guidelines.md) before changing colors, product copy, screenshots, icons, website UI, store metadata, or shared assets. That file is the canonical brand source of truth across all packages and apps.

## Changesets

For user-visible changes, add a changeset:

```bash
pnpm run changeset
```

Use `patch` for fixes, `minor` for new theme coverage or project capabilities, and `major` only for breaking marketplace or compatibility changes.

## Environment Files

- `.infisical.json` identifies the project and the `dev` environment for local work. Use the authenticated Infisical CLI to inject needed values at runtime, for example `infisical run --env=dev -- pnpm run site:dev`.
- `.env.example` documents variable names and safe placeholders. Never copy secret values into tracked files or command output. Existing ignored local files must remain private.
- The VS Code extension release uses `VSCE_PAT` and `OVSX_PAT`.
- The Chrome Web Store release uses the `CHROME_WEBSTORE_*` variables.
- The only production website deployment is `apps/website/dist/` on `theme.santi020k.com`. Former product subdomains redirect to their corresponding routes. See [the website guide](apps/website/WEBSITE.md).

## Local Extension Testing

Open this repository in VS Code and press `F5` to launch an Extension Development Host. After editing a theme file, reload the development host window to see the latest colors.

The VS Code extension package lives in `packages/santi020k-theme`, the Chrome theme package lives in `packages/santi020k-chrome-theme`, the hub website lives in `apps/website`, the VS Code website lives in `apps/vscode-website`, and the Chrome website lives in `apps/chrome-website`.

## Release Checklist

Release preparation happens on `release/v<semver>` from current `main`. Preserve and inspect dirty work, branches, working trees, and stashes before consolidation. A patch release fixes behavior; a minor release adds coverage or capabilities.


- Run `pnpm run validate`
- Review the complete release diff independently and open a pull request into `main`
- Wait for current required checks and resolve review findings before merging
- Changesets creates the version pull request; `pnpm run version-packages` generates version and changelog changes, never hand-edit them
- Merge the version pull request after validation
- The release workflow publishes the new version to the VS Code Marketplace with `VSCE_PAT`
- The release workflow publishes the same VSIX to Open VSX with `OVSX_PAT`
- The consolidated website deploys to Cloudflare Pages with `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, and `CLOUDFLARE_PAGES_PROJECT_THEME_HUB`
- Publishing and production website dispatches accept only `main`; release-branch pushes run CI without publishing
- Verify tags, registry versions, downloadable artifacts, canonical routes, and sitemap after release; a passing workflow alone does not prove the published result
- Published version tags and artifacts are immutable. Recover with a new patch release. For a website regression, revert the source change through a reviewed PR and rerun the deployment workflow; preserve the previous Pages deployment until the replacement passes smoke checks
