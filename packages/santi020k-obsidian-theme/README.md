# Santi020k for Obsidian

A calm violet theme for notes, links, code, navigation, tables, and graphs. Dark and light appearances share the canonical VS Code palette. Native fonts, user text sizing, mobile toolbars, and keyboard behavior are preserved. No plugin or network resource is required.

## Install on desktop

Requires Obsidian 1.10.6 or later. Download the ZIP from [the Obsidian page](https://theme.santi020k.com/obsidian/) and extract the `Santi020k` folder into `<vault>/.obsidian/themes/`. If your vault uses a different configuration folder, use that folder instead of `.obsidian`.

The final files must be `<vault>/.obsidian/themes/Santi020k/theme.css` and `manifest.json`. In Obsidian, open Settings → Appearance and select **Santi020k** under Themes. Choose Light, Dark, or Adapt to system for the base color scheme. Reload the app if the theme does not appear.

## iPhone and iPad

Install in your desktop vault first. With Obsidian Sync, enable **Themes and snippets** under **Vault configuration sync** on both devices. Let sync finish, restart the mobile app, then choose Santi020k in Settings → Appearance. Other sync methods must copy the configuration folder too; syncing only notes does not install the theme. See [Obsidian Sync settings](https://help.obsidian.md/sync/settings).

This is a manual download; it is not yet listed in the community theme directory. Do not search the directory expecting a published entry. Custom CSS snippets and plugins may override colors; disable them in a disposable vault when diagnosing a conflict.

## Update or remove

To update, replace only `theme.css` and `manifest.json` in the Santi020k theme folder. To remove, choose the default theme before deleting that folder. Notes and plugins are untouched.

## Development and distribution

Run `pnpm --filter santi020k-obsidian-theme run validate`. Edit `scripts/build.mjs`; do not hand-edit the generated CSS or manifest. Colors come from the canonical VS Code sources through `scripts/lib/port-palette.mjs`. Low-contrast source syntax is blended toward the canonical foreground until it remains readable on the canvas, panels, and selection. No independent palette is maintained.

The website build packages the CSS, manifest, README and license. Native app checks and automated contrast checks are distinct; current verification evidence is in `docs/theme-expansion.md` at the repository root. Community-directory submission requires separately authorized publication and a distribution repository with the required root manifest and matching release assets.

[Theme family](https://theme.santi020k.com) · [Santiago Molina](https://santi020k.com) · MIT
