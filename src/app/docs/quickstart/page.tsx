'use client'

import { Copy, Check, Clock, CheckCircle2, ArrowRight, Zap } from 'lucide-react'
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

function CodeBlock({ code, label }: { code: string; label?: string }) {
  return (
    <div className="bg-gray-900 rounded-lg border border-gray-700">
      {label && (
        <div className="px-4 py-2 border-b border-gray-700 text-xs text-gray-400">{label}</div>
      )}
      <div className="flex items-center justify-between p-4">
        <pre className="text-sm overflow-x-auto">
          <code className="text-green-400">{code}</code>
        </pre>
        <CopyButton text={code} />
      </div>
    </div>
  )
}

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
          <span className="text-sm text-purple-400 bg-purple-500/20 px-2 py-1 rounded">2 minute setup</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Quick Start Guide</h1>
        <p className="text-xl text-gray-400">
          Get your AI agent trading in 2 minutes with the setup wizard
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
              <span>Exchange API keys (MEXC, Gate.io, Bitget, or Kraken)</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Quick Start - 2 Steps */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-yellow-400" />
          <h2 className="text-xl font-semibold">Quick Start (2 Steps)</h2>
        </div>
        
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="relative pl-8 border-l-2 border-purple-500">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
              1
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Install & Setup</h3>
              <p className="text-gray-400 text-sm mb-4">
                Install OpenMM globally and run the interactive setup wizard
              </p>
              <div className="space-y-3">
                <CodeBlock code="npm install -g @3rd-eye-labs/openmm" label="Install" />
                <CodeBlock code="npx @3rd-eye-labs/openmm setup" label="Setup Wizard" />
              </div>
              <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <p className="text-sm text-purple-300">
                  <strong>The setup wizard will:</strong>
                </p>
                <ul className="text-sm text-purple-300/80 mt-2 space-y-1 list-disc list-inside">
                  <li>Let you select exchanges (MEXC, Gate.io, Kraken, Bitget)</li>
                  <li>Prompt for your API credentials</li>
                  <li>Create a <code className="bg-purple-500/20 px-1 rounded">.env</code> file automatically</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative pl-8 border-l-2 border-purple-500">
            <div className="absolute -left-3 top-0 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-sm font-bold">
              2
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Verify Installation</h3>
              <p className="text-gray-400 text-sm mb-4">
                Check that everything works by fetching your balance
              </p>
              <CodeBlock code="openmm balance --exchange mexc" />
              <p className="text-sm text-gray-500 mt-3">
                ✅ If you see your balances, you're ready to go!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MCP Setup */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">For AI Agents (MCP)</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-gray-400 mb-4">
            To use OpenMM with Claude Desktop, Cursor, or other MCP clients:
          </p>
          <div className="space-y-3">
            <CodeBlock code="npm install -g @qbtlabs/openmm-mcp" label="Install MCP Server" />
            <CodeBlock code="npx @qbtlabs/openmm-mcp setup" label="Configure MCP Client" />
          </div>
          <p className="text-sm text-gray-500 mt-4">
            The setup will configure your MCP client automatically. See{' '}
            <Link href="/docs/mcp-setup" className="text-purple-400 hover:underline">MCP Setup Guide</Link>{' '}
            for client-specific instructions.
          </p>
        </div>
      </section>

      {/* API Server */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">REST API Server</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-gray-400 mb-4">
            Start the HTTP API server for web integrations:
          </p>
          <CodeBlock code="openmm serve --port 3000" />
          <div className="mt-4 flex gap-4 text-sm">
            <span className="text-gray-400">Swagger UI:</span>
            <code className="text-purple-400">http://localhost:3000/docs</code>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            See <Link href="/docs/api-reference" className="text-purple-400 hover:underline">API Reference</Link>{' '}
            for all 18 endpoints.
          </p>
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
        <div className="grid md:grid-cols-3 gap-4">
          <Link
            href="/docs/mcp-setup"
            className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
          >
            <div>
              <div className="font-medium">MCP Setup</div>
              <div className="text-sm text-gray-400">Configure AI clients</div>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400" />
          </Link>
          <Link
            href="/docs/api-reference"
            className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
          >
            <div>
              <div className="font-medium">API Reference</div>
              <div className="text-sm text-gray-400">18 REST endpoints</div>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400" />
          </Link>
          <Link
            href="/skills"
            className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
          >
            <div>
              <div className="font-medium">Browse Skills</div>
              <div className="text-sm text-gray-400">Skill packages</div>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400" />
          </Link>
        </div>
      </section>
    </div>
  )
}
