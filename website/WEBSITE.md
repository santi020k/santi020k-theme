# Website Style Guide

Reference for the theme.santi020k.com marketing site and the VS Code theme color system. Keep both sections in sync when the brand evolves.

---

## Stack

- **Runtime**: Vite (plain HTML/CSS/JS, no framework)
- **Build**: `npm run build` inside `website/`
- **Deploy**: static assets from `website/dist/`
- **Font**: Montserrat (system fallbacks: Avenir Next → Segoe UI → sans-serif)

### Why not Astro?

The site is a single marketing page with no routing, no content collections, and no server-side data. Astro's value (SSG, content API, component islands) does not apply here. The Vite setup compiles to ~5 KB of HTML + CSS. Migrate to Astro only if the site grows to multiple pages or needs dynamic content (e.g. live install counts, changelogs).

---

## Design tokens (`src/styles.css`)

All colors are CSS custom properties set on `:root`. Two website color modes are defined: `dark` (default) and `light`, selected via `data-theme` on `<html>`.

### Dark theme

| Token | Value | Usage |
|---|---|---|
| `--theme-bg` | `#120c1e` | Page background |
| `--surface` | `#170f25` | Card / widget surface |
| `--surface-muted` | `#1e1530` | Slightly lighter surface |
| `--surface-strong` | `#261d3a` | Hover / selected state bg |
| `--line` | `#3a2556` | Borders, dividers |
| `--ink` | `#e8e0f0` | Primary text |
| `--ink-soft` | `#c8b8e8` | Secondary text, nav links |
| `--ink-muted` | `#7868a0` | Tertiary text, placeholders |
| `--brand` | `#c090ff` | Accent, active states, cursor |
| `--brand-solid` | `#6b3fa8` | Button fill, badges |
| `--brand-hover` | `#8b52d6` | Button hover fill |
| `--accent` | `#d4a8ff` | Strings, softer accent |
| `--success` | `#7daea3` | Added / success indicators |
| `--warning` | `#e8b44a` | Warning indicators |
| `--danger` | `#ea6962` | Error / delete indicators |
| `--glow-rgb` | `192 144 255` | Body grid + radial gradient |
| `--btn-secondary-bg` | `rgb(23 15 37 / 0.72)` | Ghost button background |
| `--section-divider` | `rgb(58 37 86 / 0.7)` | Section `border-top` |
| `--swatch-circle-border` | `rgb(232 224 240 / 0.22)` | Color swatch circle border |

### Light theme

| Token | Value | Usage |
|---|---|---|
| `--theme-bg` | `#f8f6fd` | Page background |
| `--surface` | `#f0edf9` | Card / widget surface |
| `--surface-muted` | `#eae7f5` | Slightly deeper surface |
| `--surface-strong` | `#e3dff0` | Hover / selected state bg |
| `--line` | `#d3cde6` | Borders, dividers |
| `--ink` | `#302e36` | Primary text |
| `--ink-soft` | `#403850` | Secondary text |
| `--ink-muted` | `#9880c0` | Tertiary text |
| `--brand` | `#6319be` | Accent, active states |
| `--brand-solid` | `#5a14b0` | Button fill |
| `--brand-hover` | `#7730b8` | Button hover fill |
| `--accent` | `#7030b0` | Strings, softer accent |
| `--success` | `#28a745` | Added / success |
| `--warning` | `#c07a10` | Warning |
| `--danger` | `#c0392b` | Error / delete |
| `--glow-rgb` | `99 25 190` | Body grid + radial gradient |
| `--btn-secondary-bg` | `rgb(248 246 253 / 0.85)` | Ghost button background |
| `--section-divider` | `rgb(211 205 230 / 0.7)` | Section `border-top` |

### Editor preview tokens

The code preview widget uses its own token set so it can adapt between showing the dark and light theme. These are also in `:root` but separated semantically:

| Token | Dark value | Light value |
|---|---|---|
| `--preview-bg` | `#0e0919` | `#f8f6fd` |
| `--preview-topbar-border` | `#1e1530` | `#d3cde6` |
| `--preview-gutter-color` | `#584878` | `#c4bdd8` |
| `--preview-gutter-active` | `#c090ff` | `#6319be` |
| `--preview-pre-color` | `#e8e0f0` | `#302e36` |
| `--preview-muted` | `#584878` | `#9880c0` |
| `--preview-keyword` | `#a06ee6` | `#5a1ab0` |
| `--preview-string` | `#d4a8ff` | `#7030b0` |
| `--preview-function` | `#c090ff` | `#6319be` |

---

## Typography

- **Font**: Montserrat, 700 and 800 weights throughout
- **h1**: `clamp(3.25rem, 9vw, 6.7rem)`, line-height `0.92`
- **h2**: `clamp(2.1rem, 5vw, 4rem)`, line-height `0.96`
- **h3**: `1.5rem`
- **Eyebrow**: `0.76rem`, weight 800, uppercase
- **Body / lede**: `clamp(1rem, 2vw, 1.18rem)`, line-height `1.72`
- **Nav / buttons**: `0.92rem`, weight 700–800
- **Code (preview)**: `0.94rem`, Montserrat monospace fallback, line-height `1.9`

---

## Components

### `.site-header`
Flexbox, `justify-content: space-between`. Contains `.brand` (logo + wordmark) and `.nav-links` (navigation + theme toggle). Min-height `80px`.

### `.theme-toggle`
44×44 px circular button at the end of `.nav-links`. Holds `.icon-sun` and `.icon-moon` absolutely positioned, toggled by `data-theme` on `<html>`. Clicking triggers the circular-reveal animation (see `main.js`). Respects `prefers-reduced-motion` and skips the clip-path animation on touch devices.

### `.editor-preview`
Decorative code widget in the hero. Always shows the active theme variant (filename, variable name, background color update via JS). Dark editor surface with topbar, line-number gutter, and syntax-highlighted code. All colors are driven by `--preview-*` tokens so they adapt when the site theme changes.

### `.variant-card`
Shows the dark, light, and high-contrast theme thumbnails side-by-side. Always styled with their respective theme colors — `.variant-dark` is always dark, `.variant-light` is always light, and `.variant-hc` is always high contrast, regardless of the current site theme. All three have hardcoded color overrides that override the inherited `var(--brand)` eyebrow color.

### `.screenshots-section`
Two-column grid (left: heading, right: screenshot frame). The frame stacks `.screenshot-dark` (default visible) and `.screenshot-light` (position: absolute, opacity: 0) on top of each other. CSS switches visibility based on `[data-theme]` on `<html>` — no JS required. Images (`preview-dark.png`, `preview-light.png`, 1280×720) live in `website/public/`.

### `.why-grid`
A 2×2 grid of `.why-card` articles inside the `#why` section. Each card has a `.why-icon` (44×44 rounded square, brand color), an `h3`, and a short `p`. Cards show the `--brand` border on hover.

### `.editor-chips`
Flex-wrap row of `.editor-chip` anchors inside the `#editors` section. Each chip has an inline SVG icon (28×28) and a text label. Chips link to Marketplace or Open VSX depending on which registry the IDE supports. Current editors: VS Code, Cursor, VSCodium (Open VSX), Windsurf, GitHub Codespaces, Gitpod (Open VSX), Positron.

### `.swatches`
A row of pill-shaped color chips. Each chip uses a CSS variable `--swatch` (set inline) for the circle fill. The pill border and text use theme tokens, the circle border uses `--swatch-circle-border`.

### `.button`
Two variants: `.button-primary` (filled, `--brand-solid`) and `.button-secondary` (ghost, `--btn-secondary-bg` + `--line` border). Both use `--brand-hover` on hover.

### `.site-footer`
Flexbox, `justify-content: space-between`. Two items: attribution text and link to santi020k.com. Separated from content by `--section-divider` border.

---

## Theme toggle mechanics

The toggle stores the user's preference in `localStorage` under the key `"theme"`. On load, an anti-FOUC inline `<script>` in `<head>` reads this before any CSS renders:

```js
var s = localStorage.getItem('theme')
var pref = s === 'light' || s === 'dark'
  ? s
  : window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
document.documentElement.setAttribute('data-theme', pref)
```

On click, `main.js` fires a circular clip-path animation that expands from the button position to cover the screen with the old background color, switches the theme, then collapses to reveal the new theme.

---

## SEO checklist

- `<title>` includes the primary keyword "VS Code Color Theme"
- `og:title`, `og:description`, `og:image`, `og:image:width/height/alt`, `og:site_name`, `og:locale` all set
- `twitter:card` is `summary_large_image`; `twitter:site` and `twitter:creator` both set to `@santi020k`
- `<link rel="canonical">` points to `https://theme.santi020k.com/`
- `robots` meta allows full indexing with large image preview
- `robots.txt` present in `/public` to guide crawlers
- `sitemap.xml` present in `/public` for faster indexing
- JSON-LD `SoftwareApplication` schema with `downloadUrl`, `offers` (free), and `author`
- Dual `theme-color` meta tags (one per `prefers-color-scheme` media query)

**To improve**: generate a proper `1200×630` OG image for richer Twitter/LinkedIn cards. The current `icon-512.png` (512×512) is valid but a landscape format would use the available card space better.

---

## VS Code theme color system

The theme JSON files live in `themes/`. Both variants share the same CSS-variable naming convention used on the website:

| Website token | Dark theme hex | Light theme hex | VS Code role |
|---|---|---|---|
| `--theme-bg` | `#120c1e` | `#f8f6fd` | `editor.background` |
| `--surface` | `#170f25` | `#f0edf9` | `sideBar.background` |
| `--surface-muted` | `#1e1530` | `#eae7f5` | Various hover/selected |
| `--line` | `#3a2556` | `#d3cde6` | Borders throughout |
| `--ink` | `#e8e0f0` | `#302e36` | `editor.foreground` |
| `--brand` | `#c090ff` | `#6319be` | Cursor, active tab indicator |
| `--brand-solid` | `#6b3fa8` | `#5a14b0` | `button.background`, badges |
| `--accent` | `#d4a8ff` | `#7030b0` | String syntax color |
| `--success` | `#7daea3` | `#28a745` | Git added decoration |
| `--warning` | `#e8b44a` | `#c07a10` | Git conflict, warnings |
| `--danger` | `#ea6962` | `#c0392b` | Git deleted, errors |

When adding new syntax or workbench colors to the theme JSON, pick from this palette first. Introduce a new hue only when none of the existing violets/greens/yellows/reds convey the right semantic meaning.

---

## Updating the site

1. **Token change** → edit the `:root` blocks in `src/styles.css`. Dark and light tokens are adjacent; keep them in sync.
2. **New section** → add a `<section class="site-shell ...">` to `index.html` and a matching `border-top: 1px solid var(--section-divider)` rule in `styles.css`.
3. **Version bump** → update `softwareVersion` in the JSON-LD block in `index.html`.
4. **Build** → `npm run build` from the `website/` directory; output goes to `website/dist/`.
