import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

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
