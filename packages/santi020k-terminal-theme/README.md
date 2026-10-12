<p align="center">
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/README.md">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/santi020k/santi020k-theme/main/docs/assets/readme/workspace-dark.svg">
      <img src="https://raw.githubusercontent.com/santi020k/santi020k-theme/main/docs/assets/readme/workspace-light.svg" alt="Santi020k Theme — Calm contrast. A violet thread through your tools." width="1200" height="220">
    </picture>
  </a>
</p>

<h1 align="center">Terminal theme</h1>

<p align="center">
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-13967e?style=flat-square" alt="License: MIT"></a>
  <a href="https://github.com/santi020k/santi020k-theme/blob/main/packages/santi020k-terminal-theme/package.json"><img src="https://img.shields.io/badge/workspace-Private-6319be?style=flat-square" alt="Workspace: Private"></a>
</p>

<p align="center">
  <a href="../../README.md">Project overview</a> ·
  <a href="package.json">Package manifest</a> ·
  <a href="CHANGELOG.md">Changelog</a> ·
  <a href="#resources">Resources</a>
</p>

<details>
<summary>On this page</summary>

- [Powerful Zsh setup](#powerful-zsh-setup)
- [Homebrew releases](#homebrew-releases)
- [Transparent iTerm2 profiles](#transparent-iterm2-profiles)
- [Automatic light and dark mode](#automatic-light-and-dark-mode)
- [Build and validate](#build-and-validate)
- [Generated color presets](#generated-color-presets)
- [Resources](#resources)

</details>

The terminal edition of Santi020k Theme combines matching terminal colors and a Powerline-style prompt:

- `iterm2/`: generated dark and light iTerm2 color presets.
- `starship/`: generated rich, portable, and minimal Starship configurations in dark and light.
- `zsh/`, `bash/`, and `fish/`: managed shell integration with automatic appearance selection.
- `zsh/install.zsh`: a one-command macOS installer for the curated Zsh setup.
- `zsh/santi020k.zsh`: completions, history, key bindings, plugin loading, and tool initialization.

Visit [terminal.santi020k.com](https://terminal.santi020k.com/) for previews and installation instructions.

The default rich presets use Nerd Font icons and relaxed segment padding. Portable presets replace application icons with plain labels, while minimal presets remove runtime modules and use tighter spacing. For matching physical scale in iTerm2, use CaskaydiaCove Nerd Font at 15 pt with approximately 110% vertical spacing.

| Preset          | Dark                           | Light                           | Font requirement       |
| --------------- | ------------------------------ | ------------------------------- | ---------------------- |
| Rich icons      | `santi020k-dark.toml`          | `santi020k-light.toml`          | Nerd Font              |
| Portable labels | `santi020k-dark-portable.toml` | `santi020k-light-portable.toml` | Powerline-capable font |
| Minimal         | `santi020k-dark-minimal.toml`  | `santi020k-light-minimal.toml`  | Powerline-capable font |

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
santi020k-terminal configure
santi020k-terminal config export
santi020k-terminal prompt build work nodejs,python,rust dark
```

`configure` guides an interactive install, or accepts `SHELL PRESET TERMINAL PALETTE` for reproducible setup. `preset use` switches the rich, portable, or minimal Starship configuration while preserving automatic macOS light/dark selection. `colors install` supports every packaged terminal, backs up files it changes, and accepts `--dry-run`. `config export` and `config import` move choices between machines. `prompt build` creates a custom runtime-module selection without changing generated presets. `doctor` checks the recommended Nerd Font and can offer its Homebrew cask during repair.

The prompt shows an `ssh` segment only when `SSH_CONNECTION` is present, making remote sessions recognizable without adding noise locally. Set `SANTI020K_THEME=dark` or `light` to override automatic appearance selection in Bash or Fish.

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

| Terminal         | Directory           |
| ---------------- | ------------------- |
| iTerm2           | `iterm2/`           |
| Ghostty          | `ghostty/`          |
| Kitty            | `kitty/`            |
| WezTerm          | `wezterm/`          |
| Windows Terminal | `windows-terminal/` |
| Alacritty        | `alacritty/`        |

## Resources

[Project overview](../../README.md) · [Contributing](../../CONTRIBUTING.md) · [License](../../LICENSE)
