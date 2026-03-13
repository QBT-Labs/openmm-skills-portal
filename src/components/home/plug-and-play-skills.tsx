'use client'

import { Copy, Check, ArrowRight, Wallet, TrendingUp, Grid3X3, ListOrdered, Coins } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className="p-2 hover:bg-white/10 rounded-md transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
      )}
    </button>
  )
}

const skillCards = [
  {
    icon: Wallet,
    name: 'openmm-portfolio',
    description: 'Track balances and portfolio value across exchanges',
    tools: 3,
    color: 'text-green-400',
    bgColor: 'bg-green-500/10',
  },
  {
    icon: TrendingUp,
    name: 'openmm-exchange-setup',
    description: 'Configure and manage exchange API connections',
    tools: 4,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
  },
  {
    icon: Grid3X3,
    name: 'openmm-grid-trading',
    description: 'Setup and monitor grid trading strategies',
    tools: 5,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
  },
  {
    icon: ListOrdered,
    name: 'openmm-order-management',
    description: 'Place, modify, and cancel orders on any exchange',
    tools: 6,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
  },
  {
    icon: Coins,
    name: 'openmm-cardano-dex',
    description: 'Cardano DEX pool discovery and price aggregation',
    tools: 4,
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
  },
]

const INSTALL_COMMAND = 'npx @qbtlabs/openmm-skills --all'

export function PlugAndPlaySkills() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm mb-4">
          <span>🔌</span>
          <span>Plug & Play</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Install All Skills with One Command
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto mb-8">
          Get instant access to market data, trading, and Cardano DEX tools. Works with any MCP-compatible AI agent.
        </p>
        
        {/* Install Command Box */}
        <div className="inline-flex items-center gap-3 install-box mb-4">
          <span className="text-gray-500">$</span>
          <code className="text-purple-400 font-medium">{INSTALL_COMMAND}</code>
          <CopyButton text={INSTALL_COMMAND} />
        </div>
        
        <p className="text-sm text-gray-500">
          Or explore individual skills on{' '}
          <a 
            href="https://github.com/QBT-Labs/OpenMM-ai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>

      {/* Skill Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {skillCards.map((skill) => (
          <div
            key={skill.name}
            className="group p-5 rounded-xl border border-border bg-card/50 hover:border-purple-500/50 hover:bg-card transition-all duration-300"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg ${skill.bgColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <skill.icon className={`w-5 h-5 ${skill.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm mb-1 group-hover:text-purple-400 transition-colors truncate">
                  {skill.name}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed mb-2">
                  {skill.description}
                </p>
                <span className="text-xs text-gray-500">{skill.tools} tools</span>
              </div>
            </div>
          </div>
        ))}
        
        {/* View All Skills Card */}
        <Link
          href="/skills"
          className="group p-5 rounded-xl border border-dashed border-border hover:border-purple-500/50 bg-transparent hover:bg-card/30 transition-all duration-300 flex items-center justify-center"
        >
          <div className="text-center">
            <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-500/20 transition-colors">
              <ArrowRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </div>
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
              View All Skills
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
