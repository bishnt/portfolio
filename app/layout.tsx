import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import { PerformanceOptimizer } from "@/components/performance-optimizer"
import NavigationTracker from "@/components/navigation-tracker"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "Bishrant Ghimire | Portfolio",
  description: "Electrical Engineering student at IOE Pulchowk, passionate about technology and problem-solving.",
  keywords: ["Bishrant Ghimire", "Portfolio", "Electrical Engineering", "IOE Pulchowk", "Web Developer", "Engineer"],
  authors: [{ name: "Bishrant Ghimire" }],
  creator: "Bishrant Ghimire",
  publisher: "Bishrant Ghimire",
  
  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bishrant.com",
    title: "Bishrant Ghimire | Portfolio",
    description: "Electrical Engineering student at IOE Pulchowk, passionate about technology and problem-solving.",
    siteName: "Bishrant Ghimire Portfolio",
    images: [
      {
        url: "/cover.png",
        width: 1200,
        height: 630,
        alt: "Bishrant Ghimire Portfolio",
      },
    ],
  },
  
  // Twitter Card metadata
  twitter: {
    card: "summary_large_image",
    title: "Bishrant Ghimire | Portfolio",
    description: "Electrical Engineering student at IOE Pulchowk, passionate about technology and problem-solving.",
    images: ["/cover.png"],
    creator: "@bishrant_",
  },
  
  // Favicon and icons
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  
  // Additional metadata
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  
  // Verification
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <PerformanceOptimizer />
        <NavigationTracker />
        {children}
      </body>
    </html>
  )
}