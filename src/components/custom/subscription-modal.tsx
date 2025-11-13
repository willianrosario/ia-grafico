"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, Crown } from "lucide-react"

interface SubscriptionModalProps {
  isOpen: boolean
  onSubscribe: () => void
}

export function SubscriptionModal({ isOpen, onSubscribe }: SubscriptionModalProps) {
  const features = [
    "Sinais ilimitados de CALL e PUT",
    "Análise em tempo real 24/7",
    "Notificações de mercado",
    "Histórico completo de operações",
    "Relatórios semanais e mensais",
    "Suporte prioritário",
    "Atualizações automáticas da IA",
    "Acesso a todos os ativos"
  ]

  return (
    <Dialog open={isOpen}>
      <DialogContent className="bg-slate-900 border-slate-800 text-white max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          <DialogTitle className="text-2xl text-center">
            Seu período de teste acabou
          </DialogTitle>
          <DialogDescription className="text-slate-400 text-center">
            Continue aproveitando todos os recursos do TradeGenius
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Price */}
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-5xl font-bold text-white">R$ 97</span>
              <span className="text-slate-400">/mês</span>
            </div>
            <p className="text-emerald-400 text-sm mt-2 flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4" />
              Cancele quando quiser
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-start gap-3">
                <div className="w-5 h-5 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-emerald-500" />
                </div>
                <span className="text-slate-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <Button
            onClick={onSubscribe}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold h-12 text-lg"
          >
            Assinar agora
          </Button>

          <p className="text-center text-slate-500 text-xs">
            Pagamento seguro • Cancele quando quiser
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
