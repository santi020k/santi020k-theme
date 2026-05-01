---
"santi020k-theme": minor
---

Accessibility, contrast, and quality improvements across all 12 theme variants:

**Accessibility (contrast)**
- Dark: lift comment foreground `#71569f` → `#8d70c0` (~2.3:1 → ~3.8:1 on dark background)
- HC-Dark: lift comment foreground `#8264b4` → `#9878cc` for stronger contrast in high-contrast context
- Light: improve inactive line number foreground `#8c82a5` → `#786e96` (meets 3:1 threshold)
- All variants: increase `focusBorder`, `list.focusOutline`, `menu.selectionBorder`, `menubar.selectionBorder`, and `statusBarItem.focusBorder` opacity from ~38% to ~56% for WCAG 2.1 Non-text Contrast compliance
- HC-Light: further increase focus border opacity to ~75% (`c0` alpha) to meet high-contrast expectations
- HC-Light: differentiate punctuation color (`#5c4a7a`) from comment color so they are visually distinct in the HC variant

**Missing token coverage**
- All variants: add `editorBracketPairGuide.activeBackground1–3` and `background1–3` tokens (VS Code 1.67+) keyed to each theme's bracket highlight palette
- All variants: add `editor.wordHighlightTextBackground` (VS Code 1.76+) for read-occurrence highlighting distinct from write-occurrence
- All variants: add `statusBarItem.focusBorder` (VS Code 1.71+) for keyboard-focused status bar items
- All variants: add `widget.border` token for consistent widget border theming

**Visual polish**
- Light & HC-Light: change inactive `breadcrumb.foreground` from fully-saturated accent `#6319be` to muted `#403850`/`#302e36` — the accent is now reserved for `breadcrumb.activeSelectionForeground`
- HC-Dark: add `storage.type.function.arrow` to the Operators TextMate rule so `=>` arrow functions receive operator coloring (matches dark and light variants)
- All variants: align `terminal.inactiveSelectionBackground` alpha to match `editor.inactiveSelectionBackground` for consistency

**Architecture / correctness**
- Dark & Light: remove first duplicate Tailwind CSS TextMate rule (two rules targeted identical scopes; second always won)
- Dark & Light: remove first duplicate Elixir TextMate rule with a different color (second consolidated rule is kept)
- Dark & Light: remove broad `source.elixir`, `source.ruby`, `source.cs` scope overrides that silently suppressed more specific token rules
- HC-Light generator: add explicit post-generation override block for HC-specific color tokens, avoiding the need to hand-edit generated files
