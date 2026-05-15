import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import VisaHero from '@/components/sections/VisaHero'
import FaqAccordion from '@/components/sections/FaqAccordion'
import LeadCapture from '@/components/sections/LeadCapture'
import { buildVisaPageSchema, buildBreadcrumbSchema } from '@/lib/schemas'
import { getVisaData } from '@/lib/content'

interface Props { params: Promise<{ slug: string; country: string }> }

const COUNTRIES: Record<string, { name: string; adjective: string; notes: string; e2Treaty?: boolean }> = {
  'india': { name: 'India', adjective: 'Indian', notes: 'Indian nationals face significant visa bulletin backlogs for EB-2 and EB-3 categories due to per-country caps. EB-1A and EB-2 NIW self-petitions are often the fastest green card pathways. India does not have an E-2 treaty with the U.S.', e2Treaty: false },
  'china': { name: 'China', adjective: 'Chinese', notes: 'Chinese nationals face significant visa bulletin backlogs similar to India. EB-1A is often the most strategic green card option. China does not have an E-2 treaty with the U.S.', e2Treaty: false },
  'canada': { name: 'Canada', adjective: 'Canadian', notes: 'Canadian nationals have the advantage of TN visa eligibility under USMCA, as well as E-1 and E-2 treaty visas. Priority date backlogs are generally shorter for Canadians.', e2Treaty: true },
  'uk': { name: 'United Kingdom', adjective: 'British', notes: 'UK nationals have access to E-2 treaty investor visas and face no significant EB-2/EB-3 backlog. The U.S.-UK bilateral relationship provides favorable conditions for business immigration.', e2Treaty: true },
  'australia': { name: 'Australia', adjective: 'Australian', notes: 'Australian nationals have access to the E-3 visa (specialty occupation, annual cap of 10,500), E-2 treaty investor visa, and face minimal EB-2/EB-3 backlogs. The E-3 is a significant advantage unique to Australians.', e2Treaty: true },
  'mexico': { name: 'Mexico', adjective: 'Mexican', notes: 'Mexican nationals have TN visa eligibility under USMCA and E-2 treaty investor visa access. Spanish-speaking staff at Watson Immigration Law helps Mexican clients navigate their options.', e2Treaty: true },
  'south-korea': { name: 'South Korea', adjective: 'Korean', notes: 'Korean nationals have E-2 treaty investor visa access and generally face short EB-2/EB-3 priority date waits. Korea has a strong business community in the Pacific Northwest.', e2Treaty: true },
}

export async function generateStaticParams() {
  const slugs = ['h-1b', 'eb-5', 'e-2', 'o-1', 'l-1', 'eb-1', 'eb-2-niw']
  return slugs.flatMap(slug => Object.keys(COUNTRIES).map(country => ({ slug, country })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, country: countryKey } = await params
  const visa = await getVisaData(slug)
  const country = COUNTRIES[countryKey]
  if (!visa || !country) return {}
  return {
    title: `${visa.name} for ${country.adjective} Nationals | Watson Immigration Law`,
    description: `${visa.name} visa guidance for ${country.adjective} nationals. ${country.notes} Watson Immigration Law serves ${country.name} clients with expert U.S. immigration counsel.`,
    alternates: { canonical: `https://watsonimmigrationlaw.com/visas/${slug}/for/${countryKey}` },
  }
}

export default async function VisaCountryPage({ params }: Props) {
  const { slug, country: countryKey } = await params
  const visa = await getVisaData(slug)
  const country = COUNTRIES[countryKey]
  if (!visa || !country) notFound()

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Visa Services', path: '/visas' },
    { name: visa.name, path: `/visas/${slug}` },
    { name: `For ${country.adjective} Nationals`, path: `/visas/${slug}/for/${countryKey}` },
  ]

  const countryFaqs = [
    { question: `Are there specific considerations for ${country.adjective} nationals applying for ${visa.name}?`, answer: country.notes },
    ...visa.faqs.slice(0, 5),
  ]

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd schema={buildVisaPageSchema({ visaName: visa.name, countryName: `${country.name} Nationals`, slug: `/visas/${slug}/for/${countryKey}`, description: `${visa.name} visa for ${country.adjective} nationals. ${visa.description}`, faqs: countryFaqs })} />

      <Breadcrumbs items={breadcrumbs} />

      <VisaHero
        headline={`${visa.name} Visa for ${country.adjective} Nationals`}
        subheadline={`Specialist immigration counsel for ${country.name} nationals seeking ${visa.name} status in the United States. Watson Immigration Law has extensive experience with the unique considerations that apply to ${country.adjective} applicants.`}
        visaName={visa.name}
        locationName={country.name}
      />

      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">
              <div className="bg-cream rounded-xl2 p-6">
                <h2 className="font-display text-display-sm text-navy mb-4">{visa.name} considerations for {country.adjective} nationals</h2>
                <p className="text-charcoal/80 leading-relaxed">{country.notes}</p>
              </div>
              <div>
                <h2 className="font-display text-display-sm text-navy mb-4">Eligibility requirements</h2>
                <ul className="space-y-2">
                  {visa.eligibility.requirements.map((req: string, i: number) => (
                    <li key={i} className="text-sm text-charcoal/80 flex gap-2">
                      <span className="text-gold-400 flex-shrink-0 mt-0.5">✓</span>{req}
                    </li>
                  ))}
                </ul>
              </div>
              <FaqAccordion faqs={countryFaqs} />
            </div>
            <div>
              <LeadCapture visaName={`${visa.name} for ${country.adjective} Nationals`} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
