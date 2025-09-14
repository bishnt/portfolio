"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Instagram, MapPin } from "lucide-react"

function WaterRippleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ripplesRef = useRef<Array<{x: number, y: number, radius: number, opacity: number}>>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    const animate = () => {
      ctx.clearRect(0, 0, width, height)
      
      // Draw background gradient
      const gradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2)
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)')
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0.02)')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      // Draw ripples
      ripplesRef.current = ripplesRef.current.filter((ripple) => {
        ctx.beginPath()
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, 2 * Math.PI)
        ctx.strokeStyle = `rgba(255, 255, 255, ${ripple.opacity})`
        ctx.lineWidth = 2
        ctx.stroke()

        // Update ripple
        ripple.radius += 2
        ripple.opacity -= 0.02

        return ripple.opacity > 0
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ripplesRef.current.push({ x, y, radius: 0, opacity: 0.8 })
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <canvas
        ref={canvasRef}
        width={360}
        height={360}
        className="max-w-full max-h-full border border-white/20 rounded-lg cursor-pointer"
        onClick={handleClick}
      />
      
      {/* Instructions */}
      <div className="absolute top-4 left-4 text-white/60 font-mono text-sm">
        Click to create ripples
      </div>
      <div className="absolute bottom-4 right-4 text-white/60 font-mono text-sm">
        Water Effect
      </div>
    </div>
  )
}

function RippleText({ children }: { children: string }) {
  return (
    <motion.span className="inline-block cursor-pointer" whileHover="hover" initial="initial">
      {children.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={{
            initial: { y: 0 },
            hover: {
              y: [-5, -10, -5, 0],
              transition: {
                duration: 0.6,
                delay: index * 0.05,
                ease: "easeInOut",
              },
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

function RotatingText() {
  const roles = ["Video Editor", "Visual Designer", "Creative Director", "Digital Artist"]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % roles.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-8 overflow-hidden">
      <motion.div
        key={currentIndex}
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -30, opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="font-mono text-xl md:text-2xl text-white/80"
      >
        {"> " + roles[currentIndex]}
      </motion.div>
    </div>
  )
}

function LocationBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="flex items-center gap-2 text-white/60 font-mono text-sm"
    >
      <MapPin className="w-4 h-4" />
      <span>Kathmandu, Nepal</span>
    </motion.div>
  )
}

function SocialLinks() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/bishnt", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com/in/bishnt", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com/bishrant_", label: "Instagram" },
    {
      icon: ({ className }: { className?: string }) => (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      href: "https://x.com/snuggbun",
      label: "X",
    },
  ]

  return (
    <div className="flex gap-4">
      {socialLinks.map((social, index) => (
        <motion.a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="w-10 h-10 border border-white/20 flex items-center justify-center hover:border-white/40 hover:bg-white/5 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + index * 0.1 }}
        >
          <social.icon className="w-5 h-5" />
        </motion.a>
      ))}
    </div>
  )
}

export default function HeroCreatives() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-4 lg:px-8">
      <div className="absolute inset-0 bg-black" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center min-h-[70vh]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-4 lg:space-y-6"
          >
            <motion.h1
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-mono leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <RippleText>BISHRANT</RippleText>
              <br />
              <span className="text-white/60">
                <RippleText>GHIMIRE</RippleText>
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="py-1 lg:py-2"
            >
              <RotatingText />
            </motion.div>

            <div className="flex justify-center sm:justify-start">
              <LocationBadge />
            </div>
            
            <motion.p
              className="text-xs sm:text-sm lg:text-base text-white/70 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Crafting visual stories through video editing, graphic design, and digital art. 
              Passionate about bringing ideas to life through creative expression and visual communication.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-1 lg:pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                className="px-4 sm:px-5 lg:px-6 py-1.5 lg:py-2 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-mono text-xs tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "#projects")}
              >
                VIEW PROJECTS
              </motion.button>
              <motion.button
                className="px-4 sm:px-5 lg:px-6 py-1.5 lg:py-2 bg-white text-black hover:bg-white/90 transition-all duration-300 font-mono text-xs tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "#contact")}
              >
                CONTACT ME
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="pt-3 flex justify-center sm:justify-start"
            >
              <SocialLinks />
            </motion.div>
          </motion.div>

          {/* Water Ripple Effect */}
          <motion.div
            className="hidden lg:flex items-center justify-center h-[400px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <WaterRippleEffect />
          </motion.div>
        </div>
      </div>

      {/* Creative formulas */}
      <motion.div
        className="absolute top-20 right-4 lg:right-20 text-white/15 font-mono text-lg lg:text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        f(x) = creativity
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-4 lg:left-16 text-white/15 font-mono text-base lg:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        ∞ possibilities
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 lg:bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-5 lg:w-6 h-10 lg:h-12 border-2 border-white/40 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 lg:h-3 bg-white/40 rounded-full mt-2 lg:mt-3"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
