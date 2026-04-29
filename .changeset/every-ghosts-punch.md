---
"santi020k-theme": minor
---

Add semantic token modifiers and new VS Code workbench tokens.

**Semantic token modifiers (both variants)**

- `*.abstract` — italic style, marking abstract classes and methods as conceptual
- `*.async` — teal foreground (`#89b8c8` dark / `#0870a0` light) to distinguish async functions and methods at a glance
- `*.defaultLibrary` — cooler foreground (`#a0c8e0` dark / `#4a1a98` light) for built-in standard library symbols (e.g. `console`, `Array`, `Math` in TypeScript)
- `*.static` — bold style, making static members visually distinct from instance members

All new foreground colors pass WCAG AA (≥ 4.5:1) against their respective editor backgrounds.

**Language-specific TextMate rules (both variants)**

- Rust lifetimes (`entity.name.lifetime.rust`, `punctuation.definition.lifetime.rust`) — amber/italic, making `'a`, `'static` and friends immediately recognisable
- Rust attributes (`meta.attribute.rust`, `punctuation.definition.attribute.rust`) — muted purple/italic, consistent with decorator styling in other languages
- Go built-in functions (`support.function.builtin.go`) — teal, distinguishing `make`, `len`, `append` from user-defined functions
- Go package names (`entity.name.package.go`) — namespace purple, aligning with the existing namespace semantic token

**New workbench tokens (both variants)**

- `editorHoverWidget.highlightForeground` — accent color for matched text inside hover documentation widgets
- `editorActionList.background / foreground / focusBackground / focusForeground` — the floating refactor / code-action picker that appears inline in VS Code 1.90+
