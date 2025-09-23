"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [formStatus, setFormStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus('')

    // Validate form
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus('Please fill in all fields')
      setIsSubmitting(false)
      return
    }

    try {
 
      const response = await fetch('https://formspree.io/f/myzppdlb', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _to: 'bishrant150@gmail.com'
        })
      })

      if (response.ok) {
        setFormStatus('success')
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        setFormStatus('error')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 xl:py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 lg:mb-8 font-mono">
            CONTACT<span className="text-white/60">.ME</span>
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden sm:block text-white/70 font-mono text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed px-2 sm:px-0"
          >
            Let&apos;s collaborate on something amazing. Whether it&apos;s a project, opportunity, or just a conversation about
            technology, engineering, or creative ideas - I&apos;d love to hear from you.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.8 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1, type: "spring", stiffness: 200 }}
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 font-mono">{"> GET IN TOUCH"}</h3>

            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <motion.div 
                className="flex items-center space-x-3 sm:space-x-4 group cursor-pointer touch-manipulation"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border border-white/20 flex items-center justify-center font-mono text-xs sm:text-sm group-hover:border-white/40 transition-colors duration-200"
                  whileHover={{ rotate: 5 }}
                >
                  @
                </motion.div>
                <div>
                  <div className="font-mono text-xs sm:text-sm text-white/60">EMAIL</div>
                  <div className="text-xs sm:text-sm lg:text-base text-white break-all">bishrant150@gmail.com</div>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-3 sm:space-x-4 group cursor-pointer touch-manipulation"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border border-white/20 flex items-center justify-center font-mono text-xs sm:text-sm group-hover:border-white/40 transition-colors duration-200"
                  whileHover={{ rotate: 5 }}
                >
                  in
                </motion.div>
                <div>
                  <div className="font-mono text-xs sm:text-sm text-white/60">LINKEDIN</div>
                  <div className="text-xs sm:text-sm lg:text-base text-white break-all">linkedin.com/in/bishnt</div>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center space-x-3 sm:space-x-4 group cursor-pointer touch-manipulation"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border border-white/20 flex items-center justify-center font-mono text-xs sm:text-sm group-hover:border-white/40 transition-colors duration-200"
                  whileHover={{ rotate: 5 }}
                >
                  {"</>"}
                </motion.div>
                <div>
                  <div className="font-mono text-xs sm:text-sm text-white/60">GITHUB</div>
                  <div className="text-xs sm:text-sm lg:text-base text-white break-all">github.com/bishnt</div>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 sm:mt-8 lg:mt-12 p-3 sm:p-4 lg:p-6 border border-white/20 bg-white/5"
            >
              <h4 className="font-mono text-sm sm:text-base lg:text-lg mb-2 sm:mb-3 lg:mb-4">Current Status</h4>
              <p className="text-xs sm:text-sm lg:text-base text-white/80 mb-2 sm:mb-3 lg:mb-4">
                 {'>'} Studying Electrical Engineering at IOE Pulchowk
              </p>
              <p className="text-xs sm:text-sm lg:text-base text-white/80 mb-2 sm:mb-3 lg:mb-4">
                 {'>'} Open to internships,work and project collaboration opportunities
              </p>
              <p className="text-xs sm:text-sm lg:text-base text-white/80">
                {'>'} Always excited to discuss innovative ideas and solutions
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-mono text-white/60 mb-1.5 sm:mb-2">NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:border-white/40 focus:outline-none font-mono text-sm touch-manipulation"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono text-white/60 mb-1.5 sm:mb-2">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:border-white/40 focus:outline-none font-mono text-sm touch-manipulation"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono text-white/60 mb-1.5 sm:mb-2">SUBJECT</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:border-white/40 focus:outline-none font-mono text-sm touch-manipulation"
                  placeholder="Project collaboration"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono text-white/60 mb-1.5 sm:mb-2">MESSAGE</label>
                <textarea
                  rows={4}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:border-white/40 focus:outline-none font-mono resize-none text-sm touch-manipulation min-h-[100px] sm:min-h-[120px]"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              {formStatus === 'success' && (
                <div className="p-2.5 sm:p-3 border border-white/40 bg-white/10 text-white font-mono text-xs sm:text-sm">
                  {'>'} Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}

              {formStatus === 'error' && (
                <div className="p-2.5 sm:p-3 border border-white/20 bg-white/5 text-white/80 font-mono text-xs sm:text-sm">
                  {'>'} Error sending message. Please try again or email me directly.
                </div>
              )}

              {formStatus && formStatus !== 'success' && formStatus !== 'error' && (
                <div className="p-2.5 sm:p-3 border border-white/30 bg-white/5 text-white/70 font-mono text-xs sm:text-sm">
                  {'>'} {formStatus}
                </div>
              )}

              <motion.button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full px-4 sm:px-6 lg:px-8 py-3 sm:py-3.5 bg-white text-black hover:bg-white/90 transition-all duration-300 font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-h-[44px]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
