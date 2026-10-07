# Minimal wallpapers

Contour takes its direction from the personal website's sculpted navbar corners, fine rules,
quiet canvas, and small violet accents. A shallow matte surface enters the edge of the image;
the canonical purple prompt remains a small inset detail. No page UI or portrait is reproduced.
Each appearance has separately composed desktop and phone artwork with generous empty space.

The PNG files here are native raster masters produced with the built-in imagegen tool.
`prompts.json` records the exact prompts and references. The website reference was the locally
rendered personal website v4, with its direction documented in that repository's
`docs/sculpted-style-guide.md`. Normal builds do not call an image-generation API.

Run `pnpm run generate:wallpapers` to reproduce display exports:

- Desktop: 3840 × 2160 PNG and WEBP.
- Phone: 1170 × 2532 PNG and WEBP.
- Minimal pack: four WEBP files in `santi020k-minimal-wallpapers-v1.zip`.

Exports live in `packages/theme/assets/wallpapers/minimal-v1/`. Display sizes are resized
from the native masters, not native 4K generation. Every previous asset and archive remains
available. Individual PNG downloads are also available in the gallery.
