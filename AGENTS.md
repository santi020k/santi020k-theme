# AGENTS.md

Guidance for AI coding agents working in this repository.

## Project Shape

This is a Santi020k theme family monorepo centered on the `santi020k-theme` VS Code extension.

- Theme files live in `packages/santi020k-theme/themes/`.
- The published VS Code extension package lives in `packages/santi020k-theme/`.
- The Chrome browser theme package lives in `packages/santi020k-chrome-theme/`.
- The theme hub website lives in `apps/website/`.
- The VS Code theme website lives in `apps/vscode-website/`.
- The Chrome theme website lives in `apps/chrome-website/`.
- Release automation uses Changesets and publishes to both the Visual Studio Marketplace and Open VSX.
- VS Code extension validation and release scripts live in `packages/santi020k-theme/scripts/`.
- App-specific scripts live inside their owning `apps/*` workspace.

## Repo-Local Skills

Task-specific AI skills are vendored under `.agents/skills/`:

- `.agents/skills/vscode-theme-maintainer`
- `.agents/skills/marketplace-release-manager`
- `.agents/skills/theme-accessibility-auditor`
- `.agents/skills/repo-ci-triager`

Use them when the task matches their names. If your agent runtime cannot load skills directly, read the relevant `SKILL.md` file before editing.

## Useful Commands

```bash
pnpm run validate:themes
pnpm run validate:marketplace
pnpm run validate
pnpm run package:extension
pnpm run release
pnpm run changeset
pnpm run commit
```

Prefer `pnpm run validate` before finishing any user-visible change. It parses theme JSON, checks marketplace readiness, builds the website, and packages the extension.

## Theme Editing Rules

- Update both `packages/santi020k-theme/themes/santi020k-dark-color-theme.json` and `packages/santi020k-theme/themes/santi020k-light-color-theme.json` together unless the user explicitly asks for one variant.
- Keep the purple/indigo visual identity intact unless the request is a redesign.
- When adding UI color coverage, add related state tokens together: background, foreground, border, hover, focus, inactive/unfocused.
- Modal-like surfaces usually depend on shared tokens such as `foreground`, `descriptionForeground`, `editorWidget.*`, `widget.*`, `textLink.*`, `input*`, `button*`, `checkbox*`, `dropdown*`, `quickInput*`, and notification tokens.
- For syntax and editor intelligence, check both TextMate `tokenColors` and `semanticTokenColors`.
- Do not hand-edit generated VSIX files. They are build artifacts.

## Release Rules

- Add a changeset for user-visible changes: `pnpm run changeset`.
- Use `patch` for fixes/docs/release automation, `minor` for new theme coverage or significant capability additions, and `major` only for breaking compatibility changes.
- Do not manually bump `packages/santi020k-theme/package.json` or `packages/santi020k-theme/CHANGELOG.md` for normal feature PRs; Changesets handles that in the release PR.
- The release script is expected to be idempotent and skip already-published versions.
- Required publish secrets are `VSCE_PAT` and `OVSX_PAT`.

## Website Rules

- Website source is under `apps/website/`.
- VS Code website source is under `apps/vscode-website/`.
- Chrome website source is under `apps/chrome-website/`.
- Build with `pnpm run site:build` from the repo root.
- Keep visible focus styles and external-link safety intact.
- The site is deployed outside the extension package; `packages/santi020k-theme/.vscodeignore` should continue excluding repo-only app and tooling paths.

## Validation Expectations

Before finalizing code changes, run the narrowest useful check first, then the full validation if feasible.

- Theme-only changes: `pnpm run validate:themes`
- Package metadata/release changes: `pnpm run validate:marketplace`
- Release-ready changes: `pnpm run validate`

If a command cannot be run, state why and what risk remains.
