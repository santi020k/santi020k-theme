# Santi020k Theme Tokens

This directory is the source of truth for generated VS Code theme files.

The base theme token files under `vscode/base-themes/` preserve the canonical
Santi020k workbench, syntax, and semantic colors. Build scripts generate the
checked-in `themes/*.json` files from these sources, then derive high-contrast
light, bold, and italic variants.

Edit token sources first, then run:

```bash
pnpm --filter santi020k-theme run build:themes
```

The Sculpted visual direction uses solid neutral primary actions and violet focus indicators in both standard modes. Syntax colors and the high-contrast dark palette retain their established roles. Platform typography and control geometry remain native to each host; the complete visual direction is defined in [`docs/brand-guidelines.md`](../../../../docs/brand-guidelines.md).
