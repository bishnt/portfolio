"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

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
    <section id="projects" className="py-16 sm:py-20 lg:py-24 bg-gray-900" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 font-mono">
            PROJECTS<span className="text-white/60">.SHOWCASE</span>
          </h2>
        </motion.div>

        {/* Tab Navigation - Badge Style */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center mb-8 sm:mb-12"
        >
          <div className="flex flex-wrap gap-3 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-mono text-xs sm:text-sm transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-white text-black shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                {/* No icon for this tab */}
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {projects[activeTab as keyof typeof projects].map((project, index) => (
            <div
              key={project.title}
              className={`border border-white/20 p-4 sm:p-6 hover:border-white/40 transition-all duration-300 group ${
                project.href ? "cursor-pointer" : ""
              }`}
              onClick={() => handleProjectClick(project.href)}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                <h3 className="text-lg sm:text-xl font-bold font-mono group-hover:text-white/80 transition-colors">
                  {project.title}
                  {project.href && (
                    <span className="ml-2 text-sm opacity-60">↗</span>
                  )}
                </h3>
                <span
                  className={`text-xs px-2 py-1 rounded font-mono self-start ${
                    project.status === "Completed"
                      ? "bg-green-500/20 text-green-400"
                      : project.status === "In Progress"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>

              <p className="text-white/70 mb-4 text-sm sm:text-base leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="text-xs px-2 py-1 border border-white/20 text-white/60 font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}