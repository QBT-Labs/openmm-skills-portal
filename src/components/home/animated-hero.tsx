'use client'

import { useEffect, useRef } from 'react'

export function AnimatedHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

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
      const radius = Math.min(width, height) * 0.45

      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < 3; i++) {
        const offset = (i * Math.PI * 2) / 3
        const wobbleX = Math.sin(time * 0.8 + offset) * radius * 0.25
        const wobbleY = Math.cos(time * 0.6 + offset) * radius * 0.25

        const gradient = ctx.createRadialGradient(
          centerX + wobbleX,
          centerY + wobbleY,
          0,
          centerX,
          centerY,
          radius * 1.5
        )

        if (i === 0) {
          gradient.addColorStop(0, 'rgba(236, 72, 153, 0.7)')
          gradient.addColorStop(0.5, 'rgba(219, 39, 119, 0.35)')
          gradient.addColorStop(1, 'rgba(219, 39, 119, 0)')
        } else if (i === 1) {
          gradient.addColorStop(0, 'rgba(34, 211, 238, 0.6)')
          gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.3)')
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0)')
        } else {
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.8)')
          gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.4)')
          gradient.addColorStop(1, 'rgba(124, 58, 237, 0)')
        }

        ctx.globalCompositeOperation = i === 0 ? 'source-over' : 'lighter'
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2)
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

  return (
    <section className="relative overflow-hidden min-h-[70vh] flex items-center justify-center">
      {/* Animated Orb Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ filter: 'blur(60px)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-sm mb-8 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          One bridge. Every exchange.
        </div>

        {/* Animated Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          <span className="block text-white animate-headline-1">
            AI Trading Tools
          </span>
          <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-2 animate-headline-2">
            For Your Agent
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Connect any MCP-compatible AI agent to crypto exchanges. 
          Get prices, place orders, and run strategies with natural language.
        </p>

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
