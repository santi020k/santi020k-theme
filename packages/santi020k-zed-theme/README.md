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

## Publishing

The package stays at `0.0.0` until the Changesets release PR is generated. The pending major changeset bumps it to `1.0.0`, syncs `extension.toml`, and then `.github/workflows/zed-release.yml` opens a PR against `zed-industries/extensions`.

Required GitHub configuration:

- Secret `ZED_EXTENSIONS_TOKEN`: a token that can push to your fork of `zed-industries/extensions` and open pull requests upstream.
- Variable `ZED_EXTENSIONS_FORK`: your fork, for example `santi020k/extensions`.
- Optional variable `ZED_EXTENSIONS_HEAD`: the fork owner used in the upstream PR head. Defaults to the repository owner.
