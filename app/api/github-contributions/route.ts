import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get('username') || 'bishnt'
    
    // Try multiple methods to fetch GitHub contributions
    
    // Method 1: GitHub GraphQL API (if token is available)
    const token = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN
    
    if (token) {
      try {
        const today = new Date()
        const oneYearAgo = new Date(today)
        oneYearAgo.setFullYear(today.getFullYear() - 1)
        oneYearAgo.setDate(oneYearAgo.getDate() + 1)
        
        const query = `
          query {
            user(login: "${username}") {
              contributionsCollection(from: "${oneYearAgo.toISOString()}", to: "${today.toISOString()}") {
                contributionCalendar {
                  totalContributions
                  weeks {
                    contributionDays {
                      date
                      contributionCount
                      color
                      weekday
                    }
                  }
                }
              }
            }
          }
        `

        const response = await fetch('https://api.github.com/graphql', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'User-Agent': 'Portfolio-Website'
          },
          body: JSON.stringify({ query })
        })

        if (response.ok) {
          const result = await response.json()
          if (result.data?.user?.contributionsCollection?.contributionCalendar) {
            const calendar = result.data.user.contributionsCollection.contributionCalendar
            
            // Transform GraphQL data to our format
            const weeks = calendar.weeks.map((week: any) => ({
              contributionDays: week.contributionDays.map((day: any) => ({
                date: day.date,
                count: day.contributionCount,
                level: getContributionLevel(day.contributionCount)
              }))
            }))
            
            return NextResponse.json({
              success: true,
              source: 'github-graphql',
              totalContributions: calendar.totalContributions,
              contributions: weeks
            })
          }
        }
      } catch (error) {
        console.log('GraphQL API failed:', error)
      }
    }

    // Method 2: GitHub Contributions API
    try {
      const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Portfolio-Website'
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.contributions) {
          return NextResponse.json({
            success: true,
            source: 'contributions-api',
            totalContributions: data.total || calculateTotal(data.contributions),
            contributions: data.contributions
          })
        }
      }
    } catch (error) {
      console.log('Contributions API failed:', error)
    }

    // Method 3: GitHub Events API
    try {
      const response = await fetch(`https://api.github.com/users/${username}/events?per_page=300`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-Website',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      })

      if (response.ok) {
        const events = await response.json()
        const contributionData = processGitHubEvents(events)
        
        return NextResponse.json({
          success: true,
          source: 'github-events',
          totalContributions: contributionData.total,
          contributions: contributionData.weeks
        })
      }
    } catch (error) {
      console.log('GitHub Events API failed:', error)
    }

    // Method 4: Alternative GitHub Contributions API
    try {
      const response = await fetch(`https://github-contributions.vercel.app/api/v1/${username}`, {
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Portfolio-Website'
        }
      })

      if (response.ok) {
        const data = await response.json()
        if (data.contributions) {
          return NextResponse.json({
            success: true,
            source: 'alternative-api',
            totalContributions: data.total || calculateTotal(data.contributions),
            contributions: data.contributions
          })
        }
      }
    } catch (error) {
      console.log('Alternative API failed:', error)
    }

    // If all methods fail, return mock data
    const mockData = generateMockData()
    return NextResponse.json({
      success: true,
      source: 'mock-data',
      totalContributions: mockData.total,
      contributions: mockData.weeks
    })

  } catch (error) {
    console.error('API route error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contributions' },
      { status: 500 }
    )
  }
}

function getContributionLevel(count: number): number {
  if (count === 0) return 0
  if (count <= 2) return 1
  if (count <= 4) return 2
  if (count <= 6) return 3
  return 4
}

function calculateTotal(weeks: any[]): number {
  return weeks.reduce((sum, week) => {
    return sum + week.contributionDays.reduce((weekSum: number, day: any) => {
      return weekSum + (day.count || 0)
    }, 0)
  }, 0)
}

function processGitHubEvents(events: any[]) {
  const contributionMap = new Map<string, number>()
  const today = new Date()
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(today.getFullYear() - 1)
  oneYearAgo.setDate(oneYearAgo.getDate() + 1)
  
  // Initialize all days with 0 contributions
  const startDate = new Date(oneYearAgo)
  startDate.setDate(startDate.getDate() - startDate.getDay())
  
  let currentDate = new Date(startDate)
  while (currentDate <= today) {
    const dateStr = currentDate.toISOString().split('T')[0]
    contributionMap.set(dateStr, 0)
    currentDate.setDate(currentDate.getDate() + 1)
  }

  // Count contributions from events
  events.forEach(event => {
    const eventDate = new Date(event.created_at).toISOString().split('T')[0]
    if (contributionMap.has(eventDate)) {
      const currentCount = contributionMap.get(eventDate) || 0
      contributionMap.set(eventDate, currentCount + 1)
    }
  })

  // Convert to weeks format
  const weeks: any[] = []
  currentDate = new Date(startDate)
  let totalCount = 0
  
  while (currentDate <= today) {
    const week: any = { contributionDays: [] }
    
    for (let i = 0; i < 7; i++) {
      const dateStr = currentDate.toISOString().split('T')[0]
      const count = contributionMap.get(dateStr) || 0
      const level = getContributionLevel(count)
      
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
  
  return { weeks, total: totalCount }
}

function generateMockData() {
  const weeks: any[] = []
  const today = new Date()
  const oneYearAgo = new Date(today)
  oneYearAgo.setFullYear(today.getFullYear() - 1)
  oneYearAgo.setDate(oneYearAgo.getDate() + 1)
  
  const startDate = new Date(oneYearAgo)
  startDate.setDate(startDate.getDate() - startDate.getDay())
  
  let currentDate = new Date(startDate)
  let totalCount = 0
  
  // Use seeded random for consistent mock data
  const seed = 12345
  let randomSeed = seed
  const seededRandom = () => {
    randomSeed = (randomSeed * 9301 + 49297) % 233280
    return randomSeed / 233280
  }
  
  while (currentDate <= today) {
    const week: any = { contributionDays: [] }
    
    for (let i = 0; i < 7; i++) {
      const dateStr = currentDate.toISOString().split('T')[0]
      
      let count = 0
      const dayOfWeek = currentDate.getDay()
      const random = seededRandom()
      
      // Less activity on weekends, more on weekdays
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        count = random < 0.3 ? Math.floor(random * 3) : 0
      } else {
        count = random < 0.7 ? Math.floor(random * 8) : 0
      }
      
      const level = getContributionLevel(count)
      
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
  
  return { weeks, total: totalCount }
}
