'use client'

import { Code, Database, TrendingUp, Wallet, ShoppingCart, Grid3X3, Coins, ArrowLeftRight, ExternalLink, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

interface Endpoint {
  method: 'GET' | 'POST' | 'DELETE'
  path: string
  description: string
  params?: string[]
}

interface EndpointGroup {
  icon: React.ElementType
  title: string
  description: string
  endpoints: Endpoint[]
}

const endpointGroups: EndpointGroup[] = [
  {
    icon: TrendingUp,
    title: 'Market Data',
    description: 'Real-time market data from supported exchanges',
    endpoints: [
      { method: 'GET', path: '/api/v1/ticker', description: 'Get ticker data (price, bid/ask, spread, volume)', params: ['exchange', 'symbol'] },
      { method: 'GET', path: '/api/v1/orderbook', description: 'Get order book with bids and asks', params: ['exchange', 'symbol', 'limit?'] },
      { method: 'GET', path: '/api/v1/trades', description: 'Get recent trades with summary stats', params: ['exchange', 'symbol', 'limit?'] },
    ],
  },
  {
    icon: Wallet,
    title: 'Account',
    description: 'Account balances and portfolio data',
    endpoints: [
      { method: 'GET', path: '/api/v1/balance', description: 'Get account balances', params: ['exchange', 'asset?'] },
    ],
  },
  {
    icon: ShoppingCart,
    title: 'Orders',
    description: 'Order management (list, create, cancel)',
    endpoints: [
      { method: 'GET', path: '/api/v1/orders', description: 'List open orders', params: ['exchange', 'symbol?'] },
      { method: 'GET', path: '/api/v1/orders/:id', description: 'Get order by ID', params: ['exchange', 'symbol'] },
      { method: 'POST', path: '/api/v1/orders', description: 'Create new order', params: ['exchange', 'symbol', 'side', 'type', 'amount', 'price?'] },
      { method: 'DELETE', path: '/api/v1/orders/:id', description: 'Cancel order', params: ['exchange', 'symbol'] },
      { method: 'DELETE', path: '/api/v1/orders', description: 'Cancel all orders', params: ['exchange', 'symbol?'] },
    ],
  },
  {
    icon: Grid3X3,
    title: 'Grid Strategy',
    description: 'Automated grid trading strategy',
    endpoints: [
      { method: 'POST', path: '/api/v1/strategy/grid', description: 'Start grid strategy', params: ['exchange', 'symbol', 'lowerPrice', 'upperPrice', 'gridLevels', 'orderSize'] },
      { method: 'DELETE', path: '/api/v1/strategy/grid', description: 'Stop grid strategy', params: ['id', 'cancelOrders?'] },
      { method: 'GET', path: '/api/v1/strategy/grid/status', description: 'Get strategy status', params: ['id?'] },
      { method: 'GET', path: '/api/v1/strategy/grid/list', description: 'List active strategies', params: [] },
    ],
  },
  {
    icon: Coins,
    title: 'Cardano DEX',
    description: 'Cardano token prices and pool discovery via Iris Protocol',
    endpoints: [
      { method: 'GET', path: '/api/v1/cardano/price/:symbol', description: 'Get Cardano token price in USDT', params: ['symbol'] },
      { method: 'GET', path: '/api/v1/cardano/pools/:symbol', description: 'Discover liquidity pools', params: ['symbol', 'minLiquidity?', 'limit?'] },
    ],
  },
  {
    icon: ArrowLeftRight,
    title: 'Price Comparison',
    description: 'Cross-exchange price comparison for arbitrage',
    endpoints: [
      { method: 'GET', path: '/api/v1/price/compare', description: 'Compare prices across exchanges', params: ['symbol', 'exchanges?'] },
    ],
  },
]

const methodColors = {
  GET: 'bg-green-500/20 text-green-400 border-green-500/30',
  POST: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  DELETE: 'bg-red-500/20 text-red-400 border-red-500/30',
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button onClick={copy} className="p-1 hover:bg-gray-700 rounded transition-colors">
      {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-gray-400" />}
    </button>
  )
}

export default function ApiReferencePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link href="/docs" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
          ← Back to Docs
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Code className="w-10 h-10 text-purple-400" />
          API Reference
        </h1>
        <p className="text-xl text-gray-400">
          REST API for trading, market data, and strategy management.
        </p>
      </div>

      {/* Quick Start */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-12">
        <h2 className="text-xl font-semibold mb-4">Quick Start</h2>
        <div className="space-y-4">
          <div>
            <p className="text-gray-400 mb-2">Start the API server:</p>
            <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm flex justify-between items-center">
              <code className="text-green-400">openmm serve --port 3000</code>
              <CopyButton text="openmm serve --port 3000" />
            </div>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="text-gray-400">Base URL:</span>
            <code className="text-purple-400">http://localhost:3000/api/v1</code>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="text-gray-400">Swagger UI:</span>
            <a href="http://localhost:3000/docs" className="text-purple-400 hover:underline flex items-center gap-1">
              http://localhost:3000/docs <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="text-gray-400">Full Docs:</span>
            <a href="https://docs.openmm.io" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline flex items-center gap-1">
              docs.openmm.io <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Supported Exchanges */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Supported Exchanges</h2>
        <div className="flex flex-wrap gap-3">
          {['mexc', 'gateio', 'bitget', 'kraken'].map((exchange) => (
            <span key={exchange} className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg font-mono text-sm">
              {exchange}
            </span>
          ))}
        </div>
      </div>

      {/* Endpoint Groups */}
      <div className="space-y-12">
        {endpointGroups.map((group) => (
          <div key={group.title}>
            <div className="flex items-center gap-3 mb-4">
              <group.icon className="w-6 h-6 text-purple-400" />
              <h2 className="text-2xl font-semibold">{group.title}</h2>
            </div>
            <p className="text-gray-400 mb-6">{group.description}</p>

            <div className="space-y-3">
              {group.endpoints.map((endpoint, idx) => (
                <div
                  key={idx}
                  className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className={`px-2 py-1 rounded text-xs font-bold border ${methodColors[endpoint.method]}`}>
                        {endpoint.method}
                      </span>
                      <code className="text-white font-mono">{endpoint.path}</code>
                    </div>
                    <CopyButton text={`curl "http://localhost:3000${endpoint.path}"`} />
                  </div>
                  <p className="text-gray-400 mt-2 text-sm">{endpoint.description}</p>
                  {endpoint.params && endpoint.params.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {endpoint.params.map((param) => (
                        <span
                          key={param}
                          className={`px-2 py-1 rounded text-xs font-mono ${
                            param.endsWith('?')
                              ? 'bg-gray-700 text-gray-300'
                              : 'bg-purple-500/20 text-purple-300'
                          }`}
                        >
                          {param}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Example Request */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Example Request</h2>
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 text-sm">Get BTC/USDT ticker from MEXC</span>
            <CopyButton text='curl "http://localhost:3000/api/v1/ticker?exchange=mexc&symbol=BTC/USDT"' />
          </div>
          <pre className="text-sm overflow-x-auto">
            <code className="text-green-400">curl</code>
            <code className="text-white">{` "http://localhost:3000/api/v1/ticker?exchange=mexc&symbol=BTC/USDT"`}</code>
          </pre>
          <div className="mt-6 pt-6 border-t border-gray-700">
            <span className="text-gray-400 text-sm">Response</span>
            <pre className="mt-2 text-sm text-gray-300 overflow-x-auto">
{`{
  "exchange": "mexc",
  "symbol": "BTC/USDT",
  "last": 42150.50,
  "bid": 42148.00,
  "ask": 42152.00,
  "spread": 4.00,
  "spreadPercent": 0.0095,
  "baseVolume": 1234.56,
  "timestamp": 1710000000000
}`}
            </pre>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="mt-16 pt-8 border-t border-gray-700">
        <div className="flex flex-wrap gap-6 text-sm">
          <a
            href="https://docs.openmm.io/api/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline flex items-center gap-1"
          >
            Full API Documentation <ExternalLink className="w-3 h-3" />
          </a>
          <a
            href="https://github.com/3rd-Eye-Labs/OpenMM"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:underline flex items-center gap-1"
          >
            GitHub Repository <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  )
}
