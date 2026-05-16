import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import fs from 'fs/promises'
import path from 'path'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import VisaHero from '@/components/sections/VisaHero'
import FaqAccordion from '@/components/sections/FaqAccordion'
import LeadCapture from '@/components/sections/LeadCapture'
import RelatedPages from '@/components/sections/RelatedPages'
import { buildVisaPageSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/schemas'

interface CityData {
  slug: string
  name: string
  state: string
  stateCode: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  sections: Array<{ heading: string; body: string }>
  stateTax: string
  uscisOffice: string
  industries: string[]
  topNationalities: Array<{ slug: string; adjective: string }>
  faqs: Array<{ question: string; answer: string }>
  relatedCities: Array<{ slug: string; name: string }>
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

export async function generateStaticParams() {
  try {
    const dir = path.join(process.cwd(), 'content/e2/cities')
    const files = await fs.readdir(dir)
    return files
      .filter((f) => f.endsWith('.json'))
      .map((f) => ({ city: f.replace('.json', '') }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const { city: citySlug } = await params
  const data = await getCityData(citySlug)
  if (!data) return {}
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `https://watsonimmigrationlaw.com/visas/e-2/${citySlug}` },
  }
}

export default async function E2CityPage({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params
  const data = await getCityData(citySlug)
  if (!data) notFound()

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Visa Services', path: '/visas' },
    { name: 'E-2 Visa', path: '/visas/e-2' },
    { name: `${data.name}, ${data.stateCode}`, path: `/visas/e-2/${citySlug}` },
  ]

  const relatedPages = [
    ...data.relatedCities.map(({ slug, name }) => ({
      title: `E-2 in ${name}`,
      href: `/visas/e-2/${slug}`,
      description: `E-2 investor visa for ${name} businesses`,
    })),
    ...data.topNationalities.map(({ slug, adjective }) => ({
      title: `E-2 for ${adjective} Investors`,
      href: `/visas/e-2/for/${slug}`,
      description: `E-2 visa guidance for ${adjective} nationals`,
    })),
  ]

  const schemaDescription = data.intro || `E-2 Treaty Investor Visa services in ${data.name}, ${data.state}. Watson Immigration Law serves international investors opening or acquiring businesses in ${data.name}.`

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        schema={buildVisaPageSchema({
          visaName: 'E-2 Visa',
          locationName: data.name,
          slug: `/visas/e-2/${citySlug}`,
          description: schemaDescription,
          faqs: data.faqs.length > 0 ? data.faqs : [{ question: `How do I apply for an E-2 visa in ${data.name}?`, answer: `Watson Immigration Law assists E-2 investors in ${data.name}, ${data.state}. Contact us for a consultation.` }],
        })}
      />

      <Breadcrumbs items={breadcrumbs} />

      <VisaHero
        headline={data.h1}
        subheadline={data.intro || `Watson Immigration Law advises international investors opening E-2 Treaty Investor Visa businesses in ${data.name}, ${data.stateCode}.`}
        visaName="E-2 Visa"
        locationName={`${data.name}, ${data.stateCode}`}
      />

      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">

              {data.sections.length > 0 && (
                <div className="space-y-8">
                  {data.sections.map((section, i) => (
                    <div key={i}>
                      <h2 className="font-display text-display-sm text-navy mb-3">{section.heading}</h2>
                      <p className="text-charcoal/80 leading-relaxed">{section.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {data.industries.length > 0 && (
                <div className="bg-cream rounded-xl2 p-6">
                  <h2 className="font-display text-display-sm text-navy mb-3">Top E-2 investment sectors in {data.name}</h2>
                  <div className="flex flex-wrap gap-2">
                    {data.industries.map((industry, i) => (
                      <span key={i} className="text-sm bg-white border rounded-full px-3 py-1 text-charcoal/80">
                        {industry}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {data.stateTax && (
                <div className="flex gap-3 items-start bg-cream rounded-xl2 p-5">
                  <span className="text-gold-400 flex-shrink-0 mt-0.5 text-lg">★</span>
                  <div>
                    <p className="font-semibold text-navy text-sm">{data.state} tax environment</p>
                    <p className="text-charcoal/80 text-sm leading-relaxed mt-1">{data.stateTax}</p>
                  </div>
                </div>
              )}

              {data.faqs.length > 0 && <FaqAccordion faqs={data.faqs} />}

              {relatedPages.length > 0 && (
                <RelatedPages pages={relatedPages} />
              )}
            </div>

            <div>
              <LeadCapture visaName="E-2 Visa" locationName={data.name} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
