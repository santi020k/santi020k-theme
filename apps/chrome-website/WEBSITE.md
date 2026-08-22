# Chrome Theme Website

Reference for the chrome.santi020k.com site.

## Stack

- Runtime: Astro with plain HTML, CSS, and JavaScript
- Build: `pnpm run site:chrome:build`
- Dev server: `pnpm run site:chrome:dev`
- Deploy output: composed into `apps/website/dist/chrome/`
- Canonical route: `https://theme.santi020k.com/chrome/`

## Role

This module supplies the Chrome marketing and install page composed into the consolidated website.

Keep package-facing assets and Web Store metadata in the package workspace. Keep public website copy, SEO metadata, and website-only assets in this app.

## SEO and OG

- Canonical URL: `https://theme.santi020k.com/chrome/`
- Social image: `apps/chrome-website/public/og-image.png`, generated at `1200x630`.
- Run `pnpm run generate:og` after changing product positioning or social card copy.
- Run `pnpm run validate:seo` before shipping metadata or OG asset changes.
