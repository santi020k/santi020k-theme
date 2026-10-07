# Sculpted wallpapers, second edition

Tide, Dune, and Veil replace the first Sculpted edition in the featured gallery. Each has dark
and light desktop and independently composed phone artwork. Earlier download paths remain
available. The art has no logo, text, or baked-in interface.

The PNG files here are the original raster masters produced with the built-in imagegen tool.
`prompts.json` records the exact prompts and reference relationships. Regenerating the artwork
is a creative action; normal builds do not call an image-generation API.

Run `pnpm run generate:wallpapers` from the repository root to reproduce the display exports:

- Desktop: 3840 × 2160 PNG and WEBP.
- Phone: 1170 × 2532 PNG and WEBP.
- Gallery pack: all twelve WEBP files in `santi020k-sculpted-wallpapers-v2.zip`.

The export dimensions are resized from the native masters, not native 4K image generation.
PNG downloads remain available individually; the ZIP uses WEBP to stay compact. The exporter
also retains the first edition and Classic assets through the existing generation script.
