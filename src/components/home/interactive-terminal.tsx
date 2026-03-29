'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { Copy, Check, RotateCcw } from 'lucide-react'

type TabKey = 'setup' | 'trade' | 'connect'

interface Segment {
  typed: string
  output: string[]
  nextDelay?: number
}

function getLineColor(line: string): string {
  if (line.startsWith('✅')) return 'text-green-400'
  if (line.startsWith('💡') || line.startsWith('●')) return 'text-yellow-400'
  if (line.startsWith('🔑') || line.startsWith('📁')) return 'text-cyan-400'
  if (line.startsWith('🔄')) return 'text-blue-400'
  if (line.startsWith('→')) return 'text-purple-400'
  if (line.startsWith('$')) return 'text-purple-400'
  if (line.includes('┌') || line.includes('│') || line.includes('└') || line.includes('├') || line.includes('█')) return 'text-green-500'
  if (line.startsWith('Agent:')) return 'text-green-400'
  if (line.startsWith('  Price') || line.startsWith('  Bid') || line.startsWith('  Ask') || line.startsWith('  24h') || line.startsWith('  Change') || line.startsWith('  Side') || line.startsWith('  Amount') || line.startsWith('  Range') || line.startsWith('  Grids') || line.startsWith('  Investment')) return 'text-white'
  if (line.startsWith('Caller') || line.startsWith('Vault') || line.startsWith('Wallet') || line.startsWith('Exchanges') || line.startsWith('Socket')) return 'text-white'
  if (line.startsWith('Which') || line.startsWith('Enter') || line.startsWith('Create') || line.startsWith('Confirm') || line.startsWith('Your selection') || line.startsWith('Ready')) return 'text-green-400'
  if (line.startsWith('All flows')) return 'text-gray-500'
  if (line.startsWith('changed')) return 'text-green-400'
  if (line.startsWith('───')) return 'text-gray-600'
  return 'text-gray-400'
}

const tabSegments: Record<TabKey, Segment[]> = {
  setup: [
    {
      typed: '$ npm install -g @qbtlabs/openmm-mcp',
      output: ['changed 129 packages in 3s', ''],
      nextDelay: 600,
    },
    {
      typed: '$ openmm-init',
      output: [
        'Create a vault password: ••••••••',
        'Confirm password: ••••••••',
        '',
        '✅ Vault created at ~/.openmm/vault.enc',
        '✅ Wallet generated  0x1a2B...9fE4',
        '✅ Exchanges         2 configured (mexc, gateio)',
        '✅ Credentials encrypted in vault',
      ],
      nextDelay: 1200,
    },
    {
      typed: '$ openmm serve',
      output: [
        'Enter vault password: ••••••••',
        '',
        '✅ Vault unlocked',
        '✅ Wallet loaded  0x1a2B...9fE4',
        '✅ Exchanges       2 connected (mexc, gateio)',
        '✅ Policy          max 0.1 ETH/tx, 1.0 ETH/day',
        '✅ Socket          /tmp/openmm.sock (mode 0600)',
        '',
        'Ready — waiting for MCP connections...',
      ],
      nextDelay: 2500,
    },
  ],
  trade: [
    {
      typed: 'Agent: "What\'s the BTC/USDT price on MEXC?"',
      output: [
        '→ openmm_ticker(symbol: "BTC/USDT", exchange: "mexc")',
        '',
        '  Price       $67,342.50',
        '  Bid         $67,340.00',
        '  Ask         $67,345.00',
        '  24h Vol     $2.1B',
        '  Change      +2.4%',
      ],
      nextDelay: 1500,
    },
    {
      typed: 'Agent: "Place a limit buy for 0.01 BTC at $67,000"',
      output: [
        '→ openmm_create_order(...)',
        '',
        '✅ Order placed  #MX-7821934',
        '  Side        buy',
        '  Price       $67,000.00',
        '  Amount      0.01 BTC',
      ],
      nextDelay: 1500,
    },
    {
      typed: 'Agent: "Set up a grid bot for ETH/USDT"',
      output: [
        '→ openmm_grid_start(...)',
        '',
        '✅ Grid strategy started  #GRID-4821',
        '  Range       $3,200 — $3,800',
        '  Grids       10 levels',
        '  Investment  $500.00 USDT',
      ],
      nextDelay: 2500,
    },
  ],
  connect: [
    {
      typed: '$ openmm-status',
      output: [
        '',
        'Vault       ~/.openmm/vault.enc',
        'Wallet      0x1a2B...9fE4',
        'Exchanges   2 connected',
        'Socket      /tmp/openmm.sock ● active',
        '',
        'Caller          Action               Exchange',
        '───────────────────────────────────────────────',
        'Claude          openmm_ticker        mexc',
        'Claude          openmm_balance       gateio',
        'Cursor          openmm_orderbook     mexc',
        'Cursor          openmm_grid_status   mexc',
        'Scripts         openmm_create_order  bitget',
        '',
        'All flows route through one vault, one socket.',
      ],
      nextDelay: 2500,
    },
  ],
}

const tabs: { key: TabKey; label: string }[] = [
  { key: 'setup', label: 'Setup' },
  { key: 'trade', label: 'Trade' },
  { key: 'connect', label: 'Connect' },
]

export function HeroTerminal() {
  const [activeTab, setActiveTab] = useState<TabKey>('setup')
  const [segIdx, setSegIdx] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const [done, setDone] = useState<Segment[]>([])
  const [animKey, setAnimKey] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const segments = tabSegments[activeTab]
  const current = segments[segIdx] as Segment | undefined
  const isComplete = segIdx >= segments.length

  const restart = useCallback(() => {
    setSegIdx(0)
    setTypedText('')
    setShowOutput(false)
    setDone([])
    setAnimKey(k => k + 1)
  }, [])

  const switchTab = useCallback((tab: TabKey) => {
    setActiveTab(tab)
    setSegIdx(0)
    setTypedText('')
    setShowOutput(false)
    setDone([])
    setAnimKey(k => k + 1)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [typedText, showOutput, done])

  // Typing animation
  useEffect(() => {
    if (isComplete || !current) return

    const timers: ReturnType<typeof setTimeout>[] = []
    let charIndex = 0
    const text = current.typed

    const typingInterval = setInterval(() => {
      if (charIndex <= text.length) {
        setTypedText(text.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typingInterval)

        const t1 = setTimeout(() => {
          setShowOutput(true)

          const t2 = setTimeout(() => {
            setDone(prev => [...prev, current])
            setSegIdx(prev => prev + 1)
            setTypedText('')
            setShowOutput(false)
          }, current.nextDelay ?? 1500)
          timers.push(t2)
        }, 300)
        timers.push(t1)
      }
    }, 25)

    return () => {
      clearInterval(typingInterval)
      timers.forEach(t => clearTimeout(t))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segIdx, animKey])

  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden shadow-2xl shadow-purple-500/5">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-[#1a1a2e]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => switchTab(tab.key)}
              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                activeTab === tab.key
                  ? 'bg-white/10 text-white'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Refresh */}
        <button
          onClick={restart}
          className="p-1.5 hover:bg-white/10 rounded transition-colors group"
          aria-label="Replay animation"
        >
          <RotateCcw className="w-3.5 h-3.5 text-gray-400 group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Content */}
      <div ref={scrollRef} className="p-4 font-mono text-xs bg-[#0d0d1a] min-h-[340px] max-h-[380px] overflow-y-auto">
        {/* Completed segments */}
        {done.map((seg, si) => (
          <div key={`${animKey}-${si}`} className="mb-2">
            <div className={`whitespace-pre leading-relaxed ${getLineColor(seg.typed)}`}>
              {seg.typed}
            </div>
            {seg.output.map((line, li) => (
              <div key={li} className={`whitespace-pre leading-relaxed ${getLineColor(line)}`}>
                {line || '\u00A0'}
              </div>
            ))}
          </div>
        ))}

        {/* Current segment */}
        {!isComplete && current && (
          <div className="mb-2">
            <div className={`whitespace-pre leading-relaxed ${getLineColor(current.typed)}`}>
              {typedText}
              {!showOutput && <span className="animate-pulse text-purple-400">▋</span>}
            </div>
            {showOutput && current.output.map((line, li) => (
              <div key={li} className={`whitespace-pre leading-relaxed ${getLineColor(line)}`}>
                {line || '\u00A0'}
              </div>
            ))}
          </div>
        )}

        {/* Final cursor */}
        {isComplete && (
          <div className="mt-1">
            <span className="text-purple-400">$ </span>
            <span className="animate-pulse text-purple-400">▋</span>
          </div>
        )}
      </div>
    </div>
  )
}
