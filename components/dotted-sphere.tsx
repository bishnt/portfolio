'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function DottedSphere() {
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

    // Sphere configuration
    const centerX = canvas.width / (2 * window.devicePixelRatio)
    const centerY = canvas.height / (2 * window.devicePixelRatio)
    const radius = Math.min(centerX, centerY) * 0.6
    const dotCount = 800
    const dots: Array<{
      x: number
      y: number
      z: number
      originalX: number
      originalY: number
      originalZ: number
      opacity: number
    }> = []

    // Generate dots on sphere surface
    for (let i = 0; i < dotCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      dots.push({
        x: centerX + x,
        y: centerY + y,
        z,
        originalX: centerX + x,
        originalY: centerY + y,
        originalZ: z,
        opacity: Math.random() * 0.8 + 0.2
      })
    }

    let rotationY = 0
    let rotationX = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio)
      
      rotationY += 0.005
      rotationX += 0.002
      
      dots.forEach((dot, index) => {
        // Apply rotation
        const cosY = Math.cos(rotationY)
        const sinY = Math.sin(rotationY)
        const cosX = Math.cos(rotationX)
        const sinX = Math.sin(rotationX)
        
        // Rotate around Y axis
        const x1 = (dot.originalX - centerX) * cosY - dot.originalZ * sinY
        const z1 = (dot.originalX - centerX) * sinY + dot.originalZ * cosY
        
        // Rotate around X axis
        const y1 = (dot.originalY - centerY) * cosX - z1 * sinX
        const z2 = (dot.originalY - centerY) * sinX + z1 * cosX
        
        dot.x = centerX + x1
        dot.y = centerY + y1
        dot.z = z2
        
        // Calculate opacity based on z position (depth)
        const depthOpacity = (z2 + radius) / (2 * radius)
        dot.opacity = Math.max(0.1, Math.min(0.8, depthOpacity * 0.8))
        
        // Calculate dot size based on depth
        const dotSize = Math.max(0.5, 2 - (z2 + radius) / (2 * radius))
        
        ctx.globalAlpha = dot.opacity
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2)
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-lg max-h-lg"
        style={{ filter: 'blur(0.5px)' }}
      />
    </motion.div>
  )
}