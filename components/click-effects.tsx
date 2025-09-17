'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, ReactNode } from 'react'

interface RippleEffectProps {
  children: ReactNode
  className?: string
  rippleColor?: string
}

export function RippleEffect({ children, className = "", rippleColor = "rgba(255,255,255,0.3)" }: RippleEffectProps) {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const createRipple = (event: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const newRipple = {
      id: Date.now(),
      x,
      y
    }

    setRipples(prev => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseDown={createRipple}
    >
      {children}
      
      <AnimatePresence>
        {ripples.map(ripple => (
          <motion.div
            key={ripple.id}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: rippleColor,
            }}
            initial={{
              width: 0,
              height: 0,
              x: 0,
              y: 0,
              opacity: 0.8
            }}
            animate={{
              width: 200,
              height: 200,
              x: -100,
              y: -100,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.6,
              ease: "easeOut"
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

interface ParticleClickProps {
  children: ReactNode
  className?: string
  particleCount?: number
}

export function ParticleClick({ children, className = "", particleCount = 8 }: ParticleClickProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const createParticles = (event: React.MouseEvent) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: Date.now() + i,
      x,
      y
    }))

    setParticles(prev => [...prev, ...newParticles])

    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)))
    }, 1000)
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      onMouseDown={createParticles}
    >
      {children}
      
      <AnimatePresence>
        {particles.map((particle, index) => {
          const angle = (index / particleCount) * Math.PI * 2
          const distance = 50 + Math.random() * 30
          
          return (
            <motion.div
              key={particle.id}
              className="absolute w-1 h-1 bg-white rounded-full pointer-events-none"
              style={{
                left: particle.x,
                top: particle.y,
              }}
              initial={{
                scale: 0,
                opacity: 1
              }}
              animate={{
                x: Math.cos(angle) * distance,
                y: Math.sin(angle) * distance,
                scale: [0, 1, 0],
                opacity: [1, 1, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.8,
                ease: "easeOut"
              }}
            />
          )
        })}
      </AnimatePresence>
    </div>
  )
}

interface ShakeClickProps {
  children: ReactNode
  className?: string
  intensity?: number
}

export function ShakeClick({ children, className = "", intensity = 5 }: ShakeClickProps) {
  const [isShaking, setIsShaking] = useState(false)

  const handleClick = () => {
    setIsShaking(true)
    setTimeout(() => setIsShaking(false), 300)
  }

  return (
    <motion.div
      className={className}
      onClick={handleClick}
      animate={isShaking ? {
        x: [0, -intensity, intensity, -intensity, intensity, 0],
        transition: { duration: 0.3 }
      } : {}}
    >
      {children}
    </motion.div>
  )
}

interface PulseClickProps {
  children: ReactNode
  className?: string
}

export function PulseClick({ children, className = "" }: PulseClickProps) {
  const [isPulsing, setIsPulsing] = useState(false)

  const handleClick = () => {
    setIsPulsing(true)
    setTimeout(() => setIsPulsing(false), 400)
  }

  return (
    <motion.div
      className={className}
      onClick={handleClick}
      animate={isPulsing ? {
        scale: [1, 1.1, 1],
        transition: { duration: 0.4 }
      } : {}}
    >
      {children}
    </motion.div>
  )
}

interface GlitchClickProps {
  children: ReactNode
  className?: string
}

export function GlitchClick({ children, className = "" }: GlitchClickProps) {
  const [isGlitching, setIsGlitching] = useState(false)

  const handleClick = () => {
    setIsGlitching(true)
    setTimeout(() => setIsGlitching(false), 500)
  }

  return (
    <motion.div
      className={className}
      onClick={handleClick}
      animate={isGlitching ? {
        x: [0, -2, 2, -1, 1, 0],
        filter: [
          "hue-rotate(0deg)",
          "hue-rotate(90deg)",
          "hue-rotate(180deg)",
          "hue-rotate(270deg)",
          "hue-rotate(0deg)"
        ],
        textShadow: [
          "0 0 0 transparent",
          "2px 0 0 #ff0000, -2px 0 0 #00ff00",
          "0 0 0 transparent",
          "1px 0 0 #0000ff, -1px 0 0 #ffff00",
          "0 0 0 transparent"
        ],
        transition: { duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }
      } : {}}
    >
      {children}
    </motion.div>
  )
}

interface FloatClickProps {
  children: ReactNode
  className?: string
}

export function FloatClick({ children, className = "" }: FloatClickProps) {
  const [isFloating, setIsFloating] = useState(false)

  const handleClick = () => {
    setIsFloating(true)
    setTimeout(() => setIsFloating(false), 800)
  }

  return (
    <motion.div
      className={className}
      onClick={handleClick}
      animate={isFloating ? {
        y: [0, -20, -10, -15, -5, 0],
        rotate: [0, -2, 2, -1, 1, 0],
        transition: { duration: 0.8, ease: "easeOut" }
      } : {}}
    >
      {children}
    </motion.div>
  )
}
