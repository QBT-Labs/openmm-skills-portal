'use client'

import { Copy, Check, Zap, Server, Terminal, Globe, ArrowRight } from 'lucide-react'
import { useState } from 'react'

const INSTALL_COMMAND = 'npx skills add qbt-labs/openmm'

const stats = [
  { label: 'Exchanges', value: '4+' },
  { label: 'MCP Tools', value: '30+' },
  { label: 'Response Time', value: '<100ms' },
  { label: 'Uptime', value: '99.9%' },
]

const accessMethods = [
  {
    icon: Zap,
    title: 'AI Skills',
    description: 'Natural language trading with Claude Code, Cursor, OpenClaw',
    action: 'Install Skills',
    href: '#skills',
  },
  {
    icon: Server,
    title: 'MCP Server',
    description: 'Connect any MCP-compatible agent directly',
    action: 'MCP Setup',
    href: '#docs',
  },
  {
    icon: Terminal,
    title: 'CLI',
    description: 'Direct command-line access to all tools',
    action: 'CLI Docs',
    href: '#docs',
  },
  {
    icon: Globe,
    title: 'REST API',
    description: 'Full programmatic control via HTTP',
    action: 'API Reference',
    href: '#docs',
  },
]

const skills = [
  {
    name: 'openmm-market-data',
    description: 'Get prices, orderbooks, and trades across exchanges',
    tools: ['openmm_ticker', 'openmm_orderbook', 'openmm_trades'],
    install: 'npx skills add qbt-labs/openmm-market-data',
  },
  {
    name: 'openmm-trading',
    description: 'Place orders, manage grids, check balances',
    tools: ['openmm_balance', 'openmm_list_orders', 'openmm_grid_status'],
    install: 'npx skills add qbt-labs/openmm-trading',
  },
  {
    name: 'openmm-cardano',
    description: 'Cardano DEX pools and native token prices',
    tools: ['openmm_cardano_price', 'openmm_discover_pools'],
    install: 'npx skills add qbt-labs/openmm-cardano',
  },
]

const pricingTiers = [
  {
    tier: 'Basic',
    price: '$0.01',
    perCall: true,
    endpoints: ['ticker', 'orderbook', 'trades', 'balances'],
  },
  {
    tier: 'Trading',
    price: '$0.05',
    perCall: true,
    endpoints: ['place_order', 'cancel_order', 'grid_setup'],
  },
  {
    tier: 'Premium',
    price: '$0.10-0.25',
    perCall: true,
    endpoints: ['AI analysis', 'strategy generation', 'risk assessment'],
  },
]

const exchanges = [
  { name: 'MEXC', status: 'live' },
  { name: 'Gate.io', status: 'live' },
  { name: 'Bitget', status: 'live' },
  { name: 'Kraken', status: 'live' },
  { name: 'Hyperliquid', status: 'soon' },
  { name: 'Binance', status: 'soon' },
]

const useCases = [
  {
    title: 'Grid Trading Bot',
    description: 'Run market making strategies with dynamic spread adjustment',
    tools: ['openmm_grid_status', 'openmm_ticker'],
    cost: '$0.05/hour',
  },
  {
    title: 'Portfolio Tracker',
    description: 'Monitor balances across all connected exchanges',
    tools: ['openmm_balance'],
    cost: '$0.04/check',
  },
  {
    title: 'Arbitrage Scanner',
    description: 'Find price discrepancies across venues',
    tools: ['openmm_ticker', 'openmm_orderbook'],
    cost: '$0.10/scan',
  },
]

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

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Hero */}
      <section className="text-center mb-24">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          OpenMM
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          AI-Native Trading Infrastructure
        </p>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Skills, MCP integration, and documentation for open-source market making tools.
          Connect your AI agent to 4+ exchanges with 30+ trading tools.
        </p>

        {/* Install command */}
        <div className="install-box inline-flex items-center gap-4 mb-12">
          <code className="text-purple-400">{INSTALL_COMMAND}</code>
          <CopyButton text={INSTALL_COMMAND} />
        </div>

        {/* Stats bar */}
        <div className="flex justify-center gap-12 flex-wrap">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Access Methods */}
      <section className="mb-24" id="access">
        <h2 className="text-2xl font-bold mb-8 text-center">4 Ways to Connect</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {accessMethods.map((method) => (
            <div
              key={method.title}
              className="bg-card border border-border rounded-lg p-6 hover:border-purple-500/50 transition-colors"
            >
              <method.icon className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{method.description}</p>
              <a
                href={method.href}
                className="inline-flex items-center text-purple-400 text-sm hover:text-purple-300"
              >
                {method.action} <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Directory */}
      <section className="mb-24" id="skills">
        <h2 className="text-2xl font-bold mb-8 text-center">Skills Directory</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-2 text-purple-400">{skill.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{skill.description}</p>
              <div className="mb-4">
                <div className="text-xs text-gray-500 mb-2">Tools included:</div>
                <div className="flex flex-wrap gap-2">
                  {skill.tools.map((tool) => (
                    <code key={tool} className="text-xs bg-secondary px-2 py-1 rounded">
                      {tool}
                    </code>
                  ))}
                </div>
              </div>
              <div className="install-box text-sm flex items-center justify-between">
                <code className="text-purple-400 text-xs">{skill.install}</code>
                <CopyButton text={skill.install} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* x402 Pricing */}
      <section className="mb-24" id="pricing">
        <h2 className="text-2xl font-bold mb-2 text-center">x402 Pricing</h2>
        <p className="text-gray-400 text-center mb-8">Pay per call with USDC on Base or Solana</p>
        <div className="grid md:grid-cols-3 gap-6">
          {pricingTiers.map((tier) => (
            <div
              key={tier.tier}
              className="bg-card border border-border rounded-lg p-6 text-center"
            >
              <h3 className="text-lg font-semibold mb-2">{tier.tier}</h3>
              <div className="text-3xl font-bold text-purple-400 mb-1">{tier.price}</div>
              <div className="text-sm text-gray-500 mb-4">per call</div>
              <ul className="text-sm text-gray-400 space-y-1">
                {tier.endpoints.map((endpoint) => (
                  <li key={endpoint}>{endpoint}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Exchanges */}
      <section className="mb-24" id="exchanges">
        <h2 className="text-2xl font-bold mb-8 text-center">Supported Exchanges</h2>
        <div className="flex justify-center gap-8 flex-wrap">
          {exchanges.map((exchange) => (
            <div
              key={exchange.name}
              className="text-center"
            >
              <div className="w-16 h-16 bg-card border border-border rounded-lg flex items-center justify-center mb-2">
                <span className="text-xl font-bold text-gray-400">
                  {exchange.name.charAt(0)}
                </span>
              </div>
              <div className="text-sm">{exchange.name}</div>
              <div className={`text-xs ${exchange.status === 'live' ? 'text-green-400' : 'text-yellow-400'}`}>
                {exchange.status === 'live' ? '● Live' : '○ Soon'}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="mb-24" id="use-cases">
        <h2 className="text-2xl font-bold mb-8 text-center">What Agents Build</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{useCase.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {useCase.tools.map((tool) => (
                  <code key={tool} className="text-xs bg-secondary px-2 py-1 rounded text-purple-400">
                    {tool}
                  </code>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                Est. cost: <span className="text-purple-400">{useCase.cost}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Ready to Build?</h2>
        <p className="text-gray-400 mb-8">Get your agent trading in minutes</p>
        <div className="install-box inline-flex items-center gap-4">
          <code className="text-purple-400">{INSTALL_COMMAND}</code>
          <CopyButton text={INSTALL_COMMAND} />
        </div>
      </section>
    </div>
  )
}
