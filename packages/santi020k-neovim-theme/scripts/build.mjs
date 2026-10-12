import { mkdirSync, writeFileSync } from 'node:fs'

import { readPortPalette } from '../../../scripts/lib/port-palette.mjs'

const groups = p => ({
  Normal: { fg: p.foreground, bg: p.background },
  NormalNC: { link: 'Normal' },
  NormalFloat: { fg: p.foreground, bg: p.surface },
  FloatBorder: { fg: p.accent, bg: p.surface },
  FloatTitle: { fg: p.accent, bg: p.surface, bold: true },
  Comment: { fg: p.comment, italic: true },
  Constant: { fg: p.number },
  String: { fg: p.string },
  Character: { link: 'String' },
  Number: { link: 'Constant' },
  Boolean: { fg: p.keyword },
  Float: { link: 'Number' },
  Identifier: { fg: p.foreground },
  Function: { fg: p.function },
  Statement: { fg: p.keyword },
  Keyword: { link: 'Statement' },
  Conditional: { link: 'Statement' },
  Repeat: { link: 'Statement' },
  Label: { link: 'Statement' },
  Exception: { link: 'Statement' },
  Operator: { fg: p.operator },
  PreProc: { fg: p.keyword },
  Include: { link: 'PreProc' },
  Define: { link: 'PreProc' },
  Macro: { link: 'PreProc' },
  PreCondit: { link: 'PreProc' },
  Type: { fg: p.type },
  StorageClass: { link: 'Type' },
  Structure: { link: 'Type' },
  Typedef: { link: 'Type' },
  Special: { fg: p.property },
  SpecialChar: { link: 'Special' },
  Tag: { link: 'Type' },
  Delimiter: { fg: p.muted },
  SpecialComment: { link: 'Comment' },
  Debug: { link: 'Special' },
  Underlined: { fg: p.accent, underline: true },
  Ignore: { fg: p.muted },
  Error: { fg: p.error, bold: true },
  Todo: { fg: p.accent, bg: p.selection, bold: true },
  Visual: { bg: p.selection },
  VisualNOS: { link: 'Visual' },
  Search: { fg: p.foreground, bg: p.selection, underline: true },
  IncSearch: { fg: p.background, bg: p.accent },
  CurSearch: { link: 'IncSearch' },
  Substitute: { link: 'IncSearch' },
  Cursor: { fg: p.background, bg: p.accent },
  lCursor: { link: 'Cursor' },
  CursorIM: { link: 'Cursor' },
  TermCursor: { link: 'Cursor' },
  CursorLine: { bg: p.surface },
  CursorColumn: { link: 'CursorLine' },
  ColorColumn: { bg: p.surface },
  LineNr: { fg: p.muted },
  CursorLineNr: { fg: p.accent, bold: true },
  SignColumn: { bg: p.background },
  FoldColumn: { fg: p.muted, bg: p.background },
  Folded: { fg: p.muted, bg: p.surface },
  EndOfBuffer: { fg: p.border },
  NonText: { fg: p.muted },
  Whitespace: { fg: p.border },
  SpecialKey: { fg: p.muted },
  MatchParen: { fg: p.accent, bg: p.selection, bold: true },
  StatusLine: { fg: p.foreground, bg: p.selection },
  StatusLineNC: { fg: p.muted, bg: p.surface },
  WinSeparator: { fg: p.border },
  VertSplit: { link: 'WinSeparator' },
  TabLine: { fg: p.muted, bg: p.surface },
  TabLineFill: { bg: p.surface },
  TabLineSel: { fg: p.accent, bg: p.background, bold: true },
  Pmenu: { fg: p.foreground, bg: p.surface },
  PmenuSel: { fg: p.foreground, bg: p.selection, bold: true },
  PmenuSbar: { bg: p.surface },
  PmenuThumb: { bg: p.muted },
  WildMenu: { link: 'PmenuSel' },
  Directory: { fg: p.accent },
  Title: { fg: p.accent, bold: true },
  Question: { fg: p.success },
  MoreMsg: { fg: p.success },
  ModeMsg: { fg: p.accent },
  ErrorMsg: { fg: p.error },
  WarningMsg: { fg: p.warning },
  MsgArea: { link: 'Normal' },
  DiffAdd: { fg: p.success, bg: p.surface },
  DiffDelete: { fg: p.error, bg: p.surface },
  DiffChange: { bg: p.selection },
  DiffText: { fg: p.foreground, bg: p.selection, bold: true, underline: true },
  Added: { fg: p.success },
  Removed: { fg: p.error },
  Changed: { fg: p.warning },
  SpellBad: { sp: p.error, undercurl: true },
  SpellCap: { sp: p.warning, undercurl: true },
  SpellLocal: { sp: p.info, undercurl: true },
  SpellRare: { sp: p.accent, undercurl: true },
  LspReferenceText: { bg: p.selection },
  LspReferenceRead: { link: 'LspReferenceText' },
  LspReferenceWrite: { bg: p.selection, underline: true },
  LspSignatureActiveParameter: { fg: p.accent, bg: p.selection, bold: true },
  LspCodeLens: { fg: p.muted },
  LspInlayHint: { fg: p.muted, bg: p.surface }
})

const captures = {
  variable: 'Identifier',
  'variable.builtin': 'Special',
  'variable.parameter': 'Identifier',
  'variable.member': 'Special',
  constant: 'Constant',
  'constant.builtin': 'Constant',
  'constant.macro': 'Macro',
  module: 'Type',
  label: 'Label',
  string: 'String',
  'string.escape': 'SpecialChar',
  'string.regexp': 'String',
  'string.special.url': 'Underlined',
  character: 'Character',
  boolean: 'Boolean',
  number: 'Number',
  'number.float': 'Float',
  type: 'Type',
  'type.builtin': 'Type',
  attribute: 'Special',
  property: 'Special',
  function: 'Function',
  'function.builtin': 'Function',
  'function.call': 'Function',
  'function.macro': 'Macro',
  'function.method': 'Function',
  constructor: 'Type',
  operator: 'Operator',
  keyword: 'Keyword',
  'keyword.function': 'Keyword',
  'keyword.return': 'Keyword',
  'keyword.import': 'Include',
  'punctuation.delimiter': 'Delimiter',
  'punctuation.bracket': 'Delimiter',
  'punctuation.special': 'Special',
  comment: 'Comment',
  'comment.todo': 'Todo',
  'comment.error': 'Error',
  'comment.warning': 'WarningMsg',
  'markup.heading': 'Title',
  'markup.raw': 'String',
  'markup.link': 'Underlined',
  'markup.link.url': 'Underlined',
  'markup.list': 'Special',
  tag: 'Tag',
  'tag.attribute': 'Special',
  'tag.delimiter': 'Delimiter'
}

const semantic = {
  class: 'Type',
  comment: 'Comment',
  decorator: 'Special',
  enum: 'Type',
  enumMember: 'Constant',
  event: 'Special',
  function: 'Function',
  interface: 'Type',
  keyword: 'Keyword',
  macro: 'Macro',
  method: 'Function',
  namespace: 'Type',
  number: 'Number',
  operator: 'Operator',
  parameter: 'Identifier',
  property: 'Special',
  regexp: 'String',
  string: 'String',
  struct: 'Type',
  type: 'Type',
  typeParameter: 'Type',
  variable: 'Identifier'
}

const makeGroups = p => {
  const result = groups(p)

  for (const [capture, link] of Object.entries(captures)) result[`@${capture}`] = { link }

  for (const [capture, link] of Object.entries(semantic)) result[`@lsp.type.${capture}`] = { link }

  const diagnostics = { Error: p.error, Warn: p.warning, Info: p.info, Hint: p.accent, Ok: p.success }

  for (const [name, color] of Object.entries(diagnostics)) {
    result[`Diagnostic${name}`] = { fg: color }

    result[`DiagnosticUnderline${name}`] = { sp: color, undercurl: true }

    for (const kind of ['Sign', 'Floating', 'VirtualText']) result[`Diagnostic${kind}${name}`] = { link: `Diagnostic${name}` }
  }

  result['@lsp.mod.deprecated'] = { strikethrough: true }

  result['@markup.strong'] = { bold: true }

  result['@markup.italic'] = { italic: true }

  result['@markup.strikethrough'] = { strikethrough: true }

  return result
}

const luaValue = value => typeof value === 'string' ? JSON.stringify(value) : String(value)

const luaGroups = appearance => Object.entries(makeGroups(readPortPalette(appearance)))
  .map(([name, style]) => `    [${JSON.stringify(name)}] = { ${Object.entries(style).map(([key, value]) => `${key} = ${luaValue(value)}`).join(', ')} },`)
  .join('\n')

const luaTerminal = appearance => readPortPalette(appearance).terminal.map(luaValue).join(', ')
const root = new URL('../', import.meta.url)

mkdirSync(new URL('colors/', root), { recursive: true })

writeFileSync(new URL('colors/santi020k.lua', root), `-- Generated from the canonical Santi020k palette. Edit scripts/build.mjs.
-- Neovim 0.10+. Select light/dark with 'background' before :colorscheme santi020k.
local appearance = vim.o.background
vim.cmd("highlight clear")
if vim.fn.exists("syntax_on") == 1 then
  vim.cmd("syntax reset")
end
vim.g.colors_name = "santi020k"
local palettes = {
  dark = {
${luaGroups('dark')}
  },
  light = {
${luaGroups('light')}
  },
}
local terminal = {
  dark = { ${luaTerminal('dark')} },
  light = { ${luaTerminal('light')} },
}
for name, style in pairs(palettes[appearance]) do
  vim.api.nvim_set_hl(0, name, style)
end
for index, color in ipairs(terminal[appearance]) do
  vim.g["terminal_color_" .. (index - 1)] = color
end
`)

console.log('Generated Neovim dark and light colorscheme.')
