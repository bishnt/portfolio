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

interface GitHubCommit {
  sha: string
  message: string
  date: string
  repo: string
  url: string
}

interface GitHubStats {
  totalContributions: number
  contributionCalendar: ContributionDay[]
  recentCommits: GitHubCommit[]
}

export default function ProofOfWork() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [githubStats, setGithubStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [commitsLoading, setCommitsLoading] = useState(true)

  useEffect(() => {
    fetchGitHubData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Auto-scroll heatmap to the right on mobile after data loads
    if (githubStats) {
      const timer = setTimeout(() => {
        const heatmapContainer = document.querySelector('.heatmap-container')
        if (heatmapContainer && window.innerWidth < 768) {
          heatmapContainer.scrollLeft = heatmapContainer.scrollWidth - heatmapContainer.clientWidth
        }
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [githubStats])


  const getMockCommits = (): GitHubCommit[] => [
    {
      sha: "8018b09",
      message: "chore: add initial Dockerfile and requirements",
      date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      repo: "smart-grid-ai",
      url: "https://github.com/bishnt/smart-grid-ai"
    },
    {
      sha: "6a77e5e",
      message: "fix: GitHub commits integration and remove glitchy skills animations",
      date: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      repo: "portfolio",
      url: "https://github.com/bishnt/portfolio"
    },
    {
      sha: "5238df0",
      message: "feat: add pagination in multiple sections",
      date: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
      repo: "portfolio",
      url: "https://github.com/bishnt/portfolio"
    },
    {
      sha: "b834a4b",
      message: "feat: implement initial AI model structure",
      date: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
      repo: "smart-grid-ai",
      url: "https://github.com/bishnt/smart-grid-ai"
    }
  ]

  const fetchGitHubData = async () => {
    setCommitsLoading(true)
    
    try {
      // Fetch both contributions and commits from the unified API
      const response = await fetch('/api/github-contributions?username=bishnt&commits=true')
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
            contributionCalendar,
            recentCommits: apiData.recentCommits || getMockCommits()
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
      setCommitsLoading(false)
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
      contributionCalendar: contributions,
      recentCommits: getMockCommits()
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

  const formatCommitDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) {
      return "just now"
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`
    }
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-6 sm:mb-8 font-mono">
            PROOF<span className="text-white/60">.OF.WORK</span>
          </h2>
          
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
          className="bg-white/5 border border-white/20 rounded-lg p-6 overflow-x-auto heatmap-container"
          style={{ scrollbarWidth: 'thin' }}
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

        {/* Recent Commits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8"
        >
          <div className="bg-white/5 border border-white/20 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-mono text-white">
                Recent Commits
              </h3>
              <motion.a
                href="https://github.com/bishnt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-white/30 text-white font-mono text-sm rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                See more on GitHub
                <ExternalLink className="w-4 h-4" />
              </motion.a>
            </div>

            {commitsLoading ? (
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-start gap-4 p-4 border border-white/10 rounded-lg">
                      <div className="w-16 h-4 bg-white/20 rounded"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-white/20 rounded mb-2"></div>
                        <div className="h-3 bg-white/10 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {githubStats?.recentCommits?.map((commit, index) => (
                  <motion.a
                    key={commit.sha}
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    className="flex items-start gap-4 p-4 border border-white/10 rounded-lg hover:border-white/30 hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="flex-shrink-0">
                        <span className="font-mono text-xs text-white/60 bg-white/10 px-2 py-1 rounded">
                          {commit.sha}
                        </span>
                      </div>
                      
                      <div className="min-w-0 flex-1">
                        <div className="font-mono text-sm text-white group-hover:text-white/90 transition-colors truncate">
                          {commit.message}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="font-mono text-xs text-white/50">
                            {commit.repo}
                          </span>
                          <span className="text-white/30">•</span>
                          <span className="font-mono text-xs text-white/50">
                            {formatCommitDate(commit.date)}
                          </span>
                        </div>
                      </div>
                      
                      <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors flex-shrink-0" />
                    </div>
                  </motion.a>
                ))}

                {(!githubStats?.recentCommits || githubStats.recentCommits.length === 0) && (
                  <div className="text-center py-8">
                    <p className="font-mono text-sm text-white/50">
                      No recent commits found
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

      </div>
    </section>
  )
}
