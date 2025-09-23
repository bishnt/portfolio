import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeHighlight from "rehype-highlight"
import { readFileSync } from "fs"
import { join } from "path"
import matter from "gray-matter"
import Link from "next/link"
import { Calendar, Clock, User, Tag } from "lucide-react"
import BackButton from "@/components/back-button"
import FloatingMenu from "@/components/floating-menu"

interface BlogPost {
  title: string
  excerpt: string
  date: string
  category: string
  readTime: string
  tags: string[]
  author: string
  content: string
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const postsDirectory = join(process.cwd(), "app/blog")
    const fullPath = join(postsDirectory, `${slug}.md`)
    const fileContents = readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      category: data.category,
      readTime: data.readTime,
      tags: data.tags || [],
      author: data.author,
      content,
    }
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    return {
      title: "Blog Post Not Found",
    }
  }

  return {
    title: `${post.title} | Bishrant Ghimire`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <FloatingMenu />
      <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <BackButton 
            fallbackHref="/#blog"
            fallbackText="Back to Portfolio"
          />
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Article Header */}
        <header className="mb-8 sm:mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-white/60">
            <span className="px-3 py-1 border border-white/20 font-mono">{post.category}</span>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span className="font-mono">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span className="font-mono">{post.readTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span className="font-mono">{post.author}</span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-mono mb-6 leading-tight">{post.title}</h1>

          <p className="text-lg sm:text-xl text-white/80 leading-relaxed mb-6">{post.excerpt}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2 py-1 bg-white/5 text-white/60 font-mono text-xs"
              >
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Article Content */}
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
                <blockquote className="border-l-4 border-white/20 pl-4 my-6 italic text-white/70 bg-white/5 py-4">
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
                  <table className="w-full border-collapse border border-white/20">{children}</table>
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
            {post.content}
          </ReactMarkdown>
        </div>

        {/* Article Footer */}
        <footer className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-sm text-white/60">
              <p className="font-mono">Written by {post.author}</p>
              <p className="font-mono">
                Published on{" "}
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <BackButton 
              fallbackHref="/#blog"
              fallbackText="← Back to All Posts"
              className="px-6 py-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300 font-mono text-sm"
            />
          </div>
        </footer>
      </article>
    </div>
    </>
  )
}

export async function generateStaticParams() {
  // Generate static params for known blog posts
  return [{ slug: "renewable-energy-nepal" }, { slug: "nextjs-scalable-apps" }, { slug: "iot-smart-cities" }]
}
