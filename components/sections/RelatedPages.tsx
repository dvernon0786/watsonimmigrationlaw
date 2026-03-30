// components/sections/RelatedPages.tsx — Internal linking

import Link from 'next/link'

interface RelatedPagesProps {
  visa?: string
  location?: string
  country?: string
  industry?: string
  pages?: Array<{
    title: string
    description: string
    href: string
    image?: string
  }>
}

export default function RelatedPages({ visa, location, country, industry, pages }: RelatedPagesProps) {
  // If custom pages are provided, use them instead of generating
  if (pages && pages.length > 0) {
    return (
      <section className="py-section bg-gray-50">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <h2 className="font-display text-display-sm text-navy text-center mb-12">
            Related Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pages.map((page, index) => (
              <Link
                key={index}
                href={page.href}
                className="group bg-white rounded-xl2 border border-gray-100 shadow-card hover:shadow-card-hover transition-all p-6 block"
              >
                {page.image && (
                  <div className="mb-4">
                    <img
                      src={page.image}
                      alt={page.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-navy group-hover:text-gold-400 transition-colors mb-2">
                  {page.title}
                </h3>
                <p className="text-sm text-charcoal/60 group-hover:text-charcoal/80 transition-colors">
                  {page.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Generate related page suggestions based on current page context
  const relatedPages = []

  if (visa && location) {
    // On city page: show country and industry pages for same visa
    relatedPages.push(
      { title: `${visa} for ${country || 'Indian'} Nationals`, path: `/visas/${visa}/for/${country || 'india'}` },
      { title: `${visa} for ${industry || 'Tech'} Professionals`, path: `/visas/${visa}/industry/${industry || 'tech'}` },
      { title: `${visa} in ${location === 'seattle' ? 'New York' : 'Seattle'}`, path: `/visas/${visa}/${location === 'seattle' ? 'new-york' : 'seattle'}` }
    )
  } else if (visa) {
    // On visa overview: show popular city pages
    relatedPages.push(
      { title: `${visa} in Seattle`, path: `/visas/${visa}/seattle` },
      { title: `${visa} in New York`, path: `/visas/${visa}/new-york` },
      { title: `${visa} in San Francisco`, path: `/visas/${visa}/san-francisco` }
    )
  }

  if (relatedPages.length === 0) return null

  return (
    <section className="py-section bg-gray-50">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <h2 className="font-display text-display-sm text-navy text-center mb-12">
          Related Pages
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPages.map((page, index) => (
            <Link
              key={index}
              href={page.path}
              className="group bg-white rounded-xl2 border border-gray-100 shadow-card hover:shadow-card-hover transition-all p-6 block"
            >
              <h3 className="font-semibold text-navy group-hover:text-gold-400 transition-colors mb-2">
                {page.title}
              </h3>
              <p className="text-sm text-charcoal/60 group-hover:text-charcoal/80 transition-colors">
                Learn more about this immigration pathway →
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}