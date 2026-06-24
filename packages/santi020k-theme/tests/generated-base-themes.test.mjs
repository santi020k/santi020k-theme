import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

import { describe, expect, test } from 'vitest'

import { extensionPackageDir, fromExtensionPackage } from '../scripts/paths.mjs'

const baseThemeFiles = [
  'themes/santi020k-dark-color-theme.json',
  'themes/santi020k-light-color-theme.json',
  'themes/santi020k-hc-dark-color-theme.json'
]

const readBaseThemes = () => new Map(
  baseThemeFiles.map(file => [file, readFileSync(fromExtensionPackage(file), 'utf8')])
)

describe('generated base themes', () => {
  test('checked-in base themes match the token source output', () => {
    const before = readBaseThemes()

    execFileSync(process.execPath, ['scripts/generate-base-themes.mjs'], {
      cwd: extensionPackageDir,
      stdio: 'pipe'
    })

    execFileSync(process.execPath, ['scripts/format-themes.mjs'], {
      cwd: extensionPackageDir,
      stdio: 'pipe'
    })

    const after = readBaseThemes()

    expect(after).toEqual(before)
  })
})
