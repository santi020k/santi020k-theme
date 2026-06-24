---
name: vscode-theme-maintainer
description: Maintain, review, or extend VS Code color theme extensions. Use when working on theme JSON files, workbench color tokens, TextMate token colors, semanticTokenColors, modal/quick input/settings/chat surfaces, VSIX packaging, or theme validation scripts.
---

# VS Code Theme Maintainer

## Workflow

1. Read `AGENTS.md` and `docs/brand-guidelines.md` before brand-sensitive color, copy, asset, or preview changes.
2. Identify whether the request affects workbench UI colors, syntax highlighting, semantic highlighting, package metadata, website preview, or release automation.
3. Read `package.json`, the affected files under `themes/`, and local validation scripts before editing.
4. Keep dark and light variants in sync unless the user explicitly asks for one variant only.
5. Prefer official VS Code color token names. If unsure about newer token names, verify against the VS Code Theme Color Reference or VS Code source.
6. Add or update validation when a change creates a repeatable failure mode.
7. Run the repo's validation command before finishing, usually `pnpm run validate`.

## Theme Editing Rules

- Preserve the existing palette language unless the user asks for a redesign.
- Add related state tokens together: background, foreground, border, hover, focus, inactive/unfocused states.
- For modal-like surfaces, check shared widget paths: `editorWidget.*`, `widget.*`, `foreground`, `descriptionForeground`, `textLink.*`, `input*`, `button*`, `checkbox*`, `dropdown*`, `quickInput*`, and notification colors.
- For modern editor readability, check `semanticTokenColors`, `editorInlayHint.*`, `editorGhostText.*`, `editorCodeLens.foreground`, and sticky scroll colors.
- For release-worthy color changes, add a changeset unless the repo explicitly says to skip changelog.

## Validation

Use local project commands when present:

```bash
pnpm run validate:themes
pnpm run validate:marketplace
pnpm run validate
```

If the repo has no validation scripts, parse all theme JSON files with Node and package with `vsce package --no-dependencies`.

## References

Read [references/theme-surfaces.md](references/theme-surfaces.md) when adding UI token coverage across VS Code surfaces.
