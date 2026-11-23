# Quality v2 rollout for v3.2.0

The next minor release after published v3.1.0 pins Quality 2.0.0 and immutable
shared setup actions. Existing website-only affected validation remains active;
the new dependency graph runs in shadow mode and does not execute commands or
replace the full release gate. Shared tokens, scripts, configuration, unknown
paths and unavailable history select the complete graph. Security checks remain
fresh. Theme and port inputs propagate to the consolidated website and links.

Planning runs alongside repository and native appearance checks. The existing
Required checks name now rejects failure, cancellation or skipping of any of
those jobs. Marketplace, Chrome, Zed and terminal release adapters are unchanged.

Website deployment installs dependencies once through the shared setup action.
After the consolidated website succeeds, the five independent legacy redirect
projects deploy concurrently. Every process is awaited and any failure fails the
job. Production runs remain serialized; no signing, secret or provider changes
are required. Failed jobs still rebuild on retry; this change does not introduce
cross-run artifact promotion or claim that unmeasured graph selections are safe.

Run the policy and redirect tests with the pinned Quality on PATH:
`node --test scripts/quality-impact.node-test.mjs`. Run canonical lint and type
checks locally and the complete release gate before publication. Recovery is a
revert of the pipeline change followed by full validation; never move a published
tag. Version and changelog generation remains owned by Changesets.

## Pipeline timing follow-up

The root `pnpm run release` runs a fresh dependency audit and validates the workspace once. It then calls the VS Code
package's `release:validated` script, which publishes the VSIX that validation just
packaged. Running `pnpm --filter santi020k-theme run release` directly still validates
first. Registry idempotence, publish credentials and release tags are unchanged.

CI runs for pull requests and for pushes to `main`. Release branches are validated
through their pull requests instead of a second push run. Title and label edits also
re-run the required CI aggregate. Its separate metadata job reads the live title and
labels, so invalid metadata cannot leave an older successful aggregate authoritative.
Prepared `release/v<version>` branches must match the extension package version before
skipping the Changesets-presence check after canonical version preparation.

Native macOS wallpaper validation runs when `artwork/`, `scripts/wallpapers/`,
`scripts/build-appearance-wallpapers.mjs`, `scripts/ci-scope.mjs` or the CI workflow
change. It always runs for release and Changesets pull requests, manual runs, and
whenever history cannot be read. The Required checks gate accepts a skipped native job
only when the plan explicitly reports no wallpaper input changed.

The live dependency audit blocks every pull request and main push through Required
checks. The daily `.github/workflows/dependency-audit.yml` run supplements that gate.
A failed, cancelled or skipped audit or metadata job cannot pass the aggregate.

The Chrome release workflow now triggers only on the paths its publish detection reads.

## Security qualification

Workspace tooling requires Node.js 22.23.4 for Astro 7.4.13. Scoped overrides update
vulnerable qs to 6.17.1, glob 9–13 to 14.0.6 and minimatch 7–10 to 11.0.9; import-x
4.18.1 retains the matcher integration. The existing MSAL backport and its audit guard
remain in force. No published package exports or runtime engines change.

A narrow astro2tsx 0.1.2 package extension supplies @emnapi/runtime 1.11.3 beside its
fixed core 1.11.3, avoiding an incompatible optional v2 beta peer. Remove this extension
when upstream declares the matching runtime. Remove security overrides when consumers
adopt patched ranges. Full validation, packaging, and native wallpaper checks must pass
before the normal Marketplace/Open VSX and website workflows publish this revision.
