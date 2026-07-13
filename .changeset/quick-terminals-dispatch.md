---
"santi020k-terminal-theme": patch
---

Explicitly dispatch the Terminal release workflow after creating its tag so GitHub Actions does not suppress the follow-up run created with `GITHUB_TOKEN`.
