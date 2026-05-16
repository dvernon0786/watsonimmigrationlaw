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
import { getVisaData } from '@/lib/content'

interface Props { params: Promise<{ slug: string; country: string }> }

// ─── Legacy country data for non-E-2 visa slugs ──────────────────────────────

const COUNTRIES: Record<string, { name: string; adjective: string; notes: string; e2Treaty?: boolean }> = {
  'india': { name: 'India', adjective: 'Indian', notes: 'Indian nationals face significant visa bulletin backlogs for EB-2 and EB-3 categories due to per-country caps. EB-1A and EB-2 NIW self-petitions are often the fastest green card pathways. India does not have an E-2 treaty with the U.S.', e2Treaty: false },
  'china': { name: 'China', adjective: 'Chinese', notes: 'Chinese nationals face significant visa bulletin backlogs similar to India. EB-1A is often the most strategic green card option. China does not have an E-2 treaty with the U.S.', e2Treaty: false },
  'canada': { name: 'Canada', adjective: 'Canadian', notes: 'Canadian nationals have the advantage of TN visa eligibility under USMCA, as well as E-1 and E-2 treaty visas. Priority date backlogs are generally shorter for Canadians.', e2Treaty: true },
  'uk': { name: 'United Kingdom', adjective: 'British', notes: 'UK nationals have access to E-2 treaty investor visas and face no significant EB-2/EB-3 backlog. The U.S.-UK bilateral relationship provides favorable conditions for business immigration.', e2Treaty: true },
  'australia': { name: 'Australia', adjective: 'Australian', notes: 'Australian nationals have access to the E-3 visa (specialty occupation, annual cap of 10,500), E-2 treaty investor visa, and face minimal EB-2/EB-3 backlogs. The E-3 is a significant advantage unique to Australians.', e2Treaty: true },
  'mexico': { name: 'Mexico', adjective: 'Mexican', notes: 'Mexican nationals have TN visa eligibility under USMCA and E-2 treaty investor visa access. Spanish-speaking staff at Watson Immigration Law helps Mexican clients navigate their options.', e2Treaty: true },
  'south-korea': { name: 'South Korea', adjective: 'Korean', notes: 'Korean nationals have E-2 treaty investor visa access and generally face short EB-2/EB-3 priority date waits. Korea has a strong business community in the Pacific Northwest.', e2Treaty: true },
}

// ─── E-2 treaty country data loader ─────────────────────────────────────────

interface E2CountryData {
  slug: string
  name: string
  adjective: string
  treatyYear?: number
  visaValidity?: string
  annualIssuances?: number
  consulate?: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  sections: Array<{ heading: string; body: string }>
  faqs: Array<{ question: string; answer: string }>
  relatedCountries: Array<{ slug: string; adjective: string }>
  relatedCities: Array<{ slug: string; name: string }>
}

async function getE2CountryData(slug: string): Promise<E2CountryData | null> {
  try {
    const filePath = path.join(process.cwd(), 'content/e2/countries', `${slug}.json`)
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

async function getE2CountrySlugs(): Promise<string[]> {
  try {
    const dir = path.join(process.cwd(), 'content/e2/countries')
    const files = await fs.readdir(dir)
    return files.filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''))
  } catch {
    return []
  }
}

// ─── Static params ────────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const e2Countries = await getE2CountrySlugs()
  const otherSlugs = ['h-1b', 'eb-5', 'o-1', 'l-1', 'eb-1', 'eb-2-niw']
  const otherCountries = Object.keys(COUNTRIES)

  return [
    ...e2Countries.map((country) => ({ slug: 'e-2', country })),
    ...otherSlugs.flatMap((slug) => otherCountries.map((country) => ({ slug, country }))),
  ]
}

// ─── Metadata ─────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, country: countryKey } = await params

  if (slug === 'e-2') {
    const e2Data = await getE2CountryData(countryKey)
    if (!e2Data) return {}
    return {
      title: e2Data.metaTitle,
      description: e2Data.metaDescription,
      alternates: { canonical: `https://watsonimmigrationlaw.com/visas/e-2/for/${countryKey}` },
    }
  }

  const visa = await getVisaData(slug)
  const country = COUNTRIES[countryKey]
  if (!visa || !country) return {}
  return {
    title: `${visa.name} for ${country.adjective} Nationals | Watson Immigration Law`,
    description: `${visa.name} visa guidance for ${country.adjective} nationals. ${country.notes} Watson Immigration Law serves ${country.name} clients with expert U.S. immigration counsel.`,
    alternates: { canonical: `https://watsonimmigrationlaw.com/visas/${slug}/for/${countryKey}` },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function VisaCountryPage({ params }: Props) {
  const { slug, country: countryKey } = await params

  // ── E-2 treaty country page ──────────────────────────────────────────────
  if (slug === 'e-2') {
    const e2Data = await getE2CountryData(countryKey)
    if (!e2Data) notFound()

    const breadcrumbs = [
      { name: 'Home', path: '/' },
      { name: 'Visa Services', path: '/visas' },
      { name: 'E-2 Visa', path: '/visas/e-2' },
      { name: `For ${e2Data.adjective} Nationals`, path: `/visas/e-2/for/${countryKey}` },
    ]

    const schemaFaqs = e2Data.faqs.length > 0
      ? e2Data.faqs
      : [{ question: `Do ${e2Data.adjective} nationals qualify for the E-2 visa?`, answer: `${e2Data.name} has an E-2 treaty with the United States${e2Data.treatyYear ? ` dating to ${e2Data.treatyYear}` : ''}. ${e2Data.adjective} nationals are eligible for E-2 status.` }]

    const relatedPages = [
      ...e2Data.relatedCountries.map(({ slug: cSlug, adjective }) => ({
        title: `E-2 for ${adjective} Nationals`,
        href: `/visas/e-2/for/${cSlug}`,
        description: `E-2 visa information for ${adjective} investors`,
      })),
      ...e2Data.relatedCities.map(({ slug: citySlug, name }) => ({
        title: `E-2 in ${name}`,
        href: `/visas/e-2/${citySlug}`,
        description: `E-2 attorney in ${name}`,
      })),
    ]

    return (
      <>
        <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
        <JsonLd
          schema={buildVisaPageSchema({
            visaName: 'E-2 Visa',
            countryName: `${e2Data.name} Nationals`,
            slug: `/visas/e-2/for/${countryKey}`,
            description: e2Data.metaDescription,
            faqs: schemaFaqs,
          })}
        />

        <Breadcrumbs items={breadcrumbs} />

        <VisaHero
          headline={e2Data.h1}
          subheadline={e2Data.intro || `Watson Immigration Law advises ${e2Data.adjective} nationals on E-2 Treaty Investor Visa eligibility, application preparation, and consulate processing.`}
          visaName="E-2 Visa"
          locationName={e2Data.name}
        />

        <section className="py-section bg-white">
          <div className="max-w-content mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2 space-y-10">

                {/* Treaty info banner */}
                {(e2Data.treatyYear || e2Data.visaValidity || e2Data.annualIssuances) && (
                  <div className="grid sm:grid-cols-3 gap-4">
                    {e2Data.treatyYear && (
                      <div className="bg-cream rounded-xl2 p-4 text-center">
                        <p className="text-2xl font-display text-navy">{e2Data.treatyYear}</p>
                        <p className="text-xs text-charcoal/60 mt-1">Treaty year</p>
                      </div>
                    )}
                    {e2Data.visaValidity && (
                      <div className="bg-cream rounded-xl2 p-4 text-center">
                        <p className="text-2xl font-display text-navy">{e2Data.visaValidity}</p>
                        <p className="text-xs text-charcoal/60 mt-1">Visa validity</p>
                      </div>
                    )}
                    {e2Data.annualIssuances && (
                      <div className="bg-cream rounded-xl2 p-4 text-center">
                        <p className="text-2xl font-display text-navy">{e2Data.annualIssuances.toLocaleString()}</p>
                        <p className="text-xs text-charcoal/60 mt-1">FY2025 visas issued</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Consulate info */}
                {e2Data.consulate && (
                  <div className="flex gap-3 items-start">
                    <span className="text-gold-400 flex-shrink-0 mt-0.5">📍</span>
                    <div>
                      <p className="font-semibold text-navy text-sm">Primary processing consulate</p>
                      <p className="text-charcoal/80 text-sm">{e2Data.consulate}</p>
                    </div>
                  </div>
                )}

                {/* Sections */}
                {e2Data.sections.length > 0 && (
                  <div className="space-y-8">
                    {e2Data.sections.map((section, i) => (
                      <div key={i}>
                        <h2 className="font-display text-display-sm text-navy mb-3">{section.heading}</h2>
                        <p className="text-charcoal/80 leading-relaxed">{section.body}</p>
                      </div>
                    ))}
                  </div>
                )}

                {e2Data.faqs.length > 0 && <FaqAccordion faqs={e2Data.faqs} />}

                {relatedPages.length > 0 && (
                  <div>
                    <h2 className="font-display text-display-sm text-navy mb-4">Related resources</h2>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {relatedPages.map((page, i) => (
                        <a
                          key={i}
                          href={page.href}
                          className="border rounded-xl2 p-4 hover:border-navy/40 transition-colors block"
                        >
                          <p className="font-medium text-navy text-sm">{page.title}</p>
                          {page.description && (
                            <p className="text-xs text-charcoal/60 mt-1">{page.description}</p>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <LeadCapture visaName={`E-2 Visa for ${e2Data.adjective} Nationals`} />
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  // ── Non-E-2 visa country page (original logic) ───────────────────────────
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
