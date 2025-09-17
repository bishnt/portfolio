'use client'

import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface ScrollAnimationProps {
  children: ReactNode
  className?: string
  variants?: any
  delay?: number
}

export function ScrollReveal({ children, className = "", variants, delay = 0 }: ScrollAnimationProps) {
  const ref = useRef(null)
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxElement({ children, speed = 0.5, className = "" }: ParallaxProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, speed * 100])
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 })
  
  return (
    <motion.div
      ref={ref}
      style={{ y: smoothY }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface BlurRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function BlurReveal({ children, className = "", delay = 0 }: BlurRevealProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        filter: 'blur(20px)',
        y: 50
      }}
      whileInView={{ 
        opacity: 1, 
        filter: 'blur(0px)',
        y: 0
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 1,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" style={{ zIndex: -1 }}>
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 bg-white/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-40 right-20 w-1 h-1 bg-white/30 rounded-full"
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-1.5 h-1.5 bg-white/25 rounded-full"
        animate={{
          y: [0, -25, 0],
          opacity: [0.25, 0.5, 0.25],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
    </div>
  )
}

interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ children, className = "", strength = 0.3 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }
  
  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }
  
  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ 
        transition: 'transform 0.3s ease-out',
        pointerEvents: 'auto',
        position: 'relative',
        zIndex: 'auto'
      }}
    >
      {children}
    </div>
  )
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-[10000]"
      style={{ scaleX }}
    />
  )
}
