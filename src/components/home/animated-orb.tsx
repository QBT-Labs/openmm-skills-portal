'use client'

import { useEffect, useRef } from 'react'

export function AnimatedOrb() {
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
      const radius = Math.min(width, height) * 0.35

      ctx.clearRect(0, 0, width, height)

      // Create multiple overlapping gradients for the morphing effect
      for (let i = 0; i < 3; i++) {
        const offset = (i * Math.PI * 2) / 3
        const wobbleX = Math.sin(time * 0.8 + offset) * radius * 0.3
        const wobbleY = Math.cos(time * 0.6 + offset) * radius * 0.3

        const gradient = ctx.createRadialGradient(
          centerX + wobbleX,
          centerY + wobbleY,
          0,
          centerX,
          centerY,
          radius * 1.5
        )

        if (i === 0) {
          // Magenta/Pink
          gradient.addColorStop(0, 'rgba(236, 72, 153, 0.8)')
          gradient.addColorStop(0.5, 'rgba(219, 39, 119, 0.4)')
          gradient.addColorStop(1, 'rgba(219, 39, 119, 0)')
        } else if (i === 1) {
          // Cyan/Teal
          gradient.addColorStop(0, 'rgba(34, 211, 238, 0.8)')
          gradient.addColorStop(0.5, 'rgba(6, 182, 212, 0.4)')
          gradient.addColorStop(1, 'rgba(6, 182, 212, 0)')
        } else {
          // Blue/Purple
          gradient.addColorStop(0, 'rgba(139, 92, 246, 0.6)')
          gradient.addColorStop(0.5, 'rgba(124, 58, 237, 0.3)')
          gradient.addColorStop(1, 'rgba(124, 58, 237, 0)')
        }

        ctx.globalCompositeOperation = i === 0 ? 'source-over' : 'lighter'
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(centerX, centerY, radius * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }

      // Add subtle noise/grain texture
      ctx.globalCompositeOperation = 'overlay'
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 15
        data[i] += noise
        data[i + 1] += noise
        data[i + 2] += noise
      }
      ctx.putImageData(imageData, 0, 0)

      // Glow effect
      ctx.globalCompositeOperation = 'source-over'
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.5,
        centerX, centerY, radius * 1.2
      )
      glowGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)')
      glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
      ctx.fillStyle = glowGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius * 1.2, 0, Math.PI * 2)
      ctx.fill()

      time += 0.02
      animationId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <div className="relative w-full max-w-md aspect-square mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ filter: 'blur(1px)' }}
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            OpenMM
          </h3>
          <p className="text-sm text-gray-400 mt-1">AI-Native Trading</p>
        </div>
      </div>
    </div>
  )
}
