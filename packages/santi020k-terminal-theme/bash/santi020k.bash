# Santi020k Bash setup. Managed by the Santi020k Terminal installer.
# cspell:ignore checkwinsize histappend

export HISTFILE="${HISTFILE:-$HOME/.bash_history}"
export HISTSIZE=50000
export HISTFILESIZE=50000
shopt -s histappend checkwinsize 2>/dev/null || true

if command -v fzf >/dev/null 2>&1; then
  eval "$(fzf --bash)"
fi

command -v zoxide >/dev/null 2>&1 && eval "$(zoxide init bash)"

santi020k_starship_theme() {
  local root="${XDG_CONFIG_HOME:-$HOME/.config}"
  local preset=rich suffix= palette=dark
  [[ -r "$root/santi020k-terminal/preset" ]] && preset=$(<"$root/santi020k-terminal/preset")
  [[ "$preset" == portable || "$preset" == minimal ]] && suffix="-$preset"
  if [[ "${SANTI020K_THEME:-auto}" == light ]]; then palette=light
  elif [[ "${SANTI020K_THEME:-auto}" == auto ]] && command -v defaults >/dev/null 2>&1 && ! defaults read -g AppleInterfaceStyle >/dev/null 2>&1; then palette=light
  fi
  export STARSHIP_CONFIG="$root/starship/santi020k-$palette$suffix.toml"
}

santi020k_starship_theme
command -v starship >/dev/null 2>&1 && eval "$(starship init bash)"
