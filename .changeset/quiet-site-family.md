---
'@santi020k/theme': major
'@santi020k/theme-core': major
'@santi020k/santi020k-theme-website': minor
---

Consolidate every public theme page and the complete Terminal documentation under theme.santi020k.com, add shared global and contextual navigation with a theme selector, polish every page family, introduce a compact family-wide footer, and update shared site URLs for the new route-based architecture.

Breaking change: `SiteUrls` now requires `raycast`, `slack`, `jetbrains`, and `xcode` URLs. Consumers that construct `SiteUrls` values must add those fields. Existing product URLs now resolve to routes under `https://theme.santi020k.com/` instead of separate product domains.
