'use client'

import { useState, useEffect } from 'react'
import { Copy, Check, Play, RotateCcw } from 'lucide-react'

const setupSteps = [
  {
    command: 'git clone https://github.com/3rd-Eye-Labs/OpenMM.git && cd OpenMM',
    output: ['Cloning into \'OpenMM\'...', 'remote: Enumerating objects: 234, done.', 'Receiving objects: 100% (234/234), done.'],
    delay: 1500,
  },
  {
    command: 'npm install',
    output: ['Installing dependencies...', 'added 89 packages in 4.2s'],
    delay: 1200,
  },
  {
    command: 'cp .env.example .env',
    output: ['✓ Created .env file'],
    delay: 500,
  },
  {
    command: '# Edit .env with your exchange API keys',
    output: [
      '# MEXC_API_KEY="your-mexc-api-key"',
      '# MEXC_SECRET="your-mexc-secret"',
      '# GATEIO_API_KEY="your-gateio-key"',
      '# See: github.com/3rd-Eye-Labs/OpenMM#quick-start',
    ],
    delay: 800,
  },
  {
    command: 'npx openmm init',
    output: [
      '✓ Validating environment...',
      '✓ Connected to MEXC',
      '✓ Connected to Gate.io', 
      '✓ Connected to Bitget',
      '✓ Connected to Kraken',
      '✓ 30 tools available',
      '✓ MCP server ready on port 3000',
      '',
      '🚀 OpenMM is ready! Ask your AI agent to trade.',
    ],
    delay: 2000,
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

    // Start typing the command
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
        
        // Show output after a short delay
        setTimeout(() => {
          setShowOutput(true)
          setCompletedSteps(prev => [...prev, currentStep])
          
          // Move to next step
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
    }, 30)

    return () => clearInterval(typingInterval)
  }, [currentStep, isPlaying])

  // Auto-start on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      playAnimation()
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const currentStepData = setupSteps[currentStep]

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">
          <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Setup in 60 Seconds
          </span>
        </h2>
        <p className="text-gray-400">Watch the installation process or copy commands</p>
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
        <div className="p-6 font-mono text-sm bg-[#0d0d1a] min-h-[320px]">
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
                  <div key={i} className={`text-xs ${line.startsWith('✓') || line.startsWith('🚀') ? 'text-green-400' : line.startsWith('#') ? 'text-gray-500' : 'text-gray-500'}`}>
                    {line}
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
                  {isTyping && <span className="animate-pulse text-purple-400">▋</span>}
                </span>
              </div>
              {showOutput && (
                <div className="ml-4 mt-1 space-y-0.5">
                  {currentStepData.output.map((line, i) => (
                    <div key={i} className={`text-xs ${line.startsWith('✓') || line.startsWith('🚀') ? 'text-green-400' : line.startsWith('#') ? 'text-gray-500' : 'text-gray-500'}`}>
                      {line}
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
              <span className="animate-pulse text-purple-400">▋</span>
            </div>
          )}

          {/* Final prompt after completion */}
          {!isPlaying && completedSteps.length === setupSteps.length && (
            <div className="flex items-center gap-2 mt-4">
              <span className="text-purple-400 select-none">$</span>
              <span className="animate-pulse text-purple-400">▋</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick copy commands */}
      <div className="mt-6 grid sm:grid-cols-2 gap-3">
        <div className="bg-card/50 border border-border rounded-lg p-4">
          <div className="text-xs text-gray-500 mb-2">Clone & Install</div>
          <div className="flex items-center justify-between">
            <code className="text-purple-400 text-sm truncate mr-2">git clone https://github.com/3rd-Eye-Labs/OpenMM.git</code>
            <CopyButton text="git clone https://github.com/3rd-Eye-Labs/OpenMM.git && cd OpenMM && npm install" />
          </div>
        </div>
        <div className="bg-card/50 border border-border rounded-lg p-4">
          <div className="text-xs text-gray-500 mb-2">Initialize</div>
          <div className="flex items-center justify-between">
            <code className="text-purple-400 text-sm truncate mr-2">cp .env.example .env && npx openmm init</code>
            <CopyButton text="cp .env.example .env && npx openmm init" />
          </div>
        </div>
      </div>
    </section>
  )
}
