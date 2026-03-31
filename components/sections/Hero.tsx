// components/sections/Hero.tsx — Homepage hero

import Link from 'next/link'

export default function Hero() {
  return (
    <section className="py-section bg-navy text-white">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="font-display text-display-xl text-white mb-6 leading-tight">
            Immigration Law for
            <br />
            <span className="text-gold-400">Entrepreneurs, Investors & Businesses</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
            Expert counsel on EB-5, E-2, H-1B, O-1, and L-1 visas.
            Seattle-based firm serving clients worldwide.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold-400 text-navy font-bold text-lg rounded-lg hover:bg-gold-500 transition-colors shadow-cta"
            >
              Book Free Consultation
            </Link>
            <Link
              href="/visas"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold text-lg rounded-lg hover:bg-white hover:text-navy transition-colors"
            >
              Our Practice Areas
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              15+ Years Experience
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Featured in NYT, Forbes, Bloomberg
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              50+ Countries Served
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}