'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
}

interface FloatingParticlesProps {
  fadeOut?: boolean
}

export default function FloatingParticles({ fadeOut = false }: FloatingParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<{x: number; y: number} | null>(null)
  const globalAlphaRef = useRef(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size to full viewport
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Create particles
    const particles: Particle[] = []
    const particleCount = 260

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 1.8 + 0.4,
        opacity: Math.random() * 0.35 + 0.15,
        color: '#ffffff'
      })
    }

    // Camera offset that follows mouse for a viewport-wide parallax effect
    let viewOffsetX = 0
    let viewOffsetY = 0
    const swayAmplitude = 60 // max pixels the field can sway
    const followStrength = 0.06 // lerp factor

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update camera/view offset towards mouse
      const m = mouseRef.current
      if (m) {
        const nx = (m.x / canvas.width) - 0.5 // -0.5..0.5
        const ny = (m.y / canvas.height) - 0.5
        const targetX = nx * swayAmplitude
        const targetY = ny * swayAmplitude
        viewOffsetX += (targetX - viewOffsetX) * followStrength
        viewOffsetY += (targetY - viewOffsetY) * followStrength
      } else {
        // Ease back to center when no mouse
        viewOffsetX *= (1 - followStrength)
        viewOffsetY *= (1 - followStrength)
      }

      // Update global alpha toward target (dissolve)
      const targetAlpha = fadeOut ? 0 : 1
      globalAlphaRef.current += (targetAlpha - globalAlphaRef.current) * 0.08

      particles.forEach((particle) => {
        // Drift
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around world edges
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.globalAlpha = particle.opacity * globalAlphaRef.current
        ctx.fillStyle = particle.color
        ctx.beginPath()
        // Apply camera/view offset and wrap for rendering
        let rx = particle.x + viewOffsetX
        let ry = particle.y + viewOffsetY
        if (rx < 0) rx += canvas.width
        if (rx > canvas.width) rx -= canvas.width
        if (ry < 0) ry += canvas.height
        if (ry > canvas.height) ry -= canvas.height
        ctx.arc(rx, ry, particle.size, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [fadeOut])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => { mouseRef.current = null }
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <motion.div 
      className="fixed inset-0 pointer-events-none z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, delay: 0.2 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ mixBlendMode: 'screen' }}
      />
    </motion.div>
  )
}