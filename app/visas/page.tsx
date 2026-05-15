import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LeadCapture from '@/components/sections/LeadCapture'
import MediaLogos from '@/components/sections/MediaLogos'
import { buildBreadcrumbSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: 'Immigration Visa Services | Watson Immigration Law Seattle',
  description: 'Watson Immigration Law handles H-1B, EB-5, E-2, O-1, L-1, EB-1, and EB-2 NIW visas. Seattle-based immigration attorneys serving clients worldwide.',
  alternates: { canonical: 'https://watsonimmigrationlaw.com/visas' },
}

const VISAS = [
  {
    name: 'H-1B Visa',
    slug: 'h-1b',
    tagline: 'Specialty occupation visa for skilled professionals sponsored by a U.S. employer.',
    processingTime: '3–6 months',
    description: 'The most common work visa for professionals in tech, engineering, finance, healthcare, and other specialty occupations requiring a bachelor\'s degree.',
    forWho: 'Professionals with a job offer',
    keyFact: 'Annual lottery — file March annually',
  },
  {
    name: 'EB-5 Investor Visa',
    slug: 'eb-5',
    tagline: 'A direct path to a U.S. green card through qualifying business investment.',
    processingTime: '3–6 years',
    description: 'The only visa leading directly to a green card without a U.S. employer or family member sponsor. Requires a qualifying investment of $800K–$1.05M.',
    forWho: 'High-net-worth investors',
    keyFact: 'Investment from $800,000',
  },
  {
    name: 'E-2 Treaty Investor',
    slug: 'e-2',
    tagline: 'Start or acquire a U.S. business — renewable indefinitely, no lottery.',
    processingTime: '2–8 weeks',
    description: 'Fast, flexible investor visa for nationals of 80+ treaty countries. No minimum investment set by law. Ideal for entrepreneurs buying or starting a U.S. business.',
    forWho: 'Entrepreneurs & investors',
    keyFact: 'No cap, no lottery',
  },
  {
    name: 'O-1 Extraordinary Ability',
    slug: 'o-1',
    tagline: 'For those with nationally or internationally recognized achievement — no lottery.',
    processingTime: '2–4 months',
    description: 'Reserved for individuals who have risen to the top of their field. No annual cap. Strong pathway to EB-1A green card.',
    forWho: 'Top performers in any field',
    keyFact: 'No cap, no lottery',
  },
  {
    name: 'L-1 Intracompany Transfer',
    slug: 'l-1',
    tagline: 'Transfer managers and key employees from your global office to the United States.',
    processingTime: '1–6 months',
    description: 'Ideal for multinational companies bringing executives, managers, and specialized knowledge employees to the U.S. L-1A leads to EB-1C green card.',
    forWho: 'Multinational companies',
    keyFact: 'Leads to EB-1C green card',
  },
  {
    name: 'EB-1 Priority Worker',
    slug: 'eb-1',
    tagline: 'The fastest employment-based green card — no PERM labor certification.',
    processingTime: '12–24 months',
    description: 'First preference green card for extraordinary ability (EB-1A, self-petition allowed), outstanding researchers (EB-1B), and multinational managers (EB-1C).',
    forWho: 'Extraordinary individuals & executives',
    keyFact: 'No PERM required',
  },
  {
    name: 'EB-2 National Interest Waiver',
    slug: 'eb-2-niw',
    tagline: 'Self-petition for a green card — no employer sponsor, no PERM required.',
    processingTime: '12–36 months',
    description: 'For professionals with advanced degrees or exceptional ability whose work benefits the United States. Ideal for entrepreneurs, researchers, and independent professionals.',
    forWho: 'Founders, researchers, professionals',
    keyFact: 'Self-petition — no employer needed',
  },
]

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'Visa Services', path: '/visas' },
]

export default function VisasPage() {
  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <section className="py-section bg-navy text-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">Practice Areas</p>
            <h1 className="font-display text-display-lg text-white mb-6 leading-tight">
              Every path to U.S. immigration, covered
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Watson Immigration Law specializes in business and investor immigration — from temporary work visas to permanent green cards. We handle the full spectrum, and we find the right path for your situation.
            </p>
          </div>
        </div>
      </section>

      {/* Visa grid */}
      <section className="py-section bg-cream">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {VISAS.map(visa => (
              <Link
                key={visa.slug}
                href={`/visas/${visa.slug}`}
                className="group bg-white border border-border rounded-xl2 p-6 shadow-card hover:shadow-card-hover transition-all hover:-translate-y-0.5"
              >
                <div className="flex items-start justify-between mb-3">
                  <h2 className="font-display font-bold text-navy text-xl group-hover:text-gold-400 transition-colors">{visa.name}</h2>
                  <span className="text-xs text-charcoal/50 bg-cream border border-border px-2 py-1 rounded-full whitespace-nowrap ml-2 flex-shrink-0">{visa.processingTime}</span>
                </div>
                <p className="text-sm font-medium text-charcoal/60 mb-3">{visa.tagline}</p>
                <p className="text-sm text-charcoal/70 leading-relaxed mb-4">{visa.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-xs">
                    <span className="text-charcoal/50">For: <span className="font-medium text-charcoal/70">{visa.forWho}</span></span>
                    <span className="text-gold-400 font-medium">✓ {visa.keyFact}</span>
                  </div>
                  <span className="text-gold-400 text-sm font-semibold group-hover:translate-x-1 transition-transform inline-block">→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Not sure section */}
      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <h2 className="font-display text-display-sm text-navy mb-4">Not sure which visa is right for you?</h2>
            <p className="text-charcoal/70 leading-relaxed">Every immigration situation is unique. Book a free consultation and we'll map out the right pathway for your specific goals, background, and timeline.</p>
          </div>
          <div className="max-w-lg mx-auto">
            <LeadCapture />
          </div>
        </div>
      </section>

      <MediaLogos />
    </>
  )
}
