# Halo wallpapers

Halo adds a circular matte recess to the Minimal collection. The built-in imagegen tool
produced four separately composed PNG masters: dark/light, desktop/phone. `prompts.json`
contains the exact prompts and references. No image API is called by normal builds.

`pnpm run generate:wallpapers` creates the usual PNG/WEBP display exports and the eight-file
Minimal v2 WEBP pack, including Contour. The first pack and all previous URLs are preserved.

The website's development and build preparation runs `scripts/generate-wallpaper-downloads.mjs` to create
additional JPG, PNG, and WEBP downloads from each current design's native master. Generated
downloads are ignored by Git and copied into the static deployment. A content fingerprint
reuses unchanged exports locally; missing files are regenerated. No server or image service
is required in production.

Desktop sizes: 1920 × 1080, 2560 × 1440, 3840 × 2160. Phone sizes: 1080 × 2340 and
1170 × 2532. WEBP offers smaller-file and high-quality compression; JPG uses high quality,
and PNG is lossless. Sizes are resized from generated raster masters, not native 4K detail.
