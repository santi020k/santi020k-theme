# Release Checklist

## Required Repo State

- `package.json` version matches `package-lock.json`
- `README.md`, `CHANGELOG.md`, `LICENSE`, and `icon.png` are present
- `.vscodeignore` excludes CI, Changesets metadata, scripts, websites, and dependencies from the VSIX
- Theme JSON files parse successfully
- `npm run validate` passes

## Secrets

- `VSCE_PAT`: Azure DevOps token with Marketplace Manage scope
- `OVSX_PAT`: Open VSX token for the namespace
- `GITHUB_TOKEN`: provided by GitHub Actions

## Publish Safety

- Use `--skip-duplicate` where supported
- Check registry versions before publishing
- Do not publish when local validation fails
- Prefer release PRs for version/changelog changes
