---
"santi020k-theme": minor
---

Add automated token contrast validation and fix accessibility issues.

- **validate-themes**: token contrast check — all `tokenColors` and `semanticTokenColors` foregrounds are now checked against `editor.background` at runtime (3:1 for comments/punctuation/blockquotes, 4.5:1 for all other syntax tokens)
- **validate-themes**: expand workbench contrast pairs to include `terminal`, `statusBar`, `tab.active`, and `button.secondary` foreground/background pairs
- **Dark theme comments**: raise from `#584878` (2.38:1) to `#7060a8` (3.58:1) so they pass the 3:1 floor and are readable in long sessions
- **JSON color differentiation** (both themes): string values and numbers now use distinct hues instead of the same purple family — dark: strings → cyan `#89b8c8`, numbers → amber `#e8b44a`; light: strings → forest green `#1a6a3e`, numbers → burnt amber `#b05500`; keys retain their purple
