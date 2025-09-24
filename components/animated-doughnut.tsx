'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedDoughnut() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Doughnut configuration
    const centerX = canvas.width / (2 * window.devicePixelRatio)
    const centerY = canvas.height / (2 * window.devicePixelRatio)
    const outerRadius = Math.min(centerX, centerY) * 0.8
    const innerRadius = outerRadius * 0.4
    const dotCount = 1500
    const dots: Array<{
      angle: number
      radius: number
      x: number
      y: number
      opacity: number
      size: number
      rotationSpeed: number
    }> = []

    // Generate dots in doughnut shape
    for (let i = 0; i < dotCount; i++) {
      const angle = (Math.random() * Math.PI * 2)
      const radius = innerRadius + Math.random() * (outerRadius - innerRadius)
      
      // Add some randomness to create organic feel
      const radiusVariation = (Math.random() - 0.5) * 20
      const finalRadius = radius + radiusVariation
      
      const x = centerX + Math.cos(angle) * finalRadius
      const y = centerY + Math.sin(angle) * finalRadius
      
      dots.push({
        angle,
        radius: finalRadius,
        x,
        y,
        opacity: Math.random() * 0.8 + 0.2,
        size: Math.random() * 2 + 1,
        rotationSpeed: (Math.random() - 0.5) * 0.002
      })
    }

    let globalRotation = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)
      
      globalRotation += 0.003
      
      dots.forEach((dot, index) => {
        // Update dot position with rotation
        dot.angle += dot.rotationSpeed
        const rotatedAngle = dot.angle + globalRotation
        
        dot.x = centerX + Math.cos(rotatedAngle) * dot.radius
        dot.y = centerY + Math.sin(rotatedAngle) * dot.radius
        
        // Animate opacity
        dot.opacity = 0.3 + Math.sin((Date.now() * 0.001) + index * 0.01) * 0.5
        dot.opacity = Math.max(0.1, Math.min(0.9, dot.opacity))
        
        // Draw dot
        ctx.globalAlpha = dot.opacity
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2)
        ctx.fill()
      })
      
      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [])

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0, rotate: 0 }}
      animate={{ opacity: 1, rotate: 360 }}
      transition={{ 
        opacity: { duration: 2, delay: 0.5 },
        rotate: { duration: 20, repeat: Infinity, ease: "linear" }
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ filter: 'blur(0.2px)' }}
      />
    </motion.div>
  )
}