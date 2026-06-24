# GitHub Copilot Instructions

This repository contains a VS Code color theme extension with dark and light variants plus a small website.

## Priorities

- Treat `docs/brand-guidelines.md` as the canonical brand source of truth for palette, product names, voice, assets, screenshots, and website consistency.
- Preserve the existing santi020k purple/indigo palette unless a redesign is requested.
- Keep dark and light theme files aligned.
- Prefer official VS Code theme color token names.
- Add release-worthy changesets for user-visible changes.
- Run or recommend `pnpm run validate` before release.

## Key Files

- `docs/brand-guidelines.md`
- `packages/santi020k-theme/themes/santi020k-dark-color-theme.json`
- `packages/santi020k-theme/themes/santi020k-light-color-theme.json`
- `packages/santi020k-theme/scripts/validate-themes.mjs`
- `packages/santi020k-theme/scripts/check-marketplace-readiness.mjs`
- `packages/santi020k-theme/scripts/publish-registries.mjs`
- `.github/workflows/release.yml`
- `.github/workflows/validate.yml`
- `apps/website/src/styles.css`

## Theme Guidance

- Add related UI token states as a set: background, foreground, border, hover, focus.
- Modal and picker styling commonly flows through `editorWidget.*`, `quickInput*`, `input*`, `button*`, `checkbox*`, `dropdown*`, `textLink.*`, `notifications.*`, and `keybindingLabel.*`.
- Keep `semanticHighlighting: true` and update `semanticTokenColors` when syntax meaning changes.
- Avoid duplicate color keys and invalid hex values; the validator checks these.

## Release Guidance

- Releases use Changesets.
- Publishing targets both Visual Studio Marketplace and Open VSX.
- Required secrets: `VSCE_PAT` and `OVSX_PAT`.
- Do not include `.github`, `.changeset`, package-local `scripts`, `website`, or dependencies in the VSIX package.
