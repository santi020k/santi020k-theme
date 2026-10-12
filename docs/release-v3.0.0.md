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

The workspace uses pnpm 10.34.6 with compatible stable catalog updates verified against the npm registry and upstream release notes. The maintenance pass updates Astro to 7.3.8, Vite to 8.3.4, Vitest to 5.0.4, Knip to 6.41.0, Wrangler to 4.149.0, smol-toml to 1.9.1, Node declarations to 26.6.5, and the maintained ESLint configuration patches. TypeScript remains 5.9.3 because the existing lint dependency graph constrains its supported version; lint-staged remains 16.4.0 because 17 requires a higher Node minimum. Oxlint remains aligned with the extension configuration at 1.87.0. Runtime engine contracts remain unchanged.

The full dependency audit now reports no known vulnerabilities, with no advisory exemptions. The owner approved a scoped `ovsx>@vscode/vsce` override to the already-used VSCE 4.0.0. Open VSX 1.2.0 otherwise pulls VSCE 3.9.2 and the unpatched `braces` advisory [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). Sharing VSCE 4 removes that chain and 117 installed packages instead of replacing the vulnerable library with an incompatible API. Remove the override when Open VSX adopts a compatible VSCE dependency upstream.

A local registry regression exercises Open VSX source packaging through VSCE 4, byte-preserving upload of a prebuilt VSIX, duplicate skipping, and rejection propagation. Production authentication, registry acceptance, and publication still require the authorized GitHub workflow. Six redundant security override selectors are removed while retaining the broader patched constraints that cover them.

The previous lint dependency's Node 22.22.3 requirement is absent from the refreshed lockfile. Declared runtime minima remain unchanged; local verification uses Node 22.23.1.

## Verification and recovery

Run `pnpm install --frozen-lockfile`, `pnpm run validate`, `pnpm run validate:links`, and the full dependency audit before publication. Confirm the generated Changesets plan still targets 3.0.0. Review the complete current release diff independently before the first release-branch push or pull request. Required hosted checks and actionable review findings must pass before merging.

On the integrated v3 candidate, local completion checks passed: frozen install; the complete `pnpm run validate` gate, including 74 tests, strict type checks, zero-warning lint, spelling, theme/package checks, SEO, and extension packaging; and website link validation with 102 local references and 31 external URLs. The SEO audit covers 20 pages with no errors or warnings. Changesets must plan VS Code 3.0.0; shared packages and website versions follow their individual changesets and the existing linked-package policy. A fresh independent read-only review of the full v3 diff found one public typography inconsistency. It is fixed by synchronizing the monospace stack across CSS, JSON, JavaScript, and Tailwind, with four regression assertions. The historical audit blocker is addressed by the maintenance pass described above; the v3 branch remains local, with no new hosted release checks or publication.

Desktop and mobile dark/light checks cover the home page, support, getting started, and Starship docs, including no horizontal overflow, theme switching, keyboard tabs, clipboard success and denied access, and mobile navigation. Local compressed Lighthouse results are support 100/100/100/100 and documentation 90/100/100/100 for performance/accessibility/best practices/SEO. These are local candidate measurements, not production evidence. Documentation still loads blocking fonts and CSS. The build's large optional phone-input chunk is not requested by these pages; the initial Lumen runtime transfers approximately 32.6 KB compressed.

Before deleting superseded remote branches, verify their commits are contained in the durably preserved release branch. Preserve active working trees and their source branches. Do not delete `main` or the active redesign branch.

After an approved release, verify tags resolve to the merged commit, both extension registries serve the expected version, the site and sitemap are usable, and download artifacts match the version. Published tags and artifacts remain immutable. Recover a package regression with a new patch release; recover a website regression through a reviewed source revert and the existing deployment workflow. Retain the previous Pages deployment until replacement smoke checks pass.

## Theme family audit follow-up

The [theme family audit](theme-family-audit.md) records architecture, duplication, dependencies, native contrast, and website appearance improvements for this candidate. It consolidates initial appearance setup, fixes OS synchronization and high-contrast CSS generation, corrects Turbo ordering/cache inputs, strengthens VS Code and native artifact validation, and improves Xcode selected/current-line readability. Public exports and theme names stay stable. The Changesets plan still targets VS Code 3.0.0; this work remains local and unpublished. The maintenance pass below addresses the full-audit blocker and refreshes the runtime compatibility evidence.

Audit follow-up verification: the full local validation gate passes with 127 tests across 23 files, zero-warning lint, strict checks, all native validators, SEO, and VSIX packaging. The final preview/clipboard fixes additionally pass the affected website build and 12 browser preview combinations with clipboard success/denied/reset checks. Website links pass with 100 local references and 31 external URLs; appearance/navigation smoke checks pass 36 cases. Independent review's Codex cache-input finding is fixed and verified by changed Turbo hashes. Native Xcode rendering remains unverified without changing user preferences.

## Curated wallpaper pages

Halo adds four minimal circular compositions, and the Minimal v2 pack includes both Halo and
Contour. The gallery features Halo, Contour, Glass, Satin, Ceramic, Tide, Dune, and Veil.
Earlier wallpapers, banners, and logos live in the Classic archive. VS Code screenshot cards
are removed from both gallery lists. Existing wallpaper pages, files, and pack URLs are preserved.

Eight design pages group dark/light and desktop/phone artwork with unique descriptions,
canonical URLs, artwork-specific social previews, ImageObject metadata, related designs,
and image sitemap entries. Downloads include PNG, JPG, and two WEBP quality levels across
three desktop sizes and two phone sizes. Site preparation exports these files from saved
masters; production remains static. Pages disclose resizing and retain native download links
without JavaScript. Rollback can restore the previous gallery while keeping existing assets.

## iPhone, notes, and native editor additions

The candidate adds an iPhone setup pack, a dark/light Obsidian theme, and a dark/light Neovim colorscheme. Dedicated website pages provide downloads, native installation instructions, mobile synchronization guidance, and recovery steps. Product navigation, homepage cards, the footer, sitemap, and SEO checks include all three. Existing routes and wallpaper URLs remain stable. See [implementation and validation boundaries](theme-expansion.md), including physical-device checks still outstanding. Obsidian distribution is a manual download; community directory submission is separate.

## Website visual consistency follow-up

The home hero now uses original Sculpted artwork. Current wallpaper cards pair desktop and phone
compositions and open a preview/download dialog with an explicit new-tab link to the permanent
page. Both surfaces share the same download controls, and modified clicks retain native navigation.
The footer has a compact brand column and a clearer callout; the mobile menu uses the same canonical
logo as the header. Product headers have calmer typography and separated actions.

Product CSS is imported by Astro pages/layouts instead of client-only JavaScript. The previous
production HTML already linked the Terminal stylesheet, supporting a development navigation
cause for the reported unstyled page; interactive confirmation remains pending. Legacy Terminal
footer selectors no longer affect the shared footer.

Local checks pass with 164 tests, strict types, zero-warning lint, builds, SEO, and packaging.
A static audit covers all 29 generated pages for initial CSS, asset existence, labels, unique IDs,
and safe new-tab links. Rendered desktop/mobile and light/dark verification remains pending because
browser access was blocked during this session. These source/build checks do not replace that pass.
No deployment or publication is implied. Revert the focused website change to recover; no data
migration is involved and existing wallpaper URLs are retained.

## Dark hero and shared previews

The home artwork has a matching dark studio edition that follows site appearance, with equal
image dimensions to preserve layout. Both original masters and the exact generation prompts
are retained in `artwork/hub-hero-v3/`.

Gallery previews use `?wallpaper=<design-slug>` to restore the selected modal on arrival or
refresh. Copy preview link uses the current origin; the explicit new-tab action still opens
the permanent wallpaper page. Opening and closing replace the current history entry while
preserving Astro state, other query parameters, and fragments. Unknown designs are ignored.

Local validation passes with 179 tests across 32 files, strict types, zero-warning lint,
spelling, builds, SEO, and packaging. Link validation passes with 1847 local references and
43 external references. A production HTTP/static audit covers all 32 pages, 12 linked
stylesheets, image/source references, accessible labels, the canonical brand lockups, both
hero assets, and all eight shared preview controls. These checks find no missing initial
production CSS or hero images. They do not confirm browser rendering or client navigation:
browser access remains rejected by its URL policy, so desktop/mobile screenshots, responsive
interactions, and clipboard success/denial still require a rendered pass. No deployment is
included. Recovery is a focused revert of this website follow-up; existing downloads remain.

## Product-page polish and appearance wallpapers

Wallpaper details now show complete artwork without an inset decorative frame, with a clearer
heading, adjacent download controls, and an artwork story beside the chooser. Gallery dialogs and
the Terminal configurator use Lumen custom selection lists with native fallbacks. Independent
desktop/phone size lists retain their selected resolutions when switching screen type. Repository
guidance and ESLint reject accidental NativeSelect imports and raw select elements in app UI.

The Neovim code header no longer inherits the outer figure caption margin. Product pages share
calmer headline sizes, readable previews, and open installation rows. Chrome now includes its
existing screenshot in the hero. The iPhone artwork follows the website appearance, and resource
links have separate touch targets. Existing native preview colors and installation behavior remain.

All eight wallpaper designs have paired Mac HEIC downloads and an appearance setup guide.
The iPhone page and bundled guide explain sunrise/sunset Shortcuts and optional Focus pairing.
Mac metadata and both frames are validated with ImageIO, pixel sampling, and source fingerprints;
iPhone wallpaper switching still requires configuring saved pairs on the device. Automatic switching
has not been exercised through macOS Wallpaper settings or on a physical iPhone.

Local checks passed with 186 tests across 34 files after combining the website and documentation
work. Rendered checks covered 13 affected routes at desktop and phone widths in light and dark,
with no horizontal overflow or broken images. Keyboard code tabs, copy feedback, visible focus,
HEIC download bytes, and navigation from the shared gallery dialog were checked. Temporary
screenshots are verification evidence rather than repository assets. The final release-branch gate
must remain green before publication; these results do not imply hosted CI or deployment.

Recovery is a focused revert of the product-page and wallpaper changes. Existing PNG/JPG/WEBP
URLs are retained, no system preferences are changed, and there is no data migration. Regenerate
HEICs with `pnpm run generate:appearance` on macOS and commit the files plus manifest together.

## Studio and Orbit banners

The current gallery adds Studio and Orbit as two new designs with paired light/dark wide
banners and separately composed square covers. Wallpapers, Banners, and Covers filters
keep the ten designs easy to browse; all eight wallpapers, including Dune and Veil, remain
visible. Each new design has an in-gallery preview, a shareable `?banner=` URL, a permanent
page, and PNG/JPG/WEBP downloads at 2160 × 720 or 1200 × 1200 without upscaling. Native links
and complete download lists work without JavaScript. Masters and exact generation prompts
live in `artwork/banners-v1/`; the normal build generates optimized exports and social images.
Earlier banner, logo, and wallpaper URLs remain unchanged. Recovery is a focused revert
of the gallery changes while retaining any published download paths.

## Major-release maintenance

The v3 cleanup consolidates repeated native contrast calculations in one internal tooling
helper and removes native ports' dependency on the full VS Code validator. Invalid color
input now fails explicitly instead of producing an invalid ratio; existing opaque and alpha
compositing results stay unchanged. Native artifact schemas and public exports remain intact.

Root builds select the distributable packages and the single deployed website, avoiding five
redundant standalone site builds. Retained product modules remain available for focused
local development and are still covered by type checking and the consolidated build. Turbo
cache inputs track the shared contrast helper where palette generation depends on it.
No theme, download, or gallery collection is removed by this cleanup.

## Release maintenance and unused code

Unused-code analysis now includes root scripts, nested website routes, and website TypeScript. Internal VS Code script helpers are no longer all marked as entry points, so Knip can report their unused exports. Remove unused path wrappers and internal exports while keeping the public shared-package APIs, older artwork downloads, and native application compatibility files intact. The Open Graph configuration stays an explicit entry point because the external CLI loads it by path.

Recovery is a focused revert of the maintenance commit followed by a frozen install; doing so restores the prior vulnerable development dependency and its publication blocker. No data migration, deployed website change, or package publication is included.

Maintenance verification passes locally: frozen install, the complete `pnpm run validate` gate with 205 tests across 39 files, zero-warning lint, strict types, builds, spelling, SEO, native validators, and VSIX packaging. Full and production dependency audits report no known vulnerabilities. Changesets still plans VS Code 3.0.0. These results do not establish production registry acceptance or hosted CI.
