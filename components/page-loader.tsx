"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

interface PageLoaderProps {
  isLoading: boolean
  loadingText?: string
}

export default function PageLoader({ isLoading, loadingText = "loading page..." }: PageLoaderProps) {
  // Prevent background scrolling while loader is visible
  useEffect(() => {
    if (isLoading) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [isLoading])

  const overlay = (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[2147483647] bg-black flex items-center justify-center pointer-events-auto"
          aria-live="assertive"
          role="status"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            {/* Center circular glyph */}
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-white/25" />
              <div className="absolute inset-1 rounded-full border border-white/25" />
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.05 }}
              className="font-mono text-white/90 text-base tracking-wider"
            >
              {loadingText}
            </motion.p>

            {/* Progress bar */}
            <div className="w-56 h-1 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-white rounded-full"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{
                  duration: 0.9,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )

  // Render via portal to body to avoid parent stacking/overflow issues
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    return createPortal(overlay, document.body)
  }
  return null
}

// Hook for managing loading state during navigation
export function usePageLoader() {
  const [isLoading, setIsLoading] = useState(false)

  const startLoading = () => setIsLoading(true)
  const stopLoading = () => setIsLoading(false)

  // Auto-stop loading after maximum time to prevent infinite loading
  useEffect(() => {
    if (isLoading) {
      const timeout = setTimeout(() => {
        setIsLoading(false)
      }, 5000) // 5 second maximum

      return () => clearTimeout(timeout)
    }
  }, [isLoading])

  return { isLoading, startLoading, stopLoading }
}