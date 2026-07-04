#!/usr/bin/env node
/**
 * Uploads and submits the packaged Chrome theme variants to the Chrome Web Store.
 *
 * Required environment variables:
 * - CHROME_WEBSTORE_PUBLISHER_ID
 * - CHROME_WEBSTORE_SERVICE_ACCOUNT_JSON
 */

import { createSign } from 'node:crypto'
import { existsSync, readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'

import { chromeThemeVariantManifests } from '@santi020k/theme'

const __dir = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dir, '..')
const OAUTH_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const WEBSTORE_API_BASE = 'https://chromewebstore.googleapis.com'
const CHROME_WEBSTORE_SCOPE = 'https://www.googleapis.com/auth/chromewebstore'
const CHROME_WEBSTORE_SCOPE_URL = new URL(CHROME_WEBSTORE_SCOPE)
const SERVICE_ACCOUNT_GUIDE = 'packages/santi020k-chrome-theme/store/PUBLISHING.md#service-account-authentication'
const UPLOAD_POLL_ATTEMPTS = 24
const UPLOAD_POLL_INTERVAL_MS = 5000

const WEBSTORE_ITEMS = new Map([
  ['dark', {
    itemId: 'cljcifjjgolaplmemjcnjhkjfoneadgj',
    itemIdOverride: () => process.env.CHROME_WEBSTORE_DARK_ITEM_ID
  }],
  ['light', {
    itemId: 'ekehaoadgcihpkajlnbpkankaginojci',
    itemIdOverride: () => process.env.CHROME_WEBSTORE_LIGHT_ITEM_ID
  }]
])

const getWebstoreItem = name => {
  const item = WEBSTORE_ITEMS.get(name)

  if (!item) {
    throw new Error(`Missing Chrome Web Store item configuration for ${name}.`)
  }

  return item
}

const DEFAULT_VARIANTS = Object.entries(chromeThemeVariantManifests).map(([name, config]) => ({
  artifact: `dist/${config.output}`,
  name,
  ...config,
  ...getWebstoreItem(name)
}))

const args = process.argv.slice(2)
const authCheck = args.includes('--check-auth')
const dryRun = args.includes('--dry-run')

const variantFilter = args
  .find(arg => arg.startsWith('--variant='))
  ?.replace('--variant=', '')

const booleanValue = (value, fallback = false) => {
  if (value === undefined || value === '') return fallback

  return value === '1' || value.toLowerCase() === 'true'
}

const requiredValue = (name, value) => {
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

const formatServiceAccountTokenError = ({ body, response }) => {
  const detail = formatApiError(body)

  const lines = [
    `Unable to mint Chrome Web Store access token from service account: ${response.status} ${response.statusText}${detail ? ` - ${detail}` : ''}`
  ]

  if (body?.error === 'invalid_grant') {
    lines.push(
      'The configured CHROME_WEBSTORE_SERVICE_ACCOUNT_JSON is not usable. Check that the JSON key is active, belongs to the service account added in the Chrome Web Store Developer Dashboard, and has the Chrome Web Store API enabled in its Google Cloud project.',
      `See ${SERVICE_ACCOUNT_GUIDE}.`
    )
  }

  return lines.join('\n')
}

const isChromeWebstoreScope = scope => {
  try {
    const url = new URL(scope)

    return (
      url.origin === CHROME_WEBSTORE_SCOPE_URL.origin &&
      url.pathname === CHROME_WEBSTORE_SCOPE_URL.pathname &&
      url.username === '' &&
      url.password === '' &&
      url.search === '' &&
      url.hash === ''
    )
  } catch {
    return false
  }
}

const hasChromeWebstoreScope = scope => (
  typeof scope === 'string' &&
  scope
    .trim()
    .split(/\s+/u)
    .some(entry => isChromeWebstoreScope(entry))
)

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

const base64UrlJson = value => Buffer
  .from(JSON.stringify(value))
  .toString('base64url')

const createServiceAccountAssertion = ({ clientEmail, privateKey }) => {
  const now = Math.floor(Date.now() / 1000)

  const header = {
    alg: 'RS256',
    typ: 'JWT'
  }

  const claims = {
    aud: OAUTH_TOKEN_URL,
    exp: now + 3600,
    iat: now,
    iss: clientEmail,
    scope: CHROME_WEBSTORE_SCOPE
  }

  const unsignedToken = `${base64UrlJson(header)}.${base64UrlJson(claims)}`

  const signature = createSign('RSA-SHA256')
    .update(unsignedToken)
    .end()
    .sign(privateKey)
    .toString('base64url')

  return `${unsignedToken}.${signature}`
}

const getServiceAccountAccessToken = async ({ clientEmail, privateKey }) => {
  const params = new URLSearchParams([
    ['assertion', createServiceAccountAssertion({ clientEmail, privateKey })],
    ['grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer']
  ])

  const response = await fetch(OAUTH_TOKEN_URL, {
    body: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    method: 'POST'
  })

  const body = await parseResponseBody(response)

  if (!response.ok) {
    throw new Error(formatServiceAccountTokenError({ body, response }))
  }

  if (body.scope && !hasChromeWebstoreScope(body.scope)) {
    throw new Error(`Service account access token is missing ${CHROME_WEBSTORE_SCOPE} scope.`)
  }

  if (!body.access_token) {
    throw new Error('Service account OAuth response did not include an access token.')
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

const parseServiceAccount = value => {
  let serviceAccount

  try {
    serviceAccount = JSON.parse(value)
  } catch (error) {
    throw new Error('CHROME_WEBSTORE_SERVICE_ACCOUNT_JSON must be a valid Google service account JSON key.', { cause: error })
  }

  const clientEmail = requiredValue('CHROME_WEBSTORE_SERVICE_ACCOUNT_JSON.client_email', serviceAccount.client_email)
  const privateKey = requiredValue('CHROME_WEBSTORE_SERVICE_ACCOUNT_JSON.private_key', serviceAccount.private_key)

  return {
    clientEmail,
    privateKey
  }
}

const getCredentials = () => {
  const publisherId = requiredValue('CHROME_WEBSTORE_PUBLISHER_ID', process.env.CHROME_WEBSTORE_PUBLISHER_ID)
  const serviceAccountJson = requiredValue('CHROME_WEBSTORE_SERVICE_ACCOUNT_JSON', process.env.CHROME_WEBSTORE_SERVICE_ACCOUNT_JSON)

  return {
    publisherId,
    serviceAccount: parseServiceAccount(serviceAccountJson)
  }
}

const checkAuth = async variants => {
  const credentials = getCredentials()
  const accessToken = await getServiceAccountAccessToken(credentials.serviceAccount)

  for (const variant of variants) {
    const itemId = variant.itemIdOverride() || variant.itemId

    await getItemStatus({ accessToken, itemId, publisherId: credentials.publisherId })

    console.log(`Chrome Web Store credentials can access ${variant.name} item ${itemId}.`)
  }
}

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
    blockOnWarnings: booleanValue(process.env.CHROME_WEBSTORE_BLOCK_ON_WARNINGS, true),
    publishType: process.env.CHROME_WEBSTORE_PUBLISH_TYPE || 'DEFAULT_PUBLISH'
  }

  if (process.env.CHROME_WEBSTORE_SKIP_REVIEW !== undefined) {
    body.skipReview = booleanValue(process.env.CHROME_WEBSTORE_SKIP_REVIEW)
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
  const itemId = variant.itemIdOverride() || variant.itemId
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

  if (authCheck) {
    await checkAuth(variants)

    console.log('Chrome Web Store credentials are valid.')

    return
  }

  for (const variant of variants) {
    readManifestVersion(variant.manifest)
  }

  if (dryRun) {
    for (const variant of variants) {
      await releaseVariant({ accessToken: null, publisherId: 'DRY_RUN', variant })
    }

    return
  }

  const credentials = getCredentials()
  const accessToken = await getServiceAccountAccessToken(credentials.serviceAccount)

  for (const variant of variants) {
    await releaseVariant({ accessToken, publisherId: credentials.publisherId, variant })
  }
}

main().catch(error => {
  console.error('Error:', error.message)

  process.exit(1)
})
