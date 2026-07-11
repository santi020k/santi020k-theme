import { mkdir, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

import { palettes } from '../palettes.mjs'

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

const render = palette => {
  // Palette keys come from the fixed colorKeys table above.
  // eslint-disable-next-line security/detect-object-injection
  const entries = colorKeys.map(([label, key]) => `\t<key>${label}</key>\n\t${colorDict(palette[key])}`)

  for (const [index, color] of palette.ansi.entries()) entries.push(`\t<key>Ansi ${index} Color</key>\n\t${colorDict(color)}`)

  return `<?xml version="1.0" encoding="UTF-8"?>\n<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">\n<plist version="1.0">\n<dict>\n${entries.join('\n')}\n</dict>\n</plist>\n`
}

const renderStarship = palette => {
  const dark = palette.slug === 'dark'

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
$c\
$cpp\
$deno\
$golang\
$java\
$nodejs\
$php\
$python\
$ruby\
$rust\
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
format = "[ $symbol ]($style)"

[os.symbols]
Macos = ""
Linux = ""
Windows = "󰍲"

[username]
show_always = false
style_user = "bg:os fg:light_text"
style_root = "bg:os fg:light_text bold"
format = "[$user ]($style)"

[directory]
style = "bg:directory fg:light_text bold"
format = "[ $path ]($style)"
truncation_length = 3
truncation_symbol = "…/"

[directory.substitutions]
"Documents" = "󰈙 "
"Downloads" = " "
"Music" = " "
"Pictures" = " "

[git_branch]
symbol = ""
style = "bg:git fg:dark_text bold"
format = "[ $symbol $branch ]($style)"

[git_status]
style = "bg:git fg:dark_text"
format = "[$all_status$ahead_behind ]($style)"

[character]
success_symbol = "[❯](bold directory)"
error_symbol = "[❯](bold error)"

[cmd_duration]
min_time = 2000
style = "bg:time fg:${dark ? 'light_text' : 'dark_text'}"
format = "[ 󰔟 $duration ]($style)"

[time]
disabled = false
time_format = "%R"
style = "bg:time fg:${dark ? 'light_text' : 'dark_text'}"
format = "[  $time ]($style)"

[docker_context]
symbol = " "
style = "bg:time fg:${dark ? 'light_text' : 'dark_text'}"
format = "[ $symbol$context ]($style)"

${['c', 'cpp', 'deno', 'golang', 'java', 'nodejs', 'php', 'python', 'ruby', 'rust'].map(module => `[${module}]
style = "bg:runtime fg:dark_text"
format = "[ $symbol($version) ]($style)"`).join('\n\n')}
`
}

await Promise.all([
  mkdir(resolve(root, 'iterm2'), { recursive: true }),
  mkdir(resolve(root, 'starship'), { recursive: true }),
])

for (const palette of Object.values(palettes)) {
  await Promise.all([
    writeFile(resolve(root, 'iterm2', `${palette.name}.itermcolors`), render(palette)),
    writeFile(resolve(root, 'starship', `santi020k-${palette.slug}.toml`), renderStarship(palette)),
  ])
}

console.log(`Generated ${Object.keys(palettes).length} iTerm2 presets and ${Object.keys(palettes).length} Starship presets.`)
