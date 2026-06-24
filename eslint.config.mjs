import { defineConfig, Runtime } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  detectRootDir: import.meta.dirname,
  ignores: [
    '**/*.json',
    '**/*.md',
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
    'packages/santi020k-chrome-theme/scripts/*.mjs'
  ],
  rules: {
    'n/hashbang': 'off',
    'n/no-process-exit': 'off',
    'n/no-unpublished-import': 'off',
    'no-unused-vars': 'off',
    'promise/param-names': 'off',
    'security/detect-non-literal-fs-filename': 'off',
    'security/detect-object-injection': 'off',
    'turbo/no-undeclared-env-vars': 'off'
  }
},
{
  files: ['tests/*.test.mjs'],
  rules: {
    'n/no-unpublished-import': 'off',
    'security/detect-non-literal-fs-filename': 'off'
  }
})
