# Agent Roles

This directory keeps project-owned agent role definitions in one provider-neutral place.

All roles should read `../../docs/brand-guidelines.md` before brand-sensitive changes. That file is the source of truth for product names, palette language, copy voice, assets, screenshots, and cross-surface consistency.

Use these roles when a task is large enough to split by domain:

```text
Use the repo agent roles for this review. Run one agent for theme maintenance,
one for accessibility, one for websites, and one for release readiness. Wait
for all of them, then summarize findings by severity with file references.
```

Available roles:

- `theme-maintainer`: VS Code theme JSON, TextMate scopes, semantic tokens, package validation.
- `accessibility-auditor`: contrast, focus states, readability, screenshots, reduced motion.
- `website-maintainer`: hub, VS Code website, Chrome website, shared frontend code.
- `chrome-theme-maintainer`: Chrome theme generation, NTP images, manifest packaging.
- `release-manager`: Changesets, VSIX packaging, Marketplace and Open VSX publishing.
- `ci-triager`: failing builds, lint, tests, validation, GitHub Actions.

Provider-specific launchers may mirror these files into their expected config directories, but the authored repo guidance should stay here.
