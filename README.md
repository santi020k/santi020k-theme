# santi020k Theme

A pair of VS Code color themes built around a deep indigo-black palette with muted violet accents — inspired by the Antigravity wallpaper. Available in dark and light variants, both sharing the same purple-forward color language.

**→ [theme.santi020k.com](https://theme.santi020k.com)**

---

## Variants

### santi020k dark

Deep indigo-black (`#120c1e`) backgrounds with a layered surface hierarchy. Accent colors are muted violets pulled directly from the wallpaper geometry — nothing neon, nothing loud. Keywords and storage modifiers are italic; comments recede into near-invisible purple. The cursor and active tab indicator glow in `#c090ff`.

| Role | Color |
|---|---|
| Editor background | `#120c1e` |
| Activity / Status bar | `#0e0919` |
| Sidebar | `#170f25` |
| Cursor / active border | `#c090ff` |
| Buttons / badges | `#6b3fa8` |
| Strings | `#d4a8ff` |
| Keywords | `#a06ee6` italic |
| Comments | `#584878` italic |
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

## Installation

### From the VS Code Marketplace

1. Open VS Code (or any compatible fork)
2. Go to **Extensions** (`Cmd+Shift+X`)
3. Search for **santi020k Theme**
4. Click **Install**
5. Open **Preferences: Color Theme** (`Cmd+K Cmd+T`) and select **santi020k dark** or **santi020k light**

### Manual install (`.vsix`)

1. Download the latest `.vsix` from the [Releases](https://github.com/santi020k/santi020k-theme/releases) page
2. Open VS Code → `Cmd+Shift+P` → **Extensions: Install from VSIX…**
3. Select the downloaded file

---

## Development

### Requirements

- Node.js 20+
- VS Code or a compatible fork (Antigravity, Cursor, etc.)

### Setup

```bash
git clone https://github.com/santi020k/santi020k-theme
cd santi020k-theme
npm install
```

### Running the extension locally

Press `F5` (or run **Debug: Start Debugging** from the Command Palette) to open an **Extension Development Host** window with the theme loaded. Any changes you make to the theme JSON files are picked up after reloading that window (`Cmd+R`).

Alternatively, open the project in VS Code and use the Run & Debug panel — the `Extension Development Host` launch config is already included.

### Editing the themes

All colors live in two files:

| File | Variant |
|---|---|
| `themes/santi020k-dark-color-theme.json` | Dark |
| `themes/santi020k-light-color-theme.json` | Light |

The JSON structure follows the standard [VS Code Color Theme](https://code.visualstudio.com/api/extension-guides/color-theme) format:

- `colors` — workbench UI (editor, sidebar, tabs, status bar, terminal…)
- `tokenColors` — TextMate grammar tokens (syntax highlighting)

### Useful references

- [VS Code Theme Color Reference](https://code.visualstudio.com/api/references/theme-color)
- [VS Code TextMate Token Reference](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- [Scope Inspector](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide#scope-inspector) — open with `Cmd+Shift+P` → **Developer: Inspect Editor Tokens and Scopes** to identify the exact scope of any token

---

## Testing

### Visual inspection checklist

Open files in common languages and verify:

- [ ] Comments are readable but clearly de-emphasized
- [ ] Strings, keywords, types, and functions are visually distinct
- [ ] Active tab and cursor are clearly highlighted
- [ ] Sidebar and activity bar contrast is sufficient
- [ ] Terminal ANSI colors look correct (`echo -e` a color test)
- [ ] Git decorations (added / modified / deleted) are visible in the Explorer
- [ ] Error and warning squiggles are clearly visible

### Contrast check

Use the [VS Code Accessibility: Color Contrast Ratio Checker](https://marketplace.visualstudio.com/items?itemName=Tyriar.color-contrast-ratio-checker) or paste hex values into [Colour Contrast Analyser](https://www.tpgi.com/color-contrast-checker/) to verify WCAG AA (4.5:1) for primary text against editor background.

### Packaging for local testing

```bash
npm run package
# → generates santi020k-theme-1.0.0.vsix

# Install in VS Code
code --install-extension santi020k-theme-1.0.0.vsix
```

---

## Publishing to Production

### One-time setup

1. Create a [Microsoft account](https://account.microsoft.com) if you don't have one
2. Go to [marketplace.visualstudio.com/manage](https://marketplace.visualstudio.com/manage) and create a publisher with ID `santi020k`
3. In Azure DevOps → User Settings → [Personal Access Tokens](https://dev.azure.com), generate a token with **Marketplace → Manage** scope
4. Add the token as a secret named `VSCE_PAT` in your GitHub repository settings

### Manual publish

```bash
# Make sure you're logged in
npx vsce login santi020k

# Bump version first (edit package.json + CHANGELOG.md)
npm run publish
```

### Automated publish via GitHub Actions

The workflow at `.github/workflows/publish.yml` triggers automatically when you push a version tag:

```bash
git tag v1.1.0
git push origin v1.1.0
```

This runs `vsce publish` using the `VSCE_PAT` secret and publishes the new version to the VS Code Marketplace.

### Release checklist

- [ ] Version bumped in `package.json`
- [ ] `CHANGELOG.md` updated with what changed
- [ ] `icon.png` present (128×128 PNG, required by the Marketplace)
- [ ] Tested locally with `npm run package` and installed via VSIX
- [ ] Tag pushed to trigger the publish workflow
