import Link from 'next/link'

interface VisaCardProps {
  name: string
  slug: string
  tagline: string
  processingTime: string
  icon: React.ReactNode
}

export default function VisaCard({ name, slug, tagline, processingTime, icon }: VisaCardProps) {
  return (
    <Link
      href={`/visas/${slug}`}
      className="group bg-white border border-border rounded-xl2 p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5 flex flex-col"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 bg-navy/5 rounded-lg flex items-center justify-center text-navy group-hover:bg-navy group-hover:text-white transition-colors">
          {icon}
        </div>
        <span className="text-xs text-charcoal/50 bg-cream px-2 py-1 rounded-full">{processingTime}</span>
      </div>
      <h3 className="font-display font-bold text-navy text-lg mb-2 group-hover:text-gold-400 transition-colors">{name}</h3>
      <p className="text-sm text-charcoal/70 leading-relaxed flex-1">{tagline}</p>
      <div className="mt-4 flex items-center text-gold-400 text-sm font-semibold">
        Learn more
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  )
}
