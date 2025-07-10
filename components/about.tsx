"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeTab, setActiveTab] = useState("cs")

  const skillTabs = [
    { id: "cs", label: "Computer Science", icon: "" },
    { id: "ee", label: "Electrical Engineering", icon: "" },
    { id: "creative", label: "Creatives", icon: "" },
  ]

const skills = {
  cs: [
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

ee: [
  {
    name: "Proteus",
    logo: "/proteus.png",
  },
  {
    name: "KiCad",
    logo: "https://avatars.githubusercontent.com/u/3374914?s=200&v=4",
  },
,
  {
    name: "Arduino",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg",
  },
],
creative: [
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
}

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 lg:mb-12 font-mono">
            ABOUT<span className="text-white/60">.ME</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 lg:space-y-8"
          >
<h3 className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6 font-mono">{"> WHO AM I?"}</h3>

<p className="text-base sm:text-lg text-white/80 leading-relaxed">
  I’m an Electrical Engineering student at IOE Pulchowk with a strong passion for technology and problem-solving.  
  My journey started with video editing, where I spent 2 years creating visual stories, and has now grown into working with software as well as hardware development.
</p>

<p className="text-base sm:text-lg text-white/80 leading-relaxed">
  I see myself as a builder — someone who loves breaking down complex problems into simple, useful solutions. Whether it’s designing circuits or building web applications, I face every challenge with curiosity and determination.
</p>

<p className="text-base sm:text-lg text-white/80 leading-relaxed">
  You might wonder why an Electrical Engineering student is drawn to software and video editing. A few years ago, video editing was my way to express creativity and tell stories. Today, I view software and web development as powerful tools to solve real-world problems and make a positive impact.
</p>


            
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6 lg:space-y-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6 font-mono">{"> SKILLS & TECHNOLOGIES"}</h3>

            {/* Skills Tab Navigation - Badge Style */}
            <div className="flex flex-wrap gap-3">
              {skillTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-full font-mono text-xs sm:text-sm transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-white text-black shadow-lg"
                      : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            {/* Skills Grid */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
            >
              {skills[activeTab as keyof typeof skills]
                .filter((skill) => skill !== undefined && skill !== null)
                .map((skill, index) =>
                  skill ? (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border border-white/20 p-3 sm:p-4 hover:border-white/40 transition-colors duration-300 flex items-center gap-3"
                    >
                      <img
                        src={skill.logo || "/placeholder.svg"}
                        alt={skill.name}
                        className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = "/placeholder.svg?height=32&width=32"
                        }}
                      />
                      <div className="font-mono text-xs sm:text-sm">{skill.name}</div>
                    </motion.div>
                  ) : null
                )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="p-4 sm:p-6 border border-white/20 bg-white/5"
            >
              <h4 className="font-mono text-base sm:text-lg mb-3 sm:mb-4">Current Focus</h4>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Exploring the intersection of electrical engineering and software development, with particular interest
                in IoT, embedded systems, and full-stack web applications.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
