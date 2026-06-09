---
"santi020k-theme": minor
---

Visual polish and usability improvements across all 12 theme variants:

**Find match vs. selection disambiguation**
- Dark: `editor.findMatchBackground` changed from purple `#5a0fdb80` to amber `#e8b44a60` — the active search match is now visually distinct from selected text (which stays purple)
- Dark: `editor.findMatchHighlightBackground` aligned to amber family `#e8b44a25` for consistent search highlighting
- Light: same treatment using the theme's amber `#c07a10` for all find-match surfaces (editor, minimap, overview ruler, terminal, search editor)
- All find-match overview ruler, minimap, and terminal indicators updated to match per theme

**Current line highlight**
- Dark & HC-Dark: added `editor.lineHighlightBackground` (`#ffffff08` / `#ffffff0a`) — a barely-there white wash that marks the cursor row without competing with syntax colors
- Light: added `#00000008` — the equivalent subtle dark wash for the light palette
- HC-Light: propagated automatically via generator

**Ghost text (AI autocomplete) readability**
- Dark & Light: `editorGhostText.foreground` alpha bumped from `88` (53%) to `9a` (60%) for marginally better readability of inline suggestions

**Diff editor visibility**
- All themes: inserted/removed line backgrounds lifted from ~8% opacity to ~13%; gutter indicators lifted from ~19% to ~25%
- Makes diff hunks immediately readable without overwhelming the syntax colors

**Debug inline values**
- Dark: `editor.inlineValuesBackground` from `#322b4040` (25%) to `#322b4058` (35%)
- Light: from `#e3dff060` (37%) to `#e3dff095` (58%)
- HC-Dark: from `#602cba40` (25%) to `#602cba58` (35%)
- Debug variable values shown inline during a debug session are now clearly legible

**Indent guides**
- Dark: inactive guide from 8% → 12% opacity; Light: 6% → 9% — structural indentation is more visible at a glance

**Peek view match highlights**
- Dark: `peekViewResult.matchHighlightBackground` from `#32195d50` to `#5a0fdb45` — matched text in peek result panel is now legible against the dark background
- Light: from `#6319be25` to `#6319be38` — same improvement for the light panel

**Symbol highlight**
- Added missing `editor.symbolHighlightBackground` token to dark (`#752df025`), light (`#6319be12`), and HC-Dark (`#6030b825`) — clicking a symbol now shows a consistent accent glow

**Code lens foreground (dark)**
- `editorCodeLens.foreground` changed from neutral grey `#8d8896` to purple-grey `#9080a8` — reference count annotations align with the violet palette instead of feeling disconnected
