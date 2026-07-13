import { execFileSync, spawnSync } from 'node:child_process'
import { chmod, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

import { parse } from 'smol-toml'

import { palettes } from '../palettes.mjs'
import { promptVariants, runtimeModules, starshipFilename } from '../prompt-presets.mjs'

// cspell:ignore compinit pipefail precmd ZDOTDIR

const root = resolve(import.meta.dirname, '..')
const requiredKeys = ['Background Color', 'Foreground Color', 'Cursor Color', 'Selection Color', ...Array.from({ length: 16 }, (_, index) => `Ansi ${index} Color`)]

for (const palette of Object.values(palettes)) {
  const path = resolve(root, 'iterm2', `${palette.name}.itermcolors`)
  const contents = await readFile(path, 'utf8')

  if (!contents.startsWith('<?xml version="1.0"') || !contents.includes('<plist version="1.0">')) {
    throw new Error(`${palette.name}: invalid plist header`)
  }

  for (const key of requiredKeys) {
    if (!contents.includes(`<key>${key}</key>`)) throw new Error(`${palette.name}: missing ${key}`)
  }

  const portFiles = [
    ['ghostty', `santi020k-${palette.slug}`],
    ['kitty', `santi020k-${palette.slug}.conf`],
    ['wezterm', `santi020k-${palette.slug}.lua`],
    ['windows-terminal', `santi020k-${palette.slug}.json`],
    ['alacritty', `santi020k-${palette.slug}.toml`],
  ]

  for (const [directory, filename] of portFiles) {
    const port = await readFile(resolve(root, directory, filename), 'utf8')

    for (const color of [palette.background, palette.foreground, palette.cursor, ...palette.ansi]) {
      if (!port.includes(color)) throw new Error(`${palette.name} ${directory}: missing canonical color ${color}`)
    }

    if (directory === 'windows-terminal') JSON.parse(port)

    if (directory === 'alacritty') parse(port)
  }

  for (const [variantKey, variant] of Object.entries(promptVariants)) {
    const starshipPath = resolve(root, 'starship', starshipFilename(palette.slug, variantKey))
    const starship = await readFile(starshipPath, 'utf8')
    let config

    try { config = parse(starship) } catch (error) { throw new Error(`${palette.name} ${variant.name}: invalid TOML`, { cause: error }) }

    if (config.palette !== 'santi020k' || !config.palettes?.santi020k) throw new Error(`${palette.name} ${variant.name}: missing palette`)

    if (config.os.symbols.Macos !== variant.symbols.macos || config.git_branch.symbol !== variant.symbols.git) {
      throw new Error(`${palette.name} ${variant.name}: generated symbols do not match shared preset metadata`)
    }

    const configSections = new Map(Object.entries(config))

    for (const runtime of runtimeModules) {
      if (configSections.get(runtime)?.disabled !== !variant.runtimes) throw new Error(`${palette.name} ${variant.name}: incorrect ${runtime} state`)
    }
  }
}

const starship = process.env.STARSHIP_BIN || 'starship'

if (spawnSync(starship, ['--version'], { stdio: 'ignore' }).status === 0) {
  for (const palette of Object.values(palettes)) {
    for (const variantKey of Object.keys(promptVariants)) {
      const config = resolve(root, 'starship', starshipFilename(palette.slug, variantKey))
      const prompt = execFileSync(starship, ['prompt', '--path', root, '--status', '1'], { env: { ...process.env, TERM: 'xterm-256color', STARSHIP_CONFIG: config }, encoding: 'utf8' })

      if (!prompt.includes('\u001B[')) throw new Error(`${palette.name} ${variantKey}: Starship smoke test did not render a styled prompt`)
    }
  }
} else console.log('Skipped Starship rendering smoke tests because the Starship CLI is unavailable.')

const autoTheme = await readFile(resolve(root, 'zsh', 'santi020k-auto-theme.zsh'), 'utf8')

for (const expected of ['AppleInterfaceStyle', 'STARSHIP_CONFIG', 'preset_file', 'suffix', 'add-zsh-hook precmd']) {
  if (!autoTheme.includes(expected)) throw new Error(`Zsh auto theme missing ${expected}`)
}

const zshSetup = await readFile(resolve(root, 'zsh', 'santi020k.zsh'), 'utf8')

for (const expected of ['compinit', 'zoxide init zsh', 'fzf --zsh', 'zsh-autosuggestions', 'zsh-syntax-highlighting', 'starship init zsh']) {
  if (!zshSetup.includes(expected)) throw new Error(`Zsh setup missing ${expected}`)
}

const bashSetup = await readFile(resolve(root, 'bash', 'santi020k.bash'), 'utf8')
const fishSetup = await readFile(resolve(root, 'fish', 'santi020k.fish'), 'utf8')

for (const [shell, contents, expected] of [['Bash', bashSetup, ['fzf --bash', 'zoxide init bash', 'starship init bash', 'SANTI020K_THEME']], ['Fish', fishSetup, ['zoxide init fish', 'starship init fish', 'SANTI020K_THEME']]]) {
  for (const value of expected) if (!contents.includes(value)) throw new Error(`${shell} setup missing ${value}`)
}

const installer = await readFile(resolve(root, 'zsh', 'install.zsh'), 'utf8')

for (const expected of ['set -euo pipefail', 'brew install', 'git-delta', 'santi020k.zsh', 'SOURCE_LINE', 'tlsv1.2']) {
  if (!installer.includes(expected)) throw new Error(`Zsh installer missing ${expected}`)
}

const cli = resolve(root, 'bin', 'santi020k-terminal')
const cliContents = await readFile(cli, 'utf8')

for (const expected of ['install_config', 'configure', 'config_command', 'prompt_command', 'install_windows_terminal', '--dry-run', 'Nerd Font', 'doctor', 'repair', 'preset_command', 'colors_command', 'status', 'preview', 'migrate', 'santi020k/tap/santi020k-terminal', 'refreshing managed configuration only']) {
  if (!cliContents.includes(expected)) throw new Error(`Terminal CLI missing ${expected}`)
}

const sandbox = await mkdtemp(resolve(tmpdir(), 'santi020k-terminal-'))

try {
  await chmod(cli, 0o755)

  const env = { ...process.env, HOME: sandbox, XDG_CONFIG_HOME: resolve(sandbox, '.config'), ZDOTDIR: sandbox, SANTI020K_ASSET_DIR: root }

  execFileSync(cli, ['install'], { env, encoding: 'utf8' })

  execFileSync(cli, ['install'], { env, encoding: 'utf8' })

  const managedZsh = await readFile(resolve(sandbox, '.config', 'santi020k-terminal', 'santi020k.zsh'), 'utf8')
  const sandboxZshrc = await readFile(resolve(sandbox, '.zshrc'), 'utf8')

  if (managedZsh !== zshSetup) throw new Error('Terminal CLI did not install the packaged Zsh setup')

  if (sandboxZshrc.split('Santi020k Terminal').length !== 2) throw new Error('Terminal CLI installation is not idempotent')

  for (const preset of ['dark', 'light', 'dark-portable', 'light-portable', 'dark-minimal', 'light-minimal']) {
    await readFile(resolve(sandbox, '.config', 'starship', `santi020k-${preset}.toml`), 'utf8')
  }

  execFileSync(cli, ['preset', 'use', 'portable'], { env, encoding: 'utf8' })

  const selectedPreset = execFileSync(cli, ['preset', 'current'], { env, encoding: 'utf8' }).trim()

  if (selectedPreset !== 'portable') throw new Error('Terminal CLI did not persist the selected preset')

  const status = execFileSync(cli, ['status'], { env, encoding: 'utf8' })

  if (!status.includes('Preset: portable') || !status.includes('Configuration schema: 1')) throw new Error('Terminal CLI status did not report managed state')

  execFileSync(cli, ['colors', 'install', 'kitty', 'dark'], { env, encoding: 'utf8' })

  await readFile(resolve(sandbox, '.config', 'kitty', 'themes', 'santi020k-dark.conf'), 'utf8')

  execFileSync(cli, ['colors', 'install', 'wezterm', 'light'], { env, encoding: 'utf8' })

  await readFile(resolve(sandbox, '.config', 'wezterm', 'colors', 'Santi020k Light.lua'), 'utf8')

  const dryRun = execFileSync(cli, ['colors', 'install', 'alacritty', 'dark', '--dry-run'], { env, encoding: 'utf8' })

  if (!dryRun.includes('Would install')) throw new Error('Terminal CLI color dry-run did not describe the planned installation')

  const windowsSettings = resolve(sandbox, 'windows-settings.json')

  await writeFile(windowsSettings, '{"profiles":{"list":[]},"schemes":[]}\n')

  execFileSync(cli, ['colors', 'install', 'windows-terminal', 'dark'], { env: { ...env, WINDOWS_TERMINAL_SETTINGS: windowsSettings }, encoding: 'utf8' })

  const installedWindows = JSON.parse(await readFile(windowsSettings, 'utf8'))

  if (!installedWindows.schemes.some(scheme => scheme.name === 'Santi020k Dark')) throw new Error('Terminal CLI did not install the Windows Terminal scheme')

  execFileSync(cli, ['configure', 'all', 'minimal', 'skip', 'light'], { env, encoding: 'utf8' })

  for (const rc of ['.zshrc', '.bashrc', '.config/fish/config.fish']) await readFile(resolve(sandbox, rc), 'utf8')

  const exported = resolve(sandbox, 'terminal-config.json')

  execFileSync(cli, ['config', 'export', exported], { env, encoding: 'utf8' })

  const portableConfig = JSON.parse(await readFile(exported, 'utf8'))

  if (portableConfig.shell !== 'all' || portableConfig.preset !== 'minimal') throw new Error('Terminal CLI did not export configured choices')

  execFileSync(cli, ['config', 'import', exported], { env, encoding: 'utf8' })

  execFileSync(cli, ['prompt', 'build', 'work', 'nodejs,python,time', 'dark'], { env, encoding: 'utf8' })

  const customPrompt = parse(await readFile(resolve(sandbox, '.config', 'starship', 'work.toml'), 'utf8'))

  if (customPrompt.rust.disabled !== true || customPrompt.nodejs.disabled !== false || customPrompt.docker_context.disabled !== true) throw new Error('Custom prompt module selection was not applied')

  const migration = execFileSync(cli, ['migrate'], { env, encoding: 'utf8' })

  if (!migration.includes('is current')) throw new Error('Terminal CLI migration did not detect current configuration')

  execFileSync(cli, ['uninstall'], { env, encoding: 'utf8' })

  const cleanedZshrc = await readFile(resolve(sandbox, '.zshrc'), 'utf8')

  if (cleanedZshrc.includes('santi020k-terminal/santi020k.zsh')) throw new Error('Terminal CLI uninstall left its source line in .zshrc')

  for (const rc of ['.bashrc', '.config/fish/config.fish']) {
    if ((await readFile(resolve(sandbox, rc), 'utf8')).includes('santi020k-terminal/santi020k')) throw new Error(`Terminal CLI uninstall left its source line in ${rc}`)
  }

  try {
    await readFile(resolve(sandbox, '.config', 'santi020k-terminal', 'preset'), 'utf8')

    throw new Error('Terminal CLI uninstall left managed preset state behind')
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
  }
} finally {
  await rm(sandbox, { force: true, recursive: true })
}

console.log(`Validated ${Object.keys(palettes).length} palettes across six terminal formats, ${Object.keys(palettes).length * Object.keys(promptVariants).length} parsed Starship presets, three shell integrations, and the extended terminal CLI lifecycle.`)
