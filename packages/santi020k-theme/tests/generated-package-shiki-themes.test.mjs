import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { pathToFileURL } from 'node:url'

import { describe, expect, test } from 'vitest'

import { extensionPackageDir, fromRepoRoot } from '../scripts/paths.mjs'

const shikiThemeFiles = [
  'packages/theme/shiki/santi020k-dark.json',
  'packages/theme/shiki/santi020k-hc-dark.json',
  'packages/theme/shiki/santi020k-hc-light.json',
  'packages/theme/shiki/santi020k-light.json'
]

const readShikiThemes = () => new Map(
  shikiThemeFiles.map(file => [file, readFileSync(fromRepoRoot(file), 'utf8')])
)

describe('generated package Shiki themes', () => {
  test('checked-in package Shiki themes match the VS Code theme output', () => {
    const before = readShikiThemes()

    execFileSync(process.execPath, ['scripts/generate-package-shiki-themes.mjs'], {
      cwd: extensionPackageDir,
      stdio: 'pipe'
    })

    const after = readShikiThemes()

    expect(after).toEqual(before)
  })

  test('package Shiki themes are valid VS Code theme JSON', () => {
    const [darkTheme, hcDarkTheme, hcLightTheme, lightTheme] = shikiThemeFiles.map(file => (
      JSON.parse(readFileSync(fromRepoRoot(file), 'utf8'))
    ))

    expect(darkTheme).toMatchObject({
      colors: {
        'editor.background': '#0d0a15'
      },
      name: 'santi020k dark',
      semanticHighlighting: true,
      type: 'dark'
    })

    expect(darkTheme.tokenColors).toEqual(expect.any(Array))

    expect(hcDarkTheme).toMatchObject({
      colors: {
        'editor.background': '#0d0718'
      },
      name: 'santi020k hc dark',
      semanticHighlighting: true,
      type: 'hc-dark'
    })

    expect(hcDarkTheme.tokenColors).toEqual(expect.any(Array))

    expect(hcLightTheme).toMatchObject({
      colors: {
        'editor.background': '#f8f6fd'
      },
      name: 'santi020k hc light',
      semanticHighlighting: true,
      type: 'hc-light'
    })

    expect(hcLightTheme.tokenColors).toEqual(expect.any(Array))

    expect(lightTheme).toMatchObject({
      colors: {
        'editor.background': '#f8f6fd'
      },
      name: 'santi020k light',
      semanticHighlighting: true,
      type: 'light'
    })

    expect(lightTheme.tokenColors).toEqual(expect.any(Array))
  })

  test('package Shiki entrypoint exports theme helpers', async () => {
    const {
      getSanti020kShikiTheme,
      santi020kShikiThemes,
      santi020kShikiThemeVariants
    } = await import(
      pathToFileURL(fromRepoRoot('packages/theme/shiki.js')).href
    )

    expect(santi020kShikiThemeVariants).toEqual(['dark', 'hcDark', 'hcLight', 'light'])

    expect(santi020kShikiThemes.dark).toMatchObject({
      name: 'santi020k dark',
      type: 'dark'
    })

    expect(santi020kShikiThemes.hcDark).toMatchObject({
      name: 'santi020k hc dark',
      type: 'hc-dark'
    })

    expect(santi020kShikiThemes.hcLight).toMatchObject({
      name: 'santi020k hc light',
      type: 'hc-light'
    })

    expect(santi020kShikiThemes.light).toMatchObject({
      name: 'santi020k light',
      type: 'light'
    })

    expect(getSanti020kShikiTheme('hcDark')).toBe(santi020kShikiThemes.hcDark)

    expect(() => getSanti020kShikiTheme('unknown')).toThrow(
      /Unknown Santi020k Shiki theme variant: unknown/
    )
  })
})
