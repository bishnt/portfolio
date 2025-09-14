"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, ExternalLink, Github } from "lucide-react"
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
}

interface ProjectSlideshowProps {
  pageType: "cs" | "ee" | "creatives"
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
        image: "/black.png",
        githubUrl: "https://github.com/bishnt",
        liveUrl: "https://agriha-fe.vercel.app",
        category: "Web Development"
      },
      {
        id: "2",
        title: "Gyanet",
        description: "A peer to peer learning platform for students, where they can share knowledge and resources and earn pocket money",
        skills: ["React", "Node.js", "Socket.io", "MongoDB"],
        image: "/dark-knight.jpg",
        githubUrl: "https://github.com/bishnt",
        liveUrl: "https://gyanet.vercel.app",
        category: "Full Stack"
      },
      {
        id: "3",
        title: "HTTP server in C",
        description: "A simple HTTP server built from scratch in C, supporting basic GET and POST requests, serves static files",
        skills: ["C", "HTTP", "Sockets"],
        image: "/wolf.jpg",
        githubUrl: "https://github.com/bishnt/webserver_in_C",
        category: "Systems Programming"
      }
    ],
    ee: [
      {
        id: "1",
        title: "Fault Detection System",
        description: "A simple L2GS system for detecting faults in electrical systems using Arduino and sensors",
        skills: ["Arduino", "proteus", "sensors"],
        image: "/socialnetwork.jpg",
        liveUrl: "https://www.linkedin.com/posts/bishnt_electrified-to-announce-that-i-along-with-activity-7292187677238448131-OlGB?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFKPxuUBGXOij_vRx0-JJDe_KTug3Ig5y0g",
        category: "Embedded Systems"
      },
      {
        id: "2",
        title: "Solar Panel Efficiency Monitor",
        description: "Real-time monitoring system for solar panel performance",
        skills: ["Raspberry Pi", "Python"],
        image: "/highway.jpg",
        githubUrl: "https://github.com/bishnt",
        category: "IoT"
      }
    ],
    creatives: [
      {
        id: "1",
        title: "Promotionals for Hult Prize at IOE",
        description: "Assisted on making promotional videos for the Hult Prize at IOE, showcasing the event and its impact",
        skills: ["Premiere Pro"],
        image: "/sweet.jpg",
        liveUrl: "https://www.instagram.com/p/DGCiAZQolJf/",
        category: "Video Production"
      },
      {
        id: "2",
        title: "Multiple Freelance Projects",
        description: "Worked on various freelance video editing projects, including social media content, documentaries, and promotional videos",
        skills: ["Premiere Pro", "After Effects", "Photoshop"],
        image: "/oppenheimer.jpg",
        liveUrl: "https://drive.google.com/drive/u/2/folders/11TkRiysg6Tqhd41-JNV7g03V8gEkWV9R",
        category: "Freelance Work"
      },
      {
        id: "3",
        title: "Documentary Project",
        description: "Short documentary on career options in Nepal",
        skills: ["Premiere Pro", "After Effects", "Audition"],
        image: "/halka.jpg",
        category: "Documentary"
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
    <div className="relative bg-black border border-white/20 rounded-lg overflow-hidden hover:border-white/40 transition-all duration-300">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row min-h-[400px]"
        >
          {/* Image Section */}
          <div className="lg:w-1/2 relative overflow-hidden">
            <Image
              src={currentProject.image}
              alt={currentProject.title}
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                e.currentTarget.src = "https://placehold.co/600x400/000000/FFFFFF?text=Project"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
          </div>

          {/* Details Section */}
          <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
            <div className="mb-4">
              <span className="text-xs font-mono text-white/60 uppercase tracking-wider">
                {currentProject.category}
              </span>
              <h3 className="text-2xl lg:text-3xl font-bold mt-2 mb-4">
                {currentProject.title}
              </h3>
              <p className="text-white/80 leading-relaxed mb-6">
                {currentProject.description}
              </p>
            </div>

            {/* Skills */}
            <div className="mb-6">
              <h4 className="text-sm font-mono text-white/60 mb-3 uppercase tracking-wider">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-2">
                {currentProject.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-xs bg-white/10 border border-white/20 rounded-full font-mono"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-4">
              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:border-white/40 hover:bg-white/5 transition-all duration-300 text-sm font-mono"
                >
                  <Github className="w-4 h-4" />
                  Code
                </a>
              )}
              {currentProject.liveUrl && (
                <a
                  href={currentProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg hover:bg-white/90 transition-all duration-300 text-sm font-mono"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 border border-white/20 rounded-full flex items-center justify-center hover:bg-black/70 hover:border-white/40 transition-all duration-300 z-10"
        aria-label="Previous project"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 border border-white/20 rounded-full flex items-center justify-center hover:bg-black/70 hover:border-white/40 transition-all duration-300 z-10"
        aria-label="Next project"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {currentProjects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "bg-white" : "bg-white/30"
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
