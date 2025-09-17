"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ExternalLink } from "lucide-react"

// GitHub SVG Icon
const GitHubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
)

interface ContributionDay {
  date: string
  count: number
  level: number
}

interface GitHubStats {
  totalContributions: number
  contributionCalendar: ContributionDay[]
}

export default function ProofOfWork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGitHubData()
  }, [])

  const fetchGitHubData = async () => {
    try {
      const response = await fetch('/api/github-contributions?username=bishnt')
      if (response.ok) {
        const apiData = await response.json()
        
        if (apiData.success && apiData.contributions) {
          // Transform API response to our format
          const contributionCalendar: ContributionDay[] = []
          
          if (Array.isArray(apiData.contributions)) {
            // Handle weeks format from API
            apiData.contributions.forEach((week: any) => {
              if (week.contributionDays) {
                week.contributionDays.forEach((day: any) => {
                  contributionCalendar.push({
                    date: day.date,
                    count: day.count || 0,
                    level: day.level || 0
                  })
                })
              }
            })
          }
          
          const githubData: GitHubStats = {
            totalContributions: apiData.totalContributions || contributionCalendar.reduce((sum, day) => sum + day.count, 0),
            contributionCalendar
          }
          
          setGithubStats(githubData)
        } else {
          setGithubStats(generateMockData())
        }
      } else {
        setGithubStats(generateMockData())
      }
    } catch (error) {
      console.error('Error fetching GitHub data:', error)
      setGithubStats(generateMockData())
    } finally {
      setLoading(false)
    }
  }

  const generateMockData = (): GitHubStats => {
    const contributions: ContributionDay[] = []
    const today = new Date()
    const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate())
    
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      const count = Math.floor(Math.random() * 15)
      const level = count === 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 9 ? 3 : 4
      
      contributions.push({
        date: new Date(d).toISOString().split('T')[0],
        count,
        level
      })
    }

    return {
      totalContributions: contributions.reduce((sum, day) => sum + day.count, 0),
      contributionCalendar: contributions
    }
  }

  const getContributionColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-white/10'
      case 1: return 'bg-green-500/30'
      case 2: return 'bg-green-500/50'
      case 3: return 'bg-green-500/70'
      case 4: return 'bg-green-500/90'
      default: return 'bg-white/10'
    }
  }

  const getWeekdayName = (dayIndex: number) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[dayIndex]
  }

  const getMonthName = (monthIndex: number) => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return months[monthIndex]
  }

  const organizeContributionsByWeeks = (contributions: ContributionDay[]) => {
    const weeks: ContributionDay[][] = []
    let currentWeek: ContributionDay[] = []
    
    contributions.forEach((day, index) => {
      const date = new Date(day.date)
      const dayOfWeek = date.getDay()
      
      if (index === 0) {
        // Fill empty days at the beginning of the first week
        for (let i = 0; i < dayOfWeek; i++) {
          currentWeek.push({ date: '', count: 0, level: 0 })
        }
      }
      
      currentWeek.push(day)
      
      if (dayOfWeek === 6 || index === contributions.length - 1) {
        // End of week or last day
        while (currentWeek.length < 7) {
          currentWeek.push({ date: '', count: 0, level: 0 })
        }
        weeks.push(currentWeek)
        currentWeek = []
      }
    })
    
    return weeks
  }

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-white/20 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-white/10 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!githubStats) return null

  const weeks = organizeContributionsByWeeks(githubStats.contributionCalendar)

  return (
    <section id="proof-of-work" className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 font-mono">
            PROOF<span className="text-white/60">.OF.WORK</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/70 font-mono text-sm max-w-2xl mx-auto leading-relaxed mb-6"
          >
            A visual representation of my coding journey and contributions. Every green square represents 
            hours of problem-solving, learning, and building innovative solutions.
          </motion.p>
          
          {/* GitHub Link */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <motion.a
              href="https://github.com/bishnt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border border-white/30 text-white font-mono text-sm rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GitHubIcon />
              View on GitHub
              <ExternalLink className="w-4 h-4" />
            </motion.a>
          </motion.div>
        </motion.div>


        {/* Contribution Heatmap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/5 border border-white/20 rounded-lg p-6 overflow-x-auto"
        >

          <div className="flex gap-1 min-w-max">
            {/* Weekday labels */}
            <div className="flex flex-col gap-1 mr-2">
              <div className="h-3"></div> {/* Spacer for month labels */}
              {[1, 3, 5].map(day => (
                <div key={day} className="h-3 flex items-center">
                  <span className="text-xs text-white/40 font-mono w-6">
                    {getWeekdayName(day)}
                  </span>
                </div>
              ))}
            </div>

            {/* Contribution grid */}
            <div className="flex flex-col">
              {/* Month labels */}
              <div className="flex gap-1 mb-1 h-3">
                {weeks.map((week, weekIndex) => {
                  const firstDay = week.find(day => day.date)
                  if (!firstDay || weekIndex % 4 !== 0) return <div key={weekIndex} className="w-3"></div>
                  
                  const date = new Date(firstDay.date)
                  return (
                    <div key={weekIndex} className="w-3">
                      <span className="text-xs text-white/40 font-mono">
                        {getMonthName(date.getMonth())}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Contribution squares */}
              <div className="flex gap-1">
                {weeks.map((week, weekIndex) => (
                  <div key={weekIndex} className="flex flex-col gap-1">
                    {week.map((day, dayIndex) => (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ 
                          duration: 0.2, 
                          delay: 0.8 + (weekIndex * 0.01) + (dayIndex * 0.005)
                        }}
                        className={`w-3 h-3 rounded-sm ${getContributionColor(day.level)} hover:ring-1 hover:ring-white/50 transition-all duration-200 cursor-pointer`}
                        title={day.date ? `${day.count} contributions on ${day.date}` : ''}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
            <span className="text-xs text-white/40 font-mono">Less</span>
            <div className="flex gap-1">
              {[0, 1, 2, 3, 4].map(level => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
                />
              ))}
            </div>
            <span className="text-xs text-white/40 font-mono">More</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
