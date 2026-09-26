# Santi020k Theme Brand Guidelines

**Canonical source of truth.** Last updated: August 2026. Owner: Santiago Molina, `@santi020k`.

Use this guide for every Santi020k theme-family surface:

- VS Code extension: `packages/santi020k-theme`
- Chrome theme: `packages/santi020k-chrome-theme`
- Codex theme: `packages/santi020k-codex-theme`
- Terminal theme: `packages/santi020k-terminal-theme`
- Raycast theme: `packages/santi020k-raycast-theme`
- Slack theme: `packages/santi020k-slack-theme`
- JetBrains theme: `packages/santi020k-jetbrains-theme`
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
