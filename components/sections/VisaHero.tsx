// components/sections/VisaHero.tsx — Programmatic page hero

interface VisaHeroProps {
  headline: string
  subheadline: string
  visaName: string
  locationName?: string
}

export default function VisaHero({ headline, subheadline, visaName, locationName }: VisaHeroProps) {
  return (
    <section className="py-section bg-navy text-white">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-gold-400 text-navy text-sm font-semibold mb-6">
            {visaName}{locationName ? ` · ${locationName}` : ''}
          </div>

          {/* Headline */}
          <h1 className="font-display text-display-lg text-white mb-6 leading-tight">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            {subheadline}
          </p>

          {/* CTA */}
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-gold-400 text-navy font-bold text-lg rounded-lg hover:bg-gold-500 transition-colors shadow-cta"
          >
            Get Started Today
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}