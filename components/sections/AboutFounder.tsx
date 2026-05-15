'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function AboutFounder() {
  const credentials = [
    'Founder of Watson Immigration Law — practicing U.S. immigration law since 2006',
    'LL.B., Brunel University, London · Called to the Bar, Middle Temple Inn of Court (2002)',
    'Admitted in Washington State, New York State, and U.S. District Court (W.D. Wash.)',
    'Author of four books including The Startup Visa (2nd ed., also in Spanish)',
    'Host of Tahmina Talks Immigration® podcast',
    'Adjunct Fellow, The Niskanen Center (Washington DC)',
    'Chair, Legal Advisory Committee — Global Entrepreneur in Residence Coalition',
    'Columnist, Above the Law · Contributor, Entrepreneur Magazine',
    'AILA National Media Spokesperson · AILA WA Response Committee Chair',
    'Fluent in Bengali · Conversational Hindi and Urdu',
  ]

  return (
    <section className="py-section bg-cream">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image column */}
          <div className="relative hidden lg:block">
            <div className="rounded-xl3 overflow-hidden aspect-[475/533] bg-navy relative">
              <Image
                src="/Tahmina.png"
                alt="Tahmina Watson, Founder of Watson Immigration Law"
                fill
                className="object-contain object-center"
                priority
              />
            </div>
            {/* Badge */}
            <div className="absolute -bottom-6 -right-6 bg-gold-400 text-navy rounded-xl2 px-6 py-4 shadow-cta">
              <p className="font-display text-3xl font-bold leading-none">15+</p>
              <p className="text-xs font-semibold uppercase tracking-widest mt-1">Years of Practice</p>
            </div>
          </div>

          {/* Content column */}
          <div>
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
              About Our Founder
            </p>
            <h2 className="font-display text-display-lg text-navy mb-5 leading-tight">
              Tahmina Watson —{' '}
              <em className="italic text-gold-400">A Voice for Immigrants in America</em>
            </h2>

            <p className="text-charcoal/70 leading-relaxed mb-4">
              Tahmina Watson trained as a barrister in London, was Called to the Bar at the Middle Temple
              in 2002, and completed her pupillage at Bridewell Chambers before relocating to the United
              States in 2005. She has practiced U.S. immigration law exclusively since 2006 — first as
              a partner at White & Watson, then as founder of Watson Immigration Law.
            </p>
            <p className="text-charcoal/70 leading-relaxed mb-6">
              She is the author of four books on immigration, including{' '}
              <em className="italic text-charcoal">The Startup Visa</em>{' '}
              — available in English and Spanish — and the host of{' '}
              <em className="italic text-charcoal">Tahmina Talks Immigration®</em>.
              Her work has been cited in The New York Times, Forbes, Bloomberg, NPR, The Guardian,
              and many other national publications. She advises on immigration policy as an Adjunct
              Fellow at The Niskanen Center and chairs the Legal Advisory Committee of the Global
              Entrepreneur in Residence Coalition.
            </p>

            {/* Credentials */}
            <ul className="space-y-2 mb-8">
              {credentials.map((cred, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-charcoal/80">
                  <span className="text-gold-400 mt-0.5 flex-shrink-0">•</span>
                  {cred}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold-400 text-navy font-bold text-base rounded-lg hover:bg-gold-500 transition-colors shadow-cta"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/team/tahmina-watson"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-navy text-navy font-bold text-base rounded-lg hover:bg-navy hover:text-white transition-colors"
              >
                Full bio →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
