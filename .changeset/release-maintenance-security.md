---
"santi020k-theme": patch
"@santi020k/santi020k-theme-website": patch
---

Refresh compatible build, test, lint, and deployment dependencies. Remove unused internal path helpers and redundant security override selectors, and extend unused-code analysis to root scripts, nested routes, and website TypeScript.

Share the existing VSCE 4 dependency with Open VSX to remove the unpatched braces dependency chain. Verify source packaging, prebuilt artifact upload, duplicate handling, and registry failures against a temporary local registry. The full dependency audit reports no known vulnerabilities; production publishing remains in the existing GitHub workflow.
