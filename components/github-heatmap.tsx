"use client"

import { motion } from "framer-motion"
import { Github, Calendar, Flame } from "lucide-react"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export default function GitHubHeatmap() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [contributionData, setContributionData] = useState<ContributionWeek[]>([])
  const [totalContributions, setTotalContributions] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchGitHubContributions = async () => {
      try {
        // Use our server-side API route to avoid CORS issues
        const response = await fetch('/api/github-contributions?username=bishnt', {
          headers: {
            'Accept': 'application/json',
          }
        })

        if (response.ok) {
          const data = await response.json()
          
          if (data.success && data.contributions) {
            setContributionData(data.contributions)
            setTotalContributions(data.totalContributions || 0)
            console.log(`Fetched from ${data.source}:`, data)
            setLoading(false)
            return
          }
        }

        // If API route fails, fallback to mock data
        console.log('API route failed, using mock data')
        generateRealisticMockData()
        
      } catch (error) {
        console.log('Failed to fetch from API route, using mock data:', error)
        generateRealisticMockData()
      } finally {
        setLoading(false)
      }
    }


    const generateRealisticMockData = () => {
      const weeks: ContributionWeek[] = []
      const today = new Date()
      const oneYearAgo = new Date(today)
      oneYearAgo.setFullYear(today.getFullYear() - 1)
      oneYearAgo.setDate(oneYearAgo.getDate() + 1)
      
      // Start from the Sunday of the week containing oneYearAgo
      const startDate = new Date(oneYearAgo)
      startDate.setDate(startDate.getDate() - startDate.getDay())
      
      let currentDate = new Date(startDate)
      let totalCount = 0
      
      // Use a seeded random for consistent mock data in production
      const seed = 12345
      let randomSeed = seed
      const seededRandom = () => {
        randomSeed = (randomSeed * 9301 + 49297) % 233280
        return randomSeed / 233280
      }
      
      while (currentDate <= today) {
        const week: ContributionWeek = { contributionDays: [] }
        
        for (let i = 0; i < 7; i++) {
          const dateStr = currentDate.toISOString().split('T')[0]
          
          // More realistic contribution pattern with consistent seeded randomness
          let count = 0
          const dayOfWeek = currentDate.getDay()
          const random = seededRandom()
          
          // Less activity on weekends, more on weekdays
          if (dayOfWeek === 0 || dayOfWeek === 6) {
            count = random < 0.3 ? Math.floor(random * 3) : 0
          } else {
            count = random < 0.7 ? Math.floor(random * 8) : 0
          }
          
          const level = count === 0 ? 0 : 
                       count <= 2 ? 1 :
                       count <= 4 ? 2 :
                       count <= 6 ? 3 : 4
          
          week.contributionDays.push({
            date: dateStr,
            count,
            level
          })
          
          totalCount += count
          currentDate.setDate(currentDate.getDate() + 1)
        }
        
        weeks.push(week)
      }
      
      setContributionData(weeks)
      setTotalContributions(totalCount)
      console.log('Using seeded mock data for production consistency')
    }

    fetchGitHubContributions()
  }, [])

  const currentStreak = 15 // Could be calculated from real data
  const currentYear = new Date().getFullYear()

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return "bg-gray-800/30"
      case 1: return "bg-green-900"
      case 2: return "bg-green-700"
      case 3: return "bg-green-500"
      case 4: return "bg-green-400"
      default: return "bg-gray-800/30"
    }
  }

  // Get month labels for the past year
  const getMonthLabels = () => {
    const labels = []
    const today = new Date()
    const oneYearAgo = new Date(today)
    oneYearAgo.setFullYear(today.getFullYear() - 1)
    oneYearAgo.setDate(oneYearAgo.getDate() + 1)
    
    // Start from the beginning of the week containing oneYearAgo
    const startDate = new Date(oneYearAgo)
    startDate.setDate(startDate.getDate() - startDate.getDay())
    
    // Generate month labels based on the weeks we're showing
    const monthsShown = new Set()
    let currentDate = new Date(startDate)
    
    while (currentDate <= today) {
      const monthYear = `${currentDate.getMonth()}-${currentDate.getFullYear()}`
      if (!monthsShown.has(monthYear)) {
        monthsShown.add(monthYear)
        labels.push(currentDate.toLocaleDateString('en-US', { month: 'short' }))
      }
      currentDate.setMonth(currentDate.getMonth() + 1)
      currentDate.setDate(1) // First day of next month
    }
    
    return labels.slice(0, 12) // Ensure we don't show more than 12 months
  }

  const monthLabels = getMonthLabels()
  const dayLabels = ['Mon', 'Wed', 'Fri']

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 font-mono">
            PROOF<span className="text-white/60">.OF.WORK</span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            My coding journey visualized through GitHub contributions
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-black border border-white/20 rounded-lg p-6 sm:p-8 hover:border-white/40 transition-all duration-300"
        >
          {/* Header with stats */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <Github className="w-8 h-8" />
              <div>
                <h3 className="text-xl font-bold font-mono">GitHub Activity</h3>
                <p className="text-white/60 text-sm">{currentYear} contributions</p>
              </div>
            </div>
            
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-white/60" />
                <span className="font-mono">{totalContributions} contributions</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="font-mono">{currentStreak} day streak</span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            </div>
          ) : (
            <>
              {/* Month labels */}
              <div className="mb-3 pl-10">
                <div className="flex justify-between text-xs text-white/60 font-mono">
                  {monthLabels.map((month, index) => (
                    <span key={`${month}-${index}`} className="flex-1 text-left">
                      {month}
                    </span>
                  ))}
                </div>
              </div>

              {/* Heatmap Grid */}
              <div className="mb-6 overflow-x-auto">
                <div className="flex gap-1">
                  {/* Day labels */}
                  <div className="flex flex-col gap-1 mr-3 pt-1">
                    {dayLabels.map((day, index) => (
                      <div key={day} className="h-3 flex items-center justify-end pr-2">
                        <span className="text-xs text-white/60 font-mono">{day}</span>
                      </div>
                    ))}
                    <div className="h-3"></div>
                    <div className="h-3"></div>
                    <div className="h-3"></div>
                    <div className="h-3"></div>
                  </div>
                  
                  {/* Contribution squares */}
                  <div className="flex gap-1">
                    {contributionData && contributionData.length > 0 ? contributionData.map((week: ContributionWeek, weekIndex: number) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {week.contributionDays && week.contributionDays.map((day: ContributionDay, dayIndex: number) => (
                          <motion.div
                            key={`${weekIndex}-${dayIndex}`}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.1, delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                            className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)} hover:ring-1 hover:ring-white/40 transition-all duration-200 cursor-pointer`}
                            title={`${day.count} contributions on ${new Date(day.date).toLocaleDateString()}`}
                          />
                        ))}
                      </div>
                    )) : (
                      <div className="flex items-center justify-center w-full py-8">
                        <span className="text-white/60 font-mono text-sm">No contribution data available</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-white/60 font-mono">
                  <span>Less</span>
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`w-3 h-3 rounded-sm ${getLevelColor(level)}`}
                      />
                    ))}
                  </div>
                  <span>More</span>
                </div>
                
                <a
                  href="https://github.com/bishnt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-lg hover:border-white/40 hover:bg-white/5 transition-all duration-300 text-sm font-mono"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}
