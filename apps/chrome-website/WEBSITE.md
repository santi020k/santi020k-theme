# Chrome Theme Website

Reference for the chrome.santi020k.com site.

## Stack

- Runtime: Vite with plain HTML, CSS, and JavaScript
- Build: `pnpm run site:chrome:build`
- Dev server: `pnpm run site:chrome:dev`
- Deploy output: `apps/chrome-website/dist/`
- Domain: `https://chrome.santi020k.com/`

## Role

This app is the public marketing and install page for `packages/santi020k-chrome-theme`.

Keep package-facing assets and Web Store metadata in the package workspace. Keep public website copy, SEO metadata, and website-only assets in this app.

## SEO and OG

- Canonical URL: `https://chrome.santi020k.com/`
- Social image: `apps/chrome-website/public/og-image.png`, generated at `1200x630`.
- Run `pnpm run generate:og` after changing product positioning or social card copy.
- Run `pnpm run validate:seo` before shipping metadata or OG asset changes.
