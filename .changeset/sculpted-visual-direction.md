---
"@santi020k/theme": minor
"santi020k-theme": major
"santi020k-zed-theme": patch
"@santi020k/santi020k-theme-website": minor
"@santi020k/santi020k-terminal-theme-website": patch
"@santi020k/santi020k-vscode-theme-website": patch
"@santi020k/santi020k-chrome-theme-website": patch
"@santi020k/santi020k-codex-theme-website": patch
"@santi020k/santi020k-zed-theme-website": patch
---

Adopt the Sculpted visual direction from the personal website v4: medium-weight Montserrat typography, a shared 72rem grid, solid surfaces, neutral primary controls, and visible violet focus. Add a live visual guide and align product pages and terminal documentation while preserving their interactions.

Add Fold, Orbit, and Monolith wallpapers in paired light/dark desktop/mobile formats, with a separate Sculpted download archive and gallery filters. Keep Classic wallpaper paths and downloads available. Refresh paired VS Code button and focus colors and regenerate derived themes.

Migration: v3 changes the visual treatment of editor primary actions and focus indicators; syntax and installed theme variant names remain available. Websites adopt the Sculpted layout and typography. Classic wallpaper URLs and downloads remain available alongside the new collection. Shared-package consumers must replace the removed `tailwindTheme` export with `theme` and VS Code `.svg` screenshot imports with the corresponding `.png` paths, as documented in the compatibility cleanup changeset.

Keep the Fira Code monospace stack consistent across CSS, JSON, JavaScript, and Tailwind exports.
