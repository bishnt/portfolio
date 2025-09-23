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