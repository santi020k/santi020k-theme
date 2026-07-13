# VS Code compatibility matrix

Santi020k Theme covers VS Code's core workbench and modern developer surfaces in every dark, light, high-contrast, bold, and italic variant.

| Surface | Coverage evidence |
| --- | --- |
| GitLens and GitHub Pull Requests | Source-control, diff, list, badge, tree, input, panel, notification, and editor decoration roles |
| Error Lens and diagnostics | Error, warning, information, hint, overview-ruler, gutter, peek, and inline-message roles |
| Copilot and inline chat | `chat.*`, `inlineChat.*`, inline diff, ghost text, and interactive editor roles |
| Testing and debugging | `testing.*`, `debugIcon.*`, debug toolbar, exception, state, and token-expression roles |
| Notebooks | Cell, editor, output, toolbar, status, scrollbar, and focused/selected states |
| Remote development | Remote status bar, extension badge, terminal, ports, and notification roles |

`pnpm run validate:themes` checks required modern surface tokens, parity across generated variants, and contrast thresholds. When a new VS Code surface becomes important, add its related state tokens together and extend the required-key fixture in `packages/santi020k-theme/scripts/validate-themes.mjs`.
