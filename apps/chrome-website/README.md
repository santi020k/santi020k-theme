<p align="center">
  <a href="../../README.md">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="../../docs/assets/readme/workspace-dark.svg">
      <img src="../../docs/assets/readme/workspace-light.svg" alt="Santi020k Theme — Calm contrast. A violet thread through your tools." width="1200" height="220">
    </picture>
  </a>
</p>

<h1 align="center">Chrome website</h1>

<p align="center">
  <a href="../../LICENSE"><img src="https://img.shields.io/badge/license-MIT-13967e?style=flat-square" alt="License: MIT"></a>
  <a href="package.json"><img src="https://img.shields.io/badge/built_with-Astro-6319be?style=flat-square" alt="Built With: Astro"></a>
</p>

<p align="center">
  <a href="../../README.md">Project overview</a> ·
  <a href="package.json">Package manifest</a> ·
  <a href="CHANGELOG.md">Changelog</a> ·
  <a href="#resources">Resources</a>
</p>

**On this page:** [Stack](#stack) · [Commands](#commands) · [Maintenance Notes](#maintenance-notes) · [Resources](#resources)

Astro source module for the [Santi020k Chrome theme page](https://theme.santi020k.com/chrome/) in the consolidated theme-family site.

The page should connect the browser theme to the wider Santi020k Theme family, show the actual Chrome visual direction, and send users to the dark and light Chrome Web Store listings.

## Stack

- Runtime: Astro with plain HTML, CSS, and JavaScript
- Shared tokens and helpers: `@santi020k/theme`
- Source: `src/pages/index.astro`, `src/main.js`, `src/styles.css`
- Public assets: `public/`
- Composed build output: `apps/website/dist/chrome/`

## Commands

Run commands from the repository root.

| Command                    | What it does                                            |
| -------------------------- | ------------------------------------------------------- |
| `pnpm run site:dev`        | Starts the consolidated site dev server on port 4174    |
| `pnpm run site:build`      | Builds the consolidated production site                 |
| `pnpm run site:preview`    | Previews the consolidated production build on port 4174 |
| `pnpm run validate:chrome` | Validates the Chrome theme package                      |
| `pnpm run validate`        | Runs the full monorepo validation suite                 |

## Maintenance Notes

- Keep Web Store links aligned with the dark and light listings in `packages/santi020k-chrome-theme/README.md`.
- Keep website-only SEO assets in this app and store listing assets in `packages/santi020k-chrome-theme/store/`.
- Preserve visible focus styles, reduced-motion handling, external-link safety, and responsive behavior.
- Read [`../../docs/brand-guidelines.md`](../../docs/brand-guidelines.md) before changing copy, color, imagery, or product naming.

For deeper implementation notes, see [`WEBSITE.md`](WEBSITE.md).

## Resources

[Project overview](../../README.md) · [Contributing](../../CONTRIBUTING.md) · [License](../../LICENSE)
