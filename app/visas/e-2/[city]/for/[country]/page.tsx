import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import fs from 'fs/promises'
import path from 'path'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import VisaHero from '@/components/sections/VisaHero'
import FaqAccordion from '@/components/sections/FaqAccordion'
import LeadCapture from '@/components/sections/LeadCapture'
import { buildVisaPageSchema, buildBreadcrumbSchema } from '@/lib/schemas'

interface IntersectionData {
  city: string
  country: string
  cityName: string
  cityStateCode: string
  countryAdjective: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  sections: Array<{ heading: string; body: string }>
  faqs: Array<{ question: string; answer: string }>
}

interface CityData {
  name: string
  stateCode: string
  intro: string
  faqs: Array<{ question: string; answer: string }>
}

interface CountryData {
  name: string
  adjective: string
  intro: string
  faqs: Array<{ question: string; answer: string }>
}

const PRIORITY_INTERSECTIONS = [
  { city: 'seattle', country: 'south-korea' },
  { city: 'seattle', country: 'japan' },
  { city: 'seattle', country: 'canada' },
  { city: 'seattle', country: 'taiwan' },
  { city: 'seattle', country: 'united-kingdom' },
  { city: 'miami', country: 'colombia' },
  { city: 'miami', country: 'mexico' },
  { city: 'miami', country: 'argentina' },
  { city: 'miami', country: 'spain' },
  { city: 'miami', country: 'italy' },
  { city: 'los-angeles', country: 'south-korea' },
  { city: 'los-angeles', country: 'japan' },
  { city: 'los-angeles', country: 'mexico' },
  { city: 'los-angeles', country: 'taiwan' },
  { city: 'los-angeles', country: 'australia' },
  { city: 'new-york', country: 'united-kingdom' },
  { city: 'new-york', country: 'italy' },
  { city: 'new-york', country: 'france' },
  { city: 'new-york', country: 'israel' },
  { city: 'new-york', country: 'south-korea' },
  { city: 'san-francisco', country: 'taiwan' },
  { city: 'san-francisco', country: 'israel' },
  { city: 'san-francisco', country: 'canada' },
  { city: 'san-francisco', country: 'australia' },
  { city: 'san-francisco', country: 'united-kingdom' },
  { city: 'houston', country: 'colombia' },
  { city: 'houston', country: 'mexico' },
  { city: 'houston', country: 'turkey' },
  { city: 'chicago', country: 'germany' },
  { city: 'chicago', country: 'poland' },
  { city: 'chicago', country: 'italy' },
  { city: 'chicago', country: 'south-korea' },
  { city: 'dallas', country: 'south-korea' },
  { city: 'dallas', country: 'mexico' },
  { city: 'dallas', country: 'taiwan' },
  { city: 'atlanta', country: 'south-korea' },
  { city: 'atlanta', country: 'japan' },
  { city: 'las-vegas', country: 'south-korea' },
  { city: 'las-vegas', country: 'japan' },
  { city: 'las-vegas', country: 'taiwan' },
  { city: 'austin', country: 'united-kingdom' },
  { city: 'austin', country: 'israel' },
  { city: 'austin', country: 'canada' },
  { city: 'boston', country: 'united-kingdom' },
  { city: 'boston', country: 'ireland' },
  { city: 'portland', country: 'japan' },
  { city: 'portland', country: 'south-korea' },
  { city: 'san-diego', country: 'mexico' },
  { city: 'san-diego', country: 'australia' },
  { city: 'denver', country: 'united-kingdom' },
]

async function getIntersectionData(citySlug: string, countrySlug: string): Promise<IntersectionData | null> {
  try {
    const key = `${citySlug}--${countrySlug}`
    const filePath = path.join(process.cwd(), 'content/e2/intersections', `${key}.json`)
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

async function getCityData(slug: string): Promise<CityData | null> {
  try {
    const filePath = path.join(process.cwd(), 'content/e2/cities', `${slug}.json`)
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

async function getCountryData(slug: string): Promise<CountryData | null> {
  try {
    const filePath = path.join(process.cwd(), 'content/e2/countries', `${slug}.json`)
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  return PRIORITY_INTERSECTIONS
}

export async function generateMetadata({ params }: { params: Promise<{ city: string; country: string }> }): Promise<Metadata> {
  const { city: citySlug, country: countrySlug } = await params
  const intersection = await getIntersectionData(citySlug, countrySlug)

  if (intersection) {
    return {
      title: intersection.metaTitle,
      description: intersection.metaDescription,
      alternates: { canonical: `https://watsonimmigrationlaw.com/visas/e-2/${citySlug}/for/${countrySlug}` },
    }
  }

  const [city, country] = await Promise.all([getCityData(citySlug), getCountryData(countrySlug)])
  if (!city || !country) return {}

  return {
    title: `E-2 Visa for ${country.adjective} Investors in ${city.name}, ${city.stateCode} | Watson Immigration Law`,
    description: `E-2 Treaty Investor Visa guidance for ${country.adjective} nationals opening businesses in ${city.name}. Watson Immigration Law serves ${country.adjective} investors in the ${city.name} market.`,
    alternates: { canonical: `https://watsonimmigrationlaw.com/visas/e-2/${citySlug}/for/${countrySlug}` },
  }
}

export default async function E2IntersectionPage({ params }: { params: Promise<{ city: string; country: string }> }) {
  const { city: citySlug, country: countrySlug } = await params

  // Check if this combination is in the priority list
  const isValidCombination = PRIORITY_INTERSECTIONS.some(
    (p) => p.city === citySlug && p.country === countrySlug
  )
  if (!isValidCombination) notFound()

  const [intersection, city, country] = await Promise.all([
    getIntersectionData(citySlug, countrySlug),
    getCityData(citySlug),
    getCountryData(countrySlug),
  ])

  // Need at least city + country data to render
  if (!city || !country) notFound()

  const cityName = intersection?.cityName ?? city.name
  const stateCode = intersection?.cityStateCode ?? city.stateCode
  const countryAdjective = intersection?.countryAdjective ?? country.adjective
  const h1 = intersection?.h1 ?? `E-2 Visa for ${countryAdjective} Investors in ${cityName}, ${stateCode}`
  const intro = intersection?.intro ?? `Watson Immigration Law assists ${countryAdjective} investors seeking E-2 Treaty Investor Visa status for businesses in ${cityName}. We combine country-specific eligibility expertise with local market knowledge to build strong E-2 cases for this high-intent market.`

  const sections = intersection?.sections ?? []
  const faqs = intersection?.faqs.length
    ? intersection.faqs
    : [
        ...(country.faqs?.slice(0, 2) ?? []),
        ...(city.faqs?.slice(0, 2) ?? []),
      ]

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Visa Services', path: '/visas' },
    { name: 'E-2 Visa', path: '/visas/e-2' },
    { name: cityName, path: `/visas/e-2/${citySlug}` },
    { name: `${countryAdjective} Investors`, path: `/visas/e-2/${citySlug}/for/${countrySlug}` },
  ]

  const schemaDescription = intro

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        schema={buildVisaPageSchema({
          visaName: 'E-2 Visa',
          locationName: cityName,
          countryName: `${country.name} Nationals`,
          slug: `/visas/e-2/${citySlug}/for/${countrySlug}`,
          description: schemaDescription,
          faqs: faqs.length > 0 ? faqs : [{ question: `How do ${countryAdjective} nationals apply for E-2 in ${cityName}?`, answer: `Watson Immigration Law guides ${countryAdjective} investors through the full E-2 application process for businesses in ${cityName}. Contact us for a consultation.` }],
        })}
      />

      <Breadcrumbs items={breadcrumbs} />

      <VisaHero
        headline={h1}
        subheadline={intro}
        visaName="E-2 Visa"
        locationName={`${cityName} · ${countryAdjective}`}
      />

      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">

              {sections.length > 0 && (
                <div className="space-y-8">
                  {sections.map((section, i) => (
                    <div key={i}>
                      <h2 className="font-display text-display-sm text-navy mb-3">{section.heading}</h2>
                      <p className="text-charcoal/80 leading-relaxed">{section.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {sections.length === 0 && (
                <>
                  {country.intro && (
                    <div className="bg-cream rounded-xl2 p-6">
                      <h2 className="font-display text-display-sm text-navy mb-3">
                        E-2 visa considerations for {countryAdjective} nationals
                      </h2>
                      <p className="text-charcoal/80 leading-relaxed">{country.intro}</p>
                    </div>
                  )}
                  {city.intro && (
                    <div>
                      <h2 className="font-display text-display-sm text-navy mb-3">
                        E-2 investment in {cityName}
                      </h2>
                      <p className="text-charcoal/80 leading-relaxed">{city.intro}</p>
                    </div>
                  )}
                </>
              )}

              {faqs.length > 0 && <FaqAccordion faqs={faqs} />}
            </div>

            <div>
              <LeadCapture
                visaName={`E-2 Visa for ${countryAdjective} Investors`}
                locationName={cityName}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
