'use client'

import { Copy, Check, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { AccessMethods } from '@/components/home/access-methods'
import { SupportedExchanges } from '@/components/home/supported-exchanges'
import { UseCases } from '@/components/home/use-cases'
import { MCPClients } from '@/components/home/mcp-clients'
import { PlugAndPlaySkills } from '@/components/home/plug-and-play-skills'
import { AnimatedHero } from '@/components/home/animated-hero'

gsap.registerPlugin(ScrollTrigger)

const INSTALL_COMMAND = 'npm install -g @qbtlabs/openmm-mcp'

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
      className="p-2 hover:bg-white/10 rounded-md transition-colors"
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-4 h-4 text-green-400" />
      ) : (
        <Copy className="w-4 h-4 text-gray-400 hover:text-white" />
      )}
    </button>
  )
}

const features = [
  {
    icon: Zap,
    title: 'Instant Setup',
    description: 'One command to connect your AI agent to multiple exchanges.',
  },
  {
    icon: Sparkles,
    title: 'MCP Native',
    description: 'Built for Claude, Cursor, and any MCP-compatible agent.',
  },
  {
    icon: Shield,
    title: 'Production Ready',
    description: 'Battle-tested with 99.9% uptime and <100ms response times.',
  },
]

export default function Home() {
  const featuresGridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const tweens: gsap.core.Tween[] = []

    // Features cards stagger
    if (featuresGridRef.current) {
      const cards = featuresGridRef.current.querySelectorAll('.feature-card')
      gsap.set(cards, { opacity: 0, y: 60 })

      tweens.push(
        gsap.to(cards, {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: featuresGridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        })
      )
    }

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }
  }, [])

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero with side-by-side terminal */}
      <AnimatedHero />

      {/* Install Command + CTA Section */}
      <section className="max-w-5xl mx-auto px-4 pt-6 pb-16 text-center relative z-20">
        {/* Install Command */}
        <div className="install-box inline-flex items-center gap-3 mb-8">
          <span className="text-gray-500">$</span>
          <code className="text-purple-400 font-medium">{INSTALL_COMMAND}</code>
          <CopyButton text={INSTALL_COMMAND} />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/skills">
            <Button size="lg" className="w-full sm:w-auto gap-2">
              Browse Skills
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/docs">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Read the Docs
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <div ref={featuresGridRef} className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="feature-card group p-6 rounded-xl border border-border bg-card/50 hover:border-purple-500/50 hover:bg-card transition-all duration-300 card-hover-glow"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 transition-colors">
                <feature.icon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* MCP Clients Section */}
      <MCPClients />

      {/* Plug and Play Skills Section */}
      <PlugAndPlaySkills />

      {/* Use Cases Section */}
      <UseCases />

      {/* Supported Exchanges Section */}
      <SupportedExchanges />

      {/* Access Methods Section */}
      <AccessMethods />
    </div>
  )
}
