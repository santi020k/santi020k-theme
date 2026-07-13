import { execFileSync, spawnSync } from 'node:child_process'
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'

import { afterEach, beforeAll, describe, expect, it } from 'vitest'

const root = resolve(import.meta.dirname, '..')
const cli = resolve(root, 'bin', 'santi020k-terminal')
const sandboxes = []

const createSandbox = () => {
  const home = mkdtempSync(resolve(tmpdir(), 'santi020k-terminal-test-'))

  sandboxes.push(home)

  return {
    home,
    env: {
      ...process.env,
      HOME: home,
      XDG_CONFIG_HOME: resolve(home, '.config'),
      ZDOTDIR: home,
      SANTI020K_ASSET_DIR: root,
      SANTI020K_VERSION: '9.8.7-test',
    },
  }
}

const run = (args, env) => execFileSync(cli, args, { encoding: 'utf8', env })
const tryRun = (args, env) => spawnSync(cli, args, { encoding: 'utf8', env })

beforeAll(() => {
  if (spawnSync('zsh', ['--version']).status !== 0) throw new Error('The terminal CLI tests require zsh')
})

afterEach(() => {
  while (sandboxes.length > 0) rmSync(sandboxes.pop(), { force: true, recursive: true })
})

describe('terminal CLI', () => {
  it('preserves existing shell configuration and is idempotent', () => {
    const { home, env } = createSandbox()
    const zshrc = resolve(home, '.zshrc')

    writeFileSync(zshrc, '# existing user configuration\nexport KEEP_ME=yes\n')

    run(['install'], env)

    run(['install'], env)

    const contents = readFileSync(zshrc, 'utf8')

    expect(contents).toContain('export KEEP_ME=yes')

    expect(contents.match(/# Santi020k Terminal/gu)).toHaveLength(1)

    expect(contents.match(/santi020k-terminal\/santi020k\.zsh/gu)).toHaveLength(1)

    expect(readFileSync(resolve(home, '.config/santi020k-terminal/installed-version'), 'utf8').trim()).toBe('9.8.7-test')
  })

  it('supports homes and configuration paths containing spaces', () => {
    const fixture = createSandbox()
    const spacedHome = resolve(fixture.home, 'home with spaces')

    const env = {
      ...fixture.env,
      HOME: spacedHome,
      XDG_CONFIG_HOME: resolve(spacedHome, 'config with spaces'),
      ZDOTDIR: spacedHome,
    }

    run(['install'], env)

    expect(readFileSync(resolve(spacedHome, '.zshrc'), 'utf8')).toContain('# Santi020k Terminal')

    expect(readFileSync(resolve(env.XDG_CONFIG_HOME, 'santi020k-terminal/preset'), 'utf8').trim()).toBe('rich')
  })

  it.each([
    [['preset', 'use', 'unknown'], 'Unknown preset'],
    [['colors', 'path', 'unknown', 'dark'], 'Usage: santi020k-terminal colors path'],
    [['preview', 'sepia'], 'Usage: santi020k-terminal preview'],
    [['install', 'powershell'], 'Shell must be zsh, bash, fish, or all'],
  ])('rejects invalid arguments for %j', (args, message) => {
    const { env } = createSandbox()
    const result = tryRun(args, env)

    expect(result.status).toBe(2)

    expect(result.stderr).toContain(message)
  })

  it('fails without partially installing when packaged assets are missing', () => {
    const { home, env } = createSandbox()
    const result = tryRun(['install'], { ...env, SANTI020K_ASSET_DIR: resolve(home, 'missing assets') })

    expect(result.status).toBe(1)

    expect(result.stderr).toContain('Missing packaged asset:')

    expect(() => readFileSync(resolve(home, '.zshrc'), 'utf8')).toThrow()
  })

  it('uses title-cased filenames for terminal color presets', () => {
    const { home, env } = createSandbox()

    expect(run(['colors', 'path', 'iterm2', 'light'], env).trim()).toBe(resolve(root, 'iterm2', 'Santi020k Light.itermcolors'))

    run(['colors', 'install', 'wezterm', 'light'], env)

    expect(readdirSync(resolve(home, '.config/wezterm/colors'))).toContain('Santi020k Light.lua')
  })

  it('removes only managed shell integration during uninstall', () => {
    const { home, env } = createSandbox()
    const zshrc = resolve(home, '.zshrc')

    writeFileSync(zshrc, 'export KEEP_ME=yes\n')

    run(['install'], env)

    run(['uninstall'], env)

    const contents = readFileSync(zshrc, 'utf8')

    expect(contents).toContain('export KEEP_ME=yes')

    expect(contents).not.toContain('santi020k-terminal/santi020k.zsh')
  })
})
