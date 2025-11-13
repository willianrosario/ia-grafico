"use client"

import { useState, useEffect } from "react"
import { TradingDashboard } from "@/components/custom/trading-dashboard"
import { Button } from "@/components/ui/button"
import { TrendingUp } from "lucide-react"

export default function Home() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    // Simula carregamento inicial
    const timer = setTimeout(() => setIsReady(true), 500)
    return () => clearTimeout(timer)
  }, [])

  if (!isReady) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl mb-4 animate-pulse">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Carregando TradeGenius...</h1>
        </div>
      </div>
    )
  }

  // Configuração padrão para demonstração
  const defaultConfig = {
    broker: "IQ Option",
    investmentAmount: 100,
    preferredTimeframe: "5m"
  }

  return <TradingDashboard userConfig={defaultConfig} />
}
