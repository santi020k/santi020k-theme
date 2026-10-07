import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { validateXcodeTheme } from './theme-validation.mjs'

// cspell:ignore plutil xccolortheme

const root = resolve(import.meta.dirname, '..', 'themes')

for (const appearance of ['Dark', 'Light']) {
  const file = resolve(root, `Santi020k ${appearance}.xccolortheme`)
  const contents = readFileSync(file, 'utf8')

  validateXcodeTheme(contents)

  if (process.platform === 'darwin') {
    const result = spawnSync('plutil', ['-lint', file], { encoding: 'utf8' })

    if (result.status !== 0) throw new Error(result.stderr || result.stdout)
  }
}

console.log('✓ Xcode dark and light themes validated.')
