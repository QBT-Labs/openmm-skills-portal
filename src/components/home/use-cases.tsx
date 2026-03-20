'use client'

import {
  Wallet,
  Search,
  Bot,
  BookOpen,
  TrendingDown,
  ShieldAlert,
  MessageSquare
} from 'lucide-react'
import { useFadeInOnScroll, useAlternatingSlideIn } from '@/hooks/use-scroll-animation'

const useCases = [
  {
    icon: Wallet,
    title: 'Portfolio Tracker',
    description: 'Monitor balances and P&L across all your exchanges in real-time.',
    gradient: 'from-green-400 to-emerald-500',
    bgGlow: 'bg-green-500/20',
    examplePrompt: '"Show me my total portfolio value across all exchanges"',
  },
  {
    icon: Search,
    title: 'Market Scanner',
    description: 'Find arbitrage opportunities and set up intelligent price alerts.',
    gradient: 'from-blue-400 to-cyan-500',
    bgGlow: 'bg-blue-500/20',
    examplePrompt: '"Find tokens with >2% price difference between MEXC and Gate.io"',
  },
  {
    icon: Bot,
    title: 'Trading Bot',
    description: 'Build automated strategies, grid bots, and execute complex orders.',
    gradient: 'from-purple-400 to-pink-500',
    bgGlow: 'bg-purple-500/20',
    examplePrompt: '"Set up a grid bot for ETH/USDT between $3000-$4000"',
  },
  {
    icon: BookOpen,
    title: 'Research Assistant',
    description: 'Analyze orderbooks, trade history, and market depth instantly.',
    gradient: 'from-orange-400 to-amber-500',
    bgGlow: 'bg-orange-500/20',
    examplePrompt: '"Analyze the BTC orderbook and tell me where the support levels are"',
  },
  {
    icon: TrendingDown,
    title: 'DCA Bot',
    description: 'Automate dollar-cost averaging with customizable schedules.',
    gradient: 'from-teal-400 to-cyan-500',
    bgGlow: 'bg-teal-500/20',
    examplePrompt: '"Buy $100 of BTC every Monday at 9 AM"',
  },
  {
    icon: ShieldAlert,
    title: 'Risk Monitor',
    description: 'Track position sizing, exposure limits, and get risk alerts.',
    gradient: 'from-red-400 to-rose-500',
    bgGlow: 'bg-red-500/20',
    examplePrompt: '"Alert me if my exposure to any single token exceeds 20%"',
  },
]

function UseCaseIcon({ icon: Icon, gradient, bgGlow }: { icon: typeof Wallet, gradient: string, bgGlow: string }) {
  return (
    <div className="relative">
      {/* Glow effect */}
      <div className={`absolute inset-0 ${bgGlow} rounded-xl blur-xl opacity-50`} />
      {/* Icon container */}
      <div className={`relative w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
        <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
      </div>
    </div>
  )
}

export function UseCases() {
  const headerRef = useFadeInOnScroll<HTMLDivElement>()
  const gridRef = useAlternatingSlideIn<HTMLDivElement>('.usecase-card')

  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm mb-6">
          <MessageSquare className="w-3.5 h-3.5" />
          Just ask your agent
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
            What Can You Build?
          </span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          Give your AI agent superpowers. Here&apos;s what becomes possible with OpenMM.
        </p>
      </div>

      {/* Use Cases Grid */}
      <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {useCases.map((useCase) => (
          <div
            key={useCase.title}
            className="usecase-card group relative p-6 rounded-xl border border-border bg-card/80 hover:border-purple-500/30 hover:bg-card transition-all duration-300 flex flex-col card-hover-glow"
          >
            {/* Icon */}
            <div className="mb-5">
              <UseCaseIcon icon={useCase.icon} gradient={useCase.gradient} bgGlow={useCase.bgGlow} />
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2 text-white group-hover:text-purple-300 transition-colors">
              {useCase.title}
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed mb-4">
              {useCase.description}
            </p>

            {/* Example Prompt */}
            <div className="mt-auto pt-4 border-t border-border/50">
              <div className="flex items-start gap-2">
                <span className="text-purple-400 text-xs font-medium shrink-0 mt-0.5">TRY:</span>
                <p className="text-gray-400 text-sm italic leading-snug">
                  {useCase.examplePrompt}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-12">
        <p className="text-gray-400 text-sm">
          And that&apos;s just the beginning. Your agent can combine these tools in endless ways.
        </p>
      </div>
    </section>
  )
}
