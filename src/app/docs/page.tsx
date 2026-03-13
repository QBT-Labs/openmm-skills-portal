'use client'

import { BookOpen, Zap, Server, Terminal, ArrowRight } from 'lucide-react'
import Link from 'next/link'

const docSections = [
  {
    icon: Zap,
    title: 'Quick Start',
    description: 'Get your AI agent trading in 5 minutes',
    href: '/docs/quickstart',
    time: '5 min',
  },
  {
    icon: Server,
    title: 'MCP Setup',
    description: 'Connect Claude Desktop, Cursor, OpenClaw, or Windsurf',
    href: '/docs/mcp-setup',
    time: '10 min',
  },
  {
    icon: Terminal,
    title: 'CLI Reference',
    description: 'Command-line tool documentation',
    href: '/docs/cli',
    time: '8 min',
  },
]

const quickLinks = [
  { title: 'OpenClaw Setup Guide', href: '/docs/openclaw' },
  { title: 'Cross-Skill Workflows', href: '/docs/workflows' },
  { title: 'Prompt Library', href: '/prompts' },
  { title: 'GitHub Repository', href: 'https://github.com/3rd-Eye-Labs/OpenMM', external: true },
  { title: 'CLI Reference (GitHub)', href: 'https://github.com/3rd-Eye-Labs/OpenMM/blob/main/docs/CLI.md', external: true },
]

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="mb-12">
        <Link href="/" className="text-gray-400 hover:text-white text-sm mb-4 inline-block">
          ← Back to Home
        </Link>
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <BookOpen className="w-10 h-10 text-purple-400" />
          Documentation
        </h1>
        <p className="text-xl text-gray-400">
          Everything you need to integrate OpenMM with your AI agent
        </p>
      </div>

      {/* Doc Sections Grid */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6">Guides</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {docSections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className="bg-card border border-border rounded-lg p-6 transition-colors hover:border-purple-500/50"
            >
              <div className="flex items-start justify-between mb-4">
                <section.icon className="w-8 h-8 text-purple-400" />
                <span className="text-xs px-2 py-1 rounded bg-purple-500/20 text-purple-400">
                  {section.time}
                </span>
              </div>
              <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{section.description}</p>
              <span className="inline-flex items-center text-purple-400 text-sm">
                Read Guide <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick Links */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold mb-6">Quick Links</h2>
        <div className="bg-card border border-border rounded-lg divide-y divide-border">
          {quickLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
            >
              <span>{link.title}</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </a>
          ))}
        </div>
      </section>

      {/* Help Section */}
      <section className="text-center bg-card border border-border rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-2">Need Help?</h2>
        <p className="text-gray-400 mb-4">
          Join our community or reach out for support
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="https://github.com/QBT-Labs/openmm-skills-portal/issues"
            className="px-4 py-2 bg-secondary hover:bg-secondary/80 rounded-lg text-sm transition-colors"
          >
            Open an Issue
          </a>
          <a
            href="https://x.com/QBTLabs"
            className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg text-sm transition-colors"
          >
            Follow @QBTLabs
          </a>
        </div>
      </section>
    </div>
  )
}
