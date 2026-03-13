'use client'

import { Copy, Check, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { AccessMethods } from '@/components/home/access-methods'
import { SupportedExchanges } from '@/components/home/supported-exchanges'
import { UseCases } from '@/components/home/use-cases'
import { InteractiveTerminal } from '@/components/home/interactive-terminal'
import { MCPClients } from '@/components/home/mcp-clients'
import { PlugAndPlaySkills } from '@/components/home/plug-and-play-skills'
import { AnimatedHero } from '@/components/home/animated-hero'

const INSTALL_COMMAND = 'npm install -g @3rd-eye-labs/openmm @qbtlabs/openmm-mcp'

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
      {/* Animated Hero with Orb Background */}
      <AnimatedHero />

      {/* Install Command + CTA Section */}
      <section className="max-w-5xl mx-auto px-4 -mt-8 pb-16 text-center relative z-20">
        {/* Install Command */}
        <div className="install-box inline-flex items-center gap-3 mb-8">
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
      </section>

      {/* Interactive Terminal Section - Right after Browse Skills */}
      <InteractiveTerminal />

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

      {/* MCP Clients Section */}
      <MCPClients />

      {/* Plug and Play Skills Section */}
      <PlugAndPlaySkills />

      {/* Use Cases Section */}
      <UseCases />

      {/* Supported Exchanges Section */}
      <SupportedExchanges />

      {/* Access Methods Section */}
      <AccessMethods />

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
              <span className="text-gray-300">npm install -g @3rd-eye-labs/openmm @qbtlabs/openmm-mcp</span>
            </div>
            <div className="text-gray-500">✓ Installed OpenMM CLI and MCP server</div>
            <div className="mt-3 flex items-start gap-2">
              <span className="text-purple-400">$</span>
              <span className="text-gray-300">npx @3rd-eye-labs/openmm setup</span>
            </div>
            <div className="text-gray-500">✓ Configured MEXC, Gate.io, Bitget, Kraken</div>
            <div className="mt-3 flex items-start gap-2">
              <span className="text-purple-400">$</span>
              <span className="text-gray-300">npx @qbtlabs/openmm-mcp setup</span>
            </div>
            <div className="text-gray-500">✓ Configured Claude Code, Cursor, Windsurf</div>
            <div className="text-gray-500">✓ 30 tools available</div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <div className="flex items-start gap-2">
                <span className="text-green-400">Agent:</span>
                <span className="text-gray-300">&quot;What&apos;s my total balance across all exchanges?&quot;</span>
              </div>
              <div className="flex items-start gap-2 mt-2">
                <span className="text-purple-400">OpenMM:</span>
                <span className="text-gray-300">$12,450.32 across 4 exchanges (MEXC: $8,200, Gate.io: $2,100...)</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
