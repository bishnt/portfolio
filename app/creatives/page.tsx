import Navbar from "@/components/navbar"
import HeroCreatives from "@/components/hero-creatives"
import AboutFiltered from "@/components/about-filtered"
import ProjectsFiltered from "@/components/projects-filtered"
import Education from "@/components/education"
import Blog from "@/components/blog"
import Contact from "@/components/contact"
import PersonalStuffs from "@/components/personal-stuffs"

export default function CreativesPage() {
  return (
    <>
      <Navbar />
      <main className="bg-black text-white">
        <HeroCreatives />
        <AboutFiltered pageType="creatives" />
        <ProjectsFiltered pageType="creatives" />
        <Education />
        <Blog />
        <Contact />
        <PersonalStuffs />
      </main>
    </>
  )
}
