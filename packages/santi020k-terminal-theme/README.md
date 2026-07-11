# Santi020k Terminal Theme

The terminal edition of Santi020k Theme combines matching terminal colors and a Powerline-style prompt:

- `iterm2/`: generated dark and light iTerm2 color presets.
- `starship/`: generated dark and light Starship configurations.

Visit [terminal.santi020k.com](https://terminal.santi020k.com/) for previews and installation instructions.

## Build and validate

```sh
pnpm --filter santi020k-terminal-theme run build
pnpm --filter santi020k-terminal-theme run validate
```

Edit `palettes.mjs` for terminal colors and `scripts/build.mjs` for output mappings. Generated files should not be hand-edited.
