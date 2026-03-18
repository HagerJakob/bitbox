import GameCard from '../components/GameCard'
import { games } from '../data/games'

function HomePage() {
  return (
    <main className="scanlines relative min-h-screen px-5 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="arcade-panel mb-8 rounded-2xl p-6 md:p-8">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-300/80">Retro Spielekonsole</p>
          <h1 className="pixel-font mb-4 text-xl leading-relaxed text-white md:text-3xl">Bitbox</h1>
          <p className="max-w-3xl text-sm text-cyan-100/85 md:text-base">
            Waehle ein Spiel und verbinde die Konsole mit deinem ESP32, um die LED-Matrix in Echtzeit zu steuern.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {games.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </section>
      </div>
    </main>
  )
}

export default HomePage
