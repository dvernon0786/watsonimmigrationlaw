import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import VisaHero from '@/components/sections/VisaHero'
import FaqAccordion from '@/components/sections/FaqAccordion'
import LeadCapture from '@/components/sections/LeadCapture'
import { buildVisaPageSchema, buildBreadcrumbSchema } from '@/lib/schemas'
import { getVisaData } from '@/lib/content'

interface Props { params: Promise<{ slug: string; city: string }> }

const CITIES: Record<string, { name: string; state: string; context: string }> = {
  'seattle': { name: 'Seattle', state: 'WA', context: 'home to Amazon, Microsoft, Boeing, and one of the most tech-forward economies in the world' },
  'bellevue': { name: 'Bellevue', state: 'WA', context: 'a major tech hub with headquarters for companies including Expedia, T-Mobile, and Puget Sound Energy' },
  'redmond': { name: 'Redmond', state: 'WA', context: 'home to Microsoft\'s global headquarters and a thriving tech startup ecosystem' },
  'kirkland': { name: 'Kirkland', state: 'WA', context: 'a growing tech and professional services hub on the eastern shore of Lake Washington' },
  'renton': { name: 'Renton', state: 'WA', context: 'home to Boeing\'s commercial airplane division and a diverse business community' },
  'tacoma': { name: 'Tacoma', state: 'WA', context: 'a growing port city with a diverse economy including healthcare, education, and manufacturing' },
  'olympia': { name: 'Olympia', state: 'WA', context: 'Washington\'s capital city with a strong public sector, healthcare, and education workforce' },
  'spokane': { name: 'Spokane', state: 'WA', context: 'eastern Washington\'s largest city with growing healthcare, education, and tech sectors' },
  'vancouver-wa': { name: 'Vancouver', state: 'WA', context: 'a rapidly growing city in the Portland metro area with strong cross-border business activity' },
  'portland': { name: 'Portland', state: 'OR', context: 'a major tech and creative economy hub with companies like Nike, Intel, and a thriving startup scene' },
}

export async function generateStaticParams() {
  const slugs = ['h-1b', 'eb-5', 'e-2', 'o-1', 'l-1', 'eb-1', 'eb-2-niw']
  const cities = Object.keys(CITIES)
  return slugs.flatMap(slug => cities.map(city => ({ slug, city })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, city: cityKey } = await params
  const visa = await getVisaData(slug)
  const city = CITIES[cityKey]
  if (!visa || !city) return {}
  return {
    title: `${visa.name} Attorney in ${city.name}, ${city.state} | Watson Immigration Law`,
    description: `Watson Immigration Law provides expert ${visa.name} visa services in ${city.name}, ${city.state}. ${visa.description} Serving ${city.name} businesses and individuals.`,
    alternates: { canonical: `https://watsonimmigrationlaw.com/visas/${slug}/${cityKey}` },
  }
}

export default async function VisaCityPage({ params }: Props) {
  const { slug, city: cityKey } = await params
  const visa = await getVisaData(slug)
  const city = CITIES[cityKey]
  if (!visa || !city) notFound()

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Visa Services', path: '/visas' },
    { name: visa.name, path: `/visas/${slug}` },
    { name: city.name, path: `/visas/${slug}/${cityKey}` },
  ]

  const cityFaqs = [
    { question: `Do I need a local attorney in ${city.name} for ${visa.name}?`, answer: `Immigration law is federal, so you can work with any licensed U.S. immigration attorney regardless of where you are located. Watson Immigration Law is based in Seattle and serves clients throughout the Pacific Northwest including ${city.name}, as well as clients across the United States and internationally. We offer virtual consultations and handle cases remotely.` },
    { question: `How long does ${visa.name} processing take for ${city.name} applicants?`, answer: `Processing times are the same regardless of where you are located — ${visa.processing.timeline}. USCIS processes petitions at service centers, not by the applicant's location. For consular interviews (E-2, L-1), processing times depend on the specific U.S. consulate, typically 2–8 weeks.` },
    ...visa.faqs.slice(0, 4),
  ]

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={buildVisaPageSchema({ visaName: visa.name, locationName: city.name, slug: `/visas/${slug}/${cityKey}`, description: `${visa.name} visa services in ${city.name}, ${city.state}. ${visa.description}`, faqs: cityFaqs })} />

      <Breadcrumbs items={breadcrumbs} />

      <VisaHero
        headline={`${visa.name} Visa Attorney in ${city.name}, ${city.state}`}
        subheadline={`Watson Immigration Law serves ${city.name} professionals, entrepreneurs, and businesses with expert ${visa.name} visa counsel. ${city.name} is ${city.context}.`}
        visaName={visa.name}
        locationName={city.name}
      />

      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">

              {/* Local context */}
              <div className="bg-cream rounded-xl2 p-6">
                <h2 className="font-display text-display-sm text-navy mb-4">{visa.name} in {city.name}</h2>
                <p className="text-charcoal/80 leading-relaxed mb-4">
                  {city.name} is {city.context}. Companies and professionals in {city.name} frequently rely on the {visa.name} visa to attract and retain international talent, expand globally, or establish U.S. operations.
                </p>
                <p className="text-charcoal/80 leading-relaxed">
                  Watson Immigration Law is Seattle-based and serves the entire Pacific Northwest. We work with {city.name} employers, startups, investors, and individuals to navigate the {visa.name} process efficiently and successfully.
                </p>
              </div>

              {/* Eligibility summary */}
              <div>
                <h2 className="font-display text-display-sm text-navy mb-4">Am I eligible for {visa.name}?</h2>
                <ul className="space-y-2">
                  {visa.eligibility.requirements.map((req: string, i: number) => (
                    <li key={i} className="text-sm text-charcoal/80 leading-relaxed flex gap-2">
                      <span className="text-gold-400 flex-shrink-0 mt-0.5">✓</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQs */}
              <FaqAccordion faqs={cityFaqs} />
            </div>

            {/* Sidebar */}
            <div>
              <LeadCapture visaName={visa.name} locationName={city.name} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
