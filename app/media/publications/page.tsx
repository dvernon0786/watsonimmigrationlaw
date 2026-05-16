import { promises as fs } from 'fs'
import path from 'path'
import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LeadCapture from '@/components/sections/LeadCapture'
import MediaLogos from '@/components/sections/MediaLogos'
import { buildBreadcrumbSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: 'Publications | Tahmina Watson in the Media | Watson Immigration Law',
  description: 'Tahmina Watson\'s written publications including articles in Above the Law, Entrepreneur Magazine, Yes! Magazine, Puget Sound Business Journal, and more.',
  alternates: { canonical: 'https://watsonimmigrationlaw.com/media/publications' },
}

const breadcrumbs = [
  { name: 'Home', path: '/' },
  { name: 'In the Media', path: '/media' },
  { name: 'Publications', path: '/media/publications' },
]

interface Publication {
  title: string
  outlet: string
  date: string
  url: string | null
  type: string
}

async function getPublications(): Promise<Publication[]> {
  const filePath = path.join(process.cwd(), 'content/media/publications.json')
  const raw = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(raw)
}

const TYPE_LABELS: Record<string, string> = {
  article: 'Articles',
  opinion: 'Opinion Pieces',
  book: 'Books',
  'book-chapter': 'Book Chapters',
  'blog-post': 'Blog Posts',
  'open-letter': 'Open Letters',
  'guest-post': 'Guest Posts',
  editorial: 'Editorial',
  newsletter: 'Newsletter',
}

const TYPE_ORDER = ['article', 'opinion', 'book', 'book-chapter', 'blog-post', 'open-letter', 'guest-post', 'newsletter', 'editorial']

export default async function PublicationsPage() {
  const publications = await getPublications()

  const grouped = TYPE_ORDER.reduce<Record<string, Publication[]>>((acc, type) => {
    const label = TYPE_LABELS[type] ?? type
    if (!acc[label]) {
      const items = publications.filter(p => p.type === type)
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
            <h1 className="font-display text-display-lg text-white mb-6 leading-tight">Publications</h1>
            <p className="text-white/80 leading-relaxed">Tahmina Watson writes regularly on U.S. immigration law, entrepreneur visas, and immigration policy reform. Her work appears in Above the Law, Entrepreneur Magazine, Yes! Magazine, and publications across the country.</p>
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
                              <p className="text-xs font-semibold text-gold-400 mb-1">{item.outlet} · {item.date}</p>
                              <h3 className="text-sm font-semibold text-navy group-hover:text-gold-400 transition-colors leading-snug">{item.title}</h3>
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
                          <p className="text-xs font-semibold text-gold-400 mb-1">{item.outlet} · {item.date}</p>
                          <h3 className="text-sm font-semibold text-navy leading-snug">{item.title}</h3>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              ))}

              <div className="bg-white border border-border rounded-xl2 p-6">
                <h2 className="font-semibold text-navy mb-2">Press inquiries</h2>
                <p className="text-sm text-charcoal/70 leading-relaxed mb-3">For media inquiries, interview requests, or expert commentary on U.S. immigration law, please contact us directly.</p>
                <a href="mailto:info@watsonimmigrationlaw.com?subject=Press Inquiry" className="inline-flex items-center gap-2 text-gold-400 font-semibold text-sm hover:text-gold-500">
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
