<p align="center">
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/README.md">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/santi020k/santi020k-theme/main/docs/assets/readme/workspace-dark.svg">
      <img src="https://raw.githubusercontent.com/santi020k/santi020k-theme/main/docs/assets/readme/workspace-light.svg" alt="Santi020k Theme — Calm contrast. A violet thread through your tools." width="1200" height="220">
    </picture>
  </a>
</p>

<h1 align="center">Slack theme</h1>

<p align="center">
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-13967e?style=flat-square" alt="License: MIT"></a>
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/packages/santi020k-slack-theme/package.json"><img src="https://img.shields.io/badge/workspace-Private-6319be?style=flat-square" alt="Workspace: Private"></a>
</p>

<p align="center">
  <a href="../../README.md">Project overview</a> ·
  <a href="package.json">Package manifest</a> ·
  <a href="CHANGELOG.md">Changelog</a> ·
  <a href="#resources">Resources</a>
</p>

**On this page:** [Install](#install) · [Validate](#validate) · [Resources](#resources)

Dark and light custom Slack themes mapped from the shared Santi020k palette.

## Install

1. In Slack, open your profile menu and choose **Preferences → Appearance → Custom theme**.
2. Choose **Import theme**, then paste the contents of `themes/santi020k-dark.legacy.txt` or `themes/santi020k-light.legacy.txt`.
3. Apply the imported colors. Use the matching JSON role map when adjusting the newer color controls individually.

Slack applies a custom theme to your account rather than publishing an installable app package. You can use Slack's **Share** action to send the applied theme to another user or workspace.

## Validate

```bash
pnpm --filter santi020k-slack-theme run validate
```

The validator checks both legacy import strings, semantic role maps, mode parity, and important contrast pairs.

## Resources

[Project overview](../../README.md) · [Contributing](../../CONTRIBUTING.md) · [License](../../LICENSE)
