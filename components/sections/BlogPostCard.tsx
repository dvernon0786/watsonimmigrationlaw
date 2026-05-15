import Link from 'next/link'

interface BlogPostCardProps {
  title: string
  slug: string
  description: string
  date: string
  authorName: string
  categories?: string[]
  image?: string
  featured?: boolean
}

const CATEGORY_COLORS: Record<string, string> = {
  podcast: 'bg-purple-100 text-purple-800',
  h1b: 'bg-blue-100 text-blue-800',
  eb5: 'bg-green-100 text-green-700',
  e2: 'bg-teal-100 text-teal-800',
  news: 'bg-orange-100 text-orange-800',
  founders: 'bg-gold-400/20 text-navy',
  events: 'bg-gray-100 text-gray-700',
  featured: 'bg-navy text-white',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogPostCard({ title, slug, description, date, authorName, categories = [], image, featured }: BlogPostCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className={`group block bg-white border border-border rounded-xl2 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5 overflow-hidden ${featured ? 'md:flex' : ''}`}
    >
      {image && (
        <div className={`bg-cream overflow-hidden ${featured ? 'md:w-64 md:flex-shrink-0' : 'h-44'}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      {!image && (
        <div className={`bg-gradient-to-br from-navy to-navy-500 flex items-center justify-center ${featured ? 'md:w-64 md:flex-shrink-0' : 'h-32'}`}>
          <span className="font-display text-4xl text-white/20 font-bold">WIL</span>
        </div>
      )}
      <div className="p-5">
        <div className="flex flex-wrap gap-1.5 mb-3">
          {categories.slice(0, 2).map(cat => (
            <span key={cat} className={`text-xs font-semibold px-2 py-0.5 rounded-full ${CATEGORY_COLORS[cat] || 'bg-gray-100 text-gray-700'}`}>
              {cat === 'h1b' ? 'H-1B' : cat === 'eb5' ? 'EB-5' : cat === 'e2' ? 'E-2' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </span>
          ))}
        </div>
        <h3 className="font-display font-bold text-navy text-base leading-snug mb-2 group-hover:text-gold-400 transition-colors line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-charcoal/70 leading-relaxed mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between text-xs text-charcoal/50">
          <span>{authorName}</span>
          <span>{formatDate(date)}</span>
        </div>
      </div>
    </Link>
  )
}
