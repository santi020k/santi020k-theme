# Select the Santi020k Starship preset that matches the macOS appearance.
santi020k_starship_theme() {
  local preset_dir="${XDG_CONFIG_HOME:-$HOME/.config}/starship"
  if defaults read -g AppleInterfaceStyle >/dev/null 2>&1; then
    export STARSHIP_CONFIG="$preset_dir/santi020k-dark.toml"
  else
    export STARSHIP_CONFIG="$preset_dir/santi020k-light.toml"
  fi
}

santi020k_starship_theme

autoload -Uz add-zsh-hook
add-zsh-hook precmd santi020k_starship_theme
