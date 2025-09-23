"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Magnetic } from "./scroll-animations"

interface NavbarProps {
  pageType?: 'home' | 'cs' | 'ee' | 'beyond-engineering'
}

export default function Navbar({ pageType = 'home' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      
      // Get sections based on page type
      let sections = ['home', 'about', 'projects', 'education', 'blog', 'contact']
      
      if (pageType === 'cs') {
        sections = ['home', 'about', 'projects', 'proof-of-work', 'education', 'blog', 'contact']
      } else if (pageType === 'beyond-engineering') {
        sections = ['home', 'about', 'projects', 'education', 'social-feed', 'blog', 'contact']
      }
      
      const scrollPosition = window.scrollY + 150 // Increased offset for faster detection
      
      // Find current section with better detection
      let currentSection = 'home'
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          // More responsive detection - activate when section is 30% visible
          if (scrollPosition >= offsetTop - offsetHeight * 0.3) {
            currentSection = section
          }
        }
      }
      setActiveSection(currentSection)
    }
    
    // Use requestAnimationFrame for smoother updates
    let ticking = false
    const optimizedHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }
    
    window.addEventListener("scroll", optimizedHandleScroll, { passive: true })
    handleScroll() // Call once to set initial state
    return () => window.removeEventListener("scroll", optimizedHandleScroll)
  }, [])

  const getNavItems = () => {
    const baseItems = [
      { name: "Home", href: "#home" },
      { name: "About", href: "#about" },
      { name: "Projects", href: "#projects" },
    ]

    if (pageType === 'cs') {
      return [
        ...baseItems,
        { name: "Proof of Work", href: "#proof-of-work" },
        { name: "Education", href: "#education" },
        { name: "Blog", href: "#blog" },
        { name: "Contact", href: "#contact" },
      ]
    } else if (pageType === 'beyond-engineering') {
      return [
        ...baseItems,
        { name: "Education", href: "#education" },
        { name: "Social Feed", href: "#social-feed" },
        { name: "Blog", href: "#blog" },
        { name: "Contact", href: "#contact" },
      ]
    } else {
      return [
        ...baseItems,
        { name: "Education", href: "#education" },
        { name: "Blog", href: "#blog" },
        { name: "Contact", href: "#contact" },
      ]
    }
  }

  const navItems = getNavItems()

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 w-full z-[9999] transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
      }`}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <Magnetic strength={0.4}>
            <motion.div 
              className="text-xl sm:text-2xl font-bold font-mono cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.3 }
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 }
              }}
            >
              <Link href="/">Bish_</Link>
            </motion.div>
          </Magnetic>

          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.substring(1)
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <Magnetic strength={0.3}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ 
                        scale: 0.95,
                        transition: { duration: 0.1 }
                      }}
                    >
                      <Link
                        href={item.href}
                        className={`relative font-mono text-xs sm:text-sm tracking-wider transition-all duration-300 ${
                          isActive 
                            ? "text-white" 
                            : "text-white/60 hover:text-white/90"
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          const element = document.getElementById(item.href.substring(1))
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' })
                          }
                        }}
                      >
                        {item.name}
                        
                        {/* Active indicator */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={{ scaleX: 1, opacity: 1 }}
                              exit={{ scaleX: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                            />
                          )}
                        </AnimatePresence>
                        
                        {/* Hover effect */}
                        <motion.div
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/30"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: isActive ? 0 : 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      </Link>
                    </motion.div>
                  </Magnetic>
                </motion.div>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-white hover:text-white/80 transition-colors rounded-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t border-white/10 bg-black/98 backdrop-blur-md"
            >
              <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-1 sm:space-y-2">
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.href.substring(1)
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`block py-2.5 sm:py-3 px-3 sm:px-4 font-mono text-sm tracking-wider transition-all duration-300 rounded-lg touch-manipulation ${
                          isActive 
                            ? "text-white bg-white/10" 
                            : "text-white/60 hover:text-white/90 hover:bg-white/5 active:bg-white/10"
                        }`}
                        onClick={(e) => {
                          e.preventDefault()
                          setMobileMenuOpen(false)
                          const element = document.getElementById(item.href.substring(1))
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' })
                          }
                        }}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
