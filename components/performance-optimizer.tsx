"use client"

import { useEffect } from 'react'

export function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      // Preload fonts
      const fontPreloads = [
        '/fonts/inter.woff2',
        '/fonts/jetbrains-mono.woff2'
      ]
      
      fontPreloads.forEach(font => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.href = font
        link.as = 'font'
        link.type = 'font/woff2'
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      })
      
      // Preload critical images
      const criticalImages = ['/cover.png', '/favicon.png']
      criticalImages.forEach(src => {
        const img = new Image()
        img.src = src
      })
    }

    // Optimize scroll performance
    const optimizeScrolling = () => {
      let ticking = false
      
      const updateScrollPosition = () => {
        // Update scroll-based animations efficiently
        ticking = false
      }
      
      const onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(updateScrollPosition)
          ticking = true
        }
      }
      
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
    }

    // Initialize optimizations
    preloadCriticalResources()
    const cleanupScroll = optimizeScrolling()

    // Cleanup
    return () => {
      cleanupScroll()
    }
  }, [])

  return null
}

// Hook for intersection observer optimization
export function useOptimizedIntersection(callback: () => void, options?: IntersectionObserverInit) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            callback()
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
        ...options
      }
    )

    return () => observer.disconnect()
  }, [callback, options])
}
