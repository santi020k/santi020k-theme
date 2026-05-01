# Changelog

## 1.5.0

### Minor Changes

- [#8](https://github.com/santi020k/santi020k-theme/pull/8) [`dd1e93a`](https://github.com/santi020k/santi020k-theme/commit/dd1e93a1c8bd8f1f974e5a20b7875fe194da098f) Thanks [@santi020k](https://github.com/santi020k)! - # Added Bold Theme Variants

  Added new `santi020k dark bold` and `santi020k light bold` theme variants. These variants apply a global bold override to all syntax tokens for a high-impact aesthetic that matches the marketing previews.
  Also included a "Preview Look" guide in the README with recommended settings for font weight, line height, and letter spacing to achieve the geometric brand aesthetic within VS Code.

- [#8](https://github.com/santi020k/santi020k-theme/pull/8) [`dd1e93a`](https://github.com/santi020k/santi020k-theme/commit/dd1e93a1c8bd8f1f974e5a20b7875fe194da098f) Thanks [@santi020k](https://github.com/santi020k)! - Added brand-aligned native bracket pair colorization across all variants (using Violet, Teal, and Amber) for deep visual cohesion. Added subtle opacity dimming to `*.readonly` semantic modifiers to instantly distinguish immutable variables, while ensuring existing markdown, inlay hints, and special language variables (`this`, `self`) provide premium Developer Experience (DX).

- [#8](https://github.com/santi020k/santi020k-theme/pull/8) [`dd1e93a`](https://github.com/santi020k/santi020k-theme/commit/dd1e93a1c8bd8f1f974e5a20b7875fe194da098f) Thanks [@santi020k](https://github.com/santi020k)! - Expanded language support for Java, C/C++, Kotlin, Swift, Dart, Zig, Svelte, and Vue. Added a "Supported Technologies" section to the marketing website and enhanced the editor preview with new language snippets.

- [#8](https://github.com/santi020k/santi020k-theme/pull/8) [`dd1e93a`](https://github.com/santi020k/santi020k-theme/commit/dd1e93a1c8bd8f1f974e5a20b7875fe194da098f) Thanks [@santi020k](https://github.com/santi020k)! - # Added High Contrast Light and Italic Variants

  Added High Contrast Light (`santi020k hc light`) theme to provide maximum accessibility and legibility for light theme users.

  Introduced Italic variants for all theme profiles (`dark italic`, `light italic`, `hc dark italic`, and `hc light italic`) to offer a typography option with distinctly italicized keywords, parameters, and modifiers.

  Updated the marketing website preview with a variant selector, allowing users to instantly switch between Bold (default), Normal, and Italic previews.

- [#8](https://github.com/santi020k/santi020k-theme/pull/8) [`dd1e93a`](https://github.com/santi020k/santi020k-theme/commit/dd1e93a1c8bd8f1f974e5a20b7875fe194da098f) Thanks [@santi020k](https://github.com/santi020k)! - Improved selection visibility and UI contrast across all theme variants. Boosted selection background opacity, added a dedicated selection foreground for light/HC themes, and increased contrast for breadcrumbs and word highlights.

- [#8](https://github.com/santi020k/santi020k-theme/pull/8) [`dd1e93a`](https://github.com/santi020k/santi020k-theme/commit/dd1e93a1c8bd8f1f974e5a20b7875fe194da098f) Thanks [@santi020k](https://github.com/santi020k)! - feat: add high contrast light variant, update validation rules, and enhance website preview

  - Added **High Contrast Light** theme profile (Base, Bold, Italic) for better accessibility.
  - Expanded automated validation to cover all 12 theme variants and verified contrast ratios.
  - Updated website "Variants" grid and hero description to showcase the full suite.
  - Replaced the square OG image with a new 1200x630 landscape version for improved social previews.

- [#8](https://github.com/santi020k/santi020k-theme/pull/8) [`dd1e93a`](https://github.com/santi020k/santi020k-theme/commit/dd1e93a1c8bd8f1f974e5a20b7875fe194da098f) Thanks [@santi020k](https://github.com/santi020k)! - Accessibility, contrast, and quality improvements across all 12 theme variants:

  **Accessibility (contrast)**

  - Dark: lift comment foreground `#71569f` → `#8d70c0` (~2.3:1 → ~3.8:1 on dark background)
  - HC-Dark: lift comment foreground `#8264b4` → `#9878cc` for stronger contrast in high-contrast context
  - Light: improve inactive line number foreground `#8c82a5` → `#786e96` (meets 3:1 threshold)
  - All variants: increase `focusBorder`, `list.focusOutline`, `menu.selectionBorder`, `menubar.selectionBorder`, and `statusBarItem.focusBorder` opacity from ~38% to ~56% for WCAG 2.1 Non-text Contrast compliance
  - HC-Light: further increase focus border opacity to ~75% (`c0` alpha) to meet high-contrast expectations
  - HC-Light: differentiate punctuation color (`#5c4a7a`) from comment color so they are visually distinct in the HC variant

  **Missing token coverage**

  - All variants: add `editorBracketPairGuide.activeBackground1–3` and `background1–3` tokens (VS Code 1.67+) keyed to each theme's bracket highlight palette
  - All variants: add `editor.wordHighlightTextBackground` (VS Code 1.76+) for read-occurrence highlighting distinct from write-occurrence
  - All variants: add `statusBarItem.focusBorder` (VS Code 1.71+) for keyboard-focused status bar items
  - All variants: add `widget.border` token for consistent widget border theming

  **Visual polish**

  - Light & HC-Light: change inactive `breadcrumb.foreground` from fully-saturated accent `#6319be` to muted `[#403850](https://github.com/santi020k/santi020k-theme/issues/403850)`/`#302e36` — the accent is now reserved for `breadcrumb.activeSelectionForeground`
  - HC-Dark: add `storage.type.function.arrow` to the Operators TextMate rule so `=>` arrow functions receive operator coloring (matches dark and light variants)
  - All variants: align `terminal.inactiveSelectionBackground` alpha to match `editor.inactiveSelectionBackground` for consistency

  **Architecture / correctness**

  - Dark & Light: remove first duplicate Tailwind CSS TextMate rule (two rules targeted identical scopes; second always won)
  - Dark & Light: remove first duplicate Elixir TextMate rule with a different color (second consolidated rule is kept)
  - Dark & Light: remove broad `source.elixir`, `source.ruby`, `source.cs` scope overrides that silently suppressed more specific token rules
  - HC-Light generator: add explicit post-generation override block for HC-specific color tokens, avoiding the need to hand-edit generated files

### Patch Changes

- [#8](https://github.com/santi020k/santi020k-theme/pull/8) [`dd1e93a`](https://github.com/santi020k/santi020k-theme/commit/dd1e93a1c8bd8f1f974e5a20b7875fe194da098f) Thanks [@santi020k](https://github.com/santi020k)! - Enhanced the marketing website's editor preview with React and Prisma snippets to showcase specialized framework support for modern TS/JS developers.

- [#8](https://github.com/santi020k/santi020k-theme/pull/8) [`dd1e93a`](https://github.com/santi020k/santi020k-theme/commit/dd1e93a1c8bd8f1f974e5a20b7875fe194da098f) Thanks [@santi020k](https://github.com/santi020k)! - Added specialized syntax support for Tailwind CSS, Prisma, and Elixir. Enhanced website with interactive installation and settings copy buttons. Updated README badges.

- [#8](https://github.com/santi020k/santi020k-theme/pull/8) [`dd1e93a`](https://github.com/santi020k/santi020k-theme/commit/dd1e93a1c8bd8f1f974e5a20b7875fe194da098f) Thanks [@santi020k](https://github.com/santi020k)! - Added specialized syntax highlighting for Tailwind CSS, Prisma, Elixir, Ruby on Rails, C#/.NET, Angular, and more. Updated the marketing website with a more realistic language support count and enhanced the editor preview with React and Prisma snippets.

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
