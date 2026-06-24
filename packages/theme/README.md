# @santi020k/theme

Santi020k design tokens and shared assets for websites, apps, the VS Code theme, and the Chrome theme.

## Install

```bash
pnpm add @santi020k/theme
```

## CSS Tokens

```css
@import '@santi020k/theme/tokens.css';
```

The CSS file exposes raw HSL custom properties and Tailwind v4 `@theme` mappings:

```css
.panel {
  color: hsl(var(--ink));
  background: hsl(var(--surface));
  border-color: hsl(var(--line));
}
```

## JavaScript

```js
import { config, getAssets } from '@santi020k/theme'
import { theme } from '@santi020k/theme/tailwind'

const logos = getAssets('logo')
console.log(config.colors, theme.colors.brand, logos)
```

## Assets

```js
import logoUrl from '@santi020k/theme/assets/logos/logo-santi020k.webp'
import vscodePreview from '@santi020k/theme/assets/vscode/previews/preview-dark.png'
```

The asset tree includes the original brand project assets plus theme-family assets:

- `assets/logos`, `assets/favicons`, `assets/banners`, and `assets/wallpapers`
- `assets/vscode` for extension icons and previews
- `assets/chrome` for Chrome theme icons, images, and store media

For package metadata and static copy targets, import `manifest` from the root export.
