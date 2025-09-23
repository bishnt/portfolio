"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Github, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import PageLoader, { usePageLoader } from "./page-loader"

interface Project {
  id: string
  title: string
  description: string
  skills: string[]
  image: string
  githubUrl?: string
  liveUrl?: string
  category: string
  slug?: string
}

interface ProjectSlideshowProps {
  pageType: "cs" | "ee" | "beyond-engineering"
}

export default function ProjectSlideshow({ pageType }: ProjectSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const { isLoading, startLoading, stopLoading } = usePageLoader()

  // Actual portfolio projects from existing data
  const projects: Record<string, Project[]> = {
    cs: [
      {
        id: "1",
        title: "Agriha",
        description: "Leading the Frontend for a platform made for solving hostels, rentals and real-estate problems in Nepal",
        skills: ["Next.js", "TypeScript", "React", "Tailwind"],
        image: "/project1.png",
        githubUrl: "https://github.com/bishnt",
        liveUrl: "https://agriha-fe.vercel.app",
        category: "Web Development",
        slug: "agriha"
      },
      {
        id: "2",
        title: "Gyanet",
        description: "A peer to peer learning platform for students, where they can share knowledge and resources and earn pocket money",
        skills: ["React", "Node.js", "Socket.io", "MongoDB"],
        image: "/project2.png",
        githubUrl: "https://github.com/bishnt",
        liveUrl: "https://gyanet.vercel.app",
        category: "Full Stack",
        slug: "gyanet"
      },
      {
        id: "3",
        title: "HTTP server in C",
        description: "A simple HTTP server built from scratch in C, supporting basic GET and POST requests, serves static files",
        skills: ["C", "HTTP", "Sockets"],
        image: "/project3.png",
        githubUrl: "https://github.com/bishnt/webserver_in_C",
        category: "Systems Programming",
        slug: "http"
      }
    ],
    ee: [
      {
        id: "1",
        title: "Fault Detection System",
        description: "A simple L2GS system for detecting faults in electrical systems using Arduino and sensors",
        skills: ["Arduino", "proteus", "sensors"],
        image: "/proj4.jpg",
        liveUrl: "https://www.linkedin.com/posts/bishnt_electrified-to-announce-that-i-along-with-activity-7292187677238448131-OlGB?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFKPxuUBGXOij_vRx0-JJDe_KTug3Ig5y0g",
        category: "Embedded Systems",
        slug: "fault"
      },
      {
        id: "2",
        title: "Solar Panel Efficiency Monitor",
        description: "Real-time monitoring system for solar panel performance",
        skills: ["Raspberry Pi", "Python"],
        image: "/solar.png",
        githubUrl: "https://github.com/bishnt",
        category: "IoT",
        slug: "solar-panel-monitor"
      }
    ],
    "beyond-engineering": [
      {
        id: "1",
        title: "Promotionals for Hult Prize at IOE",
        description: "Assisted on making promotional videos for the Hult Prize at IOE, showcasing the event and its impact",
        skills: ["Premiere Pro"],
        image: "/hult.jpg",
        liveUrl: "https://www.instagram.com/p/DGCiAZQolJf/",
        category: "Video Production",
        slug: "hult"
      },
      {
        id: "2",
        title: "Multiple Freelance Projects",
        description: "Worked on various freelance video editing projects, including social media content, documentaries, and promotional videos",
        skills: ["Premiere Pro", "After Effects", "Photoshop"],
        image: "/freelance.png",
        liveUrl: "https://drive.google.com/drive/u/2/folders/11TkRiysg6Tqhd41-JNV7g03V8gEkWV9R",
        category: "Freelance Work",
        slug: "freelance-video-projects"
      }
    ]
  }

  const currentProjects = projects[pageType] || []

  // Auto-advance slideshow every 20 seconds
  useEffect(() => {
    if (currentProjects.length === 0) return
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % currentProjects.length)
    }, 20000)

    return () => clearInterval(interval)
  }, [currentProjects.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % currentProjects.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + currentProjects.length) % currentProjects.length)
  }

  if (currentProjects.length === 0) return null

  const currentProject = currentProjects[currentIndex]

  return (
    <>
      <PageLoader isLoading={isLoading} loadingText="Loading project details..." />
      <div className="relative w-full bg-black py-8 sm:py-10 lg:py-12 px-3 sm:px-4">
      <div className="w-full max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-20 items-center"
          >
            {/* Image Section */}
            <motion.div 
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full max-w-2xl mx-auto">
                {/* Curved container with padding */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-sm border border-white/20">
                  <div 
                    className="project-card relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl group cursor-pointer touch-manipulation"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      const url = currentProject.liveUrl || currentProject.githubUrl
                      if (url) {
                        window.open(url, '_blank', 'noopener,noreferrer')
                      }
                    }}
                    data-clickable="true"
                    style={{ pointerEvents: 'auto' }}
                  >
                    <Image
                      src={currentProject.image}
                      alt={currentProject.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-16 sm:w-24 h-16 sm:h-24 bg-white/5 rounded-full blur-xl" />
                <div className="absolute -bottom-4 sm:-bottom-6 -left-4 sm:-left-6 w-20 sm:w-32 h-20 sm:h-32 bg-white/3 rounded-full blur-2xl" />
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div 
              className="space-y-4 sm:space-y-6 order-1 lg:order-2 text-center lg:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Category Badge */}
              <motion.span 
                className="inline-flex items-center px-2 sm:px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-mono text-white/80 uppercase tracking-wider backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {currentProject.category}
              </motion.span>

              {/* Title */}
              <motion.h3 
                className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold font-mono leading-tight px-2 sm:px-0"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {currentProject.title}
              </motion.h3>

              {/* Description */}
              <motion.p 
                className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0 px-2 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {currentProject.description}
              </motion.p>

              {/* Skills */}
              <div className="space-y-2 sm:space-y-3">
                <h4 className="text-xs font-mono text-white/60 uppercase tracking-wider">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center lg:justify-start">
                  {currentProject.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 sm:px-3 py-1 bg-white/10 border border-white/20 rounded-lg font-mono text-xs sm:text-sm backdrop-blur-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start pt-1 sm:pt-2">
                {currentProject.slug && (
                  <Link
                    href={`/projects/${currentProject.slug}`}
                    className="flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 bg-white text-black rounded-xl text-xs sm:text-sm font-mono shadow-lg touch-manipulation"
                    onClick={() => {
                      startLoading()
                      // Track navigation with current section context
                      if (typeof window !== 'undefined') {
                        const { navigationHistory } = require('../utils/navigation-history')
                        navigationHistory.pushWithCurrentSection(`/projects/${currentProject.slug}`)
                      }
                      // Stop loading after a short delay to allow for page transition
                      setTimeout(() => stopLoading(), 500)
                    }}
                  >
                    <BookOpen className="w-4 h-4 sm:w-5 sm:h-5" />
                    Learn More
                  </Link>
                )}
                {currentProject.githubUrl && (
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border border-white/30 rounded-lg text-xs sm:text-sm font-mono backdrop-blur-sm touch-manipulation"
                  >
                    <Github className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Code
                  </a>
                )}
                {currentProject.liveUrl && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 border border-white/30 rounded-lg text-xs sm:text-sm font-mono backdrop-blur-sm touch-manipulation"
                  >
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    Live
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows - No animations, completely static */}
        <button
          onClick={prevSlide}
          className="absolute left-1 sm:left-2 lg:left-4 xl:left-8 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-black/60 border border-white/20 rounded-full flex items-center justify-center z-10 backdrop-blur-sm"
          style={{
            transform: 'translateY(-50%)',
            transition: 'none',
            animation: 'none'
          }}
          aria-label="Previous project"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" style={{ transition: 'none' }} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-1 sm:right-2 lg:right-4 xl:right-8 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-black/60 border border-white/20 rounded-full flex items-center justify-center z-10 backdrop-blur-sm"
          style={{
            transform: 'translateY(-50%)',
            transition: 'none',
            animation: 'none'
          }}
          aria-label="Next project"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" style={{ transition: 'none' }} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex gap-0.5 sm:gap-1 lg:gap-1.5">
          {currentProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
              style={{
                width: '4px',
                height: '4px',
                minWidth: '4px',
                minHeight: '4px',
                transition: 'none',
                transform: 'none'
              }}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
      </div>
    </>
  )
}
