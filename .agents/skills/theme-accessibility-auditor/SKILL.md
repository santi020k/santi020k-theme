---
name: theme-accessibility-auditor
description: Audit VS Code themes and theme websites for accessibility. Use when checking color contrast, text readability, focus states, hover states, modal readability, syntax legibility, reduced motion, keyboard navigation, or visual regressions in theme previews.
---

# Theme Accessibility Auditor

## Audit Workflow

1. Identify surfaces: editor, sidebar, tabs, status bar, inputs, buttons, quick input, notifications, modals, settings, terminal, website preview.
2. Check contrast for primary text and interactive controls before decorative or low-priority text.
3. Review both dark and light variants.
4. Prefer concrete file/line findings and exact color pairs.
5. If changing code, keep visual identity intact and adjust the smallest color/token set that fixes the issue.
6. Validate with existing scripts and, for websites, use a browser screenshot when possible.

## Contrast Priorities

- Must meet 4.5:1 for normal UI text and editor foreground text.
- Aim for 3:1 or better for large text, icons, borders, placeholders, inactive labels, and focus indicators.
- Comments can be subdued, but should remain readable for long sessions unless the theme intentionally makes them near-invisible and documents that tradeoff.

## Common Risks

- Low-contrast comments or line numbers
- Placeholder text blending into inputs
- Light theme buttons with insufficient foreground contrast
- Focus rings missing on website links/buttons
- Modal content using default foreground on themed background
- Syntax colors that are beautiful alone but indistinct as a set
- Terminal ANSI colors failing on the configured terminal background

## References

Read [references/audit-pairs.md](references/audit-pairs.md) for useful color pairs to check in theme extensions.
