import { readFileSync, writeFileSync } from 'node:fs'

const themeFiles = [
  'themes/santi020k-dark-color-theme.json',
  'themes/santi020k-light-color-theme.json'
]

const categories = [
  { name: 'Base Colors', pattern: /^(foreground|descriptionForeground|disabledForeground|errorForeground|icon\.foreground|textLink\.|focusBorder|selection\.background|widget\.shadow|progressBar\.|badge\.)/ },
  { name: 'Window', pattern: /^window\./ },
  { name: 'Editor', pattern: /^editor\.(?!(group|suggest|hover|widget|stickyScroll|indent|gutter|bracket|overviewRuler|error|warning|info|hint|unnecessaryCode|fold|cursor|lineNumber|ruler|whitespace|findMatch|wordHighlight|rangeHighlight|selection))/ },
  { name: 'Editor Cursor & Line Numbers', pattern: /^editor(Cursor|LineNumber)\./ },
  { name: 'Editor Indent Guides & Whitespace', pattern: /^editor(IndentGuide|Whitespace|Ruler)\./ },
  { name: 'Editor Brackets', pattern: /^editorBracket/ },
  { name: 'Editor Gutter', pattern: /^editorGutter\./ },
  { name: 'Editor Widgets', pattern: /^editor(Widget|SuggestWidget|HoverWidget)\./ },
  { name: 'Editor Sticky Scroll', pattern: /^editorStickyScroll/ },
  { name: 'Editor Overview Ruler', pattern: /^editorOverviewRuler\./ },
  { name: 'Editor Diagnostics', pattern: /^editor(Error|Warning|Info|Hint|UnnecessaryCode|LightBulb)\./ },
  { name: 'Editor Selection & Find', pattern: /^editor(Selection|WordHighlight|FindMatch|RangeHighlight)/ },
  { name: 'Diff Editor', pattern: /^diffEditor/ },
  { name: 'Merge Editor', pattern: /^mergeEditor/ },
  { name: 'Activity Bar', pattern: /^activityBar/ },
  { name: 'Side Bar', pattern: /^sideBar/ },
  { name: 'List & Tree', pattern: /^(list|tree)\./ },
  { name: 'Editor Groups & Tabs', pattern: /^(editorGroup|tab)\./ },
  { name: 'Status Bar', pattern: /^statusBar/ },
  { name: 'Title Bar & Command Center', pattern: /^(titleBar|commandCenter|menubar|menu)\./ },
  { name: 'Panel', pattern: /^panel/ },
  { name: 'Terminal', pattern: /^terminal/ },
  { name: 'Input Controls', pattern: /^(input|dropdown|checkbox|button)\./ },
  { name: 'Scrollbar', pattern: /^scrollbar/ },
  { name: 'Quick Picker', pattern: /^(quickInput|pickerGroup)\./ },
  { name: 'Settings', pattern: /^settings\./ },
  { name: 'Keybinding Label', pattern: /^keybinding/ },
  { name: 'Notifications & Banner', pattern: /^(notification|notifications|banner)\./ },
  { name: 'Extensions', pattern: /^extension/ },
  { name: 'Debug', pattern: /^debug/ },
  { name: 'Testing', pattern: /^testing\./ },
  { name: 'Git & SCM', pattern: /^(gitDecoration|scm)\./ },
  { name: 'Notebook', pattern: /^notebook/ },
  { name: 'Peek View', pattern: /^peekView/ },
  { name: 'Breadcrumbs', pattern: /^breadcrumb/ },
  { name: 'Symbol Icons', pattern: /^symbolIcon\./ },
  { name: 'Minimap', pattern: /^minimap/ },
  { name: 'Chart Colors', pattern: /^charts\./ },
  { name: 'Welcome Page', pattern: /^(welcomePage|walkThrough)\./ },
  { name: 'Other', pattern: /.*/ }
]

const formatTheme = file => {
  const raw = readFileSync(file, 'utf8')
  // Strip comments before parsing
  const cleanRaw = raw.replace(/^\s*\/\/.*$/gm, '')
  const content = JSON.parse(cleanRaw)
  // 1. Sort Colors by Category and then Alphabetically
  const colors = content.colors
  const sortedColors = {}
  const usedKeys = new Set()

  for (const category of categories) {
    const categoryKeys = Object.keys(colors)
      .filter(key => !usedKeys.has(key) && category.pattern.test(key))
      .sort()

    for (const key of categoryKeys) {
      sortedColors[key] = colors[key]

      usedKeys.add(key)
    }
  }

  content.colors = sortedColors

  // 2. Sort Semantic Token Colors
  if (content.semanticTokenColors) {
    const semanticTokenColors = content.semanticTokenColors
    const sortedSemantic = {}

    for (const key of Object.keys(semanticTokenColors).sort()) {
      sortedSemantic[key] = semanticTokenColors[key]
    }

    content.semanticTokenColors = sortedSemantic
  }

  // 3. Output with 2 spaces
  let output = JSON.stringify(content, null, 2)
  // 4. Re-process the colors block to add comments
  const colorsHeader = '"colors": {'
  const colorsStart = output.indexOf(colorsHeader)

  if (colorsStart !== -1) {
    const colorsEnd = output.indexOf('}', colorsStart)
    const colorsBlock = output.substring(colorsStart + colorsHeader.length, colorsEnd)
    let newColorsBlock = '\n'
    const usedKeysInBlock = new Set()

    for (const category of categories) {
      const categoryKeys = Object.keys(colors)
        .filter(key => !usedKeysInBlock.has(key) && category.pattern.test(key))
        .sort()

      if (categoryKeys.length > 0) {
        newColorsBlock += `    // ${category.name}\n`

        for (const key of categoryKeys) {
          // Find the exact line in the stringified JSON
          const serializedKey = JSON.stringify(key)

          const lineMatch = colorsBlock
            .split('\n')
            .find(line => line.trimStart().startsWith(`${serializedKey}:`))

          if (lineMatch) {
            newColorsBlock += `    ${lineMatch.trim().replace(/,$/, '')},\n`
          }

          usedKeysInBlock.add(key)
        }
      }
    }

    // Remove last comma and fix closing brace indentation
    newColorsBlock = newColorsBlock.trimEnd().replace(/,$/, '') + '\n  '

    output = output.substring(0, colorsStart + colorsHeader.length) + newColorsBlock + output.substring(colorsEnd)
  }

  writeFileSync(file, output + '\n')

  console.log(`Formatted ${file}`)
}

for (const file of themeFiles) {
  formatTheme(file)
}
