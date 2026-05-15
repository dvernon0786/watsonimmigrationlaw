import Link from 'next/link'

interface PersonaTileProps {
  title: string
  description: string
  href: string
  icon: React.ReactNode
  highlight?: string
}

export default function PersonaTile({ title, description, href, icon, highlight }: PersonaTileProps) {
  return (
    <Link
      href={href}
      className="group relative bg-white border border-border rounded-xl2 p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5 flex flex-col gap-4"
    >
      {highlight && (
        <span className="absolute top-4 right-4 text-xs font-semibold bg-gold-400 text-navy px-2 py-0.5 rounded-full">
          {highlight}
        </span>
      )}
      <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center text-white">
        {icon}
      </div>
      <div>
        <h3 className="font-display font-bold text-navy text-lg mb-1 group-hover:text-gold-400 transition-colors">{title}</h3>
        <p className="text-sm text-charcoal/70 leading-relaxed">{description}</p>
      </div>
      <div className="flex items-center text-gold-400 text-sm font-semibold mt-auto">
        See pathways
        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  )
}
