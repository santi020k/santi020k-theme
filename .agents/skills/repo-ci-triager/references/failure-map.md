# CI Failure Map

## Changesets

- "Some packages have been changed but no changesets were found": add a changeset or apply the repo's skip label.
- Release PR does not appear: check workflow permissions and `changesets/action` configuration.

## VSIX Packaging

- Extra files included: update `.vscodeignore`.
- Missing license/icon/readme: check required marketplace files.
- Version mismatch: sync `package.json` and lockfile.

## Marketplace Or Open VSX

- Duplicate version: make publish idempotent or bump version.
- Authentication error: verify `VSCE_PAT` or `OVSX_PAT`.
- Namespace error on Open VSX: ensure namespace exists and token can publish to it.

## Website

- Build fails in CI but not locally: check Node version and lockfile freshness.
- Cloud deploy fails: check provider secrets, account/project names, and output directory.
