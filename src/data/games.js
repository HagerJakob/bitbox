export const games = [
  {
    slug: 'snake',
    title: 'Snake',
    icon: '🐍',
    subtitle: 'Eat, grow, survive.',
    accent: 'var(--neon-green)',
  },
  {
    slug: 'tetris',
    title: 'Tetris',
    iconImage: '/Tetris.svg',
    subtitle: 'Stack with precision.',
    accent: 'var(--neon-pink)',
  },
  {
    slug: 'vier-gewinnt',
    title: '4 Gewinnt',
    iconImage: '/viergewinnt.svg',
    subtitle: 'Drop and connect four.',
    accent: 'var(--neon-cyan)',
  },
  {
    slug: 'coming-soon',
    title: 'Coming Soon',
    icon: '❓',
    subtitle: 'Next cartridge loading...',
    accent: 'var(--neon-cyan)',
  },
]

export const gameMap = Object.fromEntries(games.map((game) => [game.slug, game]))
