'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, Play, RotateCcw } from 'lucide-react'
import { useFadeInOnScroll } from '@/hooks/use-scroll-animation'

const setupSteps = [
  {
    command: 'npm install -g @3rd-eye-labs/openmm',
    output: ['changed 39 packages in 3s'],
    delay: 800,
  },
  {
    command: 'npx @3rd-eye-labs/openmm setup',
    output: [
      '',
      '┌───────────────────────────────────────────────────────────┐',
      '│  ██████╗ ██████╗ ███████╗███╗   ██╗███╗   ███╗███╗   ███╗│',
      '│ ██╔═══██╗██╔══██╗██╔════╝████╗  ██║████╗ ████║████╗ ████║│',
      '│ ██║   ██║██████╔╝█████╗  ██╔██╗ ██║██╔████╔██║██╔████╔██║│',
      '│ ██║   ██║██╔═══╝ ██╔══╝  ██║╚██╗██║██║╚██╔╝██║██║╚██╔╝██║│',
      '│ ╚██████╔╝██║     ███████╗██║ ╚████║██║ ╚═╝ ██║██║ ╚═╝ ██║│',
      '│  ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═══╝╚═╝     ╚═╝╚═╝     ╚═╝│',
      '│  AI-Native Market Making Infrastructure                  │',
      '│  Configure your exchange API credentials                 │',
      '└───────────────────────────────────────────────────────────┘',
      '',
      'Which exchanges do you want to configure?',
      '  1. MEXC',
      '  2. Gate.io',
      '  3. Kraken',
      '  4. Bitget',
      '',
      'Enter numbers separated by commas (e.g., 1,2,3)',
      'Or press Enter for all exchanges',
      '',
      'Your selection: 1',
      '',
      '🔑 MEXC credentials',
      '   Get your API key at: https://www.mexc.com/api',
      '   API Key: ********',
      '   Secret Key: ********',
      '',
      '✅ Credentials saved to .env',
      '',
      '💡 Try running: openmm balance --exchange mexc',
    ],
    delay: 2500,
  },
  {
    command: 'npm install -g @qbtlabs/openmm-mcp',
    output: ['changed 129 packages in 3s'],
    delay: 800,
  },
  {
    command: 'npx @qbtlabs/openmm-mcp setup',
    output: [
      '',
      'Which MCP clients do you want to configure?',
      '  1. Claude Desktop',
      '  2. Claude Code',
      '  3. Cursor',
      '  4. Windsurf',
      '',
      'Your selection: 2',
      '',
      '📁 Will configure 1 client(s):',
      '   • Claude Code: ~/.claude/settings.json',
      '',
      '✅ OpenMM configured for Claude Code',
      '🔄 Restart Claude Code to activate the changes.',
      '',
      '💡 Try asking your agent: "What is my balance on MEXC?"',
    ],
    delay: 2000,
  },
  {
    command: 'npx @qbtlabs/openmm-skills --all',
    output: [
      '',
      '┌─────────────────────────────────────────┐',
      '│  ███████╗██╗  ██╗██╗██╗     ██╗     ███████╗ │',
      '│  ██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝ │',
      '│  ███████╗█████╔╝ ██║██║     ██║     ███████╗ │',
      '│  ╚════██║██╔═██╗ ██║██║     ██║     ╚════██║ │',
      '│  ███████║██║  ██╗██║███████╗███████╗███████║ │',
      '│  ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝ │',
      '│  QBT Labs — Open-source market making        │',
      '└─────────────────────────────────────────────┘',
      '',
      '◇ Source: https://github.com/QBT-Labs/OpenMM-ai.git',
      '◇ Repository cloned',
      '◇ Found 5 skills',
      '● Installing all 5 skills',
      '● Installing to all 41 agents',
      '',
      '◇ Installation Summary',
      '  ├── openmm-exchange-setup',
      '  ├── openmm-grid-trading',
      '  ├── openmm-order-management',
      '  ├── openmm-cardano-dex',
      '  └── openmm-portfolio',
      '',
      '✅ All skills installed successfully!',
    ],
    delay: 2500,
  },
]

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className="p-1.5 hover:bg-white/10 rounded transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-3.5 h-3.5 text-green-400" />
      ) : (
        <Copy className="w-3.5 h-3.5 text-gray-400 hover:text-white" />
      )}
    </button>
  )
}

export function InteractiveTerminal() {
  const sectionRef = useFadeInOnScroll<HTMLElement>()
  const [currentStep, setCurrentStep] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const [displayedCommand, setDisplayedCommand] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const resetTerminal = () => {
    setCurrentStep(0)
    setIsTyping(false)
    setDisplayedCommand('')
    setShowOutput(false)
    setIsPlaying(false)
    setCompletedSteps([])
  }

  const playAnimation = () => {
    resetTerminal()
    setIsPlaying(true)
  }

  useEffect(() => {
    if (!isPlaying) return

    const step = setupSteps[currentStep]
    if (!step) {
      setIsPlaying(false)
      return
    }

    setIsTyping(true)
    let charIndex = 0
    const command = step.command

    const typingInterval = setInterval(() => {
      if (charIndex <= command.length) {
        setDisplayedCommand(command.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)

        setTimeout(() => {
          setShowOutput(true)
          setCompletedSteps(prev => [...prev, currentStep])

          setTimeout(() => {
            if (currentStep < setupSteps.length - 1) {
              setShowOutput(false)
              setDisplayedCommand('')
              setCurrentStep(prev => prev + 1)
            } else {
              setIsPlaying(false)
            }
          }, step.delay)
        }, 300)
      }
    }, 25)

    return () => clearInterval(typingInterval)
  }, [currentStep, isPlaying])

  useEffect(() => {
    const timer = setTimeout(() => {
      playAnimation()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const currentStepData = setupSteps[currentStep]

  const getLineColor = (line: string) => {
    if (line.startsWith('✅')) return 'text-green-400 success-glow'
    if (line.startsWith('💡') || line.startsWith('●')) return 'text-yellow-400'
    if (line.startsWith('🔑') || line.startsWith('📁')) return 'text-cyan-400'
    if (line.startsWith('🔄')) return 'text-blue-400'
    if (line.startsWith('◇')) return 'text-purple-400'
    if (line.includes('┌') || line.includes('│') || line.includes('└') || line.includes('├') || line.includes('╔') || line.includes('║') || line.includes('╚') || line.includes('╝') || line.includes('╗') || line.includes('═') || line.includes('█') || line.includes('██') || line.includes('███')) return 'text-green-500'
    if (line.startsWith('Which') || line.startsWith('Enter') || line.startsWith('Or press') || line.startsWith('Your selection')) return 'text-green-400'
    if (line.includes('MEXC') || line.includes('Gate.io') || line.includes('Kraken') || line.includes('Bitget') || line.includes('Claude') || line.includes('Cursor') || line.includes('Windsurf')) return 'text-white'
    if (line.includes('Get your API') || line.includes('API Key:') || line.includes('Secret') || line.includes('Will configure')) return 'text-gray-400'
    if (line.startsWith('changed')) return 'text-green-400'
    return 'text-gray-400'
  }

  return (
    <section ref={sectionRef} className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
            Setup in 60 Seconds
          </span>
        </h2>
        <p className="text-gray-500">Install globally, configure once, trade everywhere</p>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-[#1a1a2e]">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-xs text-gray-500 ml-2">Terminal — OpenMM Setup</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={playAnimation}
              className="flex items-center gap-1.5 px-2 py-1 text-xs bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded transition-colors"
            >
              {isPlaying ? <RotateCcw className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              {isPlaying ? 'Restart' : 'Play'}
            </button>
          </div>
        </div>

        {/* Terminal content */}
        <div className="p-6 font-mono text-sm bg-[#0d0d1a] min-h-[420px] max-h-[520px] overflow-y-auto">
          {/* Completed steps */}
          {completedSteps.map((stepIndex) => (
            <div key={stepIndex} className="mb-4">
              <div className="flex items-center gap-2 group">
                <span className="text-purple-400 select-none">$</span>
                <span className="text-gray-300 flex-1">{setupSteps[stepIndex].command}</span>
                <CopyButton text={setupSteps[stepIndex].command} />
              </div>
              <div className="ml-4 mt-1 space-y-0.5">
                {setupSteps[stepIndex].output.map((line, i) => (
                  <div key={i} className={`text-xs whitespace-pre ${getLineColor(line)}`}>
                    {line || '\u00A0'}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Current step (typing) */}
          {isPlaying && currentStepData && !completedSteps.includes(currentStep) && (
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="text-purple-400 select-none">$</span>
                <span className="text-gray-300">
                  {displayedCommand}
                  {isTyping && <span className="cursor-blink text-purple-400">▋</span>}
                </span>
              </div>
              {showOutput && (
                <div className="ml-4 mt-1 space-y-0.5">
                  {currentStepData.output.map((line, i) => (
                    <div key={i} className={`text-xs whitespace-pre ${getLineColor(line)}`}>
                      {line || '\u00A0'}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Waiting cursor when not playing */}
          {!isPlaying && completedSteps.length === 0 && (
            <div className="flex items-center gap-2">
              <span className="text-purple-400 select-none">$</span>
              <span className="cursor-blink text-purple-400">▋</span>
            </div>
          )}

          {/* Final prompt after completion */}
          {!isPlaying && completedSteps.length === setupSteps.length && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-purple-400 select-none">$</span>
              <span className="cursor-blink text-purple-400">▋</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick copy commands */}
      <div className="mt-6 grid sm:grid-cols-3 gap-3">
        <div className="bg-card/80 border border-border rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-2">CLI</div>
          <div className="flex items-center justify-between">
            <code className="text-purple-400 text-xs truncate mr-2">npm i -g @3rd-eye-labs/openmm</code>
            <CopyButton text="npm install -g @3rd-eye-labs/openmm && npx @3rd-eye-labs/openmm setup" />
          </div>
        </div>
        <div className="bg-card/80 border border-border rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-2">MCP Server</div>
          <div className="flex items-center justify-between">
            <code className="text-purple-400 text-xs truncate mr-2">npm i -g @qbtlabs/openmm-mcp</code>
            <CopyButton text="npm install -g @qbtlabs/openmm-mcp && npx @qbtlabs/openmm-mcp setup" />
          </div>
        </div>
        <div className="bg-card/80 border border-border rounded-lg p-4">
          <div className="text-xs text-gray-400 mb-2">Skills</div>
          <div className="flex items-center justify-between">
            <code className="text-purple-400 text-xs truncate mr-2">npx @qbtlabs/openmm-skills --all</code>
            <CopyButton text="npx @qbtlabs/openmm-skills --all" />
          </div>
        </div>
      </div>
    </section>
  )
}
