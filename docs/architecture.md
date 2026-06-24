# Santi020k Theme Architecture

This repository is a single pnpm workspace and a single Turbo graph. Do not add nested Turbo repos for each theme family member.

## Decision

Use one root monorepo with two kinds of workspaces:

- `packages/*` are distributable theme artifacts and package-specific tooling.
- `apps/*` are deployable websites.

Each future public theme surface should follow this pairing:

| Surface | Theme package | Website app |
| --- | --- | --- |
| Theme hub | none | `apps/website` |
| VS Code | `packages/santi020k-theme` | `apps/vscode-website` |
| Chrome | `packages/santi020k-chrome-theme` | `apps/chrome-website` |
| Future surface | `packages/santi020k-<surface>-theme` | `apps/<surface>-website` |

## Why One Root Turbo

One root Turbo graph keeps dependency caching, CI filtering, lockfile management, and developer commands simple. Nested Turbo repos would duplicate package manager state, make cross-theme asset sharing harder, and blur whether a command should run from the root or from a subproject.

Workspace-local scripts still provide the isolation we want:

- each package owns its own `build`, `validate`, `package`, and sync scripts;
- each app owns its own `dev`, `build`, and `preview` scripts;
- the root `validate` command orchestrates release readiness across all workspaces.

## Ownership Rules

- Put store manifests, publish assets, zipping scripts, and package validation in `packages/<surface>-theme`.
- Put marketing pages, static website assets, SEO metadata, and site-specific Vite config in `apps/<surface>-website`.
- Put shared cross-project validation and release scripts in root `scripts/`.
- Add reusable libraries under `packages/<name>` only when at least two workspaces need the same code.

## CI And Release Boundaries

- Validation can run from the root because it proves the whole workspace still composes.
- Release publishing should stay package-driven through Changesets and only run when package/release paths change.
- Website deployment should be app-specific. A hub-only change should not deploy the VS Code or Chrome sites, and a Chrome package-only change should not deploy a website unless assets or website copy changed.

Recommended workflow split:

- `validate.yml`: root validation for PR confidence.
- `release.yml`: Changesets and marketplace publishing for package/release changes only.
- website deploy workflows: one job per app, path-filtered to that app and shared config.

## Naming

Keep names literal and boring:

- package: `santi020k-<surface>-theme`
- website app: `@santi020k/santi020k-<surface>-theme-website`
- root scripts: `site:<surface>:dev`, `site:<surface>:build`, `site:<surface>:preview`

The hub keeps the shorter package name `@santi020k/santi020k-theme-website` because it owns `theme.santi020k.com`.
