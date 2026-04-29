---
name: repo-ci-triager
description: Diagnose and fix repository CI failures. Use when GitHub Actions, local validation, package builds, VSIX packaging, release workflows, Changesets checks, marketplace publishing, Open VSX publishing, or website builds fail.
---

# Repo CI Triager

## Triage Workflow

1. Reproduce locally when possible using the failing workflow command.
2. Read the relevant workflow file and package scripts before editing.
3. Separate environment failures from code failures:
   - install/cache issues
   - validation failures
   - package artifact contents
   - missing secrets or permissions
   - registry duplicate/version issues
4. Fix the narrowest cause.
5. Rerun the smallest relevant command first, then the full validation.
6. Report whether the fix was verified locally or still requires GitHub Actions.

## Common Commands

```bash
npm ci
npm run validate
npm run validate:themes
npm run validate:marketplace
npm run site:build
npm run package -- --no-dependencies
npm run release
npx changeset status
```

## GitHub Actions Checks

- Confirm workflow permissions match the action: release PRs need `contents: write` and `pull-requests: write`.
- Confirm secrets are referenced only in publish/deploy jobs, not untrusted PR contexts.
- Prefer `npm ci` in CI.
- Keep release publish scripts idempotent so reruns do not fail on duplicate versions.
- Inspect VSIX file lists for accidentally bundled scripts, CI files, websites, or `.changeset`.

## References

Read [references/failure-map.md](references/failure-map.md) for quick symptom-to-cause mapping.
