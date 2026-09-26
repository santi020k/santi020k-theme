# Zed Theme Website

Reference for the Zed product route in the consolidated theme-family site.

## Stack

- Runtime: Astro with plain HTML, CSS, and JavaScript
- Build: `pnpm run site:build`
- Dev server: `pnpm run site:dev`
- Deploy output: composed into `apps/website/dist/zed/`
- Canonical route: `https://theme.santi020k.com/zed/`

## Role

This module supplies the Zed marketing and install page composed into the consolidated website.

Keep package-facing assets and generated theme output in the package workspace. Keep public website copy, SEO metadata, and website-only assets in this app.

## SEO and OG

- Canonical URL: `https://theme.santi020k.com/zed/`
- Social image: `apps/zed-website/public/og-image.png`, generated at `1200x630`.
- Run `pnpm run generate:og` after changing product positioning or social card copy.
- Run `pnpm run validate:seo` before shipping metadata or OG asset changes.
