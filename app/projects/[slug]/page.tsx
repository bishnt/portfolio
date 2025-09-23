import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { readFileSync } from "fs"
import { join } from "path"
import matter from "gray-matter"
import Link from "next/link"
import { Calendar, Clock, User, Tag, Github, ExternalLink } from "lucide-react"
import Image from "next/image"
import BackButton from "@/components/back-button"

interface ProjectDetail {
  title: string
  description: string
  category: string
  status: string
  startDate: string
  endDate?: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  image: string
  author: string
  content: string
}

async function getProjectDetail(slug: string): Promise<ProjectDetail | null> {
  try {
    const projectsDirectory = join(process.cwd(), "app/projects")
    const fullPath = join(projectsDirectory, `${slug}.md`)
    const fileContents = readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      title: data.title,
      description: data.description,
      category: data.category,
      status: data.status,
      startDate: data.startDate,
      endDate: data.endDate,
      technologies: data.technologies || [],
      githubUrl: data.githubUrl,
      liveUrl: data.liveUrl,
      image: data.image,
      author: data.author,
      content,
    }
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = await getProjectDetail(params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | Bishrant Ghimire`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      images: [{ url: project.image }],
    },
  }
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectDetail(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <BackButton 
            fallbackHref="/#projects"
            fallbackText="Back to Projects"
          />
        </div>
      </header>

      {/* Project Hero */}
      <section className="relative py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Project Image */}
            <div className="relative aspect-[4/3] w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 backdrop-blur-sm border border-white/20">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                <span className="px-3 py-1 border border-white/20 font-mono rounded-full">{project.category}</span>
                <span className={`px-3 py-1 rounded-full font-mono ${
                  project.status === "Completed"
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : project.status === "In Progress"
                      ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                      : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                }`}>
                  {project.status}
                </span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span className="font-mono">
                    {new Date(project.startDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}
                    {project.endDate && ` - ${new Date(project.endDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                    })}`}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span className="font-mono">{project.author}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono leading-tight">{project.title}</h1>

              <p className="text-lg sm:text-xl text-white/80 leading-relaxed">{project.description}</p>

              {/* Technologies */}
              <div className="space-y-3">
                <h3 className="text-sm font-mono text-white/60 uppercase tracking-wider">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 text-white/70 font-mono text-sm rounded-lg border border-white/20"
                    >
                      <Tag className="w-3 h-3" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex gap-4 pt-4">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl font-mono text-sm transition-all duration-300 hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    View Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-white/90 rounded-2xl font-mono text-sm transition-all duration-300 hover:scale-105"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="prose prose-invert prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl sm:text-4xl font-bold font-mono mb-6 mt-8 text-white border-b border-white/20 pb-4">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl sm:text-3xl font-bold font-mono mb-4 mt-8 text-white">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl sm:text-2xl font-bold font-mono mb-3 mt-6 text-white">{children}</h3>
              ),
              h4: ({ children }) => (
                <h4 className="text-lg sm:text-xl font-bold font-mono mb-2 mt-4 text-white">{children}</h4>
              ),
              p: ({ children }) => <p className="mb-4 leading-relaxed text-white/80">{children}</p>,
              ul: ({ children }) => <ul className="mb-4 space-y-2 text-white/80">{children}</ul>,
              ol: ({ children }) => <ol className="mb-4 space-y-2 text-white/80">{children}</ol>,
              li: ({ children }) => <li className="ml-4">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-white/20 pl-4 my-6 italic text-white/70 bg-white/5 py-4 rounded-r-lg">
                  {children}
                </blockquote>
              ),
              code: ({
                inline,
                className,
                children,
                ...props
              }: React.ComponentProps<'code'> & { inline?: boolean }) =>
                inline ? (
                  <code className={`bg-white/10 px-2 py-1 rounded font-mono text-sm text-white ${className ?? ''}`} {...props}>
                    {children}
                  </code>
                ) : (
                  <code className={`block bg-gray-900 p-4 rounded-lg overflow-x-auto font-mono text-sm ${className ?? ''}`} {...props}>
                    {children}
                  </code>
                ),
              pre: ({ children }) => (
                <pre className="bg-gray-900 border border-white/20 p-4 rounded-lg overflow-x-auto mb-6">{children}</pre>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-blue-400 hover:text-blue-300 underline transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              table: ({ children }) => (
                <div className="overflow-x-auto mb-6">
                  <table className="w-full border-collapse border border-white/20 rounded-lg overflow-hidden">{children}</table>
                </div>
              ),
              th: ({ children }) => (
                <th className="border border-white/20 px-4 py-2 bg-white/5 font-mono text-left">{children}</th>
              ),
              td: ({ children }) => <td className="border border-white/20 px-4 py-2">{children}</td>,
              hr: () => <hr className="border-white/20 my-8" />,
              strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
              em: ({ children }) => <em className="italic text-white/90">{children}</em>,
            }}
          >
            {project.content}
          </ReactMarkdown>
        </div>

        {/* Project Footer */}
        <footer className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-white/60">
              <p className="font-mono">Created by {project.author}</p>
              <p className="font-mono">
                Started on{" "}
                {new Date(project.startDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <BackButton 
              fallbackHref="/#projects"
              fallbackText="← Back to All Projects"
              className="px-6 py-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 font-mono text-sm rounded-2xl"
            />
          </div>
        </footer>
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  // Generate static params for known projects
  return [
    { slug: "portfolio-website" },
    { slug: "task-management-app" },
    { slug: "weather-dashboard" },
    { slug: "e-commerce-platform" },
  ]
}
