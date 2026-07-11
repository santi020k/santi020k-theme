# Santi020k Theme for iTerm2

Dark and light iTerm2 color presets built from the same calm violet palette as the Santi020k VS Code and Chrome themes.

## Install

1. Download `Santi020k Dark.itermcolors` or `Santi020k Light.itermcolors` from [`themes/`](themes/).
2. Open iTerm2 → Settings → Profiles → Colors.
3. Open **Color Presets…**, choose **Import…**, then select the downloaded file.
4. Open **Color Presets…** again and select the imported Santi020k preset.

The presets define the background, foreground, cursor, selection, links, badges, and all 16 ANSI colors. Visit [iterm.santi020k.com](https://iterm.santi020k.com/) for an interactive preview.

## Development

```bash
pnpm --filter santi020k-iterm-theme run build
pnpm --filter santi020k-iterm-theme run validate
```

Edit `palettes.mjs`; generated `.itermcolors` files should not be hand-edited.
