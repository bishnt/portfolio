"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Github, BookOpen } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

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
        slug: "portfolio-website"
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
        slug: "task-management-app"
      },
      {
        id: "3",
        title: "HTTP server in C",
        description: "A simple HTTP server built from scratch in C, supporting basic GET and POST requests, serves static files",
        skills: ["C", "HTTP", "Sockets"],
        image: "/project3.png",
        githubUrl: "https://github.com/bishnt/webserver_in_C",
        category: "Systems Programming",
        slug: "http-server-c"
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
        slug: "fault-detection-system"
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
        slug: "hult-prize-promotionals"
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
    <div className="relative w-full bg-black py-12 px-4">
      <div className="w-full max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
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
                <div className="bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 backdrop-blur-sm border border-white/20">
                  <div 
                    className="project-card relative w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl group cursor-pointer"
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
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 60vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/5 rounded-full blur-xl" />
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/3 rounded-full blur-2xl" />
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div 
              className="space-y-6 order-1 lg:order-2 text-center lg:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Category Badge */}
              <motion.span 
                className="inline-flex items-center px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-mono text-white/80 uppercase tracking-wider backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {currentProject.category}
              </motion.span>

              {/* Title */}
              <motion.h3 
                className="text-3xl lg:text-4xl xl:text-5xl font-bold font-mono leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {currentProject.title}
              </motion.h3>

              {/* Description */}
              <motion.p 
                className="text-base lg:text-lg text-white/80 leading-relaxed max-w-xl mx-auto lg:mx-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {currentProject.description}
              </motion.p>

              {/* Skills */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono text-white/60 uppercase tracking-wider">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {currentProject.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg font-mono text-sm backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
                {currentProject.slug && (
                  <Link
                    href={`/projects/${currentProject.slug}`}
                    className="flex items-center gap-3 px-6 py-3 bg-white text-black rounded-xl hover:bg-white/90 hover:scale-105 transition-all duration-300 text-sm font-mono group shadow-lg"
                  >
                    <BookOpen className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    Learn More
                  </Link>
                )}
                {currentProject.githubUrl && (
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-lg hover:border-white/60 hover:bg-white/10 transition-all duration-300 text-sm font-mono backdrop-blur-sm group"
                  >
                    <Github className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                    Code
                  </a>
                )}
                {currentProject.liveUrl && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 border border-white/30 rounded-lg hover:border-white/60 hover:bg-white/10 transition-all duration-300 text-sm font-mono backdrop-blur-sm group"
                  >
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                    
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 border border-white/20 rounded-full flex items-center justify-center hover:bg-black/80 hover:border-white/40 hover:scale-110 transition-all duration-300 z-10 backdrop-blur-sm"
          aria-label="Previous project"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/60 border border-white/20 rounded-full flex items-center justify-center hover:bg-black/80 hover:border-white/40 hover:scale-110 transition-all duration-300 z-10 backdrop-blur-sm"
          aria-label="Next project"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {currentProjects.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                index === currentIndex ? "bg-white shadow-lg" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
