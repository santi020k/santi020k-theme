import { defineConfig } from '@santi020k/eslint-config-basic'

export default defineConfig(undefined, {
  files: ['**/*.astro'],
  languageOptions: {
    parserOptions: {
      project: true,
      projectService: false
    }
  },
  name: 'santi020k-theme/astro-project-service'
})
