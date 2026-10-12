# Signature wallpaper options

Satin and Ceramic add two material directions to the Signature collection. Each includes
dark and light desktop artwork and independently composed phone artwork, with the familiar
purple tile and white Santi020k terminal prompt. The original glass set remains available.

The PNG files here are native raster masters produced with the built-in imagegen tool.
`prompts.json` records the exact prompts and references. Normal builds do not call an
image-generation API. These are wallpaper compositions, not alternate logo assets.

Run `pnpm run generate:wallpapers` to reproduce the display exports:

- Desktop: 3840 × 2160 PNG and WEBP.
- Phone: 1170 × 2532 PNG and WEBP.
- Complete Signature pack: twelve WEBP files in `santi020k-signature-wallpapers-v2.zip`,
  including all four original glass wallpapers.

Exports live in `packages/theme/assets/wallpapers/signature-v2/`. Display sizes are resized
from the native masters, not native 4K generation. The first Signature archive and all
existing artwork paths are retained unchanged. Individual PNG downloads remain available.
