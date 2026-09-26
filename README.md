# Santi020k Theme

Monorepo for the Santi020k Theme family: a calm violet theme system spanning VS Code, Zed, Chrome, Codex, JetBrains IDEs, Raycast, Slack, Xcode, terminals, shared brand packages, and static product websites.

[Theme family](https://theme.santi020k.com) ·
[VS Code](https://vscode.santi020k.com) ·
[Terminal](https://terminal.santi020k.com) ·
[npm](https://www.npmjs.com/package/@santi020k/theme) ·
[Documentation](docs/brand-guidelines.md) ·
[Releases](https://github.com/santi020k/santi020k-theme/releases) ·
[Contributing](CONTRIBUTING.md)

[![Validation](https://github.com/santi020k/santi020k-theme/actions/workflows/validate.yml/badge.svg)](https://github.com/santi020k/santi020k-theme/actions/workflows/validate.yml)
[![CodeQL](https://github.com/santi020k/santi020k-theme/actions/workflows/codeql.yml/badge.svg)](https://github.com/santi020k/santi020k-theme/actions/workflows/codeql.yml)
[![VS Marketplace](https://badgen.net/vs-marketplace/v/santi020k.santi020k-theme?label=VS%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=santi020k.santi020k-theme)
[![Open VSX](https://img.shields.io/open-vsx/v/santi020k/santi020k-theme)](https://open-vsx.org/extension/santi020k/santi020k-theme)
[![npm tokens](https://img.shields.io/npm/v/@santi020k/theme.svg?label=%40santi020k%2Ftheme)](https://www.npmjs.com/package/@santi020k/theme)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

The brand source of truth is [`docs/brand-guidelines.md`](docs/brand-guidelines.md). Read it before changing colors, product names, screenshots, icons, website copy, store metadata, or shared assets.

## Workspaces

| Workspace                           | Purpose                                                                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `packages/santi020k-theme`          | Published VS Code extension with dark, light, high-contrast, bold, and italic variants                                         |
| `packages/santi020k-chrome-theme`   | Chrome Web Store theme package, synced from the VS Code palette                                                                |
| `packages/santi020k-zed-theme`      | Generated Zed theme family synced from the VS Code palette                                                                     |
| `packages/santi020k-codex-theme`    | Copy-ready ChatGPT-inspired light custom theme preset for Codex                                                                |
| `packages/santi020k-terminal-theme` | Generated terminal color schemes and prompt presets                                                                            |
| `packages/santi020k-raycast-theme`  | Shareable Raycast Theme Studio JSON and one-click dark/light import URLs                                                        |
| `packages/santi020k-slack-theme`    | Paste-ready Slack custom themes with legacy import strings and semantic role maps                                               |
| `packages/santi020k-jetbrains-theme` | Installable dark/light UI and editor theme plugin for JetBrains IDEs and Android Studio                                        |
| `packages/santi020k-xcode-theme`    | Native dark/light Xcode editor and debug-console color themes                                                                   |
| `packages/theme`                    | Public `@santi020k/theme` package for tokens, website CSS, assets, metadata, and Chrome mapping helpers                        |
| `packages/theme-core`               | Public `@santi020k/theme-core` helper package for package-neutral token generation, asset lookup, and site behavior primitives |
| `apps/website`                      | Consolidated theme family site for `theme.santi020k.com`, including every product route and Terminal documentation             |
| `apps/*-website`                    | Product page source modules retained during consolidation; these are composed into `apps/website` and are not deployed separately |

## Quick Start

```bash
pnpm install
pnpm run validate
```

Use Node `>=22.18.0` and pnpm `10.32.1`.

## Common Commands

| Command                         | What it does                                                                                                                  |
| ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `pnpm run validate`             | Builds packages, checks spelling, validates themes and marketplace metadata, tests, lints, and packages the VS Code extension |
| `pnpm run validate:themes`      | Validates the VS Code theme JSON files                                                                                        |
| `pnpm run validate:marketplace` | Checks VS Code extension marketplace readiness                                                                                |
| `pnpm run validate:chrome`      | Lints, validates contrast, and dry-runs Chrome packaging                                                                      |
| `pnpm run validate:terminal`    | Validates generated terminal presets                                                                                          |
| `pnpm run validate:zed`         | Builds and checks the generated Zed theme family                                                                              |
| `pnpm run validate:codex`       | Checks that the saved Codex preset exactly matches its supplied values                                                        |
| `pnpm run validate:raycast`     | Regenerates and validates Raycast themes and import URLs                                                                       |
| `pnpm run validate:slack`       | Regenerates and validates Slack themes and legacy import strings                                                              |
| `pnpm run validate:jetbrains`   | Packages and validates the JetBrains/Android Studio plugin                                                                     |
| `pnpm run validate:xcode`       | Regenerates and validates native Xcode color themes                                                                            |
| `pnpm run package:extension`    | Builds and packages the VS Code extension as a VSIX                                                                           |
| `pnpm run package:chrome`       | Builds Chrome Web Store zip files                                                                                             |
| `pnpm run sites:dev`            | Starts all six website development servers in parallel                                                                        |
| `pnpm run site:dev`             | Starts the theme hub website                                                                                                  |
| `pnpm run site:vscode:dev`      | Starts the VS Code theme website                                                                                              |
| `pnpm run site:chrome:dev`      | Starts the Chrome theme website                                                                                               |
| `pnpm run site:terminal:dev`    | Starts the Terminal theme website on port 4177                                                                                |
| `pnpm run site:codex:dev`       | Starts the Codex theme website on port 4179                                                                                   |
| `pnpm run changeset`            | Creates a release changeset                                                                                                   |
| `pnpm run commit`               | Opens the conventional commit prompt                                                                                          |

## Working On The Theme Family

- Start brand-sensitive work in [`docs/brand-guidelines.md`](docs/brand-guidelines.md).
- Keep VS Code dark and light theme changes paired unless the task is explicitly single-variant.
- Keep Chrome manifests synced from the VS Code theme through `pnpm run sync:themes`.
- Keep website copy concrete, developer-facing, and aligned with the published domains.
- Add a changeset for user-visible package, docs, release, website, or theme changes.

## Documentation Map

- [`docs/architecture.md`](docs/architecture.md) explains the repo architecture.
- [`packages/santi020k-theme/README.md`](packages/santi020k-theme/README.md) is the marketplace-facing VS Code extension README.
- [`packages/santi020k-chrome-theme/README.md`](packages/santi020k-chrome-theme/README.md) covers Chrome theme development and Web Store packaging.
- [`packages/santi020k-codex-theme/README.md`](packages/santi020k-codex-theme/README.md) documents the saved Codex preset.
- [`packages/santi020k-raycast-theme/README.md`](packages/santi020k-raycast-theme/README.md), [`packages/santi020k-slack-theme/README.md`](packages/santi020k-slack-theme/README.md), [`packages/santi020k-jetbrains-theme/README.md`](packages/santi020k-jetbrains-theme/README.md), and [`packages/santi020k-xcode-theme/README.md`](packages/santi020k-xcode-theme/README.md) document the additional application ports.
- [`packages/theme/README.md`](packages/theme/README.md) documents shared tokens and assets.
- [`packages/theme-core/README.md`](packages/theme-core/README.md) documents lower-level shared helper APIs.
- [`apps/website/README.md`](apps/website/README.md) and [`apps/website/WEBSITE.md`](apps/website/WEBSITE.md) cover the consolidated static site.

## License

MIT. See [LICENSE](LICENSE).
