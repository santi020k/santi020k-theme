# Changelog

## 3.0.0

### Major Changes

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Adopt the Sculpted visual direction from the personal website v4: medium-weight Montserrat typography, a shared 72rem grid, solid surfaces, neutral primary controls, and visible violet focus. Add a live visual guide and align product pages and terminal documentation while preserving their interactions.
  
  Add Fold, Orbit, and Monolith wallpapers in paired light/dark desktop/mobile formats, with a separate Sculpted download archive and gallery filters. Keep Classic wallpaper paths and downloads available. Refresh paired VS Code button and focus colors and regenerate derived themes.
  
  Migration: v3 changes the visual treatment of editor primary actions and focus indicators; syntax and installed theme variant names remain available. Websites adopt the Sculpted layout and typography. Classic wallpaper URLs and downloads remain available alongside the new collection. Shared-package consumers must replace the removed `tailwindTheme` export with `theme` and VS Code `.svg` screenshot imports with the corresponding `.png` paths, as documented in the compatibility cleanup changeset.
  
  Keep the Fira Code monospace stack consistent across CSS, JSON, JavaScript, and Tailwind exports.

### Minor Changes

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Upgrade the theme websites to the published Lumen 4 packages and improve terminal documentation with accessible command tabs, clipboard feedback, breadcrumbs, and reading progress. Add family-wide GitHub feedback links and a support page, refresh the visual repository README, and correct fresh Starship setup instructions.
  
  Refresh compatible dependencies, remove stale advisory exemptions, review canonical metadata and sitemap routes, validate release branches, and restrict production publishing and deployment dispatches to main. Refuse to reuse a release tag pointing to a different commit. The subsequent release maintenance pass removes the vulnerable Open VSX dependency chain; see the release preparation notes for compatibility checks and runtime evidence.

### Patch Changes

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Replace cluttered VS Code screenshots with matching real captures of all four theme modes. Use a readable TypeScript sample, a compact Explorer, and lossless PNG masters without repeated occurrence highlights or clipped code. Preserve native image proportions and synchronize website, shared-package, and marketplace previews.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refresh package READMEs with the shared theme identity, section navigation, and resource links. Preserve installation instructions and marketplace image URLs, and replace an unavailable Chrome screenshot with the product preview link. Add full-width light and dark banners and a centered badge row to the root, app, and package guides.

- [#68](https://github.com/santi020k/santi020k-theme/pull/68) [`5ec2ee0`](https://github.com/santi020k/santi020k-theme/commit/5ec2ee060fc23658a3a11c1d2749a11c69f7d226) Thanks [@santi020k](https://github.com/santi020k)! - Restore the merged workflow commit before creating the VS Code release tag after Changesets prepares a version branch.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Extend staged linting to TypeScript, JSX, and Astro sources. Run the full dependency audit before pushing and share the audit command between CI and Quality. Document the active Husky hooks and the separately installed Quality CLI, with regression coverage for hook arguments and failure propagation.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Replace synthetic VS Code previews with real editor screenshots in dark, light, and both high-contrast modes. Synchronize previews from canonical captures and preserve existing PNG and SVG asset URLs.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refresh compatible build, test, lint, and deployment dependencies. Remove unused internal path helpers and redundant security override selectors, and extend unused-code analysis to root scripts, nested routes, and website TypeScript.
  
  Share the existing VSCE 4 dependency with Open VSX to remove the unpatched braces dependency chain. Verify source packaging, prebuilt artifact upload, duplicate handling, and registry failures against a temporary local registry. The full dependency audit reports no known vulnerabilities; production publishing remains in the existing GitHub workflow.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Remove unused compatibility aliases and redundant screenshot wrappers for v3. The Tailwind entry point exports only `theme`; replace imports of `tailwindTheme` with `theme`. VS Code previews are lossless PNGs; replace `.svg` screenshot imports with the corresponding `.png` paths. Remove the stale Chrome incognito JPG manifest entry in favor of the existing PNG.
  
  Repository scripts use `site:dev` instead of the removed `sites:dev` alias. Internal contrast tooling uses `scripts/lib/color-contrast.mjs` directly. Add asset manifest integrity checks and remove the duplicate-export lint exemption.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Consolidate native port and VS Code contrast calculations in shared internal tooling, reject malformed colors explicitly, and preserve transparency compositing. Build the distributed packages and consolidated website without redundant standalone product site builds; keep product development commands and full source type checking.
  
  This maintenance joins the existing VS Code 3.0.0 major release changeset. Installed theme names, package exports, and download URLs remain unchanged.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Polish native theme validation and shared appearance behavior for the next release. Improve Xcode syntax readability on selected and current lines, remove an unsupported Zed property, and extend contrast regression checks. Fix system appearance synchronization, storage-denied initialization, and high-contrast CSS generation; consolidate website appearance startup and correct build ordering and cache inputs across product modules. Correct preview JSON types and handle settings clipboard success and denied access safely.

## 2.1.4

### Patch Changes

- [#55](https://github.com/santi020k/santi020k-theme/pull/55) [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368) Thanks [@santi020k](https://github.com/santi020k)! - Synchronize the published Marketplace icon with the canonical Santi020k brand mark.

- [#56](https://github.com/santi020k/santi020k-theme/pull/56) [`b5f3aa8`](https://github.com/santi020k/santi020k-theme/commit/b5f3aa8f076f48e00d46b5bc07b0b6ae322adfd1) Thanks [@santi020k](https://github.com/santi020k)! - Migrate the release workflow and custom npm publisher to the Changesets Action v2 contract so automated tags and GitHub Releases are created reliably.

- [#57](https://github.com/santi020k/santi020k-theme/pull/57) [`027b4ab`](https://github.com/santi020k/santi020k-theme/commit/027b4ab6a22771e28308f11f57e178da814b55f7) Thanks [@santi020k](https://github.com/santi020k)! - Use Changesets Action's Git CLI push mode so release pull requests remain compatible with repository branch-deletion protection.

## 2.1.3

### Patch Changes

- [`17fb116`](https://github.com/santi020k/santi020k-theme/commit/17fb116966a18399e384ed492168450620674980) - Prevent parallel generated-theme tests from reading partially written JSON files by publishing theme artifacts atomically.

## 2.1.2

### Patch Changes

- [`226883f`](https://github.com/santi020k/santi020k-theme/commit/226883f07ec185b237f52618744fbd7c253f59ec) - Make terminal releases compatible with Homebrew 6 formula auditing, allow manual runs to recover an interrupted tag release, and create release tags from package-version changes instead of registry-specific publish output.

## 2.1.1

### Patch Changes

- [`0865a90`](https://github.com/santi020k/santi020k-theme/commit/0865a902739a79335ea5ba5428aeebe21a5979a0) - Install Zsh in the Linux release job so the terminal CLI lifecycle validation can run before packages are published.

## 2.1.0

### Minor Changes

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Add instant web previews, settings recipes, compatibility and accessibility evidence, downloadable wallpapers, generated terminal ports, and a contributor port starter.

### Patch Changes

- [`aa11652`](https://github.com/santi020k/santi020k-theme/commit/aa11652bca5acd280d5f5696894c20ab5b6da542) - Prevent release PR updates from attempting to create Terminal release tags before packages are published.

## 2.0.3

### Patch Changes

- [#23](https://github.com/santi020k/santi020k-theme/pull/23) [`38f609a`](https://github.com/santi020k/santi020k-theme/commit/38f609acdf26bb4c2bfc99e92c4b992a2c0c083d) Thanks [@santi020k](https://github.com/santi020k)! - Replace retired shields.io VS Marketplace version badge with badgen.net. The shields.io `visual-studio-marketplace` endpoint was retired and rendered "retired badge" in the marketplace listing.

- [#23](https://github.com/santi020k/santi020k-theme/pull/23) [`38f609a`](https://github.com/santi020k/santi020k-theme/commit/38f609acdf26bb4c2bfc99e92c4b992a2c0c083d) Thanks [@santi020k](https://github.com/santi020k)! - Refresh the VS Code theme preview images with richer editor mockups and add a repeatable generator for the rendered assets.

## 2.0.2

### Patch Changes

- [#21](https://github.com/santi020k/santi020k-theme/pull/21) [`9f0e5e3`](https://github.com/santi020k/santi020k-theme/commit/9f0e5e3a773a797aad6ce2a4acef4fd668b56e7a) Thanks [@santi020k](https://github.com/santi020k)! - Replace retired shields.io VS Marketplace version badge with badgen.net. The shields.io `visual-studio-marketplace` endpoint was retired and rendered "retired badge" in the marketplace listing.

- [#21](https://github.com/santi020k/santi020k-theme/pull/21) [`9f0e5e3`](https://github.com/santi020k/santi020k-theme/commit/9f0e5e3a773a797aad6ce2a4acef4fd668b56e7a) Thanks [@santi020k](https://github.com/santi020k)! - Refresh the VS Code theme preview images with richer editor mockups and add a repeatable generator for the rendered assets.

## 2.0.1

### Patch Changes

- [#19](https://github.com/santi020k/santi020k-theme/pull/19) [`3baf4b7`](https://github.com/santi020k/santi020k-theme/commit/3baf4b7b0e6e1c00f1c70081df8fa43860d58e5a) Thanks [@santi020k](https://github.com/santi020k)! - Fix preview images and badge URLs in the marketplace README. Preview images now use absolute `raw.githubusercontent.com` URLs so they render correctly in the VS Code Marketplace (relative paths are not resolved by the marketplace renderer). Badge URLs are pinned to `shields.io` with an inline comment and AGENTS.md rules to prevent future regressions from AI assistants substituting defunct alternatives.

## 2.0.0

### Major Changes

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Launch the v2 theme-family architecture: move the Chrome theme into the monorepo, add a theme hub for theme.santi020k.com, and move the VS Code theme site metadata to vscode.santi020k.com.

### Minor Changes

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Add comment review icon color coverage and strengthen package validation for generated theme variants.

### Patch Changes

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Automate Chrome Web Store packaging and release submission for the Chrome theme listings.

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Improve package and website README documentation across the theme monorepo.

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Refresh shared theme assets with cleaner Santi020k project artwork, dark Chrome store media, and a flat VS Code extension icon.

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Move the project into a pnpm monorepo layout and add Husky, Commitizen, commitlint, lint-staged, Turbo, Knip, Renovate, and GitHub Actions dependency upkeep.

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Organize VS Code theme preview assets and add a high contrast light marketplace preview.

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Improve ghost text and website preview contrast, tighten packaged VSIX contents, and refresh dependency audit overrides.

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Add a token-source generation step for the VS Code base themes so dark, light, and high-contrast dark variants are generated from centered Santi020k theme sources.

## 1.6.0

### Minor Changes

- [#12](https://github.com/santi020k/santi020k-theme/pull/12) [`2a7c464`](https://github.com/santi020k/santi020k-theme/commit/2a7c46484154cc368b93b0df7ee8e02bcff76cbd) Thanks [@santi020k](https://github.com/santi020k)! - Visual polish and usability improvements across all 12 theme variants:

  **Find match vs. selection disambiguation**

  - Dark: `editor.findMatchBackground` changed from purple `#5a0fdb80` to amber `#e8b44a60` — the active search match is now visually distinct from selected text (which stays purple)
  - Dark: `editor.findMatchHighlightBackground` aligned to amber family `#e8b44a25` for consistent search highlighting
  - Light: same treatment using the theme's amber `#c07a10` for all find-match surfaces (editor, minimap, overview ruler, terminal, search editor)
  - All find-match overview ruler, minimap, and terminal indicators updated to match per theme

  **Current line highlight**

  - Dark & HC-Dark: added `editor.lineHighlightBackground` (`#ffffff08` / `#ffffff0a`) — a barely-there white wash that marks the cursor row without competing with syntax colors
  - Light: added `#00000008` — the equivalent subtle dark wash for the light palette
  - HC-Light: propagated automatically via generator

  **Ghost text (AI autocomplete) readability**

  - Dark & Light: `editorGhostText.foreground` alpha bumped from `88` (53%) to `9a` (60%) for marginally better readability of inline suggestions

  **Diff editor visibility**

  - All themes: inserted/removed line backgrounds lifted from ~8% opacity to ~13%; gutter indicators lifted from ~19% to ~25%
  - Makes diff hunks immediately readable without overwhelming the syntax colors

  **Debug inline values**

  - Dark: `editor.inlineValuesBackground` from `#322b4040` (25%) to `#322b4058` (35%)
  - Light: from `#e3dff060` (37%) to `#e3dff095` (58%)
  - HC-Dark: from `#602cba40` (25%) to `#602cba58` (35%)
  - Debug variable values shown inline during a debug session are now clearly legible

  **Indent guides**

  - Dark: inactive guide from 8% → 12% opacity; Light: 6% → 9% — structural indentation is more visible at a glance

  **Peek view match highlights**

  - Dark: `peekViewResult.matchHighlightBackground` from `#32195d50` to `#5a0fdb45` — matched text in peek result panel is now legible against the dark background
  - Light: from `#6319be25` to `#6319be38` — same improvement for the light panel

  **Symbol highlight**

  - Added missing `editor.symbolHighlightBackground` token to dark (`#752df025`), light (`#6319be12`), and HC-Dark (`#6030b825`) — clicking a symbol now shows a consistent accent glow

  **Code lens foreground (dark)**

  - `editorCodeLens.foreground` changed from neutral grey `#8d8896` to purple-grey `#9080a8` — reference count annotations align with the violet palette instead of feeling disconnected

## 1.4.0

### Minor Changes (v1.4.0)

- [#6](https://github.com/santi020k/santi020k-theme/pull/6) [`a691ed9`](https://github.com/santi020k/santi020k-theme/commit/a691ed969db476eca7e9ab5d5e867abc1760297e) Thanks [@santi020k](https://github.com/santi020k)! - Add semantic token modifiers and new VS Code workbench tokens.

  **Semantic token modifiers (both variants)**

  - `*.abstract` — italic style, marking abstract classes and methods as conceptual
  - `*.async` — teal foreground (`#89b8c8` dark / `#0870a0` light) to distinguish async functions and methods at a glance
  - `*.defaultLibrary` — cooler foreground (`#a0c8e0` dark / `#4a1a98` light) for built-in standard library symbols (e.g. `console`, `Array`, `Math` in TypeScript)
  - `*.static` — bold style, making static members visually distinct from instance members

  All new foreground colors pass WCAG AA (≥ 4.5:1) against their respective editor backgrounds.

  **Language-specific TextMate rules (both variants)**

  - Rust lifetimes (`entity.name.lifetime.rust`, `punctuation.definition.lifetime.rust`) — amber/italic, making `'a`, `'static` and friends immediately recognisable
  - Rust attributes (`meta.attribute.rust`, `punctuation.definition.attribute.rust`) — muted purple/italic, consistent with decorator styling in other languages
  - Go built-in functions (`support.function.builtin.go`) — teal, distinguishing `make`, `len`, `append` from user-defined functions
  - Go package names (`entity.name.package.go`) — namespace purple, aligning with the existing namespace semantic token

  **New workbench tokens (both variants)**

  - `editorHoverWidget.highlightForeground` — accent color for matched text inside hover documentation widgets
  - `editorActionList.background / foreground / focusBackground / focusForeground` — the floating refactor / code-action picker that appears inline in VS Code 1.90+

  **New variant: santi020k hc dark**

  A high contrast dark variant (`hc-black` uiTheme) built on the same purple-indigo palette:

  - Backgrounds shifted toward near-black (`#0c0818` editor, `#080514` panels)
  - Foreground lifted to near-white (`#f0e8ff`)
  - Borders use vivid purple (`#6030b8`) instead of the muted `#3a2556`
  - All accent colors fully saturated — e.g. teal `#60c8e0`, amber `#ffc060`, red `#ff7070`
  - Indent guides made visible (`#6030b840` / `#6030b820`)
  - Unused-code border shown (`#a860f040`)
  - All token colors validated at WCAG AA (≥ 4.5:1) against the darker editor background

### Patch Changes (v1.4.0)

- [#6](https://github.com/santi020k/santi020k-theme/pull/6) [`a691ed9`](https://github.com/santi020k/santi020k-theme/commit/a691ed969db476eca7e9ab5d5e867abc1760297e) Thanks [@santi020k](https://github.com/santi020k)! - Ensure release automation creates and pushes a `v<version>` GitHub tag after publishing.

- [#6](https://github.com/santi020k/santi020k-theme/pull/6) [`a691ed9`](https://github.com/santi020k/santi020k-theme/commit/a691ed969db476eca7e9ab5d5e867abc1760297e) Thanks [@santi020k](https://github.com/santi020k)! - Fix moderate security vulnerability in `uuid` (GHSA-w5hq-g745-h8pq) by updating `@azure/msal-node`.

- [#6](https://github.com/santi020k/santi020k-theme/pull/6) [`a691ed9`](https://github.com/santi020k/santi020k-theme/commit/a691ed969db476eca7e9ab5d5e867abc1760297e) Thanks [@santi020k](https://github.com/santi020k)! - Add PR auto-labeling, issue assignment, stale-thread cleanup, and dependency review workflows.

- [#6](https://github.com/santi020k/santi020k-theme/pull/6) [`a691ed9`](https://github.com/santi020k/santi020k-theme/commit/a691ed969db476eca7e9ab5d5e867abc1760297e) Thanks [@santi020k](https://github.com/santi020k)! - Add GitHub pull request and issue templates for theme, release, and bug-report workflows.

- [#6](https://github.com/santi020k/santi020k-theme/pull/6) [`a691ed9`](https://github.com/santi020k/santi020k-theme/commit/a691ed969db476eca7e9ab5d5e867abc1760297e) Thanks [@santi020k](https://github.com/santi020k)! - Align the website with the new high-contrast variant, improve mobile navigation, add the HC preview image, extend language/file-format highlighting, add modern workbench token coverage, and require HC assets plus theme color parity in validation.

- [#6](https://github.com/santi020k/santi020k-theme/pull/6) [`a691ed9`](https://github.com/santi020k/santi020k-theme/commit/a691ed969db476eca7e9ab5d5e867abc1760297e) Thanks [@santi020k](https://github.com/santi020k)! - Improve marketplace metadata with richer discovery keywords, sponsor links, and stricter package readiness checks.

## 1.3.0

### Minor Changes (v1.3.0)

- [#5](https://github.com/santi020k/santi020k-theme/pull/5) [`19cefc9`](https://github.com/santi020k/santi020k-theme/commit/19cefc973f544443318284767e3ee9a45ca2a334) Thanks [@santi020k](https://github.com/santi020k)! - Add automated token contrast validation and fix accessibility issues.

  - **validate-themes**: token contrast check — all `tokenColors` and `semanticTokenColors` foregrounds are now checked against `editor.background` at runtime (3:1 for comments/punctuation/blockquotes, 4.5:1 for all other syntax tokens)
  - **validate-themes**: expand workbench contrast pairs to include `terminal`, `statusBar`, `tab.active`, and `button.secondary` foreground/background pairs
  - **Dark theme comments**: raise from `[#584878](https://github.com/santi020k/santi020k-theme/issues/584878)` (2.38:1) to `#7060a8` (3.58:1) so they pass the 3:1 floor and are readable in long sessions
  - **JSON color differentiation** (both themes): string values and numbers now use distinct hues instead of the same purple family — dark: strings → cyan `#89b8c8`, numbers → amber `#e8b44a`; light: strings → forest green `#1a6a3e`, numbers → burnt amber `#b05500`; keys retain their purple

- [#5](https://github.com/santi020k/santi020k-theme/pull/5) [`19cefc9`](https://github.com/santi020k/santi020k-theme/commit/19cefc973f544443318284767e3ee9a45ca2a334) Thanks [@santi020k](https://github.com/santi020k)! - 1.3.0 — Contrast corrections and expanded token coverage

  **Contrast fixes (WCAG)**

  - Dark: raise `activityBar.inactiveForeground` from [#584878](https://github.com/santi020k/santi020k-theme/issues/584878) to #6b5a90 (2.44→3.0:1 on activity bar bg)
  - Dark: raise `terminal.ansiBlack` from #6b5a90 to #7868a0 for readable ANSI output
  - Light: raise `tab.inactiveForeground`, `activityBar.inactiveForeground`, `breadcrumb.foreground` from #9880c0 to #7a5fb0 (2.60→3.1:1 on lavender surfaces)
  - Light: raise `panelTitle.inactiveForeground` from #9880c0 to #7060a8 (2.94→3.1:1)

  **New workbench token coverage**

  - `editorSuggestWidget.selectedForeground` (both variants)
  - `chat.responseCodeBackground` — themed code blocks in Copilot chat
  - `scm.historyItemHover{Additions,Deletions,Label}Foreground` — SCM graph hover (VS Code 1.89+)
  - `textBlockQuote.{background,border}` — Markdown preview blockquotes
  - `welcomePage.progress.{background,foreground}` + `walkthrough.stepTitle.foreground`
  - `list.focusOutline` / `list.inactiveFocusOutline` — keyboard focus indicators
  - `testing.messageContentForeground` — test output panel text
  - `editorGhostText.border` — explicit transparent border for inline suggestions

  **Syntax / TextMate improvements**

  - `markup.strikethrough` — styled in both variants
  - `variable.other.constant` — non-semantic constant fallback (italic accent)
  - TOML / INI section header scopes
  - `meta.embedded` reset rule for correct embedded-language foreground

### Patch Changes (v1.3.0)

- [#5](https://github.com/santi020k/santi020k-theme/pull/5) [`19cefc9`](https://github.com/santi020k/santi020k-theme/commit/19cefc973f544443318284767e3ee9a45ca2a334) Thanks [@santi020k](https://github.com/santi020k)! - Improve release validation by syncing website structured-data versions during release versioning, enforcing package/website version parity, cleaning up lint configuration, making alpha-aware contrast checks more accurate, and making npm audit blocking consistently.

- [`22d170d`](https://github.com/santi020k/santi020k-theme/commit/22d170de5fd00b58e6f47dd80ceb749e550cca5f) Thanks [@santi020k](https://github.com/santi020k)! - Fix brand casing across README, website metadata, and extension display name. Update icons and favicons with correct branding labels.

- [`16483d0`](https://github.com/santi020k/santi020k-theme/commit/16483d017b7d42702f57a69cf907009b94a7e99d) Thanks [@santi020k](https://github.com/santi020k)! - chore: improve theme JSON readability with categorization, sorting, and comments

## 1.2.1

### Patch Changes (v1.2.1)

- [`878fef8`](https://github.com/santi020k/santi020k-theme/commit/878fef8f411cffa07b7da7f2b047743daf94f694) Thanks [@santi020k](https://github.com/santi020k)! - Sync package-lock.json with package.json to fix marketplace readiness validation error.

## 1.2.0

### Minor Changes (v1.2.0)

- [#1](https://github.com/santi020k/santi020k-theme/pull/1) [`bac057e`](https://github.com/santi020k/santi020k-theme/commit/bac057e43722bea5bc33e42de36dd0212c2d6de5) Thanks [@santi020k](https://github.com/santi020k)! - Refresh the extension logo, tighten VSIX packaging exclusions, and add Vitest coverage for release validation.

### Patch Changes (v1.2.0)

- [#1](https://github.com/santi020k/santi020k-theme/pull/1) [`8cf2c11`](https://github.com/santi020k/santi020k-theme/commit/8cf2c11d29ab3388d675cea89ddcecf59efa96ff) Thanks [@santi020k](https://github.com/santi020k)! - Publish releases to Open VSX alongside the Visual Studio Marketplace.

- [#1](https://github.com/santi020k/santi020k-theme/pull/1) [`8bd1aae`](https://github.com/santi020k/santi020k-theme/commit/8bd1aae21d30acab080c199055441fb807f37db9) Thanks [@santi020k](https://github.com/santi020k)! - Improve GitHub Actions with cancellable validation runs, manual triggers, security audits, CodeQL analysis, and packaged VSIX artifacts.

- [`afee60e`](https://github.com/santi020k/santi020k-theme/commit/afee60e1380da67ec1bc60e9255af0372a2af1d9) Thanks [@santi020k](https://github.com/santi020k)! - Add Changesets-based automated release PRs and guarded Marketplace publishing.

- [#1](https://github.com/santi020k/santi020k-theme/pull/1) [`b073577`](https://github.com/santi020k/santi020k-theme/commit/b073577b0f6de2733ac7a44507ddb6876d179321) Thanks [@santi020k](https://github.com/santi020k)! - Add AI agent guidance files for theme maintenance, validation, and release workflows.

- [#1](https://github.com/santi020k/santi020k-theme/pull/1) [`ba3a5d8`](https://github.com/santi020k/santi020k-theme/commit/ba3a5d8782718df9597b1817c4977190b5f84c12) Thanks [@santi020k](https://github.com/santi020k)! - Add marketplace readiness checks, stronger theme validation, and Cloudflare Pages website deployment.

- [#1](https://github.com/santi020k/santi020k-theme/pull/1) [`69c4395`](https://github.com/santi020k/santi020k-theme/commit/69c43954ffe60f64b21f15c4f1e72f6e5c1c0919) Thanks [@santi020k](https://github.com/santi020k)! - Add the santi020k ESLint config and lint validation scripts.

- [#1](https://github.com/santi020k/santi020k-theme/pull/1) [`f048d1a`](https://github.com/santi020k/santi020k-theme/commit/f048d1a745671836b952888a0ef67c9c4fe82e76) Thanks [@santi020k](https://github.com/santi020k)! - Refresh the extension logo with a wallpaper-inspired terminal mark.

- [#1](https://github.com/santi020k/santi020k-theme/pull/1) [`5ccd02e`](https://github.com/santi020k/santi020k-theme/commit/5ccd02e52490641e3e9862068d47a5718ca10c75) Thanks [@santi020k](https://github.com/santi020k)! - Improve quiet UI contrast for line numbers, input placeholders, disabled text, and terminal ANSI colors in both theme variants.

- [#1](https://github.com/santi020k/santi020k-theme/pull/1) [`f2838aa`](https://github.com/santi020k/santi020k-theme/commit/f2838aa41ceb5b72994e350010c397d318add167) Thanks [@santi020k](https://github.com/santi020k)! - Improve workbench color coverage for Settings UI and custom Antigravity surfaces, fixing unstyled buttons and list selections in the Agent settings page.

- [#1](https://github.com/santi020k/santi020k-theme/pull/1) [`8cf2c11`](https://github.com/santi020k/santi020k-theme/commit/8cf2c11d29ab3388d675cea89ddcecf59efa96ff) Thanks [@santi020k](https://github.com/santi020k)! - Document the project's MIT license and current automated release flow.

- [#1](https://github.com/santi020k/santi020k-theme/pull/1) [`69c4395`](https://github.com/santi020k/santi020k-theme/commit/69c43954ffe60f64b21f15c4f1e72f6e5c1c0919) Thanks [@santi020k](https://github.com/santi020k)! - Harden extension package metadata and registry publish safeguards.

## [1.1.0] — 2026-04-28

### Added (v1.1.0)

- Modal, notification, quick input, and shared widget color coverage
- Semantic highlighting and expanded workbench coverage for newer VS Code surfaces
- Project validation workflow for theme JSON, packaging, and website builds
- Website accessibility, social metadata, and release documentation improvements

## [1.0.0] — 2026-04-28

### Added (v1.0.0)

- Initial release
- `santi020k dark` — deep indigo-black with muted violet accents
- `santi020k light` — purple-tinted whites with rich violet brand colors
