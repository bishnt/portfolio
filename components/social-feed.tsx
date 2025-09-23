"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Heart, MessageCircle, Share, ExternalLink } from "lucide-react"
import Image from "next/image"

// Social Media SVG Icons
const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const LinkedInIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

interface SocialPost {
  id: string
  platform: 'instagram' | 'twitter' | 'linkedin'
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  date: string
  url: string
}

export default function SocialFeed() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  // Available images from your public folder
  const availableImages = [
    "/black.png",
    "/dark-knight.jpg", 
    "/wolf.jpg",
    "/socialnetwork.jpg",
    "/oppenheimer.jpg",
    "/highway.jpg",
    "/sweet.jpg",
    "/halka.jpg"
  ]

  // Function to get random image
  const getRandomImage = () => {
    return availableImages[Math.floor(Math.random() * availableImages.length)]
  }

  // Social media posts with random images
  const socialPosts: SocialPost[] = [
    {
      id: "1",
      platform: "instagram",
      content: "आफ्नै पुर्खौली घरको पराई बन्न पुगेको म पछिल्लो सालहरुमा चाधपर्व अतिरिक्त अरु कुनै समयमा यहाँ पुगेको सम्झना भने आएन ; यसपल्ट घर पुग्दा मेरो अनुभव अलिक भिन्न प्रकारको हुन पुग्यो।",
      image: "/insta1.jpg",
      likes: 25,
      comments: 1,
      shares: 8,
      date: "2024-09-29",
      url: "https://www.instagram.com/bishrant_"
    },
    {
      id: "2",
      platform: "twitter",
      content: "Just finished implementing a new authentication system using JWTs. The security implications are fascinating! Thread below 🧵",
      likes: 89,
      comments: 15,
      shares: 32,
      date: "2025-01-12",
      url: ""
    },
    {
      id: "3",
      platform: "linkedin",
      content: "Electrified to announce that I, along with my team—Shishir Poudel, Adhish Paudel, Mausham Sigdel, won the “Best Emerging Team” title in the Electric Grid Hackathon held during DELTA 5.0 on the theme “Technology in Agriculture and Innovation” on Magh 18th, 19th, and 20th at IOE-Eastern Region Campus, Dharan.",
      image: "/link1.jpg",
      likes: 156,
      comments: 41,
      shares: 67,
      date: "2024-07-10",
      url: "https://www.linkedin.com/posts/bishnt_electrified-to-announce-that-i-along-with-activity-7292187677238448131-OlGB?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFKPxuUBGXOij_vRx0-JJDe_KTug3Ig5y0g"
    },
    {
      id: "4",
      platform: "instagram",
      content: "Hacked the way through the east",
      image: "/insta2.jpg",
      likes: 203,
      comments: 34,
      shares: 12,
      date: "2025-01-08",
      url: "https://www.instagram.com/bishrant_"
    },
    {
      id: "5",
      platform: "twitter",
      content: "Hot take: The future of engineering lies in the seamless integration of AI and traditional problem-solving methods. What do you think?",
      likes: 245,
      comments: 78,
      shares: 91,
      date: "2025-01-05",
      url: ""
    },
    {
      id: "6",
      platform: "linkedin",
      content: "I recently developed a simple food delivery website to strengthen my skills in HTML, CSS, and JavaScript. This project helped me practice foundational concepts, test my understanding, and put my knowledge into action with real code. I incorporated React only to experiment with Particle.js and enhance the visual appeal. This projects helped to clear a lot of fundamentals.",
      image: "/link2.jpg",
      likes: 12,
      comments: 6,
      shares: 8,
      date: "2025-01-03",
      url: "https://www.linkedin.com/posts/bishnt_i-recently-developed-a-simple-food-delivery-activity-7257573751725191168-fXnQ?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAFKPxuUBGXOij_vRx0-JJDe_KTug3Ig5y0g"
    },

  ]

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return (
          <div className="w-8 h-8 border border-white/30 rounded-lg flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all duration-200">
            <InstagramIcon />
          </div>
        )
      case 'twitter':
        return (
          <div className="w-8 h-8 border border-white/30 rounded-lg flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all duration-200">
            <TwitterIcon />
          </div>
        )
      case 'linkedin':
        return (
          <div className="w-8 h-8 border border-white/30 rounded-lg flex items-center justify-center text-white hover:border-white hover:bg-white/10 transition-all duration-200">
            <LinkedInIcon />
          </div>
        )
      default:
        return null
    }
  }

  const getPlatformColor = (platform: string) => {
    // Monochrome design - all platforms use the same white/gray color scheme
    return 'from-white/10 to-white/5 border-white/20 hover:border-white/40 hover:from-white/15 hover:to-white/10'
  }

  return (
    <section id="social-feed" className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-6 sm:mb-8 font-mono">
            SOCIAL<span className="text-white/60">.FEED</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden sm:block text-white/70 font-mono text-sm max-w-2xl mx-auto leading-relaxed"
          >
            Stay connected with my latest thoughts, projects, and insights across social platforms. 
            Follow along for real-time updates on my engineering and creative journey.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {socialPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50, scale: 0.8, rotateY: -15 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : {}}
              transition={{ 
                duration: 0.4, 
                delay: 0.1 + index * 0.05,
                type: "spring",
                stiffness: 200
              }}
              className={`social-post bg-gradient-to-br ${getPlatformColor(post.platform)} border rounded-lg p-4 sm:p-5 lg:p-6 hover:scale-[1.02] sm:hover:scale-105 hover:shadow-xl hover:shadow-white/10 transition-all duration-300 group cursor-pointer`}
              onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}
              data-clickable="true"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getPlatformIcon(post.platform)}
                  <div>
                    <div className="font-mono text-sm text-white/90 capitalize">
                      {post.platform}
                    </div>
                    <div className="text-xs text-white/60 font-mono">
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
              </div>

              {/* Content */}
              <p className="text-white/80 text-sm leading-relaxed mb-4 line-clamp-4">
                {post.content}
              </p>

              {/* Image if available */}
              {post.image && (
                <div className="mb-4 rounded-lg overflow-hidden bg-white/5 relative aspect-video">
                  <Image
                    src={post.image}
                    alt="Social media post"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
              )}

              {/* Engagement Stats */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
                    <span className="text-xs text-white/60 font-mono">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
                    <span className="text-xs text-white/60 font-mono">{post.comments}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Share className="w-4 h-4 text-white/60 hover:text-white transition-colors" />
                    <span className="text-xs text-white/60 font-mono">{post.shares}</span>
                  </div>
                </div>
                <div className="text-xs text-white/40 font-mono group-hover:text-white/80 transition-colors">
                  View Post →
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12 sm:mt-16"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="https://www.instagram.com/bishrant_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-mono text-sm rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <InstagramIcon />
              Follow on Instagram
            </motion.a>
            <motion.a
              href="https://www.x.com/bishrant_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-mono text-sm rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <TwitterIcon />
              Follow on X
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/bishnt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-mono text-sm rounded-lg hover:border-white hover:bg-white/10 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <LinkedInIcon />
              Connect on LinkedIn
            </motion.a>
          </div>
        </motion.div>
        
      </div>
    </section>
  )
}