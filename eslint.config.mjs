import { defineConfig, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  detectRootDir: import.meta.dirname,
  ignores: [
    '**/*.json',
    '**/*.md',
    '**/*.astro',
    '**/*.d.ts',
    '**/*.yml',
    '**/*.yaml',
    'scratch/**',
    'apps/*/dist/**',
    'packages/*/dist/**',
    'packages/santi020k-chrome-theme/scratch/**',
    'packages/santi020k-theme/themes/*-bold-color-theme.json',
    'packages/santi020k-theme/themes/*-italic-color-theme.json',
    'packages/santi020k-theme/themes/santi020k-hc-light-color-theme.json'
  ],
  features: {
    perfectionist: false
  },
  runtime: Runtime.Node
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
  },
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
    'apps/*/tests/*.test.mjs',
    'packages/*/tests/*.test.mjs'
  ],
  rules: {
    'n/no-unpublished-import': 'off',
    'security/detect-non-literal-fs-filename': 'off'
  }
})
