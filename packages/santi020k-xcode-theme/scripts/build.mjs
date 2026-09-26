import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { xcodeThemes } from '../palettes.mjs'

// cspell:ignore Exectuable Invisibles xccolortheme

const outputDirectory = resolve(import.meta.dirname, '..', 'themes')

const syntaxKeys = {
  'xcode.syntax.attribute': 'attribute',
  'xcode.syntax.character': 'string',
  'xcode.syntax.comment': 'comment',
  'xcode.syntax.comment.doc': 'docComment',
  'xcode.syntax.comment.doc.keyword': 'docKeyword',
  'xcode.syntax.declaration.other': 'function',
  'xcode.syntax.declaration.type': 'type',
  'xcode.syntax.identifier.class': 'type',
  'xcode.syntax.identifier.class.system': 'systemType',
  'xcode.syntax.identifier.constant': 'number',
  'xcode.syntax.identifier.constant.system': 'systemVariable',
  'xcode.syntax.identifier.function': 'function',
  'xcode.syntax.identifier.function.system': 'systemFunction',
  'xcode.syntax.identifier.macro': 'preprocessor',
  'xcode.syntax.identifier.macro.system': 'preprocessor',
  'xcode.syntax.identifier.type': 'type',
  'xcode.syntax.identifier.type.system': 'systemType',
  'xcode.syntax.identifier.variable': 'variable',
  'xcode.syntax.identifier.variable.system': 'systemVariable',
  'xcode.syntax.keyword': 'keyword',
  'xcode.syntax.mark': 'docKeyword',
  'xcode.syntax.markup.aside.kind': 'warning',
  'xcode.syntax.markup.code': 'systemFunction',
  'xcode.syntax.number': 'number',
  'xcode.syntax.plain': 'foreground',
  'xcode.syntax.preprocessor': 'preprocessor',
  'xcode.syntax.string': 'string',
  'xcode.syntax.url': 'url'
}

const escapeXml = value => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')

const xcodeColor = hex => {
  const values = hex.match(/[\dA-F]{2}/gi).map(value => Number.parseInt(value, 16) / 255)

  return `${values.map(value => Number(value.toFixed(6))).join(' ')} 1`
}

const stringEntry = (key, value, indent = '  ') => `${indent}<key>${escapeXml(key)}</key>\n${indent}<string>${escapeXml(value)}</string>`

const makeTheme = theme => {
  const { colors } = theme

  const syntaxColors = Object.entries(syntaxKeys)
    .map(([key, role]) => stringEntry(key, xcodeColor(colors[role]), '    '))
    .join('\n')

  const syntaxFonts = Object.keys(syntaxKeys)
    .map(key => stringEntry(key, key.includes('keyword') ? 'SFMono-Bold - 12.0' : 'SFMono-Regular - 12.0', '    '))
    .join('\n')

  const pairs = [
    ['DVTConsoleDebuggerInputTextColor', xcodeColor(colors.foreground)],
    ['DVTConsoleDebuggerInputTextFont', 'SFMono-Regular - 12.0'],
    ['DVTConsoleDebuggerOutputTextColor', xcodeColor(colors.foreground)],
    ['DVTConsoleDebuggerOutputTextFont', 'SFMono-Regular - 12.0'],
    ['DVTConsoleDebuggerPromptTextColor', xcodeColor(colors.success)],
    ['DVTConsoleDebuggerPromptTextFont', 'SFMono-Regular - 12.0'],
    ['DVTConsoleExectuableInputTextColor', xcodeColor(colors.foreground)],
    ['DVTConsoleExectuableInputTextFont', 'SFMono-Regular - 12.0'],
    ['DVTConsoleExectuableOutputTextColor', xcodeColor(colors.foreground)],
    ['DVTConsoleExectuableOutputTextFont', 'SFMono-Regular - 12.0'],
    ['DVTConsoleTextBackgroundColor', xcodeColor(colors.background)],
    ['DVTConsoleTextSelectionColor', xcodeColor(colors.selection)],
    ['DVTMarkupTextBackgroundColor', xcodeColor(colors.currentLine)],
    ['DVTMarkupTextBorderColor', xcodeColor(colors.whitespace)],
    ['DVTMarkupTextInlineCodeColor', xcodeColor(colors.foreground)],
    ['DVTMarkupTextLinkColor', xcodeColor(colors.url)],
    ['DVTMarkupTextNormalColor', xcodeColor(colors.foreground)],
    ['DVTScrollbarMarkerErrorColor', xcodeColor(colors.error)],
    ['DVTScrollbarMarkerRuntimeIssueColor', xcodeColor(colors.error)],
    ['DVTScrollbarMarkerWarningColor', xcodeColor(colors.warning)],
    ['DVTSourceTextBackground', xcodeColor(colors.background)],
    ['DVTSourceTextCurrentLineHighlightColor', xcodeColor(colors.currentLine)],
    ['DVTSourceTextInsertionPointColor', xcodeColor(colors.caret)],
    ['DVTSourceTextInvisiblesColor', xcodeColor(colors.whitespace)],
    ['DVTSourceTextSelectionColor', xcodeColor(colors.selection)]
  ]

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${pairs.map(([key, value]) => stringEntry(key, value)).join('\n')}
  <key>DVTFontAndColorVersion</key>
  <integer>1</integer>
  <key>DVTLineSpacing</key>
  <real>1.1</real>
  <key>DVTSourceTextSyntaxColors</key>
  <dict>
${syntaxColors}
  </dict>
  <key>DVTSourceTextSyntaxFonts</key>
  <dict>
${syntaxFonts}
  </dict>
</dict>
</plist>
`
}

mkdirSync(outputDirectory, { recursive: true })

for (const theme of xcodeThemes) {
  writeFileSync(resolve(outputDirectory, `${theme.name}.xccolortheme`), makeTheme(theme))
}

console.log('✓ Xcode themes generated.')
