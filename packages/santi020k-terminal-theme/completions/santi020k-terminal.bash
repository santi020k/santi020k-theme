_santi020k_terminal() {
  local current previous
  current=${COMP_WORDS[COMP_CWORD]}
  previous=${COMP_WORDS[COMP_CWORD-1]}

  case "$previous" in
    configure) COMPREPLY=($(compgen -W 'zsh bash fish all' -- "$current")) ;;
    config) COMPREPLY=($(compgen -W 'export import' -- "$current")) ;;
    prompt) COMPREPLY=($(compgen -W 'build' -- "$current")) ;;
    preset) COMPREPLY=($(compgen -W 'list current use' -- "$current")) ;;
    use) COMPREPLY=($(compgen -W 'rich portable minimal' -- "$current")) ;;
    colors) COMPREPLY=($(compgen -W 'list path install' -- "$current")) ;;
    path|install) COMPREPLY=($(compgen -W 'iterm2 ghostty kitty wezterm alacritty windows-terminal' -- "$current")) ;;
    iterm2|ghostty|kitty|wezterm|alacritty|windows-terminal) COMPREPLY=($(compgen -W 'dark light' -- "$current")) ;;
    doctor) COMPREPLY=($(compgen -W '--fix' -- "$current")) ;;
    preview) COMPREPLY=($(compgen -W 'dark light' -- "$current")) ;;
    --fix) COMPREPLY=($(compgen -W '--yes' -- "$current")) ;;
    *) COMPREPLY=($(compgen -W 'configure install update doctor preset prompt colors config status preview migrate uninstall version help' -- "$current")) ;;
  esac
}

complete -F _santi020k_terminal santi020k-terminal
