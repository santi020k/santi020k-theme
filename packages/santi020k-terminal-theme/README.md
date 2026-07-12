# Santi020k Terminal Theme

<!-- cspell:ignore tlsv -->

The terminal edition of Santi020k Theme combines matching terminal colors and a Powerline-style prompt:

- `iterm2/`: generated dark and light iTerm2 color presets.
- `starship/`: generated rich, portable, and minimal Starship configurations in dark and light.
- `zsh/`: optional macOS appearance detection for switching Starship configurations.
- `zsh/install.zsh`: a one-command macOS installer for the curated Zsh setup.
- `zsh/santi020k.zsh`: completions, history, key bindings, plugin loading, and tool initialization.

Visit [terminal.santi020k.com](https://terminal.santi020k.com/) for previews and installation instructions.

The default rich presets use Nerd Font icons and relaxed segment padding. Portable presets replace application icons with plain labels, while minimal presets remove runtime modules and use tighter spacing. For matching physical scale in iTerm2, use CaskaydiaCove Nerd Font at 15 pt with approximately 110% vertical spacing.

| Preset | Dark | Light | Font requirement |
| --- | --- | --- | --- |
| Rich icons | `santi020k-dark.toml` | `santi020k-light.toml` | Nerd Font |
| Portable labels | `santi020k-dark-portable.toml` | `santi020k-light-portable.toml` | Powerline-capable font |
| Minimal | `santi020k-dark-minimal.toml` | `santi020k-light-minimal.toml` | Powerline-capable font |

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

Edit `palettes.mjs` for terminal colors, `prompt-presets.mjs` for shared prompt metadata, and `scripts/build.mjs` for output mappings. Validation parses every TOML file, checks generated assets and website downloads for drift, and renders smoke prompts when the Starship CLI is installed. Generated files should not be hand-edited.
