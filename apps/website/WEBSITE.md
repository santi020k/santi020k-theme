# Theme Hub Website

Reference for the theme.santi020k.com hub.

## Stack

- Runtime: Astro with plain HTML, CSS, and JavaScript
- Build: `pnpm run site:build`
- Deploy output: `apps/website/dist/`
- Domain: `https://theme.santi020k.com/`

## Role

This is the only public Santi020k theme website and Cloudflare Pages deployment. Every product lives beneath `theme.santi020k.com`:

- `/vscode/`, `/chrome/`, `/zed/`, and `/codex/` preserve the complete existing product pages.
- `/terminal/` includes the overview, configurator, documentation tree, and generated downloads.
- `/support/` connects bug, theme coverage, and feature reports to the existing GitHub issue forms, with private security reporting and published release links.
- `/raycast/`, `/slack/`, `/jetbrains/`, and `/xcode/` provide focused install and coverage pages.
- Former product subdomains permanently redirect to the matching route through the list in `cloudflare/legacy-website-redirects.csv`.

## Assets

- Shared hub assets live in `apps/website/public/`.
- Product-owned public assets are copied into their route namespace before Astro development and builds by `scripts/sync-consolidated-site-assets.mjs`.
- Terminal downloads continue to be generated from `packages/santi020k-terminal-theme`; the consolidated build publishes them beneath `/terminal/`.

## Mobile navigation

Below 1101px, the shared header opens a full-screen Lumen Dialog as a workspace switchboard.
All nine product routes are available directly, with categories and a current-product marker.
Home, Gallery, Design, Docs, and Support form a separate exploration strip; appearance lives
inside the panel. The close control stays visible while the content scrolls on short screens.
Desktop retains its theme selector and primary navigation.

The interaction contract shared with the personal-site direction is documented in
[`../../docs/mobile-navigation.md`](../../docs/mobile-navigation.md). Native modal focus,
Escape, scroll restoration, breakpoint cleanup, and Astro route disposal are required.

## Styles and navigation

Import each product stylesheet from its Astro page or root layout. Do not load page CSS from
`main.js`: Vite injects those styles once in development, while Astro replaces the head during
client navigation. Returning to a previously visited page can otherwise leave it unstyled.
Production builds extract those imports, but page-owned styles provide the same ownership in
both modes. Keep legacy product selectors scoped so they cannot rearrange the shared header,
footer, or dialogs. The canonical brand lockup is shared by all three navigation surfaces.

## Maintenance

- Add new products to `src/data/products.js`, then create their route beneath `src/pages/`.
- Keep canonical URLs on `theme.santi020k.com`; legacy subdomains are redirect-only.
- Keep visible focus styles and the dark/light toggle intact.
- Open external web links in a new tab using Lumen’s `newTab` prop, which adds `noopener noreferrer`. Keep product routes, section anchors, and local downloads in the current tab.
- Run `pnpm run generate:og` after changing product positioning or social card copy.
- Keep `public/sitemap.xml` aligned with every indexable route. Omit `lastmod` unless it reflects an actual content update; do not use build dates as content timestamps.
- Run `pnpm run validate:seo` before shipping metadata or OG asset changes.
- If a new theme surface becomes public, add it to the available theme cards and move any placeholder item out of the coming-soon section.
