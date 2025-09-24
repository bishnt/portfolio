'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import DottedSphere from './dotted-sphere'
import FloatingParticles from './floating-particles'
import PageLoader from './page-loader'

export default function Landing() {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showLoader, setShowLoader] = useState(false)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const router = useRouter()

  const handleOptionClick = (option: string) => {
    setSelectedOption(option)
    setIsTransitioning(true)

    // After faster zoom completes, show loader briefly then navigate
    setTimeout(() => {
      setShowLoader(true)
      setTimeout(() => {
        if (option === 'cs') {
          router.push('/cs')
        } else if (option === 'ee') {
          router.push('/ee')
        } else if (option === 'beyond-engineering') {
          router.push('/beyond-engineering')
        }
      }, 350) // quick handoff after loader appears
    }, 800)
  }

  const handleScrollToContact = () => {
    const contactElement = document.getElementById('contact')
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden border-[3px] sm:border-[6.5px] border-white/60 box-border px-3 sm:px-4 py-1 sm:py-2">
      {/* Floating Background Particles */}
      <FloatingParticles fadeOut={isTransitioning || showLoader} />
      
      {/* Dotted Sphere Background - responsive and centered */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={isTransitioning ? { scale: 8, opacity: 0 } : { scale: 1, opacity: 0.8 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ zIndex: 1 }}
      >
        <div className="w-full h-full max-w-[1800px] max-h-[1800px]">
          <DottedSphere />
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div 
        className="relative z-10 min-h-screen"
        animate={isTransitioning ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {!isTransitioning && (
            <>
              {/* Title - occupying entire screen */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
<h1
  className="text-[8vw] sm:text-[12vw] md:text-[15vw] lg:text-[18vw] xl:text-[20vw] font-bold leading-[0.75] tracking-tight text-center"
  style={{
    position: 'fixed',
    top: '65px', // 100px space from the top
    left: 0,
    width: '98%',
    zIndex: 50, // stay above everything else
    fontSize: 'clamp(3rem, 20vw, 25rem)',
    WebkitTextStroke: '2px rgba(255, 255, 255, 0.1)',
    color: 'rgba(255, 255, 255, 0.95)',
    background: 'transparent',
  }}
>
  bishrant
</h1>

              </motion.div>
              {/* Responsive Navigation Menu */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute left-4 sm:left-6 lg:left-8 bottom-20 sm:bottom-40 space-y-2 sm:space-y-3 z-20 w-[85vw] sm:w-auto max-w-[92vw] sm:max-w-[30vw] origin-bottom-left scale-100 sm:scale-110 md:scale-[1.25] border-[3px] sm:border-[6.5px] border-white/60 p-3 sm:p-4 bg-black/10 backdrop-blur-sm rounded-xl"
              >
                <motion.button
                  onClick={() => handleOptionClick('cs')}
                  className="group flex items-center justify-between w-full space-x-3 sm:space-x-4 text-left hover:text-gray-300 transition-colors duration-300 py-2.5"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light">Teaching Myself CS</span>
                  <ArrowDown className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px] rotate-[-45deg] group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
                
                <motion.button
                  onClick={() => handleOptionClick('ee')}
                  className="group flex items-center justify-between w-full space-x-3 sm:space-x-4 text-left hover:text-gray-300 transition-colors duration-300 py-2.5"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light">Studying EE</span>
                  <ArrowDown className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px] rotate-[-45deg] group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
                
                <motion.button
                  onClick={() => handleOptionClick('beyond-engineering')}
                  className="group flex items-center justify-between w-full space-x-3 sm:space-x-4 text-left hover:text-gray-300 transition-colors duration-300 py-2.5"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <span className="text-base sm:text-lg lg:text-xl xl:text-2xl font-light">Stuff Beyond Engineering</span>
                  <ArrowDown className="w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] lg:w-[50px] lg:h-[50px] rotate-[-45deg] group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </motion.div>

              {/* Bottom Call to Action (contact me right now) */}
              <motion.button
                onClick={handleScrollToContact}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="group flex items-center space-x-4 sm:space-x-6 text-lg sm:text-xl lg:text-2xl xl:text-3xl font-light hover:text-gray-300 transition-colors duration-300 absolute bottom-8 sm:bottom-12 lg:bottom-16 left-4 sm:left-6 lg:left-8 z-20"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                <span>Contact me right now</span>
                <ArrowRight className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
              
            </>
          )}
        </AnimatePresence>
      </motion.div>

      <br></br>
      <br />

      {/* Loading overlay after zoom */}
      <PageLoader isLoading={showLoader} loadingText="loading page..." />

    </div>
  )
}
