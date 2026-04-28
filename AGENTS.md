# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Shape

This is a VS Code color theme extension named `santi020k-theme`.

- Theme files live in `themes/`.
- The marketing/preview website lives in `website/`.
- Release automation uses Changesets and publishes to both the Visual Studio Marketplace and Open VSX.
- Validation scripts live in `scripts/`.

## Repo-Local Skills

Task-specific AI skills are vendored under `.agents/skills/`:

- `.agents/skills/vscode-theme-maintainer`
- `.agents/skills/marketplace-release-manager`
- `.agents/skills/theme-accessibility-auditor`
- `.agents/skills/repo-ci-triager`

Use them when the task matches their names. If your agent runtime cannot load skills directly, read the relevant `SKILL.md` file before editing.

## Useful Commands

```bash
npm run validate:themes
npm run validate:marketplace
npm run validate
npm run package -- --no-dependencies
npm run release
npm run changeset
```

Prefer `npm run validate` before finishing any user-visible change. It parses theme JSON, checks marketplace readiness, builds the website, and packages the extension.

## Theme Editing Rules

- Update both `themes/santi020k-dark-color-theme.json` and `themes/santi020k-light-color-theme.json` together unless the user explicitly asks for one variant.
- Keep the purple/indigo visual identity intact unless the request is a redesign.
- When adding UI color coverage, add related state tokens together: background, foreground, border, hover, focus, inactive/unfocused.
- Modal-like surfaces usually depend on shared tokens such as `foreground`, `descriptionForeground`, `editorWidget.*`, `widget.*`, `textLink.*`, `input*`, `button*`, `checkbox*`, `dropdown*`, `quickInput*`, and notification tokens.
- For syntax and editor intelligence, check both TextMate `tokenColors` and `semanticTokenColors`.
- Do not hand-edit generated VSIX files. They are build artifacts.

## Release Rules

- Add a changeset for user-visible changes: `npm run changeset`.
- Use `patch` for fixes/docs/release automation, `minor` for new theme coverage or significant capability additions, and `major` only for breaking compatibility changes.
- Do not manually bump `package.json` or `CHANGELOG.md` for normal feature PRs; Changesets handles that in the release PR.
- The release script is expected to be idempotent and skip already-published versions.
- Required publish secrets are `VSCE_PAT` and `OVSX_PAT`.

## Website Rules

- Website source is under `website/`.
- Build with `npm run site:build` from the repo root.
- Keep visible focus styles and external-link safety intact.
- The site is deployed outside the extension package; `.vscodeignore` should continue excluding `website/**`.

## Validation Expectations

Before finalizing code changes, run the narrowest useful check first, then the full validation if feasible.

- Theme-only changes: `npm run validate:themes`
- Package metadata/release changes: `npm run validate:marketplace`
- Release-ready changes: `npm run validate`

If a command cannot be run, state why and what risk remains.
