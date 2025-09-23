export default function ProjectLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Skeleton */}
      <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-white/60">
            <div className="w-4 h-4 bg-white/20 rounded animate-pulse"></div>
            <div className="w-32 h-4 bg-white/20 rounded animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Project Hero Skeleton */}
      <section className="relative py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Project Image Skeleton */}
            <div className="relative aspect-[4/3] w-full">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-3xl p-6 backdrop-blur-sm border border-white/20">
                <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-white/10 animate-pulse"></div>
              </div>
            </div>

            {/* Project Info Skeleton */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <div className="w-20 h-6 bg-white/20 rounded-full animate-pulse"></div>
                <div className="w-24 h-6 bg-white/20 rounded-full animate-pulse"></div>
                <div className="w-32 h-6 bg-white/20 rounded-full animate-pulse"></div>
                <div className="w-28 h-6 bg-white/20 rounded-full animate-pulse"></div>
              </div>

              <div className="space-y-4">
                <div className="w-3/4 h-12 bg-white/20 rounded animate-pulse"></div>
                <div className="w-full h-6 bg-white/10 rounded animate-pulse"></div>
                <div className="w-5/6 h-6 bg-white/10 rounded animate-pulse"></div>
              </div>

              {/* Technologies Skeleton */}
              <div className="space-y-3">
                <div className="w-24 h-4 bg-white/20 rounded animate-pulse"></div>
                <div className="flex flex-wrap gap-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-20 h-8 bg-white/10 rounded-lg animate-pulse"></div>
                  ))}
                </div>
              </div>

              {/* Links Skeleton */}
              <div className="flex gap-4 pt-4">
                <div className="w-28 h-12 bg-white/10 rounded-2xl animate-pulse"></div>
                <div className="w-28 h-12 bg-white/20 rounded-2xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="w-full h-4 bg-white/10 rounded animate-pulse"></div>
              <div className="w-5/6 h-4 bg-white/10 rounded animate-pulse"></div>
              <div className="w-4/5 h-4 bg-white/10 rounded animate-pulse"></div>
            </div>
          ))}
        </div>

        {/* Footer Skeleton */}
        <footer className="mt-12 pt-8 border-t border-white/20">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-2">
              <div className="w-32 h-4 bg-white/20 rounded animate-pulse"></div>
              <div className="w-40 h-4 bg-white/20 rounded animate-pulse"></div>
            </div>
            <div className="w-40 h-12 bg-white/10 border border-white/20 rounded-2xl animate-pulse"></div>
          </div>
        </footer>
      </article>
    </div>
  )
}