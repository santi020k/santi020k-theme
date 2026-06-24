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
