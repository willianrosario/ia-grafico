"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, Zap, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

interface MotivationalSplashProps {
  onComplete: () => void
}

export function MotivationalSplash({ onComplete }: MotivationalSplashProps) {
  const [show, setShow] = useState(true)

  const handleContinue = () => {
    setShow(false)
    setTimeout(onComplete, 500)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900"
        >
          <div className="max-w-2xl px-6 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mb-8 flex justify-center gap-4"
            >
              <div className="rounded-full bg-yellow-500/20 p-4">
                <TrendingUp className="h-12 w-12 text-yellow-400" />
              </div>
              <div className="rounded-full bg-green-500/20 p-4">
                <Zap className="h-12 w-12 text-green-400" />
              </div>
              <div className="rounded-full bg-blue-500/20 p-4">
                <Target className="h-12 w-12 text-blue-400" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mb-4 text-5xl font-bold text-white md:text-6xl"
            >
              Chega de Perder Dinheiro!
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-8 text-xl text-gray-200 md:text-2xl"
            >
              Essa é a hora de mudar de vida.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mb-8 space-y-4"
            >
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-lg text-white">
                  ✨ Sinais de IA em tempo real
                </p>
              </div>
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-lg text-white">
                  📈 Análise profissional de mercado
                </p>
              </div>
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <p className="text-lg text-white">
                  💰 Maximize seus lucros com precisão
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <Button
                onClick={handleContinue}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 px-12 py-6 text-xl font-bold text-white shadow-2xl transition-all hover:scale-105 hover:from-green-600 hover:to-emerald-700"
              >
                Começar Agora
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
