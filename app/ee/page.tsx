import Navbar from "@/components/navbar"
import HeroEE from "@/components/hero-ee"
import AboutFiltered from "@/components/about-filtered"
import ProjectsFiltered from "@/components/projects-filtered"
import Education from "@/components/education"
import Blog from "@/components/blog"
import Contact from "@/components/contact"
import PersonalStuffs from "@/components/personal-stuffs"

export default function ElectricalEngineeringPage() {
  return (
    <>
      <Navbar />
      <main className="bg-black text-white">
        <HeroEE />
        <AboutFiltered pageType="ee" />
        <ProjectsFiltered pageType="ee" />
        <Education />
        <Blog />
        <Contact />
        <PersonalStuffs />
      </main>
    </>
  )
}
