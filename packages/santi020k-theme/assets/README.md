# Asset Guide

Assets in this package are organized by how the VS Code Marketplace consumes them.

## Packaged Assets

| Path | Purpose | Notes |
| --- | --- | --- |
| `../icon.png` | Marketplace extension icon | Must stay at the package root and remain a 128x128 PNG because `package.json` points to it directly. |
| `previews/preview-dark.png` | Dark theme README preview | Rendered 1280x720 PNG. |
| `previews/preview-light.png` | Light theme README preview | Rendered 1280x720 PNG. |
| `previews/preview-hc-dark.png` | High contrast dark README preview | Rendered 1280x720 PNG. |
| `previews/preview-hc-light.png` | High contrast light README preview | Rendered 1280x720 PNG. |

## Source Assets

| Path | Purpose | Notes |
| --- | --- | --- |
| `../icon.svg` | Icon source | Source-only. Excluded from the packaged VSIX. |
| `source/previews/preview-dark.svg` | Dark preview source | Source-only. Excluded from the packaged VSIX. |
| `source/previews/preview-light.svg` | Light preview source | Source-only. Excluded from the packaged VSIX. |
| `source/previews/preview-hc-light.svg` | High contrast light preview source | Source-only. Excluded from the packaged VSIX. |

## Brand Rules

- Keep rendered previews in the theme palette: indigo-black or purple-tinted surfaces with violet accents.
- Keep source files in `assets/source/` so the packaged extension contains only marketplace-ready raster assets.
- Update this guide, `README.md`, and `scripts/check-marketplace-readiness.mjs` whenever adding, removing, or renaming package assets.
