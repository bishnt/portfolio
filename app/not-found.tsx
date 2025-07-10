import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold font-mono mb-4">404</h1>
        <h2 className="text-2xl font-mono mb-6">PAGE NOT FOUND</h2>
        <p className="text-white/70 mb-8 max-w-md">The page you're looking for doesn't exist or has been moved.</p>
        <Link
          href="/"
          className="px-6 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 font-mono text-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}
