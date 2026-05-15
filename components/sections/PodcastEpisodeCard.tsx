import Link from 'next/link'

interface PodcastEpisodeCardProps {
  title: string
  slug: string
  description: string
  date: string
  guest?: string
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function PodcastEpisodeCard({ title, slug, description, date, guest }: PodcastEpisodeCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex gap-4 bg-white border border-border rounded-xl2 p-4 shadow-card hover:shadow-card-hover transition-all"
    >
      {/* Play icon */}
      <div className="w-12 h-12 flex-shrink-0 bg-navy rounded-xl flex items-center justify-center group-hover:bg-gold-400 transition-colors">
        <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      {/* Content */}
      <div className="flex-1 min-w-0">
        {guest && (
          <p className="text-xs text-gold-400 font-semibold uppercase tracking-wide mb-0.5">Guest: {guest}</p>
        )}
        <h3 className="font-semibold text-navy text-sm leading-snug group-hover:text-gold-400 transition-colors line-clamp-2 mb-1">
          {title}
        </h3>
        <p className="text-xs text-charcoal/60 line-clamp-2 leading-relaxed mb-2">{description}</p>
        <span className="text-xs text-charcoal/40">{formatDate(date)}</span>
      </div>
    </Link>
  )
}
