#!/usr/bin/env zsh
# cspell:ignore tlsv
set -euo pipefail

readonly BASE_URL="${SANTI020K_BASE_URL:-https://terminal.santi020k.com}"
readonly CONFIG_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/santi020k-terminal"
readonly STARSHIP_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/starship"
readonly ZSHRC="${ZDOTDIR:-$HOME}/.zshrc"
readonly SOURCE_LINE='source "${XDG_CONFIG_HOME:-$HOME/.config}/santi020k-terminal/santi020k.zsh"'
readonly FORMULAE=(starship zsh-autosuggestions zsh-syntax-highlighting zsh-completions fzf zoxide eza bat ripgrep fd jq git-delta)

if ! command -v brew >/dev/null 2>&1; then
  print -u2 'Homebrew is required. Install it from https://brew.sh, then run this command again.'
  exit 1
fi

if ! command -v curl >/dev/null 2>&1; then
  print -u2 'curl is required to download the Santi020k configuration.'
  exit 1
fi

print 'Installing the curated Zsh plugins and terminal tools…'
brew install "${FORMULAE[@]}"

mkdir -p "$CONFIG_DIR" "$STARSHIP_DIR"
timestamp=$(date +%Y%m%d-%H%M%S)
for file in "$CONFIG_DIR/santi020k.zsh" "$STARSHIP_DIR/santi020k-dark.toml" "$STARSHIP_DIR/santi020k-light.toml"; do
  [[ -f "$file" ]] && cp "$file" "$file.backup-$timestamp"
done

curl --proto '=https' --tlsv1.2 -fsSL "$BASE_URL/zsh/santi020k.zsh" -o "$CONFIG_DIR/santi020k.zsh"
curl --proto '=https' --tlsv1.2 -fsSL "$BASE_URL/zsh/santi020k-auto-theme.zsh" -o "$CONFIG_DIR/santi020k-auto-theme.zsh"
curl --proto '=https' --tlsv1.2 -fsSL "$BASE_URL/starship/santi020k-dark.toml" -o "$STARSHIP_DIR/santi020k-dark.toml"
curl --proto '=https' --tlsv1.2 -fsSL "$BASE_URL/starship/santi020k-light.toml" -o "$STARSHIP_DIR/santi020k-light.toml"

touch "$ZSHRC"
if ! grep -Fqx "$SOURCE_LINE" "$ZSHRC"; then
  printf '%s\n' '' '# Santi020k Terminal' "$SOURCE_LINE" >> "$ZSHRC"
fi

print '\nSanti020k Terminal is ready.'
print 'Open a new terminal or run: exec zsh'
print 'Optional Nerd Font: brew install --cask font-caskaydia-cove-nerd-font'
