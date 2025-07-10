"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Github, Linkedin, Instagram, MapPin } from "lucide-react"

function AnimatedSineWave() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      <svg width="100%" height="100%" viewBox="0 0 500 400" className="max-w-2xl">
        <defs>
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
            <stop offset="50%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="white" stopOpacity="0.1" />
            <stop offset="50%" stopColor="white" stopOpacity="0.6" />
            <stop offset="100%" stopColor="white" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5" opacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Axes */}
        <line x1="50" y1="200" x2="450" y2="200" stroke="white" strokeWidth="1" opacity="0.3" />
        <line x1="250" y1="50" x2="250" y2="350" stroke="white" strokeWidth="1" opacity="0.3" />

        {/* Main sine wave */}
        <path d="M50,200 Q150,100 250,200 T450,200" stroke="url(#waveGradient)" strokeWidth="4" fill="none">
          <animate
            attributeName="d"
            values="M50,200 Q150,100 250,200 T450,200;M50,200 Q150,300 250,200 T450,200;M50,200 Q150,100 250,200 T450,200"
            dur="4s"
            repeatCount="indefinite"
          />
        </path>

        {/* Secondary wave */}
        <path d="M50,200 Q150,150 250,200 T450,200" stroke="url(#waveGradient2)" strokeWidth="2" fill="none">
          <animate
            attributeName="d"
            values="M50,200 Q150,150 250,200 T450,200;M50,200 Q150,250 250,200 T450,200;M50,200 Q150,150 250,200 T450,200"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>

        {/* Mathematical annotations */}
        <text x="460" y="205" fill="white" fontSize="12" fontFamily="monospace" opacity="0.6">
          x
        </text>
        <text x="245" y="45" fill="white" fontSize="12" fontFamily="monospace" opacity="0.6">
          y
        </text>

        {/* Amplitude markers */}
        <text x="25" y="105" fill="white" fontSize="10" fontFamily="monospace" opacity="0.5">
          A
        </text>
        <text x="25" y="305" fill="white" fontSize="10" fontFamily="monospace" opacity="0.5">
          -A
        </text>

        {/* Period markers */}
        <text x="145" y="220" fill="white" fontSize="10" fontFamily="monospace" opacity="0.5">
         - π/2
        </text>
        <text x="245" y="220" fill="white" fontSize="10" fontFamily="monospace" opacity="0.5">
          0
        </text>
        <text x="345" y="220" fill="white" fontSize="10" fontFamily="monospace" opacity="0.5">
          π/2
        </text>
        <text x="440" y="220" fill="white" fontSize="10" fontFamily="monospace" opacity="0.5">
          π
        </text>

        {/* Origin */}
        <circle cx="50" cy="200" r="2" fill="white" opacity="0.6" />
        <text x="30" y="220" fill="white" fontSize="10" fontFamily="monospace" opacity="0.5">
          -π
        </text>

        {/* Frequency annotation */}
        <text x="380" y="120" fill="white" fontSize="11" fontFamily="monospace" opacity="0.7">
          f = 1/T
        </text>
        <text x="380" y="135" fill="white" fontSize="11" fontFamily="monospace" opacity="0.7">
          ω = 2πf
        </text>
      </svg>

      {/* Floating mathematical elements */}
      <motion.div
        className="absolute top-4 right-4 text-white/40 font-mono text-sm"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
      >
        sin(ωt)
      </motion.div>

      <motion.div
        className="absolute bottom-4 left-4 text-white/40 font-mono text-sm"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
      >
        T = 2π/ω
      </motion.div>
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
  const roles = ["Tech Enthusiast", "Electrical Engineering Undergrad", "Builder", "Problem Solver"]

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

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left space-y-6 lg:space-y-8"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold font-mono leading-tight"
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
              className="py-2 lg:py-4"
            >
              <RotatingText />
            </motion.div>

            <LocationBadge />

            <motion.p
              className="text-base sm:text-lg lg:text-xl text-white/70 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              Currently pursuing Electrical Engineering. A tech-savvy individual passionate about
              solving problems through innovative solutions.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 lg:gap-6 pt-2 lg:pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.button
                className="px-6 sm:px-8 lg:px-10 py-3 lg:py-4 border-2 border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-mono text-xs sm:text-sm tracking-wider"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (window.location.href = "#projects")}
              >
                VIEW PROJECTS
              </motion.button>
<motion.button
  className="px-6 sm:px-8 lg:px-10 py-3 lg:py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 font-mono text-xs sm:text-sm tracking-wider"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onClick={() => (window.location.href = "#contact")}
>
  CONTACT ME
</motion.button>

            </motion.div>

            

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="pt-4"
            >
              <SocialLinks />
            </motion.div>


            
          </motion.div>

          {/* Enhanced Sine Wave - More prominent */}
          <motion.div
            className="hidden lg:flex items-center justify-center h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <AnimatedSineWave />
          </motion.div>
        </div>
      </div>

      {/* Mathematical formulas - repositioned */}
      <motion.div
        className="absolute top-20 right-4 lg:right-20 text-white/15 font-mono text-lg lg:text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        y = A sin(ωt + φ)
      </motion.div>
      <motion.div
        className="absolute bottom-32 left-4 lg:left-16 text-white/15 font-mono text-base lg:text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        ∇²V = 0
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
