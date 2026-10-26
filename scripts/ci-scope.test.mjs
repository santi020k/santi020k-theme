import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

import { classifyPaths, gitEnvironment, planScope, selectValidationScripts } from './ci-scope.mjs'

test('only known website sources can skip independent theme checks', () => {
  for (const paths of [['apps/website/src/pages/index.astro'], ['apps/vscode-website/public/example.svg'], ['apps/terminal-website/tests/site.test.mjs']]) {
    assert.deepEqual(classifyPaths(paths), { mode: 'affected' })
  }

  for (const paths of [[], ['apps/website/package.json'], ['apps/website/astro.config.mjs'], ['apps/new-website/src/page.astro'], ['packages/theme/src/index.ts'], ['docs/iphone-setup.md'], ['scripts/check-ci.mjs'], ['pnpm-lock.yaml'], ['.github/workflows/validate.yml'], ['apps/website/src/page.astro', '.changeset/release.md']]) {
    assert.deepEqual(classifyPaths(paths), { mode: 'full' })
  }
})

test('website selection retains shared contracts and new canonical checks', () => {
  const command = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8')).scripts.validate
  const scripts = selectValidationScripts(command)

  for (const required of ['test:ci', 'test', 'typecheck', 'build', 'lint', 'lint:spell', 'lint:knip', 'check:brand-assets', 'validate:marketplace', 'report:accessibility', 'validate:seo', 'validate:eslint-config']) {
    assert.ok(scripts.includes(required), required)
  }

  assert.ok(!scripts.includes('package:extension'))

  assert.ok(!scripts.includes('validate:themes'))

  assert.ok(selectValidationScripts(`${command} && pnpm run check:new`).includes('check:new'))

  assert.deepEqual(selectValidationScripts(`${command} && node custom.mjs`), ['validate'])
})

test('release, push, dispatch and uncertain history retain full validation', () => {
  for (const env of [{ GITHUB_HEAD_REF: 'release/v3.1.0' }, { GITHUB_HEAD_REF: 'changeset-release/main' }, { GITHUB_EVENT_NAME: 'push' }, { GITHUB_EVENT_NAME: 'workflow_dispatch' }]) {
    assert.equal(planScope({ base: 'HEAD', env }).mode, 'full')
  }

  assert.equal(planScope({ base: 'missing', env: {} }).mode, 'full')

  assert.equal(planScope({ base: 'HEAD', full: true, env: {} }).mode, 'full')
})

test('real Git history includes both rename sides, deletions and local files', () => {
  const cwd = mkdtempSync(join(tmpdir(), 'theme-ci-scope-'))
  const env = { ...gitEnvironment(), GITHUB_EVENT_NAME: 'pull_request', GITHUB_HEAD_REF: 'ci/fixture' }
  const git = (...args) => execFileSync('git', args, { cwd, env, stdio: 'pipe' })

  const write = (path, content) => {
    mkdirSync(join(cwd, path, '..'), { recursive: true })

    writeFileSync(join(cwd, path), content)
  }

  try {
    git('init', '-q', '-b', 'main')

    git('config', 'user.name', 'CI fixture')

    git('config', 'user.email', 'ci@example.test')

    write('apps/website/src/deleted.astro', '<p>Original</p>')

    write('packages/theme/moved.ts', '// Original')

    git('add', '.')

    git('commit', '-qm', 'fixture')

    git('branch', 'feature')

    write('unrelated-base-file', 'base only')

    git('add', '.')

    git('commit', '-qm', 'base')

    git('switch', 'feature')

    git('rm', 'apps/website/src/deleted.astro')

    git('commit', '-qm', 'remove website')

    const poisoned = { ...env, GIT_DIR: '/missing', GIT_WORK_TREE: '/missing' }

    assert.equal(planScope({ cwd, base: 'main', env: poisoned }).mode, 'affected')

    write('apps/website/src/ leading\nname.astro', '<p>New</p>')

    assert.equal(planScope({ cwd, base: 'main', env }).mode, 'affected')

    write('local-config.json', '{}')

    assert.equal(planScope({ cwd, base: 'main', env }).mode, 'full')

    git('add', 'local-config.json')

    assert.equal(planScope({ cwd, base: 'main', env }).mode, 'full')

    const head = git('rev-parse', 'HEAD').toString().trim()

    assert.equal(planScope({ cwd, base: 'main', head, env }).mode, 'affected')

    git('rm', '--cached', 'local-config.json')

    git('mv', 'packages/theme/moved.ts', 'apps/website/src/moved.ts')

    git('commit', '-qm', 'move package source into docs')

    assert.equal(planScope({ cwd, base: 'main', head: git('rev-parse', 'HEAD').toString().trim(), env }).mode, 'full')
  } finally {
    rmSync(cwd, { recursive: true, force: true })
  }
})
