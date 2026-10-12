<p align="center">
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/README.md">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/santi020k/santi020k-theme/main/docs/assets/readme/workspace-dark.svg">
      <img src="https://raw.githubusercontent.com/santi020k/santi020k-theme/main/docs/assets/readme/workspace-light.svg" alt="Santi020k Theme — Calm contrast. A violet thread through your tools." width="1200" height="220">
    </picture>
  </a>
</p>

<h1 align="center">Chrome theme</h1>

<p align="center">
  <a href="../../LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
  <a href="https://github.com/santi020k/santi020k-theme/actions/workflows/validate.yml"><img src="https://github.com/santi020k/santi020k-theme/actions/workflows/validate.yml/badge.svg" alt="Validate"></a>
  <a href="https://github.com/santi020k/santi020k-theme/tree/main/packages/santi020k-chrome-theme"><img src="https://img.shields.io/github/package-json/v/santi020k/santi020k-theme?filename=packages%2Fsanti020k-chrome-theme%2Fpackage.json&amp;color=752df0" alt="Version"></a>
  <a href="https://nodejs.org"><img src="https://img.shields.io/badge/node-%3E%3D22-brightgreen" alt="Node"></a>
</p>

<p align="center">
  <a href="../../README.md">Project overview</a> ·
  <a href="package.json">Package manifest</a> ·
  <a href="CHANGELOG.md">Changelog</a> ·
  <a href="#resources">Resources</a>
</p>

<details>
<summary>On this page</summary>

- [Install](#install)
- [Local Development](#local-development)
- [Palette Sync](#palette-sync)
- [Key Color Roles](#key-color-roles)
- [Store Assets](#store-assets)
- [Publishing](#publishing)
- [Privacy](#privacy)
- [License](#license)
- [Resources](#resources)

</details>

Chrome browser themes that match the Santi020k VS Code palette. The dark listing uses deep violet browser chrome, editor-like surfaces, and bright violet accents. The light listing carries the same language into purple-tinted light surfaces.

Website: [chrome.santi020k.com](https://chrome.santi020k.com)

[Explore the Chrome theme](https://theme.santi020k.com/chrome/) for the product preview and store links.

## Install

Install from the Chrome Web Store:

- [Santi020k Theme Dark](https://chromewebstore.google.com/detail/cljcifjjgolaplmemjcnjhkjfoneadgj)
- [Santi020k Theme Light](https://chromewebstore.google.com/detail/ekehaoadgcihpkajlnbpkankaginojci)

## Local Development

1. Run `pnpm install` from the repository root.
2. Prepare a development extension or launch a preview runner.
3. Open `chrome://extensions`, enable Developer mode, choose **Load unpacked**, and select the generated development directory printed by the command.

| Command                                                  | What it does                                                     |
| -------------------------------------------------------- | ---------------------------------------------------------------- |
| `pnpm --filter santi020k-chrome-theme run dev:dark`      | Prepares the dark theme for unpacked Chrome testing              |
| `pnpm --filter santi020k-chrome-theme run dev:light`     | Prepares the light theme for unpacked Chrome testing             |
| `pnpm --filter santi020k-chrome-theme run preview:dark`  | Opens Chrome with the dark development theme loaded              |
| `pnpm --filter santi020k-chrome-theme run preview:light` | Opens Chrome with the light development theme loaded             |
| `pnpm --filter santi020k-chrome-theme run sync`          | Syncs colors from VS Code and regenerates New Tab / store assets |
| `pnpm --filter santi020k-chrome-theme run validate`      | Lints, checks contrast, and dry-runs packaging                   |
| `pnpm --filter santi020k-chrome-theme run package`       | Builds `dist/*.zip` packages for the Chrome Web Store            |
| `pnpm run validate:chrome`                               | Runs the root Chrome validation shortcut                         |
| `pnpm run site:dev`                                      | Starts the consolidated theme-family website                     |

The VS Code Run and Debug entries use the preview runner. Chrome 137+ ignores `--load-extension` in branded Google Chrome builds, so the runner starts Chrome with remote debugging and installs the unpacked theme through Chrome DevTools Protocol.

## Palette Sync

Chrome colors are derived from the VS Code theme files through `@santi020k/theme`.

```bash
pnpm run sync:themes
```

The sync script reads `packages/santi020k-theme/themes/`, applies the Chrome token mapping, and updates both `manifest.json` and `manifest-light.json`. Validation fails when either manifest drifts from the centered theme tokens.

## Key Color Roles

| Role                    | Dark value           | VS Code source                                        |
| ----------------------- | -------------------- | ----------------------------------------------------- |
| Frame                   | `#0d0a15`            | `titleBar.activeBackground`, `activityBar.background` |
| Toolbar and tab strip   | `#151221`            | `sideBar.background`                                  |
| Active tab accent       | `#752df0`            | `tab.activeBorder`                                    |
| New Tab and omnibox     | `#0d0a15`            | `editor.background`                                   |
| Separators and controls | `#231d30`            | `activityBar.border`, `tab.border`                    |
| Primary text            | `#dfdde3`            | `editor.foreground`, `foreground`                     |
| Links and accents       | `#945df4`, `#b48df7` | `textLink.foreground`, `textLink.activeForeground`    |

## Store Assets

Store copy and image specs live with this package:

- [`store/PUBLISHING.md`](store/PUBLISHING.md) has the submission checklist and Dashboard values.
- [`store/listing-en.md`](store/listing-en.md) has copy-paste Web Store listing text.
- [`store/image-specs.md`](store/image-specs.md) documents screenshot and promo tile sizes.
- Prepare listing screenshots and promotional images using the [store image specifications](store/image-specs.md).

## Publishing

GitHub Actions publishes through `.github/workflows/chrome-release.yml` after Dashboard setup. The workflow validates the package, builds both dark and light zips, uploads artifacts, and submits new manifest versions.

For a local release:

```bash
pnpm run release:chrome
```

Required environment variables for CI:

- `CHROME_WEBSTORE_PUBLISHER_ID`
- `CHROME_WEBSTORE_SERVICE_ACCOUNT_JSON`

## Privacy

This extension changes browser appearance only. It collects no data, requests no permissions, and runs no remote code. See [`PRIVACY.md`](PRIVACY.md).

## License

MIT. See the repository [LICENSE](../../LICENSE).

## Resources

[Project overview](../../README.md) · [Contributing](../../CONTRIBUTING.md) · [License](../../LICENSE)
