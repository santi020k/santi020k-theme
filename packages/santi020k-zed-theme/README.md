# santi020k-zed-theme

Santi020k Theme for the Zed editor.

This package generates a Zed-compatible theme family from the existing VS Code dark and light palettes so the editor surfaces stay aligned across products.

## Included themes

- `Santi020k Dark`
- `Santi020k Light`

## Development

```bash
pnpm --filter santi020k-zed-theme run build
pnpm --filter santi020k-zed-theme run validate
```

The generated theme file is written to `themes/santi020k.json`.

## Using locally in Zed

Copy `themes/santi020k.json` into your Zed themes directory:

```bash
mkdir -p ~/.config/zed/themes
cp packages/santi020k-zed-theme/themes/santi020k.json ~/.config/zed/themes/santi020k.json
```

Then select `Santi020k Dark` or `Santi020k Light` from Zed's theme selector.
