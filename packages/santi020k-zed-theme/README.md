<p align="center">
  <a href="../../README.md"><img src="../theme/assets/logos/logo-square.png" alt="Santi020k Theme" width="72"></a>
</p>

<p align="center"><a href="../../README.md">Santi020k Theme</a></p>

<h1 align="center">Zed theme</h1>

<p align="center">
  <a href="../../README.md">Project overview</a> ·
  <a href="package.json">Package manifest</a> ·
  <a href="CHANGELOG.md">Changelog</a> ·
  <a href="#resources">Resources</a>
</p>

**On this page:** [Included themes](#included-themes) · [Development](#development) · [Using locally in Zed](#using-locally-in-zed) · [Publishing](#publishing) · [Resources](#resources)

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

The generated theme file is written to `themes/santi020k.json`. Validation requires a dark/light pair, valid native color values, and essential syntax roles. Selected elements use the supported `element.selected` token from [Zed's official theme schema](https://zed.dev/schema/themes/v0.2.0.json).

## Using locally in Zed

Copy `themes/santi020k.json` into your Zed themes directory:

```bash
mkdir -p ~/.config/zed/themes
cp packages/santi020k-zed-theme/themes/santi020k.json ~/.config/zed/themes/santi020k.json
```

Then select `Santi020k Dark` or `Santi020k Light` from Zed's theme selector.

## Publishing

Changesets manages the package version. Release preparation syncs `extension.toml` to that version, then `.github/workflows/zed-release.yml` opens a PR against `zed-industries/extensions`.

Required GitHub configuration:

- Secret `ZED_EXTENSIONS_TOKEN`: a classic personal access token owned by the fork owner, with the `public_repo` scope. It must be able to push to your fork and create pull requests in `zed-industries/extensions`. A fine-grained token scoped only to the fork can push the branch but cannot open the upstream pull request.
- Variable `ZED_EXTENSIONS_FORK`: your fork, for example `santi020k/extensions`.
- Optional variable `ZED_EXTENSIONS_HEAD`: the fork owner used in the upstream PR head. Defaults to the repository owner.

## Resources

[Project overview](../../README.md) · [Contributing](../../CONTRIBUTING.md) · [License](../../LICENSE)
