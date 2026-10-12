import { readdirSync,readFileSync } from 'node:fs'

import { expect, it } from 'vitest'

it('deploys changes to every external consolidated website build input', () => {
  const root = new URL('../../', import.meta.url)
  const turbo = JSON.parse(readFileSync(new URL('turbo.json', root), 'utf8'))
  const workflow = readFileSync(new URL('.github/workflows/deploy-websites.yml', root), 'utf8')
  const paths = [...workflow.matchAll(/^ {6}- "([^"]+)"$/gmu)].map(match => match[1])
  const websites = readdirSync(new URL('apps/', root)).filter(name => name.endsWith('-website'))

  const inputs = turbo.tasks['@santi020k/santi020k-theme-website#build'].inputs
    .filter(input => input.startsWith('$TURBO_ROOT$/'))
    .map(input => input.replace('$TURBO_ROOT$/', ''))
    .flatMap(input => input.startsWith('apps/*-website/')
      ? websites.map(name => input.replace('apps/*-website/', `apps/${name}/`))
      : [input])

  const missing = inputs.filter(input => !paths.some(path => path === input || (path.endsWith('/**') && input.startsWith(path.slice(0, -2)))))

  expect(missing).toEqual([])
})
