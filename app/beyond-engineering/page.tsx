import Navbar from "@/components/navbar"
import HeroCreatives from "@/components/hero-creatives"
import AboutFiltered from "@/components/about-filtered"
import ProjectsFiltered from "@/components/projects-filtered"
import Education from "@/components/education"
import SocialFeed from "@/components/social-feed"
import Blog from "@/components/blog"
import Contact from "@/components/contact"
import PersonalStuffs from "@/components/personal-stuffs"
import NavigationButton from "@/components/navigation-button"
import { ScrollProgress, FloatingElements } from "@/components/scroll-animations"
import FloatingMenu from "@/components/floating-menu"

export default function CreativesPage() {
  return (
    <>
      <ScrollProgress />
      <FloatingElements />
      <Navbar pageType="beyond-engineering" />
      <FloatingMenu />
      <main className="bg-black text-white pt-16">
        <HeroCreatives />
        <AboutFiltered pageType="beyond-engineering" />
        <ProjectsFiltered pageType="beyond-engineering" />
        <Education />
        <SocialFeed />
        <Blog />
        <Contact />
        
        <PersonalStuffs />
        
        {/* Cross-page navigation (above footer) */}
        <div className="py-16 sm:py-20 lg:py-24 bg-black border-t border-white/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <NavigationButton 
                href="/cs"
                label="← Computer Science"
                className="px-8 py-4 text-lg font-mono border-2 border-white/30 hover:border-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg"
              />
              <div className="text-center">
                <p className="text-white/60 font-mono text-sm">Explore other perspectives</p>
              </div>
              <NavigationButton 
                href="/ee"
                label="Electrical Engineering →"
                className="px-8 py-4 text-lg font-mono border-2 border-white/30 hover:border-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="py-8 border-t border-white/20 bg-black">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-white/60 font-mono text-xs sm:text-sm">
              @ 2025 Bishrant Ghimire
            </p>
          </div>
        </div>
      </main>
    </>
  )
}