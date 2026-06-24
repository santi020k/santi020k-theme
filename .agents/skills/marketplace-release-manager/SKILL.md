---
name: marketplace-release-manager
description: Manage releases for VS Code extensions published to the Visual Studio Marketplace and Open VSX. Use when setting up or debugging Changesets, version bumps, changelogs, VSIX packaging, VSCE_PAT, OVSX_PAT, GitHub release PRs, or registry publish automation.
---

# Marketplace Release Manager

## Release Workflow

1. Read `AGENTS.md` and read `docs/brand-guidelines.md` when release work touches marketplace copy, screenshots, assets, website metadata, or package naming.
2. Inspect `package.json`, lockfiles, `.changeset/`, `.github/workflows/`, and release scripts.
3. Use the repo's preferred release tool. For Changesets repos, do not manually edit changelog/version unless working on the generated release PR.
4. Ensure user-visible changes include a changeset; use `skip-changelog` only when the repo supports that convention.
5. Validate locally before publishing or changing release automation.
6. Publish the same VSIX to both registries when configured:
   - Visual Studio Marketplace: `VSCE_PAT`
   - Open VSX: `OVSX_PAT`

## Safe Automation Pattern

- Use `changesets/action` on pushes to `main` to create/update a release PR.
- On release PR merge, run the repo's publish script.
- Make publish scripts idempotent: skip versions already present in registries.
- Build/package once, then publish the generated VSIX to each registry.
- Avoid tag-only releases unless the repo explicitly uses tag pushes.

## Commands

Prefer project scripts:

```bash
pnpm run changeset
pnpm run version-packages
pnpm run validate
pnpm run release
```

Registry checks may use:

```bash
npx vsce show publisher.extension --json
npx ovsx get publisher.extension
```

## References

Read [references/release-checklist.md](references/release-checklist.md) before changing release workflows or publishing.
