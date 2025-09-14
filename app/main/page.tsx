import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import About from "@/components/about"
import Projects from "@/components/projects"
import Education from "@/components/education"
import Blog from "@/components/blog"
import Contact from "@/components/contact"
import PersonalStuffs from "@/components/personal-stuffs"

export default function Main() {
  return (
    <>
      <Navbar />
      <main className="bg-black text-white">
        <Hero />
        <About />
        <Projects />
        <Education />
        <Blog />
        <Contact />
        <PersonalStuffs />
      </main>
    </>
  )
}
