// cspell:ignore Exectuable

// Validate the serialized native artifact, including highlighted text. Xcode
// retains syntax colors on selection and current-line backgrounds.
const colorEntries = contents => [...contents.matchAll(/<key>([^<]+)<\/key>\s*<string>([^<]*)<\/string>/g)]

const readColor = (entries, key) => {
  const entry = entries.find(match => match[1] === key)

  if (!entry) throw new Error(`Xcode theme is missing ${key}.`)

  const channels = entry[2].trim().split(/\s+/).map(Number)
  const invalidChannels = channels.some(value => !Number.isFinite(value) || value < 0 || value > 1)

  if (channels.length !== 4 || invalidChannels || channels[3] !== 1) {
    throw new Error(`Xcode ${key} must be an opaque RGB color with channels between 0 and 1.`)
  }

  return channels.slice(0, 3)
}

const luminance = channels => channels
  .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
  .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0)

const assertContrast = (entries, foreground, background, minimum) => {
  const values = [
    luminance(readColor(entries, foreground)),
    luminance(readColor(entries, background))
  ].sort((a, b) => b - a)

  const ratio = (values[0] + 0.05) / (values[1] + 0.05)

  if (ratio < minimum) {
    throw new Error(`Xcode ${foreground} on ${background} contrast is ${ratio.toFixed(2)}; expected ${minimum}.`)
  }
}

const assertSyntaxDictionaries = contents => {
  for (const key of ['DVTSourceTextSyntaxColors', 'DVTSourceTextSyntaxFonts']) {
    if (!contents.includes(`<key>${key}</key>`)) throw new Error(`Xcode theme is missing ${key}.`)
  }
}

export const validateXcodeTheme = contents => {
  assertSyntaxDictionaries(contents)

  const entries = colorEntries(contents)
  const editorBackgrounds = ['DVTSourceTextBackground', 'DVTSourceTextCurrentLineHighlightColor', 'DVTSourceTextSelectionColor']
  const syntaxDictionary = contents.match(/<key>DVTSourceTextSyntaxColors<\/key>\s*<dict>([\s\S]*?)<\/dict>/)?.[1]
  const syntaxKeys = colorEntries(syntaxDictionary ?? '').map(match => match[1])

  for (const key of ['xcode.syntax.plain', 'xcode.syntax.keyword', 'xcode.syntax.string', 'xcode.syntax.comment']) {
    readColor(entries, key)
  }

  for (const key of syntaxKeys) {
    const minimum = key.startsWith('xcode.syntax.comment') ? 3 : 4.5

    for (const background of editorBackgrounds) assertContrast(entries, key, background, minimum)
  }

  for (const foreground of ['DVTConsoleDebuggerInputTextColor', 'DVTConsoleDebuggerOutputTextColor', 'DVTConsoleDebuggerPromptTextColor', 'DVTConsoleExectuableInputTextColor', 'DVTConsoleExectuableOutputTextColor']) {
    for (const background of ['DVTConsoleTextBackgroundColor', 'DVTConsoleTextSelectionColor']) {
      assertContrast(entries, foreground, background, 4.5)
    }
  }

  assertContrast(entries, 'DVTSourceTextInsertionPointColor', 'DVTSourceTextBackground', 3)
}
