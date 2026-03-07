'use client'

import { Copy, Check, ArrowRight, Database, TrendingUp, Coins } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { skills } from '@/lib/skills-data'

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

const categoryIcons = {
  'market-data': Database,
  'trading': TrendingUp,
  'cardano': Coins,
}

const categoryLabels = {
  'market-data': 'Market Data',
  'trading': 'Trading',
  'cardano': 'Cardano',
}

export default function SkillsDirectory() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      {/* Header */}
      <section className="text-center mb-16">
        <Link href="/" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Skills Directory
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Browse all available OpenMM skills. Each skill provides a set of MCP tools 
          that AI agents can use for trading and market data operations.
        </p>
      </section>

      {/* Quick Install */}
      <section className="mb-16 text-center">
        <p className="text-sm text-gray-500 mb-3">Install all skills at once:</p>
        <div className="install-box inline-flex items-center gap-4">
          <code className="text-purple-400">npx skills add qbt-labs/openmm</code>
          <CopyButton text="npx skills add qbt-labs/openmm" />
        </div>
      </section>

      {/* Skills Grid */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8">
          {skills.map((skill) => {
            const CategoryIcon = categoryIcons[skill.category]
            return (
              <div
                key={skill.slug}
                className="bg-card border border-border rounded-lg p-6 hover:border-purple-500/50 transition-all group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <CategoryIcon className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-purple-400 transition-colors">
                        {skill.name}
                      </h3>
                      <span className="text-xs text-gray-500">{categoryLabels[skill.category]}</span>
                    </div>
                  </div>
                  <span className="text-xs bg-secondary px-2 py-1 rounded text-gray-400">
                    {skill.tools.length} tools
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-4">{skill.description}</p>

                {/* Tools Preview */}
                <div className="mb-4">
                  <div className="text-xs text-gray-500 mb-2">Included tools:</div>
                  <div className="flex flex-wrap gap-2">
                    {skill.tools.slice(0, 4).map((tool) => (
                      <code key={tool.name} className="text-xs bg-secondary px-2 py-1 rounded text-purple-400">
                        {tool.name}
                      </code>
                    ))}
                    {skill.tools.length > 4 && (
                      <span className="text-xs text-gray-500 self-center">
                        +{skill.tools.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Install Command */}
                <div className="install-box text-sm flex items-center justify-between mb-4">
                  <code className="text-purple-400 text-xs truncate mr-2">
                    {skill.installCommands[0].command}
                  </code>
                  <CopyButton text={skill.installCommands[0].command} />
                </div>

                {/* Pricing & Link */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    Pricing: <span className="text-purple-400">{skill.pricing}</span>
                  </span>
                  <Link
                    href={`/skills/${skill.slug}`}
                    className="inline-flex items-center text-purple-400 text-sm hover:text-purple-300 transition-colors"
                  >
                    View Details <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Coming Soon */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6 text-center text-gray-400">Coming Soon</h2>
        <div className="grid md:grid-cols-1 max-w-md mx-auto gap-4">
          {[
            { name: 'openmm-analytics', description: 'AI-powered market analysis and backtesting', tools: 8 },
          ].map((skill) => (
            <div
              key={skill.name}
              className="bg-card/50 border border-border/50 rounded-lg p-4 opacity-60"
            >
              <h3 className="text-sm font-medium text-gray-400 mb-1">{skill.name}</h3>
              <p className="text-xs text-gray-500 mb-2">{skill.description}</p>
              <span className="text-xs text-gray-600">{skill.tools} tools planned</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-8 border-t border-border text-center text-gray-500 text-sm">
        <p>© 2026 QBT Labs. MIT License.</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/" className="hover:text-white">Home</Link>
          <a href="https://github.com/3rd-Eye-Labs/OpenMM" className="hover:text-white">GitHub</a>
          <a href="https://qbtlabs.io" className="hover:text-white">QBT Labs</a>
        </div>
      </footer>
    </div>
  )
}
