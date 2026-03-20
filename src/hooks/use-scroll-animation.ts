'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Animate a section into view on scroll.
 * Uses gsap.set to hide initially, then gsap.to with ScrollTrigger to reveal.
 */
export function useFadeInOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Set initial hidden state
    gsap.set(el, { opacity: 0, y: 80 })

    const tween = gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return ref
}

/**
 * Stagger-animate children of a container into view on scroll.
 */
export function useStaggerIn<T extends HTMLElement>(
  selector: string,
  options: { stagger?: number; fromY?: number; fromX?: number; duration?: number } = {}
) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const children = el.querySelectorAll(selector)
    if (!children.length) return

    const { stagger = 0.15, fromY = 60, fromX = 0, duration = 0.8 } = options

    // Set initial state on children
    gsap.set(children, { opacity: 0, y: fromY, x: fromX })

    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      x: 0,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [selector, options.stagger, options.fromY, options.fromX, options.duration])

  return ref
}

/**
 * Animate children from alternating sides (odd from left, even from right).
 */
export function useAlternatingSlideIn<T extends HTMLElement>(selector: string) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const children = el.querySelectorAll(selector)
    if (!children.length) return

    const tweens: gsap.core.Tween[] = []

    children.forEach((child, i) => {
      const fromX = i % 2 === 0 ? -80 : 80
      gsap.set(child, { opacity: 0, x: fromX })

      const tween = gsap.to(child, {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: child,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      })

      tweens.push(tween)
    })

    return () => {
      tweens.forEach((t) => {
        t.scrollTrigger?.kill()
        t.kill()
      })
    }
  }, [selector])

  return ref
}
