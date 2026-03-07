'use client'

import { Copy, Check, Code2, ArrowRight } from 'lucide-react'
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
    <div className="relative bg-secondary/50 rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border">
        <span className="text-xs text-gray-500">{language}</span>
        <CopyButton text={code} />
      </div>
      <pre className="p-4 text-sm overflow-x-auto">
        <code className="text-gray-300">{code}</code>
      </pre>
    </div>
  )
}

const endpoints = [
  {
    method: 'GET',
    path: '/api/ticker',
    description: 'Get current price, bid/ask, spread, and 24h volume for a trading pair',
    params: [
      { name: 'exchange', type: 'string', required: true, description: 'Exchange id (mexc, gateio, kraken, bitget)' },
      { name: 'symbol', type: 'string', required: true, description: 'Trading pair (e.g., BTC/USDT)' },
    ],
    example: `curl "http://localhost:3000/api/ticker?exchange=mexc&symbol=BTC/USDT"`,
    response: `{
  "symbol": "BTC/USDT",
  "price": 97234.50,
  "bid": 97230.00,
  "ask": 97235.00,
  "spread": 0.005,
  "volume24h": 1234567.89
}`,
  },
  {
    method: 'GET',
    path: '/api/orderbook',
    description: 'Get the order book (bids and asks) for a trading pair',
    params: [
      { name: 'exchange', type: 'string', required: true, description: 'Exchange id' },
      { name: 'symbol', type: 'string', required: true, description: 'Trading pair' },
      { name: 'limit', type: 'number', required: false, description: 'Number of levels (default: 10)' },
    ],
    example: `curl "http://localhost:3000/api/orderbook?exchange=mexc&symbol=BTC/USDT&limit=5"`,
    response: `{
  "bids": [
    { "price": 97230.00, "amount": 1.5 },
    { "price": 97225.00, "amount": 2.3 }
  ],
  "asks": [
    { "price": 97235.00, "amount": 0.8 },
    { "price": 97240.00, "amount": 1.2 }
  ]
}`,
  },
  {
    method: 'GET',
    path: '/api/balance',
    description: 'Get account balances for a supported exchange',
    params: [
      { name: 'exchange', type: 'string', required: true, description: 'Exchange id' },
      { name: 'asset', type: 'string', required: false, description: 'Filter by specific asset' },
    ],
    example: `curl -H "Authorization: Bearer $API_KEY" "http://localhost:3000/api/balance?exchange=mexc"`,
    response: `{
  "balances": [
    { "asset": "BTC", "free": 1.5, "locked": 0.1 },
    { "asset": "USDT", "free": 10000.00, "locked": 500.00 }
  ]
}`,
  },
  {
    method: 'GET',
    path: '/api/trades',
    description: 'Get recent trades for a trading pair with buy/sell breakdown',
    params: [
      { name: 'exchange', type: 'string', required: true, description: 'Exchange id' },
      { name: 'symbol', type: 'string', required: true, description: 'Trading pair' },
      { name: 'limit', type: 'number', required: false, description: 'Number of trades (default: 50)' },
    ],
    example: `curl "http://localhost:3000/api/trades?exchange=mexc&symbol=BTC/USDT&limit=10"`,
    response: `{
  "trades": [
    { "id": "123", "price": 97234.50, "amount": 0.5, "side": "buy", "timestamp": 1709856000000 },
    { "id": "124", "price": 97230.00, "amount": 1.2, "side": "sell", "timestamp": 1709855990000 }
  ]
}`,
  },
  {
    method: 'GET',
    path: '/api/cardano/price',
    description: 'Get Cardano token price from DEX aggregation (TOKEN/USDT via TOKEN/ADA × ADA/USDT)',
    params: [
      { name: 'symbol', type: 'string', required: true, description: 'Cardano token symbol (e.g., SNEK, INDY)' },
    ],
    example: `curl "http://localhost:3000/api/cardano/price?symbol=SNEK"`,
    response: `{
  "symbol": "SNEK",
  "priceAda": 0.00045,
  "priceUsdt": 0.00032,
  "adaUsdtRate": 0.71
}`,
  },
]

export default function APIPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link href="/docs" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
          ← Back to Docs
        </Link>
        <div className="flex items-center gap-3 mb-4">
          <Code2 className="w-6 h-6 text-purple-400" />
          <span className="text-sm text-purple-400 bg-purple-500/20 px-2 py-1 rounded">REST API</span>
        </div>
        <h1 className="text-4xl font-bold mb-4">REST API Reference</h1>
        <p className="text-xl text-gray-400">
          Build custom integrations with the OpenMM REST API.
        </p>
        <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-yellow-400 font-medium">🚧 Coming Soon</p>
          <p className="text-yellow-400/80 text-sm mt-1">
            REST API is planned for a future release. Currently OpenMM works via CLI and MCP tools.
          </p>
        </div>
      </div>

      {/* Base URL */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Base URL</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-gray-400 mb-4">When running locally:</p>
          <code className="text-purple-400 bg-secondary px-3 py-2 rounded">http://localhost:3000</code>
          <p className="text-sm text-gray-500 mt-4">
            Start the server with <code className="text-purple-400">openmm init</code> or <code className="text-purple-400">npx @qbt-labs/openmm init</code>
          </p>
        </div>
      </section>

      {/* Authentication */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Authentication</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <p className="text-gray-400 mb-4">
            Market data endpoints (ticker, orderbook, trades) are public and don&apos;t require authentication.
          </p>
          <p className="text-gray-400 mb-4">
            For authenticated endpoints (balance, orders), pass your exchange credentials via headers:
          </p>
          <CodeBlock 
            code={`curl -H "X-Exchange-Key: $MEXC_API_KEY" \\
     -H "X-Exchange-Secret: $MEXC_SECRET" \\
     "http://localhost:3000/api/balance?exchange=mexc"`}
            language="bash"
          />
        </div>
      </section>

      {/* Endpoints */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-6">Endpoints</h2>
        <div className="space-y-8">
          {endpoints.map((endpoint) => (
            <div key={endpoint.path} className="bg-card border border-border rounded-lg overflow-hidden">
              {/* Endpoint Header */}
              <div className="flex items-center gap-3 px-6 py-4 border-b border-border">
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' : 
                  endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' : 
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {endpoint.method}
                </span>
                <code className="text-purple-400 font-mono">{endpoint.path}</code>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-gray-400">{endpoint.description}</p>

                {/* Parameters */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Parameters</h4>
                  <div className="bg-secondary/50 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left p-3 text-gray-400 font-medium">Name</th>
                          <th className="text-left p-3 text-gray-400 font-medium">Type</th>
                          <th className="text-left p-3 text-gray-400 font-medium">Required</th>
                          <th className="text-left p-3 text-gray-400 font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {endpoint.params.map((param) => (
                          <tr key={param.name} className="border-b border-border last:border-0">
                            <td className="p-3 font-mono text-purple-400">{param.name}</td>
                            <td className="p-3 text-gray-500">{param.type}</td>
                            <td className="p-3">
                              {param.required ? (
                                <span className="text-green-400">Yes</span>
                              ) : (
                                <span className="text-gray-500">No</span>
                              )}
                            </td>
                            <td className="p-3 text-gray-400">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Example */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Example Request</h4>
                  <CodeBlock code={endpoint.example} language="bash" />
                </div>

                {/* Response */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-3">Example Response</h4>
                  <CodeBlock code={endpoint.response} language="json" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Next Steps */}
      <section className="bg-card border border-border rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-4">Next Steps</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            href="/docs/cli"
            className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
          >
            <div>
              <div className="font-medium">CLI Reference</div>
              <div className="text-sm text-gray-400">Use OpenMM from the terminal</div>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400" />
          </Link>
          <Link
            href="/docs/quickstart"
            className="flex items-center justify-between p-4 bg-secondary/50 hover:bg-secondary rounded-lg transition-colors"
          >
            <div>
              <div className="font-medium">Quick Start</div>
              <div className="text-sm text-gray-400">Get up and running in 5 minutes</div>
            </div>
            <ArrowRight className="w-5 h-5 text-purple-400" />
          </Link>
        </div>
      </section>
    </div>
  )
}
