'use client'

import { Copy, Check, Clock, CheckCircle2, ArrowRight, AlertCircle } from 'lucide-react'
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
      className="p-2 hover:bg-white/10 rounded transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
    </button>
  )
}

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
  return (
    <div className="install-box flex items-center justify-between">
      <pre className="text-sm overflow-x-auto">
        <code className="text-purple-400">{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

const steps = [
  {
    step: 1,
    title: 'Clone the Repository',
    description: 'Get the OpenMM source code',
    code: `git clone https://github.com/3rd-Eye-Labs/OpenMM.git
cd OpenMM`,
    note: 'This clones the repository and changes into the project directory',
  },
  {
    step: 2,
    title: 'Install Dependencies',
    description: 'Install the required Node.js packages',
    code: 'npm install',
    note: 'Requires Node.js 18+',
  },
  {
    step: 3,
    title: 'Configure Environment Variables',
    description: 'Create your .env file with exchange API keys',
    code: `cp .env.example .env`,
    note: null,
  },
  {
    step: 4,
    title: 'Add Your Exchange API Keys',
    description: 'Edit the .env file with your credentials',
    code: `# MEXC
MEXC_API_KEY="your-mexc-api-key"
MEXC_SECRET="your-mexc-secret"

# Gate.io
GATEIO_API_KEY="your-gateio-key"
GATEIO_SECRET="your-gateio-secret"

# Bitget
BITGET_API_KEY="your-bitget-key"
BITGET_SECRET="your-bitget-secret"
BITGET_PASSPHRASE="your-bitget-passphrase"

# Kraken
KRAKEN_API_KEY="your-kraken-key"
KRAKEN_SECRET="your-kraken-secret"`,
    note: 'Only add keys for exchanges you want to use. Market data works without keys.',
    language: 'env',
  },
  {
    step: 5,
    title: 'Initialize OpenMM',
    description: 'Start the MCP server and verify connections',
    code: 'npx openmm init',
    note: '⚠️ This command requires the .env file to be configured first',
  },
  {
    step: 6,
    title: 'Start Using OpenMM',
    description: 'Ask your agent to interact with exchanges',
    code: `"Get the BTC/USDT price on MEXC"
"Show my balances across all exchanges"
"What's the orderbook for ETH/USDT?"`,
    note: 'Your agent now has access to 30+ trading tools',
    language: 'text',
  },
]

const availableTools = [
  { name: 'openmm_ticker', description: 'Get price, bid/ask, spread, 24h volume' },
  { name: 'openmm_orderbook', description: 'Get order book bids and asks' },
  { name: 'openmm_trades', description: 'Get recent trades with buy/sell breakdown' },
  { name: 'openmm_balance', description: 'Get account balances' },
  { name: 'openmm_list_orders', description: 'List open orders' },
  { name: 'openmm_grid_status', description: 'Get grid strategy status' },
  { name: 'openmm_cardano_price', description: 'Get Cardano token prices from DEX' },
  { name: 'openmm_discover_pools', description: 'Discover Cardano DEX pools' },
]

export default function QuickStartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link href="/docs" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
          ← Back to Docs
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-6 h-6 text-purple-400" />
          <span className="text-sm text-purple-400 bg-purple-500/20 px-2 py-1 rounded">5 minute setup</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Quick Start Guide</h1>
        <p className="text-xl text-gray-400">
          Get your AI agent trading in 5 minutes
        </p>
      </div>

      {/* Important Note */}
      <section className="mb-8">
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-yellow-400 font-medium">Environment Variables Required</p>
            <p className="text-yellow-400/80 text-sm mt-1">
              <code className="bg-yellow-500/20 px-1 rounded">npx openmm init</code> requires exchange API keys in your <code className="bg-yellow-500/20 px-1 rounded">.env</code> file. 
              Follow all steps below to configure properly.
            </p>
          </div>
        </div>
      </section>

      {/* Prerequisites */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Prerequisites</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span>Node.js 18+ installed</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span>An MCP-compatible AI agent (Claude Desktop, Cursor, OpenClaw, etc.)</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span>Exchange API keys (required for trading, optional for market data)</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Steps */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Setup Steps</h2>
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.step} className="relative pl-8 border-l-2 border-border">
              <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
                {step.step}
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{step.description}</p>
                <CodeBlock code={step.code} language={step.language} />
                {step.note && (
                  <p className="text-sm text-gray-500 mt-3">💡 {step.note}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Alternative: Quick Install */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Alternative: Global Install</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-gray-400 mb-4">
            If you prefer to install OpenMM globally:
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500 mb-2">1. Install globally</p>
              <CodeBlock code="npm install -g @3rd-eye-labs/openmm" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">2. Set environment variables in your shell profile (~/.zshrc or ~/.bashrc)</p>
              <CodeBlock code={`export MEXC_API_KEY="your-key"
export MEXC_SECRET="your-secret"`} />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-2">3. Initialize</p>
              <CodeBlock code="openmm init" />
            </div>
          </div>
        </div>
      </section>

      {/* Available Tools */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Available Tools</h2>
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-secondary/50">
              <tr>
                <th className="text-left p-4 text-sm font-medium">Tool</th>
                <th className="text-left p-4 text-sm font-medium">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {availableTools.map((tool) => (
                <tr key={tool.name} className="hover:bg-white/5">
                  <td className="p-4">
                    <code className="text-purple-400 text-sm">{tool.name}</code>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">{tool.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/docs/mcp-setup"
            className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
          >
            <div>
              <div className="font-medium">MCP Setup Guide</div>
              <div className="text-sm text-gray-400">Detailed client-specific instructions</div>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400" />
          </Link>
          <Link
            href="/skills"
            className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
          >
            <div>
              <div className="font-medium">Browse Skills</div>
              <div className="text-sm text-gray-400">See all available skill packages</div>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400" />
          </Link>
        </div>
      </section>
    </div>
  )
}
