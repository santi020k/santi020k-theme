import { execFile } from 'node:child_process'
import { chmod, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { promisify } from 'node:util'

import { describe, expect, test } from 'vitest'

const exec = promisify(execFile)
const hooks = resolve(import.meta.dirname, '../../.husky')

const cases = [
  { event: 'pre-commit', args: [], expected: ['run', 'pre-commit'] },
  { event: 'pre-push', args: ['origin', 'https://example.invalid/repository'], expected: ['pre-push'] },
  { event: 'commit-msg', args: ['message with spaces.txt'], expected: ['exec', 'commitprompt', 'validate', '--input', 'message with spaces.txt'] },
]

describe('Git hook launchers', () => {
  test.each(cases)('$event preserves its command contract and propagates failures', async ({ event, args, expected }) => {
    const directory = await mkdtemp(join(tmpdir(), 'theme-hook-contract-'))
    const capture = join(directory, 'arguments.txt')
    const command = join(directory, 'pnpm')

    try {
      await writeFile(command, '#!/bin/sh\nprintf "%s\\n" "$@" > "$THEME_HOOK_CAPTURE"\nexit "$THEME_HOOK_EXIT"\n')

      await chmod(command, 0o755)

      const run = exitCode => exec('sh', [join(hooks, event), ...args], {
        env: {
          PATH: `${directory}:${process.env.PATH}`,
          THEME_HOOK_CAPTURE: capture,
          THEME_HOOK_EXIT: String(exitCode),
        },
      })

      await run(0)

      expect((await readFile(capture, 'utf8')).trim().split('\n')).toEqual(expected)

      await expect(run(13)).rejects.toMatchObject({ code: 13 })
    } finally {
      await rm(directory, { recursive: true, force: true })
    }
  })
})
