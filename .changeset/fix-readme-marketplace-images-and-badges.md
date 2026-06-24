---
"santi020k-theme": patch
---

Fix preview images and badge URLs in the marketplace README. Preview images now use absolute `raw.githubusercontent.com` URLs so they render correctly in the VS Code Marketplace (relative paths are not resolved by the marketplace renderer). Badge URLs are pinned to `shields.io` with an inline comment and AGENTS.md rules to prevent future regressions from AI assistants substituting defunct alternatives.
