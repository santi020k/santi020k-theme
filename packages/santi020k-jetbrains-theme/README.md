<p align="center">
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/README.md">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/santi020k/santi020k-theme/main/docs/assets/readme/workspace-dark.svg">
      <img src="https://raw.githubusercontent.com/santi020k/santi020k-theme/main/docs/assets/readme/workspace-light.svg" alt="Santi020k Theme — Calm contrast. A violet thread through your tools." width="1200" height="220">
    </picture>
  </a>
</p>

<h1 align="center">JetBrains theme</h1>

<p align="center">
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-13967e?style=flat-square" alt="License: MIT"></a>
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/packages/santi020k-jetbrains-theme/package.json"><img src="https://img.shields.io/badge/workspace-Private-6319be?style=flat-square" alt="Workspace: Private"></a>
</p>

<p align="center">
  <a href="../../README.md">Project overview</a> ·
  <a href="package.json">Package manifest</a> ·
  <a href="CHANGELOG.md">Changelog</a> ·
  <a href="#resources">Resources</a>
</p>

**On this page:** [Build and install](#build-and-install) · [Validate](#validate) · [Resources](#resources)

A complete dark and light IntelliJ Platform theme plugin for Android Studio, IntelliJ IDEA, WebStorm, PyCharm, PhpStorm, RubyMine, CLion, GoLand, Rider, and other compatible JetBrains IDEs.

The plugin covers the IDE interface, editor syntax, diagnostics, selections, tabs, tool windows, popups, notifications, controls, links, and icon color roles.

## Build and install

```bash
pnpm --filter santi020k-jetbrains-theme run build
```

1. Open **Settings → Plugins** in Android Studio or a JetBrains IDE.
2. Open the gear menu and choose **Install Plugin from Disk…**.
3. Select the generated `dist/santi020k-jetbrains-theme-<version>.jar` file.
4. Restart when requested.
5. Select **Santi020k Dark** or **Santi020k Light** under **Settings → Appearance & Behavior → Appearance**.

The plugin targets IntelliJ Platform build 241 and newer. The packaged JAR can also be submitted to JetBrains Marketplace after completing the publisher setup and marketplace review.

## Validate

```bash
pnpm --filter santi020k-jetbrains-theme run validate
```

Validation checks plugin metadata, UI themes, editor schemes, required semantic coverage, contrast, and the installable JAR contents.

## Resources

[Project overview](../../README.md) · [Contributing](../../CONTRIBUTING.md) · [License](../../LICENSE)
