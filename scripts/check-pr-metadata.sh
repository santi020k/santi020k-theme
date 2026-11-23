#!/usr/bin/env bash
set -euo pipefail

# Validates the pull request title and changeset requirement from live GitHub data,
# so a re-run after a title or label edit never checks a stale event payload.
: "${PR_NUMBER:?Set PR_NUMBER to the pull request number}"
: "${GITHUB_REPOSITORY:?Set GITHUB_REPOSITORY to owner/name}"

metadata="$(gh pr view "$PR_NUMBER" --repo "$GITHUB_REPOSITORY" --json title,labels,headRefName)"

jq --raw-output '.title' <<<"$metadata" | pnpm exec commitprompt validate --input -

branch="$(jq --raw-output '.headRefName' <<<"$metadata")"
if [[ "$branch" == release/v* ]]; then
  version="$(node -p "require('./packages/santi020k-theme/package.json').version")"
  if [[ "$branch" != "release/v$version" ]]; then
    echo 'Prepared release branch does not match the extension version.' >&2
    exit 1
  fi
  echo 'Prepared release version matches; Changesets have already been consumed.'
  exit 0
fi

if [[ "$branch" == changeset-release/* ]]; then
  echo 'Changesets release pull request; a changeset is not required.'
  exit 0
fi

if jq --exit-status 'any(.labels[]; .name == "skip-changelog")' <<<"$metadata" >/dev/null; then
  echo 'skip-changelog label present; a changeset is not required.'
  exit 0
fi

pnpm changeset status --since=origin/main
