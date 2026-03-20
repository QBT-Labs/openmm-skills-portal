'use client'

import { ArrowRight, Terminal, Plug, Cpu, Code } from 'lucide-react'
import Link from 'next/link'
import { useFadeInOnScroll, useStaggerIn } from '@/hooks/use-scroll-animation'

const accessMethods = [
  {
    icon: Cpu,
    title: 'Skills',
    description: 'Install as a skill for Claude Code, Cursor, or OpenClaw. Get all tools with one command.',
    href: '/docs/quickstart',
    cta: 'Install Skill',
  },
  {
    icon: Plug,
    title: 'MCP',
    description: 'Connect via Model Context Protocol. Works with any MCP-compatible AI agent.',
    href: '/docs/mcp-setup',
    cta: 'Setup MCP',
  },
  {
    icon: Terminal,
    title: 'CLI',
    description: 'Use the openmm command line directly. Perfect for scripts and automation.',
    href: '/docs/cli',
    cta: 'CLI Reference',
  },
  {
    icon: Code,
    title: 'API',
    description: 'REST API with 18 endpoints. Swagger docs included. For web apps and integrations.',
    href: '/docs/api-reference',
    cta: 'API Reference',
  },
]

export function AccessMethods() {
  const headerRef = useFadeInOnScroll<HTMLDivElement>()
  const gridRef = useStaggerIn<HTMLDivElement>('.access-card', { stagger: 0.12, fromY: 50 })

  return (
    <section className="max-w-5xl mx-auto px-4 py-20">
      {/* Section Header */}
      <div ref={headerRef} className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          <span className="bg-gradient-to-r from-gray-900 to-gray-500 bg-clip-text text-transparent">
            Choose Your Access Method
          </span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Multiple ways to integrate OpenMM into your workflow. Pick what works best for you.
        </p>
      </div>

      {/* Cards Grid */}
      <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {accessMethods.map((method) => (
          <Link
            key={method.title}
            href={method.href}
            className="access-card group relative p-6 rounded-xl border border-border bg-card/80 hover:border-purple-500/50 hover:bg-card transition-all duration-300 flex flex-col card-hover-glow"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
              <method.icon className="w-6 h-6 text-purple-400" />
            </div>

            {/* Content */}
            <h3 className="text-lg font-semibold mb-2 group-hover:text-purple-400 transition-colors">
              {method.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed flex-grow mb-4">
              {method.description}
            </p>

            {/* CTA */}
            <div className="flex items-center gap-1 text-sm text-purple-400 group-hover:gap-2 transition-all">
              <span>{method.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
