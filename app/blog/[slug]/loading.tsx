export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-white/60">
            <div className="w-4 h-4 bg-white/20 rounded animate-pulse"></div>
            <div className="w-32 h-4 bg-white/20 rounded animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Article Skeleton */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Article Header Skeleton */}
        <header className="mb-8 sm:mb-12">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="w-20 h-6 bg-white/20 rounded animate-pulse"></div>
            <div className="w-24 h-6 bg-white/20 rounded animate-pulse"></div>
            <div className="w-16 h-6 bg-white/20 rounded animate-pulse"></div>
            <div className="w-28 h-6 bg-white/20 rounded animate-pulse"></div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="w-5/6 h-12 bg-white/20 rounded animate-pulse"></div>
            <div className="w-full h-6 bg-white/10 rounded animate-pulse"></div>
            <div className="w-4/5 h-6 bg-white/10 rounded animate-pulse"></div>
          </div>

          {/* Tags Skeleton */}
          <div className="flex flex-wrap gap-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-16 h-6 bg-white/10 rounded animate-pulse"></div>
            ))}
          </div>
        </header>

        {/* Article Content Skeleton */}
        <div className="space-y-6">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="space-y-2">
              {i % 4 === 0 && (
                <div className="w-2/3 h-8 bg-white/20 rounded animate-pulse mb-4"></div>
              )}
              <div className="w-full h-4 bg-white/10 rounded animate-pulse"></div>
              <div className="w-5/6 h-4 bg-white/10 rounded animate-pulse"></div>
              <div className="w-4/5 h-4 bg-white/10 rounded animate-pulse"></div>
              {(i + 1) % 3 === 0 && <div className="h-4"></div>}
            </div>
          ))}
        </div>

        {/* Article Footer Skeleton */}
        <footer className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <div className="w-32 h-4 bg-white/20 rounded animate-pulse"></div>
              <div className="w-40 h-4 bg-white/20 rounded animate-pulse"></div>
            </div>
            <div className="w-40 h-12 bg-white/10 border border-white/20 rounded animate-pulse"></div>
          </div>
        </footer>
      </article>
    </div>
  )
}