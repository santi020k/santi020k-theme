# Santi020k Theme

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/santi020k.santi020k-theme?label=VS%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=santi020k.santi020k-theme)
[![Open VSX Version](https://img.shields.io/open-vsx/v/santi020k/santi020k-theme?label=Open%20VSX)](https://open-vsx.org/extension/santi020k/santi020k-theme)
[![Validate](https://github.com/santi020k/santi020k-theme/actions/workflows/validate.yml/badge.svg)](https://github.com/santi020k/santi020k-theme/actions/workflows/validate.yml)

A deep indigo-black dark theme and a purple-tinted light theme for VS Code — built for long sessions, not just screenshots.

**→ [theme.santi020k.com](https://theme.santi020k.com)**

---

![santi020k dark theme preview](assets/preview-dark.png)

![santi020k light theme preview](assets/preview-light.png)

---

## Why this theme

- **Purple-forward, not purple-loud.** Every accent — cursor, brackets, active borders — comes from a single violet ramp. Nothing neon, nothing clashing.
- **Dark and light that actually match.** Both variants share the same color language so switching feels like flipping a light switch, not changing editors.
- **Built for readability.** Contrast ratios are validated automatically on every commit. Keywords are italic, comments are softened, JSON keys / values / numbers use distinct hues so structure is obvious at a glance.
- **Works everywhere.** VS Code, Cursor, Windsurf, VSCodium — any editor built on the VS Code extension API.

---

## Install

**VS Code Marketplace** — the fastest way:

1. Open VS Code → Extensions (`Cmd+Shift+X` / `Ctrl+Shift+X`)
2. Search **Santi020k Theme**
3. Click **Install**
4. Open the theme picker (`Cmd+K Cmd+T`) and choose **santi020k dark** or **santi020k light**

**Open VSX** — for Cursor, VSCodium, and other compatible editors:

Install from [open-vsx.org/extension/santi020k/santi020k-theme](https://open-vsx.org/extension/santi020k/santi020k-theme), then pick the variant from the theme picker.

---

## Variants

### santi020k dark

Deep indigo-black (`#120c1e`) backgrounds with a layered surface hierarchy. Accent colors are muted violets pulled directly from the wallpaper geometry — nothing neon, nothing loud. Keywords and storage modifiers are italic; comments are softened but readable. The cursor and active tab indicator glow in `#c090ff`.

| Role | Color |
|---|---|
| Editor background | `#120c1e` |
| Activity / Status bar | `#0e0919` |
| Sidebar | `#170f25` |
| Cursor / active border | `#c090ff` |
| Buttons / badges | `#6b3fa8` |
| Strings | `#d4a8ff` |
| Keywords | `#a06ee6` italic |
| Comments | `#7060a8` italic |
| Primary text | `#e8e0f0` |

### santi020k light

Purple-tinted whites (`#f8f6fd`) with a rich violet brand (`#6319be`) driving all interactive elements. The status bar flips to solid brand purple, making workspace context immediately readable. Syntax uses a single-hue violet ramp so the light variant feels like a natural counterpart to the dark one.

| Role | Color |
|---|---|
| Editor background | `#f8f6fd` |
| Sidebar | `#f0edf9` |
| Tab bar | `#e3dff0` |
| Status bar | `#6319be` |
| Cursor / active border | `#6319be` |
| Strings | `#7030b0` |
| Keywords | `#5a1ab0` italic |
| Comments | `#9880c0` italic |
| Primary text | `#302e36` |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup, editing themes, validation, and the release workflow.

---

## License

[MIT](LICENSE)
