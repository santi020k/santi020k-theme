import { parse } from 'smol-toml'
import { describe, expect, it } from 'vitest'

/* eslint-disable security/detect-object-injection -- Tests intentionally index parsed renderer output by canonical token names. */
import { palettes } from '../palettes.mjs'
import { promptVariants, runtimeModules } from '../prompt-presets.mjs'
import {
  renderAlacritty,
  renderGhostty,
  renderIterm,
  renderKitty,
  renderStarship,
  renderWezterm,
  renderWindowsTerminal,
} from '../scripts/build.mjs'

const ansiNames = [
  'black', 'red', 'green', 'yellow', 'blue', 'purple', 'cyan', 'white',
  'brightBlack', 'brightRed', 'brightGreen', 'brightYellow', 'brightBlue',
  'brightPurple', 'brightCyan', 'brightWhite',
]

describe.each(Object.values(palettes))('$name terminal renderers', palette => {
  it('maps all ANSI colors to Windows Terminal positions', () => {
    const rendered = JSON.parse(renderWindowsTerminal(palette))

    expect(rendered).toMatchObject({
      name: palette.name,
      background: palette.background,
      foreground: palette.foreground,
      cursorColor: palette.cursor,
      selectionBackground: palette.selection,
    })

    expect(ansiNames.map(name => rendered[name])).toEqual(palette.ansi)
  })

  it('produces parseable Alacritty output with canonical colors', () => {
    const rendered = parse(renderAlacritty(palette))

    expect(rendered.colors.primary).toEqual({
      background: palette.background,
      foreground: palette.foreground,
    })

    expect(Object.values(rendered.colors.normal)).toEqual(palette.ansi.slice(0, 8))

    expect(Object.values(rendered.colors.bright)).toEqual(palette.ansi.slice(8))
  })

  it('produces a complete iTerm2 property list', () => {
    const output = renderIterm(palette)

    expect(output).toContain('<plist version="1.0">')

    expect(output.match(/<key>Ansi \d+ Color<\/key>/gu)).toHaveLength(16)

    expect(output.match(/<key>Color Space<\/key>/gu)).toHaveLength(25)
  })

  it('includes every canonical color in the hex-based formats', () => {
    const outputs = [
      renderGhostty(palette),
      renderKitty(palette),
      renderWezterm(palette),
    ]

    for (const output of outputs) {
      for (const color of [palette.background, palette.foreground, ...palette.ansi]) {
        expect(output).toContain(color)
      }
    }
  })

  it.each(Object.keys(promptVariants))('renders a valid %s Starship preset', variantKey => {
    const config = parse(renderStarship(palette, variantKey))
    const variant = promptVariants[variantKey]

    expect(config.palette).toBe('santi020k')

    expect(config.palettes.santi020k).toBeDefined()

    expect(config.os.symbols.Macos).toBe(variant.symbols.macos)

    expect(config.git_branch.symbol).toBe(variant.symbols.git)

    for (const module of runtimeModules) {
      expect(config[module].disabled).toBe(!variant.runtimes)
    }
  })
})
