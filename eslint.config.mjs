import { defineConfig } from '@santi020k/eslint-config-basic'

export default await defineConfig({
  ignores: [
    '**/*.json',
    '**/*.md',
    '**/*.astro',
    '**/*.d.ts',
    'scratch/**',
    'packages/santi020k-chrome-theme/scratch/**'
  ],
  typescript: 'syntax',
  projects: {
    'packages/santi020k-chrome-theme': {
      ignores: ['**/*.svg'],
      features: {
        jsonc: false,
        markdown: false,
        perfectionist: false,
        zod: false
      }
    }
  },
},
{
  files: ['**/*.{cjs,js,mjs,ts}'],
  name: 'established-project-formatting',
  rules: {
    '@stylistic/array-element-newline': 'off',
    '@stylistic/arrow-parens': 'off',
    '@stylistic/brace-style': 'off',
    '@stylistic/comma-dangle': 'off',
    '@stylistic/comma-spacing': 'off',
    '@stylistic/function-call-argument-newline': 'off',
    '@stylistic/implicit-arrow-linebreak': 'off',
    '@stylistic/indent': 'off',
    '@stylistic/max-len': 'off',
    '@stylistic/max-statements-per-line': 'off',
    '@stylistic/no-trailing-spaces': 'off',
    '@stylistic/object-property-newline': 'off',
    '@stylistic/operator-linebreak': 'off',
    '@stylistic/quotes': 'off',
    '@stylistic/semi': 'off',
    complexity: 'off',
    'max-depth': 'off',
    'no-console': 'off'
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
    complexity: 'off',
    'n/hashbang': 'off',
    'n/no-process-exit': 'off',
    'n/no-unpublished-import': 'off',
    'no-console': 'off',
    'security/detect-non-literal-fs-filename': 'off',
    'turbo/no-undeclared-env-vars': 'off'
  }
},
{
  files: [
    'packages/theme/index.js'
  ],
  rules: {
    'camelcase': 'off',
    complexity: 'off'
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
