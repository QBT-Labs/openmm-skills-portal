'use client'

import { ArrowRight, Zap, TrendingUp, Shield, Coins, BarChart3 } from 'lucide-react'
import Link from 'next/link'

function WorkflowCard({ icon: Icon, title, description, steps, prompt, skills }: { icon: React.ElementType; title: string; description: string; steps: string[]; prompt: string; skills: string[] }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center"><Icon className="w-5 h-5 text-purple-400" /></div>
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>
        <p className="text-gray-400 mb-6">{description}</p>
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Workflow</h4>
          <div className="flex flex-wrap items-center gap-2">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="bg-secondary/50 px-3 py-1.5 rounded-lg text-sm">{step}</div>
                {idx < steps.length - 1 && <ArrowRight className="w-4 h-4 text-purple-400" />}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-300 mb-3">Skills Used</h4>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (<span key={skill} className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">{skill}</span>))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-3">Try It</h4>
          <div className="bg-[#0d0d0d] border border-border rounded-lg p-4"><p className="text-purple-400 text-sm">&quot;{prompt}&quot;</p></div>
        </div>
      </div>
    </div>
  )
}

const workflows = [
  { icon: TrendingUp, title: 'CEX↔DEX Arbitrage', description: 'Find price differences between centralized exchanges and Cardano DEXs, then execute the trade.', steps: ['Get CEX Price', 'Get DEX Price', 'Calculate Spread', 'Execute Trade'], prompt: 'Find arbitrage for SNEK between MEXC and Minswap, and tell me how to execute it', skills: ['openmm_ticker', 'openmm_cardano_price', 'openmm_discover_pools'] },
  { icon: BarChart3, title: 'Portfolio Rebalancing', description: 'Analyze your portfolio allocation across exchanges and suggest rebalancing trades.', steps: ['Fetch Balances', 'Calculate Weights', 'Identify Drift', 'Suggest Trades'], prompt: 'Analyze my portfolio across all exchanges. Am I overexposed to any token? Suggest rebalancing.', skills: ['openmm_balance', 'openmm_ticker'] },
  { icon: Zap, title: 'Grid Bot Optimization', description: 'Analyze orderbook depth and volatility to set optimal grid parameters.', steps: ['Analyze Orderbook', 'Check Volatility', 'Calculate Levels', 'Deploy Grid'], prompt: 'Analyze ETH/USDT orderbook and set up an optimal grid strategy based on current conditions', skills: ['openmm_orderbook', 'openmm_trades', 'openmm_grid_status'] },
  { icon: Shield, title: 'Risk-Adjusted Entry', description: 'Check liquidity depth and slippage before executing a large trade.', steps: ['Check Depth', 'Estimate Slippage', 'Compare Venues', 'Execute Best'], prompt: 'I want to buy 50 ETH. Which exchange has the best liquidity and what slippage should I expect?', skills: ['openmm_orderbook', 'openmm_ticker'] },
  { icon: Coins, title: 'Cardano Yield Hunt', description: 'Find the best liquidity pools for your Cardano tokens and compare yields.', steps: ['List Pools', 'Compare TVL', 'Check Volume', 'Recommend'], prompt: 'Find the best liquidity pools for INDY with over $100k TVL and compare their volumes', skills: ['openmm_discover_pools', 'openmm_cardano_price'] },
  { icon: TrendingUp, title: 'Multi-Exchange Scanner', description: 'Scan prices across all exchanges to find the best entry/exit points.', steps: ['Fetch All Prices', 'Rank by Price', 'Check Spread', 'Alert'], prompt: 'Show me BTC/USDT prices across all exchanges and highlight the cheapest place to buy', skills: ['openmm_ticker'] },
]

export default function WorkflowsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="mb-12">
        <Link href="/docs" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">← Back to Docs</Link>
        <h1 className="text-4xl font-bold mb-4">Cross-Skill Workflows</h1>
        <p className="text-xl text-gray-400">Combine multiple OpenMM tools to build powerful trading workflows. These examples show how skills work together to solve real problems.</p>
      </div>

      <section className="mb-12">
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">How Cross-Skill Workflows Work</h2>
          <p className="text-gray-400 mb-4">When you ask your AI agent a complex question, it automatically chains multiple tools together:</p>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <div className="bg-card px-4 py-2 rounded-lg">Your Prompt</div>
            <ArrowRight className="w-4 h-4 text-purple-400" />
            <div className="bg-card px-4 py-2 rounded-lg">Tool 1</div>
            <ArrowRight className="w-4 h-4 text-purple-400" />
            <div className="bg-card px-4 py-2 rounded-lg">Tool 2</div>
            <ArrowRight className="w-4 h-4 text-purple-400" />
            <div className="bg-card px-4 py-2 rounded-lg">Tool 3</div>
            <ArrowRight className="w-4 h-4 text-purple-400" />
            <div className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-lg">Insight</div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Example Workflows</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {workflows.map((workflow) => (<WorkflowCard key={workflow.title} {...workflow} />))}
        </div>
      </section>

      <section className="mb-12">
        <div className="bg-card border border-border rounded-xl p-8">
          <h2 className="text-xl font-semibold mb-4">Build Your Own Workflows</h2>
          <p className="text-gray-400 mb-6">The beauty of MCP tools is that you don&apos;t need to code workflows — just describe what you want in natural language. Your AI agent figures out which tools to use and how to combine them.</p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-secondary/50 rounded-lg p-4"><h3 className="font-medium mb-2">Data → Analysis</h3><p className="text-gray-500">&quot;Get orderbook and tell me if there&apos;s a wall&quot;</p></div>
            <div className="bg-secondary/50 rounded-lg p-4"><h3 className="font-medium mb-2">Compare → Decide</h3><p className="text-gray-500">&quot;Compare prices and recommend where to buy&quot;</p></div>
            <div className="bg-secondary/50 rounded-lg p-4"><h3 className="font-medium mb-2">Monitor → Alert</h3><p className="text-gray-500">&quot;Watch for spread &gt;1% and notify me&quot;</p></div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Build?</h2>
        <p className="text-gray-400 mb-6">Start with the prompt library and combine tools to create your own trading workflows.</p>
        <div className="flex justify-center gap-4">
          <Link href="/prompts" className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors">Browse Prompts</Link>
          <Link href="/docs/openclaw" className="px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-lg font-medium transition-colors">Setup Guide</Link>
        </div>
      </section>
    </div>
  )
}
