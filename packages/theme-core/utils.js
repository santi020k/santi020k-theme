const getModeValue = (token, mode) => mode === 'light' ? token.light : token.dark
const getContrastValue = (token, mode) => mode === 'light' ? token.lightContrast : token.darkContrast

export const generateCSSProperties = (tokens, mode) => tokens
  .map(token => {
    const value = getModeValue(token, mode)

    return `  --${token.name}: ${value};`
  })
  .join('\n')

export const generateHighContrastProperties = (tokens, mode) => tokens
  .filter(token => Boolean(getContrastValue(token, mode)))
  .map(token => {
    const value = getContrastValue(token, mode)

    return `  --${token.name}: ${value};`
  })
  .join('\n')

export const generateTokensCSS = config => {
  const { colors, darkMode, darkModeVariant } = config
  const lightProps = generateCSSProperties(colors, 'light')
  const darkProps = generateCSSProperties(colors, 'dark')
  const lightContrastProps = generateHighContrastProperties(colors, 'light')
  const darkContrastProps = generateHighContrastProperties(colors, 'dark')
  const usesMediaDarkMode = darkMode === 'media-query'
  let darkSelector = '@media (prefers-color-scheme: dark) { :root'

  if (darkMode === 'data-theme') {
    darkSelector = ':root[data-theme="dark"]'
  }

  if (darkMode === 'class') {
    darkSelector = ':root.dark'
  }

  const darkSelectorClose = usesMediaDarkMode ? ' }' : ''
  let css = '/* Auto-generated from @santi020k/theme-core. */\n\n'

  if (darkMode === 'data-theme' && darkModeVariant) {
    css += `@custom-variant dark (${darkModeVariant});\n\n`
  }

  css += `:root,\n:root[data-theme="light"] {\n  color-scheme: light;\n${lightProps}\n}\n\n`

  css += `${darkSelector} {\n  color-scheme: dark;\n${darkProps}\n}${darkSelectorClose}\n`

  if (lightContrastProps || darkContrastProps) {
    css += '\n@media (prefers-contrast: more) {\n'

    if (lightContrastProps) {
      css += `  :root,\n  :root[data-theme="light"] {\n${lightContrastProps.replaceAll(/^/gm, '  ')}\n  }\n`
    }

    if (darkContrastProps) {
      css += `\n  ${darkSelector} {\n${darkContrastProps.replaceAll(/^/gm, '  ')}\n  }\n`
    }

    css += '}\n'
  }

  return css
}

export const generateTailwindTheme = config => {
  const { colors, typography } = config

  const fontLines = [
    `  --font-sans: ${typography.body};`,
    `  --font-display: ${typography.display};`,
    `  --font-mono: ${typography.mono};`
  ].join('\n')

  const colorLines = colors
    .map(token => `  --color-${token.name}: hsl(var(--${token.name}));`)
    .join('\n')

  return `@theme {\n${fontLines}\n\n${colorLines}\n}\n`
}

export const getAssetByPath = (manifest, path) => manifest.assets.find(asset => asset.path === path)

export const getAssetsByCategory = (manifest, category) => manifest.assets.filter(asset => asset.category === category)

export const getAssetsBySurface = (manifest, surface) => manifest.assets.filter(asset => asset.surface === surface)
