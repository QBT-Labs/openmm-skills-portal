'use client'

import { ExternalLink } from 'lucide-react'
import { useFadeInOnScroll, useStaggerIn } from '@/hooks/use-scroll-animation'

const exchanges = [
  {
    name: 'MEXC',
    url: 'https://mexc.com',
    description: 'Global exchange with extensive altcoin listings and competitive fees.',
    features: ['Spot', 'Futures'],
    status: 'live' as const,
    floatDelay: '0s',
  },
  {
    name: 'Gate.io',
    url: 'https://gate.io',
    description: 'One of the oldest exchanges with 1,400+ cryptocurrencies supported.',
    features: ['Spot', 'Futures'],
    status: 'live' as const,
    floatDelay: '0.75s',
  },
  {
    name: 'Bitget',
    url: 'https://bitget.com',
    description: 'Leading crypto derivatives exchange with copy trading features.',
    features: ['Spot', 'Futures'],
    status: 'live' as const,
    floatDelay: '1.5s',
  },
  {
    name: 'Kraken',
    url: 'https://kraken.com',
    description: 'US-based exchange known for security and regulatory compliance.',
    features: ['Spot'],
    status: 'live' as const,
    floatDelay: '2.25s',
  },
]

function StatusBadge({ status }: { status: 'live' | 'coming-soon' }) {
  if (status === 'live') {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
        </span>
        Live
      </span>
    )
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
      Coming Soon
    </span>
  )
}

function ExchangeLogo({ name, floatDelay }: { name: string; floatDelay: string }) {
  const colors: Record<string, string> = {
    'MEXC': 'from-blue-400 to-cyan-400',
    'Gate.io': 'from-orange-400 to-yellow-400',
    'Bitget': 'from-cyan-400 to-blue-400',
    'Kraken': 'from-purple-400 to-indigo-400',
  }

  return (
    <div
      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[name] || 'from-purple-400 to-pink-400'} flex items-center justify-center font-bold text-white text-lg shadow-lg exchange-float will-change-transform`}
      style={{ animationDelay: floatDelay }}
    >
      {name.charAt(0)}
    </div>
  )
}

export function SupportedExchanges() {
  const headerRef = useFadeInOnScroll<HTMLDivElement>()
  const gridRef = useStaggerIn<HTMLDivElement>('.exchange-card', { stagger: 0.15, fromY: 50 })

  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
            Supported Exchanges
          </span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Connect to major cryptocurrency exchanges. More integrations coming soon.
        </p>
      </div>

      {/* Exchange Cards Grid */}
      <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {exchanges.map((exchange) => (
          <a
            key={exchange.name}
            href={exchange.url}
            target="_blank"
            rel="noopener noreferrer"
            className="exchange-card group relative p-6 rounded-xl border border-border bg-card/80 hover:border-purple-500/50 hover:bg-card transition-all duration-300 flex flex-col card-hover-glow"
          >
            {/* Status Badge - Top Right */}
            <div className="absolute top-4 right-4">
              <StatusBadge status={exchange.status} />
            </div>

            {/* Logo with float */}
            <div className="mb-4">
              <ExchangeLogo name={exchange.name} floatDelay={exchange.floatDelay} />
            </div>

            {/* Name with external link icon */}
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2 group-hover:text-purple-400 transition-colors">
              {exchange.name}
              <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors" />
            </h3>

            {/* Description */}
            <p className="text-gray-500 text-sm leading-relaxed flex-grow mb-4">
              {exchange.description}
            </p>

            {/* Feature Tags */}
            <div className="flex flex-wrap gap-2">
              {exchange.features.map((feature) => (
                <span
                  key={feature}
                  className="px-2 py-0.5 rounded-md text-xs font-medium bg-purple-500/10 text-purple-400 border border-purple-500/20"
                >
                  {feature}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
