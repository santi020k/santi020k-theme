# Select the Santi020k Starship preset that matches the macOS appearance.
santi020k_starship_theme() {
  local preset_dir="${XDG_CONFIG_HOME:-$HOME/.config}/starship"
  local preset_file="${XDG_CONFIG_HOME:-$HOME/.config}/santi020k-terminal/preset"
  local preset=rich suffix=''
  [[ -r "$preset_file" ]] && preset=$(<"$preset_file")
  [[ "$preset" == portable || "$preset" == minimal ]] && suffix="-$preset"
  if defaults read -g AppleInterfaceStyle >/dev/null 2>&1; then
    export STARSHIP_CONFIG="$preset_dir/santi020k-dark$suffix.toml"
  else
    export STARSHIP_CONFIG="$preset_dir/santi020k-light$suffix.toml"
  fi
}

santi020k_starship_theme

autoload -Uz add-zsh-hook
add-zsh-hook precmd santi020k_starship_theme
