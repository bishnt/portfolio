"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Skill {
  name: string
  logo: string
}

interface AboutFilteredProps {
  pageType: 'cs' | 'ee' | 'beyond-engineering'
}

export default function AboutFiltered({ pageType }: AboutFilteredProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeTab, setActiveTab] = useState(pageType === 'beyond-engineering' ? 'creative' : pageType)
  const [currentSkillPage, setCurrentSkillPage] = useState(0)

  // Get current skills array based on active tab
  const getCurrentSkills = (): Skill[][] => {
    const skillsArray = skills[activeTab as keyof typeof skills]
    return skillsArray as Skill[][]
  }


  // Navigation functions
  const nextPage = () => {
    const currentSkills = getCurrentSkills()
    setCurrentSkillPage((prev) => (prev + 1) % currentSkills.length)
  }

  const prevPage = () => {
    const currentSkills = getCurrentSkills()
    setCurrentSkillPage((prev) => (prev - 1 + currentSkills.length) % currentSkills.length)
  }


  // Reset page when tab changes
  useEffect(() => {
    setCurrentSkillPage(0)
  }, [activeTab])

  const skillTabs = pageType === 'cs' ? [
    { id: "cs", label: "Computer Science", icon: "" },
  ] : pageType === 'ee' ? [
    { id: "ee", label: "Electrical Engineering", icon: "" },
  ] : [
    { id: "creative", label: "Beyond Engineering", icon: "" },
  ]

  const skills = {
    cs: [
      // Page 1 - 9 skills (3x3)
      [
        {
          name: "TypeScript",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        },
        {
          name: "Node.js",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        },
        {
          name: "React",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        },
        { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        {
          name: "Tailwind CSS",
          logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg",
        },
        {
          name: "PostgreSQL",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
        },
        {
          name: "MongoDB",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        },
        {
          name: "C",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
        },
        {
          name: "Python",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        },
      ],
      // Page 2 - 4 additional skills
      [
        {
          name: "Git",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
        },
        {
          name: "Docker",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
        },
        {
          name: "NumPy",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg",
        },
        {
          name: "GraphQL",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
        },
      ],
    ],

    ee: [
      [
        {
          name: "Proteus",
          logo: "/proteus.png",
        },
        {
          name: "KiCad",
          logo: "https://avatars.githubusercontent.com/u/3374914?s=200&v=4",
        },
        {
          name: "Arduino",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
        },
        {
          name: "MATLAB",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matlab/matlab-original.svg",
        },
        {
          name: "Simulink",
          logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Simulink_Logo_%28non-wordmark%29.png",
        },
      ],
    ],
    creative: [
      [
        {
          name: "Premiere Pro",
          logo: "https://img.icons8.com/color/48/adobe-premiere-pro.png",
        },
        {
          name: "Sony Vegas",
          logo: "https://img.icons8.com/color/48/sony-vegas-pro.png",
        },
        {
          name: "Figma",
          logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",
        },
        {
          name: "Photoshop",
          logo: "https://img.icons8.com/color/48/adobe-photoshop.png",
        },
        {
          name: "After Effects",
          logo: "https://img.icons8.com/color/48/adobe-after-effects.png",
        },
        {
          name: "DaVinci Resolve",
          logo: "https://img.icons8.com/color/48/davinci-resolve.png",
        },
      ],
    ],
  }

  const getPageDescription = () => {
    switch (pageType) {
      case 'cs':
        return "I'm a self-taught Computer Science student whose foundations may not be crystal clear, but I have a genuine passion for exploring new technologies and building interesting projects. I learn best by doing and experimenting with code."
      case 'ee':
        return "I'm an Electrical Engineering student - no expert, just someone who loves understanding how systems work. Fascinated by circuits, power systems, and the intricate world of electrical engineering."
      case 'beyond-engineering':
        return "I'm a creative professional with expertise in video editing, graphic design, and visual storytelling. I bring ideas to life through compelling visuals and engaging content that resonates with audiences."
      default:
        return "I'm a multidisciplinary professional with expertise across technology, engineering, and creative fields."
    }
  }

  const getCurrentFocus = () => {
    switch (pageType) {
      case 'cs':
        return "Currently diving into full-stack web development and exploring new frameworks and technologies. I'm always experimenting with different approaches and learning from hands-on projects, even if my theoretical background isn't perfect."
      case 'ee':
        return "Learning about embedded systems, power electronics, and circuit design. As a student, I'm constantly amazed by how electrical systems power our world and eager to understand the fundamentals better."
      case 'beyond-engineering':
        return "Working on video production projects, developing visual content strategies, and exploring new creative technologies. Passionate about storytelling through multimedia."
      default:
        return "Exploring the intersection of technology, engineering, and creativity to solve real-world problems."
    }
  }

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 xl:mb-12 font-mono">
            ABOUT<span className="text-white/60">.ME</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/70 font-mono text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            {pageType === 'cs' 
              ? "A self-taught developer who learns by building. My foundations might be unconventional, but my enthusiasm for exploring new tech and creating interesting projects is unwavering."
              : pageType === 'ee' 
              ? "An EE student fascinated by how systems work, from basic circuits to complex power systems. Learning through curiosity and hands-on exploration."
              : "Bringing ideas to life through visual storytelling, video production, and creative digital experiences."
            }
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 xxl:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 200 }}
            className="space-y-4 sm:space-y-6 lg:space-y-8"
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6 font-mono">{"> WHO AM I?"}</h3>

            <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">
              {getPageDescription()}
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">
              Right now, I&apos;m focused on {pageType === 'cs' ? 'full stack web development' : 
                                       pageType === 'ee' ? 'circuit design and embedded systems' : 
                                       'video production and visual design'}, building practical applications that solve real problems.
            </p>

            <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed">
              In the long run, I&apos;m interested in {pageType === 'cs' ? 'exploring AI/ML applications and system architecture' : 
                                                pageType === 'ee' ? 'renewable energy systems and IoT integration' : 
                                                'expanding into motion graphics and 3D design'} to create innovative solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 200 }}
            className="space-y-4 sm:space-y-6 lg:space-y-8"
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 lg:mb-6 font-mono">{"> SKILLS & TECHNOLOGIES"}</h3>

            {/* Skills Tab Navigation - Badge Style */}
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {skillTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'cs' | 'ee' | 'creative')}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-mono text-xs sm:text-sm touch-manipulation ${
                    activeTab === tab.id
                      ? "bg-white text-black shadow-lg"
                      : "bg-white/10 text-white border border-white/20"
                  }`}
                >
                  <span className="mr-1 sm:mr-2">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            {/* Skills Grid with Pagination */}
            <div className="relative">
              <motion.div
                key={`${activeTab}-${currentSkillPage}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 lg:gap-4"
              >
                {getCurrentSkills()[currentSkillPage]
                  ?.filter((skill) => skill !== undefined && skill !== null)
                  .map((skill, index) =>
                    skill ? (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, y: 30, scale: 0.8, rotateX: -45 }}
                        animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.03,
                          type: "spring",
                          stiffness: 300
                        }}
                        className="border border-white/20 p-2 sm:p-3 lg:p-4 flex items-center gap-2 sm:gap-3 min-h-[48px] touch-manipulation"
                      >
                        <img
                          src={skill.logo || "/placeholder.svg"}
                          alt={skill.name}
                          className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 object-contain flex-shrink-0"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=32&width=32"
                          }}
                        />
                        <div className="font-mono text-xs sm:text-sm flex-grow min-w-0 truncate">{skill.name}</div>
                      </motion.div>
                    ) : null
                  )}
              </motion.div>
              
              {/* Navigation Arrows - Only show if there are multiple pages */}
              {getCurrentSkills().length > 1 && (
                <>
                  <button
                    onClick={prevPage}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 sm:-translate-x-8 w-6 h-6 sm:w-8 sm:h-8 border border-white/20 flex items-center justify-center rounded-full touch-manipulation"
                  >
                    <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  <button
                    onClick={nextPage}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 sm:translate-x-8 w-6 h-6 sm:w-8 sm:h-8 border border-white/20 flex items-center justify-center rounded-full touch-manipulation"
                  >
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                  </button>
                  
                  {/* Page Indicators */}
                  <div className="flex justify-center gap-1.5 sm:gap-2 mt-3 sm:mt-4">
                    {getCurrentSkills().map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setCurrentSkillPage(index)
                        }}
                        className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full touch-manipulation ${
                          currentSkillPage === index
                            ? "bg-white"
                            : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="p-3 sm:p-4 lg:p-6 border border-white/20 bg-white/5"
            >
              <h4 className="font-mono text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 lg:mb-4">Current Focus</h4>
              <p className="text-xs sm:text-sm lg:text-base text-white/80 leading-relaxed">
                {getCurrentFocus()}
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
