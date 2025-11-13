"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  DollarSign, 
  Settings, 
  Bell,
  Moon,
  Sun,
  BarChart3,
  Activity,
  Target,
  Zap,
  ExternalLink
} from "lucide-react"
import { TradingChart } from "./trading-chart"
import { SignalIndicator } from "./signal-indicator"
import { MarketStatus } from "./market-status"
import { HistoryPanel } from "./history-panel"
import { SettingsPanel } from "./settings-panel"
import { toast } from "sonner"

interface TradingDashboardProps {
  userConfig: {
    broker: string
    investmentAmount: number
  } | null
}

// URLs das corretoras
const BROKER_URLS: Record<string, string> = {
  "IQ Option": "https://iqoption.com/pt/trade",
  "Quotex": "https://qxbroker.com/pt/trade",
  "Pocket Option": "https://po.trade/pt/cabinet/demo-quick-high-low",
  "Binomo": "https://binomo.com/trading",
  "Olymp Trade": "https://olymptrade.com/pt/platform"
}

export function TradingDashboard({ userConfig }: TradingDashboardProps) {
  const [currentSignal, setCurrentSignal] = useState<"CALL" | "PUT" | null>(null)
  const [confidence, setConfidence] = useState(0)
  const [estimatedProfit, setEstimatedProfit] = useState(0)
  const [isMarketOpen, setIsMarketOpen] = useState(true)
  const [currentAsset, setCurrentAsset] = useState("EUR/USD")
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [showSettings, setShowSettings] = useState(false)
  const [signalHistory, setSignalHistory] = useState<Array<{
    time: string
    signal: "CALL" | "PUT"
    asset: string
    result?: "win" | "loss"
    profit?: number
  }>>([])

  // Simular análise de mercado em tempo real
  useEffect(() => {
    const interval = setInterval(() => {
      // Verificar horário de mercado (simulado)
      const hour = new Date().getHours()
      const isOpen = hour >= 9 && hour < 18
      setIsMarketOpen(isOpen)

      if (isOpen) {
        // Gerar sinal aleatório (simulação de IA)
        const shouldGenerateSignal = Math.random() > 0.7 // 30% de chance
        
        if (shouldGenerateSignal) {
          const signal = Math.random() > 0.5 ? "CALL" : "PUT"
          const conf = Math.floor(Math.random() * 30) + 70 // 70-100%
          
          setCurrentSignal(signal)
          setConfidence(conf)
          
          // Calcular lucro estimado
          const investment = userConfig?.investmentAmount || 100
          const profit = investment * 0.85 // 85% de retorno
          setEstimatedProfit(profit)

          // Notificação sonora e visual
          toast.success(`Novo sinal ${signal}!`, {
            description: `Confiança: ${conf}% | Lucro estimado: R$ ${profit.toFixed(2)}`,
            duration: 5000,
          })

          // Adicionar ao histórico
          setSignalHistory(prev => [{
            time: new Date().toLocaleTimeString(),
            signal,
            asset: currentAsset,
          }, ...prev.slice(0, 19)])
        }
      }
    }, 15000) // Verificar a cada 15 segundos

    return () => clearInterval(interval)
  }, [userConfig, currentAsset])

  // Notificação de abertura/fechamento de mercado
  useEffect(() => {
    const checkMarketStatus = () => {
      const hour = new Date().getHours()
      const minute = new Date().getMinutes()
      
      if (hour === 9 && minute === 0) {
        toast.success("Mercado aberto!", {
          description: `${currentAsset} - Hora de operar`,
          duration: 10000,
        })
      } else if (hour === 18 && minute === 0) {
        toast.error("Mercado fechado", {
          description: "Operações pausadas até amanhã",
          duration: 10000,
        })
      }
    }

    const interval = setInterval(checkMarketStatus, 60000) // Verificar a cada minuto
    return () => clearInterval(interval)
  }, [currentAsset])

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark")
    document.documentElement.classList.toggle("dark")
  }

  const openBroker = () => {
    const brokerUrl = BROKER_URLS[userConfig?.broker || "IQ Option"]
    if (brokerUrl) {
      window.open(brokerUrl, "_blank", "noopener,noreferrer")
      toast.success("Abrindo corretora...", {
        description: "Faça login e execute a operação manualmente"
      })
    }
  }

  const assets = [
    { name: "EUR/USD", type: "Forex" },
    { name: "GBP/USD", type: "Forex" },
    { name: "BTC/USD", type: "Crypto" },
    { name: "AAPL", type: "Ações" },
    { name: "GOOGL", type: "Ações" },
    { name: "PETR4", type: "B3" },
  ]

  const stats = [
    { label: "Taxa de acerto", value: "76%", icon: Target, color: "text-emerald-500" },
    { label: "Sinais hoje", value: "12", icon: Zap, color: "text-cyan-500" },
    { label: "Lucro estimado", value: `R$ ${(estimatedProfit * 12).toFixed(2)}`, icon: DollarSign, color: "text-emerald-500" },
    { label: "Tempo médio", value: "5min", icon: Clock, color: "text-slate-400" },
  ]

  if (showSettings) {
    return (
      <SettingsPanel
        userConfig={userConfig}
        onBack={() => setShowSettings(false)}
        theme={theme}
        onThemeChange={toggleTheme}
      />
    )
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-950" : "bg-slate-50"} transition-colors`}>
      {/* Header */}
      <header className={`border-b ${theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  TradeGenius
                </h1>
                <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {userConfig?.broker}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={openBroker}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Abrir Corretora
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className={theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}
              >
                {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowSettings(true)}
                className={theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <Card key={stat.label} className={theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {stat.value}
                </p>
                <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Chart Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Market Status */}
            <MarketStatus 
              isOpen={isMarketOpen} 
              asset={currentAsset}
              theme={theme}
            />

            {/* Asset Selector */}
            <Card className={theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}>
              <CardHeader className="pb-3">
                <CardTitle className={theme === "dark" ? "text-white" : "text-slate-900"}>
                  Ativo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {assets.map((asset) => (
                    <Button
                      key={asset.name}
                      variant={currentAsset === asset.name ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentAsset(asset.name)}
                      className={currentAsset === asset.name 
                        ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white" 
                        : theme === "dark" 
                          ? "bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                          : "bg-white border-slate-300 text-slate-900 hover:bg-slate-100"
                      }
                    >
                      {asset.name}
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {asset.type}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Trading Chart */}
            <TradingChart asset={currentAsset} theme={theme} />

            {/* Signal Indicator */}
            <SignalIndicator
              signal={currentSignal}
              confidence={confidence}
              estimatedProfit={estimatedProfit}
              investmentAmount={userConfig?.investmentAmount || 100}
              theme={theme}
              onOpenBroker={openBroker}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <HistoryPanel history={signalHistory} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  )
}
