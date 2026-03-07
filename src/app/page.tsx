'use client'

import { Copy, Check, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const INSTALL_COMMAND = 'npx openmm init'

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

const features = [
  {
    icon: Zap,
    title: 'Instant Setup',
    description: 'One command to connect your AI agent to multiple exchanges.',
  },
  {
    icon: Sparkles,
    title: 'MCP Native',
    description: 'Built for Claude, Cursor, and any MCP-compatible agent.',
  },
  {
    icon: Shield,
    title: 'Production Ready',
    description: 'Battle-tested with 99.9% uptime and <100ms response times.',
  },
]

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient background effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-500/20 rounded-full blur-[128px] pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto px-4 pt-24 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            Now with Cardano DEX support
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              AI Trading Tools
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              For Your Agent
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Connect any MCP-compatible AI agent to crypto exchanges. 
            Get prices, place orders, and run strategies with natural language.
          </p>

          {/* Stats Bar */}
          <div className="flex items-center justify-center gap-4 sm:gap-8 text-sm mb-10 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">4</span>
              <span className="text-gray-500">Exchanges</span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">30+</span>
              <span className="text-gray-500">Tools</span>
            </div>
            <div className="w-px h-4 bg-border hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">Open</span>
              <span className="text-gray-500">Source</span>
            </div>
          </div>

          {/* Install Command */}
          <div className="install-box inline-flex items-center gap-3 mb-10">
            <span className="text-gray-500">$</span>
            <code className="text-purple-400 font-medium">{INSTALL_COMMAND}</code>
            <CopyButton text={INSTALL_COMMAND} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/skills">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Browse Skills
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Read the Docs
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-border bg-card/50 hover:border-purple-500/50 hover:bg-card transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <feature.icon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Code Preview Section */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-card">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-gray-500 ml-2">Terminal</span>
          </div>
          
          {/* Terminal content */}
          <div className="p-6 font-mono text-sm space-y-3">
            <div className="flex items-start gap-2">
              <span className="text-purple-400">$</span>
              <span className="text-gray-300">npx openmm init</span>
            </div>
            <div className="text-gray-500">✓ Connected to MEXC, Gate.io, Bitget, Kraken</div>
            <div className="text-gray-500">✓ 30 tools available</div>
            <div className="text-gray-500">✓ MCP server ready on port 3000</div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="flex items-start gap-2">
                <span className="text-green-400">Agent:</span>
                <span className="text-gray-300">&quot;What&apos;s the BTC/USDT price on MEXC?&quot;</span>
              </div>
              <div className="flex items-start gap-2 mt-2">
                <span className="text-purple-400">OpenMM:</span>
                <span className="text-gray-300">$97,234.50 (24h: +2.3%)</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
