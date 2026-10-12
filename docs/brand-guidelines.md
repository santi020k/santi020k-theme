# Santi020k Theme Brand Guidelines

**Canonical source of truth.** Last updated: October 2026. Owner: Santiago Molina, `@santi020k`.

Use this guide for every Santi020k theme-family surface:

- VS Code extension: `packages/santi020k-theme`
- Chrome theme: `packages/santi020k-chrome-theme`
- Codex theme: `packages/santi020k-codex-theme`
- Terminal theme: `packages/santi020k-terminal-theme`
- Raycast theme: `packages/santi020k-raycast-theme`
- Slack theme: `packages/santi020k-slack-theme`
- JetBrains theme: `packages/santi020k-jetbrains-theme`
- iPhone setup: existing Halo/Contour portrait artwork, delivered as paired wallpapers and native icon-tint guidance; no system-wide recoloring claims
- Obsidian theme: `packages/santi020k-obsidian-theme`, derived from canonical VS Code colors, preserving native mobile layout
- Neovim theme: `packages/santi020k-neovim-theme`, generated native syntax, Tree-sitter and LSP groups
- Xcode theme: `packages/santi020k-xcode-theme`
- Shared token and asset packages: `packages/theme`, `packages/theme-core`
- Consolidated website: `apps/website`, with product page source modules retained in the existing `apps/*-website` directories during migration
- Store listings, screenshots, release copy, Open Graph images, and AI agent guidance

When brand direction, tokens, assets, product copy, or visual rules change, update this document first, then update implementation files from it.

## Brand Essence

Santi020k Theme is a quiet, purple-forward theme family for long technical sessions. It should feel focused, polished, and resilient rather than loud or decorative.

Core promise:

> Calm contrast, durable focus, and a consistent violet color language across every developer surface.

Personality:

- **Calm:** avoid visual noise, unnecessary glow, and shouty contrast outside high-contrast variants.
- **Technical:** speak to developers directly; assume they understand editor, browser, and workflow language.
- **Precise:** use exact variant names, package names, domains, and install targets.
- **Human:** copy can be warm and personal, but never inflated or corporate.

## Naming

Use these names exactly unless a platform forces a different casing:

| Surface           | Brand name                             |
| ----------------- | -------------------------------------- |
| Family            | `Santi020k Theme`                      |
| VS Code extension | `santi020k-theme` or `Santi020k Theme` |
| Chrome package    | `santi020k-chrome-theme`               |
| Raycast package   | `santi020k-raycast-theme`              |
| Slack package     | `santi020k-slack-theme`                |
| JetBrains package | `santi020k-jetbrains-theme`            |
| Xcode package     | `santi020k-xcode-theme`                |
| Shared package    | `@santi020k/theme`                     |
| Shared helpers    | `@santi020k/theme-core`                |
| Theme hub         | `theme.santi020k.com`                  |
| VS Code page      | `theme.santi020k.com/vscode/`          |
| Chrome page       | `theme.santi020k.com/chrome/`          |
| Codex page        | `theme.santi020k.com/codex/`           |
| Terminal page     | `theme.santi020k.com/terminal/`        |
| Zed page          | `theme.santi020k.com/zed/`             |
| Raycast page      | `theme.santi020k.com/raycast/`         |
| Slack page        | `theme.santi020k.com/slack/`           |
| JetBrains page    | `theme.santi020k.com/jetbrains/`       |
| Xcode page        | `theme.santi020k.com/xcode/`           |

Theme variant names stay lowercase in VS Code UI contexts:

- `santi020k dark`
- `santi020k light`
- `santi020k hc dark`
- `santi020k hc light`
- bold and italic variants append `bold` or `italic`

## Visual Identity

The identity is purple/indigo, not generic blue, neon purple, or monochrome gray.

Non-negotiables:

- Preserve the purple/indigo identity unless the task is explicitly a redesign.
- Keep dark, light, high-contrast, bold, and italic variants in the same color language.
- Use semantic tokens and shared sources before adding one-off colors.
- Favor calm separation and readable hierarchy over decorative gradients or glow.
- Keep Chrome and website previews aligned with the VS Code palette.

### Brand mark

The current Santi020k brand mark is the white terminal prompt (`>_`) on a solid brand-purple
rounded square. Its canonical sources are:

- `packages/theme/assets/logos/logo-square.svg`
- `packages/theme/assets/logos/logo-square.png`
- `packages/theme/assets/logos/logo-square.webp`

Use this same mark for the theme-family favicon, app icon, VS Code Marketplace icon, shared brand
surfaces, and portfolio project identity. Product-specific artwork may appear in screenshots, Open
Graph images, and promotional compositions, but it must not replace the canonical mark as the
product logo. Do not maintain decorative or wallpaper-inspired logo variants as alternate brand
marks.

Run `pnpm run generate:brand-assets` after changing the canonical square logo so the tracked
theme-family favicon and app-icon copies remain byte-for-byte aligned. The full validation gate
runs `pnpm run check:brand-assets` to reject drift.

## Color System

The VS Code theme files are the practical palette authority:

- `packages/santi020k-theme/themes/santi020k-dark-color-theme.json`
- `packages/santi020k-theme/themes/santi020k-light-color-theme.json`
- high-contrast generated variants and shared mappings derived from the same token language

Core palette language:

| Role           | Dark direction                                                          | Light direction                                         |
| -------------- | ----------------------------------------------------------------------- | ------------------------------------------------------- |
| Canvas         | deep indigo-black                                                       | purple-tinted white                                     |
| Surfaces       | layered indigo/violet surfaces                                          | soft lavender-tinted surfaces                           |
| Brand accent   | violet/purple, centered around active editor and UI states              | rich violet for interaction and status                  |
| Syntax support | muted semantic hues for strings, numbers, errors, warnings, and success | stronger semantic hues where light contrast requires it |
| High contrast  | same family with stronger borders and clearer separation                | white canvas, black structure, saturated accents        |

Current known anchor colors from package and website docs:

| Token purpose                    | Example colors                             |
| -------------------------------- | ------------------------------------------ |
| Dark canvas                      | `#110c1d`, `#0d0718`                       |
| Dark accent                      | `#752df0`, `#945df4`                       |
| Light canvas                     | `#f8f6fd`, `#ffffff` for high contrast     |
| Light accent                     | `#6319be`, `#5a14b0`, `#7730b8`            |
| High-contrast dark border/accent | `#602cba`, `#60c8e0`, `#ffc060`, `#ff7070` |

### Color format reference

Use this semantic palette for shared brand UI, documentation, marketing assets, and new platform
ports. The VS Code theme JSON remains the authority for the complete workbench and syntax palette;
these tables document the reusable core colors exposed by `packages/theme/site.css`.

#### Dark palette

| Role and default usage             | Shared CSS token        | HEX       | RGB                 | HSL                  |
| ---------------------------------- | ----------------------- | --------- | ------------------- | -------------------- |
| Canvas — page or editor base       | `--theme-bg`            | `#110c1d` | `rgb(17 12 29)`     | `hsl(258 41% 8%)`    |
| Surface — cards and primary panels | `--site-surface`        | `#1c1528` | `rgb(28 21 40)`     | `hsl(262 31% 12%)`   |
| Surface muted — quiet regions      | `--site-surface-muted`  | `#231d30` | `rgb(35 29 48)`     | `hsl(259 25% 15%)`   |
| Surface strong — raised regions    | `--site-surface-strong` | `#322b40` | `rgb(50 43 64)`     | `hsl(260 20% 21%)`   |
| Line — borders and dividers        | `--site-line`           | `#494158` | `rgb(73 65 88)`     | `hsl(261 15% 30%)`   |
| Ink — primary text                 | `--site-ink`            | `#dfdde3` | `rgb(223 221 227)`  | `hsl(260 10% 88%)`   |
| Ink soft — supporting text         | `--site-ink-soft`       | `#b6b2bd` | `rgb(182 178 189)`  | `hsl(262 8% 72%)`    |
| Ink muted — metadata               | `--site-ink-muted`      | `#8d8896` | `rgb(141 136 150)`  | `hsl(261 6% 56%)`    |
| Brand — links and focus            | `--site-brand`          | `#945df4` | `rgb(148 93 244)`   | `hsl(262 87% 66%)`   |
| Brand solid — primary controls     | `--site-brand-solid`    | `#5a0fdb` | `rgb(90 15 219)`    | `hsl(262 87% 46%)`   |
| Brand hover — active controls      | `--site-brand-hover`    | `#752df0` | `rgb(117 45 240)`   | `hsl(262 87% 56%)`   |
| Accent — secondary highlights      | `--site-accent`         | `#b48df7` | `rgb(180 141 247)`  | `hsl(262 87% 76%)`   |
| Success — positive status          | `--site-success`        | `#7daea3` | `rgb(125 174 163)`  | `hsl(167 23% 59%)`   |
| Warning — caution status           | `--site-warning`        | `#e8b44a` | `rgb(232 180 74)`   | `hsl(40 77% 60%)`    |
| Danger — error status              | `--site-danger`         | `#ea6962` | `rgb(234 105 98)`   | `hsl(3 76% 65%)`     |

#### Light palette

| Role and default usage             | Shared CSS token        | HEX       | RGB                 | HSL                  |
| ---------------------------------- | ----------------------- | --------- | ------------------- | -------------------- |
| Canvas — page or editor base       | `--theme-bg`            | `#f8f6fd` | `rgb(248 246 253)`  | `hsl(257 64% 98%)`   |
| Surface — cards and primary panels | `--site-surface`        | `#f0edf9` | `rgb(240 237 249)`  | `hsl(255 50% 95%)`   |
| Surface muted — quiet regions      | `--site-surface-muted`  | `#eae7f5` | `rgb(234 231 245)`  | `hsl(253 41% 93%)`   |
| Surface strong — raised regions    | `--site-surface-strong` | `#e3dff0` | `rgb(227 223 240)`  | `hsl(254 36% 91%)`   |
| Line — borders and dividers        | `--site-line`           | `#d3cde6` | `rgb(211 205 230)`  | `hsl(254 33% 85%)`   |
| Ink — primary text                 | `--site-ink`            | `#302e36` | `rgb(48 46 54)`     | `hsl(255 8% 20%)`    |
| Ink soft — supporting text         | `--site-ink-soft`       | `#403850` | `rgb(64 56 80)`     | `hsl(260 18% 27%)`   |
| Ink muted — metadata               | `--site-ink-muted`      | `#9880c0` | `rgb(152 128 192)`  | `hsl(263 34% 63%)`   |
| Brand — links and focus            | `--site-brand`          | `#6319be` | `rgb(99 25 190)`    | `hsl(267 77% 42%)`   |
| Brand solid — primary controls     | `--site-brand-solid`    | `#5a14b0` | `rgb(90 20 176)`    | `hsl(267 80% 38%)`   |
| Brand hover — active controls      | `--site-brand-hover`    | `#7730b8` | `rgb(119 48 184)`   | `hsl(271 59% 45%)`   |
| Accent — secondary highlights      | `--site-accent`         | `#7030b0` | `rgb(112 48 176)`   | `hsl(270 57% 44%)`   |
| Success — positive status          | `--site-success`        | `#28a745` | `rgb(40 167 69)`    | `hsl(134 61% 41%)`   |
| Warning — caution status           | `--site-warning`        | `#c07a10` | `rgb(192 122 16)`   | `hsl(36 85% 41%)`    |
| Danger — error status              | `--site-danger`         | `#c0392b` | `rgb(192 57 43)`    | `hsl(6 63% 46%)`     |

Format guidance:

- Use six-digit HEX in JSON, store metadata, and platform theme files that do not support semantic
  variables. VS Code also accepts eight-digit `#RRGGBBAA` when a token needs opacity.
- Use modern space-separated `rgb()` in CSS when an alpha channel is useful, for example
  `rgb(148 93 244 / 40%)`.
- Use `hsl()` for controlled tone adjustments in CSS. Keep the semantic role stable when changing
  lightness or saturation; do not create a new named color for a temporary state.
- Prefer the shared CSS token over a literal value in website code. Platform ports should map the
  semantic role to their native format rather than copying unrelated surface colors.

Rules:

- Add related UI states as a set: background, foreground, border, hover, focus, inactive, and unfocused.
- When changing shared palette semantics, update VS Code theme JSON, Chrome mappings/manifests, website variables, screenshots, and docs together.
- Do not introduce a new hue until existing violet, cyan, amber, green, red, or neutral roles cannot express the state.
- Validate contrast for any new foreground/background pair.

## Product Surfaces

### VS Code

VS Code is the lead product surface. Changes to the core palette start here unless the user explicitly scopes work to another surface.

Maintain:

- `semanticHighlighting: true`
- parity across dark and light variants
- high-contrast variants that read as accessibility-focused siblings, not separate brands
- syntax distinction without rainbow noise
- marketplace screenshots that show real editor usage and the actual palette

Product-page screenshot galleries may place these captures on sculpted, AI-generated studio backdrops. Keep artwork decorative and separate from the original image, preserve the complete editor window and its palette, and provide full-size capture links. Use restrained depth and a consistent large capture with accessible mode tabs; do not generate replacement editor UI or add a second window border.

### Chrome

Chrome should feel like the same theme moved into browser chrome.

Maintain:

- toolbar, tab, frame, omnibox, and incognito colors derived from shared theme tokens
- dark and light manifests in version sync
- New Tab and store images that show actual browser UI, not abstract art
- side-by-side alignment with VS Code when screenshots compare surfaces

### Raycast, Slack, JetBrains, and Xcode

- Raycast dark and light exports must preserve the official 12-color Theme Studio shape and matching one-click import URLs.
- Slack presets must keep the supported eight-color legacy import string aligned with the richer semantic role map.
- JetBrains themes must style both the complete IntelliJ Platform UI and the editor scheme; Android Studio is the primary installed test host.
- Xcode themes cover the supported editor and debug-console color surfaces without claiming to recolor the full application UI.
- All application ports ship dark and light together and validate primary text, selection, focus, error, warning, success, and link roles.

### Websites

The websites are product pages for the theme family, not generic personal portfolio pages.

Maintain:

- immediate first-viewport product signal
- usable theme previews and install paths
- consistent navigation, focus styles, external-link safety, and responsive behavior
- copy that is direct, technical, and specific
- domains and canonical URLs matching the surface

## Typography And Assets

Use the shared asset package for reusable brand assets where possible:

- `packages/theme`
- `packages/theme-core`

Asset rules:

- Prefer current package assets over copied or stale app-local assets.
- Keep logos, icons, favicons, screenshots, and Open Graph images in sync after visual changes.
- Use real previews of the product where inspection matters.
- Do not stretch, recolor, or distort logos to fit a layout.

Typography rules:

- Keep headings sentence case.
- Keep marketing copy compact and concrete.
- Avoid oversized hero text inside compact tools, cards, or previews.
- Do not use decorative typography to compensate for weak hierarchy.

## Sculpted visual line

The website v4 redesign establishes the current visual line for the theme family. The visual
reference is the personal website's `docs/sculpted-style-guide.md` on `release/v4.0.0`. This guide
adapts that direction to developer tools: quiet, precise, personal, and immediately useful.
The interactive examples at [the visual guide](https://theme.santi020k.com/design/) use the real
shared tokens and the same navigation, controls, and appearance switch as product pages.

### Hierarchy and typography

Serve the shared Montserrat variable font locally. Keep technical commands in the existing
monospace face; do not substitute display typography inside terminal or editor previews.
Sentence case, complete titles, and medium-weight headings create hierarchy without shouting.

| Role | Size | Weight | Leading and tracking |
| --- | --- | --- | --- |
| Product hero | Responsive, up to 5.5rem | 600 | 1.02; tight tracking |
| Section heading | 2.25–3.75rem | 500 | 1.08; −0.065em |
| Card or project title | 1.5–2rem | 500 | 1.2; −0.055em |
| Reading body | 0.9375rem | 400 | 1.85 |
| Supporting copy | 0.8125–0.875rem | 400 | 1.65–1.8 |
| Metadata | 0.6875–0.75rem | 400–500 | Readable `--site-ink-soft` |
| Eyebrow | 0.625rem | 600 | Uppercase; 0.13em tracking |

Long-form documentation may use 1rem body text for comfort. Keep headings in `--site-ink`,
paragraphs and metadata in `--site-ink-soft`, and violet as an identity and interaction accent.
Never use muted display-only colors for essential text. The semantic palette tables above remain
the reusable core authority; the hub's existing contextual tokens may retain their mapped values.

### Grid, rhythm, and surfaces

| Shared token | Value | Purpose |
| --- | --- | --- |
| `--site-shell-max-width` | 72rem | One alignment for navigation, hero, sections, and footer |
| `--site-section-space` | 7rem desktop; 4.5rem mobile | Section rhythm |
| `--site-heading-gap` | 2.5rem | Heading to content |
| `--site-grid-gap` | 1.5rem | Repeated content |
| `--site-editorial-gap` | 2.5–4rem | Reading and feature columns |
| `--site-card-radius` | 1.5rem | Independent grouped surfaces |
| `--site-panel-radius` | 1.75rem | Large community or collection panels |
| `--site-control-radius` | 1rem | Buttons and inputs |
| `--site-arrow-radius` | 0.75rem | Primary action arrow compartment |
| `--site-control-min-height` | 44px | Minimum interactive target |

Use a solid reading canvas and fine dividers, usually around 65% opacity. Prefer open numbered
rows to repeated decorative cards. Group related content on one surface; do not nest ornamental
panels. Depth belongs to the sculpted navbar, artwork, and actual product previews. Avoid
page-wide glow, persistent grid textures, excessive glass, and continuously moving decoration.
Below 768px, collapse editorial columns in reading order and retain every install action.

The hub home page features VS Code with a larger real preview, followed by numbered tool
rows with fine rules and full-row links. Keep the remaining previews distinct and label
illustrative scenes. Present package examples on one solid code surface, and let wallpaper
artwork stand on the canvas with open captions. Home compositions live in
`apps/website/src/styles/home.css`; retain the shared navigation and product-page owners.

The home hero uses light and dark versions of the same violet glass and ceramic still life,
including the prompt tile, following site appearance without changing composition. This is artwork,
not a software screenshot. Gallery cards pair desktop and phone compositions; opening a current
design shows its preview and download controls in a modal, with an explicit new-tab link to the
permanent design page. A `wallpaper` query parameter identifies the open preview for sharing and
restores it on arrival. Dismissing it removes that parameter without adding history entries.

### Mobile navigation

The theme family's mobile navigation is a full-screen workspace switchboard: direct product
routes, an editorial heading, category labels, and a separate strip for site navigation.
Keep it distinct from the personal website's section menu. Share the interaction standard in
[`mobile-navigation.md`](mobile-navigation.md), including modal focus, visible Close controls,
scroll preservation, appearance controls, short-screen scrolling, and reduced motion.

### Controls, documentation, and motion

Use Lumen `Select` for custom selection lists and `Combobox` for searchable choices. Reserve
`NativeSelect` and raw selects for an explicitly requested native platform interaction. Keep the
custom control's native fallback for JavaScript-free access, and verify the enhanced list with
keyboard, pointer, mobile, and both appearances. The theme website's ESLint policy enforces this
choice. Do not remove native fallback support from the shared library.

Wallpaper details place the complete desktop artwork directly on its preview surface, with the
artwork story below and a separate download column. Phone previews retain their full portrait
composition. Desktop and phone resolution lists are separate Lumen Select controls, so changing
screen type never exposes incompatible sizes and retains the last size chosen for each screen.

Use Lumen primitives and public style hooks. Primary actions use neutral `--site-ink` backgrounds with `--theme-bg` text and a distinct
arrow compartment. Violet remains the identity and focus accent. In native editor ports, map these
roles to supported action and focus tokens; do not claim website typography or corner controls
are available where the host does not support them. Secondary actions are quiet links or outlined controls with
clear hit areas. Show visible 2px focus rings with an offset. Keep full linked rows and cards
keyboard accessible; decorative arrows do not add a second accessible name.

Documentation uses a calm sidebar, open heading, divided reading sections, and a light table
of contents. Preserve command copy, code tabs, installation instructions, pagination, and anchor
navigation when restyling. Sidebars may become a horizontal mobile navigation strip. Theme
previews must continue to show actual product colors rather than decorative website colors.

Use Lumen 4 `ScrollReveal` for a short, one-time content entrance and `RevealGroup` for a
35ms stagger between theme previews. Keep reading content visible without JavaScript.
Astro `ClientRouter` uses a 180ms fade with an immediate swap fallback, preserving appearance
and native browser history. Rebind page controls on `astro:page-load` and dispose document/media
listeners before swaps. Do not persist navigation with stale active links.

The personal bubble signature uses Lumen `Particles` at low density, confined to the home and
visual-guide heroes. Slow ambient drift is the only exception to the still-canvas rule. Keep it
behind content, out of the accessibility tree, and away from documentation/code. Do not introduce
pointer trails or page-wide parallax. Transitions last 180–300ms. Do not lift entire cards.
Reduced motion disables decorative transitions, scaling, blinking, and smooth scrolling.
Verify mobile and desktop, light and dark, keyboard focus, and horizontal overflow.

### Wallpaper generations

Keep historical assets available as the **Classic collection**. Current artwork belongs to the
**Sculpted**, **Signature**, or **Minimal collection**, with descriptive file names and collection metadata. Never
replace an existing downloadable asset with different artwork at the same URL. New wallpapers
use violet identity, generous negative space, and a restrained focal form; they are artwork,
not alternate product logos. Pair dark and light options and preserve clear collection labels
in galleries and download bundles.

The Sculpted edition includes **Tide** (flowing satin), **Dune** (violet sand ridges),
and **Veil** (frosted glass). All three remain in the current gallery.
Earlier wallpapers, banners, and logos live in the Classic archive. VS Code screenshot cards
are excluded from the gallery; editor previews belong on the VS Code product page. Compose immersive, full-bleed scenes with convincing material,
soft light, and depth. Avoid isolated flat shapes, badges, text, and logos. Leave quiet space
for desktop icons and phone clocks. Light and dark editions share their subject; phone artwork
is composed separately rather than cut from the center of a desktop image.

Keep native raster masters and generation prompts in `artwork/sculpted-v2/`. The deterministic
`pnpm run generate:wallpapers` pipeline exports PNG and WEBP display sizes to
`packages/theme/assets/wallpapers/sculpted-v2/`. These are resized imagegen masters, not native
4K renders or vector artwork; do not advertise SVG versions. The current ZIP contains WEBP
files to keep the complete collection practical to download. Earlier Sculpted and Classic
asset paths and archives remain intact.

The **Signature collection** adds explicitly branded wallpaper artwork alongside Sculpted.
Use the canonical white `>_` prompt on its solid purple rounded square as the single focal
detail. The original edition surrounds it with restrained violet glass forms. Keep the mark
recognizable and the canvas calm, without slogans or repeated logos. This is a wallpaper composition, not an
alternate logo. Pair dark and light scenes and compose phone versions separately, leaving
room above the artwork for a clock. Keep masters and prompts in `artwork/signature-v1/`,
display exports in `packages/theme/assets/wallpapers/signature-v1/`, and a separate WEBP
archive. Like Sculpted, display exports are resized raster masters, not native 4K renders.

Signature also includes **Satin** (flowing violet fabric) and **Ceramic** (matte sculptural
forms). Keep the same recognizable prompt tile and restrained composition while making each
material feel distinct. These additional masters and prompts live in `artwork/signature-v2/`,
with exports under `packages/theme/assets/wallpapers/signature-v2/`. The second Signature
archive contains all twelve wallpapers, including the original four glass compositions;
the first archive and every existing asset URL remain available unchanged.

The **Minimal collection** translates the personal website's open canvas, fine outlines, and
sculpted navbar corners into quiet wallpaper artwork. **Contour** uses a single shallow matte
surface at the edge of the canvas, with the canonical purple prompt reduced to a small inset
detail. Preserve generous empty space, neutral pale-lilac or deep-ink surfaces, and restrained
violet accents. Do not reproduce page UI, portraits, navigation, or marketing copy. Pair dark
and light desktop and independently composed phone scenes. Keep native masters and prompts
in `artwork/minimal-v1/`, PNG and WEBP display exports in
`packages/theme/assets/wallpapers/minimal-v1/`, and four WEBP files in a separate Minimal
archive. These are resized raster masters, not native 4K renders or vector artwork.

**Halo** extends Minimal with a single circular recess, a fine violet rim, and a small prompt
detail. Its four masters live in `artwork/minimal-v2/`; the second Minimal pack includes both
Halo and Contour while preserving the first pack.

Keep the main gallery curated around current designs. Place Classic wallpapers in a clearly
labeled archive and preserve their individual files and packs. Give each current design one
descriptive page grouping its four appearance/orientation variants, rather than indexing every
compression option as a separate page. Use meaningful image descriptions, artwork-specific
social previews, canonical URLs, and truthful ImageObject metadata. Download options include
PNG, JPG, and WEBP at practical desktop and phone sizes; distinguish lossless PNG from smaller
and higher-quality WEBP compression. Explain that display exports resize generated raster
masters, so a 3840 × 2160 file does not imply native 4K detail.

## Voice And Copy

Use clear developer-facing language.

Do:

- "A deep indigo-black dark theme built for long sessions."
- "Install from the Visual Studio Marketplace."
- "Chrome theme matching the VS Code palette."
- "Purple-forward, not purple-loud."

Avoid:

- vague CTAs like "Learn more" when a specific action exists
- corporate filler such as "leverage", "synergy", "utilize", "seamless", "robust", or "cutting-edge"
- claims that the theme is perfect, revolutionary, or universally best
- describing product pages as personal portfolio pages

CTA pattern:

| Weak         | Preferred                  |
| ------------ | -------------------------- |
| Learn more   | View the VS Code theme     |
| Click here   | Install from Marketplace   |
| Check it out | Preview the Chrome theme   |
| Contact me   | Open the GitHub repository |

## Accessibility

Accessibility is part of the brand.

Minimums:

- normal text: 4.5:1 contrast
- large text, UI borders, icons, placeholders, and focus indicators: 3:1 contrast
- visible keyboard focus on websites
- no color-only state communication
- reduced-motion handling for website animations
- high-contrast variants remain visibly connected to the family while prioritizing clarity

Use `.agents/skills/theme-accessibility-auditor/SKILL.md` for accessibility-sensitive work.

## Implementation Rules

Before making brand-sensitive changes:

1. Read this guide.
2. Identify every affected surface.
3. Update shared sources before generated or mirrored output.
4. Keep generated artifacts controlled by scripts.
5. Run the narrowest useful validation, then broader validation when the change crosses surfaces.

Validation preference:

- Theme-only changes: `pnpm run validate:themes`
- Chrome changes: `pnpm run validate:chrome`
- Raycast changes: `pnpm run validate:raycast`
- Slack changes: `pnpm run validate:slack`
- JetBrains or Android Studio changes: `pnpm run validate:jetbrains`
- Xcode changes: `pnpm run validate:xcode`
- Website changes: relevant `site:*:build` script
- Cross-surface or release-ready changes: `pnpm run validate`

## AI Agent Usage

AI agents must treat this file as the brand source of truth.

Agent rules:

- Read `AGENTS.md` first, then this guide before changing colors, copy, screenshots, assets, product names, website UI, or store metadata.
- Do not duplicate long brand rules in provider-specific files. Link back here.
- If another document conflicts with this guide, this guide wins for brand decisions.
- If implementation files conflict with this guide, inspect current code before changing behavior and update this guide if the brand direction has genuinely moved.

## Related References

- `AGENTS.md`
- `docs/architecture.md`
- `packages/theme/README.md`
- `packages/theme-core/README.md`
- `apps/website/WEBSITE.md`
- `packages/santi020k-chrome-theme/store/image-specs.md`

### Appearance-aware wallpaper downloads

`artwork/appearance/` contains generated two-frame macOS HEIC files for the eight paired designs.
Light is frame 0 and dark is frame 1, identified by the Apple desktop appearance metadata. These
are paired still images, not solar sequences or video screen savers. Preserve the original raster
compositions and dimensions; do not paint or bake system UI into them.

Generate with `pnpm run generate:appearance` on macOS. Commit the HEICs and manifest together.
`pnpm run validate:appearance` decodes both frames using ImageIO, verifies their appearance mapping,
compares sampled pixels against the sources, and checks file/source/generator fingerprints. The
public repository runs this native check on a standard GitHub-hosted macOS runner. Linux website
builds copy the checked-in files; they do not require an Apple encoder.

The website's [appearance guide](https://theme.santi020k.com/gallery/appearance/) distinguishes
Mac pairing from iPhone Shortcuts or Focus setup. Do not imply that downloading a static PNG, or
choosing Auto icon appearance on iPhone, automatically switches the wallpaper. The iPhone guide
in `docs/iphone-setup.md` is included in the downloadable setup pack.
