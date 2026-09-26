export const docsSections = [
  {
    label: 'Start here',
    items: [
      { href: '/terminal/docs/', label: 'Getting started' }
    ]
  },
  {
    label: 'Components',
    items: [
      { href: '/terminal/docs/zsh/', label: 'Zsh setup' },
      { href: '/terminal/docs/shells/', label: 'Bash and Fish' },
      { href: '/terminal/docs/starship/', label: 'Starship prompt' },
      { href: '/terminal/docs/terminal-colors/', label: 'Terminal colors' }
    ]
  },
  {
    label: 'Reference',
    items: [
      { href: '/terminal/docs/cli/', label: 'CLI reference' }
    ]
  }
]

export const docsItems = docsSections.flatMap(section => section.items)
