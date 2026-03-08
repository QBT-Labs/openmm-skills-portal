'use client'

import { Copy, Check, Zap, Search, Target, Bot, Shield, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className="p-1.5 hover:bg-white/10 rounded transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
    </button>
  )
}

function PromptCard({ prompt, tools }: { prompt: string; tools?: string[] }) {
  return (
    <div className="group bg-secondary/30 hover:bg-secondary/50 border border-border rounded-lg p-4 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <p className="text-gray-300 text-sm flex-1">&ldquo;{prompt}&rdquo;</p>
        <CopyButton text={prompt} />
      </div>
      {tools && (
        <div className="flex gap-2 mt-3">
          {tools.map((tool) => (
            <span key={tool} className="text-xs text-purple-400 bg-purple-500/20 px-2 py-0.5 rounded">
              {tool}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

const categories = [
  {
    icon: Zap,
    title: 'Portfolio Intelligence',
    color: 'from-green-500 to-emerald-500',
    prompts: [
      { text: 'Show me my total portfolio value across all exchanges', tools: ['balance'] },
      { text: 'What percentage of my portfolio is in stablecoins?', tools: ['balance'] },
      { text: 'Compare my balances on MEXC vs Gate.io', tools: ['balance'] },
      { text: 'Am I overexposed to any single token? (>25%)', tools: ['balance'] },
      { text: 'List all my assets sorted by value', tools: ['balance', 'ticker'] },
      { text: 'What is my BTC allocation across exchanges?', tools: ['balance'] },
    ],
  },
  {
    icon: Search,
    title: 'Market Research',
    color: 'from-blue-500 to-cyan-500',
    prompts: [
      { text: 'Analyze the BTC/USDT orderbook and identify support/resistance levels', tools: ['orderbook'] },
      { text: 'Show me the last 50 trades for ETH/USDT — is it mostly buying or selling?', tools: ['trades'] },
      { text: 'What is the spread for SOL/USDT across all exchanges?', tools: ['ticker'] },
      { text: 'Find the best price for buying 5 ETH right now', tools: ['ticker', 'orderbook'] },
      { text: 'How deep is the BTC/USDT orderbook within 1% of current price?', tools: ['orderbook'] },
      { text: 'Show me the bid/ask imbalance for ETH — who has more pressure?', tools: ['orderbook'] },
    ],
  },
  {
    icon: Target,
    title: 'Arbitrage & Opportunities',
    color: 'from-yellow-500 to-orange-500',
    prompts: [
      { text: 'Find tokens with >2% price difference between MEXC and Gate.io', tools: ['ticker'] },
      { text: 'Compare SNEK price on CEXs vs Cardano DEXs', tools: ['ticker', 'cardano_price'] },
      { text: 'Which Cardano pool has the best liquidity for INDY?', tools: ['discover_pools'] },
      { text: 'Is there arbitrage between Minswap and MEXC for SNEK?', tools: ['cardano_price', 'ticker'] },
      { text: 'Find the cheapest exchange to buy ADA right now', tools: ['ticker'] },
      { text: 'Show me price differences for all my tokens across exchanges', tools: ['balance', 'ticker'] },
    ],
  },
  {
    icon: Bot,
    title: 'Trading Automation',
    color: 'from-purple-500 to-pink-500',
    prompts: [
      { text: 'Set up a grid bot for BTC/USDT between $60k-$70k with 10 levels', tools: ['grid_start'] },
      { text: 'Show my active grid strategy status', tools: ['grid_status'] },
      { text: 'List all my open orders on MEXC', tools: ['list_orders'] },
      { text: 'Cancel all open orders for ETH/USDT', tools: ['orders'] },
      { text: 'Place a limit buy for 0.1 BTC at $65,000', tools: ['orders'] },
      { text: 'Stop my grid strategy and show final profit', tools: ['grid_stop'] },
    ],
  },
  {
    icon: Shield,
    title: 'Risk & Alerts',
    color: 'from-red-500 to-rose-500',
    prompts: [
      { text: 'Alert me if any single position exceeds 30% of my portfolio', tools: ['balance'] },
      { text: 'What is my total exposure to altcoins vs BTC/ETH?', tools: ['balance'] },
      { text: 'Notify me when BTC drops below $65k on any exchange', tools: ['ticker'] },
      { text: 'How much would I lose if BTC dropped 20%?', tools: ['balance', 'ticker'] },
      { text: 'Check if any of my open orders are at risk of being filled', tools: ['list_orders', 'ticker'] },
      { text: 'What percentage of my portfolio is in low-liquidity tokens?', tools: ['balance', 'orderbook'] },
    ],
  },
  {
    icon: TrendingUp,
    title: 'Cardano DeFi',
    color: 'from-teal-500 to-cyan-500',
    prompts: [
      { text: 'Get the current SNEK price in ADA and USD', tools: ['cardano_price'] },
      { text: 'Find all liquidity pools for INDY with >$100k TVL', tools: ['discover_pools'] },
      { text: 'Compare NIGHT price across all Cardano DEXs', tools: ['cardano_price'] },
      { text: 'Which DEX has the deepest liquidity for MIN token?', tools: ['discover_pools'] },
      { text: 'Show me arbitrage opportunities between Minswap and SundaeSwap', tools: ['discover_pools', 'cardano_price'] },
      { text: 'What is the ADA/USDT rate used for Cardano token pricing?', tools: ['cardano_price'] },
    ],
  },
]

export default function PromptsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12 text-center">
        <Link href="/" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-4">
          Prompt Library
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Copy-paste prompts to get started with OpenMM. Click any prompt to copy it.
        </p>
      </div>

      {/* Hero Prompt */}
      <div className="mb-12 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-8 text-center">
        <p className="text-sm text-purple-400 mb-2">Try this first</p>
        <div className="flex items-center justify-center gap-3">
          <p className="text-2xl text-white">&ldquo;Show me my portfolio across all exchanges&rdquo;</p>
          <CopyButton text="Show me my portfolio across all exchanges" />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {categories.map((category) => (
          <section key={category.title}>
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                <category.icon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold">{category.title}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {category.prompts.map((prompt, idx) => (
                <PromptCard key={idx} prompt={prompt.text} tools={prompt.tools} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 text-center bg-card border border-border rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Ready to try these?</h2>
        <p className="text-gray-400 mb-6">
          Install OpenMM in 30 seconds and start using these prompts with your AI agent.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/docs/mcp-setup"
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors"
          >
            Setup Guide
          </Link>
          <Link
            href="/skills"
            className="px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-lg font-medium transition-colors"
          >
            View Skills
          </Link>
        </div>
      </div>
    </div>
  )
}
