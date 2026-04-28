# GitHub Copilot Instructions

This repository contains a VS Code color theme extension with dark and light variants plus a small website.

## Priorities

- Preserve the existing santi020k purple/indigo palette unless a redesign is requested.
- Keep dark and light theme files aligned.
- Prefer official VS Code theme color token names.
- Add release-worthy changesets for user-visible changes.
- Run or recommend `npm run validate` before release.

## Key Files

- `themes/santi020k-dark-color-theme.json`
- `themes/santi020k-light-color-theme.json`
- `scripts/validate-themes.mjs`
- `scripts/check-marketplace-readiness.mjs`
- `scripts/publish-registries.mjs`
- `.github/workflows/release.yml`
- `.github/workflows/validate.yml`
- `website/src/styles.css`

## Theme Guidance

- Add related UI token states as a set: background, foreground, border, hover, focus.
- Modal and picker styling commonly flows through `editorWidget.*`, `quickInput*`, `input*`, `button*`, `checkbox*`, `dropdown*`, `textLink.*`, `notifications.*`, and `keybindingLabel.*`.
- Keep `semanticHighlighting: true` and update `semanticTokenColors` when syntax meaning changes.
- Avoid duplicate color keys and invalid hex values; the validator checks these.

## Release Guidance

- Releases use Changesets.
- Publishing targets both Visual Studio Marketplace and Open VSX.
- Required secrets: `VSCE_PAT` and `OVSX_PAT`.
- Do not include `.github`, `.changeset`, `scripts`, `website`, or dependencies in the VSIX package.
