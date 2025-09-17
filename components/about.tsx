"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ScrollReveal, BlurReveal, Magnetic } from "./scroll-animations"
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, staggerItem, clickBlur, morphClick, elasticClick } from "@/lib/animations"
import { RippleEffect, ParticleClick, GlitchClick } from "./click-effects"

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
        <BlurReveal className="text-center mb-12 sm:mb-16 lg:mb-20">
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 lg:mb-12 font-mono"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            ABOUT<span className="text-white/60">.ME</span>
          </motion.h2>
        </BlurReveal>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-start">
          <ScrollReveal variants={fadeInLeft} delay={0.2} className="space-y-6 lg:space-y-8">
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.h3 
                variants={staggerItem}
                className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6 font-mono"
                whileHover={{ x: 10, transition: { duration: 0.2 } }}
              >
                {"> WHO AM I?"}
              </motion.h3>

              <motion.p 
                variants={staggerItem}
                className="text-base sm:text-lg text-white/80 leading-relaxed"
              >
                I'm an Electrical Engineering student at IOE Pulchowk with a background in both creative and technical work. I started with video editing, spent 2 years creating content, and gradually shifted toward software development.
              </motion.p>

              <motion.p 
                variants={staggerItem}
                className="text-base sm:text-lg text-white/80 leading-relaxed"
              >
                Right now, I'm focused on full stack web development, building practical applications that solve real problems. I enjoy working on projects from start to finish and learning through building.
              </motion.p>

              <motion.p 
                variants={staggerItem}
                className="text-base sm:text-lg text-white/80 leading-relaxed"
              >
                In the long run, I'm interested in combining my understanding of Electricals & Electronics with software to create systems that bridge both fields.
              </motion.p>
            </motion.div>
          </ScrollReveal>

          <ScrollReveal variants={fadeInRight} delay={0.4} className="space-y-6 lg:space-y-8">
            <motion.h3 
              className="text-xl sm:text-2xl font-bold mb-4 lg:mb-6 font-mono"
              whileHover={{ x: 10, transition: { duration: 0.2 } }}
            >
              {"> SKILLS & TECHNOLOGIES"}
            </motion.h3>

            {/* Skills Tab Navigation - Badge Style */}
            <motion.div 
              className="flex flex-wrap gap-3"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {skillTabs.map((tab) => (
                <Magnetic key={tab.id} strength={0.2}>
                  <RippleEffect>
                    <motion.button
                      variants={activeTab === tab.id ? morphClick : staggerItem}
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-4 py-2 rounded-full font-mono text-xs sm:text-sm transition-all duration-300 ${
                        activeTab === tab.id
                          ? "bg-white text-black shadow-lg"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95, filter: "blur(1px)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      animate={activeTab === tab.id ? "clicked" : "initial"}
                    >
                      <span className="mr-2">{tab.icon}</span>
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.label.split(" ")[0]}</span>
                    </motion.button>
                  </RippleEffect>
                </Magnetic>
              ))}
            </motion.div>

            {/* Skills Grid */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4"
            >
              {skills[activeTab as keyof typeof skills]
                .filter((skill) => skill !== undefined && skill !== null)
                .map((skill, index) =>
                  skill ? (
                    <ParticleClick key={skill.name}>
                      <motion.div
                        initial={{ opacity: 0, y: 30, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.08,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="border border-white/20 p-3 sm:p-4 hover:border-white/40 transition-all duration-300 flex items-center gap-3 group cursor-pointer"
                        whileHover={{ 
                          scale: 1.02, 
                          y: -2,
                          boxShadow: "0 10px 25px rgba(255,255,255,0.1)",
                          transition: { duration: 0.2 }
                        }}
                        variants={elasticClick}
                        whileTap="clicked"
                      >
                        <motion.img
                          src={skill.logo || "/placeholder.svg"}
                          alt={skill.name}
                          className="w-6 h-6 sm:w-8 sm:h-8 object-contain"
                          whileHover={{ rotate: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement
                            target.src = "/placeholder.svg?height=32&width=32"
                          }}
                        />
                        <div className="font-mono text-xs sm:text-sm group-hover:text-white transition-colors">{skill.name}</div>
                      </motion.div>
                    </ParticleClick>
                  ) : null
                )}
            </motion.div>

            <BlurReveal delay={0.6}>
              <motion.div
                className="p-4 sm:p-6 border border-white/20 bg-white/5 group"
                whileHover={{ 
                  borderColor: "rgba(255,255,255,0.4)",
                  backgroundColor: "rgba(255,255,255,0.08)",
                  transition: { duration: 0.3 }
                }}
              >
                <motion.h4 
                  className="font-mono text-base sm:text-lg mb-3 sm:mb-4"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Current Focus
                </motion.h4>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed group-hover:text-white/90 transition-colors">
                  Exploring the intersection of electrical engineering and software development, with particular interest
                  in IoT, embedded systems, and full-stack web applications.
                </p>
              </motion.div>
            </BlurReveal>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
