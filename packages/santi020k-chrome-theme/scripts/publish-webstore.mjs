#!/usr/bin/env node
/**
 * Uploads and submits the packaged Chrome theme variants to the Chrome Web Store.
 *
 * Required environment variables:
 * - CHROME_WEBSTORE_CLIENT_ID
 * - CHROME_WEBSTORE_CLIENT_SECRET
 * - CHROME_WEBSTORE_REFRESH_TOKEN
 * - CHROME_WEBSTORE_PUBLISHER_ID
 */

import { existsSync, readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'

const __dir = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dir, '..')
const OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const WEBSTORE_API_BASE = 'https://chromewebstore.googleapis.com'
const CHROME_WEBSTORE_SCOPE = 'https://www.googleapis.com/auth/chromewebstore'
const UPLOAD_POLL_ATTEMPTS = 24
const UPLOAD_POLL_INTERVAL_MS = 5000

const DEFAULT_VARIANTS = [
  {
    artifact: 'dist/santi020k-chrome-theme.zip',
    itemId: 'cljcifjjgolaplmemjcnjhkjfoneadgj',
    itemIdEnv: 'CHROME_WEBSTORE_DARK_ITEM_ID',
    manifest: 'manifest.json',
    name: 'dark'
  },
  {
    artifact: 'dist/santi020k-chrome-theme-light.zip',
    itemId: 'ekehaoadgcihpkajlnbpkankaginojci',
    itemIdEnv: 'CHROME_WEBSTORE_LIGHT_ITEM_ID',
    manifest: 'manifest-light.json',
    name: 'light'
  }
]

const args = process.argv.slice(2)
const dryRun = args.includes('--dry-run')

const variantFilter = args
  .find(arg => arg.startsWith('--variant='))
  ?.replace('--variant=', '')

const booleanEnv = (name, fallback = false) => {
  const value = process.env[name]

  if (value === undefined || value === '') return fallback

  return value === '1' || value.toLowerCase() === 'true'
}

const requiredEnv = name => {
  const value = process.env[name]

  if (!value) throw new Error(`${name} is required.`)

  return value
}

const readJson = path => JSON.parse(readFileSync(path, 'utf8'))

const readManifestVersion = manifestFile => {
  const manifestPath = join(root, manifestFile)

  if (!existsSync(manifestPath)) {
    throw new Error(`Expected manifest at ${manifestFile}.`)
  }

  const manifest = readJson(manifestPath)

  if (!manifest.version) {
    throw new Error(`${manifestFile} is missing version.`)
  }

  return manifest.version
}

const getSelectedVariants = () => {
  if (!variantFilter || variantFilter === 'all') return DEFAULT_VARIANTS

  const variant = DEFAULT_VARIANTS.find(entry => entry.name === variantFilter)

  if (!variant) {
    const names = DEFAULT_VARIANTS.map(entry => entry.name).join(', ')

    throw new Error(`Unknown variant "${variantFilter}". Expected one of: all, ${names}.`)
  }

  return [variant]
}

const parseResponseBody = async response => {
  const text = await response.text()

  if (!text) return null

  try {
    return JSON.parse(text)
  } catch {
    return text
  }
}

const formatApiError = body => {
  if (!body) return ''

  if (typeof body === 'string') return body

  if (body.error?.message) return body.error.message

  return JSON.stringify(body)
}

const webstoreRequest = async (path, options = {}) => {
  const { accessToken, headers, ...fetchOptions } = options

  const response = await fetch(`${WEBSTORE_API_BASE}${path}`, {
    ...fetchOptions,
    headers: {
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...headers
    }
  })

  const body = await parseResponseBody(response)

  if (!response.ok) {
    const detail = formatApiError(body)

    throw new Error(`${options.method ?? 'GET'} ${path} failed: ${response.status} ${response.statusText}${detail ? ` - ${detail}` : ''}`)
  }

  return body
}

const getAccessToken = async ({ clientId, clientSecret, refreshToken }) => {
  const params = new URLSearchParams({
    client_id: clientId,
    client_secret: clientSecret,
    grant_type: 'refresh_token',
    refresh_token: refreshToken
  })

  const response = await fetch(OAUTH_TOKEN_URL, {
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST'
  })

  const body = await parseResponseBody(response)

  if (!response.ok) {
    const detail = formatApiError(body)

    throw new Error(`Unable to refresh Chrome Web Store access token: ${response.status} ${response.statusText}${detail ? ` - ${detail}` : ''}`)
  }

  if (body.scope && !body.scope.split(' ').includes(CHROME_WEBSTORE_SCOPE)) {
    throw new Error(`Refresh token is missing ${CHROME_WEBSTORE_SCOPE} scope.`)
  }

  if (!body.access_token) {
    throw new Error('OAuth response did not include an access token.')
  }

  return body.access_token
}

const itemPath = (publisherId, itemId) => `/v2/publishers/${publisherId}/items/${itemId}`
const uploadPath = (publisherId, itemId) => `/upload/v2/publishers/${publisherId}/items/${itemId}:upload`

const getRevisionVersions = revisionStatus => new Set(
  revisionStatus?.distributionChannels
    ?.map(channel => channel.crxVersion)
    .filter(Boolean) ?? []
)

const getKnownVersions = status => ({
  published: getRevisionVersions(status.publishedItemRevisionStatus),
  submitted: getRevisionVersions(status.submittedItemRevisionStatus)
})

const getItemStatus = ({ accessToken, itemId, publisherId }) => webstoreRequest(`${itemPath(publisherId, itemId)}:fetchStatus`, {
  accessToken
})

const uploadStateSucceeded = state => state === 'SUCCEEDED'
const uploadStateInProgress = state => state === 'IN_PROGRESS' || state === 'UPLOAD_IN_PROGRESS'

const waitForUpload = async ({ accessToken, itemId, publisherId }) => {
  for (let attempt = 1; attempt <= UPLOAD_POLL_ATTEMPTS; attempt += 1) {
    await delay(UPLOAD_POLL_INTERVAL_MS)

    const status = await getItemStatus({ accessToken, itemId, publisherId })
    const state = status.lastAsyncUploadState

    if (uploadStateSucceeded(state)) return status

    if (state && !uploadStateInProgress(state)) {
      throw new Error(`Upload processing failed with state ${state}.`)
    }

    console.log(`  Upload still processing (${attempt}/${UPLOAD_POLL_ATTEMPTS})...`)
  }

  throw new Error('Timed out waiting for Chrome Web Store upload processing.')
}

const uploadPackage = async ({ accessToken, artifactPath, itemId, publisherId }) => {
  const packageBytes = await readFile(artifactPath)

  return webstoreRequest(uploadPath(publisherId, itemId), {
    accessToken,
    body: packageBytes,
    headers: {
      'Content-Type': 'application/zip'
    },
    method: 'POST'
  })
}

const publishItem = async ({ accessToken, itemId, publisherId }) => {
  const deployPercentage = process.env.CHROME_WEBSTORE_DEPLOY_PERCENTAGE

  const body = {
    blockOnWarnings: booleanEnv('CHROME_WEBSTORE_BLOCK_ON_WARNINGS', true),
    publishType: process.env.CHROME_WEBSTORE_PUBLISH_TYPE || 'DEFAULT_PUBLISH'
  }

  if (process.env.CHROME_WEBSTORE_SKIP_REVIEW !== undefined) {
    body.skipReview = booleanEnv('CHROME_WEBSTORE_SKIP_REVIEW')
  }

  if (deployPercentage) {
    const parsedDeployPercentage = Number.parseInt(deployPercentage, 10)

    if (!Number.isInteger(parsedDeployPercentage) || parsedDeployPercentage < 0 || parsedDeployPercentage > 100) {
      throw new Error('CHROME_WEBSTORE_DEPLOY_PERCENTAGE must be an integer from 0 to 100.')
    }

    body.deployInfos = [{ deployPercentage: parsedDeployPercentage }]
  }

  return webstoreRequest(`${itemPath(publisherId, itemId)}:publish`, {
    accessToken,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  })
}

const summarizeWarnings = response => {
  const warnings = response.warningInfo?.warnings ?? []

  for (const warning of warnings) {
    console.warn(`  Warning: ${warning.reason}${warning.description ? ` - ${warning.description}` : ''}`)
  }
}

const releaseVariant = async ({ accessToken, publisherId, variant }) => {
  const itemId = process.env[variant.itemIdEnv] || variant.itemId
  const artifactPath = join(root, variant.artifact)
  const version = readManifestVersion(variant.manifest)

  if (!existsSync(artifactPath)) {
    throw new Error(`Expected packaged Chrome theme at ${variant.artifact}. Run pnpm run package first.`)
  }

  console.log(`Preparing ${variant.name} Chrome theme ${version} (${itemId})...`)

  if (dryRun) {
    console.log(`  --dry-run: would upload ${variant.artifact} and submit it for review.`)

    return
  }

  const status = await getItemStatus({ accessToken, itemId, publisherId })
  const versions = getKnownVersions(status)

  if (versions.published.has(version)) {
    console.log(`  ${variant.name} ${version} is already published. Skipping.`)

    return
  }

  if (versions.submitted.has(version)) {
    console.log(`  ${variant.name} ${version} is already submitted for review. Skipping.`)

    return
  }

  const upload = await uploadPackage({ accessToken, artifactPath, itemId, publisherId })
  const uploadState = upload.uploadState

  if (uploadStateInProgress(uploadState)) {
    console.log('  Upload accepted; waiting for processing to finish...')

    await waitForUpload({ accessToken, itemId, publisherId })
  } else if (!uploadStateSucceeded(uploadState)) {
    throw new Error(`Upload failed with state ${uploadState ?? 'UNKNOWN'}.`)
  }

  if (upload.crxVersion && upload.crxVersion !== version) {
    throw new Error(`Uploaded version ${upload.crxVersion} does not match manifest version ${version}.`)
  }

  const published = await publishItem({ accessToken, itemId, publisherId })

  summarizeWarnings(published)

  console.log(`  Submitted ${variant.name} ${version} to the Chrome Web Store (${published.state}).`)
}

const main = async () => {
  const variants = getSelectedVariants()

  for (const variant of variants) {
    readManifestVersion(variant.manifest)
  }

  if (dryRun) {
    for (const variant of variants) {
      await releaseVariant({ accessToken: null, publisherId: 'DRY_RUN', variant })
    }

    return
  }

  const clientId = requiredEnv('CHROME_WEBSTORE_CLIENT_ID')
  const clientSecret = requiredEnv('CHROME_WEBSTORE_CLIENT_SECRET')
  const refreshToken = requiredEnv('CHROME_WEBSTORE_REFRESH_TOKEN')
  const publisherId = requiredEnv('CHROME_WEBSTORE_PUBLISHER_ID')
  const accessToken = await getAccessToken({ clientId, clientSecret, refreshToken })

  for (const variant of variants) {
    await releaseVariant({ accessToken, publisherId, variant })
  }
}

main().catch(error => {
  console.error('Error:', error.message)

  process.exit(1)
})
