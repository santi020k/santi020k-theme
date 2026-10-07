# Santi020k Terminal Theme website

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

Verify the consolidated route at desktop and mobile widths in both appearances. Check
arrow-key tab selection, copying a command, and manual copying when clipboard access is
unavailable. The Starship palette choice persists under `santi020k-docs-palette`.
