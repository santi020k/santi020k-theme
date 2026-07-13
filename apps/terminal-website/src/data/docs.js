export const docsSections = [
  {
    label: 'Start here',
    items: [
      { href: '/docs/', label: 'Documentation' },
      { href: '/docs/installation/', label: 'Installation' },
    ],
  },
  {
    label: 'Components',
    items: [
      { href: '/docs/zsh/', label: 'Zsh setup' },
      { href: '/docs/starship/', label: 'Starship prompt' },
      { href: '/docs/terminal-colors/', label: 'Terminal colors' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { href: '/docs/cli/', label: 'CLI reference' },
    ],
  },
]

export const docsItems = docsSections.flatMap(section => section.items)
