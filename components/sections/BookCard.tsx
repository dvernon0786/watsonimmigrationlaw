interface BookCardProps {
  title: string
  subtitle?: string
  description: string
  audience: string
  coverImage: string
  amazonUrl: string
  year: number
  language?: string
  featured?: boolean
}

export default function BookCard({ title, subtitle, description, audience, coverImage, amazonUrl, year, language = 'English', featured }: BookCardProps) {
  return (
    <div className={`bg-white border border-border rounded-xl2 shadow-card overflow-hidden flex flex-col sm:flex-row gap-0 ${featured ? 'border-gold-400' : ''}`}>
      {/* Cover */}
      <div className="sm:w-36 flex-shrink-0 bg-cream flex items-center justify-center p-4">
        <img
          src={coverImage}
          alt={`${title} book cover`}
          className="w-28 shadow-lg rounded-sm object-cover"
        />
      </div>
      {/* Details */}
      <div className="p-5 flex flex-col flex-1">
        {featured && (
          <span className="inline-block text-xs font-semibold bg-gold-400 text-navy px-2 py-0.5 rounded-full mb-2 w-fit">
            Bestseller
          </span>
        )}
        {language !== 'English' && (
          <span className="inline-block text-xs font-semibold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full mb-2 w-fit">
            {language} Edition
          </span>
        )}
        <h3 className="font-display font-bold text-navy text-lg leading-snug mb-1">{title}</h3>
        {subtitle && <p className="text-sm text-charcoal/60 mb-2">{subtitle}</p>}
        <p className="text-sm text-charcoal/70 leading-relaxed flex-1 mb-3">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-charcoal/50">For {audience} · {year}</span>
          <a
            href={amazonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy-500 transition-colors"
          >
            Buy on Amazon
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
