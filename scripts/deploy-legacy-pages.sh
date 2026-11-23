#!/usr/bin/env bash
set -euo pipefail

# Different Cloudflare projects can deploy independently. Await every process so
# one failed redirect deployment cannot be hidden by a later successful job.
children=()
for project in santi020k-vscode-theme santi020k-chrome-theme santi020k-terminal-theme santi020k-zed-theme santi020k-codex-theme; do
  pnpm exec wrangler pages deploy "cloudflare/legacy-pages/$project" --project-name="$project" --branch=main &
  children+=("$!")
done
status=0
for child in "${children[@]}"; do
  if ! wait "$child"; then status=1; fi
done
exit "$status"
