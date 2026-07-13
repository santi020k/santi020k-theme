# Santi020k Zsh setup. Managed by the Santi020k Terminal installer.
typeset -U path fpath

if [[ -z ${HOMEBREW_PREFIX:-} ]] && command -v brew >/dev/null 2>&1; then
  export HOMEBREW_PREFIX="$(brew --prefix)"
fi

if [[ -n ${HOMEBREW_PREFIX:-} ]]; then
  fpath=("$HOMEBREW_PREFIX/share/zsh-completions" $fpath)
fi

autoload -Uz compinit
compinit -d "${ZDOTDIR:-$HOME}/.zcompdump"

HISTFILE=${ZDOTDIR:-$HOME}/.zsh_history
HISTSIZE=50000
SAVEHIST=50000
setopt append_history extended_history hist_expire_dups_first hist_find_no_dups
setopt hist_ignore_all_dups hist_ignore_space inc_append_history share_history
setopt auto_cd auto_pushd pushd_ignore_dups interactive_comments

bindkey -e
bindkey '^[[A' history-beginning-search-backward
bindkey '^[[B' history-beginning-search-forward

if command -v fzf >/dev/null 2>&1; then
  source <(fzf --zsh)
  if command -v fd >/dev/null 2>&1; then
    export FZF_DEFAULT_COMMAND='fd --type f --hidden --follow --exclude .git'
    export FZF_CTRL_T_COMMAND="$FZF_DEFAULT_COMMAND"
    export FZF_ALT_C_COMMAND='fd --type d --hidden --follow --exclude .git'
  fi
fi

command -v zoxide >/dev/null 2>&1 && eval "$(zoxide init zsh)"
[[ -r "${XDG_CONFIG_HOME:-$HOME/.config}/santi020k-terminal/santi020k-auto-theme.zsh" ]] && source "${XDG_CONFIG_HOME:-$HOME/.config}/santi020k-terminal/santi020k-auto-theme.zsh"
command -v starship >/dev/null 2>&1 && eval "$(starship init zsh)"

if [[ -n ${HOMEBREW_PREFIX:-} ]]; then
  [[ -r "$HOMEBREW_PREFIX/share/zsh-autosuggestions/zsh-autosuggestions.zsh" ]] && source "$HOMEBREW_PREFIX/share/zsh-autosuggestions/zsh-autosuggestions.zsh"
  # Syntax highlighting must be sourced after widgets and plugins.
  [[ -r "$HOMEBREW_PREFIX/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh" ]] && source "$HOMEBREW_PREFIX/share/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh"
fi
