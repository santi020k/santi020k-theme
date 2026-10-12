# iPhone, Obsidian, and Neovim

These additions extend the existing dark/light palette without changing existing ports or download URLs. Public pages live at `/iphone/`, `/obsidian/`, and `/neovim/` in the consolidated website. Product navigation, homepage cards, footer, sitemap, and SEO checks include all three.

## Sources and downloads

- iPhone: [setup guide](iphone-setup.md), existing Halo Lock Screen and Contour Home Screen PNGs in both appearances. The archive contains four unchanged 1170 × 2532 images, setup instructions, and the license. It provides native icon tint guidance, not an application or configuration profile.
- Obsidian: `packages/santi020k-obsidian-theme`. Generated CSS uses documented variables with dark/light selectors, native layout, and no external resources. The archive contains a `Santi020k` folder with `theme.css` and `manifest.json`, ready for the vault's themes directory. Mobile installation uses the user's existing vault synchronization.
- Neovim: `packages/santi020k-neovim-theme`. A self-contained `colors/santi020k.lua` implements native UI, syntax, Tree-sitter, LSP, diagnostics, and terminal colors. Appearance follows `background`. No plugin dependency or plugin-manager installation from this monorepo's root is required.

Both generators use `scripts/lib/port-palette.mjs`, which reads the canonical VS Code base themes. Foreground colors that need adjustment are blended toward the existing foreground until they reach 4.5:1 contrast on the canvas, floating surfaces, and selection. The sixteen ANSI colors retain the original terminal palette.

`scripts/build-theme-downloads.mjs` generates deterministic ZIPs and individual files under the ignored `apps/website/public/downloads/ports/` directory. Website preparation and the root test lifecycle invoke it; build cache inputs include generators, palette sources, documentation, licenses, and native packages. Changesets version preparation regenerates the Obsidian manifest, and deployment path filters cover both new packages and their generator inputs. Do not hand-edit generated theme artifacts.

## Validation

Run `pnpm run validate:obsidian`, `pnpm run validate:neovim`, then `pnpm run validate` and `pnpm run validate:links`. Archive tests verify native installation paths, filenames, exact generated contents, and all four wallpaper dimensions and source bytes.

The native Neovim test extracts the downloadable archive to a temporary directory and loads it with `--clean`, no user configuration, and no persisted state. It checks repeated appearance changes, highlight links, diagnostics, selection surfaces, and all sixteen terminal colors. Local tests skip this one native test when `nvim` is absent. CI installs the official checksum-pinned Neovim 0.12.6 runtime and sets `REQUIRE_NATIVE_NEOVIM=1` so a missing runtime fails validation.

Obsidian dark/light reading views and theme selection were checked in native Obsidian 1.14.4 on macOS using a disposable vault and profile. Captured example-note screenshots are tracked in the package's `assets/previews/` directory and used on the website. Native Neovim 0.12.5 passes locally. The Neovim page uses an explicitly labeled code preview, not a native screenshot.

Physical iPhone wallpaper setup and Obsidian mobile rendering remain unverified. Website mobile viewport checks do not replace device testing. Installation guidance follows [Apple's customization guide](https://support.apple.com/guide/iphone/customize-apps-and-widgets-on-the-home-screen-iph385473442/ios) and [Obsidian Sync settings](https://help.obsidian.md/sync/settings).

## Distribution and recovery

These are local release-candidate additions. Obsidian is a manual download and is not listed in its community directory. The website's static bundles are delivered by the existing GitHub deployment workflow after an authorized release; no marketplace submission, publishing, or remote change is part of this implementation.

To restore Obsidian, select its default theme before removing the Santi020k theme folder. For Neovim, select another colorscheme and remove the activation line and Lua file. For iPhone, retain and reselect the previous wallpaper pair and icon appearance. A website rollback can remove these new pages and product entries while retaining previous downloads and gallery assets.
