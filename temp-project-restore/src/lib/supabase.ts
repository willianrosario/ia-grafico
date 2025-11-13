import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Tipos do banco de dados
export type User = {
  id: string
  email: string
  name: string
  created_at: string
  trial_start_date: string
  has_subscription: boolean
  subscription_end_date?: string
}

export type UserConfig = {
  id: string
  user_id: string
  broker: string
  investment_amount: number
  preferred_timeframe: string
  created_at: string
  updated_at: string
}

export type TradingSignal = {
  id: string
  user_id: string
  asset_name: string
  signal_type: 'CALL' | 'PUT'
  timeframe: string
  entry_price: number
  estimated_profit: number
  confidence_score: number
  created_at: string
  result: 'WIN' | 'LOSS' | 'PENDING'
}

export type TradeHistory = {
  id: string
  user_id: string
  signal_id: string
  asset_name: string
  operation_type: string
  entry_price: number
  exit_price: number
  profit_loss: number
  timeframe: string
  created_at: string
}
