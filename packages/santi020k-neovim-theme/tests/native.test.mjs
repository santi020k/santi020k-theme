import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { expect, it } from 'vitest'

const available = spawnSync('nvim', ['--version'], { encoding: 'utf8' }).status === 0

if (!available && process.env.REQUIRE_NATIVE_NEOVIM === '1') throw new Error('The required native Neovim test runtime is missing.')

it.skipIf(!available)('loads and switches the installed colorscheme in isolated native Neovim', () => {
  const directory = mkdtempSync(join(tmpdir(), 'santi020k-neovim-'))

  try {
    const extracted = spawnSync('unzip', ['-q', fileURLToPath(new URL('../../../apps/website/public/downloads/ports/santi020k-neovim.zip', import.meta.url)), '-d', directory], { encoding: 'utf8' })

    expect(extracted.status, extracted.stderr).toBe(0)

    const result = spawnSync('nvim', ['--clean', '--headless', '-u', 'NONE', '-i', 'NONE', '-l', fileURLToPath(new URL('native.lua', import.meta.url))], {
      encoding: 'utf8',
      env: { ...process.env, SANTI020K_NVIM_ROOT: directory },
      timeout: 15000
    })

    expect(result.stderr + result.stdout).toContain('Native Neovim load')

    expect(result.status).toBe(0)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
