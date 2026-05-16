import { promises as fs } from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LeadCapture from '@/components/sections/LeadCapture'
import MediaLogos from '@/components/sections/MediaLogos'
import { buildBreadcrumbSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: 'Presentations & Speaking | Tahmina Watson in the Media | Watson Immigration Law',
  description: 'Tahmina Watson\'s speaking engagements, podcast appearances, webinars, and conference presentations on U.S. immigration law and policy.',
  alternates: { canonical: 'https://watsonimmigrationlaw.com/media/presentations' },
}

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'In the Media', path: '/media' },
  { name: 'Presentations', path: '/media/presentations' },
]

interface Presentation {
  title: string
  host: string
  date: string
  url: string | null
  format: string
  description: string | null
}

async function getPresentations(): Promise<Presentation[]> {
  const filePath = path.join(process.cwd(), 'content/media/presentations.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

const FORMAT_LABELS: Record<string, string> = {
  podcast: 'Podcasts',
  webinar: 'Webinars',
  conference: 'Conferences & CLEs',
  'in-person-event': 'Events & Speaking Engagements',
  radio: 'Radio',
  video: 'Video',
  interview: 'Interviews',
  award: 'Awards & Recognition',
  other: 'Other',
}

const FORMAT_ORDER = ['podcast', 'webinar', 'conference', 'in-person-event', 'radio', 'video', 'interview', 'award', 'other']

export default async function PresentationsPage() {
  const presentations = await getPresentations()

  const grouped = FORMAT_ORDER.reduce<Record<string, Presentation[]>>((acc, fmt) => {
    const label = FORMAT_LABELS[fmt] ?? fmt
    if (!acc[label]) {
      const items = presentations.filter(p => p.format === fmt)
      if (items.length > 0) acc[label] = items
    }
    return acc
  }, {})

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="py-section bg-navy text-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">Press & Media</p>
            <h1 className="font-display text-display-lg text-white mb-6 leading-tight">Presentations & Speaking</h1>
            <p className="text-white/80 leading-relaxed">Tahmina Watson is a sought-after speaker on immigration law, entrepreneur visas, and advocacy. She has spoken at conferences, universities, bar associations, and appeared on dozens of podcasts and webinars nationwide.</p>
          </div>
        </div>
      </section>

      <section className="py-section bg-cream">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">

              <MediaLogos />

              {Object.entries(grouped).map(([label, items]) => (
                <div key={label}>
                  <h2 className="font-display text-display-sm text-navy mb-5">{label}</h2>
                  <div className="space-y-3">
                    {items.map((item, i) => (
                      item.url ? (
                        <a
                          key={i}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group block bg-white border border-border rounded-xl2 p-4 shadow-card hover:shadow-card-hover transition-all"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-gold-400 mb-1">{item.host} · {item.date}</p>
                              <h3 className="text-sm font-semibold text-navy group-hover:text-gold-400 transition-colors leading-snug">{item.title}</h3>
                              {item.description && (
                                <p className="text-xs text-charcoal/60 mt-1">{item.description}</p>
                              )}
                            </div>
                            <svg className="w-4 h-4 text-charcoal/30 group-hover:text-gold-400 flex-shrink-0 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </a>
                      ) : (
                        <div
                          key={i}
                          className="block bg-white border border-border rounded-xl2 p-4 shadow-card"
                        >
                          <p className="text-xs font-semibold text-gold-400 mb-1">{item.host} · {item.date}</p>
                          <h3 className="text-sm font-semibold text-navy leading-snug">{item.title}</h3>
                          {item.description && (
                            <p className="text-xs text-charcoal/60 mt-1">{item.description}</p>
                          )}
                        </div>
                      )
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-white border border-border rounded-xl2 p-6">
                <h2 className="font-semibold text-navy mb-2">Speaking inquiries</h2>
                <p className="text-sm text-charcoal/70 leading-relaxed mb-3">To invite Tahmina Watson to speak at your event, conference, or podcast, please contact us directly.</p>
                <a href="mailto:info@watsonimmigrationlaw.com?subject=Speaking Inquiry" className="inline-flex items-center gap-2 text-gold-400 font-semibold text-sm hover:text-gold-500">
                  info@watsonimmigrationlaw.com →
                </a>
              </div>
            </div>

            <aside>
              <LeadCapture />
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
