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
    title: 'Theme Family',
    subtitleLines: ['One calm violet system across every surface.'],
    visual: 'hub',
  },
  {
    accent: '#945df4',
    app: 'vscode-website',
    badge: 'VS Code color theme',
    domain: 'vscode.santi020k.com',
    title: 'VS Code Theme',
    subtitleLines: ['Dark, light, and high contrast for long sessions.'],
    visual: 'editor',
  },
  {
    accent: '#b48df7',
    app: 'chrome-website',
    badge: 'Chrome browser theme',
    domain: 'chrome.santi020k.com',
    title: 'Chrome Theme',
    subtitleLines: ['Browser chrome matched to the Santi020k palette.'],
    visual: 'browser',
  },
  {
    accent: '#945df4',
    app: 'terminal-website',
    badge: 'Terminal theme',
    domain: 'terminal.santi020k.com',
    output: 'og-image',
    title: 'Terminal Theme',
    subtitleLines: ['Color and prompt, in sync.'],
    visual: 'terminal',
  },
  {
    accent: '#b48df7',
    app: 'terminal-website',
    badge: 'Curated shell setup',
    domain: 'terminal.santi020k.com/zsh',
    output: 'og-zsh',
    title: 'Zsh Setup',
    subtitleLines: ['Fast shell tools, configured together.'],
    visual: 'zsh',
  },
  {
    accent: '#89b8c8',
    app: 'terminal-website',
    badge: 'Terminal color scheme',
    domain: 'terminal.santi020k.com/iterm2',
    output: 'og-iterm2',
    title: 'iTerm2 Colors',
    subtitleLines: ['Dark and light. Full ANSI coverage.'],
    visual: 'iterm2',
  },
  {
    accent: '#945df4',
    app: 'terminal-website',
    badge: 'Powerline prompt preset',
    domain: 'terminal.santi020k.com/starship',
    output: 'og-starship',
    title: 'Starship Prompt',
    subtitleLines: ['Powerline shape. Santi020k focus.'],
    visual: 'starship',
  },
  {
    accent: '#7daea3',
    app: 'terminal-website',
    badge: 'Generated color presets',
    domain: 'terminal.santi020k.com/ports',
    output: 'og-ports',
    title: 'Terminal Ports',
    subtitleLines: ['One palette for five more terminals.'],
    visual: 'ports',
  },
]

const escapeXml = (value) =>
  value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')

const websiteLogo = (x, y, size = 68) => {
  const scale = size / 80

  return `
  <g transform="translate(${x} ${y}) scale(${scale})">
    <rect width="80" height="80" rx="18" fill="#5a0fdb"/>
    <path d="M26 28 L40 40 L26 52" fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="48" y1="52" x2="62" y2="52" stroke="#ffffff" stroke-width="8" stroke-linecap="round"/>
  </g>
`
}

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

const applePath = 'M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.31.02-1.73-.81-3.22-.81-1.5 0-1.97.79-3.21.83-1.29.05-2.27-1.32-3.1-2.55-1.69-2.44-2.98-6.9-1.25-9.91.86-1.5 2.4-2.45 4.07-2.47 1.27-.02 2.47.86 3.22.86.75 0 2.15-1.06 3.63-.9.62.03 2.35.25 3.46 1.88-.09.06-2.07 1.22-2.05 3.65.03 2.9 2.54 3.87 2.57 3.88-.02.07-.4 1.39-1.32 2.75l.25.32ZM14.78 5.45c.69-.83 1.15-1.98 1.03-3.12-1 .04-2.21.67-2.91 1.5-.63.73-1.18 1.9-1.04 3.02 1.12.09 2.23-.57 2.92-1.4Z'

const powerlineVisual = `
  <g transform="translate(668 164)">
    <rect width="430" height="270" rx="18" fill="#0b0712" stroke="#494158" stroke-width="2"/>
    <rect width="430" height="44" rx="18" fill="#181322"/>
    <circle cx="26" cy="22" r="5" fill="#ea6962"/><circle cx="46" cy="22" r="5" fill="#e8b44a"/><circle cx="66" cy="22" r="5" fill="#7daea3"/>
    <g transform="translate(24 84)">
      <path d="M0 0h50l14 17-14 17H0a17 17 0 0 1-17-17A17 17 0 0 1 0 0Z" fill="#602cba"/>
      <g transform="translate(8 5) scale(1)"><path d="${applePath}" fill="#fff"/></g>
      <path d="M50 0h148l14 17-14 17H50l14-17Z" fill="#752df0"/>
      <text x="75" y="23" fill="#fff" font-family="monospace" font-size="15">~/Projects/theme</text>
      <path d="M198 0h92l14 17-14 17h-92l14-17Z" fill="#945df4"/>
      <text x="224" y="23" fill="#17141d" font-family="monospace" font-size="15">main +2</text>
      <path d="M290 0h95a17 17 0 0 1 17 17 17 17 0 0 1-17 17h-95l14-17Z" fill="#89b8c8"/>
      <text x="322" y="23" fill="#17141d" font-family="monospace" font-size="15">node v22</text>
    </g>
    <text x="26" y="166" fill="#b48df7" font-family="monospace" font-size="22">›</text>
    <text x="52" y="166" fill="#dfdde3" font-family="monospace" font-size="17">pnpm run focus</text>
    <text x="26" y="208" fill="#726c7f" font-family="monospace" font-size="15">Calm contrast. Durable focus.</text>
  </g>
`

const zshVisual = `
  <g transform="translate(668 164)">
    <rect width="430" height="270" rx="18" fill="#0b0712" stroke="#494158" stroke-width="2"/>
    <rect width="430" height="44" rx="18" fill="#181322"/>
    <circle cx="26" cy="22" r="5" fill="#ea6962"/><circle cx="46" cy="22" r="5" fill="#e8b44a"/><circle cx="66" cy="22" r="5" fill="#7daea3"/>
    <g font-family="monospace" font-size="16"><text x="28" y="88" fill="#b48df7">›</text><text x="54" y="88" fill="#dfdde3">santi020k-terminal install</text><text x="28" y="132" fill="#7daea3">✓</text><text x="54" y="132" fill="#b6b2bd">completions + suggestions</text><text x="28" y="172" fill="#7daea3">✓</text><text x="54" y="172" fill="#b6b2bd">fzf · zoxide · eza · bat</text><text x="28" y="212" fill="#7daea3">✓</text><text x="54" y="212" fill="#b6b2bd">Starship prompt ready</text></g>
  </g>
`

const itermVisual = `
  <g transform="translate(668 164)">
    <rect width="430" height="270" rx="18" fill="#0b0712" stroke="#494158" stroke-width="2"/>
    <rect width="430" height="44" rx="18" fill="#181322"/>
    <circle cx="26" cy="22" r="5" fill="#ea6962"/><circle cx="46" cy="22" r="5" fill="#e8b44a"/><circle cx="66" cy="22" r="5" fill="#7daea3"/>
    <text x="28" y="88" fill="#dfdde3" font-family="monospace" font-size="17">Santi020k ANSI palette</text>
    <g transform="translate(28 116)">${['#231d30', '#ea6962', '#7daea3', '#e8b44a', '#9b69f6', '#b48df7', '#89b8c8', '#dfdde3', '#726c7f', '#ff8b84', '#9bc9be', '#f4cb72', '#b48df7', '#d0b5ff', '#a8d6e5', '#fff'].map((color, index) => `<rect x="${(index % 8) * 46}" y="${Math.floor(index / 8) * 50}" width="34" height="34" rx="7" fill="${color}"/>`).join('')}</g>
    <text x="28" y="244" fill="#726c7f" font-family="monospace" font-size="15">dark + light presets</text>
  </g>
`

const portsVisual = `
  <g transform="translate(668 164)">
    <rect width="430" height="270" rx="18" fill="#0b0712" stroke="#494158" stroke-width="2"/>
    <text x="30" y="52" fill="#945df4" font-family="monospace" font-size="17">Available presets</text>
    <g font-family="monospace" font-size="16"><text x="30" y="98" fill="#dfdde3">Ghostty</text><text x="226" y="98" fill="#dfdde3">Kitty</text><text x="30" y="142" fill="#dfdde3">WezTerm</text><text x="226" y="142" fill="#dfdde3">Alacritty</text><text x="30" y="186" fill="#dfdde3">Windows Terminal</text></g>
    <rect x="30" y="218" width="112" height="28" rx="8" fill="#752df0"/><text x="58" y="238" fill="#fff" font-family="monospace" font-size="14">dark</text>
    <rect x="154" y="218" width="112" height="28" rx="8" fill="#f8f6fd"/><text x="181" y="238" fill="#302e36" font-family="monospace" font-size="14">light</text>
  </g>
`

const getVisual = (visual) => {
  switch (visual) {
    case 'browser':
      return browserVisual

    case 'editor':
      return editorVisual

    case 'hub':
      return hubVisual

    case 'iterm2':
      return itermVisual

    case 'ports':
      return portsVisual

    case 'starship':

    case 'terminal':
      return powerlineVisual

    case 'zsh':
      return zshVisual

    default:
      throw new Error(`Unknown Open Graph visual: ${visual}`)
  }
}

const subtitleText = (lines, x = 108) => lines
  .map((line, index) => `<tspan x="${x}" dy="${index === 0 ? 0 : 38}">${escapeXml(line)}</tspan>`)
  .join('')

const standardCardSvg = ({ accent, subtitleLines, title, visual }) => {
  const visualTransform = ['terminal', 'zsh', 'iterm2', 'starship', 'ports'].includes(visual)
    ? 'translate(-192 25) scale(1.2)'
    : 'translate(-300 10) scale(1.3)'

  return (`\
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" role="img" aria-label="${escapeXml(title)} social card">
  <defs>
    <radialGradient id="glow" cx="0" cy="0" r="1" gradientTransform="translate(1030 60) rotate(130) scale(650)">
      <stop stop-color="${accent}" stop-opacity="0.3"/>
      <stop offset="1" stop-color="#0d0718" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0v48" fill="none" stroke="#494158" stroke-opacity="0.18"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#0d0718"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <path d="M0 566c180-62 340-58 480 10 172 84 353 69 542-46 75-46 134-70 178-74v174H0Z" fill="${accent}" opacity="0.07"/>
  ${websiteLogo(72, 64, 54)}
  <text x="146" y="98" fill="#945df4" font-family="Inter, Arial, sans-serif" font-size="22" font-weight="850">SANTI020K THEME</text>
  <rect x="146" y="116" width="86" height="4" rx="2" fill="#945df4"/>
  <text x="72" y="306" fill="#ffffff" font-family="Inter, Arial, sans-serif" font-size="66" font-weight="850">${escapeXml(title)}</text>
  <text x="76" y="358" fill="#b6b2bd" font-family="Inter, Arial, sans-serif" font-size="25" font-weight="600">${subtitleText(subtitleLines, 76)}</text>
  <g transform="${visualTransform}">${getVisual(visual)}</g>
</svg>
`).replaceAll(/[ \t]+$/gm, '')
}

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
    const output = card.output ?? 'og-image'
    const svgPath = resolve(publicDir, `${output}.svg`)
    const pngPath = resolve(publicDir, `${output}.png`)

    await writeTextFile(svgPath, standardCardSvg(card))

    await render(svgPath, pngPath)
  }),
)

console.log(`Generated ${cards.length} Open Graph images.`)
