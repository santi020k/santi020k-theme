# Consolidated website redirects

The five existing legacy Cloudflare Pages projects now deploy only the `_redirects` files in `legacy-pages/`. This keeps their custom domains active while permanently forwarding visitors to the matching consolidated route. The main deployment workflow republishes these redirect-only projects after every consolidated-site release.

Current redirects:

```text
https://vscode.santi020k.com/ → https://theme.santi020k.com/vscode/
https://chrome.santi020k.com/ → https://theme.santi020k.com/chrome/
https://terminal.santi020k.com/ → https://theme.santi020k.com/terminal/
https://zed.santi020k.com/ → https://theme.santi020k.com/zed/
https://codex.santi020k.com/ → https://theme.santi020k.com/codex/
```

Path suffixes are preserved, so the old Terminal documentation URLs continue to resolve under `/terminal/docs/`.

`legacy-website-redirects.csv` remains available as a DNS-level Bulk Redirect alternative and includes the currently unused `iterm.santi020k.com` hostname. The entries use permanent redirects, preserve query strings, and preserve old path suffixes.

If migrating from Pages redirects to a Bulk Redirect List later:

1. Create and enable one Bulk Redirect Rule for the list.
2. Keep proxied DNS records for `vscode`, `chrome`, `terminal`, `zed`, `codex`, and `iterm` so Cloudflare can terminate HTTPS and evaluate the rule.
3. Attach `theme.santi020k.com` only to the consolidated Pages project.
4. Verify both each old homepage and at least one nested Terminal documentation URL before removing the legacy Pages custom-domain associations.

Cloudflare CSV column order is source URL, target URL, status code, preserve query string, include subdomains, subpath matching, and preserve path suffix. The CSV intentionally has no header row because Cloudflare Bulk Redirect imports do not accept one.
