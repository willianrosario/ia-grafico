"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TradingChartProps {
  asset: string
  theme: "light" | "dark"
}

export function TradingChart({ asset, theme }: TradingChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = canvas.offsetWidth * 2
    canvas.height = canvas.offsetHeight * 2
    ctx.scale(2, 2)

    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    // Generate candlestick data
    const candles = 50
    const candleWidth = width / candles
    const data: Array<{ open: number; close: number; high: number; low: number }> = []
    
    let price = 1.0850
    for (let i = 0; i < candles; i++) {
      const change = (Math.random() - 0.5) * 0.002
      const open = price
      const close = price + change
      const high = Math.max(open, close) + Math.random() * 0.001
      const low = Math.min(open, close) - Math.random() * 0.001
      
      data.push({ open, close, high, low })
      price = close
    }

    // Find min and max for scaling
    const allPrices = data.flatMap(d => [d.high, d.low])
    const minPrice = Math.min(...allPrices)
    const maxPrice = Math.max(...allPrices)
    const priceRange = maxPrice - minPrice

    const scaleY = (price: number) => {
      return height - ((price - minPrice) / priceRange) * (height - 40) - 20
    }

    // Clear canvas
    ctx.fillStyle = theme === "dark" ? "#0f172a" : "#f8fafc"
    ctx.fillRect(0, 0, width, height)

    // Draw grid
    ctx.strokeStyle = theme === "dark" ? "#1e293b" : "#e2e8f0"
    ctx.lineWidth = 1
    for (let i = 0; i < 5; i++) {
      const y = (height / 5) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(width, y)
      ctx.stroke()
    }

    // Draw candlesticks
    data.forEach((candle, i) => {
      const x = i * candleWidth + candleWidth / 2
      const isGreen = candle.close > candle.open

      // Draw wick
      ctx.strokeStyle = isGreen ? "#10b981" : "#ef4444"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(x, scaleY(candle.high))
      ctx.lineTo(x, scaleY(candle.low))
      ctx.stroke()

      // Draw body
      const bodyTop = scaleY(Math.max(candle.open, candle.close))
      const bodyBottom = scaleY(Math.min(candle.open, candle.close))
      const bodyHeight = bodyBottom - bodyTop

      ctx.fillStyle = isGreen ? "#10b981" : "#ef4444"
      ctx.fillRect(x - candleWidth / 3, bodyTop, candleWidth / 1.5, Math.max(bodyHeight, 2))
    })

    // Draw moving average
    ctx.strokeStyle = theme === "dark" ? "#3b82f6" : "#2563eb"
    ctx.lineWidth = 2
    ctx.beginPath()
    
    const maWindow = 10
    for (let i = maWindow; i < data.length; i++) {
      const ma = data.slice(i - maWindow, i).reduce((sum, d) => sum + d.close, 0) / maWindow
      const x = i * candleWidth + candleWidth / 2
      const y = scaleY(ma)
      
      if (i === maWindow) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.stroke()

    // Draw current price line
    const currentPrice = data[data.length - 1].close
    const currentY = scaleY(currentPrice)
    
    ctx.strokeStyle = theme === "dark" ? "#06b6d4" : "#0891b2"
    ctx.lineWidth = 2
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(0, currentY)
    ctx.lineTo(width, currentY)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw price label
    ctx.fillStyle = theme === "dark" ? "#06b6d4" : "#0891b2"
    ctx.fillRect(width - 80, currentY - 12, 75, 24)
    ctx.fillStyle = "white"
    ctx.font = "12px sans-serif"
    ctx.textAlign = "right"
    ctx.fillText(currentPrice.toFixed(4), width - 5, currentY + 4)

  }, [asset, theme])

  return (
    <Card className={theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}>
      <CardHeader>
        <CardTitle className={`flex items-center justify-between ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          <span>{asset}</span>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>Alta</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>Baixa</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-0.5 bg-blue-500"></div>
              <span className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>MA(10)</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <canvas
          ref={canvasRef}
          className="w-full h-[400px] rounded-lg"
          style={{ imageRendering: "crisp-edges" }}
        />
      </CardContent>
    </Card>
  )
}
