import { access, readdir,readFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const sites = [
  {
    name: 'theme hub',
    root: resolve(repoRoot, 'apps/website'),
    baseUrl: 'https://theme.santi020k.com/'
  },
  {
    name: 'VS Code website',
    root: resolve(repoRoot, 'apps/vscode-website'),
    baseUrl: 'https://vscode.santi020k.com/'
  },
  {
    name: 'Chrome website',
    root: resolve(repoRoot, 'apps/chrome-website'),
    baseUrl: 'https://chrome.santi020k.com/'
  },
  {
    name: 'Terminal website',
    root: resolve(repoRoot, 'apps/terminal-website'),
    baseUrl: 'https://terminal.santi020k.com/'
  }
]

const externalRequestHeaders = {
  'user-agent': 'santi020k-theme-link-check/1.0 (+https://github.com/santi020k/santi020k-theme)'
}

const fileExists = async path => {
  try {
    await access(path)

    return true
  } catch {
    return false
  }
}

const listPublicFiles = async dir => {
  if (!(await fileExists(dir))) return []

  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const entryPath = join(dir, entry.name)

    if (entry.isDirectory()) {
      const childFiles = await listPublicFiles(entryPath)

      files.push(...childFiles)
    } else if (entry.isFile()) {
      files.push(entryPath)
    }
  }

  return files
}

const readSiteFiles = async site => {
  const publicDir = join(site.root, 'public')
  const publicFiles = await listPublicFiles(publicDir)
  const pageFiles = await listPublicFiles(join(site.root, 'src/pages'))

  const checkablePublicFiles = publicFiles.filter(file =>
    /\.(?:html|txt|xml|webmanifest)$/u.test(file)
  )

  return [
    ...pageFiles.filter(file => file.endsWith('.astro')),
    ...checkablePublicFiles
  ]
}

const getAttributes = tag => {
  const attrs = new Map()
  // eslint-disable-next-line security/detect-unsafe-regex
  const attrPattern = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/gu

  for (const match of tag.matchAll(attrPattern)) {
    const [, name, doubleQuotedValue, singleQuotedValue, unquotedValue] = match
    const value = doubleQuotedValue ?? singleQuotedValue ?? unquotedValue ?? ''

    attrs.set(name.toLowerCase(), value)
  }

  return attrs
}

const splitSrcset = value => value
  .split(',')
  .map(candidate => candidate.trim().split(/\s+/u)[0])
  .filter(Boolean)

const isLinkReference = value =>
  value.startsWith('#') ||
  value.startsWith('/') ||
  value.startsWith('http://') ||
  value.startsWith('https://') ||
  value.startsWith('mailto:')

const isMetadataReference = value =>
  value.startsWith('/') ||
  value.startsWith('http://') ||
  value.startsWith('https://')

const extractTagReferences = html => {
  const references = []
  // eslint-disable-next-line security/detect-unsafe-regex
  const tagPattern = /<([a-z][\w:-]*)(?:\s[^<>]*)?>/giu

  for (const match of html.matchAll(tagPattern)) {
    const [tag, tagName] = match
    const attrs = getAttributes(tag)
    const rel = attrs.get('rel') ?? ''

    if (rel.split(/\s+/u).includes('preconnect')) continue

    for (const attrName of ['href', 'src', 'content']) {
      const value = attrs.get(attrName)

      const isReference = attrName === 'content'
        ? isMetadataReference(value ?? '')
        : value && isLinkReference(value)

      if (isReference) {
        references.push({
          source: `<${tagName.toLowerCase()} ${attrName}>`,
          value
        })
      }
    }

    const srcset = attrs.get('srcset')

    if (srcset) {
      for (const value of splitSrcset(srcset)) {
        if (isLinkReference(value)) {
          references.push({
            source: `<${tagName.toLowerCase()} srcset>`,
            value
          })
        }
      }
    }
  }

  return references
}

const extractInlineUrls = text => {
  const references = []
  const urlPattern = /https?:\/\/[^\s"'<>)\\]+/gu

  for (const match of text.matchAll(urlPattern)) {
    references.push({
      source: 'inline URL',
      value: match[0]
    })
  }

  return references
}

const stripTags = text => text.replaceAll(/<[^>]*>/gu, ' ')

const extractIds = html => {
  const ids = new Set()
  const idPattern = /\sid=(?:"([^"]+)"|'([^']+)'|([^\s"'<>`]+))/gu

  for (const match of html.matchAll(idPattern)) {
    ids.add(match[1] ?? match[2] ?? match[3])
  }

  return ids
}

const normalizeLocalPath = value => {
  const url = new URL(value, 'https://local.invalid')
  const pathname = decodeURIComponent(url.pathname)

  if (pathname === '/') return '/index.html'

  return pathname.endsWith('/') ? `${pathname}index.html` : pathname
}

const resolveLocalCandidates = (site, value) => {
  const pathname = normalizeLocalPath(value).slice(1)
  let route = pathname.replace(/\.html$/u, '')

  if (pathname.endsWith('/index.html')) route = pathname.slice(0, -'/index.html'.length)

  return [
    resolve(site.root, pathname),
    resolve(site.root, 'public', pathname),
    ...(pathname === 'index.html'
      ? [resolve(site.root, 'src/pages/index.astro')]
      : [
          resolve(site.root, 'src/pages', `${route}.astro`),
          resolve(site.root, 'src/pages', route, 'index.astro')
        ])
  ]
}

const checkLocalReference = async (site, file, ids, ref) => {
  if (ref.value.startsWith('#')) {
    const id = decodeURIComponent(ref.value.slice(1))

    if (id && !ids.has(id)) {
      return `${site.name}: ${ref.value} in ${file} points to a missing section id`
    }

    return
  }

  if (!ref.value.startsWith('/')) return

  const candidates = resolveLocalCandidates(site, ref.value)

  for (const candidate of candidates) {
    if (await fileExists(candidate)) return
  }

  return `${site.name}: ${ref.value} in ${file} does not exist under the app root or public directory`
}

const checkExternalReference = async url => {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 15000)

  const request = method => fetch(url, {
    headers: externalRequestHeaders,
    method,
    redirect: 'follow',
    signal: controller.signal
  })

  try {
    let response = await request('HEAD')

    if (response.status < 200 || response.status >= 400) {
      response = await request('GET')
    }

    if (response.status < 200 || response.status >= 400) {
      return `${url} returned HTTP ${response.status}`
    }

    
  } catch (error) {
    const reason = error.cause?.code
      ? `${error.message} (${error.cause.code})`
      : error.message

    return `${url} could not be reached: ${reason}`
  } finally {
    clearTimeout(timeout)
  }
}

const uniqueReferences = references => {
  const seen = new Set()
  const unique = []

  for (const ref of references) {
    if (seen.has(ref.value)) continue

    seen.add(ref.value)

    unique.push(ref)
  }

  return unique
}

const checkSite = async site => {
  const files = await readSiteFiles(site)
  const externalUrls = new Set()
  const failures = []
  let localReferenceCount = 0

  for (const filePath of files) {
    const text = await readFile(filePath, 'utf8')
    const relativeFile = filePath.slice(repoRoot.length + 1)
    const ids = extractIds(text)

    const references = uniqueReferences([
      ...extractTagReferences(text),
      ...extractInlineUrls(stripTags(text))
    ])

    for (const ref of references) {
      if (ref.value.startsWith('http://') || ref.value.startsWith('https://')) {
        const internalSite = sites.find(candidate => ref.value.startsWith(candidate.baseUrl))

        if (internalSite) {
          const localValue = new URL(ref.value).pathname
          const failure = await checkLocalReference(internalSite, relativeFile, ids, { ...ref, value: localValue })

          localReferenceCount += 1

          if (failure) failures.push(failure)

          continue
        }

        externalUrls.add(ref.value)

        continue
      }

      if (ref.value.startsWith('mailto:')) continue

      localReferenceCount += 1

      const failure = await checkLocalReference(site, relativeFile, ids, ref)

      if (failure) failures.push(failure)
    }
  }

  return {
    externalUrls,
    failures,
    localReferenceCount,
    name: site.name
  }
}

const main = async () => {
  const siteResults = []
  const externalUrls = new Set()

  for (const site of sites) {
    const result = await checkSite(site)

    siteResults.push(result)

    for (const url of result.externalUrls) {
      externalUrls.add(url)
    }
  }

  const failures = siteResults.flatMap(result => result.failures)

  for (const url of externalUrls) {
    const failure = await checkExternalReference(url)

    if (failure) failures.push(failure)
  }

  for (const result of siteResults) {
    console.log(`${result.name}: ${result.localReferenceCount} local refs, ${result.externalUrls.size} external refs`)
  }

  console.log(`External URLs checked: ${externalUrls.size}`)

  if (failures.length > 0) {
    console.error('\nBroken website links:')

    for (const failure of failures) {
      console.error(`- ${failure}`)
    }

    process.exitCode = 1
  }
}

await main()
