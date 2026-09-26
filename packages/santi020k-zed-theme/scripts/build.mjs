import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const vscodeThemeRoot = resolve(root, '..', 'santi020k-theme', 'themes')
const outputPath = resolve(root, 'themes', 'santi020k.json')
const stripJsonComments = raw => raw.replaceAll(/\/\*[\s\S]*?\*\//g, '').replaceAll(/^\s*\/\/.*$/gm, '')

const readVSCodeTheme = variant => {
  const path = resolve(
    vscodeThemeRoot, `santi020k-${variant}-color-theme.json`
  )

  const raw = readFileSync(path, 'utf8')

  return JSON.parse(stripJsonComments(raw))
}

const hex = (colors, token, fallback = null) => colors[token] ?? fallback

const getSemanticColor = (semanticTokenColors, token, fallback = null) => {
  const value = semanticTokenColors?.[token]

  if (!value) return fallback

  if (typeof value === 'string') return value

  if (typeof value === 'object' && 'foreground' in value)
    return value.foreground ?? fallback

  return fallback
}

const getSemanticFlag = (semanticTokenColors, token, flag) => {
  const value = semanticTokenColors?.[token]

  return typeof value === 'object' ? Boolean(value[flag]) : false
}

const syntaxStyle = (color, extra = {}) => ({
  color,
  font_style: extra.font_style ?? null,
  font_weight: extra.font_weight ?? null,
  background_color: extra.background_color ?? null
})

const buildTheme = variant => {
  const vscode = readVSCodeTheme(variant)
  const colors = vscode.colors
  const semantic = vscode.semanticTokenColors ?? {}
  const dark = variant === 'dark'

  const syntaxColors = {
    comment: getSemanticColor(
      semantic, 'comment', hex(colors, 'descriptionForeground')
    ),
    keyword: getSemanticColor(
      semantic, 'keyword', hex(colors, 'textLink.foreground')
    ),
    string: getSemanticColor(
      semantic, 'string', hex(colors, 'terminal.ansiGreen')
    ),
    number: getSemanticColor(
      semantic, 'number', hex(colors, 'terminal.ansiCyan')
    ),
    boolean: getSemanticColor(
      semantic, 'enum', getSemanticColor(semantic, 'class', hex(colors, 'terminal.ansiMagenta'))
    ),
    function: getSemanticColor(
      semantic, 'function', hex(colors, 'textLink.foreground')
    ),
    method: getSemanticColor(
      semantic, 'method', getSemanticColor(
        semantic, 'function', hex(colors, 'textLink.foreground')
      )
    ),
    type: getSemanticColor(
      semantic, 'type', getSemanticColor(semantic, 'class', hex(colors, 'terminal.ansiCyan'))
    ),
    class: getSemanticColor(
      semantic, 'class', hex(colors, 'terminal.ansiMagenta')
    ),
    enum: getSemanticColor(
      semantic, 'enum', getSemanticColor(semantic, 'class', hex(colors, 'terminal.ansiMagenta'))
    ),
    interface: getSemanticColor(
      semantic, 'interface', getSemanticColor(semantic, 'class', hex(colors, 'terminal.ansiMagenta'))
    ),
    variable: getSemanticColor(
      semantic, 'variable', hex(colors, 'editor.foreground')
    ),
    parameter: getSemanticColor(
      semantic, 'parameter', hex(colors, 'editor.foreground')
    ),
    property: getSemanticColor(
      semantic, 'property', hex(colors, 'editor.foreground')
    ),
    operator: getSemanticColor(
      semantic, 'operator', hex(colors, 'editor.foreground')
    ),
    decorator: getSemanticColor(
      semantic, 'decorator', hex(
        colors, 'editorWarning.foreground', hex(colors, 'terminal.ansiYellow')
      )
    ),
    regexp: getSemanticColor(
      semantic, 'regexp', hex(colors, 'terminal.ansiYellow')
    ),
    macro: getSemanticColor(
      semantic, 'macro', hex(
        colors, 'editorWarning.foreground', hex(colors, 'terminal.ansiYellow')
      )
    ),
    typeParameter: getSemanticColor(
      semantic, 'typeParameter', hex(colors, 'terminal.ansiCyan')
    ),
    enumMember: getSemanticColor(
      semantic, 'enumMember', hex(colors, 'terminal.ansiCyan')
    )
  }

  return {
    name: dark ? 'Santi020k Dark' : 'Santi020k Light',
    appearance: dark ? 'dark' : 'light',
    style: {
      accents: [
        hex(colors, 'tab.activeBorder', hex(colors, 'textLink.foreground')),
        hex(colors, 'textLink.foreground'),
        hex(colors, 'textLink.activeForeground')
      ],
      background: hex(colors, 'editor.background'),
      'background.appearance': 'opaque',
      border: hex(colors, 'editorGroup.border', hex(colors, 'panel.border')),
      'border.disabled': hex(
        colors, 'window.inactiveBorder', hex(colors, 'panel.border')
      ),
      'border.focused': hex(
        colors, 'focusBorder', hex(colors, 'tab.activeBorder')
      ),
      'border.selected': hex(colors, 'tab.activeBorder'),
      'border.transparent': '#00000000',
      'border.variant': hex(
        colors, 'tab.border', hex(colors, 'sideBar.border')
      ),
      conflict: hex(
        colors, 'mergeEditor.conflict.unhandledFocused.border', hex(colors, 'editorError.foreground')
      ),
      'conflict.background': hex(
        colors, 'mergeEditor.conflict.input1.background', hex(colors, 'editor.lineHighlightBackground')
      ),
      'conflict.border': hex(
        colors, 'mergeEditor.conflict.unhandledFocused.border', hex(colors, 'editorError.foreground')
      ),
      created: hex(colors, 'terminal.ansiGreen', '#28a745'),
      'created.background': hex(
        colors, 'diffEditor.insertedLineBackground', hex(colors, 'terminal.ansiGreen')
      ),
      'created.border': hex(
        colors, 'editorGutter.addedBackground', hex(colors, 'terminal.ansiGreen')
      ),
      deleted: hex(colors, 'terminal.ansiRed', '#c0392b'),
      'deleted.background': hex(
        colors, 'diffEditor.removedLineBackground', hex(colors, 'terminal.ansiRed')
      ),
      'deleted.border': hex(
        colors, 'editorGutter.deletedBackground', hex(colors, 'terminal.ansiRed')
      ),
      'drop_target.background': hex(
        colors, 'editorGroup.dropBackground', hex(colors, 'selection.background')
      ),
      'editor.active_line.background': hex(
        colors, 'editor.lineHighlightBackground'
      ),
      'editor.active_line_number': hex(
        colors, 'editorLineNumber.activeForeground'
      ),
      'editor.active_wrap_guide': hex(
        colors, 'editorIndentGuide.activeBackground1'
      ),
      'editor.background': hex(colors, 'editor.background'),
      'editor.document_highlight.bracket_background': hex(
        colors, 'editorBracketMatch.background'
      ),
      'editor.document_highlight.read_background': hex(
        colors, 'editor.selectionHighlightBackground', hex(
          colors, 'editor.wordHighlightBackground', hex(colors, 'editor.symbolHighlightBackground')
        )
      ),
      'editor.document_highlight.write_background': hex(
        colors, 'selection.background', hex(
          colors, 'editor.wordHighlightStrongBackground', hex(colors, 'editor.symbolHighlightBackground')
        )
      ),
      'editor.foreground': hex(colors, 'editor.foreground'),
      'editor.gutter.background': hex(colors, 'editor.background'),
      'editor.highlighted_line.background': hex(
        colors, 'editor.lineHighlightBackground'
      ),
      'editor.indent_guide': hex(colors, 'editorIndentGuide.background1'),
      'editor.indent_guide_active': hex(
        colors, 'editorIndentGuide.activeBackground1'
      ),
      'editor.invisible': hex(colors, 'editorWhitespace.foreground'),
      'editor.line_number': hex(colors, 'editorLineNumber.foreground'),
      'editor.subheader.background': hex(
        colors, 'sideBarSectionHeader.background', hex(colors, 'panelSectionHeader.background')
      ),
      'editor.wrap_guide': hex(colors, 'editorRuler.foreground'),
      'element.active': hex(
        colors, 'selection.background', hex(
          colors, 'list.activeSelectionBackground', hex(colors, 'commandCenter.activeBackground')
        )
      ),
      'element.background': hex(
        colors, 'editorWidget.background', hex(colors, 'sideBar.background')
      ),
      'element.disabled': hex(
        colors, 'sideBar.background', hex(colors, 'window.inactiveBorder')
      ),
      'element.hover': hex(
        colors, 'list.hoverBackground', hex(colors, 'tab.hoverBackground')
      ),
      'element.selected': hex(
        colors, 'selection.background', hex(
          colors, 'list.activeSelectionBackground', hex(colors, 'tab.activeBackground')
        )
      ),
      element_selection_background: dark ? '#5a0fdb66' : '#6319be40',
      'elevated_surface.background': hex(
        colors, 'editorWidget.background', hex(colors, 'menu.background')
      ),
      error: hex(colors, 'editorError.foreground'),
      'error.background': hex(
        colors, 'diffEditor.removedLineBackground', hex(colors, 'terminal.ansiRed')
      ),
      'error.border': hex(colors, 'editorError.foreground'),
      'ghost_element.active': hex(
        colors, 'selection.background', hex(
          colors, 'menubar.selectionBackground', hex(colors, 'list.activeSelectionBackground')
        )
      ),
      'ghost_element.background': '#00000000',
      'ghost_element.disabled': '#00000000',
      'ghost_element.hover': hex(
        colors, 'list.hoverBackground', hex(colors, 'tab.hoverBackground')
      ),
      'ghost_element.selected': hex(
        colors, 'editor.selectionHighlightBackground', hex(
          colors, 'list.inactiveSelectionBackground', hex(
            colors, 'selection.background', hex(colors, 'tab.activeBackground')
          )
        )
      ),
      hidden: hex(colors, 'disabledForeground'),
      'hidden.background': '#00000000',
      'hidden.border': hex(
        colors, 'window.inactiveBorder', hex(colors, 'panel.border')
      ),
      hint: hex(colors, 'editorHint.foreground'),
      'hint.background': hex(colors, 'editor.lineHighlightBackground'),
      'hint.border': hex(colors, 'editorHint.foreground'),
      icon: hex(colors, 'icon.foreground'),
      'icon.accent': hex(colors, 'textLink.foreground'),
      'icon.disabled': hex(colors, 'disabledForeground'),
      'icon.muted': hex(colors, 'disabledForeground'),
      'icon.placeholder': hex(colors, 'disabledForeground'),
      ignored: hex(colors, 'disabledForeground'),
      'ignored.background': '#00000000',
      'ignored.border': hex(
        colors, 'tab.border', hex(colors, 'sideBar.border')
      ),
      info: hex(
        colors, 'editorInfo.foreground', hex(colors, 'textLink.foreground')
      ),
      'info.background': hex(colors, 'editor.lineHighlightBackground'),
      'info.border': hex(
        colors, 'editorInfo.foreground', hex(colors, 'textLink.foreground')
      ),
      'link_text.hover': hex(
        colors, 'textLink.activeForeground', hex(colors, 'textLink.foreground')
      ),
      modified: hex(
        colors, 'textLink.foreground', hex(colors, 'editorInfo.foreground')
      ),
      'modified.background': hex(
        colors, 'selection.background', hex(colors, 'editor.symbolHighlightBackground')
      ),
      'modified.border': hex(
        colors, 'textLink.foreground', hex(colors, 'editorInfo.foreground')
      ),
      'pane.focused_border': hex(
        colors, 'tab.activeBorder', hex(colors, 'focusBorder')
      ),
      'pane_group.border': hex(
        colors, 'editorGroup.border', hex(colors, 'panel.border')
      ),
      'panel.background': hex(
        colors, 'panel.background', hex(colors, 'sideBar.background')
      ),
      'panel.focused_border': hex(
        colors, 'tab.activeBorder', hex(colors, 'focusBorder')
      ),
      'panel.indent_guide': hex(
        colors, 'tree.indentGuidesStroke', hex(colors, 'editorIndentGuide.background1')
      ),
      'panel.indent_guide_active': hex(
        colors, 'tree.indentGuidesStroke', hex(colors, 'editorIndentGuide.activeBackground1')
      ),
      'panel.indent_guide_hover': hex(
        colors, 'list.hoverBackground', hex(colors, 'tree.indentGuidesStroke')
      ),
      players: [],
      predictive: hex(
        colors, 'textLink.foreground', hex(colors, 'editorInfo.foreground')
      ),
      'predictive.background': hex(
        colors, 'editor.inlineValuesBackground', hex(colors, 'editorGhostText.foreground')
      ),
      'predictive.border': hex(
        colors, 'textLink.foreground', hex(colors, 'editorInfo.foreground')
      ),
      renamed: hex(colors, 'textLink.foreground'),
      'renamed.background': hex(colors, 'selection.background'),
      'renamed.border': hex(colors, 'tab.activeBorder'),
      'scrollbar.thumb.background': hex(
        colors, 'scrollbarSlider.background', hex(colors, 'editor.lineHighlightBackground')
      ),
      'scrollbar.thumb.border': hex(
        colors, 'scrollbarSlider.hoverBackground', hex(colors, 'panel.border')
      ),
      'scrollbar.thumb.hover_background': hex(
        colors, 'scrollbarSlider.hoverBackground', hex(colors, 'list.hoverBackground')
      ),
      'scrollbar.track.background': '#00000000',
      'scrollbar.track.border': '#00000000',
      'search.match_background': hex(
        colors, 'terminal.findMatchBackground', hex(colors, 'editorOverviewRuler.findMatchForeground')
      ),
      'status_bar.background': dark ?
        hex(colors, 'statusBar.background') :
        hex(
          colors, 'titleBar.activeBackground', hex(colors, 'sideBarSectionHeader.background')
        ),
      success: hex(colors, 'terminal.ansiGreen', '#28a745'),
      'success.background': hex(
        colors, 'diffEditor.insertedLineBackground', hex(colors, 'terminal.ansiGreen')
      ),
      'success.border': hex(
        colors, 'editorGutter.addedBackground', hex(colors, 'terminal.ansiGreen', '#28a745')
      ),
      'surface.background': hex(
        colors, 'sideBar.background', hex(colors, 'panel.background')
      ),
      syntax: {
        attribute: syntaxStyle(syntaxColors.property),
        boolean: syntaxStyle(syntaxColors.boolean, { font_style: 'italic' }),
        comment: syntaxStyle(syntaxColors.comment, {
          font_style: getSemanticFlag(semantic, 'comment', 'italic') ?
            'italic' :
            null
        }),
        comment_doc: syntaxStyle(syntaxColors.comment, {
          font_style: 'italic'
        }),
        constant: syntaxStyle(syntaxColors.enumMember),
        constructor: syntaxStyle(syntaxColors.type),
        embedded: syntaxStyle(hex(colors, 'editor.foreground')),
        emphasis: syntaxStyle(null, { font_style: 'italic' }),
        enum: syntaxStyle(syntaxColors.enum),
        function: syntaxStyle(syntaxColors.function),
        'function.method': syntaxStyle(syntaxColors.method),
        'function.special': syntaxStyle(syntaxColors.decorator),
        hint: syntaxStyle(hex(colors, 'editorHint.foreground')),
        keyword: syntaxStyle(syntaxColors.keyword, {
          font_style: getSemanticFlag(semantic, 'keyword', 'italic') ?
            'italic' :
            null
        }),
        label: syntaxStyle(syntaxColors.variable),
        link_text: syntaxStyle(hex(colors, 'textLink.foreground')),
        link_uri: syntaxStyle(
          hex(
            colors, 'textLink.activeForeground', hex(colors, 'textLink.foreground')
          )
        ),
        number: syntaxStyle(syntaxColors.number),
        operator: syntaxStyle(syntaxColors.operator),
        predictive: syntaxStyle(
          hex(
            colors, 'textLink.foreground', hex(colors, 'editorInfo.foreground')
          )
        ),
        preproc: syntaxStyle(syntaxColors.macro),
        primary: syntaxStyle(hex(colors, 'editor.foreground')),
        property: syntaxStyle(syntaxColors.property),
        punctuation: syntaxStyle(
          hex(
            colors, 'editorLineNumber.foreground', hex(colors, 'descriptionForeground')
          )
        ),
        punctuation_bracket: syntaxStyle(
          hex(
            colors, 'editorBracketHighlight.foreground1', syntaxColors.operator
          )
        ),
        punctuation_delimiter: syntaxStyle(syntaxColors.operator),
        punctuation_list_marker: syntaxStyle(
          hex(
            colors, 'editorLineNumber.foreground', hex(colors, 'descriptionForeground')
          )
        ),
        string: syntaxStyle(syntaxColors.string),
        'string.escape': syntaxStyle(syntaxColors.number),
        'string.regex': syntaxStyle(syntaxColors.regexp),
        tag: syntaxStyle(syntaxColors.keyword),
        text_literal: syntaxStyle(syntaxColors.string),
        title: syntaxStyle(syntaxColors.variable),
        type: syntaxStyle(syntaxColors.type),
        variable: syntaxStyle(syntaxColors.variable),
        variant: syntaxStyle(syntaxColors.typeParameter)
      },
      'tab.active_background': hex(colors, 'tab.activeBackground'),
      'tab.inactive_background': hex(colors, 'tab.inactiveBackground'),
      'tab_bar.background': hex(
        colors, 'titleBar.activeBackground', hex(colors, 'activityBar.background')
      ),
      'terminal.ansi.background': hex(colors, 'terminal.background'),
      'terminal.ansi.black': hex(colors, 'terminal.ansiBlack'),
      'terminal.ansi.blue': hex(colors, 'terminal.ansiBlue'),
      'terminal.ansi.bright_black': hex(colors, 'terminal.ansiBrightBlack'),
      'terminal.ansi.bright_blue': hex(colors, 'terminal.ansiBrightBlue'),
      'terminal.ansi.bright_cyan': hex(colors, 'terminal.ansiBrightCyan'),
      'terminal.ansi.bright_green': hex(colors, 'terminal.ansiBrightGreen'),
      'terminal.ansi.bright_magenta': hex(colors, 'terminal.ansiBrightMagenta'),
      'terminal.ansi.bright_red': hex(colors, 'terminal.ansiBrightRed'),
      'terminal.ansi.bright_white': hex(colors, 'terminal.ansiBrightWhite'),
      'terminal.ansi.bright_yellow': hex(colors, 'terminal.ansiBrightYellow'),
      'terminal.ansi.cyan': hex(colors, 'terminal.ansiCyan'),
      'terminal.ansi.dim_black': hex(colors, 'terminal.ansiBlack'),
      'terminal.ansi.dim_blue': hex(colors, 'terminal.ansiBlue'),
      'terminal.ansi.dim_cyan': hex(colors, 'terminal.ansiCyan'),
      'terminal.ansi.dim_green': hex(colors, 'terminal.ansiGreen'),
      'terminal.ansi.dim_magenta': hex(colors, 'terminal.ansiMagenta'),
      'terminal.ansi.dim_red': hex(colors, 'terminal.ansiRed'),
      'terminal.ansi.dim_white': hex(colors, 'terminal.ansiWhite'),
      'terminal.ansi.dim_yellow': hex(colors, 'terminal.ansiYellow'),
      'terminal.ansi.green': hex(colors, 'terminal.ansiGreen'),
      'terminal.ansi.magenta': hex(colors, 'terminal.ansiMagenta'),
      'terminal.ansi.red': hex(colors, 'terminal.ansiRed'),
      'terminal.ansi.white': hex(colors, 'terminal.ansiWhite'),
      'terminal.ansi.yellow': hex(colors, 'terminal.ansiYellow'),
      'terminal.background': hex(colors, 'terminal.background'),
      'terminal.bright_foreground': hex(
        colors, 'terminal.ansiBrightWhite', hex(colors, 'terminal.foreground')
      ),
      'terminal.dim_foreground': hex(
        colors, 'disabledForeground', hex(colors, 'terminal.foreground')
      ),
      'terminal.foreground': hex(colors, 'terminal.foreground'),
      text: hex(colors, 'foreground'),
      'text.accent': hex(colors, 'textLink.foreground'),
      'text.disabled': hex(colors, 'disabledForeground'),
      'text.muted': hex(colors, 'descriptionForeground'),
      'text.placeholder': hex(colors, 'disabledForeground'),
      'title_bar.background': hex(colors, 'titleBar.activeBackground'),
      'title_bar.inactive_background': hex(
        colors, 'titleBar.inactiveBackground', hex(colors, 'titleBar.activeBackground')
      ),
      'toolbar.background': hex(
        colors, 'sideBar.background', hex(colors, 'titleBar.activeBackground')
      ),
      unreachable: hex(colors, 'disabledForeground'),
      'unreachable.background': '#00000000',
      'unreachable.border': hex(
        colors, 'window.inactiveBorder', hex(colors, 'panel.border')
      ),
      warning: hex(
        colors, 'editorWarning.foreground', hex(colors, 'terminal.ansiYellow')
      ),
      'warning.background': hex(
        colors, 'terminal.findMatchBackground', hex(colors, 'editor.lineHighlightBackground')
      ),
      'warning.border': hex(
        colors, 'editorWarning.foreground', hex(colors, 'terminal.ansiYellow')
      )
    }
  }
}

const themeFamily = {
  $schema: 'https://zed.dev/schema/themes/v0.2.0.json',
  name: 'Santi020k Theme',
  author: 'Santiago Molina',
  themes: [buildTheme('dark'), buildTheme('light')]
}

writeFileSync(outputPath, `${JSON.stringify(themeFamily, null, 2)}\n`)

console.log(`✓ Generated ${outputPath}`)
