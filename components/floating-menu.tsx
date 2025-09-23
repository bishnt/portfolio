"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Code2, Cpu, VideoIcon } from "lucide-react"

interface FloatingMenuProps {
  className?: string
}

export default function FloatingMenu({ className = "" }: FloatingMenuProps) {
  const pathname = usePathname()

  const menuItems = [
    {
      href: "/ee",
      label: "Electrical Engineering",
      icon: Cpu,
      isActive: pathname === "/ee"
    },
    {
      href: "/cs",
      label: "Computer Science",
      icon: Code2,
      isActive: pathname === "/cs"
    },
    {
      href: "/beyond-engineering",
      label: "Beyond Engineering",
      icon: VideoIcon,
      isActive: pathname === "/beyond-engineering"
    }
  ]

  return (
    <div className={`fixed bottom-4 left-0 right-0 z-[9998] md:hidden ${className}`}>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="flex justify-center w-full"
      >
        <div className="bg-black/90 backdrop-blur-md border border-white/20 rounded-full px-1 py-1 shadow-xl">
          <div className="flex items-center justify-center gap-0.5">
          {menuItems.map((item) => {
            const IconComponent = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative group"
              >
                <motion.div
                  className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 relative ${
                    item.isActive
                      ? "bg-white/20 text-white"
                      : "text-white/60 hover:text-white/90 hover:bg-white/10"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                >
                  {/* Active indicator */}
                  <AnimatePresence>
                    {item.isActive && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute inset-0 bg-white/15 rounded-full border border-white/30"
                      />
                    )}
                  </AnimatePresence>

                  {/* Icon */}
                  <IconComponent className={`w-5 h-5 relative z-10 ${item.isActive ? 'text-white' : ''}`} />
                </motion.div>
              </Link>
            )
          })}
          </div>
        </div>
        
        {/* Optional: Add a small indicator dot at the bottom */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
          <div className="w-1 h-1 bg-white/20 rounded-full" />
        </div>
      </motion.div>
    </div>
  )
}