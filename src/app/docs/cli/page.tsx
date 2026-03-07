'use client'

import { Copy, Check, Terminal, ArrowRight } from 'lucide-react'
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

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="install-box flex items-center justify-between">
      <pre className="text-sm overflow-x-auto">
        <code className="text-purple-400">{code}</code>
      </pre>
      <CopyButton text={code} />
    </div>
  )
}

const commands = [
  {
    name: 'openmm init',
    description: 'Initialize OpenMM and start the MCP server',
    usage: 'openmm init',
    flags: [
      { flag: '--port', description: 'Port to run the server on (default: 3000)' },
      { flag: '--config', description: 'Path to config file' },
    ],
  },
  {
    name: 'openmm ticker',
    description: 'Get the current price for a trading pair',
    usage: 'openmm ticker --exchange mexc --symbol BTC/USDT',
    flags: [
      { flag: '--exchange', description: 'Exchange id (mexc, gateio, kraken, bitget)' },
      { flag: '--symbol', description: 'Trading pair (e.g., BTC/USDT)' },
    ],
  },
  {
    name: 'openmm orderbook',
    description: 'Get the order book for a trading pair',
    usage: 'openmm orderbook --exchange mexc --symbol BTC/USDT --limit 10',
    flags: [
      { flag: '--exchange', description: 'Exchange id' },
      { flag: '--symbol', description: 'Trading pair' },
      { flag: '--limit', description: 'Number of levels (default: 10)' },
    ],
  },
  {
    name: 'openmm balance',
    description: 'Get account balances',
    usage: 'openmm balance --exchange mexc',
    flags: [
      { flag: '--exchange', description: 'Exchange id' },
      { flag: '--asset', description: 'Filter by specific asset (optional)' },
    ],
  },
  {
    name: 'openmm trades',
    description: 'Get recent trades for a trading pair',
    usage: 'openmm trades --exchange mexc --symbol BTC/USDT --limit 50',
    flags: [
      { flag: '--exchange', description: 'Exchange id' },
      { flag: '--symbol', description: 'Trading pair' },
      { flag: '--limit', description: 'Number of trades (default: 50)' },
    ],
  },
  {
    name: 'openmm cardano-price',
    description: 'Get Cardano token price from DEX aggregation',
    usage: 'openmm cardano-price --symbol SNEK',
    flags: [
      { flag: '--symbol', description: 'Cardano token symbol (e.g., SNEK, INDY)' },
    ],
  },
]

export default function CLIPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link href="/docs" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
          ← Back to Docs
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <Terminal className="w-6 h-6 text-purple-400" />
          <span className="text-sm text-purple-400 bg-purple-500/20 px-2 py-1 rounded">CLI Reference</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">Command Line Interface</h1>
        <p className="text-xl text-gray-400">
          Use OpenMM directly from your terminal for scripts and automation.
        </p>
      </div>

      {/* Installation */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Installation</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-gray-400 mb-4">Install OpenMM globally:</p>
          <CodeBlock code="npm install -g @qbt-labs/openmm" />
          <p className="text-sm text-gray-500 mt-4">
            Or use npx to run without installing: <code className="text-purple-400">npx @qbt-labs/openmm &lt;command&gt;</code>
          </p>
        </div>
      </section>

      {/* Commands */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Commands</h2>
        <div className="space-y-6">
          {commands.map((cmd) => (
            <div key={cmd.name} className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2 font-mono text-purple-400">{cmd.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{cmd.description}</p>
              
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Usage:</p>
                <CodeBlock code={cmd.usage} />
              </div>

              {cmd.flags.length > 0 && (
                <div>
                  <p className="text-sm text-gray-500 mb-2">Options:</p>
                  <div className="bg-secondary/50 rounded-lg p-4">
                    <table className="w-full text-sm">
                      <tbody>
                        {cmd.flags.map((f) => (
                          <tr key={f.flag}>
                            <td className="py-1 pr-4 font-mono text-purple-400">{f.flag}</td>
                            <td className="py-1 text-gray-400">{f.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Environment Variables */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-gray-400 mb-4">Set exchange credentials as environment variables:</p>
          <CodeBlock code={`export MEXC_API_KEY="your-api-key"
export MEXC_SECRET="your-secret"
export GATEIO_API_KEY="your-api-key"
export GATEIO_SECRET="your-secret"
export KRAKEN_API_KEY="your-api-key"
export KRAKEN_SECRET="your-secret"
export BITGET_API_KEY="your-api-key"
export BITGET_SECRET="your-secret"`} />
          <p className="text-sm text-gray-500 mt-4">
            💡 API keys are only required for trading operations. Market data commands work without authentication.
          </p>
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/docs/api"
            className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
          >
            <div>
              <div className="font-medium">REST API</div>
              <div className="text-sm text-gray-400">Build custom integrations</div>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400" />
          </Link>
          <Link
            href="/docs/mcp-setup"
            className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
          >
            <div>
              <div className="font-medium">MCP Setup</div>
              <div className="text-sm text-gray-400">Connect to AI agents</div>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400" />
          </Link>
        </div>
      </section>
    </div>
  )
}
