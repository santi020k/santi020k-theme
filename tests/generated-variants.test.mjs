import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

import { describe, expect, test } from 'vitest'

import { repoRoot } from '../scripts/paths.mjs'

const generatedThemeFiles = [
  'packages/santi020k-theme/themes/santi020k-dark-bold-color-theme.json',
  'packages/santi020k-theme/themes/santi020k-light-bold-color-theme.json',
  'packages/santi020k-theme/themes/santi020k-hc-dark-bold-color-theme.json',
  'packages/santi020k-theme/themes/santi020k-hc-light-bold-color-theme.json',
  'packages/santi020k-theme/themes/santi020k-dark-italic-color-theme.json',
  'packages/santi020k-theme/themes/santi020k-light-italic-color-theme.json',
  'packages/santi020k-theme/themes/santi020k-hc-dark-italic-color-theme.json',
  'packages/santi020k-theme/themes/santi020k-hc-light-italic-color-theme.json'
]

const readGeneratedThemes = () => new Map(
  generatedThemeFiles.map(file => [file, readFileSync(`${repoRoot}/${file}`, 'utf8')])
)

describe('generated theme variants', () => {
  test('checked-in bold and italic variants match the generator output', () => {
    const before = readGeneratedThemes()

    execFileSync(process.execPath, ['scripts/generate-variants.mjs'], {
      cwd: repoRoot,
      stdio: 'pipe'
    })

    const after = readGeneratedThemes()

    expect(after).toEqual(before)
  })
})
