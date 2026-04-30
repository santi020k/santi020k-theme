import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const defaultRun = (command, args, options = {}) => execFileSync(command, args, {
  encoding: 'utf8',
  stdio: ['ignore', 'pipe', 'pipe'],
  ...options
})

const gitConfigExists = (key, run) => {
  try {
    run('git', ['config', '--get', key])

    return true
  } catch {
    return false
  }
}

const ensureGitIdentity = run => {
  if (!gitConfigExists('user.name', run)) {
    run('git', ['config', 'user.name', 'github-actions[bot]'])
  }

  if (!gitConfigExists('user.email', run)) {
    run('git', ['config', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com'])
  }
}

const hasLocalTag = (tagName, run) => run('git', ['tag', '--list', tagName]).trim() === tagName

const hasRemoteTag = (tagName, remote, run) => {
  try {
    return run('git', ['ls-remote', '--tags', remote, tagName]).trim().length > 0
  } catch {
    return false
  }
}

export const ensureReleaseTag = ({
  packagePath = 'package.json',
  remote = 'origin',
  run = defaultRun
} = {}) => {
  const pkg = JSON.parse(readFileSync(packagePath, 'utf8'))
  const tagName = `v${pkg.version}`
  const localTagExists = hasLocalTag(tagName, run)
  const remoteTagExists = hasRemoteTag(tagName, remote, run)

  if (remoteTagExists) {
    return {
      action: 'skipped',
      reason: `${tagName} already exists on ${remote}`,
      tagName
    }
  }

  if (!localTagExists) {
    ensureGitIdentity(run)

    run('git', ['tag', '-a', tagName, '-m', tagName])
  }

  run('git', ['push', remote, `refs/tags/${tagName}`])

  return {
    action: localTagExists ? 'pushed' : 'created',
    tagName
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const result = ensureReleaseTag()

  if (result.reason) {
    console.log(result.reason)
  } else {
    console.log(`${result.action} ${result.tagName}`)
  }
}
