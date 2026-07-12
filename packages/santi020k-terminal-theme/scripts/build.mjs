import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

import { palettes } from '../palettes.mjs'
import { promptVariants, runtimeModules, starshipFilename } from '../prompt-presets.mjs'

const root = resolve(import.meta.dirname, '..')
const componentNames = ['Red', 'Green', 'Blue']

const colorKeys = [
  ['Background Color', 'background'], ['Foreground Color', 'foreground'], ['Bold Color', 'bold'],
  ['Cursor Color', 'cursor'], ['Cursor Text Color', 'cursorText'], ['Selection Color', 'selection'],
  ['Selected Text Color', 'selectedText'], ['Link Color', 'link'], ['Badge Color', 'badge'],
]

const colorDict = hex => {
  const values = hex.slice(1).match(/.{2}/gu).map(value => Number.parseInt(value, 16) / 255)
  // eslint-disable-next-line security/detect-object-injection
  const components = values.map((value, index) => `\n\t\t<key>${componentNames[index]} Component</key>\n\t\t<real>${value.toFixed(6)}</real>`).join('')

  return `<dict>${components}\n\t\t<key>Color Space</key>\n\t\t<string>sRGB</string>\n\t</dict>`
}

export const renderIterm = palette => {
  // Palette keys come from the fixed colorKeys table above.
  // eslint-disable-next-line security/detect-object-injection
  const entries = colorKeys.map(([label, key]) => `\t<key>${label}</key>\n\t${colorDict(palette[key])}`)

  for (const [index, color] of palette.ansi.entries()) entries.push(`\t<key>Ansi ${index} Color</key>\n\t${colorDict(color)}`)

  return `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">\n<dict>\n${entries.join('\n')}\n</dict>\n</plist>\n`
}

export const renderGhostty = palette => `# ${palette.name}\nbackground = ${palette.background}\nforeground = ${palette.foreground}\ncursor-color = ${palette.cursor}\ncursor-text = ${palette.cursorText}\nselection-background = ${palette.selection}\nselection-foreground = ${palette.selectedText}\n${palette.ansi.map((color, index) => `palette = ${index}=${color}`).join('\n')}\n`

export const renderKitty = palette => `# ${palette.name}\nbackground ${palette.background}\nforeground ${palette.foreground}\ncursor ${palette.cursor}\ncursor_text_color ${palette.cursorText}\nselection_background ${palette.selection}\nselection_foreground ${palette.selectedText}\nurl_color ${palette.link}\n${palette.ansi.map((color, index) => `color${index} ${color}`).join('\n')}\n`

export const renderWezterm = palette => `return {\n  foreground = '${palette.foreground}',\n  background = '${palette.background}',\n  cursor_bg = '${palette.cursor}',\n  cursor_fg = '${palette.cursorText}',\n  cursor_border = '${palette.cursor}',\n  selection_fg = '${palette.selectedText}',\n  selection_bg = '${palette.selection}',\n  ansi = { ${palette.ansi.slice(0, 8).map(color => `'${color}'`).join(', ')} },\n  brights = { ${palette.ansi.slice(8).map(color => `'${color}'`).join(', ')} },\n}\n`

export const renderWindowsTerminal = palette => `${JSON.stringify({
  name: palette.name,
  background: palette.background,
  foreground: palette.foreground,
  cursorColor: palette.cursor,
  selectionBackground: palette.selection,
  black: palette.ansi[0], red: palette.ansi[1], green: palette.ansi[2], yellow: palette.ansi[3], blue: palette.ansi[4], purple: palette.ansi[5], cyan: palette.ansi[6], white: palette.ansi[7],
  brightBlack: palette.ansi[8], brightRed: palette.ansi[9], brightGreen: palette.ansi[10], brightYellow: palette.ansi[11], brightBlue: palette.ansi[12], brightPurple: palette.ansi[13], brightCyan: palette.ansi[14], brightWhite: palette.ansi[15],
}, null, 2)}\n`

export const renderAlacritty = palette => `[colors.primary]\nbackground = '${palette.background}'\nforeground = '${palette.foreground}'\n\n[colors.cursor]\ncursor = '${palette.cursor}'\ntext = '${palette.cursorText}'\n\n[colors.selection]\nbackground = '${palette.selection}'\ntext = '${palette.selectedText}'\n\n[colors.normal]\n${['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'].map((name, index) => `${name} = '${palette.ansi[index]}'`).join('\n')}\n\n[colors.bright]\n${['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'].map((name, index) => `${name} = '${palette.ansi[index + 8]}'`).join('\n')}\n`

export const renderStarship = (palette, variantKey = 'rich') => {
  const dark = palette.slug === 'dark'
  const variant = promptVariants[variantKey]
  const pad = variant.padding
  const runtimeFormat = variant.runtimes ? runtimeModules.map(module => `$${module}\\`).join('\n') : ''

  const substitutions = Object.entries(variant.substitutions)
    .map(([name, symbol]) => `"${name}" = "${symbol}"`)
    .join('\n')

  const colors = dark
    ? { os: '#602cba', directory: '#752df0', git: '#945df4', runtime: '#89b8c8', time: '#302545', lightText: '#ffffff', darkText: '#17141d', error: '#ea6962' }
    : { os: '#5a14b0', directory: '#6319be', git: '#9451cf', runtime: '#a8d6e5', time: '#ddd8f0', lightText: '#ffffff', darkText: '#17141d', error: '#c0392b' }

  return `"$schema" = "https://starship.rs/config-schema.json"

add_newline = true
palette = "santi020k"
format = """
[](os)\
$os\
$username\
[](fg:os bg:directory)\
$directory\
[](fg:directory bg:git)\
$git_branch\
$git_status\
[](fg:git bg:runtime)\
${runtimeFormat}
[](fg:runtime bg:time)\
$docker_context\
$cmd_duration\
$time\
[](fg:time)\
$line_break\
$character"""

[palettes.santi020k]
os = "${colors.os}"
directory = "${colors.directory}"
git = "${colors.git}"
runtime = "${colors.runtime}"
time = "${colors.time}"
light_text = "${colors.lightText}"
dark_text = "${colors.darkText}"
error = "${colors.error}"

[os]
disabled = false
style = "bg:os fg:light_text"
format = "[${pad}$symbol${pad}]($style)"

[os.symbols]
Macos = "${variant.symbols.macos}"
Linux = "${variant.symbols.linux}"
Windows = "${variant.symbols.windows}"

[username]
show_always = false
style_user = "bg:os fg:light_text"
style_root = "bg:os fg:light_text bold"
format = "[$user ]($style)"

[directory]
style = "bg:directory fg:light_text bold"
format = "[${pad}$path${pad}]($style)"
truncation_length = 3
truncation_symbol = "…/"

[directory.substitutions]
${substitutions}

[git_branch]
symbol = "${variant.symbols.git}"
style = "bg:git fg:dark_text bold"
format = "[${pad}$symbol${variant.symbols.git ? ' ' : ''}$branch ]($style)"

[git_status]
style = "bg:git fg:dark_text"
format = "[$all_status$ahead_behind${pad}]($style)"

[character]
success_symbol = "[❯](bold directory)"
error_symbol = "[❯](bold error)"

[cmd_duration]
min_time = 2000
style = "bg:time fg:${dark ? 'light_text' : 'dark_text'}"
format = "[ ${variant.symbols.duration}$duration ]($style)"

[time]
disabled = false
time_format = "%R"
style = "bg:time fg:${dark ? 'light_text' : 'dark_text'}"
format = "[${pad}$time${pad}]($style)"

[docker_context]
symbol = "${variant.symbols.docker}"
style = "bg:time fg:${dark ? 'light_text' : 'dark_text'}"
format = "[ $symbol$context ]($style)"

${runtimeModules.map(module => `[${module}]
disabled = ${variant.runtimes ? 'false' : 'true'}
${module === 'nodejs' ? `symbol = "${variant.symbols.node}"\n` : ''}style = "bg:runtime fg:dark_text"
format = "[${pad}$symbol($version)${pad}]($style)"`).join('\n\n')}
`
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  await Promise.all([
    mkdir(resolve(root, 'iterm2'), { recursive: true }),
    mkdir(resolve(root, 'starship'), { recursive: true }),
    ...['ghostty', 'kitty', 'wezterm', 'windows-terminal', 'alacritty'].map(directory => mkdir(resolve(root, directory), { recursive: true })),
  ])

  for (const palette of Object.values(palettes)) {
    const outputs = [writeFile(resolve(root, 'iterm2', `${palette.name}.itermcolors`), renderIterm(palette))]

    outputs.push(
      writeFile(resolve(root, 'ghostty', `santi020k-${palette.slug}`), renderGhostty(palette)),
      writeFile(resolve(root, 'kitty', `santi020k-${palette.slug}.conf`), renderKitty(palette)),
      writeFile(resolve(root, 'wezterm', `santi020k-${palette.slug}.lua`), renderWezterm(palette)),
      writeFile(resolve(root, 'windows-terminal', `santi020k-${palette.slug}.json`), renderWindowsTerminal(palette)),
      writeFile(resolve(root, 'alacritty', `santi020k-${palette.slug}.toml`), renderAlacritty(palette)),
    )

    for (const variantKey of Object.keys(promptVariants)) {
      outputs.push(writeFile(resolve(root, 'starship', starshipFilename(palette.slug, variantKey)), renderStarship(palette, variantKey)))
    }

    await Promise.all(outputs)
  }

  console.log(`Generated terminal color presets for ${Object.keys(palettes).length} palettes and ${Object.keys(palettes).length * Object.keys(promptVariants).length} Starship presets.`)
}
