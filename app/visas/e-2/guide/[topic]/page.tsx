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

interface TopicData {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  sections: Array<{ heading: string; body: string }>
  faqs: Array<{ question: string; answer: string }>
}

async function getTopicData(slug: string): Promise<TopicData | null> {
  try {
    const filePath = path.join(process.cwd(), 'content/e2/topics', `${slug}.json`)
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function generateStaticParams() {
  try {
    const dir = path.join(process.cwd(), 'content/e2/topics')
    const files = await fs.readdir(dir)
    return files
      .filter((f) => f.endsWith('.json'))
      .map((f) => ({ topic: f.replace('.json', '') }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  const { topic } = await params
  const data = await getTopicData(topic)
  if (!data) return {}
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `https://watsonimmigrationlaw.com/visas/e-2/guide/${topic}` },
  }
}

export default async function E2GuidePage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params
  const data = await getTopicData(topic)
  if (!data) notFound()

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Visa Services', path: '/visas' },
    { name: 'E-2 Visa', path: '/visas/e-2' },
    { name: data.title, path: `/visas/e-2/guide/${topic}` },
  ]

  const schemaFaqs = data.faqs.length > 0
    ? data.faqs
    : [{ question: `What should I know about ${data.title.toLowerCase()}?`, answer: `Watson Immigration Law advises E-2 investors on ${data.title.toLowerCase()}. Contact us for a consultation tailored to your situation.` }]

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        schema={buildVisaPageSchema({
          visaName: 'E-2 Visa',
          slug: `/visas/e-2/guide/${topic}`,
          description: data.metaDescription,
          faqs: schemaFaqs,
        })}
      />

      <Breadcrumbs items={breadcrumbs} />

      <VisaHero
        headline={data.h1}
        subheadline={data.intro || `Watson Immigration Law provides authoritative guidance on ${data.title.toLowerCase()} for E-2 Treaty Investor Visa applicants.`}
        visaName="E-2 Visa"
        locationName={data.title}
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
              <LeadCapture visaName="E-2 Visa" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
