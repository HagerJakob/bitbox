import { Link } from 'react-router-dom'

function GameCard({ game }) {
  return (
    <Link
      to={`/game/${game.slug}`}
      className="game-card arcade-panel scanlines group relative block h-full rounded-2xl p-5 no-underline"
      aria-label={`${game.title} oeffnen`}
      style={{ borderColor: game.accent }}
    >
      <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full blur-2xl" style={{ backgroundColor: game.accent, opacity: 0.3 }} />
      <div className="relative z-10 flex h-full flex-col justify-between gap-4">
        <div className="text-4xl leading-none md:text-5xl" aria-hidden>
          {game.icon}
        </div>
        <div>
          <h2 className="pixel-font mb-2 text-sm text-white md:text-base">{game.title}</h2>
          <p className="text-xs tracking-wide text-cyan-100/75">{game.subtitle}</p>
        </div>
        <div className="text-xs uppercase tracking-[0.24em] text-green-300/80 group-hover:text-green-200">Start</div>
      </div>
    </Link>
  )
}

export default GameCard
