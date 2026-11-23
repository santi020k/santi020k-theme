import assert from 'node:assert/strict'
import { execFileSync, spawnSync } from 'node:child_process'
import { chmodSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'

import { classifyPaths, gitEnvironment, planAppearance, planScope, requiresAppearance, selectValidationScripts } from './ci-scope.mjs'

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

test('native appearance validation follows its sources and stays on when uncertain', () => {
  for (const paths of [[], ['artwork/minimal-v2/halo-dark-desktop.png'], ['artwork/appearance/manifest.json'], ['artwork/wallpaper-catalog.mjs'], ['scripts/wallpapers/appearance.swift'], ['scripts/build-appearance-wallpapers.mjs'], ['scripts/ci-scope.mjs'], ['.github/workflows/validate.yml'], ['apps/website/src/page.astro', 'artwork/banner-catalog.mjs']]) {
    assert.equal(requiresAppearance(paths), true, paths.join(', '))
  }

  for (const paths of [['apps/website/src/page.astro'], ['packages/theme/src/index.ts'], ['scripts/check-ci.mjs'], ['pnpm-lock.yaml'], ['.github/workflows/release.yml'], ['docs/artwork/notes.md']]) {
    assert.equal(requiresAppearance(paths), false, paths.join(', '))
  }

  const cwd = mkdtempSync(join(tmpdir(), 'theme-ci-appearance-'))
  const env = { ...gitEnvironment(), GITHUB_EVENT_NAME: 'pull_request', GITHUB_HEAD_REF: 'ci/fixture' }
  const git = (...args) => execFileSync('git', args, { cwd, env, stdio: 'pipe' }).toString().trim()

  const commit = path => {
    mkdirSync(join(cwd, path, '..'), { recursive: true })

    writeFileSync(join(cwd, path), 'fixture')

    git('add', '.')

    git('commit', '-qm', 'fixture')

    return git('rev-parse', 'HEAD')
  }

  try {
    git('init', '-q', '-b', 'main')

    git('config', 'user.name', 'CI fixture')

    git('config', 'user.email', 'ci@example.test')

    const base = commit('README.md')
    const website = commit('apps/website/src/page.astro')

    assert.equal(planAppearance({ cwd, base, head: website, env }), false)

    assert.equal(planAppearance({ cwd, base, head: website, env: { ...env, GITHUB_EVENT_NAME: 'push', GITHUB_HEAD_REF: '' } }), false)

    for (const override of [{ GITHUB_HEAD_REF: 'release/v3.2.0' }, { GITHUB_HEAD_REF: 'changeset-release/main' }, { GITHUB_EVENT_NAME: 'workflow_dispatch' }, { GITHUB_EVENT_NAME: undefined }]) {
      assert.equal(planAppearance({ cwd, base, head: website, env: { ...env, ...override } }), true)
    }

    assert.equal(planAppearance({ cwd, base, head: website, full: true, env }), true)

    assert.equal(planAppearance({ cwd, head: website, env }), true)

    assert.equal(planAppearance({ cwd, base: '0000000000000000000000000000000000000000', head: website, env }), true)

    const artwork = commit('artwork/minimal-v2/halo-dark-desktop.png')

    assert.equal(planAppearance({ cwd, base, head: artwork, env }), true)

    assert.equal(planAppearance({ cwd, base: website, head: artwork, env }), true)
  } finally {
    rmSync(cwd, { recursive: true, force: true })
  }
})

test('pull request metadata uses live title and labels before requiring a changeset', () => {
  const cwd = mkdtempSync(join(tmpdir(), 'theme-pr-metadata-'))

  const stub = (name, body) => {
    writeFileSync(join(cwd, name), `#!/usr/bin/env bash\nset -eu\n${body}\n`)

    chmodSync(join(cwd, name), 0o755)
  }

  // The stubs record each call; commitprompt accepts only the conventional fixture title.
  stub('gh', 'echo "gh $*" >> "$MOCK_LOG"\nprintf "%s" "$MOCK_METADATA"')

  stub('pnpm', `echo "pnpm $*" >> "$MOCK_LOG"
if [[ "$1" == exec ]]; then [[ "$(cat)" == 'ci: speed up validation' ]]; exit; fi
exit "$MOCK_CHANGESET_STATUS"`)

  const run = (metadata, changesetStatus = 0, environment = {}) => {
    const log = join(cwd, 'calls.log')

    writeFileSync(log, '')

    const result = spawnSync('bash', ['scripts/check-pr-metadata.sh'], {
      encoding: 'utf8',
      env: { PATH: `${cwd}:${process.env.PATH}`, PR_NUMBER: '7', GITHUB_REPOSITORY: 'owner/name', MOCK_LOG: log, MOCK_METADATA: JSON.stringify(metadata), MOCK_CHANGESET_STATUS: String(changesetStatus), ...environment },
    })

    return { status: result.status, calls: readFileSync(log, 'utf8').trim().split('\n') }
  }

  const title = 'ci: speed up validation'
  const changeset = 'pnpm changeset status --since=origin/main'

  try {
    const complete = run({ title, labels: [{ name: 'ci' }], headRefName: 'ci/faster-pipelines' })

    assert.equal(complete.status, 0)

    assert.deepEqual(complete.calls, ['gh pr view 7 --repo owner/name --json title,labels,headRefName', 'pnpm exec commitprompt validate --input -', changeset])

    assert.notEqual(run({ title, labels: [], headRefName: 'ci/faster-pipelines' }, 1).status, 0)

    const invalid = run({ title: 'Speed up validation', labels: [{ name: 'skip-changelog' }], headRefName: 'ci/faster-pipelines' })

    assert.notEqual(invalid.status, 0)

    assert.ok(!invalid.calls.includes(changeset))

    for (const metadata of [{ title, labels: [{ name: 'skip-changelog' }], headRefName: 'ci/faster-pipelines' }, { title, labels: [], headRefName: 'changeset-release/main' }]) {
      const skipped = run(metadata, 1)

      assert.equal(skipped.status, 0)

      assert.ok(!skipped.calls.includes(changeset))
    }

    assert.notEqual(run({ title, labels: [], headRefName: 'ci/faster-pipelines' }, 0, { PR_NUMBER: '' }).status, 0)
  } finally {
    rmSync(cwd, { recursive: true, force: true })
  }
})
