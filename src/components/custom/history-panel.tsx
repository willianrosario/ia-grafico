"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TrendingUp, TrendingDown, Clock } from "lucide-react"

interface HistoryPanelProps {
  history: Array<{
    time: string
    signal: "CALL" | "PUT"
    asset: string
    result?: "win" | "loss"
    profit?: number
  }>
  theme: "light" | "dark"
}

export function HistoryPanel({ history, theme }: HistoryPanelProps) {
  return (
    <Card className={theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}>
      <CardHeader>
        <CardTitle className={theme === "dark" ? "text-white" : "text-slate-900"}>
          Histórico de Sinais
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px] pr-4">
          {history.length === 0 ? (
            <div className="text-center py-12">
              <Clock className={`w-12 h-12 mx-auto mb-3 ${theme === "dark" ? "text-slate-700" : "text-slate-300"}`} />
              <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                Nenhum sinal gerado ainda
              </p>
              <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-500"} mt-1`}>
                Aguarde a análise do mercado
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    theme === "dark" 
                      ? "bg-slate-800/50 border-slate-700" 
                      : "bg-slate-50 border-slate-200"
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {item.signal === "CALL" ? (
                        <div className="w-8 h-8 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-emerald-500" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                          <TrendingDown className="w-4 h-4 text-red-500" />
                        </div>
                      )}
                      <div>
                        <p className={`font-semibold ${
                          item.signal === "CALL" ? "text-emerald-500" : "text-red-500"
                        }`}>
                          {item.signal}
                        </p>
                        <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                          {item.asset}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        theme === "dark" 
                          ? "bg-slate-700 text-slate-300" 
                          : "bg-slate-200 text-slate-700"
                      }`}
                    >
                      {item.time}
                    </Badge>
                  </div>
                  
                  {item.result && (
                    <div className={`text-sm font-medium ${
                      item.result === "win" ? "text-emerald-500" : "text-red-500"
                    }`}>
                      {item.result === "win" ? "✓ Ganho" : "✗ Perda"}
                      {item.profit && ` • R$ ${item.profit.toFixed(2)}`}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
