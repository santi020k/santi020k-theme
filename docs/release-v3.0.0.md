# Release v3.0.0 preparation

The integration branch is `release/v3.0.0`, based on `main` at `28b5dfc`. Changesets plans the VS Code package update from 2.1.4 to 3.0.0; version and changelog generation remains in the existing GitHub release workflow. This candidate is not a published release.

## Consolidation

- Both remote Dependabot branches are contained in the release history: actions at `4b1fd57` and production dependencies at `25ddb1d`.
- The uncommitted root README improvements are preserved and extended with real dark/light and high-contrast previews.
- Three old stashes were inspected. The Zed selection token already exists in the current generator and generated themes; its lockfile additions are already represented. The two older dependency override stashes are duplicated and superseded by newer compatible security resolutions. They remain preserved rather than being reapplied over current versions.
- The complete `feature/sculpted-theme-family` redesign at `0bfce48` is integrated after the owner confirmed v3.0.0. The former v2.2.0 candidate at `ee5d864` is contained in this release; no work is lost when its superseded branch is retired.

## Changes

The Sculpted visual direction is now canonical in `docs/brand-guidelines.md` and the live `/design/` guide. All product websites and terminal documentation use local Montserrat fonts, solid surfaces, quieter headings, neutral primary controls, and violet focus indicators. Fold, Orbit, and Monolith add 12 light/dark desktop/mobile wallpaper compositions, a separate download archive, and collection filters. Classic assets and URLs remain available. Paired editor primary action and focus colors are updated with regenerated variants.

The featured wallpaper edition is now Tide, Dune, and Veil: flowing satin, violet landscapes,
and frosted glass, each with light/dark desktop and separately composed phone artwork. Native
raster masters and prompts are retained; display exports are resized to 3840 × 2160 and
1170 × 2532. Individual PNG/WEBP downloads and a compact WEBP archive replace the first edition
in the homepage and gallery. Earlier Sculpted and Classic files and archives remain available.

The Signature collection adds four branded dark/light desktop and phone compositions, with
the Santi020k terminal prompt set among violet glass forms. It has its own gallery filter,
PNG/WEBP exports, and compact WEBP archive; the approved Tide, Dune, and Veil artwork remains.
Native masters and prompts are in `artwork/signature-v1/`; the shared raster exporter produces
both current collections without changing earlier download URLs.

Satin and Ceramic expand Signature with eight more dark/light desktop and phone wallpapers.
The second Signature archive includes all twelve branded compositions, including the original
glass set. Every first-edition file and archive remains intact; native artwork and prompts
for the added options are retained in `artwork/signature-v2/`.

The Minimal collection adds Contour: four dark/light desktop and phone compositions inspired
by the personal website's quiet canvas, fine outlines, and sculpted corners. A small prompt
detail and shallow matte surface leave generous negative space. Native masters and prompts
live under `artwork/minimal-v1/`; PNG/WEBP display exports, a separate gallery filter, and a
four-file WEBP pack accompany the existing collections without replacing their URLs.

Migration: theme variant names and syntax coverage remain available, while editor action and focus styling changes deliberately for v3. Existing wallpaper links and shared package import paths remain supported. Consumers of the shared website CSS should review typography, spacing, and control styling against the new brand guide.

Published npm Lumen 4.0.0 powers all six website sources. Terminal documentation uses command tabs, clipboard feedback, breadcrumbs, and reading progress. The shared theme toggle now preserves native button or switch state semantics. The support page links to family-wide GitHub issue forms, published releases, and private vulnerability reporting. Canonical metadata, the sitemap, the extension homepage, and contribution instructions match the consolidated website.

Lumen hero particles and restrained content reveals share the personal website signature. Astro page transitions preserve the selected appearance; route controls initialize once per document and dispose global listeners before swaps. Reduced-motion preferences disable particles and animations. External project links retain their new-tab behavior.

Release branches run CI and dependency review. Production publishing and website dispatches accept `main` only. Website deployment validates SEO and links before upload. Changesets refuses to reuse a local release tag pointing to a different commit. Dependabot no longer excludes the Changesets versions already used by this repository.

## Dependency and security boundaries

The workspace uses pnpm 10.34.6 and the newest stable catalog releases compatible with the maintained tool contracts. TypeScript remains 5.9.3 because a transitive lint peer requires TypeScript below 6; Oxlint remains 1.85.0 because the owned extension configuration requires its matching plugin. Public package runtime engine contracts remain unchanged.

The unfiltered dependency audit was reduced from 33 findings to one high-severity finding. Production dependencies have no known advisories. No advisory exemption was added.

**Publishing blocker:** `braces` 3.0.3 has an unpatched stack-exhaustion denial of service advisory, [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). Development paths include GraphQL lint tooling and OVSX's scanning dependencies through glob matching. npm has no patched release, and the latest upstream matching package still depends on this version. A forced replacement would change its API contract. Keep the full audit failing until a compatible upstream fix is available or the responsible owner explicitly approves a documented alternative; do not suppress the advisory.

The declared development Node minimum also needs alignment with the existing lint stack's Node 22.22.3 requirement. This runtime decision is pending owner approval; the actual local runtime used for checks is Node 22.23.1.

## Verification and recovery

Run `pnpm install --frozen-lockfile`, `pnpm run validate`, `pnpm run validate:links`, and the full dependency audit before publication. Confirm the generated Changesets plan still targets 3.0.0. Review the complete current release diff independently before the first release-branch push or pull request. Required hosted checks and actionable review findings must pass before merging.

On the integrated v3 candidate, local completion checks passed: frozen install; the complete `pnpm run validate` gate, including 74 tests, strict type checks, zero-warning lint, spelling, theme/package checks, SEO, and extension packaging; and website link validation with 102 local references and 31 external URLs. The SEO audit covers 20 pages with no errors or warnings. Changesets must plan VS Code 3.0.0; shared packages and website versions follow their individual changesets and the existing linked-package policy. A fresh independent read-only review of the full v3 diff found one public typography inconsistency. It is fixed by synchronizing the monospace stack across CSS, JSON, JavaScript, and Tailwind, with four regression assertions. The full audit still fails on the documented development dependency advisory; the v3 branch remains local, with no new hosted release checks or publication.

Desktop and mobile dark/light checks cover the home page, support, getting started, and Starship docs, including no horizontal overflow, theme switching, keyboard tabs, clipboard success and denied access, and mobile navigation. Local compressed Lighthouse results are support 100/100/100/100 and documentation 90/100/100/100 for performance/accessibility/best practices/SEO. These are local candidate measurements, not production evidence. Documentation still loads blocking fonts and CSS. The build's large optional phone-input chunk is not requested by these pages; the initial Lumen runtime transfers approximately 32.6 KB compressed.

Before deleting superseded remote branches, verify their commits are contained in the durably preserved release branch. Preserve active working trees and their source branches. Do not delete `main` or the active redesign branch.

After an approved release, verify tags resolve to the merged commit, both extension registries serve the expected version, the site and sitemap are usable, and download artifacts match the version. Published tags and artifacts remain immutable. Recover a package regression with a new patch release; recover a website regression through a reviewed source revert and the existing deployment workflow. Retain the previous Pages deployment until replacement smoke checks pass.

## Theme family audit follow-up

The [theme family audit](theme-family-audit.md) records architecture, duplication, dependencies, native contrast, and website appearance improvements for this candidate. It consolidates initial appearance setup, fixes OS synchronization and high-contrast CSS generation, corrects Turbo ordering/cache inputs, strengthens VS Code and native artifact validation, and improves Xcode selected/current-line readability. Public exports and theme names stay stable. The Changesets plan still targets VS Code 3.0.0; this work remains local and unpublished. The existing full-audit and runtime decision boundaries above remain open.

Audit follow-up verification: the full local validation gate passes with 127 tests across 23 files, zero-warning lint, strict checks, all native validators, SEO, and VSIX packaging. The final preview/clipboard fixes additionally pass the affected website build and 12 browser preview combinations with clipboard success/denied/reset checks. Website links pass with 100 local references and 31 external URLs; appearance/navigation smoke checks pass 36 cases. Independent review's Codex cache-input finding is fixed and verified by changed Turbo hashes. Native Xcode rendering remains unverified without changing user preferences.

## Curated wallpaper pages

Halo adds four minimal circular compositions, and the Minimal v2 pack includes both Halo and
Contour. The gallery now features one entry per current design, while Classic wallpapers live
in an archive with their existing file and pack URLs preserved.

Eight design pages group dark/light and desktop/phone artwork with unique descriptions,
canonical URLs, artwork-specific social previews, ImageObject metadata, related designs,
and image sitemap entries. Downloads include PNG, JPG, and two WEBP quality levels across
three desktop sizes and two phone sizes. Site preparation exports these files from saved
masters; production remains static. Pages disclose resizing and retain native download links
without JavaScript. Rollback can restore the previous gallery while keeping existing assets.
