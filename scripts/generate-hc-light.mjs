import { readFileSync, writeFileSync } from 'node:fs'

const darkenColor = function (hex) {
  if (!hex || !hex.startsWith('#')) return hex

  let r = parseInt(hex.slice(1, 3), 16)
  let g = parseInt(hex.slice(3, 5), 16)
  let b = parseInt(hex.slice(5, 7), 16)
  let a = hex.length === 9 ? hex.slice(7, 9) : ''

  // Make colors darker for high contrast light
  r = Math.max(0, Math.floor(r * 0.7))

  g = Math.max(0, Math.floor(g * 0.7))

  b = Math.max(0, Math.floor(b * 0.7))

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}${a}`
}

const themePath = 'themes/santi020k-light-color-theme.json'
const outputPath = 'themes/santi020k-hc-light-color-theme.json'
const raw = readFileSync(themePath, 'utf8')
const theme = JSON.parse(raw.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, ''))

theme.name = 'santi020k hc light'

theme.type = 'hc-light'

// We'll just leave the colors as they are for now, but apply hc-light type
// VS Code will automatically enforce high contrast borders.
// For now, let's just darken some of the foregrounds for extra contrast if needed,
// but the regular light theme is already accessible. We will darken token colors.
if (theme.tokenColors) {
  theme.tokenColors.forEach(token => {
    if (token.settings && token.settings.foreground) {
      token.settings.foreground = darkenColor(token.settings.foreground)
    }
  })
}

if (theme.semanticTokenColors) {
  for (let key in theme.semanticTokenColors) {
    let val = theme.semanticTokenColors[key]

    if (typeof val === 'string') {
      theme.semanticTokenColors[key] = darkenColor(val)
    } else if (val.foreground) {
      val.foreground = darkenColor(val.foreground)
    }
  }
}

// HC-Light specific overrides: stronger focus affordances and accessibility corrections
const hcOverrides = {
  // Stronger focus borders — HC variants need more visible focus rings
  focusBorder: '#6319bec0',
  'list.focusOutline': '#6319bec0',
  'statusBarItem.focusBorder': '#6319bec0',
  'menu.selectionBorder': '#6319bec0',
  'menubar.selectionBorder': '#6319bec0',
  // Stronger peekView border for HC
  'peekView.border': '#6319be',
  'peekViewTitle.background': '#d8d0f0',
  // Breadcrumb inactive foreground — should NOT be accent in HC either
  'breadcrumb.foreground': '#302e36',
  // Explicit HC border token
  'widget.border': '#6319be60'
}

for (const [key, val] of Object.entries(hcOverrides)) {
  theme.colors[key] = val
}

// In HC-light, punctuation should be visually distinct from comments.
// The generator darkens all token colors uniformly, so we nudge punctuation
// to a warmer, slightly less purple tone to separate it from italic comments.
if (theme.tokenColors) {
  theme.tokenColors.forEach(token => {
    if (token.name === 'Punctuation' && token.settings?.foreground) {
      // Shift punctuation toward a warmer grey-purple rather than the comment's cool purple
      token.settings.foreground = '#5c4a7a'
    }
  })
}

writeFileSync(outputPath, JSON.stringify(theme, null, 2))

console.log('HC Light theme generated at:', outputPath)
