"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import Link from "next/link"

export default function Blog() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

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

  return (
    <section id="blog" className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 font-mono">
            BLOG<span className="text-white/60">.POSTS</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/70 font-mono text-sm max-w-2xl mx-auto leading-relaxed"
          >
            Thoughts, insights, and experiences from my journey in technology, engineering, and creativity. 
            Sharing knowledge through detailed articles and personal reflections.
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogPosts.map((post, index) => (
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
              className="border border-white/20 p-4 sm:p-6 hover:border-white/40 hover:scale-105 hover:shadow-xl hover:shadow-white/10 transition-all duration-300 group cursor-pointer"
            >
              <Link href={typeof post.id === "string" ? `/blog/${post.id}` : "#"}>
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs px-2 py-1 border border-white/20 text-white/60 font-mono">
                      {post.category}
                    </span>
                    <span className="text-xs text-white/50 font-mono">{post.readTime}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-mono mb-3 group-hover:text-white/80 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-white/70 text-sm leading-relaxed mb-4">{post.excerpt}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
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
        </div>


      </div>
    </section>
  )
}