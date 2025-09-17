import Navbar from "@/components/navbar"
import HeroCS from "@/components/hero-cs"
import AboutFiltered from "@/components/about-filtered"
import ProjectsFiltered from "@/components/projects-filtered"
import Education from "@/components/education"
import ProofOfWork from "@/components/proof-of-work"
import Blog from "@/components/blog"
import Contact from "@/components/contact"
import { ScrollProgress, FloatingElements } from "@/components/scroll-animations"
import NavigationButton from "@/components/navigation-button"

export default function ComputerSciencePage() {
  return (
    <>
      <ScrollProgress />
      <FloatingElements />
      <Navbar pageType="cs" />
      <main className="bg-black text-white pt-16">
        <HeroCS />
        <AboutFiltered pageType="cs" />
        <ProjectsFiltered pageType="cs" />
        <Education />
        <ProofOfWork />
        <Blog />
        <Contact />

        {/* Cross-page navigation */}
        <div className="py-16 sm:py-20 lg:py-24 bg-black border-t border-white/20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
              <NavigationButton 
                href="/ee"
                label="← Electrical Engineering"
                className="px-8 py-4 text-lg font-mono border-2 border-white/30 hover:border-white hover:bg-white hover:text-black transition-all duration-300 rounded-lg"
              />
              <div className="text-center">
                <p className="text-white/60 font-mono text-sm">Explore other perspectives</p>
              </div>
              <NavigationButton 
                href="/beyond-engineering"
                label="Beyond Engineering →"
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
