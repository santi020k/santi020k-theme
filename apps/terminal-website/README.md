# Santi020k Terminal Theme website

Astro source module for the [Terminal product route](https://theme.santi020k.com/terminal/) in the consolidated theme-family site. It presents the complete Terminal product and publishes dedicated guides for iTerm2 and Starship.

```sh
pnpm run site:dev
pnpm run site:build
pnpm run site:preview
```

The consolidated development and preview servers run on `http://127.0.0.1:4174`.

The build syncs generated presets from `packages/santi020k-terminal-theme`. Edit canonical palette and generator sources in the package, not website copies.
