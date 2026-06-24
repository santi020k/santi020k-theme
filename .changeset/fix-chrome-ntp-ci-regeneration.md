---
"santi020k-chrome-theme": patch
---

Always regenerate NTP background images in CI before packaging to prevent RGBA PNGs from being bundled. Adds a `sync:ntp-images` script (portable, no Chrome dependency) wired into the release workflow, and a packaging-time guard that fails with a clear error if a PNG is not opaque RGB.

Tighten the Chrome Web Store package by rasterizing NTP backgrounds as 1920x1080 store-safe RGB PNGs without ancillary chunks, validating that encoding, and shipping only the manifest-referenced image and icons in each variant zip.
