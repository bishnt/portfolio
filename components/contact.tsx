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
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 sm:mb-8 font-mono">
            CONTACT<span className="text-white/60">.ME</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl mx-auto">
            Let&apos;s collaborate on something amazing. Whether it&apos;s a project, opportunity, or just a conversation about
            technology.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 font-mono">{"> GET IN TOUCH"}</h3>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border border-white/20 flex items-center justify-center font-mono text-sm">
                  @
                </div>
                <div>
                  <div className="font-mono text-xs sm:text-sm text-white/60">EMAIL</div>
                  <div className="text-sm sm:text-base text-white">bishrant150@gmail.com</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border border-white/20 flex items-center justify-center font-mono text-sm">
                  in
                </div>
                <div>
                  <div className="font-mono text-xs sm:text-sm text-white/60">LINKEDIN</div>
                  <div className="text-sm sm:text-base text-white">linkedin.com/in/bishnt</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 border border-white/20 flex items-center justify-center font-mono text-sm">
                  {"</>"}
                </div>
                <div>
                  <div className="font-mono text-xs sm:text-sm text-white/60">GITHUB</div>
                  <div className="text-sm sm:text-base text-white">github.com/bishnt</div>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 sm:mt-12 p-4 sm:p-6 border border-white/20 bg-white/5"
            >
              <h4 className="font-mono text-base sm:text-lg mb-3 sm:mb-4">Current Status</h4>
              <p className="text-sm sm:text-base text-white/80 mb-3 sm:mb-4">
                 {'>'} Studying Electrical Engineering at IOE Pulchowk
              </p>
              <p className="text-sm sm:text-base text-white/80 mb-3 sm:mb-4">
                 {'>'} Open to internships,work and project collaboration opportunities
              </p>
              <p className="text-sm sm:text-base text-white/80">
                {'>'} Always excited to discuss innovative ideas and solutions
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-xs sm:text-sm font-mono text-white/60 mb-2">NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:border-white/40 focus:outline-none font-mono text-sm"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono text-white/60 mb-2">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:border-white/40 focus:outline-none font-mono text-sm"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono text-white/60 mb-2">SUBJECT</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:border-white/40 focus:outline-none font-mono text-sm"
                  placeholder="Project collaboration"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-mono text-white/60 mb-2">MESSAGE</label>
                <textarea
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-transparent border border-white/20 text-white placeholder-white/40 focus:border-white/40 focus:outline-none font-mono resize-none text-sm"
                  placeholder="Tell me about your project or idea..."
                />
              </div>

              {formStatus === 'success' && (
                <div className="p-3 border border-white/40 bg-white/10 text-white font-mono text-sm">
                  {'>'} Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}

              {formStatus === 'error' && (
                <div className="p-3 border border-white/20 bg-white/5 text-white/80 font-mono text-sm">
                  {'>'} Error sending message. Please try again or email me directly.
                </div>
              )}

              {formStatus && formStatus !== 'success' && formStatus !== 'error' && (
                <div className="p-3 border border-white/30 bg-white/5 text-white/70 font-mono text-sm">
                  {'>'} {formStatus}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full px-6 sm:px-8 py-3 bg-white text-black hover:bg-white/90 transition-all duration-300 font-mono text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
