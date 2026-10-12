<p align="center">
  <a href="../../README.md">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="../../docs/assets/readme/workspace-dark.svg">
      <img src="../../docs/assets/readme/workspace-light.svg" alt="Santi020k Theme — Calm contrast. A violet thread through your tools." width="1200" height="220">
    </picture>
  </a>
</p>

<h1 align="center">Terminal website</h1>

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

**On this page:** [Documentation interface](#documentation-interface) · [Resources](#resources)

Astro source module for the [Terminal product route](https://theme.santi020k.com/terminal/) in the consolidated theme-family site. It presents the complete Terminal product and publishes dedicated guides for iTerm2 and Starship.

```sh
pnpm run site:dev
pnpm run site:build
pnpm run site:preview
```

The consolidated development and preview servers run on `http://127.0.0.1:4174`.

The build syncs generated presets from `packages/santi020k-terminal-theme`. Edit canonical palette and generator sources in the package, not website copies.

## Documentation interface

The six `/terminal/docs/` guides use Lumen 4 Astro primitives. `DocsLayout.astro` owns
breadcrumbs, reading progress, section navigation, and previous/next links. Installation
alternatives use `CodeTabs`; single commands use `Code`. Their clipboard status, error
feedback, and keyboard tab behavior come from the single `UIPrimitives` runtime in
`SiteLayout.astro`. Keep commands as text passed to those components instead of adding a
second copy or tab controller.

Breadcrumbs use Lumen's single chevron separator, quiet ancestor links, and a stronger current
page label. Keep their 44px link targets, visible focus rings, and wrapping on narrow screens.

On narrow screens, native Lumen `Collapsible` disclosures expose all guides and page sections.
The desktop sidebar and table of contents follow the measured shared-header height; section
anchors use that same offset. The getting-started guide separates complete macOS setup from
colors-only downloads and includes status and doctor verification commands.

Verify the consolidated route at desktop and mobile widths in both appearances. Check
arrow-key tab selection, copying a command, and manual copying when clipboard access is
unavailable. The Starship palette choice persists under `santi020k-docs-palette`.

## Resources

[Project overview](../../README.md) · [Contributing](../../CONTRIBUTING.md) · [License](../../LICENSE)
