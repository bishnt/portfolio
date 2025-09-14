"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Instagram, MapPin } from "lucide-react"

function MandelbrotFractal() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [zoom, setZoom] = useState(1)
  const [centerX, setCenterX] = useState(-0.5)
  const [centerY, setCenterY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isZooming, setIsZooming] = useState(false)
  const animationRef = useRef<number>()
  const lastMousePos = useRef({ x: 0, y: 0 })
  const targetZoom = useRef(1)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    const drawMandelbrot = () => {
      const imageData = ctx.createImageData(width, height)
      const data = imageData.data

      const maxIterations = 50
      const zoomFactor = zoom

      for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
          const zx = (x - width / 2) / (0.5 * zoomFactor * width) + centerX
          const zy = (y - height / 2) / (0.5 * zoomFactor * height) + centerY

          let zx0 = zx
          let zy0 = zy
          let iteration = 0

          while (zx0 * zx0 + zy0 * zy0 < 4 && iteration < maxIterations) {
            const xtemp = zx0 * zx0 - zy0 * zy0 + zx
            zy0 = 2 * zx0 * zy0 + zy
            zx0 = xtemp
            iteration++
          }

          const index = (y * width + x) * 4
          const intensity = iteration / maxIterations

          if (iteration === maxIterations) {
            data[index] = 0     // R
            data[index + 1] = 0 // G
            data[index + 2] = 0 // B
            data[index + 3] = 255 // A
          } else {
            const color = Math.floor(intensity * 255)
            data[index] = color     // R
            data[index + 1] = color // G
            data[index + 2] = color // B
            data[index + 3] = 255   // A
          }
        }
      }

      ctx.putImageData(imageData, 0, 0)
    }

    const animate = () => {
      if (isHovering && isZooming) {
        setZoom(prev => {
          const newZoom = prev * 1.01
          if (newZoom >= targetZoom.current) {
            setIsZooming(false)
            return targetZoom.current
          }
          return newZoom
        })
        drawMandelbrot()
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    drawMandelbrot()
    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [zoom, centerX, centerY, isHovering, isZooming])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isHovering) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Only update if mouse moved significantly
    if (Math.abs(x - lastMousePos.current.x) > 5 || Math.abs(y - lastMousePos.current.y) > 5) {
      const newCenterX = (x - canvas.width / 2) / (0.5 * zoom * canvas.width) + centerX
      const newCenterY = (y - canvas.height / 2) / (0.5 * zoom * canvas.height) + centerY

      setCenterX(newCenterX)
      setCenterY(newCenterY)
      lastMousePos.current = { x, y }
    }
  }

  const handleMouseEnter = () => {
    setIsHovering(true)
    setIsZooming(true)
    targetZoom.current = 50 // Zoom to a specific branch
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    setIsZooming(false)
    // Don't reset zoom - pause where it is
  }

  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <canvas
        ref={canvasRef}
        width={480}
        height={480}
        className="max-w-full max-h-full border border-white/20 rounded-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      />
      
      {/* Mathematical formula overlay */}
      <div className="absolute top-3 left-3 text-white/60 font-mono text-xs">
        Z = Z² + C
      </div>
      <div className="absolute bottom-3 right-3 text-white/60 font-mono text-xs">
        Mandelbrot Set
      </div>
      <div className="absolute top-3 right-3 text-white/60 font-mono text-xs">
        Hover to zoom
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
  const roles = ["Software Developer", "Algorithm Designer", "Problem Solver", "Tech Innovator"]
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

export default function HeroCS() {
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
              Exploring the intersection of algorithms, data structures, and software engineering. 
              Passionate about building scalable solutions and solving complex computational problems.
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

          {/* Mandelbrot Fractal */}
          <motion.div
            className="hidden lg:flex items-center justify-center h-[400px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <MandelbrotFractal />
          </motion.div>
        </div>
      </div>

      {/* Mathematical formulas */}
      <motion.div
        className="absolute top-20 right-4 lg:right-8 text-white/15 font-mono text-base lg:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        f(z) = z² + c
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-4 lg:left-8 text-white/15 font-mono text-sm lg:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        O(n log n)
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-4 lg:w-5 h-8 lg:h-10 border-2 border-white/40 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-2 lg:h-3 bg-white/40 rounded-full mt-1 lg:mt-2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  )
}
