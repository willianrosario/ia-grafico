"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Sparkles, DollarSign, Clock } from "lucide-react"

interface OnboardingFlowProps {
  onComplete: (config: { 
    broker: string
    investmentAmount: number
    preferredTimeframe: string
  }) => void
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState(1)
  const [broker, setBroker] = useState("")
  const [investmentAmount, setInvestmentAmount] = useState("100")
  const [preferredTimeframe, setPreferredTimeframe] = useState("5m")

  const brokers = [
    "IQ Option",
    "Binomo",
    "Quotex",
    "Pocket Option",
    "Bullex",
    "Rico Investimentos",
    "XP Investimentos",
    "Clear Corretora",
    "BTG Pactual",
    "Inter Invest",
    "Nubank",
    "Outro"
  ]

  const timeframes = [
    { value: "1m", label: "1 Minuto" },
    { value: "5m", label: "5 Minutos" },
    { value: "15m", label: "15 Minutos" },
    { value: "30m", label: "30 Minutos" },
    { value: "1h", label: "1 Hora" },
    { value: "4h", label: "4 Horas" },
    { value: "1d", label: "1 Dia" }
  ]

  const handleContinue = () => {
    if (step === 1 && broker) {
      setStep(2)
    } else if (step === 2 && investmentAmount) {
      setStep(3)
    } else if (step === 3 && preferredTimeframe) {
      onComplete({
        broker,
        investmentAmount: parseFloat(investmentAmount),
        preferredTimeframe
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl mb-4">
            <TrendingUp className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">TradeGenius</h1>
          <p className="text-slate-400 text-lg">Sinais inteligentes de trading com IA</p>
        </div>

        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className={`h-2 w-20 rounded-full transition-all ${step >= 1 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
          <div className={`h-2 w-20 rounded-full transition-all ${step >= 2 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
          <div className={`h-2 w-20 rounded-full transition-all ${step >= 3 ? 'bg-emerald-500' : 'bg-slate-700'}`} />
        </div>

        {/* Step 1: Broker Selection */}
        {step === 1 && (
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Escolha sua corretora</CardTitle>
              <CardDescription className="text-slate-400">
                Selecione a corretora onde você opera para otimizar a análise
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="broker" className="text-white">Corretora</Label>
                <Select value={broker} onValueChange={setBroker}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="Selecione sua corretora" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {brokers.map((b) => (
                      <SelectItem key={b} value={b} className="text-white focus:bg-slate-700">
                        {b}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium mb-1">7 dias grátis</p>
                    <p className="text-slate-400 text-sm">
                      Teste todas as funcionalidades sem compromisso. Após o período, assine para continuar usando.
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleContinue} 
                disabled={!broker}
                className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold h-12"
              >
                Continuar
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Investment Amount */}
        {step === 2 && (
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Valor de investimento</CardTitle>
              <CardDescription className="text-slate-400">
                Defina o valor padrão para calcular seus lucros estimados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount" className="text-white">Valor por operação (R$)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="amount"
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    className="bg-slate-800 border-slate-700 text-white pl-10 h-12"
                    placeholder="100"
                    min="1"
                  />
                </div>
                <p className="text-slate-500 text-sm">Você pode alterar esse valor a qualquer momento</p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
                <p className="text-emerald-400 text-sm">
                  💡 Com R$ {investmentAmount || "100"} por operação e taxa de acerto de 75%, você pode lucrar aproximadamente R$ {((parseFloat(investmentAmount || "100") * 0.85 * 0.75 - parseFloat(investmentAmount || "100") * 0.25) * 20).toFixed(2)} por mês (20 operações).
                </p>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => setStep(1)} 
                  variant="outline"
                  className="flex-1 bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                >
                  Voltar
                </Button>
                <Button 
                  onClick={handleContinue} 
                  disabled={!investmentAmount || parseFloat(investmentAmount) <= 0}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold"
                >
                  Continuar
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Timeframe Selection */}
        {step === 3 && (
          <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Tempo de operação</CardTitle>
              <CardDescription className="text-slate-400">
                Escolha o timeframe preferido para suas operações
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="timeframe" className="text-white">Timeframe</Label>
                <Select value={preferredTimeframe} onValueChange={setPreferredTimeframe}>
                  <SelectTrigger className="bg-slate-800 border-slate-700 text-white">
                    <SelectValue placeholder="Selecione o timeframe" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    {timeframes.map((tf) => (
                      <SelectItem key={tf.value} value={tf.value} className="text-white focus:bg-slate-700">
                        {tf.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-cyan-500 mt-0.5" />
                  <div>
                    <p className="text-white font-medium mb-1">Recomendação</p>
                    <p className="text-slate-400 text-sm">
                      Para iniciantes, recomendamos começar com 5 ou 15 minutos. Timeframes menores exigem mais atenção e experiência.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => setStep(2)} 
                  variant="outline"
                  className="flex-1 bg-slate-800 border-slate-700 text-white hover:bg-slate-700"
                >
                  Voltar
                </Button>
                <Button 
                  onClick={handleContinue} 
                  disabled={!preferredTimeframe}
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold"
                >
                  Começar agora
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
