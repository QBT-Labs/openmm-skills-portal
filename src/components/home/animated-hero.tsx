'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const orbContainerRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const subheadlineRef = useRef<HTMLParagraphElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  // Canvas orb animation — high saturation, high contrast
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const rect = canvas.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      const centerX = width / 2
      const centerY = height / 2
      const radius = Math.min(width, height) * 0.55

      ctx.clearRect(0, 0, width, height)

      // Dark base to increase contrast
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < 3; i++) {
        const offset = (i * Math.PI * 2) / 3
        const wobbleX = Math.sin(time * 0.8 + offset) * radius * 0.3
        const wobbleY = Math.cos(time * 0.6 + offset) * radius * 0.3

        const gradient = ctx.createRadialGradient(
          centerX + wobbleX,
          centerY + wobbleY,
          0,
          centerX + wobbleX,
          centerY + wobbleY,
          radius * 1.2
        )

        if (i === 0) {
          // Pink — saturated
          gradient.addColorStop(0, 'rgba(236, 72, 153, 0.95)')
          gradient.addColorStop(0.3, 'rgba(219, 39, 119, 0.6)')
          gradient.addColorStop(0.7, 'rgba(219, 39, 119, 0.15)')
          gradient.addColorStop(1, 'rgba(219, 39, 119, 0)')
        } else if (i === 1) {
          // Cyan — saturated
          gradient.addColorStop(0, 'rgba(34, 211, 238, 0.9)')
          gradient.addColorStop(0.3, 'rgba(6, 182, 212, 0.5)')
          gradient.addColorStop(0.7, 'rgba(6, 182, 212, 0.12)')
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0)')
        } else {
          // Purple — saturated
          gradient.addColorStop(0, 'rgba(139, 92, 246, 1)')
          gradient.addColorStop(0.3, 'rgba(124, 58, 237, 0.65)')
          gradient.addColorStop(0.7, 'rgba(124, 58, 237, 0.15)')
          gradient.addColorStop(1, 'rgba(124, 58, 237, 0)')
        }

        ctx.globalCompositeOperation = i === 0 ? 'source-over' : 'lighter'
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(centerX + wobbleX, centerY + wobbleY, radius * 1.2, 0, Math.PI * 2)
        ctx.fill()
      }

      time += 0.015
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Mouse parallax for orb container
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return
    if (window.innerWidth < 768) return

    const container = orbContainerRef.current
    if (!container) return

    const handleMouseMove = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) - 0.5) * 40
      const y = ((e.clientY / window.innerHeight) - 0.5) * 40

      gsap.to(container, {
        x,
        y,
        duration: 1,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Hero entrance animation sequence — uses fromTo so elements are always visible at the end
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const h1 = headlineRef.current
    const badge = badgeRef.current
    const sub = subheadlineRef.current
    const stats = statsRef.current
    if (!h1 || !badge || !sub || !stats) return

    const tl = gsap.timeline({ delay: 0.2 })

    tl.fromTo(badge,
      { opacity: 0, y: -20, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power3.out' }
    )

    // Stagger letters on line 1
    const letters = h1.querySelectorAll('.letter')
    if (letters.length) {
      tl.fromTo(letters,
        { opacity: 0, y: 30, rotateX: -40 },
        { opacity: 1, y: 0, rotateX: 0, stagger: 0.02, duration: 0.5, ease: 'back.out(1.5)' },
        '-=0.2'
      )
    }

    // Animate gradient line as a whole block
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
    <section className="relative overflow-hidden pt-24 pb-8 flex items-center justify-center">
      {/* Animated Orb Background with mouse parallax */}
      <div
        ref={orbContainerRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none will-change-transform"
        style={{ top: '-20%', height: '140%' }}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ filter: 'blur(50px)', minHeight: '600px' }}
        />
      </div>

      {/* Dark overlay for contrast */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.5) 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-400/50 bg-black/40 text-purple-300 text-sm font-medium mb-8 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400"></span>
          </span>
          One bridge. Every exchange.
        </div>

        {/* Two-line headline */}
        <h1 ref={headlineRef} className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6" style={{ perspective: '600px' }}>
          <span className="block text-white animate-headline-1">
            {renderLetters('AI Trading Tools')}
          </span>
          <span className="gradient-line block bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent mt-2 animate-headline-2">
            For Your Agent
          </span>
        </h1>

        {/* Subheadline */}
        <p ref={subheadlineRef} className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed">
          Connect any MCP-compatible AI agent to crypto exchanges.
          Get prices, place orders, and run strategies with natural language.
        </p>

        {/* Minimal inline stats — no cards */}
        <div ref={statsRef} className="flex items-center justify-center gap-3 text-sm">
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
