# Santi020k Theme for JetBrains IDEs

A complete dark and light IntelliJ Platform theme plugin for Android Studio, IntelliJ IDEA, WebStorm, PyCharm, PhpStorm, RubyMine, CLion, GoLand, Rider, and other compatible JetBrains IDEs.

The plugin covers the IDE interface, editor syntax, diagnostics, selections, tabs, tool windows, popups, notifications, controls, links, and icon color roles.

## Build and install

```bash
pnpm --filter santi020k-jetbrains-theme run build
```

1. Open **Settings → Plugins** in Android Studio or a JetBrains IDE.
2. Open the gear menu and choose **Install Plugin from Disk…**.
3. Select `dist/santi020k-jetbrains-theme-0.1.0.jar`.
4. Restart when requested.
5. Select **Santi020k Dark** or **Santi020k Light** under **Settings → Appearance & Behavior → Appearance**.

The plugin targets IntelliJ Platform build 241 and newer. The packaged JAR can also be submitted to JetBrains Marketplace after completing the publisher setup and marketplace review.

## Validate

```bash
pnpm --filter santi020k-jetbrains-theme run validate
```

Validation checks plugin metadata, UI themes, editor schemes, required semantic coverage, contrast, and the installable JAR contents.
