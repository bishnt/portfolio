"use client"

// Simple navigation history tracker for client-side routing
class NavigationHistory {
  private static instance: NavigationHistory
  private history: string[] = []
  private maxHistorySize = 10

  private constructor() {
    // Initialize with current location if available
    if (typeof window !== 'undefined') {
      this.history.push(window.location.pathname + window.location.hash)
    }
  }

  static getInstance(): NavigationHistory {
    if (!NavigationHistory.instance) {
      NavigationHistory.instance = new NavigationHistory()
    }
    return NavigationHistory.instance
  }

  push(path: string) {
    // Don't add duplicate consecutive entries
    if (this.history[this.history.length - 1] !== path) {
      this.history.push(path)
      
      // Keep history size manageable
      if (this.history.length > this.maxHistorySize) {
        this.history.shift()
      }
    }
  }

  // Special method to track section navigation from homepage
  pushWithCurrentSection(path: string) {
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      
      // If we're on the homepage and about to navigate to a detail page,
      // try to capture the current active section
      if (currentPath === '/' || currentPath === '') {
        const activeSection = this.getCurrentActiveSection()
        if (activeSection) {
          // Update the current entry to include the section
          const updatedCurrentPath = `/#${activeSection}`
          // Replace the last entry if it's the homepage without section
          if (this.history.length > 0 && (this.history[this.history.length - 1] === '/' || this.history[this.history.length - 1] === '')) {
            this.history[this.history.length - 1] = updatedCurrentPath
          } else {
            this.push(updatedCurrentPath)
          }
        }
      }
      
      this.push(path)
    }
  }

  // Helper to determine the currently active section based on scroll position
  private getCurrentActiveSection(): string | null {
    if (typeof window === 'undefined') return null
    
    const sections = ['home', 'about', 'projects', 'education', 'blog', 'contact', 'proof-of-work', 'social-feed']
    const scrollPosition = window.scrollY + 150
    
    let currentSection = 'home'
    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const offsetTop = element.offsetTop
        const offsetHeight = element.offsetHeight
        
        if (scrollPosition >= offsetTop - offsetHeight * 0.3) {
          currentSection = section
        }
      }
    }
    
    return currentSection
  }

  getPrevious(): string | null {
    // Return the second-to-last entry (previous page)
    return this.history.length >= 2 ? this.history[this.history.length - 2] : null
  }

  getCurrent(): string | null {
    return this.history.length > 0 ? this.history[this.history.length - 1] : null
  }

  canGoBack(): boolean {
    return this.history.length >= 2
  }

  clear() {
    this.history = []
  }
}

export const navigationHistory = NavigationHistory.getInstance()