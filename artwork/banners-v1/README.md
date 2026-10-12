# Studio and Orbit

Eight raster masters generated with Codex's built-in image generation on October 12, 2026.
The exact prompts and reference relationships are recorded in [prompts.json](prompts.json).

- Studio: ceramic arch, violet glass, stone, and a small terminal prompt tile.
- Orbit: a floating violet glass sphere with thin intersecting rings.
- Each design has a light and dark wide banner and a separately composed square cover.
- Wide masters are 2172 × 724; square masters are 1254 × 1254. These are raster images.

Run `node scripts/generate-banner-downloads.mjs` from the repository root to create the
website's ignored `public/downloads/banners-v1/` outputs. The normal website build and root
test preparation also run this generator. Downloads are 2160 × 720 or 1200 × 1200, without
upscaling, in lossless PNG, high-quality JPG, and smaller/high-quality WEBP. Half-size WEBP
previews keep the gallery lightweight. The dedicated 1200 × 630 social crop is only used
for link previews; downloadable wide and square compositions remain intact.

These gallery assets are separate from the earlier Sculpted Orbit wallpaper, which stays in
the Classic archive at its existing URLs. Permanent pages use `/gallery/banners/studio/`
and `/gallery/banners/orbit/`. Future artwork revisions should get new versioned paths.
