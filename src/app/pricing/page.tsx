'use client'

import { Check, Zap, Building2, CreditCard, HelpCircle, ChevronDown, Sparkles } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for exploring and testing the platform.',
    features: [
      '100 API calls per day',
      'Basic market data tools',
      'Ticker & orderbook access',
      'Community support',
      'Public documentation',
    ],
    cta: 'Get Started',
    href: '/docs/quickstart',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$39',
    period: '/month',
    description: 'For serious traders and developers building production apps.',
    features: [
      'Unlimited API calls',
      'All 30+ trading tools',
      'All exchange connections',
      'Priority email support',
      'Advanced analytics tools',
      'Webhook integrations',
    ],
    cta: 'Start Free Trial',
    href: '/docs/quickstart',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'x402 Pay-per-use',
    price: '~$0.001',
    period: 'per call',
    description: 'Native crypto payments. Pay only for what you use with USDC.',
    features: [
      'No subscription required',
      'Pay with USDC on Base',
      'Instant micropayments',
      'All tools available',
      'Per-call pricing transparency',
      'No minimum commitment',
    ],
    cta: 'Learn More',
    href: '#x402',
    highlighted: false,
    icon: Zap,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For institutions needing dedicated infrastructure and support.',
    features: [
      'Custom rate limits',
      'Dedicated infrastructure',
      'SLA guarantees (99.99%)',
      '24/7 priority support',
      'Custom integrations',
      'On-premise deployment',
    ],
    cta: 'Contact Sales',
    href: 'mailto:enterprise@qbtlabs.io',
    highlighted: false,
    icon: Building2,
  },
]

const toolPricing = [
  { category: 'Market Data', tools: [
    { name: 'ticker', description: 'Get current price, bid/ask, spread', price: '$0.001' },
    { name: 'orderbook', description: 'Full order book depth', price: '$0.002' },
    { name: 'trades', description: 'Recent trade history', price: '$0.002' },
    { name: 'candles', description: 'OHLCV candlestick data', price: '$0.003' },
  ]},
  { category: 'Account & Orders', tools: [
    { name: 'balance', description: 'Get account balances', price: '$0.002' },
    { name: 'list_orders', description: 'View open orders', price: '$0.002' },
    { name: 'place_order', description: 'Submit new order', price: '$0.01' },
    { name: 'cancel_order', description: 'Cancel existing order', price: '$0.005' },
  ]},
  { category: 'Cardano DEX', tools: [
    { name: 'cardano_price', description: 'Aggregated token price', price: '$0.002' },
    { name: 'discover_pools', description: 'Find liquidity pools', price: '$0.003' },
    { name: 'pool_stats', description: 'Pool TVL and volume', price: '$0.003' },
  ]},
  { category: 'Strategies', tools: [
    { name: 'grid_status', description: 'Grid strategy status', price: '$0.005' },
    { name: 'grid_create', description: 'Create grid strategy', price: '$0.02' },
    { name: 'rebalance', description: 'Portfolio rebalancing', price: '$0.02' },
  ]},
]

const faqs = [
  {
    question: 'What is x402 and how does it work?',
    answer: 'x402 is a protocol for HTTP-native micropayments using the 402 Payment Required status code. When you make an API call, payment happens automatically via USDC on Base L2. Your agent handles it seamlessly—no subscriptions, no API keys to manage, just instant pay-per-use.',
  },
  {
    question: 'Which wallets support x402 payments?',
    answer: 'Any wallet that supports USDC on Base network works. Most MCP clients like Claude Desktop and Cursor have built-in x402 support. You just need to configure your wallet address and approve a spending limit.',
  },
  {
    question: 'Are there any hidden fees?',
    answer: 'No hidden fees. Tool prices are exactly what you pay. Base L2 gas fees are negligible (typically <$0.001). We batch multiple calls when possible to minimize transaction costs.',
  },
  {
    question: 'Can I set spending limits?',
    answer: 'Yes! You can set daily, weekly, or per-session spending caps in your client configuration. The agent will warn you before exceeding limits and won\'t make calls that would breach your cap.',
  },
  {
    question: 'How does billing work for Pro subscriptions?',
    answer: 'Pro is billed monthly via Stripe. You get unlimited calls across all tools. Perfect if you\'re making hundreds of calls daily—predictable pricing with no usage anxiety.',
  },
  {
    question: 'Can I switch between pricing models?',
    answer: 'Absolutely. Start with Free to test, use x402 for occasional use, or upgrade to Pro when you need unlimited. Enterprise customers can mix models based on different use cases.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false)
  
  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full py-5 flex items-center justify-between text-left hover:text-purple-400 transition-colors"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium pr-4">{question}</span>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="pb-5 text-gray-400 text-sm leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  )
}

export default function PricingPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-purple-500/20 rounded-full blur-[128px] pointer-events-none" />
        
        <div className="relative max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm mb-6">
            <Zap className="w-4 h-4" />
            x402 Native Micropayments
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-white via-white to-gray-400 bg-clip-text text-transparent">
              Simple, Transparent
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Pricing
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            From free exploration to enterprise scale. Pay traditionally or embrace the future with 
            x402 crypto micropayments—your agent, your choice.
          </p>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative rounded-xl border p-6 flex flex-col ${
                tier.highlighted
                  ? 'border-purple-500 bg-purple-500/5'
                  : 'border-border bg-card/50'
              }`}
            >
              {tier.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-purple-500 text-white text-xs font-medium">
                  {tier.badge}
                </div>
              )}
              
              <div className="mb-4">
                {tier.icon && (
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-3">
                    <tier.icon className="w-5 h-5 text-purple-400" />
                  </div>
                )}
                <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{tier.price}</span>
                  <span className="text-gray-500 text-sm">{tier.period}</span>
                </div>
              </div>
              
              <p className="text-gray-400 text-sm mb-6">{tier.description}</p>
              
              <ul className="space-y-3 mb-8 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link href={tier.href}>
                <Button 
                  variant={tier.highlighted ? 'primary' : 'outline'} 
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* x402 Deep Dive */}
      <section id="x402" className="max-w-5xl mx-auto px-4 pb-20">
        <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/5 to-pink-500/5 p-8 md:p-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">x402: The Future of API Payments</h2>
              <p className="text-gray-400 text-sm">Pay-per-call with USDC on Base</p>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-purple-400 font-semibold mb-2">No Subscriptions</div>
              <p className="text-gray-400 text-sm">
                No monthly fees, no commitments. Your agent pays for exactly what it uses, when it uses it.
              </p>
            </div>
            <div>
              <div className="text-purple-400 font-semibold mb-2">Instant Settlement</div>
              <p className="text-gray-400 text-sm">
                Payments settle on Base L2 in seconds. No invoices, no billing cycles, no payment disputes.
              </p>
            </div>
            <div>
              <div className="text-purple-400 font-semibold mb-2">Agent-Native</div>
              <p className="text-gray-400 text-sm">
                Built for AI agents. MCP clients handle payments automatically—just configure once and go.
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-black/30 border border-border p-4 font-mono text-sm">
            <div className="text-gray-500 mb-2"># x402 payment flow (automatic)</div>
            <div className="text-gray-400">
              <span className="text-purple-400">Agent:</span> GET /ticker?symbol=BTC/USDT
            </div>
            <div className="text-gray-400">
              <span className="text-yellow-400">Server:</span> 402 Payment Required (0.001 USDC)
            </div>
            <div className="text-gray-400">
              <span className="text-green-400">Wallet:</span> Auto-pays via Base L2
            </div>
            <div className="text-gray-400">
              <span className="text-purple-400">Agent:</span> Receives data instantly ✓
            </div>
          </div>
        </div>
      </section>

      {/* Tool Pricing Breakdown */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Tool Pricing</h2>
          <p className="text-gray-400">
            Transparent per-call pricing for x402 payments. Pro subscribers get unlimited access.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {toolPricing.map((category) => (
            <div key={category.category} className="rounded-xl border border-border bg-card/50 overflow-hidden">
              <div className="px-5 py-4 border-b border-border bg-card">
                <h3 className="font-semibold">{category.category}</h3>
              </div>
              <div className="divide-y divide-border">
                {category.tools.map((tool) => (
                  <div key={tool.name} className="px-5 py-3 flex items-center justify-between">
                    <div>
                      <div className="font-mono text-purple-400 text-sm">{tool.name}</div>
                      <div className="text-gray-500 text-xs">{tool.description}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-sm">{tool.price}</div>
                      <div className="text-gray-500 text-xs">per call</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 pb-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-card text-gray-400 text-sm mb-4">
            <HelpCircle className="w-4 h-4" />
            FAQ
          </div>
          <h2 className="text-3xl font-bold mb-4">Common Questions</h2>
          <p className="text-gray-400">
            Everything you need to know about pricing and x402 payments.
          </p>
        </div>
        
        <div className="rounded-xl border border-border bg-card/50 px-6">
          {faqs.map((faq) => (
            <FAQItem key={faq.question} {...faq} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 pb-24 text-center">
        <div className="rounded-xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-12">
          <Sparkles className="w-10 h-10 text-purple-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Join developers and traders using OpenMM to power their AI trading agents.
            Start free, scale as you grow.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/docs/quickstart">
              <Button size="lg" className="gap-2">
                Start Building
                <Zap className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/skills">
              <Button variant="outline" size="lg">
                Explore Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
