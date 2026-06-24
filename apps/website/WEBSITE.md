# Theme Hub Website

Reference for the theme.santi020k.com hub.

## Stack

- Runtime: Vite with plain HTML, CSS, and JavaScript
- Build: `pnpm run site:build`
- Deploy output: `apps/website/dist/`
- Domain: `https://theme.santi020k.com/`

## Role

This site is the entry point for the Santi020k theme family. It links to the dedicated VS Code site at `https://vscode.santi020k.com/`, the Chrome site at `https://chrome.santi020k.com/`, the public npm package at `https://www.npmjs.com/package/@santi020k/theme`, and coming-soon theme surfaces.

## Assets

- VS Code previews live in `apps/website/public/preview-*.png`.
- Chrome previews live in `apps/website/public/chrome-preview*.png`.
- Shared favicon and social preview assets remain in `apps/website/public/`.

## Maintenance

- Keep public product links in `index.html` aligned with the deployed domains and npm package URLs.
- Keep visible focus styles and the dark/light toggle intact.
- Run `pnpm run generate:og` after changing product positioning or social card copy.
- Run `pnpm run validate:seo` before shipping metadata or OG asset changes.
- If a new theme surface becomes public, add it to the available theme cards and move any placeholder item out of the coming-soon section.
