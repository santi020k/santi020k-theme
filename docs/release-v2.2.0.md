# Release v2.2.0 preparation

The integration branch is `release/v2.2.0`, based on `main` at `28b5dfc`. Changesets plans the VS Code package update from 2.1.4 to 2.2.0; version and changelog generation remains in the existing GitHub release workflow. This candidate is not a published release.

## Consolidation

- Both remote Dependabot branches are contained in the release history: actions at `4b1fd57` and production dependencies at `25ddb1d`.
- The uncommitted root README improvements are preserved and extended with real dark/light and high-contrast previews.
- Three old stashes were inspected. The Zed selection token already exists in the current generator and generated themes; its lockfile additions are already represented. The two older dependency override stashes are duplicated and superseded by newer compatible security resolutions. They remain preserved rather than being reapplied over current versions.
- The later `feature/sculpted-theme-family` worktree belongs to an active, separately requested redesign. It is excluded from this candidate; its v3 proposal requires a separate version decision.

## Changes

Published npm Lumen 4.0.0 powers all six website sources. Terminal documentation uses command tabs, clipboard feedback, breadcrumbs, and reading progress. The shared theme toggle now preserves native button or switch state semantics. The support page links to family-wide GitHub issue forms, published releases, and private vulnerability reporting. Canonical metadata, the sitemap, the extension homepage, and contribution instructions match the consolidated website.

Release branches run CI and dependency review. Production publishing and website dispatches accept `main` only. Website deployment validates SEO and links before upload. Changesets refuses to reuse a local release tag pointing to a different commit. Dependabot no longer excludes the Changesets versions already used by this repository.

## Dependency and security boundaries

The workspace uses pnpm 10.34.6 and the newest stable catalog releases compatible with the maintained tool contracts. TypeScript remains 5.9.3 because a transitive lint peer requires TypeScript below 6; Oxlint remains 1.85.0 because the owned extension configuration requires its matching plugin. Public package runtime engine contracts remain unchanged.

The unfiltered dependency audit was reduced from 33 findings to one high-severity finding. Production dependencies have no known advisories. No advisory exemption was added.

**Publishing blocker:** `braces` 3.0.3 has an unpatched stack-exhaustion denial of service advisory, [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). Development paths include GraphQL lint tooling and OVSX's scanning dependencies through glob matching. npm has no patched release, and the latest upstream matching package still depends on this version. A forced replacement would change its API contract. Keep the full audit failing until a compatible upstream fix is available or the responsible owner explicitly approves a documented alternative; do not suppress the advisory.

The declared development Node minimum also needs alignment with the existing lint stack's Node 22.22.3 requirement. This runtime decision is pending owner approval; the actual local runtime used for checks is Node 22.23.1.

## Verification and recovery

Run `pnpm install --frozen-lockfile`, `pnpm run validate`, `pnpm run validate:links`, and the full dependency audit before publication. Confirm the generated Changesets plan still targets 2.2.0. Review the complete current release diff independently before the first release-branch push or pull request. Required hosted checks and actionable review findings must pass before merging.

Local completion checks passed: frozen install; the complete `pnpm run validate` gate, including 66 tests, strict type checks, zero-warning lint, spelling, theme/package checks, SEO, and extension packaging; and website link validation with 94 local references and 32 external URLs. Changesets plans VS Code 2.2.0 and `@santi020k/theme-core` 2.0.2. A fresh read-only Codex reviewer examined the complete candidate against `origin/main` and found no new actionable defects after the lint findings were fixed. The full audit still fails on the documented development dependency advisory; hosted release checks and publication have not been performed.

Desktop and mobile dark/light checks cover the home page, support, getting started, and Starship docs, including no horizontal overflow, theme switching, keyboard tabs, clipboard success and denied access, and mobile navigation. Local compressed Lighthouse results are support 100/100/100/100 and documentation 90/100/100/100 for performance/accessibility/best practices/SEO. These are local candidate measurements, not production evidence. Documentation still loads blocking fonts and CSS. The build's large optional phone-input chunk is not requested by these pages; the initial Lumen runtime transfers approximately 32.6 KB compressed.

Before deleting superseded remote branches, verify their commits are contained in the durably preserved release branch. Preserve active working trees and their source branches. Do not delete `main` or the active redesign branch.

After an approved release, verify tags resolve to the merged commit, both extension registries serve the expected version, the site and sitemap are usable, and download artifacts match the version. Published tags and artifacts remain immutable. Recover a package regression with a new patch release; recover a website regression through a reviewed source revert and the existing deployment workflow. Retain the previous Pages deployment until replacement smoke checks pass.
