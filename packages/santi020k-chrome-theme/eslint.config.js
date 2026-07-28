import path from 'node:path'

import { includeIgnoreFile } from '@eslint/config-helpers'
import { defineConfig, Runtime, Setting } from '@santi020k/eslint-config-basic'

// `defineConfig`'s built-in gitignore support resolves `.gitignore` from
// `process.cwd()` at import time, which editors (notably Zed's ESLint LSP)
// don't always set to this package's root. Resolving against `import.meta.dirname`
// keeps `.gitignore` honored regardless of the linting process's cwd.
const gitignoreConfig = includeIgnoreFile(path.resolve(import.meta.dirname, '.gitignore'))

export default await defineConfig({
  detectRootDir: import.meta.dirname,
  ignores: [
    'dist/**',
    'scratch/**',
    '**/*.json',
    '**/*.md',
    '**/*.svg'
  ],
  settings: [Setting.NoGitignore],
  features: {
    jsonc: false,
    markdown: false,
    perfectionist: false,
    zod: false
  },
  runtime: Runtime.Universal
},
gitignoreConfig,
{
  files: ['eslint.config.js'],
  rules: {
    'n/no-unpublished-import': 'off'
  },
},
{
  files: ['scripts/*.mjs'],
  rules: {
    'n/hashbang': 'off',
    'n/no-process-exit': 'off',
    'n/no-unpublished-import': 'off',
    'security/detect-non-literal-fs-filename': 'off'
  }
})
