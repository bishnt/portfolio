import Navbar from "@/components/navbar"
import HeroCS from "@/components/hero-cs"
import AboutFiltered from "@/components/about-filtered"
import ProjectsFiltered from "@/components/projects-filtered"
import Education from "@/components/education"
import Blog from "@/components/blog"
import Contact from "@/components/contact"
import PersonalStuffs from "@/components/personal-stuffs"

export default function ComputerSciencePage() {
  return (
    <>
      <Navbar />
      <main className="bg-black text-white">
        <HeroCS />
        <AboutFiltered pageType="cs" />
        <ProjectsFiltered pageType="cs" />
        <Education />
        <Blog />
        <Contact />
        <PersonalStuffs />
      </main>
    </>
  )
}
