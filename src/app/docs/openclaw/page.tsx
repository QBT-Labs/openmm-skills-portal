'use client'

import { Copy, Check, Zap } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  return (
    <button onClick={copy} className="p-2 hover:bg-white/10 rounded transition-colors" aria-label="Copy">
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
    </button>
  )
}

function CodeBlock({ code, filename }: { code: string; filename?: string }) {
  return (
    <div className="bg-[#0d0d0d] border border-border rounded-lg overflow-hidden">
      {filename && <div className="bg-secondary/50 px-4 py-2 border-b border-border text-sm text-gray-400">{filename}</div>}
      <div className="flex items-start justify-between p-4">
        <pre className="text-sm overflow-x-auto flex-1"><code className="text-gray-300">{code}</code></pre>
        <CopyButton text={code} />
      </div>
    </div>
  )
}

function StepCard({ number, title, children }: { number: number; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 font-bold">{number}</div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="text-gray-400 space-y-4">{children}</div>
    </div>
  )
}

export default function OpenClawGuidePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="mb-12">
        <Link href="/docs" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">← Back to Docs</Link>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">🦞</span>
          <span className="text-sm text-purple-400 bg-purple-500/20 px-2 py-1 rounded">Guide</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">How To: Connect OpenMM to OpenClaw</h1>
        <p className="text-xl text-gray-400">Give your AI agent access to 4+ crypto exchanges in under 5 minutes.</p>
      </div>

      <section className="mb-12">
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-4">What you&apos;ll be able to do:</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-purple-400" /><span>&quot;Show my portfolio across all exchanges&quot;</span></div>
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-purple-400" /><span>&quot;Find arbitrage opportunities for ETH&quot;</span></div>
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-purple-400" /><span>&quot;Set up a grid bot for BTC/USDT&quot;</span></div>
            <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-purple-400" /><span>&quot;What&apos;s the best pool for SNEK on Cardano?&quot;</span></div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
        <ul className="space-y-2 text-gray-400">
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /><span>OpenClaw installed (<code className="text-purple-400">npm install -g openclaw</code>)</span></li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /><span>Node.js 18+ installed</span></li>
          <li className="flex items-center gap-2"><Check className="w-4 h-4 text-green-400" /><span>API keys from at least one exchange</span></li>
        </ul>
      </section>

      {/* Two Options */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Choose Your Setup Method</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
            <h3 className="font-semibold text-green-400 mb-2">Option A: OpenClaw Plugin (Easiest)</h3>
            <p className="text-sm text-gray-400">Full integration with built-in tools. Recommended for most users.</p>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
            <h3 className="font-semibold text-purple-400 mb-2">Option B: Skills via ClawHub</h3>
            <p className="text-sm text-gray-400">Modular skills for specific features. Mix and match what you need.</p>
          </div>
        </div>
      </section>

      {/* Option A: Plugin */}
      <section className="mb-12 space-y-6">
        <h2 className="text-xl font-semibold mb-6">Option A: Install OpenClaw Plugin</h2>
        
        <StepCard number={1} title="Install the OpenMM CLI">
          <p>First, install the OpenMM CLI globally:</p>
          <CodeBlock code="npm install -g @3rd-eye-labs/openmm" filename="Terminal" />
        </StepCard>

        <StepCard number={2} title="Run the Setup Wizard">
          <p>The interactive wizard configures your exchange API credentials:</p>
          <CodeBlock code="openmm setup" filename="Terminal" />
          <p className="text-sm">This will prompt you for your API keys and securely store them.</p>
        </StepCard>

        <StepCard number={3} title="Install the OpenClaw Plugin">
          <p>Add the OpenMM plugin to OpenClaw:</p>
          <CodeBlock code="openclaw plugins install @qbtlabs/openclaw-openmm" filename="Terminal" />
        </StepCard>

        <StepCard number={4} title="Restart OpenClaw">
          <CodeBlock code="openclaw gateway restart" filename="Terminal" />
        </StepCard>
      </section>

      {/* Option B: Skills */}
      <section className="mb-12 space-y-6">
        <h2 className="text-xl font-semibold mb-6">Option B: Install Skills via ClawHub</h2>
        
        <StepCard number={1} title="Install the OpenMM CLI & Configure">
          <p>Install the CLI and run the setup wizard:</p>
          <CodeBlock code={`npm install -g @3rd-eye-labs/openmm
openmm setup`} filename="Terminal" />
        </StepCard>

        <StepCard number={2} title="Install OpenMM Skills">
          <p>Install the skills you need:</p>
          <CodeBlock code={`clawhub install openmm-exchange-setup
clawhub install openmm-grid-trading
clawhub install openmm-portfolio
clawhub install openmm-order-management
clawhub install openmm-cardano-dex`} filename="Terminal" />
          <p className="text-sm">Or install all at once with the skills installer:</p>
          <CodeBlock code="npx @qbtlabs/openmm-skills --all" filename="Terminal" />
        </StepCard>

        <StepCard number={3} title="Restart OpenClaw">
          <CodeBlock code="openclaw gateway restart" filename="Terminal" />
        </StepCard>
      </section>

      {/* Test */}
      <section className="mb-12 space-y-6">
        <h2 className="text-xl font-semibold mb-6">Test Your Setup</h2>
        
        <StepCard number={1} title="Verify Connection">
          <p>Open a chat with your OpenClaw agent and try:</p>
          <div className="bg-secondary/50 rounded-lg p-3 text-purple-400">&quot;Get the BTC/USDT price on MEXC&quot;</div>
        </StepCard>

        <StepCard number={2} title="Try More Commands">
          <div className="space-y-2">
            <div className="bg-secondary/50 rounded-lg p-3 text-purple-400 text-sm">&quot;Show me my total portfolio value across all exchanges&quot;</div>
            <div className="bg-secondary/50 rounded-lg p-3 text-purple-400 text-sm">&quot;Find tokens with &gt;2% price difference between MEXC and Gate.io&quot;</div>
            <div className="bg-secondary/50 rounded-lg p-3 text-purple-400 text-sm">&quot;Set up a grid bot for ETH/USDT between $3000-$4000 with 10 levels&quot;</div>
          </div>
        </StepCard>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Available Skills</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4">Skill</th>
                <th className="text-left py-3 px-4">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code className="text-purple-400">openmm-exchange-setup</code></td>
                <td className="py-3 px-4 text-gray-400">Guide for configuring exchange API credentials</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code className="text-purple-400">openmm-portfolio</code></td>
                <td className="py-3 px-4 text-gray-400">Balance tracking and portfolio overview</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code className="text-purple-400">openmm-order-management</code></td>
                <td className="py-3 px-4 text-gray-400">Place, list, and cancel orders</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code className="text-purple-400">openmm-grid-trading</code></td>
                <td className="py-3 px-4 text-gray-400">Automated grid trading strategies</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4"><code className="text-purple-400">openmm-cardano-dex</code></td>
                <td className="py-3 px-4 text-gray-400">Cardano DEX pool discovery and pricing</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">You&apos;re Ready!</h2>
        <p className="text-gray-400 mb-6">Your AI agent now has access to real-time market data and trading across multiple exchanges.</p>
        <div className="flex justify-center gap-4">
          <Link href="/prompts" className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-medium transition-colors">Browse Prompts</Link>
          <Link href="/docs/workflows" className="px-6 py-3 bg-secondary hover:bg-secondary/80 rounded-lg font-medium transition-colors">Cross-Skill Workflows</Link>
        </div>
      </section>
    </div>
  )
}
