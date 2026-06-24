# Santi020k Theme Brand Guidelines

**Canonical source of truth.** Last updated: June 2026. Owner: Santiago Molina, `@santi020k`.

Use this guide for every Santi020k theme-family surface:

- VS Code extension: `packages/santi020k-theme`
- Chrome theme: `packages/santi020k-chrome-theme`
- Shared token and asset packages: `packages/theme`, `packages/theme-core`
- Websites: `apps/website`, `apps/vscode-website`, `apps/chrome-website`
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

| Surface | Brand name |
| --- | --- |
| Family | `Santi020k Theme` |
| VS Code extension | `santi020k-theme` or `Santi020k Theme` |
| Chrome package | `santi020k-chrome-theme` |
| Shared package | `@santi020k/theme` |
| Shared helpers | `@santi020k/theme-core` |
| Theme hub | `theme.santi020k.com` |
| VS Code site | `vscode.santi020k.com` |
| Chrome site | `chrome.santi020k.com` |

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

## Color System

The VS Code theme files are the practical palette authority:

- `packages/santi020k-theme/themes/santi020k-dark-color-theme.json`
- `packages/santi020k-theme/themes/santi020k-light-color-theme.json`
- high-contrast generated variants and shared mappings derived from the same token language

Core palette language:

| Role | Dark direction | Light direction |
| --- | --- | --- |
| Canvas | deep indigo-black | purple-tinted white |
| Surfaces | layered indigo/violet surfaces | soft lavender-tinted surfaces |
| Brand accent | violet/purple, centered around active editor and UI states | rich violet for interaction and status |
| Syntax support | muted semantic hues for strings, numbers, errors, warnings, and success | stronger semantic hues where light contrast requires it |
| High contrast | same family with stronger borders and clearer separation | white canvas, black structure, saturated accents |

Current known anchor colors from package and website docs:

| Token purpose | Example colors |
| --- | --- |
| Dark canvas | `#110c1d`, `#0d0718` |
| Dark accent | `#752df0`, `#945df4` |
| Light canvas | `#f8f6fd`, `#ffffff` for high contrast |
| Light accent | `#6319be`, `#5a14b0`, `#7730b8` |
| High-contrast dark border/accent | `#602cba`, `#60c8e0`, `#ffc060`, `#ff7070` |

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

| Weak | Preferred |
| --- | --- |
| Learn more | View the VS Code theme |
| Click here | Install from Marketplace |
| Check it out | Preview the Chrome theme |
| Contact me | Open the GitHub repository |

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
- `apps/vscode-website/WEBSITE.md`
- `apps/chrome-website/WEBSITE.md`
- `packages/santi020k-chrome-theme/store/image-specs.md`
