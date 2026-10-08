<p align="center">
  <a href="../../README.md"><img src="../theme/assets/logos/logo-square.png" alt="Santi020k Theme" width="72"></a>
</p>

<p align="center"><a href="../../README.md">Santi020k Theme</a></p>

<h1 align="center">JetBrains theme</h1>

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
