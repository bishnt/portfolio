"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ScrollReveal, BlurReveal, Magnetic } from "./scroll-animations"
import { fadeInUp, staggerContainer, staggerItem, liquidClick, breatheHover } from "@/lib/animations"
import { RippleEffect, ShakeClick, FloatClick } from "./click-effects"

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeTab, setActiveTab] = useState("cs")

  const tabs = [
    { id: "cs", label: "Computer Science"},
    { id: "ee", label: "Electrical Engineering" },
    { id: "video", label: "Video Editing"},
  ]

  const projects = {
    cs: [
      {
        title: "Agriha",
        description: "Leading the Frontend for a platform made for solving hostels, rentals and real-estate problems in Nepal",
        tech: ["Next.js", "TypeScript", "React", "Tailwind"],
        status: "In Progress",
        href: "https://agriha-fe.vercel.app",
      },
      {
        title: "Gyanet",
        description: "A peer to peer learning platform for students, where they can share knowledge and resources and earn pocket money",
        tech: ["React", "Node.js", "Socket.io", "MongoDB"],
        status: "In Progress",
        href: "https://gyanet.vercel.app"
      },
      {
        title: "HTTP server in C",
        description: "A simple HTTP server built from scratch in C, supporting basic GET and POST requests, serves static files",
        tech: ["C", "HTTP", "Sockets"],
        status: "Completed",
        href: "https://github.com/bishnt/webserver_in_C",
      },
    ],
    ee: [
      {
        title: "Fault Detection System",
        description: "A simple L2GS system for detecting faults in electrical systems using Arduino and sensors",
        tech: ["Arduino", "proteus", "sensors"],
        status: "Completed",
        href: "https://www.linkedin.com/posts/bishnt_electrified-to-announce-that-i-along-with-activity-7292187677238448131-OlGB?utm_source=share&utm_medium=member_desktop&rcm=ACoAAFKPxuUBGXOij_vRx0-JJDe_KTug3Ig5y0g",
      },

      {
        title: "Solar Panel Efficiency Monitor",
        description: "Real-time monitoring system for solar panel performance",
        tech: ["Raspberry Pi", "Python"],
        status: "Planning",
      },
    ],
    video: [
      {
        title: "Promotionals for Hult Prize at IOE",
        description: "Assisted on making promotional videos for the Hult Prize at IOE, showcasing the event and its impact",
        tech: ["Premiere Pro",],
        status: "Completed",
        href: "https://www.instagram.com/p/DGCiAZQolJf/",
      },
      {
        title: "Multiple Freelance Projects",
        description: "Worked on various freelance video editing projects, including social media content, documentaries, and promotional videos",
        tech: ["Premiere Pro", "After Effects", "Photoshop"],
        status: "Completed",
        href: "https://drive.google.com/drive/u/2/folders/11TkRiysg6Tqhd41-JNV7g03V8gEkWV9R",
      },
      {
        title: "Documentary Project",
        description: "Short documentary on career options in Nepal",
        tech: ["Premiere Pro", "After Effects", "Audition"],
        status: "in Progress",
      },
    ],
  }

  const handleProjectClick = (href: string | undefined) => {
    if (href) {
      window.open(href, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BlurReveal className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 font-mono"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            PROJECTS<span className="text-white/60">.SHOWCASE</span>
          </motion.h2>
        </BlurReveal>

        {/* Tab Navigation - Badge Style */}
        <ScrollReveal variants={fadeInUp} delay={0.2} className="flex justify-center mb-8 sm:mb-12">
          <motion.div 
            className="flex flex-wrap gap-3 justify-center"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {tabs.map((tab) => (
              <Magnetic key={tab.id} strength={0.2}>
                <RippleEffect>
                  <motion.button
                    variants={staggerItem}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-mono text-xs sm:text-sm ${
                      activeTab === tab.id
                        ? "bg-white text-black shadow-lg"
                        : "bg-white/10 text-white border border-white/20"
                    }`}
                    whileTap="clicked"
                  >
                    <span className="hidden sm:inline">{tab.label}</span>
                    <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                  </motion.button>
                </RippleEffect>
              </Magnetic>
            ))}
          </motion.div>
        </ScrollReveal>

        {/* Projects Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects[activeTab as keyof typeof projects].map((project, index) => (
            <FloatClick key={project.title}>
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className={`border border-white/20 p-4 sm:p-6 hover:border-white/40 transition-all duration-300 group ${
                  project.href ? "cursor-pointer" : ""
                }`}
                onClick={() => handleProjectClick(project.href)}
                variants={breatheHover}
                whileHover="hover"
                whileTap={{ 
                  scale: 0.98,
                  filter: "blur(2px)",
                  transition: { duration: 0.1 }
                }}
              >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                <motion.h3 
                  className="text-lg sm:text-xl font-bold font-mono group-hover:text-white/80 transition-colors"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {project.title}
                  {project.href && (
                    <motion.span 
                      className="ml-2 text-sm opacity-60"
                      whileHover={{ rotate: 45, scale: 1.2 }}
                      transition={{ duration: 0.2 }}
                    >
                      ↗
                    </motion.span>
                  )}
                </motion.h3>
                <span
                  className={`text-xs px-2 py-1 rounded font-mono self-start ${
                    project.status === "Completed"
                      ? "bg-white/20 text-white"
                      : project.status === "In Progress"
                        ? "bg-white/10 text-white/80"
                        : "bg-white/5 text-white/60"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-white/70 mb-4 text-sm sm:text-base leading-relaxed group-hover:text-white/90 transition-colors">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <motion.span 
                    key={tech} 
                    className="text-xs px-2 py-1 border border-white/20 text-white/60 font-mono hover:border-white/40 hover:text-white/80 transition-colors cursor-default"
                    whileHover={{ scale: 1.05, y: -1 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
              </motion.div>
            </FloatClick>
          ))}
        </motion.div>
      </div>
    </section>
  )
}