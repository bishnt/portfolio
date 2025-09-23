"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { navigationHistory } from "../utils/navigation-history"

interface BackButtonProps {
  fallbackHref: string
  fallbackText: string
  className?: string
}

export default function BackButton({ fallbackHref, fallbackText, className = "" }: BackButtonProps) {
  const router = useRouter()
  const [canGoBack, setCanGoBack] = useState(false)
  const [previousRoute, setPreviousRoute] = useState<string | null>(null)

  useEffect(() => {
    // Use our navigation history system first, fallback to referrer
    const checkPreviousRoute = () => {
      // Try to get previous route from our history tracker
      const previousFromHistory = navigationHistory.getPrevious()
      
      if (previousFromHistory) {
        setPreviousRoute(previousFromHistory)
        setCanGoBack(true)
        return
      }
      
      // Fallback to referrer method
      const referrer = document.referrer
      const currentOrigin = window.location.origin
      const currentUrl = window.location.href
      
      if (referrer && referrer.startsWith(currentOrigin) && referrer !== currentUrl) {
        try {
          const referrerUrl = new URL(referrer)
          const referrerPath = referrerUrl.pathname + referrerUrl.hash
          
          // Check if the referrer is the homepage with a hash (section)
          if (referrerPath.startsWith('/#') || referrerPath === '/') {
            setPreviousRoute(referrerPath === '/' ? '/#home' : referrerPath)
            setCanGoBack(true)
            return
          }
          
          // Check if it's another page in our app
          if (referrerPath && referrerPath !== window.location.pathname) {
            setPreviousRoute(referrerPath)
            setCanGoBack(true)
            return
          }
        } catch (error) {
          console.log('Error parsing referrer URL:', error)
        }
      }
      
      // Final fallback - check browser history
      const hasHistory = navigationHistory.canGoBack() || window.history.length > 2
      setCanGoBack(hasHistory)
    }
    
    // Small delay to ensure navigation history is updated
    const timeoutId = setTimeout(checkPreviousRoute, 100)
    
    return () => clearTimeout(timeoutId)
  }, [])

  const handleBack = () => {
    if (previousRoute) {
      // If we have a specific route to go back to, use it
      if (previousRoute.startsWith('/#')) {
        // It's a hash route, we need to navigate to homepage and scroll to section
        const sectionId = previousRoute.substring(2) // Remove '/#'
        
        // If we're already on the homepage
        if (window.location.pathname === '/') {
          // Just scroll to the section
          const element = document.getElementById(sectionId)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
            // Update URL hash
            window.history.pushState(null, '', `/#${sectionId}`)
          }
        } else {
          // Navigate to homepage first, then scroll
          router.push(`/#${sectionId}`)
        }
      } else if (previousRoute.includes('#')) {
        // Handle routes with hash that aren't just '/#section'
        const [pathname, hash] = previousRoute.split('#')
        if (pathname === '' || pathname === '/') {
          // Navigate to homepage with hash
          router.push(`/#${hash}`)
        } else {
          // Navigate to specific page with hash
          router.push(previousRoute)
        }
      } else {
        // Regular route navigation
        router.push(previousRoute)
      }
    } else if (canGoBack) {
      // Try using browser back
      window.history.back()
      
      // Fallback after a short delay in case back() doesn't work
      setTimeout(() => {
        // Check if we're still on the same page after attempting to go back
        if (window.location.pathname === location.pathname) {
          // Use fallback but preserve any section information
          if (fallbackHref.startsWith('/#')) {
            const sectionId = fallbackHref.substring(2)
            router.push(`/#${sectionId}`)
          } else {
            router.push(fallbackHref)
          }
        }
      }, 150)
    } else {
      // Use fallback - handle section scrolling for fallback too
      if (fallbackHref.startsWith('/#')) {
        const sectionId = fallbackHref.substring(2)
        router.push(`/#${sectionId}`)
      } else {
        router.push(fallbackHref)
      }
    }
  }

  const getButtonText = () => {
    if (previousRoute) {
      // If we know the specific previous route, show appropriate text
      if (previousRoute.startsWith('/#')) {
        const section = previousRoute.substring(2) // Remove '/#'
        return `Back to ${section.charAt(0).toUpperCase() + section.slice(1)}`
      }
      return "Back"
    }
    return canGoBack ? "Back" : fallbackText
  }

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors font-mono text-sm ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      {getButtonText()}
    </button>
  )
}