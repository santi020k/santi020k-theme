# santi020k-zed-theme

## 1.0.1

### Patch Changes

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refresh package READMEs with the shared theme identity, section navigation, and resource links. Preserve installation instructions and marketplace image URLs, and replace an unavailable Chrome screenshot with the product preview link. Add full-width light and dark banners and a centered badge row to the root, app, and package guides.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Adopt the Sculpted visual direction from the personal website v4: medium-weight Montserrat typography, a shared 72rem grid, solid surfaces, neutral primary controls, and visible violet focus. Add a live visual guide and align product pages and terminal documentation while preserving their interactions.
  
  Add Fold, Orbit, and Monolith wallpapers in paired light/dark desktop/mobile formats, with a separate Sculpted download archive and gallery filters. Keep Classic wallpaper paths and downloads available. Refresh paired VS Code button and focus colors and regenerate derived themes.
  
  Migration: v3 changes the visual treatment of editor primary actions and focus indicators; syntax and installed theme variant names remain available. Websites adopt the Sculpted layout and typography. Classic wallpaper URLs and downloads remain available alongside the new collection. Shared-package consumers must replace the removed `tailwindTheme` export with `theme` and VS Code `.svg` screenshot imports with the corresponding `.png` paths, as documented in the compatibility cleanup changeset.
  
  Keep the Fira Code monospace stack consistent across CSS, JSON, JavaScript, and Tailwind exports.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Polish native theme validation and shared appearance behavior for the next release. Improve Xcode syntax readability on selected and current lines, remove an unsupported Zed property, and extend contrast regression checks. Fix system appearance synchronization, storage-denied initialization, and high-contrast CSS generation; consolidate website appearance startup and correct build ordering and cache inputs across product modules. Correct preview JSON types and handle settings clipboard success and denied access safely.

## 1.0.0

### Major Changes

- [`887c2a5`](https://github.com/santi020k/santi020k-theme/commit/887c2a5e9768084fb8e6fab8c3b9897c4347627b) Thanks [@santi020k](https://github.com/santi020k)! - Add a generated Zed theme package with dark and light variants derived from the existing VS Code palette, plus workspace build and validation scripts for maintaining it alongside the other Santi020k theme surfaces.
