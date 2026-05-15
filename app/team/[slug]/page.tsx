import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LeadCapture from '@/components/sections/LeadCapture'
import { buildAttorneySchema, buildBreadcrumbSchema } from '@/lib/schemas'
import { getAttorneyData } from '@/lib/content'

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return [{ slug: 'tahmina-watson' }, { slug: 'nicole-lockett' }]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const attorney = await getAttorneyData(slug)
  if (!attorney) return {}
  return {
    title: `${attorney.name} | ${attorney.title} | Watson Immigration Law`,
    description: attorney.bio.split('\n')[0].slice(0, 160),
    alternates: { canonical: `https://watsonimmigrationlaw.com/team/${slug}` },
  }
}

export default async function AttorneyPage({ params }: Props) {
  const { slug } = await params
  const attorney = await getAttorneyData(slug)
  if (!attorney) notFound()

  const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Our Team', path: '/team' }, { name: attorney.name, path: `/team/${slug}` }]

  return (
    <>
      <JsonLd schema={buildAttorneySchema({ name: attorney.name, slug: attorney.slug, jobTitle: attorney.title, description: attorney.bio.split('\n')[0], image: attorney.image, barAdmissions: attorney.barAdmissions, education: attorney.education, awards: attorney.awards, sameAs: attorney.sameAs })} />
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />

      <Breadcrumbs items={breadcrumbs} />

      {/* Attorney hero */}
      <section className="py-section bg-navy text-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="flex-shrink-0">
              <img src={attorney.image || '/team/default.jpg'} alt={attorney.name} className="w-36 h-36 rounded-full object-cover shadow-xl border-4 border-gold-400" />
            </div>
            <div>
              <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">{attorney.title}</p>
              <h1 className="font-display text-display-lg text-white mb-2 leading-tight">{attorney.name}</h1>
              <p className="text-white/70 text-lg mb-4">{attorney.title}</p>
              <div className="flex flex-wrap gap-3">
                {attorney.sameAs?.map((url: string) => {
                  const label = url.includes('linkedin') ? 'LinkedIn' : url.includes('twitter') ? 'Twitter/X' : url.includes('instagram') ? 'Instagram' : url.includes('facebook') ? 'Facebook' : url.includes('abovethelaw') ? 'Above the Law' : url.includes('pixels.com') ? 'Photography' : 'Profile'
                  return (
                    <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-xs text-white/60 hover:text-gold-400 transition-colors border border-white/20 px-3 py-1 rounded-full">
                      {label}
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Bio */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="font-display text-display-sm text-navy mb-5">About {attorney.name.split(' ')[0]}</h2>
                {attorney.bio.split('\n\n').map((para: string, i: number) => (
                  <p key={i} className="text-charcoal/80 leading-relaxed mb-4">{para}</p>
                ))}
              </div>

              {/* Bar admissions */}
              {attorney.barAdmissions?.length > 0 && (
                <div className="bg-cream rounded-xl2 p-5">
                  <h3 className="font-semibold text-navy mb-3">Bar Admissions</h3>
                  <ul className="space-y-1">
                    {attorney.barAdmissions.map((bar: string, i: number) => (
                      <li key={i} className="text-sm text-charcoal/80 flex gap-2"><span className="text-gold-400">•</span>{bar}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Education */}
              <div className="bg-cream rounded-xl2 p-5">
                <h3 className="font-semibold text-navy mb-3">Education</h3>
                <div className="space-y-3">
                  {attorney.education.map((edu: any, i: number) => (
                    <div key={i}>
                      <p className="text-sm font-semibold text-navy">{edu.degree}</p>
                      <p className="text-sm text-charcoal/70">{edu.institution}{edu.year ? ` · ${edu.year}` : ''}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Awards */}
              {attorney.awards?.length > 0 && (
                <div className="bg-cream rounded-xl2 p-5">
                  <h3 className="font-semibold text-navy mb-3">Awards & Recognition</h3>
                  <ul className="space-y-1">
                    {attorney.awards.map((award: string, i: number) => (
                      <li key={i} className="text-sm text-charcoal/80 flex gap-2"><span className="text-gold-400">★</span>{award}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Languages */}
              {attorney.languages?.length > 0 && (
                <div className="bg-cream rounded-xl2 p-5">
                  <h3 className="font-semibold text-navy mb-3">Languages</h3>
                  <ul className="space-y-1">
                    {attorney.languages.map((lang: string, i: number) => (
                      <li key={i} className="text-sm text-charcoal/80 flex gap-2"><span className="text-gold-400">•</span>{lang}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Credentials */}
              {attorney.credentials?.length > 0 && (
                <div className="bg-cream rounded-xl2 p-5">
                  <h3 className="font-semibold text-navy mb-3">Professional Affiliations</h3>
                  <ul className="space-y-1">
                    {attorney.credentials.map((cred: string, i: number) => (
                      <li key={i} className="text-sm text-charcoal/80 flex gap-2"><span className="text-gold-400">•</span>{cred}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <LeadCapture />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
