import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

// cspell:ignore plutil xccolortheme

const root = resolve(import.meta.dirname, '..', 'themes')
const hexToRgb = color => color.match(/[\dA-F]{2}/gi).map(value => Number.parseInt(value, 16) / 255)

const luminance = color => hexToRgb(color)
  .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
  .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0)

const contrast = (foreground, background) => {
  const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a)

  return (values[0] + 0.05) / (values[1] + 0.05)
}

const expected = {
  Dark: { background: '#0D0A15', foreground: '#DFDDE3' },
  Light: { background: '#F8F6FD', foreground: '#302E36' }
}

for (const [appearance, colors] of Object.entries(expected)) {
  const file = resolve(root, `Santi020k ${appearance}.xccolortheme`)
  const contents = readFileSync(file, 'utf8')

  for (const key of ['DVTSourceTextBackground', 'DVTSourceTextSelectionColor', 'DVTSourceTextSyntaxColors', 'DVTSourceTextSyntaxFonts', 'xcode.syntax.keyword', 'xcode.syntax.string', 'xcode.syntax.comment']) {
    if (!contents.includes(key)) throw new Error(`Xcode ${appearance} theme is missing ${key}.`)
  }

  if (contrast(colors.foreground, colors.background) < 4.5) {
    throw new Error(`Xcode ${appearance} editor text must meet 4.5:1 contrast.`)
  }

  if (process.platform === 'darwin') {
    const result = spawnSync('plutil', ['-lint', file], { encoding: 'utf8' })

    if (result.status !== 0) throw new Error(result.stderr || result.stdout)
  }
}

console.log('✓ Xcode dark and light themes validated.')
