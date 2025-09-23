"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import PageLoader, { usePageLoader } from "./page-loader"

export default function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [currentPage, setCurrentPage] = useState(0)
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null)
  const POSTS_PER_PAGE = 6 // 2 rows × 3 columns
  const { isLoading, startLoading, stopLoading } = usePageLoader()

  const blogPosts = [
    {
      id: "dyanamic-web-authentication",
      title: "Dyanamic Web Authentications Using JWTs",
      excerpt: "A deep dive into implementing secure and scalable authentication systems using JSON Web Tokens in modern web applications.",
      date: "2025-01-15",
      category: "Web Development",
      readTime: "8 min read",
      tags: ["Backend", "Auth", "JWT"],
    },
    {
      id: "nextjs-scalable-apps",
      title: "Building Scalable Web Applications with Next.js",
      excerpt:
        "A comprehensive guide to creating performant and scalable web applications using modern React frameworks.",
      date: "2024-01-10",
      category: "Web Development",
      readTime: "8 min read",
      tags: ["Next.js", "React", "Performance"],
    },
    {
      id: "oppenheimer",
      title: "Inside the Mind of The American Prometheus",
      excerpt:
        "Exploring the life and legacy of J. Robert Oppenheimer, the father of the atomic bomb, and his complex moral dilemmas.",
      date: "2025-06-05",
      category: "Movies",
      readTime: "10 min read",
      tags: ["Oppenheimer", "Psychology", "Cinema"],
    },

    {
      id: "video-editing",
      title: "Video Editing: From Hobby to Professional Skill",
      excerpt: "My journey from casual video editing to developing professional-grade content creation skills.",
      date: "2025-01-03",
      category: "Creative",
      readTime: "12 min read",
      tags: ["Video Editing", "Creative Process", "Skills"],
    },

  ]

  // Pagination helper functions
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE)
  const getCurrentPosts = () => {
    const startIndex = currentPage * POSTS_PER_PAGE
    const endIndex = startIndex + POSTS_PER_PAGE
    return blogPosts.slice(startIndex, endIndex)
  }

  // Auto-slide functionality
  const startAutoSlide = () => {
    if (autoSlideRef.current) {
      clearTimeout(autoSlideRef.current)
    }
    if (totalPages > 1) {
      autoSlideRef.current = setTimeout(() => {
        setCurrentPage((prev) => (prev + 1) % totalPages)
      }, 8000)
    }
  }

  const resetAutoSlide = () => {
    if (autoSlideRef.current) {
      clearTimeout(autoSlideRef.current)
    }
    startAutoSlide()
  }

  // Navigation functions
  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages)
    resetAutoSlide()
  }

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages)
    resetAutoSlide()
  }

  // Effect for auto-slide
  useEffect(() => {
    startAutoSlide()
    return () => {
      if (autoSlideRef.current) {
        clearTimeout(autoSlideRef.current)
      }
    }
  }, [currentPage])

  return (
    <>
      <PageLoader isLoading={isLoading} loadingText="Loading blog post..." />
      <section id="blog" className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20"
        >
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 lg:mb-8 font-mono">
            BLOG<span className="text-white/60">.POSTS</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/70 font-mono text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            Thoughts, insights, and experiences from my journey in technology, engineering, and creativity. 
            Sharing knowledge through detailed articles and personal reflections.
          </motion.p>
        </motion.div>

        {/* Blog Grid with Pagination */}
        <div className="relative">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            {getCurrentPosts().map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50, scale: 0.8, rotateY: -15 }}
                animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.1 + index * 0.05,
                  type: "spring",
                  stiffness: 200
                }}
                className="border border-white/20 p-3 sm:p-4 lg:p-6 hover:border-white/40 hover:shadow-xl hover:shadow-white/10 transition-all duration-300 group cursor-pointer touch-manipulation"
              >
              <Link 
                href={typeof post.id === "string" ? `/blog/${post.id}` : "#"}
                onClick={(e) => {
                  if (typeof post.id === "string") {
                    startLoading()
                    // Stop loading after a short delay to allow for page transition
                    setTimeout(() => stopLoading(), 500)
                  } else {
                    e.preventDefault()
                  }
                }}
              >
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs px-2 py-1 border border-white/20 text-white/60 font-mono">
                        {post.category}
                      </span>
                      <span className="text-xs text-white/50 font-mono">{post.readTime}</span>
                    </div>

                    <h3 className="text-base sm:text-lg lg:text-xl font-bold font-mono mb-2 sm:mb-3 group-hover:text-white/80 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                      {post.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-1 bg-white/5 text-white/50 font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-white/50 font-mono">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span className="text-sm font-mono group-hover:text-white transition-colors">
                        {typeof post.id === "string" ? "READ MORE →" : "COMING SOON"}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
          
          {/* Navigation Controls - Only show if there are multiple pages */}
          {totalPages > 1 && (
            <>
              <button
                onClick={prevPage}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 sm:-translate-x-12 w-8 h-8 sm:w-10 sm:h-10 border border-white/20 flex items-center justify-center rounded-full touch-manipulation"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={nextPage}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 sm:translate-x-12 w-8 h-8 sm:w-10 sm:h-10 border border-white/20 flex items-center justify-center rounded-full touch-manipulation"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              
              {/* Page Indicators */}
              <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
                {Array.from({ length: totalPages }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentPage(index)
                      resetAutoSlide()
                    }}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full touch-manipulation ${
                      currentPage === index
                        ? "bg-white scale-110 sm:scale-125"
                        : "bg-white/30"
                    }`}
                  />
                ))}
              </div>
              
              {/* Page Counter */}
              <div className="text-center mt-3 sm:mt-4">
                <span className="text-white/60 font-mono text-xs sm:text-sm">
                  Page {currentPage + 1} of {totalPages}
                </span>
              </div>
            </>
          )}
        </div>


      </div>
      </section>
    </>
  )
}