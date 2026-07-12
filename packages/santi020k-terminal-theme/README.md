# Santi020k Terminal Theme

<!-- cspell:ignore tlsv -->

The terminal edition of Santi020k Theme combines matching terminal colors and a Powerline-style prompt:

- `iterm2/`: generated dark and light iTerm2 color presets.
- `starship/`: generated dark and light Starship configurations.
- `zsh/`: optional macOS appearance detection for switching Starship configurations.
- `zsh/install.zsh`: a one-command macOS installer for the curated Zsh setup.
- `zsh/santi020k.zsh`: completions, history, key bindings, plugin loading, and tool initialization.

Visit [terminal.santi020k.com](https://terminal.santi020k.com/) for previews and installation instructions.

## Powerful Zsh setup

The installer uses Homebrew to install Starship, Zsh autosuggestions, syntax highlighting, extra completions, fzf, zoxide, eza, bat, ripgrep, fd, jq, and git-delta. It keeps the managed configuration in `~/.config/santi020k-terminal`, preserves the rest of `.zshrc`, and is safe to run again.

```sh
curl --proto '=https' --tlsv1.2 -fsSL https://terminal.santi020k.com/zsh/install.zsh | zsh
```

Review `zsh/install.zsh` before running it. Homebrew is required and is intentionally not installed automatically.

## Transparent iTerm2 profiles

Starship emits solid RGB backgrounds for every Powerline segment. If the segment text backgrounds look translucent while the separator arrows stay solid, open iTerm2 Settings → Profiles → Window and enable **Keep background colors opaque**. You can still use any Background Transparency value for the terminal canvas.

This is an iTerm2 profile preference and cannot be stored in an `.itermcolors` color preset.

## Automatic light and dark mode

The optional `zsh/santi020k-auto-theme.zsh` helper follows the macOS system appearance. It sets `STARSHIP_CONFIG` to the dark or light preset at startup and before every prompt, allowing an open Zsh session to follow appearance changes.

Detection follows macOS rather than an independently selected iTerm2 profile color preset.

## Build and validate

```sh
pnpm --filter santi020k-terminal-theme run build
pnpm --filter santi020k-terminal-theme run validate
```

Edit `palettes.mjs` for terminal colors and `scripts/build.mjs` for output mappings. Generated files should not be hand-edited.
