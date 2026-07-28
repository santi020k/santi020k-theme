import path from 'node:path'

import { includeIgnoreFile } from '@eslint/config-helpers'
import { defineConfig, Runtime, Setting } from '@santi020k/eslint-config-basic'

// `defineConfig`'s built-in gitignore support resolves `.gitignore` from
// `process.cwd()` at import time, which editors (notably Zed's ESLint LSP)
// don't always set to this repo's root. Resolving against `import.meta.dirname`
// keeps `.gitignore` honored regardless of the linting process's cwd.
const gitignoreConfig = includeIgnoreFile(path.resolve(import.meta.dirname, '.gitignore'))

export default await defineConfig({
  detectRootDir: import.meta.dirname,
  ignores: [
    '**/*.json',
    '**/*.md',
    '**/*.astro',
    'scratch/**',
    'packages/santi020k-chrome-theme/scratch/**'
  ],
  settings: [Setting.NoGitignore],
  features: {
    perfectionist: false
  },
  runtime: Runtime.Node,
  typescript: 'syntax',
  projects: {
    'packages/santi020k-chrome-theme': {
      ignores: ['**/*.svg'],
      features: {
        jsonc: false,
        markdown: false,
        perfectionist: false,
        zod: false
      },
      runtime: Runtime.Universal
    }
  }
},
gitignoreConfig,
{
  files: ['**/*.d.ts'],
  languageOptions: {
    parserOptions: {
      tsconfigRootDir: import.meta.dirname
    }
  }
},
{
  files: [
    'apps/*/src/**/*.js'
  ],
  languageOptions: {
    globals: {
      document: 'readonly',
      localStorage: 'readonly',
      requestAnimationFrame: 'readonly',
      setTimeout: 'readonly',
      window: 'readonly'
    },
  },
  rules: {
    'n/no-missing-import': 'off'
  },
},
{
  files: ['eslint.config.mjs'],
  rules: {
    'n/no-unpublished-import': 'off'
  }
},
{
  files: ['.github/workflows/*.{yml,yaml}'],
  rules: {
    'yml/no-empty-mapping-value': 'off'
  }
},
{
  files: [
    'scripts/*.mjs',
    'apps/vscode-website/scripts/*.mjs',
    'packages/santi020k-chrome-theme/scripts/*.mjs',
    'packages/santi020k-theme/scripts/*.mjs'
  ],
  rules: {
    'n/hashbang': 'off',
    'n/no-process-exit': 'off',
    'n/no-unpublished-import': 'off',
    'security/detect-non-literal-fs-filename': 'off',
    'turbo/no-undeclared-env-vars': 'off'
  }
},
{
  files: [
    'packages/theme/index.js'
  ],
  rules: {
    'camelcase': 'off'
  }
},
{
  files: [
    'packages/santi020k-zed-theme/scripts/build.mjs'
  ],
  rules: {
    'camelcase': 'off',
    'security/detect-object-injection': 'off'
  }
},
{
  files: [
    'packages/santi020k-zed-theme/scripts/validate.mjs'
  ],
  rules: {
    'security/detect-non-literal-regexp': 'off'
  }
},
{
  files: [
    'apps/*/tests/*.test.mjs',
    'packages/*/tests/*.test.mjs'
  ],
  rules: {
    'n/no-unpublished-import': 'off',
    'security/detect-non-literal-fs-filename': 'off'
  }
})
