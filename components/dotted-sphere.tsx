'use client'

import { useEffect, useRef } from 'react'

// Responsive dotted sphere with gentle rotation (no interactivity)
export default function DottedSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0

    // Sphere data
    let centerX = 0
    let centerY = 0
    let radius = 0
    const dotCount = 2200 // increased density
    type Dot = { ox: number; oy: number; oz: number }
    let dots: Dot[] = []

    // Resize and regenerate
    const regenerate = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      centerX = rect.width / 2
      centerY = rect.height / 2
      radius = Math.min(centerX, centerY) * 0.95 * 0.9 // 10% smaller

      // Fibonacci sphere distribution for uniformity
      dots = []
      const goldenAngle = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < dotCount; i++) {
        const t = i / dotCount
        const inclination = Math.acos(1 - 2 * t)
        const azimuth = goldenAngle * i
        const x = Math.sin(inclination) * Math.cos(azimuth)
        const y = Math.sin(inclination) * Math.sin(azimuth)
        const z = Math.cos(inclination)
        dots.push({ ox: x, oy: y, oz: z })
      }
    }

    regenerate()
    const onResize = () => regenerate()
    window.addEventListener('resize', onResize)

    // Animation state
    let rotX = 0
    let rotY = 0

    const render = () => {
      const rect = canvas.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      // Slow idle rotation
      rotY += 0.006
      rotX += 0.003
      

      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]
        // Base position on unit sphere
        let x = d.ox
        let y = d.oy
        let z = d.oz

        // Rotate around X and Y
        const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
        const cosX = Math.cos(rotX), sinX = Math.sin(rotX)
        // Y rotation
        let rx = x * cosY - z * sinY
        let rz = x * sinY + z * cosY
        // X rotation
        let ry = y * cosX - rz * sinX
        rz = y * sinX + rz * cosX

        // Project to screen center
        const finalX = centerX + rx * radius
        const finalY = centerY + ry * radius

        // Depth-based alpha and size
        const depth = (rz + 1) * 0.5
        const alpha = 0.2 + depth * 0.7
        const size = 0.7 + depth * 1.2 // smaller dots overall

        ctx.globalAlpha = alpha
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(finalX, finalY, size, 0, Math.PI * 2)
        ctx.fill()
      }
      
      animationId = requestAnimationFrame(render)
    }

    animationId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <div className="absolute inset-0">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}