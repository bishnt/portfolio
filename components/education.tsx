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
    },
    {
      level: "Higher Secondary",
      degree: "Science (Physics Major)",
      institution: "Khwopa Secondary School",
      GPA : "3.88/4.0",
      period: "2022 - 2024",
      status: "Completed",
    },
    {
      level: "Secondary",
      degree: "Secondary Education",
      institution: "Galaxy Public School",
      GPA: "3.60/4.0",
      period: "2012 - 2022",
      status: "Completed",
    },
  ]

  return (
    <section id="education" className="py-16 sm:py-20 bg-black" ref={ref}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-mono">
            EDUCATION<span className="text-white/60">.TREE</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-white/20 hidden sm:block" />

          <div className="space-y-4">
            {educationData.map((edu, index) => (
              <motion.div
                key={edu.level}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute left-2.5 w-3 h-3 bg-white rounded-full border-2 border-black hidden sm:block" />

                <div className="sm:ml-12 flex flex-col sm:flex-row sm:justify-between sm:items-center p-4 border border-white/20 hover:border-white/40 transition-all duration-300">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <h3 className="text-lg font-bold font-mono">{edu.level}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded font-mono self-start ${
                          edu.status === "Completed"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {edu.status}
                      </span>
                    </div>
                    <h4 className="text-sm text-white/80 mt-1">{edu.degree}</h4>
                    <p className="text-white/60 font-mono text-xs">{edu.institution}</p>
                    <p className="text-white/60 font-mono text-xs">{edu.GPA}</p>
                  </div>
                  <div className="mt-2 sm:mt-0 sm:text-right">
                    <div className="text-white/60 font-mono text-xs">{edu.period}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mathematical formula overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 1 }}
            className="absolute top-4 right-4 text-white/10 font-mono text-3xl hidden lg:block"
          >
            ∑
          </motion.div>
        </div>
      </div>
    </section>
  )
}
