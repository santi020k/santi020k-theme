---
"santi020k-chrome-theme": patch
---

Add `generate-store-assets.mjs` to generate Chrome Web Store promotional images for the dark theme variant (promo tile, marquee banner, and three screenshots) from the same HTML-rendered approach used by the light variant. Both themes are now regenerated together via `pnpm run sync:assets`.
