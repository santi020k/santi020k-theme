# Signature wallpapers

Four branded compositions place the Santi020k white terminal prompt on a purple rounded
tile among translucent violet glass forms. Dark and light desktop artwork leaves quiet
space for icons; separately composed phone artwork leaves space above for a clock.
The canonical logo remains unchanged. Tide, Dune, Veil, and Classic downloads are retained.

These PNG files are native raster masters made with the built-in imagegen tool.
`prompts.json` records the exact prompts and reference relationships, including the canonical
logo. They are wallpaper compositions, not replacement logo assets. Normal builds do not
call an image-generation API.

Run `pnpm run generate:wallpapers` to reproduce the display exports:

- Desktop: 3840 × 2160 PNG and WEBP.
- Phone: 1170 × 2532 PNG and WEBP.
- Collection archive: four WEBP files in `santi020k-signature-wallpapers-v1.zip`.

Exports live in `packages/theme/assets/wallpapers/signature-v1/`. These display dimensions
are resized from the original masters, not native 4K generation. PNG files are available
individually; the collection archive uses WEBP for a compact download.
