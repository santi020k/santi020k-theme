import { eslintConfig, Runtime } from '@santi020k/eslint-config-basic'

export default [
  {
    ignores: [
      '**/*.json',
      '**/*.md',
      '**/*.yml',
      '**/*.yaml',
      'scratch/**',
      'website/dist/**'
    ]
  },
  ...eslintConfig({
    runtime: Runtime.Node
  }),
  {
    files: ['website/src/**/*.js'],
    languageOptions: {
      globals: {
        document: 'readonly',
        localStorage: 'readonly',
        requestAnimationFrame: 'readonly',
        setTimeout: 'readonly',
        window: 'readonly'
      }
    },
    rules: {
      'n/no-missing-import': 'off'
    }
  },
  {
    files: ['eslint.config.mjs'],
    rules: {
      'n/no-unpublished-import': 'off'
    }
  },
  {
    files: ['scripts/*.mjs'],
    rules: {
      'security/detect-non-literal-fs-filename': 'off',
      'security/detect-object-injection': 'off'
    }
  },
  {
    files: ['tests/*.test.mjs'],
    rules: {
      'n/no-unpublished-import': 'off',
      'security/detect-non-literal-fs-filename': 'off'
    }
  }
]
