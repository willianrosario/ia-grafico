"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Clock } from "lucide-react"

interface MarketStatusProps {
  isOpen: boolean
  asset: string
  theme: "light" | "dark"
}

export function MarketStatus({ isOpen, asset, theme }: MarketStatusProps) {
  const now = new Date()
  const openTime = "09:00"
  const closeTime = "18:00"

  return (
    <Card className={`${
      isOpen 
        ? "bg-gradient-to-r from-emerald-500/20 to-emerald-600/20 border-emerald-500/50" 
        : "bg-gradient-to-r from-red-500/20 to-red-600/20 border-red-500/50"
    }`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              isOpen 
                ? "bg-emerald-500" 
                : "bg-red-500"
            }`}>
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`text-lg font-semibold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                  {asset}
                </h3>
                <Badge 
                  variant="secondary" 
                  className={`${
                    isOpen 
                      ? "bg-emerald-500 text-white" 
                      : "bg-red-500 text-white"
                  }`}
                >
                  {isOpen ? "Aberto" : "Fechado"}
                </Badge>
              </div>
              <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                {isOpen 
                  ? `Operando • Fecha às ${closeTime}` 
                  : `Fechado • Abre às ${openTime}`
                }
              </p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-1">
              <Clock className="w-4 h-4" />
              <span>{now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
            <p className={`text-xs ${theme === "dark" ? "text-slate-500" : "text-slate-600"}`}>
              Horário de Brasília
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
