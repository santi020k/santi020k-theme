import { execFileSync, spawnSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { expect, it } from 'vitest'

const script = fileURLToPath(new URL('../../.github/scripts/website-inputs.mjs', import.meta.url))
const gitEnvironment = Object.fromEntries(Object.entries(process.env).filter(([name]) => !name.startsWith('GIT_')))

it('retains pending site changes through later prose commits and rejects stale website inputs', () => {
  const directory = mkdtempSync(join(tmpdir(), 'theme-deployment-'))
  const options = { cwd: directory, env: gitEnvironment, encoding: 'utf8' }
  const git = (...args) => execFileSync('git', args, options).trim()
  const compare = (before, after) => spawnSync(process.execPath, [script, before, after], options).status

  const commit = (path, contents) => {
    mkdirSync(dirname(join(directory, path)), { recursive: true })

    writeFileSync(join(directory, path), contents)

    git('add', path)

    git('commit', '-qm', 'test: candidate')

    return git('rev-parse', 'HEAD')
  }

  try {
    git('init', '--quiet')

    git('config', 'user.name', 'CI test')

    git('config', 'user.email', 'ci-test@example.invalid')

    const base = commit('README.md', 'base')
    const website = commit('apps/website/src/page.astro', 'website')
    const prose = commit('README.md', 'unrelated prose')

    expect(compare(base, website)).toBe(1)

    expect(compare(website, prose)).toBe(0)

    expect(compare(base, prose)).toBe(1)

    const dependency = commit('packages/theme/src/index.ts', 'changed shared theme')

    expect(compare(website, dependency)).toBe(1)

    expect(compare(dependency, dependency)).toBe(0)

    const auditConfig = commit('og.audit.config.mjs', 'changed SEO assertions')

    expect(compare(dependency, auditConfig)).toBe(1)

    const links = commit('scripts/check-website-links.mjs', 'changed link assertions')

    expect(compare(auditConfig, links)).toBe(1)


    const deleted = join(directory, 'apps/website/src/page.astro')

    rmSync(deleted)

    git('add', '-u')

    git('commit', '-qm', 'test: delete website input')

    expect(compare(links, git('rev-parse', 'HEAD'))).toBe(1)

    expect(compare('a'.repeat(40), dependency)).toBeGreaterThan(1)

    expect(compare('--help', dependency)).toBeGreaterThan(1)
  } finally {
    rmSync(directory, { recursive: true, force: true })
  }
})
