<p align="center">
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/README.md">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/santi020k/santi020k-theme/main/docs/assets/readme/workspace-dark.svg">
      <img src="https://raw.githubusercontent.com/santi020k/santi020k-theme/main/docs/assets/readme/workspace-light.svg" alt="Santi020k Theme — Calm contrast. A violet thread through your tools." width="1200" height="220">
    </picture>
  </a>
</p>

<h1 align="center">Raycast theme</h1>

<p align="center">
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-13967e?style=flat-square" alt="License: MIT"></a>
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/packages/santi020k-raycast-theme/package.json"><img src="https://img.shields.io/badge/workspace-Private-6319be?style=flat-square" alt="Workspace: Private"></a>
</p>

<p align="center">
  <a href="../../README.md">Project overview</a> ·
  <a href="package.json">Package manifest</a> ·
  <a href="CHANGELOG.md">Changelog</a> ·
  <a href="#resources">Resources</a>
</p>

**On this page:** [Install](#install) · [Validate](#validate) · [Resources](#resources)

Dark and light Raycast themes using the shared Santi020k violet palette. Raycast custom themes require Raycast Pro.

## Install

1. Open `themes/santi020k-dark.url.txt` or `themes/santi020k-light.url.txt`.
2. Copy the complete `raycast://theme?...` URL and open it on a device with Raycast installed.
3. Approve the import, then select the theme in **Raycast Settings → General → Appearance**.
4. Assign the dark and light variants to their matching system appearances.

The JSON files match Raycast Theme Studio exports and can also be contributed to the public Raycast theme gallery.

## Validate

```bash
pnpm --filter santi020k-raycast-theme run validate
```

The validator checks the official 12-color shape, import URLs, mode parity, and primary text contrast.

## Resources

[Project overview](../../README.md) · [Contributing](../../CONTRIBUTING.md) · [License](../../LICENSE)
