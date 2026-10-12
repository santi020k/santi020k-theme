# Santi020k for Neovim

A generated dark and light colorscheme for Neovim 0.10 or later. Covers native syntax, Tree-sitter captures, LSP semantic tokens, diagnostics, completion menus, floating windows, diffs, search, selections, and terminal ANSI colors. No runtime plugin dependency.

## Install

Download the ZIP from [the Neovim page](https://theme.santi020k.com/neovim/). Run `:echo stdpath('config')` in Neovim to locate your configuration directory. Copy the archive's `colors/santi020k.lua` into the `colors` directory there, creating it if needed. Keep your existing configuration and other themes.

Add this to `init.lua` after your plugin setup:

```lua
vim.opt.termguicolors = true
vim.opt.background = "dark" -- or "light"
vim.cmd.colorscheme("santi020k")
```

For `init.vim`:

```vim
set termguicolors
set background=dark
colorscheme santi020k
```

Switch with `:set background=light` or `:set background=dark`. The colorscheme follows Neovim's background setting; it does not monitor OS appearance. A terminal with true-color support is recommended. Tree-sitter and LSP highlighting apply when those Neovim features are configured. Third-party plugin-specific groups are not part of this first version.

## Update or remove

Replace only `colors/santi020k.lua` to update. To remove, select another colorscheme, remove the Santi020k activation line from your configuration, and delete that file. No installer rewrites your configuration.

## Development

Run `pnpm --filter santi020k-neovim-theme run validate`. Edit `scripts/build.mjs`; never hand-edit the generated Lua. Colors are derived from the canonical VS Code sources through `scripts/lib/port-palette.mjs`, including selected-text contrast adjustments. Run `pnpm exec vitest run packages/santi020k-neovim-theme/tests` with Neovim available for isolated native tests. Native checks skip with an explicit test result when Neovim is not installed; portable artifact checks always run.

The website build bundles `colors/santi020k.lua`, this guide and the license. The monorepo root is not a Neovim plugin root: use the ZIP installation instead of pointing a plugin manager at the repository root.

[Theme family](https://theme.santi020k.com) · [Santiago Molina](https://santi020k.com) · MIT
