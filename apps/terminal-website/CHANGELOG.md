# Changelog

## 1.2.0

### Minor Changes

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Upgrade the theme websites to the published Lumen 4 packages and improve terminal documentation with accessible command tabs, clipboard feedback, breadcrumbs, and reading progress. Add family-wide GitHub feedback links and a support page, refresh the visual repository README, and correct fresh Starship setup instructions.
  
  Refresh compatible dependencies, remove stale advisory exemptions, review canonical metadata and sitemap routes, validate release branches, and restrict production publishing and deployment dispatches to main. Refuse to reuse a release tag pointing to a different commit. The subsequent release maintenance pass removes the vulnerable Open VSX dependency chain; see the release preparation notes for compatibility checks and runtime evidence.

### Patch Changes

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refresh the home artwork, wallpaper cards and preview dialogs, shared footer, and mobile brand.
  Load product styles through Astro pages so client navigation retains the correct appearance.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refine product heroes, enlarge illustrative previews, and align installation content with the shared visual guide. Fix unintended spacing above code-example headers.
  
  Add paired light/dark macOS HEIC wallpapers for all eight paired designs, a setup page for Mac and iPhone switching, and native metadata and source-image validation. iPhone still requires configuring saved wallpaper pairs in Shortcuts or Focus.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Clarify Terminal docs navigation, expose all guides and page sections on mobile, align sticky documentation navigation with the shared header, and distinguish complete setup from colors-only downloads with post-install verification.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Unify product and documentation pages around the VS Code page's Sculpted style: shared neutral actions, underline preview and command tabs, consistent typography, open palette and reading rows, and accessible copy controls. Preserve native preview colors, downloads, installation instructions, and Lumen keyboard behavior in both appearances.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Use Lumen custom selection lists in wallpaper downloads and the terminal configurator. Refine wallpaper detail layouts and preserve independent desktop and phone resolution choices.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Keep the automatic VS Code editor preview synchronized when appearance changes from the mobile menu. Preserve manually selected preview themes and remove the page listener during navigation. Synchronize both appearance controls and their icons when the operating system changes between light and dark.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refine documentation breadcrumbs with a single chevron separator, lighter ancestor links, accessible focus and touch targets, and responsive wrapping.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refresh social cards with OG 1.2's improved composition and image handling while preserving the theme family's brand and existing public image paths.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Add Lumen 4 hero bubbles, restrained content reveals, and Astro page transitions across the theme site. Preserve theme selection and reinitialize navigation, gallery, editor previews, and terminal controls after page swaps; reduced-motion users receive immediate navigation and still content.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Adopt the Sculpted visual direction from the personal website v4: medium-weight Montserrat typography, a shared 72rem grid, solid surfaces, neutral primary controls, and visible violet focus. Add a live visual guide and align product pages and terminal documentation while preserving their interactions.
  
  Add Fold, Orbit, and Monolith wallpapers in paired light/dark desktop/mobile formats, with a separate Sculpted download archive and gallery filters. Keep Classic wallpaper paths and downloads available. Refresh paired VS Code button and focus colors and regenerate derived themes.
  
  Migration: v3 changes the visual treatment of editor primary actions and focus indicators; syntax and installed theme variant names remain available. Websites adopt the Sculpted layout and typography. Classic wallpaper URLs and downloads remain available alongside the new collection. Shared-package consumers must replace the removed `tailwindTheme` export with `theme` and VS Code `.svg` screenshot imports with the corresponding `.png` paths, as documented in the compatibility cleanup changeset.
  
  Keep the Fira Code monospace stack consistent across CSS, JSON, JavaScript, and Tailwind exports.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Add page-specific social cards, structured Terminal documentation breadcrumbs, and a generated canonical sitemap with all wallpaper previews. Require SEO contracts for every built page.
- Updated dependencies [[`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af)]:
  - @santi020k/theme@3.0.0
  - santi020k-terminal-theme@1.0.4

## 1.1.3

### Patch Changes

- Updated dependencies [[`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368), [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368), [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368), [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368), [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368)]:
  - @santi020k/theme@2.0.0
  - santi020k-terminal-theme@1.0.3

## 1.1.2

### Patch Changes

- [`887c2a5`](https://github.com/santi020k/santi020k-theme/commit/887c2a5e9768084fb8e6fab8c3b9897c4347627b) Thanks [@santi020k](https://github.com/santi020k)! - Expand Lumen UI usage across the theme websites with shared theme toggles, semantic links and icons, updated credits, and a `BackToTop` control on the hub gallery while preserving the existing brand styling.

- Updated dependencies [[`887c2a5`](https://github.com/santi020k/santi020k-theme/commit/887c2a5e9768084fb8e6fab8c3b9897c4347627b), [`887c2a5`](https://github.com/santi020k/santi020k-theme/commit/887c2a5e9768084fb8e6fab8c3b9897c4347627b)]:
  - @santi020k/theme@1.2.1

## 1.1.1

### Patch Changes

- Updated dependencies [[`226883f`](https://github.com/santi020k/santi020k-theme/commit/226883f07ec185b237f52618744fbd7c253f59ec)]:
  - santi020k-terminal-theme@1.0.1

## 1.1.0

### Minor Changes

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Add the Homebrew-managed `santi020k-terminal` CLI and formula release pipeline while keeping the hosted installer as an alternative installation path.

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Add complete dark and light iTerm2 and Starship presets, launch the unified Terminal product website, and promote the new terminal surface from the theme-family hub.

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Add guided and reproducible configuration, Bash and Fish integrations, automatic WezTerm and Windows Terminal installation, portable settings, Nerd Font diagnostics, custom prompt generation, SSH-aware prompts, and a live accessible web configurator.

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Add rich, portable, and minimal Starship presets, shared prompt metadata, parsed TOML and runtime validation, generated-file drift checks, and dark/light visual references.

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Add instant web previews, settings recipes, compatibility and accessibility evidence, downloadable wallpapers, generated terminal ports, and a contributor port starter.

### Patch Changes

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Add shared production and development URL maps so navigation between theme-family websites stays on local servers during development while deployed builds continue using public domains.

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Move the Terminal website development server to port 4177 and document the new command for running every website concurrently.

- Updated dependencies [[`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116), [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116), [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116), [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116), [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116), [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116), [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116), [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116), [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116), [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116), [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116)]:
  - santi020k-terminal-theme@1.0.0
  - @santi020k/theme@1.2.0

## 1.0.0

- Launch the unified Terminal Theme site with an overview and dedicated iTerm2 and Starship guides.
- Add generated dark and light Powerline prompt presets for Starship.
