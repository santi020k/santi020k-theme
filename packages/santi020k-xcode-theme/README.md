<p align="center">
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/README.md">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/santi020k/santi020k-theme/main/docs/assets/readme/workspace-dark.svg">
      <img src="https://raw.githubusercontent.com/santi020k/santi020k-theme/main/docs/assets/readme/workspace-light.svg" alt="Santi020k Theme — Calm contrast. A violet thread through your tools." width="1200" height="220">
    </picture>
  </a>
</p>

<h1 align="center">Xcode theme</h1>

<p align="center">
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-13967e?style=flat-square" alt="License: MIT"></a>
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/packages/santi020k-xcode-theme/package.json"><img src="https://img.shields.io/badge/workspace-Private-6319be?style=flat-square" alt="Workspace: Private"></a>
</p>

<p align="center">
  <a href="../../README.md">Project overview</a> ·
  <a href="package.json">Package manifest</a> ·
  <a href="CHANGELOG.md">Changelog</a> ·
  <a href="#resources">Resources</a>
</p>

**On this page:** [Install](#install) · [Validate](#validate) · [Resources](#resources)

<!-- cspell:ignore xccolortheme -->

Native dark and light Xcode editor themes covering source syntax, the debug console, selections, the caret, line emphasis, links, warnings, and errors.

## Install

```bash
mkdir -p "$HOME/Library/Developer/Xcode/UserData/FontAndColorThemes"
cp themes/*.xccolortheme "$HOME/Library/Developer/Xcode/UserData/FontAndColorThemes/"
```

Restart Xcode, then select **Santi020k Dark** or **Santi020k Light** under **Xcode → Settings → Themes**.

Xcode color themes style the editor and console; Xcode does not expose a supported mechanism for third-party themes to recolor the complete application interface.

## Validate

```bash
pnpm --filter santi020k-xcode-theme run validate
```

Validation regenerates both themes and reads the serialized native colors. Editor and console text must meet 4.5:1 contrast on their canvas and selection backgrounds; syntax also remains readable on the highlighted current line. Comments retain a 3:1 minimum. On macOS, validation also runs Apple's property-list validator.

## Resources

[Project overview](../../README.md) · [Contributing](../../CONTRIBUTING.md) · [License](../../LICENSE)
