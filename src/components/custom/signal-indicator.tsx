"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, ArrowUp, ArrowDown, ExternalLink } from "lucide-react"

interface SignalIndicatorProps {
  signal: "CALL" | "PUT" | null
  confidence: number
  estimatedProfit: number
  investmentAmount: number
  theme: "light" | "dark"
  onOpenBroker: () => void
}

export function SignalIndicator({ 
  signal, 
  confidence, 
  estimatedProfit, 
  investmentAmount,
  theme,
  onOpenBroker
}: SignalIndicatorProps) {
  if (!signal) {
    return (
      <Card className={theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}>
        <CardContent className="p-8 text-center">
          <div className={`text-6xl mb-4 ${theme === "dark" ? "text-slate-700" : "text-slate-300"}`}>
            📊
          </div>
          <p className={`text-lg font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
            Analisando mercado...
          </p>
          <p className={`text-sm ${theme === "dark" ? "text-slate-500" : "text-slate-500"} mt-2`}>
            Aguarde o próximo sinal
          </p>
        </CardContent>
      </Card>
    )
  }

  const isCall = signal === "CALL"

  return (
    <Card className={`${
      isCall 
        ? "bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-emerald-500/50" 
        : "bg-gradient-to-br from-red-500/20 to-red-600/20 border-red-500/50"
    } animate-pulse`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className={theme === "dark" ? "text-white" : "text-slate-900"}>
            Sinal Detectado
          </span>
          <Badge 
            variant="secondary" 
            className={`${
              isCall 
                ? "bg-emerald-500 text-white" 
                : "bg-red-500 text-white"
            } text-lg px-4 py-1`}
          >
            {confidence}% confiança
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Signal Display */}
        <div className="flex items-center justify-center gap-6 py-8">
          <div className={`w-32 h-32 rounded-3xl flex items-center justify-center ${
            isCall 
              ? "bg-gradient-to-br from-emerald-500 to-emerald-600" 
              : "bg-gradient-to-br from-red-500 to-red-600"
          } shadow-2xl`}>
            {isCall ? (
              <ArrowUp className="w-16 h-16 text-white" strokeWidth={3} />
            ) : (
              <ArrowDown className="w-16 h-16 text-white" strokeWidth={3} />
            )}
          </div>
          <div>
            <p className={`text-sm font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"} mb-2`}>
              Recomendação
            </p>
            <p className={`text-5xl font-bold ${
              isCall ? "text-emerald-500" : "text-red-500"
            }`}>
              {signal}
            </p>
            <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"} mt-1`}>
              {isCall ? "Comprar agora" : "Vender agora"}
            </p>
          </div>
        </div>

        {/* Profit Estimation */}
        <div className={`${
          theme === "dark" ? "bg-slate-800/50" : "bg-slate-100"
        } rounded-xl p-6 space-y-4`}>
          <div className="flex items-center justify-between">
            <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              Investimento
            </span>
            <span className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              R$ {investmentAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
              Lucro estimado
            </span>
            <span className="text-2xl font-bold text-emerald-500">
              + R$ {estimatedProfit.toFixed(2)}
            </span>
          </div>
          <div className={`border-t ${theme === "dark" ? "border-slate-700" : "border-slate-300"} pt-4`}>
            <div className="flex items-center justify-between">
              <span className={`text-sm font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                Total esperado
              </span>
              <span className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                R$ {(investmentAmount + estimatedProfit).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={onOpenBroker}
          className={`w-full h-14 text-lg font-semibold ${
            isCall
              ? "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
              : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          } text-white shadow-lg`}
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          Executar operação na corretora
        </Button>

        {/* Action Hint */}
        <div className={`${
          isCall 
            ? "bg-emerald-500/10 border-emerald-500/30" 
            : "bg-red-500/10 border-red-500/30"
        } border rounded-lg p-4`}>
          <p className={`text-sm ${
            isCall ? "text-emerald-400" : "text-red-400"
          }`}>
            💡 Clique no botão acima para abrir sua corretora e executar a operação. Tempo recomendado: 5 minutos.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
