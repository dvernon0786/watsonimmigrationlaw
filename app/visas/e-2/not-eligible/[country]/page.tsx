import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import fs from 'fs/promises'
import path from 'path'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import VisaHero from '@/components/sections/VisaHero'
import FaqAccordion from '@/components/sections/FaqAccordion'
import LeadCapture from '@/components/sections/LeadCapture'
import { buildVisaPageSchema, buildBreadcrumbSchema } from '@/lib/schemas'

interface Alternative {
  visaType: string
  description: string
  href: string
}

interface NonTreatyData {
  slug: string
  name: string
  adjective: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  alternatives: Alternative[]
  faqs: Array<{ question: string; answer: string }>
  relatedPages: string[]
}

async function getNonTreatyData(slug: string): Promise<NonTreatyData | null> {
  try {
    const filePath = path.join(process.cwd(), 'content/e2/non-treaty', `${slug}.json`)
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  try {
    const dir = path.join(process.cwd(), 'content/e2/non-treaty')
    const files = await fs.readdir(dir)
    return files
      .filter((f) => f.endsWith('.json'))
      .map((f) => ({ country: f.replace('.json', '') }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ country: string }> }): Promise<Metadata> {
  const { country: countrySlug } = await params
  const data = await getNonTreatyData(countrySlug)
  if (!data) return {}
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `https://watsonimmigrationlaw.com/visas/e-2/not-eligible/${countrySlug}` },
  }
}

export default async function E2NonTreatyPage({ params }: { params: Promise<{ country: string }> }) {
  const { country: countrySlug } = await params
  const data = await getNonTreatyData(countrySlug)
  if (!data) notFound()

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Visa Services', path: '/visas' },
    { name: 'E-2 Visa', path: '/visas/e-2' },
    { name: `${data.adjective} Nationals — Not Eligible`, path: `/visas/e-2/not-eligible/${countrySlug}` },
  ]

  const schemaFaqs = data.faqs.length > 0
    ? data.faqs
    : [{ question: `Can ${data.adjective} nationals apply for the E-2 visa?`, answer: `${data.name} does not have a qualifying E-2 treaty with the United States. ${data.adjective} nationals should explore EB-5 and other alternative pathways.` }]

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        schema={buildVisaPageSchema({
          visaName: 'E-2 Visa',
          countryName: `${data.name} Nationals (Not Eligible — Alternatives)`,
          slug: `/visas/e-2/not-eligible/${countrySlug}`,
          description: data.metaDescription,
          faqs: schemaFaqs,
        })}
      />

      <Breadcrumbs items={breadcrumbs} />

      <VisaHero
        headline={data.h1}
        subheadline={data.intro || `${data.name} does not have an E-2 treaty with the United States. Watson Immigration Law advises ${data.adjective} investors on the best alternative pathways to U.S. business immigration.`}
        visaName="E-2 Visa"
        locationName={data.name}
      />

      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">

              {/* Non-eligibility explanation */}
              <div className="bg-cream rounded-xl2 p-6">
                <h2 className="font-display text-display-sm text-navy mb-3">
                  Why {data.adjective} nationals cannot apply for E-2
                </h2>
                <p className="text-charcoal/80 leading-relaxed">
                  {data.intro || `The E-2 visa is only available to nationals of countries that have a qualifying Treaty of Commerce and Navigation with the United States. ${data.name} does not have such a treaty, which means ${data.adjective} nationals are not eligible for E-2 status regardless of their investment amount or business qualifications. However, several strong alternative pathways exist.`}
                </p>
              </div>

              {/* Alternative pathways */}
              {data.alternatives && data.alternatives.length > 0 && (
                <div>
                  <h2 className="font-display text-display-sm text-navy mb-5">
                    Alternative U.S. investor visa pathways for {data.adjective} nationals
                  </h2>
                  <div className="space-y-4">
                    {data.alternatives.map((alt, i) => (
                      <div key={i} className="border rounded-xl2 p-5 hover:border-navy/40 transition-colors">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <h3 className="font-semibold text-navy text-base mb-2">{alt.visaType}</h3>
                            <p className="text-sm text-charcoal/80 leading-relaxed">{alt.description}</p>
                          </div>
                          <Link
                            href={alt.href}
                            className="flex-shrink-0 text-sm font-medium text-navy border border-navy rounded-lg px-4 py-2 hover:bg-navy hover:text-white transition-colors"
                          >
                            Learn more
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {data.faqs.length > 0 && <FaqAccordion faqs={data.faqs} />}
            </div>

            <div>
              <LeadCapture visaName={`Immigration Options for ${data.adjective} Nationals`} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
