---
"santi020k-chrome-theme": patch
---

Always regenerate NTP background images in CI before packaging to prevent RGBA PNGs from being bundled. Adds a `sync:ntp-images` script (portable, no Chrome dependency) wired into the release workflow, and a packaging-time guard that fails with a clear error if a PNG is not opaque RGB.
