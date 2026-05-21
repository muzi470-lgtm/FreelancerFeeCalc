/**
 * Loading UI — Shown while page content is streaming
 * Uses glassmorphism skeleton loaders for brand consistency.
 */

export default function Loading() {
  return (
    <main className="min-h-screen px-4 py-8 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto animate-pulse">
        
        {/* Breadcrumb skeleton */}
        <div className="glass rounded-xl h-12 mb-6" />
        
        {/* Header skeleton */}
        <div className="text-center mb-10 space-y-4">
          <div className="h-12 bg-slate-200 rounded-lg w-3/4 mx-auto" />
          <div className="h-6 bg-slate-200 rounded-lg w-1/2 mx-auto" />
        </div>
        
        {/* Calculator skeleton */}
        <div className="glass-deep rounded-3xl p-6 md:p-10 mb-8 space-y-6">
          <div className="h-8 bg-slate-200 rounded-lg w-1/3 mx-auto" />
          <div className="glass rounded-2xl h-24" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="glass rounded-2xl h-64" />
            <div className="glass rounded-2xl h-64" />
          </div>
        </div>
        
        {/* Article skeleton */}
        <div className="glass-deep rounded-3xl p-6 md:p-10 space-y-4">
          <div className="h-8 bg-slate-200 rounded-lg w-2/3" />
          <div className="h-4 bg-slate-200 rounded-lg w-full" />
          <div className="h-4 bg-slate-200 rounded-lg w-full" />
          <div className="h-4 bg-slate-200 rounded-lg w-5/6" />
          <div className="h-4 bg-slate-200 rounded-lg w-full" />
        </div>
        
      </div>
    </main>
  );
}