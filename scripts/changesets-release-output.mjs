import { spawnSync } from 'node:child_process'
import { appendFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

export const changesetsReleaseTag = (name, version) => `${name}@${version}`

export const shouldReportChangesetsRelease = ({ currentVersion, previousVersion, releaseExists }) => (
  previousVersion !== undefined
  && previousVersion !== currentVersion
  && !releaseExists
)

export const writeChangesetsRelease = ({
  name,
  outputPath,
  version,
  tag = changesetsReleaseTag(name, version),
}) => {

  mkdirSync(dirname(outputPath), { recursive: true })

  appendFileSync(outputPath, `${JSON.stringify({ type: 'git-tag', tag, packageName: name })}\n`)

  return tag
}

const readPreviousPackageVersion = ({ directory, root }) => {
  const packagePath = `${directory}/package.json`

  const result = spawnSync('git', ['show', `HEAD^:${packagePath}`], {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  if (result.error) {
    throw result.error
  }

  if (result.status !== 0) {
    throw new Error(`Unable to read ${packagePath} from the parent commit: ${result.stderr.trim()}`)
  }

  return JSON.parse(result.stdout).version
}

const githubReleaseExists = async (tag) => {
  const repository = process.env.GITHUB_REPOSITORY
  const token = process.env.GITHUB_TOKEN

  if (!repository || !token) {
    throw new Error('GITHUB_REPOSITORY and GITHUB_TOKEN are required to report Changesets releases.')
  }

  const apiUrl = process.env.GITHUB_API_URL || 'https://api.github.com'

  const response = await fetch(`${apiUrl}/repos/${repository}/releases/tags/${encodeURIComponent(tag)}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })

  if (response.status === 404) {
    return false
  }

  if (!response.ok) {
    throw new Error(`Unable to check GitHub Release ${tag}: ${response.status} ${response.statusText}`)
  }

  return true
}

export const reportChangesetsRelease = async ({
  directory,
  name,
  outputPath = process.env.CHANGESETS_OUTPUT,
  root,
  version,
  tag = changesetsReleaseTag(name, version),
}) => {
  if (!outputPath) {
    return false
  }

  const previousVersion = readPreviousPackageVersion({ directory, root })
  const releaseExists = await githubReleaseExists(tag)

  if (!shouldReportChangesetsRelease({ currentVersion: version, previousVersion, releaseExists })) {
    return false
  }

  writeChangesetsRelease({ name, outputPath, tag, version })

  console.log(`Reported ${tag} to Changesets for tag and GitHub Release creation.`)

  return true
}
