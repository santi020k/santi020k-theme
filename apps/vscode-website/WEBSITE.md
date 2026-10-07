# VS Code product page

This Astro source module is composed into `apps/website` at `/vscode/`.

The canonical visual direction lives in [the brand guide](../../docs/brand-guidelines.md). Shared website colors, typography, spacing, and radii come from `@santi020k/theme/site.css`; keep product-specific preview colors separate from the page theme.

## Composition

- A solid reading canvas, one shared content grid, sentence-case headings, and fine section rules.
- One primary Marketplace action, quiet alternative install links, and a copyable installation command.
- An interactive editor with compact Lumen custom lists, keyboard navigation, visible focus, and larger touch targets.
- Four solid mode samples and real VS Code screenshots. Screenshot assets already include their window borders and corners: do not wrap them in a second bordered card or join captions to the image frame.
- Open numbered philosophy rows and quiet editor, language, and compatibility lists.
- One settings panel with a custom syntax-style list, optional settings, and copy feedback.

Keep actual editor screenshots and theme samples faithful to their source palettes. Preserve the shared navigation and footer, independent page/preview theme selection, reduced motion, and responsive layouts.

## Verification

Run `pnpm run validate` from the repository root. Check `/vscode/` in light and dark modes at desktop and mobile widths, including all custom lists, keyboard dismissal and selection, settings output, and copy feedback. Capture matching before/after screenshots for material visual changes.

See [README.md](README.md) for source paths, commands, and version synchronization.
