# Santi020k Fish setup. Managed by the Santi020k Terminal installer.

if type -q zoxide
  zoxide init fish | source
end

function santi020k_starship_theme --on-event fish_prompt
  set -l root "$HOME/.config"
  test -n "$XDG_CONFIG_HOME"; and set root "$XDG_CONFIG_HOME"
  set -l preset rich
  test -r "$root/santi020k-terminal/preset"; and set preset (string trim < "$root/santi020k-terminal/preset")
  set -l suffix ""
  contains -- $preset portable minimal; and set suffix "-$preset"
  set -l palette dark
  if test "$SANTI020K_THEME" = light
    set palette light
  else if test -z "$SANTI020K_THEME" -o "$SANTI020K_THEME" = auto
    if type -q defaults; and not defaults read -g AppleInterfaceStyle >/dev/null 2>&1
      set palette light
    end
  end
  set -gx STARSHIP_CONFIG "$root/starship/santi020k-$palette$suffix.toml"
end

santi020k_starship_theme
type -q starship; and starship init fish | source
