# Asset Guide

Assets in this package are organized by how the VS Code Marketplace consumes them.

## Packaged Assets

| Path | Purpose | Notes |
| --- | --- | --- |
| `../icon.png` | Marketplace extension icon | Must stay at the package root and remain a 128x128 PNG because `package.json` points to it directly. |
| `previews/preview-dark.png` | Dark theme README preview | Real VS Code screenshot, 3024x1898 PNG. |
| `previews/preview-light.png` | Light theme README preview | Real VS Code screenshot, 3024x1898 PNG. |
| `previews/preview-hc-dark.png` | High contrast dark README preview | Real VS Code screenshot, 3024x1898 PNG. |
| `previews/preview-hc-light.png` | High contrast light README preview | Real VS Code screenshot, 3024x1898 PNG. |

## Source Assets

| Path | Purpose | Notes |
| --- | --- | --- |
| `../icon.svg` | Icon source | Source-only. Excluded from the packaged VSIX. |

The canonical captures are `source/previews/preview-{dark,light,hc-dark,hc-light}.png`.
They were captured on macOS in Visual Studio Code 1.139.1 with the installed
Santi020k Theme 2.1.4, showing `packages/theme-core/utils.js`. These show the
installed extension, rather than claiming to preview an unpublished release candidate.
The same window size, file, scroll position, and layout are used for all four modes.
The user's font and Explorer placement are retained; no editor UI is fabricated.

To refresh, capture the actual editor in each named base variant and replace the
matching PNG. Keep private files, credentials, notifications, and unrelated tabs
out of the capture. Restore the user's theme and layout after capture.

Run `pnpm run generate:vscode-previews` to copy those PNG captures and sync
the package, shared assets, website copies, and portfolio preview. The command
preserves the screenshot dimensions and does not recreate or recolor the UI.
PNG is the supported screenshot format. The v3 shared package removes the former
SVG wrappers; update screenshot imports from `.svg` to `.png`.

## Brand Rules

- Keep rendered previews in the theme palette: indigo-black or purple-tinted surfaces with violet accents.
- Keep source files in `assets/source/` so the packaged extension contains only marketplace-ready raster assets.
- Update this guide, `README.md`, and `scripts/check-marketplace-readiness.mjs` whenever adding, removing, or renaming package assets.
