'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { HeroTerminal } from '@/components/home/interactive-terminal'

function CountUp({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setCount(end)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const obj = { val: 0 }
          gsap.to(obj, {
            val: end,
            duration: 2,
            ease: 'power2.out',
            delay: 0.8,
            onUpdate: () => setCount(Math.round(obj.val)),
          })
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end])

  return <span ref={ref}>{count}{suffix}</span>
}

export function AnimatedHero() {
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const h1 = headlineRef.current
    const badge = badgeRef.current
    const sub = subheadlineRef.current
    const stats = statsRef.current
    const terminal = terminalRef.current
    if (!h1 || !badge || !sub || !stats) return

    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo(badge,
      { opacity: 0, y: -20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
    )

    const letters = h1.querySelectorAll('.letter')
    if (letters.length) {
      tl.fromTo(letters,
        { opacity: 0, y: 30, rotateX: -40 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.02, duration: 0.5, ease: 'back.out(1.5)' },
        '-=0.2'
      )
    }

    const gradientLine = h1.querySelector('.gradient-line')
    if (gradientLine) {
      tl.fromTo(gradientLine,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )
    }

    tl.fromTo(sub,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
      '-=0.3'
    )

    tl.fromTo(stats,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    )

    if (terminal) {
      tl.fromTo(terminal,
        { opacity: 0, x: 40 },
        { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
    }

    return () => { tl.kill() }
  }, [])

  const renderLetters = (text: string) => {
    return text.split('').map((char, i) => (
      <span
        key={i}
        className="letter inline-block will-change-transform"
        style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  return (
    <section className="relative overflow-hidden pt-20 pb-12 lg:pt-24 lg:pb-16 flex items-center justify-center min-h-[80vh] bg-[#0a0a0f]">
      {/* Layer 1: Eclipse Glow shader (base) */}
      <iframe
        src="/shaders/eclipse-glow.html"
        title="Background effect"
        className="absolute inset-0 w-full h-full border-0 pointer-events-none"
        style={{ opacity: 0.85 }}
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Layer 2: Kinetic Grid shader (texture overlay) */}
      <iframe
        src="/shaders/kinetic-grid.html"
        title="Grid effect"
        className="absolute inset-0 w-full h-full border-0 pointer-events-none"
        style={{ opacity: 0.35, mixBlendMode: 'screen' }}
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Soft vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 80%)',
        }}
      />

      {/* Content — 2-column grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400/50 bg-black/40 text-purple-300 text-sm font-medium mb-6 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
              </span>
              One bridge. Every exchange.
            </div>

            {/* Headline */}
            <h1 ref={headlineRef} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-5" style={{ perspective: '600px' }}>
              <span className="block text-white animate-headline-1">
                {renderLetters('AI Trading Tools')}
              </span>
              <span className="gradient-line block bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent mt-2 animate-headline-2">
                For Your Agent
              </span>
            </h1>

            {/* Subheadline */}
            <p ref={subheadlineRef} className="text-base sm:text-lg text-gray-300 max-w-lg mx-auto lg:mx-0 mb-5 leading-relaxed">
              Connect your MCP server and use tools securely with vault encryption, process isolation, and policy management.
            </p>

            {/* Stats */}
            <div ref={statsRef} className="flex items-center justify-center lg:justify-start gap-3 text-sm">
              <span className="text-purple-400 font-semibold"><CountUp end={4} /></span>
              <span className="text-gray-400">Exchanges</span>
              <span className="text-gray-600">|</span>
              <span className="text-purple-400 font-semibold"><CountUp end={30} suffix="+" /></span>
              <span className="text-gray-400">Tools</span>
              <span className="text-gray-600">|</span>
              <span className="text-purple-400 font-semibold">Open</span>
              <span className="text-gray-400">Source</span>
            </div>
          </div>

          {/* Right: Terminal */}
          <div ref={terminalRef} className="w-full max-w-xl mx-auto lg:mx-0">
            <HeroTerminal />
            <p className="text-center text-xs text-gray-500 mt-3">
              Vault encryption · Process isolation · Policy enforcement
            </p>
          </div>

        </div>
      </div>

      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes headline1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        @keyframes headline2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(4px); }
        }
        .animate-headline-1 {
          animation: headline1 4s ease-in-out infinite;
        }
        .animate-headline-2 {
          animation: headline2 4s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
    </section>
  )
}
