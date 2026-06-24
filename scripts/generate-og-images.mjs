import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

import sharp from 'sharp'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')

const cards = [
  {
    accent: '#945df4',
    app: 'website',
    badge: 'Theme family',
    domain: 'theme.santi020k.com',
    title: 'Santi020k Themes',
    subtitleLines: ['A calm violet system for VS Code,', 'Chrome, npm packages, and more.'],
    visual: 'hub',
  },
  {
    accent: '#945df4',
    app: 'vscode-website',
    badge: 'VS Code color theme',
    domain: 'vscode.santi020k.com',
    title: 'Santi020k Theme',
    subtitleLines: ['Dark, light, and high-contrast variants', 'built for long technical sessions.'],
    visual: 'editor',
  },
  {
    accent: '#b48df7',
    app: 'chrome-website',
    badge: 'Chrome browser theme',
    domain: 'chrome.santi020k.com',
    title: 'Santi020k Theme',
    subtitleLines: ['Browser chrome matched to the same', 'indigo, lavender, and violet palette.'],
    visual: 'browser',
  },
]

const escapeXml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const logo = (x, y, size = 68) => `
  <g transform="translate(${x} ${y})">
    <rect width="${size}" height="${size}" rx="16" fill="#1c1528" stroke="#494158" stroke-width="2"/>
    <path d="M${size * 0.5} ${size * 0.18} ${size * 0.76} ${size * 0.78} ${size * 0.24} ${size * 0.78}Z" fill="#945df4" opacity="0.94"/>
    <path d="M${size * 0.5} ${size * 0.18} ${size * 0.24} ${size * 0.78}M${size * 0.5} ${size * 0.18}l${size * 0.26} ${size * 0.6}M${size * 0.24} ${size * 0.78}h${size * 0.52}" fill="none" stroke="#dfdde3" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
  </g>
`

const editorVisual = `
  <g transform="translate(720 150) scale(0.86)">
    <rect width="398" height="318" rx="18" fill="#0b0712" stroke="#494158" stroke-width="2"/>
    <rect width="398" height="48" rx="18" fill="#1c1528"/>
    <circle cx="31" cy="24" r="6" fill="#ea6962"/>
    <circle cx="55" cy="24" r="6" fill="#e8b44a"/>
    <circle cx="79" cy="24" r="6" fill="#7daea3"/>
    <g font-family="SFMono-Regular, Consolas, monospace" font-size="19">
      <text x="34" y="94" fill="#5e576b">1</text>
      <text x="72" y="94" fill="#8445f2">const</text>
      <text x="138" y="94" fill="#dfdde3">focus</text>
      <text x="208" y="94" fill="#b6b2bd">=</text>
      <text x="232" y="94" fill="#b48df7">'calm'</text>
      <text x="34" y="136" fill="#5e576b">2</text>
      <text x="72" y="136" fill="#8445f2">theme</text>
      <text x="142" y="136" fill="#b6b2bd">.</text>
      <text x="158" y="136" fill="#945df4">apply</text>
      <text x="220" y="136" fill="#b6b2bd">(</text>
      <text x="238" y="136" fill="#b48df7">'violet'</text>
      <text x="326" y="136" fill="#b6b2bd">)</text>
      <text x="34" y="178" fill="#5e576b">3</text>
      <text x="72" y="178" fill="#7daea3">syntax</text>
      <text x="148" y="178" fill="#dfdde3">.</text>
      <text x="164" y="178" fill="#945df4">staysReadable</text>
      <text x="34" y="220" fill="#5e576b">4</text>
      <text x="72" y="220" fill="#e8b44a">session</text>
      <text x="158" y="220" fill="#dfdde3">.</text>
      <text x="174" y="220" fill="#945df4">continue</text>
      <text x="262" y="220" fill="#b6b2bd">()</text>
    </g>
    <rect x="30" y="256" width="122" height="34" rx="8" fill="#1c1528" stroke="#945df4"/>
    <text x="52" y="279" fill="#dfdde3" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="800">dark</text>
    <rect x="166" y="256" width="122" height="34" rx="8" fill="#f8f6fd" stroke="#6319be"/>
    <text x="190" y="279" fill="#302e36" font-family="Inter, Arial, sans-serif" font-size="15" font-weight="800">light</text>
  </g>
`

const browserVisual = `
  <g transform="translate(708 150) scale(0.88)">
    <rect width="440" height="318" rx="20" fill="#110c1d" stroke="#494158" stroke-width="2"/>
    <rect width="440" height="62" rx="20" fill="#0d0a15"/>
    <rect x="28" y="22" width="128" height="40" rx="12" fill="#231d30" stroke="#945df4"/>
    <rect x="176" y="22" width="214" height="28" rx="14" fill="#1c1528" stroke="#494158"/>
    <circle cx="406" cy="36" r="8" fill="#b48df7"/>
    <rect x="34" y="102" width="164" height="112" rx="14" fill="#1c1528" stroke="#494158"/>
    <rect x="222" y="102" width="164" height="112" rx="14" fill="#f8f6fd" stroke="#d3cde6"/>
    <path d="M58 242h320" stroke="#494158"/>
    <rect x="60" y="266" width="94" height="28" rx="8" fill="#5a0fdb"/>
    <rect x="172" y="266" width="124" height="28" rx="8" fill="#231d30" stroke="#494158"/>
    <text x="70" y="158" fill="#dfdde3" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="850">Dark</text>
    <text x="258" y="158" fill="#302e36" font-family="Inter, Arial, sans-serif" font-size="18" font-weight="850">Light</text>
  </g>
`

const hubVisual = `
  <g transform="translate(722 144) scale(0.88)">
    <rect width="190" height="148" rx="18" fill="#0b0712" stroke="#494158" stroke-width="2"/>
    <rect x="26" y="34" width="92" height="12" rx="6" fill="#945df4"/>
    <rect x="26" y="66" width="132" height="10" rx="5" fill="#b6b2bd" opacity="0.58"/>
    <rect x="26" y="94" width="88" height="28" rx="8" fill="#5a0fdb"/>
    <rect x="220" y="48" width="190" height="148" rx="18" fill="#110c1d" stroke="#494158" stroke-width="2"/>
    <rect x="244" y="78" width="142" height="30" rx="15" fill="#1c1528" stroke="#494158"/>
    <rect x="244" y="128" width="64" height="38" rx="10" fill="#945df4"/>
    <rect x="322" y="128" width="64" height="38" rx="10" fill="#f8f6fd"/>
    <rect x="84" y="220" width="250" height="86" rx="18" fill="#1c1528" stroke="#494158" stroke-width="2"/>
    <circle cx="130" cy="263" r="20" fill="#945df4"/>
    <rect x="170" y="244" width="116" height="12" rx="6" fill="#dfdde3" opacity="0.82"/>
    <rect x="170" y="272" width="92" height="10" rx="5" fill="#b6b2bd" opacity="0.62"/>
  </g>
`

const visuals = {
  browser: browserVisual,
  editor: editorVisual,
  hub: hubVisual,
}

const subtitleText = (lines) => lines
  .map((line, index) => `<tspan x="108" dy="${index === 0 ? 0 : 38}">${escapeXml(line)}</tspan>`)
  .join('')

const cardSvg = ({ accent, badge, domain, subtitleLines, title, visual }) => `\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" role="img" aria-label="${escapeXml(title)} social card">
  <defs>
    <linearGradient id="bg" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0" stop-color="#0d0718"/>
      <stop offset="0.54" stop-color="#110c1d"/>
      <stop offset="1" stop-color="#1c1528"/>
    </linearGradient>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0v44" fill="none" stroke="#494158" stroke-opacity="0.3"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.52"/>
  <path d="M0 482c160-66 310-66 450 0 157 74 326 64 506-31 103-54 184-76 244-66v245H0Z" fill="${accent}" opacity="0.12"/>
  <rect x="64" y="64" width="1072" height="502" rx="26" fill="#110c1d" fill-opacity="0.78" stroke="#494158" stroke-width="2"/>
  <path d="M64 64h1072v8H64Z" fill="${accent}" opacity="0.72"/>
  ${logo(104, 112)}
  <text x="196" y="144" fill="${accent}" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="850" letter-spacing="0">${escapeXml(badge)}</text>
  <rect x="196" y="166" width="96" height="4" rx="2" fill="${accent}"/>
  <text x="104" y="318" fill="#dfdde3" font-family="Inter, Arial, sans-serif" font-size="64" font-weight="850" letter-spacing="0">${escapeXml(title)}</text>
  <text x="108" y="374" fill="#b6b2bd" font-family="Inter, Arial, sans-serif" font-size="27" font-weight="550" letter-spacing="0">${subtitleText(subtitleLines)}</text>
  <text x="104" y="496" fill="#8d8896" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="800" letter-spacing="0">${escapeXml(domain)}</text>
  ${visuals[visual]}
</svg>
`

const writeTextFile = async (path, content) => {
  await mkdir(dirname(path), { recursive: true })

  await writeFile(path, content)
}

const render = async (input, output) => {
  await mkdir(dirname(output), { recursive: true })

  await sharp(input).resize({ height: 630, width: 1200 }).png().toFile(output)
}

await Promise.all(
  cards.map(async (card) => {
    const publicDir = resolve(root, 'apps', card.app, 'public')
    const svgPath = resolve(publicDir, 'og-image.svg')
    const pngPath = resolve(publicDir, 'og-image.png')

    await writeTextFile(svgPath, cardSvg(card))

    await render(svgPath, pngPath)
  }),
)

console.log(`Generated ${cards.length} Open Graph images.`)
