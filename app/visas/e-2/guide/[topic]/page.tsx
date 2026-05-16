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

interface ComparisonTable {
  headers: string[]
  rows: string[][]
}

interface RelatedPage {
  slug: string
  title: string
}

interface TopicData {
  slug: string
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string
  sections: Array<{ heading: string; body: string }>
  faqs: Array<{ question: string; answer: string }>
  comparisonTable?: ComparisonTable
  relatedPages?: RelatedPage[]
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
    { name: data.h1, path: `/visas/e-2/guide/${topic}` },
  ]

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <JsonLd
        schema={buildVisaPageSchema({
          visaName: 'E-2 Visa',
          slug: `/visas/e-2/guide/${topic}`,
          description: data.metaDescription,
          faqs: data.faqs,
        })}
      />

      <Breadcrumbs items={breadcrumbs} />

      <VisaHero
        headline={data.h1}
        subheadline={data.intro}
        visaName="E-2 Visa"
        locationName="Guide"
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

              {data.comparisonTable && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-navy text-white">
                        {data.comparisonTable.headers.map((header, i) => (
                          <th key={i} className="text-left px-4 py-3 font-semibold first:rounded-tl-lg last:rounded-tr-lg">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.comparisonTable.rows.map((row, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-cream' : 'bg-white'}>
                          {row.map((cell, j) => (
                            <td key={j} className={`px-4 py-3 text-charcoal/80 ${j === 0 ? 'font-medium text-navy' : ''}`}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {data.faqs.length > 0 && <FaqAccordion faqs={data.faqs} />}

              {data.relatedPages && data.relatedPages.length > 0 && (
                <div>
                  <h2 className="font-display text-display-sm text-navy mb-4">Related guides</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {data.relatedPages.map((page) => (
                      <Link
                        key={page.slug}
                        href={`/visas/e-2/guide/${page.slug}`}
                        className="border rounded-xl2 p-4 hover:border-navy/40 transition-colors block"
                      >
                        <p className="font-medium text-navy text-sm">{page.title}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
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
