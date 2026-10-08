<p align="center">
  <a href="../../README.md"><img src="../../packages/theme/assets/logos/logo-square.png" alt="Santi020k Theme" width="72"></a>
</p>

<p align="center"><a href="../../README.md">Santi020k Theme</a></p>

<h1 align="center">Codex website</h1>

<p align="center">
  <a href="../../README.md">Project overview</a> ·
  <a href="package.json">Package manifest</a> ·
  <a href="CHANGELOG.md">Changelog</a> ·
  <a href="#resources">Resources</a>
</p>

**On this page:** [Purpose](#purpose) · [Develop and verify](#develop-and-verify) · [Source map](#source-map) · [Resources](#resources)

The Codex theme source module in the consolidated theme-family site.

## Purpose

This directory owns the Codex product page source. The consolidated site serves it at
`https://theme.santi020k.com/codex/`; use the root site's workflow to verify the composed route.

## Develop and verify

Run from the repository root:

```bash
pnpm run site:dev
pnpm run site:build
pnpm run site:preview
```

The consolidated development and preview servers use `http://127.0.0.1:4174`.

## Source map

| Area | Responsibility |
| --- | --- |
| [src/pages/index.astro](src/pages/index.astro) | Product page. |
| [src/main.js](src/main.js) | Page interactions. |
| [src/styles.css](src/styles.css) | Product-specific styles. |
| [Theme package](../../packages/santi020k-codex-theme/README.md) | Generated presets and validation. |
| [Site hub](../website/README.md) | Consolidated build and navigation. |

Keep copy-ready theme values aligned with the package generator and follow the
[brand guide](../../docs/brand-guidelines.md).

## Resources

[Project overview](../../README.md) · [Contributing](../../CONTRIBUTING.md) · [License](../../LICENSE)
