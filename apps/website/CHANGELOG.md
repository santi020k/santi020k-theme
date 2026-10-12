# @santi020k/santi020k-theme-website

## 1.3.0

### Minor Changes

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refine product heroes, enlarge illustrative previews, and align installation content with the shared visual guide. Fix unintended spacing above code-example headers.
  
  Add paired light/dark macOS HEIC wallpapers for all eight paired designs, a setup page for Mac and iPhone switching, and native metadata and source-image validation. iPhone still requires configuring saved wallpaper pairs in Shortcuts or Focus.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Upgrade the theme websites to the published Lumen 4 packages and improve terminal documentation with accessible command tabs, clipboard feedback, breadcrumbs, and reading progress. Add family-wide GitHub feedback links and a support page, refresh the visual repository README, and correct fresh Starship setup instructions.
  
  Refresh compatible dependencies, remove stale advisory exemptions, review canonical metadata and sitemap routes, validate release branches, and restrict production publishing and deployment dispatches to main. Refuse to reuse a release tag pointing to a different commit. The subsequent release maintenance pass removes the vulnerable Open VSX dependency chain; see the release preparation notes for compatibility checks and runtime evidence.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Add the iPhone wallpaper setup pack, dark/light Obsidian theme, and native Neovim colorscheme with direct downloads, installation guides, family navigation, and validation. Preserve existing theme and wallpaper URLs. Obsidian community-directory publication remains separate from manual installation.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Add Lumen 4 hero bubbles, restrained content reveals, and Astro page transitions across the theme site. Preserve theme selection and reinitialize navigation, gallery, editor previews, and terminal controls after page swaps; reduced-motion users receive immediate navigation and still content.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Adopt the Sculpted visual direction from the personal website v4: medium-weight Montserrat typography, a shared 72rem grid, solid surfaces, neutral primary controls, and visible violet focus. Add a live visual guide and align product pages and terminal documentation while preserving their interactions.
  
  Add Fold, Orbit, and Monolith wallpapers in paired light/dark desktop/mobile formats, with a separate Sculpted download archive and gallery filters. Keep Classic wallpaper paths and downloads available. Refresh paired VS Code button and focus colors and regenerate derived themes.
  
  Migration: v3 changes the visual treatment of editor primary actions and focus indicators; syntax and installed theme variant names remain available. Websites adopt the Sculpted layout and typography. Classic wallpaper URLs and downloads remain available alongside the new collection. Shared-package consumers must replace the removed `tailwindTheme` export with `theme` and VS Code `.svg` screenshot imports with the corresponding `.png` paths, as documented in the compatibility cleanup changeset.
  
  Keep the Fira Code monospace stack consistent across CSS, JSON, JavaScript, and Tailwind exports.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Add Studio and Orbit artwork with light and dark wide banners and separately composed square covers. Group the current gallery into Wallpapers, Banners, and Covers, with previews, shareable design pages, and PNG, JPG, and WEBP downloads while retaining all eight wallpapers and Classic archive URLs.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Add Halo to the Minimal wallpaper collection and curate the gallery around eight current
  designs. Preserve earlier wallpapers in a Classic archive with existing downloads intact.
  
  Give each current design a descriptive page with four artwork variants, related designs,
  canonical metadata, image structured data, and sitemap entries. Offer PNG, JPG, and WEBP
  downloads at desktop and phone sizes, including smaller-file and high-quality WEBP options.
  Generate additional static downloads from saved masters during site preparation without
  requiring an image API or runtime service.

### Patch Changes

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Align section anchor dividers with the sticky navigation using its rendered height at every screen size.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refresh the home artwork, wallpaper cards and preview dialogs, shared footer, and mobile brand.
  Load product styles through Astro pages so client navigation retains the correct appearance.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refine mobile navigation with a sculpted header, attached numbered menu, clearer controls, and keyboard and outside-click dismissal.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Clarify Terminal docs navigation, expose all guides and page sections on mobile, align sticky documentation navigation with the shared header, and distinguish complete setup from colors-only downloads with post-install verification.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Replace cluttered VS Code screenshots with matching real captures of all four theme modes. Use a readable TypeScript sample, a compact Explorer, and lossless PNG masters without repeated occurrence highlights or clipped code. Preserve native image proportions and synchronize website, shared-package, and marketplace previews.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Unify product and documentation pages around the VS Code page's Sculpted style: shared neutral actions, underline preview and command tabs, consistent typography, open palette and reading rows, and accessible copy controls. Preserve native preview colors, downloads, installation instructions, and Lumen keyboard behavior in both appearances.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Keep eight current wallpaper designs in the gallery, move banners and logos to the Classic archive, and remove VS Code screenshot cards. Preserve existing wallpaper pages and downloads.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Feature Ceramic light, Satin dark, and Dune light on the home page with uncropped desktop previews and accurate collection, edition, and download labels.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Keep product navigation highlights synchronized with section links, scrolling, and browser history, with visible keyboard focus.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Use Lumen custom selection lists in wallpaper downloads and the terminal configurator. Refine wallpaper detail layouts and preserve independent desktop and phone resolution choices.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Add a matching dark home hero and shareable gallery previews that reopen from a URL, with a copy-link action and preserved native page navigation.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Keep the download arrow compartment evenly inset inside wallpaper and banner actions.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Open external website links in a new tab with safe opener and referrer attributes, including marketplace, source, support, and footer links. Preserve same-tab navigation for product routes and local downloads.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Add the Minimal wallpaper collection with Contour artwork inspired by the personal website's
  quiet canvas and sculpted corners. Include dark and light desktop and phone compositions,
  PNG and WEBP downloads, a dedicated gallery filter, and a compact WEBP pack.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Keep the automatic VS Code editor preview synchronized when appearance changes from the mobile menu. Preserve manually selected preview themes and remove the page listener during navigation. Synchronize both appearance controls and their icons when the operating system changes between light and dark.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Reveal HEX, RGB, and HSL values on demand through a compact Color codes disclosure beneath each palette swatch. Keep the default visual guide uncluttered and values synchronized with light/dark appearance and page navigation.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refine the editor preview toolbar with compact Lumen custom selectors with accessible labels, dropdown indicators, theme-aware colors, and visible keyboard focus. Separate the filename, give the language an editor-tab treatment, and size controls to their selected values with wrapping on narrow screens. Use themed scrollable lists with a checkmark for the selected option, keyboard navigation, and type-to-jump. Use 36px controls for pointer input and retain 44px touch targets.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refine documentation breadcrumbs with a single chevron separator, lighter ancestor links, accessible focus and touch targets, and responsive wrapping.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refine the workspace menu tiles and animate mobile navigation and desktop theme selection on opening and closing, preserving focus, scrolling, and reduced-motion preferences.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Replace uneven screenshot sizes with one large, consistent showcase and accessible Lumen color-mode tabs. Reduce artwork padding, retain lossless captures and full-size links, and keep captions aligned on desktop and mobile.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Replace synthetic VS Code previews with real editor screenshots in dark, light, and both high-contrast modes. Synchronize previews from canonical captures and preserve existing PNG and SVG asset URLs.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Show light and dark wallpaper previews together in the appearance guide, with clearer download actions, collection labels, and links to each design.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refresh social cards with OG 1.2's improved composition and image handling while preserving the theme family's brand and existing public image paths.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Refresh compatible build, test, lint, and deployment dependencies. Remove unused internal path helpers and redundant security override selectors, and extend unused-code analysis to root scripts, nested routes, and website TypeScript.
  
  Share the existing VSCE 4 dependency with Open VSX to remove the unpatched braces dependency chain. Verify source packaging, prebuilt artifact upload, duplicate handling, and registry failures against a temporary local registry. The full dependency audit reports no known vulnerabilities; production publishing remains in the existing GitHub workflow.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Preserve historical Obsidian compatibility mappings when generating a new version.
  Restore ordered-list breadcrumb semantics on wallpaper and banner detail pages.
  Keep automatic website deployments aligned with generated artwork and download inputs.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Remove unused compatibility aliases and redundant screenshot wrappers for v3. The Tailwind entry point exports only `theme`; replace imports of `tailwindTheme` with `theme`. VS Code previews are lossless PNGs; replace `.svg` screenshot imports with the corresponding `.png` paths. Remove the stale Chrome incognito JPG manifest entry in favor of the existing PNG.
  
  Repository scripts use `site:dev` instead of the removed `sites:dev` alias. Internal contrast tooling uses `scripts/lib/color-contrast.mjs` directly. Add asset manifest integrity checks and remove the duplicate-export lint exemption.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Expand the Signature wallpaper collection with Satin and Ceramic: eight additional branded
  dark/light desktop and phone compositions. Add PNG/WEBP downloads and a complete twelve-image
  Signature WEBP pack while preserving the original glass artwork and every earlier download.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Align the theme hub home page with the Sculpted brand direction: open numbered product rows, a featured VS Code preview, quieter typography, shared-token actions, and image-led wallpaper compositions.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Align the VS Code product page with the Sculpted brand guide: remove duplicate screenshot frames, separate captions, refine typography and install actions, and use open editorial lists with shared spacing. Use a custom Lumen list for the settings syntax style and preserve responsive, keyboard-accessible preview controls.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Present real VS Code captures in an asymmetric gallery with sculpted AI studio artwork, descriptive mode captions, and keyboard-accessible full-size image links. Keep screenshot palettes and window borders intact, optimize artwork for the web, and stack compositions on mobile.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Consolidate native port and VS Code contrast calculations in shared internal tooling, reject malformed colors explicitly, and preserve transparency compositing. Build the distributed packages and consolidated website without redundant standalone product site builds; keep product development commands and full source type checking.
  
  This maintenance joins the existing VS Code 3.0.0 major release changeset. Installed theme names, package exports, and download URLs remain unchanged.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Use the Design page's large swatches, role descriptions, and expandable HEX/RGB/HSL values across product color sections. Read native palettes from generated theme files, follow page appearance where appropriate, and preserve explicit dark/light comparisons and native disclosure access without JavaScript.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Add page-specific social cards, structured Terminal documentation breadcrumbs, and a generated canonical sitemap with all wallpaper previews. Require SEO contracts for every built page.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Replace the featured Sculpted wallpapers with Tide, Dune, and Veil: tactile satin, violet
  landscapes, and frosted glass in light and dark desktop and phone editions. Include PNG and
  WEBP downloads, a compact WEBP collection archive, and reproducible exports from saved
  raster masters. Keep all previous wallpaper files and download archives available.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Polish native theme validation and shared appearance behavior for the next release. Improve Xcode syntax readability on selected and current lines, remove an unsupported Zed property, and extend contrast regression checks. Fix system appearance synchronization, storage-denied initialization, and high-contrast CSS generation; consolidate website appearance startup and correct build ordering and cache inputs across product modules. Correct preview JSON types and handle settings clipboard success and denied access safely.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Add the Signature wallpaper collection with the Santi020k terminal mark and violet glass
  artwork. Include dark and light desktop and phone compositions, individual PNG and WEBP
  downloads, and a separate compact WEBP pack. Preserve existing wallpaper collections and URLs.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Replace repeated placeholder windows with light/dark theme screenshots and distinct illustrative previews for each tool on the theme-family hub.

- [#63](https://github.com/santi020k/santi020k-theme/pull/63) [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af) Thanks [@santi020k](https://github.com/santi020k)! - Replace the mobile dropdown with a full-screen workspace switchboard, direct product navigation, accessible modal behavior, and separate site and appearance controls.
- Updated dependencies [[`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af), [`29d41b8`](https://github.com/santi020k/santi020k-theme/commit/29d41b89125ba11b3298dc7d0ad39b68dc9f46af)]:
  - @santi020k/theme@3.0.0

## 1.2.0

### Minor Changes

- [#55](https://github.com/santi020k/santi020k-theme/pull/55) [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368) Thanks [@santi020k](https://github.com/santi020k)! - Add the coordinated Signal flow wallpaper collection in light and dark, with desktop and mobile sizes in the shared asset library and gallery downloads.

- [#55](https://github.com/santi020k/santi020k-theme/pull/55) [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368) Thanks [@santi020k](https://github.com/santi020k)! - Consolidate every public theme page and the complete Terminal documentation under theme.santi020k.com, add shared global and contextual navigation with a theme selector, polish every page family, introduce a compact family-wide footer, and update shared site URLs for the new route-based architecture.
  
  Breaking change: `SiteUrls` now requires `raycast`, `slack`, `jetbrains`, and `xcode` URLs. Consumers that construct `SiteUrls` values must add those fields. Existing product URLs now resolve to routes under `https://theme.santi020k.com/` instead of separate product domains.

### Patch Changes

- [#55](https://github.com/santi020k/santi020k-theme/pull/55) [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368) Thanks [@santi020k](https://github.com/santi020k)! - Align the theme-family project logo, website favicon, and app icon with the current Santi020k
  brand mark.

- [#55](https://github.com/santi020k/santi020k-theme/pull/55) [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368) Thanks [@santi020k](https://github.com/santi020k)! - Polish the Codex theme launch with accurate dark and light previews, clearer import guidance, complete social metadata, and an updated theme-hub card.

- [#55](https://github.com/santi020k/santi020k-theme/pull/55) [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368) Thanks [@santi020k](https://github.com/santi020k)! - Refine the homepage wallpaper showcase and gallery asset cards with clearer responsive hierarchy, denser metadata, collection counts, and stronger keyboard focus states.
- Updated dependencies [[`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368), [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368), [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368), [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368), [`2d8716a`](https://github.com/santi020k/santi020k-theme/commit/2d8716a28fa5a7ef64c24170997af4e7b0bf5368)]:
  - @santi020k/theme@2.0.0

## 1.1.1

### Patch Changes

- [`887c2a5`](https://github.com/santi020k/santi020k-theme/commit/887c2a5e9768084fb8e6fab8c3b9897c4347627b) Thanks [@santi020k](https://github.com/santi020k)! - Expand Lumen UI usage across the theme websites with shared theme toggles, semantic links and icons, updated credits, and a `BackToTop` control on the hub gallery while preserving the existing brand styling.

- [`887c2a5`](https://github.com/santi020k/santi020k-theme/commit/887c2a5e9768084fb8e6fab8c3b9897c4347627b) Thanks [@santi020k](https://github.com/santi020k)! - Add a dedicated public Zed theme website and surface it from the main Santi020k theme hub.

- Updated dependencies [[`887c2a5`](https://github.com/santi020k/santi020k-theme/commit/887c2a5e9768084fb8e6fab8c3b9897c4347627b), [`887c2a5`](https://github.com/santi020k/santi020k-theme/commit/887c2a5e9768084fb8e6fab8c3b9897c4347627b)]:
  - @santi020k/theme@1.2.1

## 1.1.0

### Minor Changes

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Add a filterable Gallery & Downloads page for wallpapers, banners, VS Code previews, and brand assets, with full-size previews and downloadable collection archives.

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Add complete dark and light iTerm2 and Starship presets, launch the unified Terminal product website, and promote the new terminal surface from the theme-family hub.

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Add instant web previews, settings recipes, compatibility and accessibility evidence, downloadable wallpapers, generated terminal ports, and a contributor port starter.

### Patch Changes

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Complete Open Graph, Twitter card, canonical, robots, and structured data metadata for the gallery page.

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Add shared production and development URL maps so navigation between theme-family websites stays on local servers during development while deployed builds continue using public domains.

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Fix the theme hub light palette so switching between light and dark mode updates the full page instead of only a few controls.

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Upgrade the Terminal theme card with a full-width, responsive product preview that matches the visual weight of the VS Code and Chrome cards.

- [#28](https://github.com/santi020k/santi020k-theme/pull/28) [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116) Thanks [@santi020k](https://github.com/santi020k)! - Fix the wallpaper section heading layout and responsive presentation on the theme hub.

- Updated dependencies [[`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116), [`e74d8bb`](https://github.com/santi020k/santi020k-theme/commit/e74d8bbaeb84a589dfb1ef08d749a66559d1a116)]:
  - @santi020k/theme@1.2.0

## 1.0.1

### Patch Changes

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Refresh the theme hub with new generated preview art and a more polished landing layout.

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Add generated 1200x630 Open Graph images and SEO metadata validation for all theme websites.

- [#15](https://github.com/santi020k/santi020k-theme/pull/15) [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a) Thanks [@santi020k](https://github.com/santi020k)! - Fix website outbound links and add a reusable link validation script for the theme sites.

- Updated dependencies [[`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a), [`791ceee`](https://github.com/santi020k/santi020k-theme/commit/791ceee1676bd7f635057f66ec15251f98c2d68a)]:
  - @santi020k/theme@0.1.0
