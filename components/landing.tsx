'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Code2, Cpu, Palette, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

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
      } else if (option === 'creatives') {
        router.push('/creatives')
      }
    }, 3000)
  }

  const options = [
    {
      id: 'cs',
      title: 'Computer Science',
      icon: Code2,
      description: 'Algorithms, Software & Innovation'
    },
    {
      id: 'ee',
      title: 'Electrical Engineer',
      icon: Cpu,
      description: 'Hardware, Circuits & Systems'
    },
    {
      id: 'creatives',
      title: 'Creatives',
      icon: Palette,
      description: 'Visual Stories & Digital Art'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <AnimatePresence mode="wait">
          {!isTransitioning ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-4xl mx-auto"
            >
              {/* Simplified Title */}
              <div className="mb-12">
                <h1 className="text-3xl md:text-5xl font-mono font-bold mb-4 tracking-wider leading-tight">
                  <span className="text-white">
                    choose your
                  </span>
                  <br />
                  <span className="text-gray-300">
                    perspective
                  </span>
                </h1>
                <p className="text-base md:text-lg text-gray-400 font-mono max-w-2xl mx-auto">
                  explore the different facets of my work and passion
                </p>
              </div>

              {/* Simplified Options */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
                {options.map((option, index) => {
                  const IconComponent = option.icon
                  return (
                    <motion.button
                      key={option.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionClick(option.id)}
                      className="group relative p-4 border border-white/20 rounded-lg bg-black/50 hover:border-white/40 transition-all duration-200"
                    >
                      {/* Content */}
                      <div className="flex flex-col items-center space-y-3">
                        <IconComponent 
                          size={32} 
                          className="text-white group-hover:text-gray-300 transition-colors duration-200" 
                        />
                        
                        <div className="text-center">
                          <h3 className="text-base font-mono font-semibold mb-1 group-hover:text-white transition-colors duration-200">
                            {option.title}
                          </h3>
                          <p className="text-xs text-gray-400 font-mono group-hover:text-gray-300 transition-colors duration-200">
                            {option.description}
                          </p>
                        </div>

                        {/* Arrow indicator */}
                        <div className="flex items-center space-x-1 text-xs font-mono text-gray-500 group-hover:text-white transition-colors duration-200">
                          <span>explore</span>
                          <ArrowRight size={10} />
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center space-y-6"
            >
              <div className="w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <ArrowRight size={16} className="text-white" />
                </motion.div>
              </div>
              
              <div className="text-center">
                <h2 className="text-xl font-mono font-semibold mb-4">
                  {selectedOption === 'cs' ? 'Entering Code Realm' : 
                   selectedOption === 'ee' ? 'Initializing Circuits' : 
                   'Loading Creative Studio'}...
                </h2>
                
                <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-white rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
