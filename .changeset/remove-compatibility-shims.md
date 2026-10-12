---
"@santi020k/theme": major
"santi020k-theme": patch
"@santi020k/santi020k-theme-website": patch
---

Remove unused compatibility aliases and redundant screenshot wrappers for v3. The Tailwind entry point exports only `theme`; replace imports of `tailwindTheme` with `theme`. VS Code previews are lossless PNGs; replace `.svg` screenshot imports with the corresponding `.png` paths. Remove the stale Chrome incognito JPG manifest entry in favor of the existing PNG.

Repository scripts use `site:dev` instead of the removed `sites:dev` alias. Internal contrast tooling uses `scripts/lib/color-contrast.mjs` directly. Add asset manifest integrity checks and remove the duplicate-export lint exemption.
