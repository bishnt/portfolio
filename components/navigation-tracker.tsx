"use client"

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { navigationHistory } from '../utils/navigation-history'

export default function NavigationTracker() {
  const pathname = usePathname()

  // Initialize with current location on first load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentPath = pathname + window.location.hash
      navigationHistory.push(currentPath)
    }
  }, [])

  useEffect(() => {
    // Track navigation changes
    const currentPath = pathname + (typeof window !== 'undefined' ? window.location.hash : '')
    navigationHistory.push(currentPath)
  }, [pathname])

  // Listen for hash changes (section navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const currentPath = pathname + window.location.hash
      navigationHistory.push(currentPath)
    }

    window.addEventListener('hashchange', handleHashChange)
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [pathname])

  return null // This component doesn't render anything
}