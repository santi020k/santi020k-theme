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
