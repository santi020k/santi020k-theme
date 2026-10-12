import { defineConfig } from '@santi020k/eslint-config-basic'

export default defineConfig(undefined, {
  files: ['apps/**/*.{astro,jsx,tsx}'],
  name: 'santi020k-theme/custom-selects',
  rules: {
    'no-restricted-syntax': ['error', {
      selector: 'ImportDeclaration[source.value="@santi020k/lumen-astro"] > ImportSpecifier[imported.name="NativeSelect"]',
      message: 'Use Lumen Select for the custom option list. NativeSelect is reserved for an explicitly approved native-control requirement.'
    }, {
      selector: 'JSXOpeningElement[name.name="select"]',
      message: 'Use Lumen Select instead of a raw select. Its native fallback already covers JavaScript-free usage.'
    }]
  }
}, {
  files: ['**/*.astro'],
  languageOptions: {
    parserOptions: {
      project: true,
      projectService: false
    }
  },
  name: 'santi020k-theme/astro-project-service'
})
