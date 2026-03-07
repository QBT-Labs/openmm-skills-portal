'use client'

import { Copy, Check, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
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
    title: 'Install the OpenMM Skills',
    description: 'Add OpenMM tools to your agent with a single command',
    code: 'npx skills add qbt-labs/openmm',
    note: 'This installs all OpenMM skills: market-data, trading, and cardano',
  },
  {
    step: 2,
    title: 'Configure Your Agent',
    description: 'Add the MCP server to your agent configuration',
    code: `{
  "mcpServers": {
    "openmm": {
      "command": "npx",
      "args": ["-y", "@qbt-labs/openmm-mcp"]
    }
  }
}`,
    note: 'Configuration varies by client — see MCP Setup for specific instructions',
    language: 'json',
  },
  {
    step: 3,
    title: 'Add Your API Keys',
    description: 'Set exchange credentials as environment variables',
    code: `export MEXC_API_KEY="your-api-key"
export MEXC_SECRET="your-secret"`,
    note: 'Only needed for trading operations. Market data works without keys.',
  },
  {
    step: 4,
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
              <span>Exchange API keys (optional, only for trading)</span>
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
            href="/#skills"
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
