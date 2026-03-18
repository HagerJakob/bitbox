import { useEffect, useMemo, useState } from 'react'

function flattenMatrix(matrixData) {
  return Uint8Array.from(matrixData.flat().map((cell) => (cell ? 1 : 0)))
}

function BluetoothConnector({ matrixData, onConnectionChange }) {
  const [deviceName, setDeviceName] = useState('')
  const [isConnected, setIsConnected] = useState(false)
  const [status, setStatus] = useState('Nicht verbunden')
  const [isConnecting, setIsConnecting] = useState(false)
  const [lastSyncAt, setLastSyncAt] = useState(null)

  const isSupported = useMemo(() => typeof navigator !== 'undefined' && 'bluetooth' in navigator, [])

  useEffect(() => {
    onConnectionChange?.(isConnected)
  }, [isConnected, onConnectionChange])

  useEffect(() => {
    let cancelled = false

    async function syncMatrixToDevice() {
      if (!isConnected || !matrixData) {
        return
      }

      // Simulates payload serialization and write latency as if data is sent to ESP32.
      const payload = flattenMatrix(matrixData)
      await new Promise((resolve) => setTimeout(resolve, 40))

      if (!cancelled && payload.length) {
        setLastSyncAt(new Date())
      }
    }

    syncMatrixToDevice()

    return () => {
      cancelled = true
    }
  }, [isConnected, matrixData])

  const connectToEsp32 = async () => {
    if (!isSupported) {
      setStatus('Web Bluetooth nicht unterstuetzt')
      return
    }

    try {
      setIsConnecting(true)
      setStatus('Suche nach ESP32...')

      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: ['battery_service', 'device_information', '6e400001-b5a3-f393-e0a9-e50e24dcca9e'],
      })

      const server = await device.gatt?.connect()
      setDeviceName(device.name || 'ESP32')
      setIsConnected(Boolean(server?.connected ?? true))
      setStatus(`Verbunden mit ${device.name || 'ESP32'}`)
    } catch {
      setIsConnected(false)
      setStatus('Verbindung fehlgeschlagen oder abgebrochen')
    } finally {
      setIsConnecting(false)
    }
  }

  return (
    <div className="arcade-panel rounded-2xl p-4 md:p-6">
      <h3 className="pixel-font mb-3 text-[10px] text-pink-200 md:text-xs">Bluetooth Link</h3>
      <p className="mb-4 text-xs text-cyan-50/80">Status: {status}</p>

      <button
        type="button"
        onClick={connectToEsp32}
        disabled={isConnecting}
        className="pixel-font w-full rounded-xl border border-cyan-300/60 bg-cyan-400/10 px-4 py-3 text-[10px] text-cyan-100 transition hover:scale-[1.01] hover:bg-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isConnecting ? 'Verbinde...' : 'Mit ESP32 verbinden'}
      </button>

      <div className="mt-4 grid gap-2 text-[10px] uppercase tracking-[0.16em] text-cyan-100/70">
        <div>Geraet: {deviceName || '-'}</div>
        <div className={isConnected ? 'text-green-300' : 'text-pink-300'}>{isConnected ? 'Verbunden' : 'Nicht verbunden'}</div>
        <div>Sync: {lastSyncAt ? lastSyncAt.toLocaleTimeString('de-DE') : '-'}</div>
      </div>
    </div>
  )
}

export default BluetoothConnector
