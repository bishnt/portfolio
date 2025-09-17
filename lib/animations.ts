import { Variants } from 'framer-motion'

// Scroll-triggered animation variants
export const fadeInUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60,
    filter: 'blur(8px)'
  },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 60,
    filter: 'blur(8px)'
  },
  visible: { 
    opacity: 1, 
    x: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const scaleIn: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    filter: 'blur(10px)'
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: 'blur(5px)'
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Parallax scroll variants
export const parallaxSlow: Variants = {
  hidden: { y: 0 },
  visible: { 
    y: -50,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

export const parallaxFast: Variants = {
  hidden: { y: 0 },
  visible: { 
    y: -100,
    transition: {
      duration: 0.8,
      ease: "easeOut"
    }
  }
}

// Click and hover animations
export const clickBlur: Variants = {
  initial: { 
    filter: 'blur(0px)',
    scale: 1
  },
  clicked: { 
    filter: 'blur(2px)',
    scale: 0.98,
    transition: {
      duration: 0.1
    }
  },
  hover: {
    scale: 1.02,
    filter: 'blur(0px)',
    transition: {
      duration: 0.2
    }
  }
}

export const floatingElement: Variants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Enhanced floating variations
export const floatingElementSlow: Variants = {
  animate: {
    y: [-15, 15, -15],
    x: [-5, 5, -5],
    rotate: [-3, 3, -3],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const floatingElementFast: Variants = {
  animate: {
    y: [-8, 8, -8],
    rotate: [-1, 1, -1],
    scale: [1, 1.02, 1],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

// Page transition variants
export const pageTransition: Variants = {
  initial: { 
    opacity: 0,
    filter: 'blur(20px)',
    scale: 1.1
  },
  animate: { 
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: { 
    opacity: 0,
    filter: 'blur(20px)',
    scale: 0.9,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

// Magnetic hover effect
export const magneticHover = {
  scale: 1.05,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10
  }
}

// Glitch effect for text
export const glitchText: Variants = {
  hover: {
    textShadow: [
      "0 0 0 transparent",
      "2px 0 0 #ff0000, -2px 0 0 #00ff00",
      "0 0 0 transparent",
      "2px 0 0 #0000ff, -2px 0 0 #ffff00",
      "0 0 0 transparent"
    ],
    transition: {
      duration: 0.3,
      times: [0, 0.25, 0.5, 0.75, 1]
    }
  }
}

// Advanced click animations
export const morphClick: Variants = {
  initial: { 
    borderRadius: "0px",
    rotate: 0
  },
  clicked: {
    borderRadius: ["0px", "50%", "0px"],
    rotate: [0, 180, 360],
    scale: [1, 0.9, 1.1, 1],
    transition: {
      duration: 0.6,
      ease: "easeInOut"
    }
  }
}

export const liquidClick: Variants = {
  initial: { 
    scale: 1,
    filter: "blur(0px)"
  },
  clicked: {
    scale: [1, 1.2, 0.8, 1.1, 1],
    filter: ["blur(0px)", "blur(3px)", "blur(1px)", "blur(0px)"],
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}

export const elasticClick: Variants = {
  initial: { scale: 1 },
  clicked: {
    scale: [1, 1.3, 0.7, 1.1, 0.9, 1],
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
}

// Sophisticated hover effects
export const breatheHover: Variants = {
  hover: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
}

export const magneticPull: Variants = {
  hover: {
    scale: 1.1,
    boxShadow: "0 20px 40px rgba(255,255,255,0.2)",
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
}

// Text effects
export const typewriterEffect = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

export const letterReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    rotateX: -90
  },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
}
