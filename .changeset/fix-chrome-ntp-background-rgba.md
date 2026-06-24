---
"santi020k-chrome-theme": patch
---

Fix "could not decode image" error for `theme_ntp_background.png` in both dark and light variants. The PNG was generated as RGBA by `sips`, which Chrome's theme engine cannot decode. Switched to `sharp` to produce an opaque RGB PNG.
