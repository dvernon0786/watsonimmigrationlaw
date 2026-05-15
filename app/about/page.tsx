import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LeadCapture from '@/components/sections/LeadCapture'
import { buildBreadcrumbSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: 'About Watson Immigration Law | Seattle Immigration Attorneys',
  description: 'Watson Immigration Law is a Seattle-based immigration firm founded by Tahmina Watson. We specialize in business and investor immigration, serving entrepreneurs, investors, and companies worldwide.',
  alternates: { canonical: 'https://watsonimmigrationlaw.com/about' },
}

const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'About', path: '/about' }]

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="py-section bg-navy text-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">About Our Firm</p>
            <h1 className="font-display text-display-lg text-white mb-6 leading-tight">
              Taking care of all your immigration needs — since 2009
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Watson Immigration Law was founded on the belief that every person deserves skilled, compassionate legal representation when their future is at stake. We are lawyers, advocates, and human beings first.
            </p>
          </div>
        </div>
      </section>

      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">

              {/* Story */}
              <div>
                <h2 className="font-display text-display-sm text-navy mb-5">Our story</h2>
                <div className="space-y-4 text-charcoal/80 leading-relaxed">
                  <p>Watson Immigration Law was founded by Tahmina Watson, an immigration attorney who came to the United States as an immigrant herself. That lived experience shapes everything we do — we understand not just the legal process, but the human stakes behind every case.</p>
                  <p>Over 15 years, we have helped hundreds of entrepreneurs launch startups, investors secure green cards, professionals obtain work visas, and companies build global teams. Our clients come from more than 50 countries and work across every industry — from tech and biotech to hospitality, finance, and the arts.</p>
                  <p>We are based in Seattle, Washington — home to Amazon, Microsoft, Boeing, and one of the most internationally connected business communities in the world. But our work reaches far beyond the Pacific Northwest. We serve clients virtually, anywhere in the world.</p>
                </div>
              </div>

              {/* Mission */}
              <div className="bg-cream rounded-xl2 p-6">
                <h2 className="font-display text-display-sm text-navy mb-4">Our mission</h2>
                <p className="text-charcoal/80 leading-relaxed">"Dedicated to transforming lives and livelihoods for generations to come."</p>
                <p className="text-charcoal/80 leading-relaxed mt-3">We believe that immigration law done right changes the trajectory of lives — not just for our clients, but for their families, their companies, and their communities. We take that responsibility seriously.</p>
              </div>

              {/* Advocacy */}
              <div>
                <h2 className="font-display text-display-sm text-navy mb-4">Advocacy & thought leadership</h2>
                <p className="text-charcoal/80 leading-relaxed mb-4">Tahmina Watson has been one of the most vocal advocates for immigration reform — specifically for a dedicated startup visa that would allow international entrepreneurs to build their companies in the United States. She has testified, published, spoken internationally, and written four books on the subject.</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Link href="/books" className="block bg-white border border-border rounded-xl2 p-4 hover:border-gold-400 transition-colors">
                    <p className="font-semibold text-navy text-sm">4 Published Books</p>
                    <p className="text-xs text-charcoal/60 mt-1">Including The Startup Visa in English and Spanish</p>
                  </Link>
                  <Link href="/podcast" className="block bg-white border border-border rounded-xl2 p-4 hover:border-gold-400 transition-colors">
                    <p className="font-semibold text-navy text-sm">Tahmina Talks Immigration® Podcast</p>
                    <p className="text-xs text-charcoal/60 mt-1">100+ episodes on immigration and entrepreneurship</p>
                  </Link>
                  <Link href="/media" className="block bg-white border border-border rounded-xl2 p-4 hover:border-gold-400 transition-colors">
                    <p className="font-semibold text-navy text-sm">National Media Coverage</p>
                    <p className="text-xs text-charcoal/60 mt-1">NYT, Forbes, Bloomberg, The Guardian, CNN, NPR</p>
                  </Link>
                  <Link href="/events" className="block bg-white border border-border rounded-xl2 p-4 hover:border-gold-400 transition-colors">
                    <p className="font-semibold text-navy text-sm">Speaking & Events</p>
                    <p className="text-xs text-charcoal/60 mt-1">SelectUSA, AILA, entrepreneur events worldwide</p>
                  </Link>
                </div>
              </div>

              {/* Values */}
              <div>
                <h2 className="font-display text-display-sm text-navy mb-5">What we believe</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Every case is personal', desc: 'Behind every visa application is a person with a dream. We never lose sight of that.' },
                    { title: 'Clarity over complexity', desc: 'Immigration law is complicated. We make sure you always know where you stand and what comes next.' },
                    { title: 'Advocacy is part of the job', desc: 'We don\'t just file paperwork — we fight for our clients\' interests and advocate for better immigration policy.' },
                    { title: 'Results matter', desc: 'Our reputation is built on successful outcomes. We are thorough, precise, and relentless in our preparation.' },
                  ].map(v => (
                    <div key={v.title} className="flex gap-4">
                      <div className="w-2 h-2 rounded-full bg-gold-400 mt-2 flex-shrink-0" />
                      <div>
                        <p className="font-semibold text-navy text-sm">{v.title}</p>
                        <p className="text-sm text-charcoal/70 leading-relaxed">{v.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-cream rounded-xl2 p-5">
                <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wide mb-3">Recognition</p>
                {['Forbes Business Council Member', 'PSBJ Women of Influence', 'Top 60 Immigration Blog in the US', 'AILA Washington/Alaska Chapter — Past Chair'].map(item => (
                  <div key={item} className="flex gap-2 py-2 border-b border-border last:border-0">
                    <span className="text-gold-400 text-xs mt-0.5">★</span>
                    <p className="text-xs text-charcoal/70">{item}</p>
                  </div>
                ))}
              </div>
              <LeadCapture />
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
