'use client'

import { Copy, Check, ArrowRight, ArrowLeft, Database, TrendingUp, Coins, Terminal, ExternalLink } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { skills, getSkillBySlug, getRelatedSkills, type Tool } from '@/lib/skills-data'

function CopyButton({ text, size = 'md' }: { text: string; size?: 'sm' | 'md' }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const iconSize = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
  const padding = size === 'sm' ? 'p-1' : 'p-2'

  return (
    <button
      onClick={copy}
      className={`${padding} hover:bg-white/10 rounded transition-colors`}
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className={`${iconSize} text-green-400`} /> : <Copy className={`${iconSize} text-gray-400`} />}
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

function ToolCard({ tool }: { tool: Tool }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Tool Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-4 text-left hover:bg-secondary/30 transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Terminal className="w-4 h-4 text-purple-400" />
            <code className="text-purple-400 font-medium">{tool.name}</code>
          </div>
          <ArrowRight className={`w-4 h-4 text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </div>
        <p className="text-sm text-gray-400 mt-2">{tool.description}</p>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-border p-4 bg-secondary/20">
          {/* Parameters */}
          <div className="mb-4">
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Parameters</h4>
            <div className="space-y-2">
              {tool.parameters.map((param) => (
                <div key={param.name} className="flex items-start gap-2 text-sm">
                  <code className="text-purple-400 bg-secondary px-1.5 py-0.5 rounded text-xs">
                    {param.name}
                  </code>
                  <span className="text-gray-500 text-xs">
                    {param.type}
                    {param.required && <span className="text-red-400 ml-1">*</span>}
                  </span>
                  <span className="text-gray-400 text-xs">— {param.description}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Example */}
          <div>
            <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Example</h4>
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Request:</span>
                  <CopyButton text={tool.example.request} size="sm" />
                </div>
                <pre className="text-xs overflow-x-auto">
                  <code className="text-green-400">{tool.example.request}</code>
                </pre>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Response:</span>
                  <CopyButton text={tool.example.response} size="sm" />
                </div>
                <pre className="text-xs overflow-x-auto max-h-48">
                  <code className="text-gray-300">{tool.example.response}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SkillDetailPage({ params }: { params: { slug: string } }) {
  const skill = getSkillBySlug(params.slug)

  if (!skill) {
    notFound()
  }

  const relatedSkills = getRelatedSkills(skill)
  const CategoryIcon = categoryIcons[skill.category]

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <Link href="/skills" className="inline-flex items-center text-gray-400 hover:text-white text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Skills Directory
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <CategoryIcon className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">{skill.name}</h1>
            <span className="text-sm text-gray-500">{categoryLabels[skill.category]} • {skill.tools.length} tools</span>
          </div>
        </div>
        <p className="text-lg text-gray-400">{skill.longDescription}</p>
      </header>

      {/* Quick Install */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Quick Install</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {skill.installCommands.map((cmd) => (
            <div key={cmd.client} className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-300">{cmd.client}</span>
                <CopyButton text={cmd.command} size="sm" />
              </div>
              <pre className="text-xs overflow-x-auto">
                <code className="text-purple-400">{cmd.command}</code>
              </pre>
            </div>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">MCP Tools ({skill.tools.length})</h2>
        <p className="text-sm text-gray-400 mb-6">
          Click on a tool to see parameters and examples. All tools are available via MCP protocol.
        </p>
        <div className="space-y-4">
          {skill.tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Use Cases</h2>
        <ul className="grid md:grid-cols-2 gap-3">
          {skill.useCases.map((useCase, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-400">
              <span className="text-purple-400 mt-1">→</span>
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Pricing */}
      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Pricing</h2>
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-purple-400">{skill.pricing}</p>
              <p className="text-sm text-gray-500">Pay per call with USDC on Base or Solana</p>
            </div>
            <a
              href="/#pricing"
              className="inline-flex items-center text-purple-400 text-sm hover:text-purple-300"
            >
              View all pricing <ExternalLink className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Related Skills */}
      {relatedSkills.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold mb-4">Related Skills</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {relatedSkills.map((related) => {
              const RelatedIcon = categoryIcons[related.category]
              return (
                <Link
                  key={related.slug}
                  href={`/skills/${related.slug}`}
                  className="bg-card border border-border rounded-lg p-4 hover:border-purple-500/50 transition-colors group"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <RelatedIcon className="w-5 h-5 text-purple-400" />
                    <span className="font-medium text-white group-hover:text-purple-400 transition-colors">
                      {related.name}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{related.description}</p>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="pt-8 border-t border-border text-center text-gray-500 text-sm">
        <p>© 2026 QBT Labs. MIT License.</p>
        <div className="flex justify-center gap-6 mt-4">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/skills" className="hover:text-white">Skills</Link>
          <a href="https://github.com/3rd-Eye-Labs/OpenMM" className="hover:text-white">GitHub</a>
        </div>
      </footer>
    </div>
  )
}
