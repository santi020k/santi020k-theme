const hexColorPattern = /^#(?:[\da-f]{6}|[\da-f]{8})$/i

const validateStyleColors = entry => {
  for (const [key, value] of Object.entries(entry.style)) {
    if (['background.appearance', 'accents', 'players', 'syntax'].includes(key)) continue

    if (value !== null && (typeof value !== 'string' || !hexColorPattern.test(value))) {
      throw new Error(`Invalid Zed color for ${entry.name}: ${key}`)
    }
  }
}

const validateSyntax = entry => {
  for (const key of ['comment', 'function', 'keyword', 'string', 'type', 'variable']) {
    if (!(key in entry.style.syntax)) throw new Error(`Missing required syntax key for ${entry.name}: ${key}`)
  }

  for (const [key, style] of Object.entries(entry.style.syntax)) {
    for (const color of [style.color, style.background_color]) {
      if (color !== null && color !== undefined && !hexColorPattern.test(color)) {
        throw new Error(`Invalid Zed syntax color for ${entry.name}: ${key}`)
      }
    }
  }
}

export const validateZedTheme = entry => {
  if (!entry.name || !['dark', 'light'].includes(entry.appearance) || !entry.style) {
    throw new Error('Each Zed theme must include a name, dark/light appearance, and style.')
  }

  const requiredStyleKeys = [
    'background',
    'border',
    'editor.background',
    'editor.foreground',
    'surface.background',
    'tab.active_background',
    'tab.inactive_background',
    'terminal.background',
    'terminal.foreground',
    'text',
    'title_bar.background',
    'syntax'
  ]

  for (const key of requiredStyleKeys) {
    if (!(key in entry.style)) throw new Error(`Missing required style key for ${entry.name}: ${key}`)
  }

  // Supported selected-element color is element.selected in the official schema:
  // https://zed.dev/schema/themes/v0.2.0.json
  if ('element_selection_background' in entry.style) {
    throw new Error('Unsupported Zed token element_selection_background; use element.selected.')
  }

  validateStyleColors(entry)

  validateSyntax(entry)
}
