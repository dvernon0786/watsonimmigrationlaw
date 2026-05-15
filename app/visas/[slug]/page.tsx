import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import VisaHero from '@/components/sections/VisaHero'
import FaqAccordion from '@/components/sections/FaqAccordion'
import LeadCapture from '@/components/sections/LeadCapture'
import AttorneyCard from '@/components/sections/AttorneyCard'
import ProcessTimeline from '@/components/sections/ProcessTimeline'
import RelatedPages from '@/components/sections/RelatedPages'
import { buildVisaPageSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/schemas'
import { getVisaData, getAttorneys } from '@/lib/content'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ['h-1b', 'eb-5', 'e-2', 'o-1', 'l-1', 'eb-1', 'eb-2-niw'].map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const visa = await getVisaData(slug)
  if (!visa) return {}
  return {
    title: `${visa.fullName || visa.name} Attorney in Seattle | Watson Immigration Law`,
    description: visa.description,
    alternates: { canonical: `https://watsonimmigrationlaw.com/visas/${slug}` },
  }
}

export default async function VisaPage({ params }: Props) {
  const { slug } = await params
  const visa = await getVisaData(slug)
  if (!visa) notFound()

  const attorneys = await getAttorneys()

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Visa Services', path: '/visas' },
    { name: visa.name, path: `/visas/${slug}` },
  ]

  const relatedSlugs = ['h-1b', 'eb-5', 'e-2', 'o-1', 'l-1', 'eb-1', 'eb-2-niw'].filter(s => s !== slug).slice(0, 3)
  const relatedPages = relatedSlugs.map(s => ({
    title: s === 'h-1b' ? 'H-1B Visa' : s === 'eb-5' ? 'EB-5 Investor Visa' : s === 'e-2' ? 'E-2 Treaty Investor' : s === 'o-1' ? 'O-1 Extraordinary Ability' : s === 'l-1' ? 'L-1 Transfer Visa' : s === 'eb-1' ? 'EB-1 Priority Worker' : 'EB-2 National Interest Waiver',
    description: 'Explore this immigration pathway',
    href: `/visas/${s}`,
  }))

  return (
    <>
      <JsonLd schema={buildFaqSchema(visa.faqs)} />
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={buildVisaPageSchema({ visaName: visa.name, slug: `/visas/${slug}`, description: visa.description, faqs: visa.faqs })} />

      <Breadcrumbs items={breadcrumbs} />

      <VisaHero
        headline={visa.fullName || `${visa.name} Visa`}
        subheadline={visa.description}
        visaName={visa.name}
        locationName="Seattle, WA"
      />

      {/* Main content + sidebar */}
      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">

              {/* Eligibility */}
              <div>
                <h2 className="font-display text-display-sm text-navy mb-6">Eligibility Requirements</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="bg-cream rounded-xl2 p-5">
                    <h3 className="font-semibold text-navy mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-navy text-white text-xs flex items-center justify-center">✓</span>
                      Requirements
                    </h3>
                    <ul className="space-y-2">
                      {visa.eligibility.requirements.map((req: string, i: number) => (
                        <li key={i} className="text-sm text-charcoal/80 leading-relaxed flex gap-2">
                          <span className="text-charcoal/40 mt-0.5 flex-shrink-0">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-cream rounded-xl2 p-5">
                    <h3 className="font-semibold text-navy mb-4 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-gold-400 text-navy text-xs flex items-center justify-center">★</span>
                      Benefits
                    </h3>
                    <ul className="space-y-2">
                      {visa.eligibility.benefits.map((benefit: string, i: number) => (
                        <li key={i} className="text-sm text-charcoal/80 leading-relaxed flex gap-2">
                          <span className="text-gold-400 mt-0.5 flex-shrink-0">✓</span>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Process timeline */}
              {visa.process?.steps && (
                <div>
                  <h2 className="font-display text-display-sm text-navy mb-6">The Process</h2>
                  <ProcessTimeline steps={visa.process.steps} />
                </div>
              )}

              {/* Processing info */}
              <div className="bg-cream rounded-xl2 p-6">
                <h2 className="font-display text-display-sm text-navy mb-6">Processing Details</h2>
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wide mb-1">Timeline</p>
                    <p className="text-sm text-charcoal/80">{visa.processing.timeline}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wide mb-1">Government Fees</p>
                    <p className="text-sm text-charcoal/80">{visa.processing.cost}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wide mb-2">Key Documents Required</p>
                  <ul className="grid sm:grid-cols-2 gap-1">
                    {visa.processing.documents.map((doc: string, i: number) => (
                      <li key={i} className="text-sm text-charcoal/80 flex gap-2">
                        <span className="text-gold-400 flex-shrink-0 mt-0.5">•</span>
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQs */}
              <FaqAccordion faqs={visa.faqs} />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <LeadCapture visaName={visa.name} />
              {attorneys.map((attorney: any) => (
                <AttorneyCard
                  key={attorney.slug}
                  name={attorney.name}
                  title={attorney.title}
                  image={attorney.image}
                  slug={attorney.slug}
                  credentials={attorney.credentials}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <RelatedPages pages={relatedPages} />
    </>
  )
}
