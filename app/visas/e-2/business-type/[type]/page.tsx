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

interface BusinessTypeData {
  slug: string
  name: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  sections: Array<{ heading: string; body: string }>
  faqs: Array<{ question: string; answer: string }>
}

async function getBusinessTypeData(slug: string): Promise<BusinessTypeData | null> {
  try {
    const filePath = path.join(process.cwd(), 'content/e2/business-types', `${slug}.json`)
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  try {
    const dir = path.join(process.cwd(), 'content/e2/business-types')
    const files = await fs.readdir(dir)
    return files
      .filter((f) => f.endsWith('.json'))
      .map((f) => ({ type: f.replace('.json', '') }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ type: string }> }): Promise<Metadata> {
  const { type } = await params
  const data = await getBusinessTypeData(type)
  if (!data) return {}
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `https://watsonimmigrationlaw.com/visas/e-2/business-type/${type}` },
  }
}

export default async function E2BusinessTypePage({ params }: { params: Promise<{ type: string }> }) {
  const { type } = await params
  const data = await getBusinessTypeData(type)
  if (!data) notFound()

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Visa Services', path: '/visas' },
    { name: 'E-2 Visa', path: '/visas/e-2' },
    { name: data.name, path: `/visas/e-2/business-type/${type}` },
  ]

  const schemaFaqs = data.faqs.length > 0
    ? data.faqs
    : [{ question: `Can I use a ${data.name.toLowerCase()} for an E-2 visa?`, answer: `Many types of businesses qualify for the E-2 visa. Contact Watson Immigration Law to assess whether your specific ${data.name.toLowerCase()} meets E-2 requirements.` }]

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        schema={buildVisaPageSchema({
          visaName: 'E-2 Visa',
          industryName: data.name,
          slug: `/visas/e-2/business-type/${type}`,
          description: data.metaDescription,
          faqs: schemaFaqs,
        })}
      />

      <Breadcrumbs items={breadcrumbs} />

      <VisaHero
        headline={data.h1}
        subheadline={data.intro || `Watson Immigration Law advises E-2 investors on ${data.name.toLowerCase()} businesses and helps structure the investment to meet E-2 requirements.`}
        visaName="E-2 Visa"
        locationName={data.name}
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

              {data.faqs.length > 0 && <FaqAccordion faqs={data.faqs} />}
            </div>

            <div>
              <LeadCapture visaName={`E-2 Visa — ${data.name}`} />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
