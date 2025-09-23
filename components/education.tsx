"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

export default function Education() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const educationData = [
    {
      level: "Bachelors",
      degree: "Electrical Engineering",
      institution: "IOE Pulchowk Campus",
      period: "2024 - Present",
      status: "In Progress",
      year: "2024"
    },
    {
      level: "Higher Secondary",
      degree: "Science (Physics Major)",
      institution: "Khwopa Secondary School",
      GPA: "3.88/4.0",
      period: "2022 - 2024",
      status: "Completed",
      year: "2022"
    },
    {
      level: "Secondary",
      degree: "Secondary Education",
      institution: "Galaxy Public School",
      GPA: "3.60/4.0",
      period: "2012 - 2022",
      status: "Completed",
      year: "2012"
    },
  ]

  // Random images for bento grid
  const bentoImages = [
    "/edu1.jpg",
    "/edu2.jpg",
    "/edu3.png",
    "/edu4.png",
    "/edu5.jpg",
    "/edu6.jpg",
    "/edu7.jpg",
    "/edu8.jpg"
  ]

  return (
    <section id="education" className="py-12 sm:py-16 lg:py-20 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-10 lg:mb-12"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-5 lg:mb-6 font-mono">
            EDUCATION<span className="text-white/60">.TREE</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/70 font-mono text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            My academic journey visualized as a growing tree - each branch represents a milestone in my educational path, 
            from foundational learning to specialized engineering knowledge.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          {/* Left Side - Education Tree */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 200 }}
            className="relative"
          >
            {/* Tree Trunk - Animated Growth */}
            <motion.div
              initial={{ height: 0 }}
              animate={isInView ? { height: "100%" } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="absolute left-6 sm:left-8 top-0 w-0.5 sm:w-1 bg-gradient-to-b from-white/50 to-white/30 rounded-full"
            />
            
            {/* Tree Branches and Nodes */}
            <div className="space-y-4 sm:space-y-5 lg:space-y-6">
              {educationData.map((edu, index) => (
                <motion.div
                  key={edu.level}
                  initial={{ opacity: 0, x: -50, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.4 + index * 0.1,
                    type: "spring",
                    stiffness: 300,
                    damping: 20
                  }}
                  className="relative flex items-center"
                >
                  {/* Branch - Animated Growth */}
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: "2rem" } : {}}
                    transition={{ duration: 0.2, delay: 0.5 + index * 0.1 }}
                    className="absolute left-6 sm:left-8 h-px bg-white/40"
                  />
                  
                  {/* Tree Node - Pulsing Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ 
                      duration: 0.2, 
                      delay: 0.6 + index * 0.1,
                      type: "spring",
                      stiffness: 400
                    }}
                    className="absolute left-4 sm:left-6 w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full border-2 sm:border-4 border-black z-10 shadow-lg"
                  >
                    <motion.div
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ 
                        duration: 1.5, 
                        repeat: Infinity,
                        delay: 0.8 + index * 0.1
                      }}
                      className="absolute inset-0 bg-white rounded-full"
                    />
                  </motion.div>
                  
                  {/* Education Card - Uniform Size */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    className="ml-12 sm:ml-16 lg:ml-20 w-full max-w-xs sm:max-w-sm lg:w-80 min-h-[120px] sm:h-32 p-3 sm:p-4 border border-white/20 hover:border-white/50 transition-all duration-300 bg-black/60 backdrop-blur-sm rounded-lg hover:shadow-xl hover:shadow-white/10 group touch-manipulation"
                  >
                    <div className="flex items-start justify-between mb-1.5 sm:mb-2">
                      <h3 className="text-sm sm:text-base font-bold font-mono text-white group-hover:text-white/90 transition-colors">
                        {edu.level}
                      </h3>
                      <span
                        className={`text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded font-mono transition-all duration-300 flex-shrink-0 ${
                          edu.status === "Completed"
                            ? "bg-white/10 text-white/80 border border-white/30 group-hover:bg-white/20 group-hover:text-white"
                            : "bg-white/5 text-white/60 border border-white/20 group-hover:bg-white/15 group-hover:text-white/80"
                        }`}
                      >
                        {edu.status}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm text-white/90 font-medium mb-1 line-clamp-1">{edu.degree}</h4>
                    <p className="text-white/70 font-mono text-xs mb-1 line-clamp-1">{edu.institution}</p>
                    <div className="flex justify-between items-end text-xs">
                      {edu.GPA && <p className="text-white/60 font-mono">GPA: {edu.GPA}</p>}
                      <div className="text-white/50 font-mono">{edu.period}</div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Tree Roots - Animated Growth */}
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
              transition={{ duration: 0.3, delay: 1, ease: "easeOut" }}
              className="absolute left-4 sm:left-6 bottom-0 w-4 sm:w-6 h-12 sm:h-16 bg-gradient-to-b from-white/30 to-transparent transform origin-top"
            >
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={isInView ? { width: "2rem", opacity: 1 } : {}}
                transition={{ duration: 0.2, delay: 1.1 }}
                className="absolute left-1 sm:left-2 top-8 sm:top-10 h-px bg-white/20 transform rotate-45"
              />
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={isInView ? { width: "2rem", opacity: 1 } : {}}
                transition={{ duration: 0.2, delay: 1.2 }}
                className="absolute right-1 sm:right-2 top-8 sm:top-10 h-px bg-white/20 transform -rotate-45"
              />
            </motion.div>
          </motion.div>

          {/* Right Side - Bento Grid */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 200 }}
            className="hidden sm:grid grid-cols-3 grid-rows-4 gap-2 sm:gap-3 h-[400px] sm:h-[450px] lg:h-[500px] mt-8 lg:mt-0"
          >
            {/* Large card - spans 2x2 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                duration: 0.3, 
                delay: 0.2,
                ease: "easeOut"
              }}
              className="col-span-2 row-span-2 bg-white/5 rounded-lg overflow-hidden border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-200 group cursor-pointer"
            >
              <motion.img
                initial={{ scale: 1.1 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.2 }}
                src={bentoImages[0]}
                alt="Education visual"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-200" />
            </motion.div>

            {/* Small cards */}
            {bentoImages.slice(1, 7).map((image, index) => (
              <motion.div
                key={index}
                initial={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  y: 20
                }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1, 
                  y: 0
                } : {}}
                transition={{ 
                  duration: 0.2, 
                  delay: 0.3 + index * 0.03,
                  ease: "easeOut"
                }}
                className="bg-white/5 rounded-lg overflow-hidden border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-200 hover:scale-105 group cursor-pointer"
              >
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.2, delay: 0.3 + index * 0.03 }}
                  src={image}
                  alt={`Education memory ${index + 1}`}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-200" />
              </motion.div>
            ))}

            {/* Medium card - spans 2x1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.2, 
                delay: 0.5,
                ease: "easeOut"
              }}
              className="col-span-2 bg-white/5 rounded-lg overflow-hidden border border-white/20 hover:border-white/40 hover:bg-white/10 transition-all duration-200 group"
            >
              <motion.img
                initial={{ scale: 1.1 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.2, delay: 0.5 }}
                src={bentoImages[7]}
                alt="Education journey"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-200" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
