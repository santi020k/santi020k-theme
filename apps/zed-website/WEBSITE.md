# Zed Theme Website

Reference for the zed.santi020k.com site.

## Stack

- Runtime: Astro with plain HTML, CSS, and JavaScript
- Build: `pnpm run site:zed:build`
- Dev server: `pnpm run site:zed:dev`
- Deploy output: `apps/zed-website/dist/`
- Domain: `https://zed.santi020k.com/`

## Role

This app is the public marketing and install page for `packages/santi020k-zed-theme`.

Keep package-facing assets and generated theme output in the package workspace. Keep public website copy, SEO metadata, and website-only assets in this app.

## SEO and OG

- Canonical URL: `https://zed.santi020k.com/`
- Social image: `apps/zed-website/public/og-image.png`, generated at `1200x630`.
- Run `pnpm run generate:og` after changing product positioning or social card copy.
- Run `pnpm run validate:seo` before shipping metadata or OG asset changes.
