'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DottedSphere from './dotted-sphere'

export default function Landing() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const router = useRouter()

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
    setIsTransitioning(true)
    
    // Route to specific page based on selection
    setTimeout(() => {
      if (option === 'cs') {
        router.push('/cs')
      } else if (option === 'ee') {
        router.push('/ee')
      } else if (option === 'beyond-engineering') {
        router.push('/beyond-engineering')
      }
    }, 2000)
  }

  const handleScrollToContact = () => {
    const contactElement = document.getElementById('contact')
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Dotted Sphere Background - positioned exactly like SMTM */}
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        animate={isTransitioning ? { scale: 20, opacity: 0 } : { scale: 1, opacity: 0.8 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        <div className="w-[400px] h-[400px] sm:w-[500px] sm:h-[500px] lg:w-[600px] lg:h-[600px] xl:w-[700px] xl:h-[700px]">
          <DottedSphere />
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 min-h-screen"
        animate={isTransitioning ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <AnimatePresence mode="wait">
          {!isTransitioning && (
            <>
              {/* MASSIVE Title spanning full width like SMTM */}
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="pt-4 sm:pt-8 lg:pt-12 px-4 sm:px-8 lg:px-12"
              >
                <h1 className="text-[4rem] sm:text-[6rem] md:text-[8rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[14rem] font-bold leading-[0.85] tracking-tight">
                  bishrant
                </h1>
                
                {/* Right aligned description like SMTM */}
                <div className="absolute top-4 sm:top-8 lg:top-12 right-4 sm:right-8 lg:right-12 text-right">
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-400 leading-tight">
                    technology
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-400 leading-tight">
                    engineer
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-400 leading-tight">
                    from
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-gray-400 leading-tight">
                    nepal
                  </p>
                </div>
              </motion.div>

              {/* Left Sidebar Navigation exactly like SMTM */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute left-4 sm:left-8 lg:left-12 top-1/2 transform -translate-y-1/2 space-y-4 sm:space-y-6 lg:space-y-8"
              >
                <motion.button
                  onClick={() => handleOptionClick('cs')}
                  className="group flex items-center space-x-3 sm:space-x-4 text-left hover:text-gray-300 transition-colors duration-300"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light">computer science</span>
                  <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
                
                <motion.button
                  onClick={() => handleOptionClick('ee')}
                  className="group flex items-center space-x-3 sm:space-x-4 text-left hover:text-gray-300 transition-colors duration-300"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light">electrical engineering</span>
                  <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
                
                <motion.button
                  onClick={() => handleOptionClick('beyond-engineering')}
                  className="group flex items-center space-x-3 sm:space-x-4 text-left hover:text-gray-300 transition-colors duration-300"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-light">beyond engineering</span>
                  <ArrowDown className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rotate-[-90deg] group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </motion.div>

              {/* Bottom Call to Action exactly positioned like SMTM */}
              <motion.button
                onClick={handleScrollToContact}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="group flex items-center space-x-4 sm:space-x-6 text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light hover:text-gray-300 transition-colors duration-300 absolute bottom-8 sm:bottom-12 lg:bottom-16 left-4 sm:left-8 lg:left-12"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <span>lets talk about you</span>
                <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
