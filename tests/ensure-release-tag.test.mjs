import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, test } from 'vitest'

import { ensureReleaseTag } from '../scripts/ensure-release-tag.mjs'

const tempDirs = []

const createFixture = ({ packageVersion = '9.8.7' } = {}) => {
  const root = mkdtempSync(join(tmpdir(), 'santi-release-tag-'))
  const packagePath = join(root, 'package.json')

  tempDirs.push(root)

  mkdirSync(root, { recursive: true })

  writeFileSync(packagePath, JSON.stringify({ version: packageVersion }, null, 2))

  return {
    packagePath
  }
}

const createGitRunner = ({ localTag = false, remoteTag = false } = {}) => {
  const calls = []

  const run = (command, args) => {
    calls.push([command, args])

    if (args[0] === 'tag' && args[1] === '--list') {
      return localTag ? `${args[2]}\n` : ''
    }

    if (args[0] === 'ls-remote') {
      return remoteTag ? `abc123\trefs/tags/${args[3]}\n` : ''
    }

    if (args[0] === 'config' && args[1] === '--get') {
      throw new Error('unset git identity')
    }

    return ''
  }

  return {
    calls,
    run
  }
}

afterEach(() => {
  while (tempDirs.length > 0) {
    rmSync(tempDirs.pop(), {
      force: true,
      recursive: true
    })
  }
})

describe('release tag creation', () => {
  test('creates and pushes an annotated version tag when it is missing', () => {
    const fixture = createFixture()
    const git = createGitRunner()

    expect(ensureReleaseTag({ packagePath: fixture.packagePath, run: git.run })).toEqual({
      action: 'created',
      tagName: 'v9.8.7'
    })

    expect(git.calls).toContainEqual(['git', ['tag', '-a', 'v9.8.7', '-m', 'v9.8.7']])

    expect(git.calls).toContainEqual(['git', ['push', 'origin', 'refs/tags/v9.8.7']])
  })

  test('skips when the version tag already exists on the remote', () => {
    const fixture = createFixture()
    const git = createGitRunner({ remoteTag: true })

    expect(ensureReleaseTag({ packagePath: fixture.packagePath, run: git.run })).toEqual({
      action: 'skipped',
      reason: 'v9.8.7 already exists on origin',
      tagName: 'v9.8.7'
    })

    expect(git.calls).not.toContainEqual(['git', ['tag', '-a', 'v9.8.7', '-m', 'v9.8.7']])

    expect(git.calls).not.toContainEqual(['git', ['push', 'origin', 'refs/tags/v9.8.7']])
  })

  test('pushes an existing local version tag when the remote is missing it', () => {
    const fixture = createFixture()
    const git = createGitRunner({ localTag: true })

    expect(ensureReleaseTag({ packagePath: fixture.packagePath, run: git.run })).toEqual({
      action: 'pushed',
      tagName: 'v9.8.7'
    })

    expect(git.calls).not.toContainEqual(['git', ['tag', '-a', 'v9.8.7', '-m', 'v9.8.7']])

    expect(git.calls).toContainEqual(['git', ['push', 'origin', 'refs/tags/v9.8.7']])
  })
})
