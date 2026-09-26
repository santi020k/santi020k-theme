# Terminal website

- Canonical route: `https://theme.santi020k.com/terminal/`
- Routes: `/` and the documentation under `/docs/`
- Build output: composed into `apps/website/dist/terminal`
- Canonical theme source: `packages/santi020k-terminal-theme/palettes.mjs`

This module is composed into the consolidated site and is not deployed independently. Generated iTerm2 and Starship downloads are copied beneath `/terminal/` during the consolidated build. Redirect the former `terminal.santi020k.com` and `iterm.santi020k.com` hosts using `cloudflare/legacy-website-redirects.csv`.

## Documentation

The homepage is the product overview. Installation, Zsh, Starship, terminal color, and CLI guidance live under `/docs/` and share navigation from `src/data/docs.js`.

Downloadable installers, prompt presets, and terminal colors keep their asset paths under `/zsh/`, `/starship/`, `/themes/`, and `/ports/`. They are copied from `packages/santi020k-terminal-theme/` during each build; edit package sources rather than files under `public/`.
