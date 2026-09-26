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
- `/raycast/`, `/slack/`, `/jetbrains/`, and `/xcode/` provide focused install and coverage pages.
- Former product subdomains permanently redirect to the matching route through the list in `cloudflare/legacy-website-redirects.csv`.

## Assets

- Shared hub assets live in `apps/website/public/`.
- Product-owned public assets are copied into their route namespace after the Astro build by `scripts/sync-consolidated-site-assets.mjs`.
- Terminal downloads continue to be generated from `packages/santi020k-terminal-theme`; the consolidated build publishes them beneath `/terminal/`.

## Maintenance

- Add new products to `src/data/products.js`, then create their route beneath `src/pages/`.
- Keep canonical URLs on `theme.santi020k.com`; legacy subdomains are redirect-only.
- Keep visible focus styles and the dark/light toggle intact.
- Run `pnpm run generate:og` after changing product positioning or social card copy.
- Run `pnpm run validate:seo` before shipping metadata or OG asset changes.
- If a new theme surface becomes public, add it to the available theme cards and move any placeholder item out of the coming-soon section.
