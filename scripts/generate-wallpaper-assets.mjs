import { createWriteStream } from 'node:fs'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { finished } from 'node:stream/promises'
import { fileURLToPath } from 'node:url'

import { ZipArchive } from 'archiver'
import sharp from 'sharp'

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const outputDirectory = resolve(repositoryRoot, 'packages/theme/assets/wallpapers')
const DESKTOP = { height: 2160, width: 3840 }
const MOBILE = { height: 2532, width: 1170 }

const grid = ({ height, width }, step) => {
  const vertical = Array.from({ length: Math.ceil(width / step) + 1 }, (_, index) => `<path d="M ${index * step} 0 V ${height}" />`)
  const horizontal = Array.from({ length: Math.ceil(height / step) + 1 }, (_, index) => `<path d="M 0 ${index * step} H ${width}" />`)

  return [...vertical, ...horizontal].join('')
}

const desktopArtwork = ({ accent, badge, badgeForeground, node }) => `
  <g fill="none" stroke="${accent}" stroke-linecap="round">
    <path d="M -260 1450 C 520 850 1080 1740 1890 1130 S 3140 480 4100 890" stroke-opacity=".07" stroke-width="280" />
    <path d="M -220 1450 C 530 885 1095 1710 1885 1130 S 3125 520 4060 900" stroke-opacity=".10" stroke-width="150" />
    <path d="M -180 1450 C 540 920 1110 1680 1880 1130 S 3110 560 4020 910" stroke-opacity=".16" stroke-width="68" />
    <path d="M -120 1450 C 560 990 1140 1620 1870 1130 S 3080 640 3940 930" stroke-opacity=".40" stroke-width="14" />
  </g>
  <g fill="none" stroke="${accent}">
    <g transform="translate(772 1260)">
      <circle r="72" stroke-opacity=".10" stroke-width="30" />
      <circle r="38" fill="${node}" fill-opacity=".9" stroke-opacity=".4" stroke-width="5" />
      <circle r="9" fill="${accent}" stroke="none" />
    </g>
    <g transform="translate(2740 760)">
      <circle r="54" stroke-opacity=".10" stroke-width="24" />
      <circle r="28" fill="${node}" fill-opacity=".9" stroke-opacity=".4" stroke-width="4" />
      <circle r="7" fill="${accent}" stroke="none" />
    </g>
  </g>
  <g transform="translate(3180 300) rotate(8)" fill="none" stroke="${accent}" stroke-linecap="round">
    <path d="M 0 350 C 190 40 540 0 820 190" stroke-opacity=".07" stroke-width="190" />
    <path d="M 24 350 C 210 90 520 60 790 210" stroke-opacity=".28" stroke-width="14" />
    <path d="M 500 8 H 780 M 820 48 V 270" stroke-opacity=".45" stroke-width="10" />
  </g>
  <g transform="translate(1816 1762)">
    <rect width="208" height="208" rx="58" fill="${badge}" fill-opacity=".94" stroke="${accent}" stroke-opacity=".55" stroke-width="7" />
    <path d="M 59 72 L 94 104 L 59 136 M 111 136 H 151" fill="none" stroke="${badgeForeground}" stroke-linecap="round" stroke-linejoin="round" stroke-width="18" />
  </g>`

const mobileArtwork = ({ accent, badge, badgeForeground, node }) => `
  <g fill="none" stroke="${accent}" stroke-linecap="round">
    <path d="M -240 1740 C 120 1200 510 1940 910 1430 S 1320 830 1470 1040" stroke-opacity=".07" stroke-width="220" />
    <path d="M -220 1740 C 135 1235 505 1905 900 1430 S 1295 865 1450 1050" stroke-opacity=".10" stroke-width="116" />
    <path d="M -200 1740 C 150 1270 500 1870 890 1430 S 1270 900 1430 1060" stroke-opacity=".16" stroke-width="56" />
    <path d="M -170 1740 C 180 1340 490 1800 870 1430 S 1220 970 1390 1080" stroke-opacity=".40" stroke-width="12" />
  </g>
  <g fill="none" stroke="${accent}">
    <g transform="translate(184 1590)">
      <circle r="54" stroke-opacity=".10" stroke-width="22" />
      <circle r="28" fill="${node}" fill-opacity=".9" stroke-opacity=".4" stroke-width="4" />
      <circle r="7" fill="${accent}" stroke="none" />
    </g>
    <g transform="translate(930 1180)">
      <circle r="42" stroke-opacity=".10" stroke-width="18" />
      <circle r="21" fill="${node}" fill-opacity=".9" stroke-opacity=".4" stroke-width="4" />
      <circle r="6" fill="${accent}" stroke="none" />
    </g>
  </g>
  <g transform="translate(650 230) rotate(10)" fill="none" stroke="${accent}" stroke-linecap="round">
    <path d="M 0 330 C 130 40 430 0 650 190" stroke-opacity=".07" stroke-width="150" />
    <path d="M 20 330 C 150 90 410 60 620 210" stroke-opacity=".28" stroke-width="12" />
    <path d="M 370 18 H 590 M 630 52 V 230" stroke-opacity=".45" stroke-width="8" />
  </g>
  <g transform="translate(497 2150)">
    <rect width="176" height="176" rx="50" fill="${badge}" fill-opacity=".94" stroke="${accent}" stroke-opacity=".55" stroke-width="6" />
    <path d="M 49 61 L 79 88 L 49 115 M 94 115 H 128" fill="none" stroke="${badgeForeground}" stroke-linecap="round" stroke-linejoin="round" stroke-width="15" />
  </g>`

const LIGHT = { accent: '#6319be', background: '#f8f6fd', badge: '#ffffff', badgeForeground: '#6319be', grid: '#6319be', node: '#f8f6fd' }
const DARK = { accent: '#945df4', background: '#110c1d', badge: '#1b132b', badgeForeground: '#f8f6fd', grid: '#945df4', node: '#110c1d' }

const svg = (dimensions, artwork, palette) => {
  const { height, width } = dimensions
  const step = width > height ? 240 : 180

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <rect width="${width}" height="${height}" fill="${palette.background}" />
    <g fill="none" stroke="${palette.grid}" stroke-opacity=".05" stroke-width="2">${grid(dimensions, step)}</g>
    ${artwork(palette)}
  </svg>`)
}

const render = async (name, dimensions, artwork, palette) => {
  const source = svg(dimensions, artwork, palette)
  const basePath = resolve(outputDirectory, name)

  await Promise.all([
    sharp(source).png({ compressionLevel: 9, palette: true }).toFile(`${basePath}.png`),
    sharp(source).webp({ effort: 6, quality: 88 }).toFile(`${basePath}.webp`)
  ])
}

await mkdir(outputDirectory, { recursive: true })

await Promise.all([
  render('wallpaper-4-desktop', DESKTOP, desktopArtwork, LIGHT),
  render('wallpaper-4-mobile', MOBILE, mobileArtwork, LIGHT),
  render('wallpaper-5-desktop', DESKTOP, desktopArtwork, DARK),
  render('wallpaper-5-mobile', MOBILE, mobileArtwork, DARK)
])


// Sculpted is additive: the original Signal flow masters above stay available.
const sculptedDirectory = resolve(outputDirectory, 'sculpted')
const archiveDirectory = resolve(repositoryRoot, 'apps/website/public/downloads')
const archiveFiles = []

const sculptedPalette = {
  light: { background: '#f8f6fd', shadow: '#403850', low: '#4b1b6e', mid: '#9564b8', high: '#ddd0ec' },
  dark: { background: '#110c1d', shadow: '#000000', low: '#29103b', mid: '#6d398c', high: '#ba91d3' }
}

const sculptures = {
  fold: `<path d="M -350 220 C -190 -290 450 -330 610 -20 C 770 290 210 265 145 465 C 95 625 510 730 660 595 L 840 910 C 420 1100 -380 820 -230 400 C -80 -25 360 -10 305 -110 C 260 -195 -10 -140 -60 300 Z" fill="url(#material)" />
    <path d="M 610 -20 C 770 290 210 265 145 465 C 95 625 510 730 660 595" fill="none" stroke="url(#edge)" stroke-width="4" opacity=".55" />`,
  orbit: `<g transform="rotate(-24)"><path d="M -560 0 A 560 375 0 1 0 560 0 A 560 375 0 1 0 -560 0 M -320 0 A 320 185 0 1 1 320 0 A 320 185 0 1 1 -320 0" fill="url(#material)" fill-rule="evenodd" />
    <ellipse rx="559" ry="374" fill="none" stroke="url(#edge)" stroke-width="3" opacity=".65" />
    <ellipse rx="320" ry="185" fill="none" stroke="url(#edge)" stroke-width="4" opacity=".5" /></g>`,
  monolith: `<path d="M -240 -430 Q -240 -490 -170 -500 L 260 -565 Q 330 -575 355 -515 L 455 325 Q 460 375 405 395 L -70 525 Q -150 545 -165 475 Z" fill="url(#material)" />
    <path d="M -170 -500 L 260 -565 Q 330 -575 355 -515 L 455 325 L 225 295 L 145 -425 Z" fill="url(#face)" />
    <path d="M 145 -425 L 225 295 L 455 325" fill="none" stroke="url(#edge)" stroke-width="3" opacity=".55" />`
}

const sculptedSvg = (family, variant, dimensions) => {
  const { width, height } = dimensions
  const palette = sculptedPalette[variant]
  const portrait = height > width
  const centerX = width * (portrait ? .53 : .72)
  const centerY = height * (portrait ? .65 : .52)
  const scale = portrait ? .9 : 1.65
  const offsetY = family === 'fold' ? -250 : 0

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="material" x1="0" y1="0" x2=".85" y2="1"><stop stop-color="${palette.high}"/><stop offset=".25" stop-color="${palette.mid}"/><stop offset=".61" stop-color="${palette.low}"/><stop offset="1" stop-color="${palette.mid}"/></linearGradient>
      <linearGradient id="face" x1="0" y1="0" x2="1" y2=".6"><stop stop-color="${palette.high}"/><stop offset="1" stop-color="${palette.mid}"/></linearGradient>
      <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${palette.high}"/><stop offset="1" stop-color="${palette.low}"/></linearGradient>
      <filter id="shadow" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="48"/></filter>
    </defs>
    <rect width="${width}" height="${height}" fill="${palette.background}"/>
    <ellipse cx="${centerX}" cy="${centerY + (portrait ? 620 : 740)}" rx="${portrait ? 370 : 780}" ry="${portrait ? 70 : 100}" fill="${palette.shadow}" opacity="${variant === 'light' ? '.15' : '.5'}" filter="url(#shadow)"/>
    <g transform="translate(${centerX} ${centerY}) scale(${scale}) translate(0 ${offsetY})">${sculptures[family]}</g>
  </svg>`)
}

await mkdir(sculptedDirectory, { recursive: true })

for (const family of Object.keys(sculptures)) {
  for (const variant of ['light', 'dark']) {
    for (const [device, dimensions] of [['desktop', DESKTOP], ['mobile', MOBILE]]) {
      const name = `${family}-${variant}-${device}`
      const source = sculptedSvg(family, variant, dimensions)
      const basePath = resolve(sculptedDirectory, name)

      await Promise.all([
        writeFile(`${basePath}.svg`, source),
        sharp(source).png({ compressionLevel: 9 }).toFile(`${basePath}.png`),
        sharp(source).webp({ effort: 6, quality: 94 }).toFile(`${basePath}.webp`)
      ])

      archiveFiles.push(...['png', 'svg', 'webp'].map(extension => `${name}.${extension}`))
    }
  }
}

// Fixed dates and sorted names keep the collection archive reproducible.
await mkdir(archiveDirectory, { recursive: true })

const archiveOutput = createWriteStream(resolve(archiveDirectory, 'santi020k-sculpted-wallpapers.zip'))
const archive = new ZipArchive({ statConcurrency: 1, zlib: { level: 9 } })
const archiveCompletion = finished(archiveOutput)

archive.on('error', error => archiveOutput.destroy(error))

archive.on('warning', error => archiveOutput.destroy(error))

archive.pipe(archiveOutput)

for (const file of archiveFiles.sort()) {
  archive.file(resolve(sculptedDirectory, file), { date: new Date('2026-01-01T00:00:00Z'), name: file })
}

await Promise.all([archive.finalize(), archiveCompletion])
