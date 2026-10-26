# Contributing

## Setup

```bash
pnpm install --frozen-lockfile
```

## Quality and Git hooks

`pnpm install` runs Husky to activate `.husky/_` as Git's hook directory. The tracked
launchers enforce these checks:

- `pre-commit`: zero-warning ESLint on staged JavaScript, TypeScript, JSX, and Astro files.
- `commit-msg`: Commitprompt validation of the exact message supplied by Git.
- `pre-push`: the full dependency audit followed by `pnpm run validate`.

Verify the active hook directory with `git config --get core.hooksPath`; it should print
`.husky/_`. Keep the hooks enabled and correct failures before committing or pushing.

Quality is a separately installed CLI, not a pnpm dependency. With `quality --version`
available, run `pnpm run quality:check` to execute the dependency audit and canonical
repository validation declared in `quality.yml`. CI uses the same audit and validation
scripts through the existing Quality pnpm setup action.

The hook steps in `quality.yml` support direct execution with `quality hooks run`, but
Husky currently owns activation. `quality hooks status` therefore reports that Quality's
managed launchers are inactive; this does not mean the Husky hooks are missing. Do not
install a second hook manager over the active setup. The standard `pnpm run validate`
command and Husky hooks work without the separately installed Quality CLI.

## Validate Changes

Run the full validation before opening a PR or publishing:

```bash
pnpm run validate
```

This checks types, theme output, accessibility, SEO, spelling, tests, lint, and package readiness; builds the consolidated website; and packages the VS Code extension locally. Run `pnpm run audit:dependencies` for the complete dependency gate. It retains the low-severity threshold and verifies the documented [MSAL security backport](docs/security-msal-backport.md) before classifying that exact upstream advisory; the raw audit still reports it.

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

## Affected pull-request validation

`pnpm run ci:check` keeps the existing full validation command for release branches,
pushes, manual dispatches, shared files, unknown paths, and incomplete Git history.
Only source, public assets, or tests in the existing website workspaces can select
fewer checks. Git merge-base comparison includes both sides of renames; local
`HEAD` also includes staged, unstaged, and untracked files.

Website selection still runs every test, all type checks, the complete dependency
build graph, repository lint/spelling/Knip, brand consistency, marketplace website
version checks, accessibility reporting, and SEO validation. It skips independent
theme-port validators and VSIX packaging. The selected list is derived from the
canonical validation script, so new checks are retained; unrecognized command
syntax falls back to full validation. Dependency auditing and native macOS wallpaper
validation keep their existing mandatory CI jobs. `pnpm run ci:check --full`,
release publishing, and the pre-push hook retain complete validation.

A local macOS/Node 22 benchmark at release commit `697b0c1` measured the
complete `ci:check` lane for a website edit. Two alternating warm-cache pairs
reduced the median from **78.44s full to 53.07s affected (32.3%)**. The initial
cold-cache pair was **96.56s full versus 141.12s affected**, so this run demonstrates
no cold-cache improvement; host contention affected the measurements. Both modes
used two Vitest workers, retained identical tests and timeouts, and used separate
Turbo caches with remote caching disabled. Dependency installation, the separate
audit job, and native macOS wallpaper validation are excluded. The earlier
unbounded-worker attempt timed out under host contention and is not a passing
benchmark. These are local lane timings, not a prediction of total GitHub CI time.

If selection regresses, force full validation or revert the focused selection
change through a reviewed PR. Never weaken release validation or replace a
published version to recover.
