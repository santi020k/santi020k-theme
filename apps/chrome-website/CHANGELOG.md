# @santi020k/santi020k-chrome-theme-website

## 1.0.5

### Patch Changes

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refresh the home artwork, wallpaper cards and preview dialogs, shared footer, and mobile brand.
  Load product styles through Astro pages so client navigation retains the correct appearance.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refine product heroes, enlarge illustrative previews, and align installation content with the shared visual guide. Fix unintended spacing above code-example headers.
  
  Add paired light/dark macOS HEIC wallpapers for all eight paired designs, a setup page for Mac and iPhone switching, and native metadata and source-image validation. iPhone still requires configuring saved wallpaper pairs in Shortcuts or Focus.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Unify product and documentation pages around the VS Code page's Sculpted style: shared neutral actions, underline preview and command tabs, consistent typography, open palette and reading rows, and accessible copy controls. Preserve native preview colors, downloads, installation instructions, and Lumen keyboard behavior in both appearances.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Open external website links in a new tab with safe opener and referrer attributes, including marketplace, source, support, and footer links. Preserve same-tab navigation for product routes and local downloads.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Make the published dark and light Chrome Web Store themes the primary installation path, remove the developer-only copy control, and derive page metadata from the Chrome package version.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Keep the automatic VS Code editor preview synchronized when appearance changes from the mobile menu. Preserve manually selected preview themes and remove the page listener during navigation. Synchronize both appearance controls and their icons when the operating system changes between light and dark.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refresh social cards with OG 1.2's improved composition and image handling while preserving the theme family's brand and existing public image paths.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Add Lumen 4 hero bubbles, restrained content reveals, and Astro page transitions across the theme site. Preserve theme selection and reinitialize navigation, gallery, editor previews, and terminal controls after page swaps; reduced-motion users receive immediate navigation and still content.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Adopt the Sculpted visual direction from the personal website v4: medium-weight Montserrat typography, a shared 72rem grid, solid surfaces, neutral primary controls, and visible violet focus. Add a live visual guide and align product pages and terminal documentation while preserving their interactions.
  
  Add Fold, Orbit, and Monolith wallpapers in paired light/dark desktop/mobile formats, with a separate Sculpted download archive and gallery filters. Keep Classic wallpaper paths and downloads available. Refresh paired VS Code button and focus colors and regenerate derived themes.
  
  Migration: v3 changes the visual treatment of editor primary actions and focus indicators; syntax and installed theme variant names remain available. Websites adopt the Sculpted layout and typography. Classic wallpaper URLs and downloads remain available alongside the new collection. Shared-package consumers must replace the removed `tailwindTheme` export with `theme` and VS Code `.svg` screenshot imports with the corresponding `.png` paths, as documented in the compatibility cleanup changeset.
  
  Keep the Fira Code monospace stack consistent across CSS, JSON, JavaScript, and Tailwind exports.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Use the Design page's large swatches, role descriptions, and expandable HEX/RGB/HSL values across product color sections. Read native palettes from generated theme files, follow page appearance where appropriate, and preserve explicit dark/light comparisons and native disclosure access without JavaScript.
- Updated dependencies [[`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af)]:
  - @santi020k/theme@3.0.0

## 1.0.4

### Patch Changes

- Updated dependencies [[`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368), [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368), [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368), [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368), [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368)]:
  - @santi020k/theme@2.0.0

## 1.0.3

### Patch Changes

- [`887c2a5`](https://github.com/santi020k/santi020k-theme/commit/887c2a5e9768084fb8e6fab8c3b9897c4347627b) Thanks [@santi020k](https://github.com/santi020k)! - Expand Lumen UI usage across the theme websites with shared theme toggles, semantic links and icons, updated credits, and a `BackToTop` control on the hub gallery while preserving the existing brand styling.

- Updated dependencies [[`887c2a5`](https://github.com/santi020k/santi020k-theme/commit/887c2a5e9768084fb8e6fab8c3b9897c4347627b), [`887c2a5`](https://github.com/santi020k/santi020k-theme/commit/887c2a5e9768084fb8e6fab8c3b9897c4347627b)]:
  - @santi020k/theme@1.2.1

## 1.0.2

### Patch Changes

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Add shared production and development URL maps so navigation between theme-family websites stays on local servers during development while deployed builds continue using public domains.

- Updated dependencies [[`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116), [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116)]:
  - @santi020k/theme@1.2.0

## 1.0.1

### Patch Changes

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Refresh the Chrome New Tab wallpapers, strengthen Chrome theme contrast validation, and add an interactive browser preview for dark, light, and incognito states.

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Sync the Chrome website structured-data version with the published Chrome theme package.

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Add generated 1200x630 Open Graph images and SEO metadata validation for all theme websites.

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Fix website outbound links and add a reusable link validation script for the theme sites.

- Updated dependencies [[`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a)]:
  - @santi020k/theme@0.1.0
