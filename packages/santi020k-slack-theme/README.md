<p align="center">
  <a href="../../README.md"><img src="../theme/assets/logos/logo-square.png" alt="Santi020k Theme" width="72"></a>
</p>

<p align="center"><a href="../../README.md">Santi020k Theme</a></p>

<h1 align="center">Slack theme</h1>

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
