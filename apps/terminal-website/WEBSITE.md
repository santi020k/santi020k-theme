# Terminal website

- Production domain: `https://terminal.santi020k.com/`
- Routes: `/` and the documentation under `/docs/`
- Build output: `apps/terminal-website/dist`
- Canonical theme source: `packages/santi020k-terminal-theme/palettes.mjs`

Deploy this app as an independent static site. Generated iTerm2 and Starship downloads are copied into the app during every build. Redirect the former `iterm.santi020k.com` domain to `https://terminal.santi020k.com/iterm2/` at the hosting provider.

## Documentation

The homepage is the product overview. Installation, Zsh, Starship, terminal color, and CLI guidance live under `/docs/` and share navigation from `src/data/docs.js`.

Downloadable installers, prompt presets, and terminal colors keep their asset paths under `/zsh/`, `/starship/`, `/themes/`, and `/ports/`. They are copied from `packages/santi020k-terminal-theme/` during each build; edit package sources rather than files under `public/`.
