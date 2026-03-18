function LEDMatrix({ matrix }) {
  return (
    <div className="arcade-panel scanlines rounded-2xl p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="pixel-font text-[10px] text-cyan-200 md:text-xs">16x16 LED Matrix</h3>
        <span className="text-[10px] uppercase tracking-[0.2em] text-green-300/80">Live</span>
      </div>

      <div
        className="grid gap-1 rounded-lg border border-cyan-200/20 bg-black/70 p-2"
        style={{ gridTemplateColumns: 'repeat(16, minmax(0, 1fr))' }}
      >
        {matrix.flatMap((row, y) =>
          row.map((isOn, x) => (
            <div
              key={`${x}-${y}`}
              className={`led-cell ${isOn ? 'on' : 'off'}`}
              role="img"
              aria-label={`LED ${x}-${y} ${isOn ? 'an' : 'aus'}`}
            />
          )),
        )}
      </div>
    </div>
  )
}

export default LEDMatrix
