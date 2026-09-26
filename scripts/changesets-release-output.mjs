import { appendFileSync, mkdirSync } from 'node:fs'
import { dirname } from 'node:path'

export const changesetsReleaseTag = (name, version) => `${name}@${version}`

export const shouldReportChangesetsRelease = ({ currentVersion, previousVersion, releaseExists }) => (
  previousVersion !== undefined
  && previousVersion !== currentVersion
  && !releaseExists
)

export const writeChangesetsRelease = ({ name, outputPath, version }) => {
  const tag = changesetsReleaseTag(name, version)

  mkdirSync(dirname(outputPath), { recursive: true })

  appendFileSync(outputPath, `${JSON.stringify({ type: 'git-tag', tag, packageName: name })}\n`)

  return tag
}
