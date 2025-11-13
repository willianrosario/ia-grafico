"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { 
  ArrowLeft, 
  Bell, 
  Moon, 
  Sun, 
  DollarSign, 
  Building2,
  Globe,
  BarChart3,
  Calendar
} from "lucide-react"
import { useState } from "react"

interface SettingsPanelProps {
  userConfig: {
    broker: string
    investmentAmount: number
    trialStartDate: string
  } | null
  onBack: () => void
  theme: "light" | "dark"
  onThemeChange: () => void
}

export function SettingsPanel({ userConfig, onBack, theme, onThemeChange }: SettingsPanelProps) {
  const [notifications, setNotifications] = useState(true)
  const [soundAlerts, setSoundAlerts] = useState(true)
  const [language, setLanguage] = useState("pt-BR")

  const trialDaysLeft = userConfig ? Math.max(0, 7 - Math.floor(
    (new Date().getTime() - new Date(userConfig.trialStartDate).getTime()) / (1000 * 60 * 60 * 24)
  )) : 0

  const stats = {
    totalSignals: 156,
    winRate: 76,
    totalProfit: 2847.50,
    avgProfit: 18.25
  }

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-slate-950" : "bg-slate-50"}`}>
      {/* Header */}
      <header className={`border-b ${theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className={theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
              Configurações
            </h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          {/* Account Info */}
          <Card className={theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}>
            <CardHeader>
              <CardTitle className={theme === "dark" ? "text-white" : "text-slate-900"}>
                Informações da Conta
              </CardTitle>
              <CardDescription className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
                Detalhes da sua assinatura e corretora
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-emerald-500" />
                  <div>
                    <p className={`font-medium ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                      Período de teste
                    </p>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      {trialDaysLeft} dias restantes
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                  <Building2 className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Corretora</p>
                    <p className="font-medium text-white">{userConfig?.broker}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/50">
                  <DollarSign className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="text-xs text-slate-400">Valor por operação</p>
                    <p className="font-medium text-white">R$ {userConfig?.investmentAmount.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card className={theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}>
            <CardHeader>
              <CardTitle className={theme === "dark" ? "text-white" : "text-slate-900"}>
                Estatísticas
              </CardTitle>
              <CardDescription className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
                Seu desempenho desde o início
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-800/50" : "bg-slate-100"}`}>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"} mb-1`}>
                    Total de sinais
                  </p>
                  <p className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    {stats.totalSignals}
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-800/50" : "bg-slate-100"}`}>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"} mb-1`}>
                    Taxa de acerto
                  </p>
                  <p className="text-2xl font-bold text-emerald-500">
                    {stats.winRate}%
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-800/50" : "bg-slate-100"}`}>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"} mb-1`}>
                    Lucro total
                  </p>
                  <p className="text-2xl font-bold text-emerald-500">
                    R$ {stats.totalProfit.toFixed(2)}
                  </p>
                </div>

                <div className={`p-4 rounded-lg ${theme === "dark" ? "bg-slate-800/50" : "bg-slate-100"}`}>
                  <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"} mb-1`}>
                    Lucro médio
                  </p>
                  <p className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                    R$ {stats.avgProfit.toFixed(2)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card className={theme === "dark" ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"}>
            <CardHeader>
              <CardTitle className={theme === "dark" ? "text-white" : "text-slate-900"}>
                Preferências
              </CardTitle>
              <CardDescription className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
                Personalize sua experiência
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme === "dark" ? (
                    <Moon className="w-5 h-5 text-slate-400" />
                  ) : (
                    <Sun className="w-5 h-5 text-slate-600" />
                  )}
                  <div>
                    <Label className={theme === "dark" ? "text-white" : "text-slate-900"}>
                      Tema escuro
                    </Label>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Alternar entre claro e escuro
                    </p>
                  </div>
                </div>
                <Switch checked={theme === "dark"} onCheckedChange={onThemeChange} />
              </div>

              <Separator className={theme === "dark" ? "bg-slate-800" : "bg-slate-200"} />

              {/* Notifications */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className={`w-5 h-5 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`} />
                  <div>
                    <Label className={theme === "dark" ? "text-white" : "text-slate-900"}>
                      Notificações
                    </Label>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Receber alertas de sinais
                    </p>
                  </div>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>

              <Separator className={theme === "dark" ? "bg-slate-800" : "bg-slate-200"} />

              {/* Sound Alerts */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BarChart3 className={`w-5 h-5 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`} />
                  <div>
                    <Label className={theme === "dark" ? "text-white" : "text-slate-900"}>
                      Alertas sonoros
                    </Label>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Som ao detectar novo sinal
                    </p>
                  </div>
                </div>
                <Switch checked={soundAlerts} onCheckedChange={setSoundAlerts} />
              </div>

              <Separator className={theme === "dark" ? "bg-slate-800" : "bg-slate-200"} />

              {/* Language */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Globe className={`w-5 h-5 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`} />
                  <div>
                    <Label className={theme === "dark" ? "text-white" : "text-slate-900"}>
                      Idioma
                    </Label>
                    <p className={`text-sm ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                      Português (Brasil)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="bg-red-500/10 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-500">Zona de perigo</CardTitle>
              <CardDescription className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
                Ações irreversíveis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full">
                Resetar configurações
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
