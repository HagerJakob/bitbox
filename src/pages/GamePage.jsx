import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import BluetoothConnector from '../components/BluetoothConnector'
import LEDMatrix from '../components/LEDMatrix'
import { gameMap } from '../data/games'

const MATRIX_SIZE = 16
const TOTAL_CELLS = MATRIX_SIZE * MATRIX_SIZE
const SNAKE_LENGTH = 12

function createEmptyMatrix() {
  return Array.from({ length: MATRIX_SIZE }, () => Array(MATRIX_SIZE).fill(false))
}

function indexToPoint(index) {
  const normalized = ((index % TOTAL_CELLS) + TOTAL_CELLS) % TOTAL_CELLS
  const y = Math.floor(normalized / MATRIX_SIZE)
  const rawX = normalized % MATRIX_SIZE
  const x = y % 2 === 0 ? rawX : MATRIX_SIZE - 1 - rawX

  return { x, y }
}

function buildSnakeMatrix(tick) {
  const matrix = createEmptyMatrix()

  for (let segment = 0; segment < SNAKE_LENGTH; segment += 1) {
    const point = indexToPoint(tick - segment)
    matrix[point.y][point.x] = true
  }

  const food = indexToPoint(tick + 37)
  matrix[food.y][food.x] = tick % 6 < 3

  return matrix
}

function GamePage() {
  const { slug } = useParams()
  const selectedGame = gameMap[slug]
  const [tick, setTick] = useState(0)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setTick((value) => value + 1)
    }, 180)

    return () => window.clearInterval(intervalId)
  }, [])

  const matrix = useMemo(() => buildSnakeMatrix(tick), [tick])

  if (!selectedGame) {
    return (
      <main className="min-h-screen p-6 md:p-10">
        <div className="mx-auto max-w-xl rounded-2xl border border-pink-300/40 bg-black/50 p-8 text-center">
          <h1 className="pixel-font mb-4 text-base text-pink-100">Spiel nicht gefunden</h1>
          <Link to="/" className="text-cyan-200 underline underline-offset-4">
            Zurueck zur Bitbox
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="scanlines min-h-screen px-5 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-6xl">
        <header className="arcade-panel mb-6 rounded-2xl p-6 md:p-8">
          <Link
            to="/"
            className="mb-5 inline-block text-xs uppercase tracking-[0.2em] text-cyan-200/80 hover:text-cyan-100"
          >
            &larr; Zurueck
          </Link>
          <h1 className="pixel-font mb-4 text-lg leading-relaxed text-white md:text-2xl">{selectedGame.title}</h1>
          <p className="text-sm text-cyan-100/80">
            LED-Matrix-Feed: {isConnected ? 'Live mit ESP32 verbunden' : 'Lokal simuliert'}
          </p>
        </header>

        <section className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <LEDMatrix matrix={matrix} />
          <div className="flex flex-col gap-4">
            <BluetoothConnector matrixData={matrix} onConnectionChange={setIsConnected} />
            <div className="arcade-panel rounded-2xl p-4 md:p-6">
              <h2 className="pixel-font mb-3 text-[10px] text-green-200 md:text-xs">Game Menu</h2>
              <p className="mb-4 text-sm text-cyan-50/85">
                Diese Ansicht simuliert den Datenstrom zur 16x16 LED-Matrix. Beim Verbinden wird jeder neue Frame automatisch
                synchronisiert.
              </p>
              <p className="text-xs uppercase tracking-[0.18em] text-green-200/80">Animation: Snake Path | Tick: {tick}</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default GamePage
