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

The recommended installation uses the `santi020k-terminal` formula from the shared `santi020k/tap` Homebrew tap:

```sh
brew install santi020k/tap/santi020k-terminal
santi020k-terminal install
```

The CLI installs managed configuration and also provides preset selection, terminal color helpers, health checks, repair, migrations, and status reporting. Homebrew installs native completions for Zsh, Bash, and Fish.

```sh
santi020k-terminal preset list
santi020k-terminal preset use portable
santi020k-terminal colors list
santi020k-terminal colors install iterm2 dark
santi020k-terminal status
santi020k-terminal preview dark
santi020k-terminal doctor --fix
```

`preset use` switches the rich, portable, or minimal Starship configuration while preserving automatic macOS light/dark selection. `colors path` prints the packaged file for any supported terminal. `colors install` imports iTerm2 presets and installs Ghostty, Kitty, or Alacritty theme files; for WezTerm and Windows Terminal it prints the packaged source path for manual integration. Repair asks before installing missing Homebrew dependencies; pass `--yes` after `--fix` for non-interactive use.

Homebrew owns the formula and its dependencies; the explicit `install` command keeps shell configuration changes reviewable.

The hosted install script remains available as an alternative. It uses Homebrew to install Starship, Zsh autosuggestions, syntax highlighting, extra completions, fzf, zoxide, eza, bat, ripgrep, fd, jq, and git-delta. Both paths keep managed configuration in `~/.config/santi020k-terminal`, preserve the rest of `.zshrc`, and are safe to run again.

```sh
curl --proto '=https' --tlsv1.2 -fsSL https://terminal.santi020k.com/zsh/install.zsh | zsh
```

Review `zsh/install.zsh` before running it. Homebrew is required and is intentionally not installed automatically.

## Homebrew releases

`pnpm --filter santi020k-terminal-theme run package` creates a versioned release archive, SHA-256 metadata, and `santi020k-terminal.rb` formula under `dist/`. Tags named `santi020k-terminal-v<version>` publish the archive and update `santi020k/homebrew-tap` when the `HOMEBREW_TAP_TOKEN` repository secret is configured.

## Transparent iTerm2 profiles

Starship emits solid RGB backgrounds for every Powerline segment. If the segment text backgrounds look translucent while the separator arrows stay solid, open iTerm2 Settings → Profiles → Window and enable **Keep background colors opaque**. You can still use any Background Transparency value for the terminal canvas.

This is an iTerm2 profile preference and cannot be stored in an `.itermcolors` color preset.

## Automatic light and dark mode

The optional `zsh/santi020k-auto-theme.zsh` helper follows the macOS system appearance and the preset stored by `santi020k-terminal preset use`. It sets `STARSHIP_CONFIG` at startup and before every prompt, allowing an open Zsh session to follow appearance or preset changes.

Detection follows macOS rather than an independently selected iTerm2 profile color preset.

## Build and validate

```sh
pnpm --filter santi020k-terminal-theme run build
pnpm --filter santi020k-terminal-theme run validate
```

Edit `palettes.mjs` for terminal colors, `prompt-presets.mjs` for shared prompt metadata, and `scripts/build.mjs` for output mappings. Validation parses every TOML file, checks generated assets and website downloads for drift, and renders smoke prompts when the Starship CLI is installed. Generated files should not be hand-edited.
The shared dark and light palette is generated for iTerm2, Ghostty, Kitty, WezTerm, Windows Terminal, and Alacritty, with coordinated Starship and Zsh presets.

## Generated color presets

| Terminal | Directory |
| --- | --- |
| iTerm2 | `iterm2/` |
| Ghostty | `ghostty/` |
| Kitty | `kitty/` |
| WezTerm | `wezterm/` |
| Windows Terminal | `windows-terminal/` |
| Alacritty | `alacritty/` |
