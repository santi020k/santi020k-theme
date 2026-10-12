-- Run without the user's config, plugins, or persisted state.
local root = assert(vim.env.SANTI020K_NVIM_ROOT)
vim.opt.runtimepath:prepend(root)
vim.opt.termguicolors = true
vim.cmd("syntax enable")

local function color(name)
  return vim.api.nvim_get_hl(0, { name = name, link = false })
end

local previous
for _, appearance in ipairs({ "dark", "light", "dark", "light" }) do
  vim.o.background = appearance
  vim.cmd("colorscheme santi020k")
  assert(vim.g.colors_name == "santi020k")
  assert(vim.o.background == appearance)
  local normal = color("Normal")
  assert(normal.fg and normal.bg and normal.fg ~= normal.bg)
  assert(normal.bg ~= previous, "Changing appearance must change the canvas")
  previous = normal.bg
  assert(color("@function").fg == color("Function").fg)
  assert(color("@lsp.type.class").fg == color("Type").fg)
  assert(color("DiagnosticUnderlineError").undercurl)
  assert(color("@lsp.mod.deprecated").strikethrough)
  assert(color("Visual").bg ~= normal.bg)
  assert(color("NormalFloat").bg ~= normal.bg)
  assert(color("PmenuSel").fg ~= color("PmenuSel").bg)
  for i = 0, 15 do
    assert(vim.g["terminal_color_" .. i]:match("^#%x%x%x%x%x%x$"))
  end
end
vim.o.background = "dark"
assert(color("Normal").bg ~= previous, "Background alone must reload the colorscheme")
vim.cmd("enew")
vim.api.nvim_buf_set_lines(0, 0, -1, false, { "local theme = 'santi020k'", "return theme" })
vim.bo.filetype = "lua"
vim.diagnostic.set(vim.api.nvim_create_namespace("santi020k-test"), 0, {
  { lnum = 0, col = 0, message = "Example diagnostic", severity = vim.diagnostic.severity.WARN },
})
assert(#vim.diagnostic.get(0) == 1)
print("Native Neovim load, mode switching, syntax links, diagnostics and terminal colors passed.")
