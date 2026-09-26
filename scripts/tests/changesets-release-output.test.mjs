import { readFileSync } from 'node:fs'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

import { afterEach, describe, expect, test } from 'vitest'

import {
  changesetsReleaseTag,
  shouldReportChangesetsRelease,
  writeChangesetsRelease,
} from '../changesets-release-output.mjs'

const temporaryDirectories = []

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => rm(directory, {
    force: true,
    recursive: true,
  })))
})

describe('Changesets v2 release reporting', () => {
  test('does not report an unchanged historical package', () => {
    expect(shouldReportChangesetsRelease({
      currentVersion: '1.3.0',
      previousVersion: '1.3.0',
      releaseExists: false,
    })).toBe(false)
  })

  test('reports a changed package when the GitHub Release is missing', () => {
    expect(shouldReportChangesetsRelease({
      currentVersion: '2.0.0',
      previousVersion: '1.3.0',
      releaseExists: false,
    })).toBe(true)
  })

  test('does not report a changed package after its GitHub Release exists', () => {
    expect(shouldReportChangesetsRelease({
      currentVersion: '2.0.0',
      previousVersion: '1.3.0',
      releaseExists: true,
    })).toBe(false)
  })

  test('writes the Changesets v2 NDJSON event', async () => {
    const directory = await mkdtemp(join(tmpdir(), 'santi020k-changesets-output-'))
    const outputPath = join(directory, 'changesets.ndjson')

    temporaryDirectories.push(directory)

    expect(changesetsReleaseTag('@santi020k/theme', '2.0.0')).toBe('@santi020k/theme@2.0.0')

    expect(writeChangesetsRelease({
      name: '@santi020k/theme',
      outputPath,
      version: '2.0.0',
    })).toBe('@santi020k/theme@2.0.0')

    expect(readFileSync(outputPath, 'utf8')).toBe(`${JSON.stringify({
      type: 'git-tag',
      tag: '@santi020k/theme@2.0.0',
      packageName: '@santi020k/theme',
    })}\n`)
  })
})
