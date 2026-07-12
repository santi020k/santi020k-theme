# Terminal website

- Production domain: `https://terminal.santi020k.com/`
- Routes: `/`, `/iterm2/`, `/starship/`
- Build output: `apps/terminal-website/dist`
- Canonical theme source: `packages/santi020k-terminal-theme/palettes.mjs`

Deploy this app as an independent static site. Generated iTerm2 and Starship downloads are copied into the app during every build. Redirect the former `iterm.santi020k.com` domain to `https://terminal.santi020k.com/iterm2/` at the hosting provider.

## Zsh setup

The `/zsh/` guide documents the curated macOS and Homebrew setup. Its downloadable installer and configuration are copied from `packages/santi020k-terminal-theme/zsh/` during each build; edit the package sources rather than `public/zsh/`.
