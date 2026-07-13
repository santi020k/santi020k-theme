# Create a Santi020k theme port

Use the starter under `templates/theme-port` when bringing the violet system to another application.

1. Copy the starter directory and rename it for the target application.
2. Read `docs/brand-guidelines.md` and import colors from `packages/theme/tokens/tokens.json` or `packages/santi020k-terminal-theme/palettes.mjs`.
3. Implement dark and light together. Add high contrast when the target supports it.
4. Map semantic roles before application-specific decoration: canvas, surfaces, primary text, secondary text, focus, selection, errors, warnings, success, and links.
5. Capture the supplied code samples or real application UI in both modes.
6. Document installation and run the target application's validator or parser.
7. Open a pull request with screenshots, installation instructions, and the generated files.

Official ports must preserve the purple/indigo identity, meet the contrast requirements in the brand guide, and avoid one-off colors when a shared semantic role exists.
