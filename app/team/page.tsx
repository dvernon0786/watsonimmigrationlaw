import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LeadCapture from '@/components/sections/LeadCapture'
import { buildBreadcrumbSchema } from '@/lib/schemas'
import { getAttorneys } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Our Immigration Attorneys | Watson Immigration Law',
  description: 'Meet Tahmina Watson and the team at Watson Immigration Law. Expert immigration attorneys based in Seattle serving clients worldwide.',
  alternates: { canonical: 'https://watsonimmigrationlaw.com/team' },
}

const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Our Team', path: '/team' }]

export default async function TeamPage() {
  const attorneys = await getAttorneys()

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="py-section bg-navy text-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">Our Team</p>
            <h1 className="font-display text-display-lg text-white mb-6 leading-tight">Attorneys who genuinely care about your future</h1>
            <p className="text-xl text-white/80 leading-relaxed">Every person who walks through our door — virtually or in person — is dealing with something deeply personal. We bring 15+ years of experience and real human commitment to every case.</p>
          </div>
        </div>
      </section>

      <section className="py-section bg-cream">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="space-y-8">
            {attorneys.map((attorney: any) => (
              <div key={attorney.slug} className="bg-white border border-border rounded-xl2 shadow-card overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-48 bg-cream flex items-center justify-center p-6 flex-shrink-0">
                    <img
                      src={attorney.image || '/team/default.jpg'}
                      alt={attorney.name}
                      className="w-32 h-32 rounded-full object-cover shadow-lg"
                    />
                  </div>
                  <div className="p-6 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                      <h2 className="font-display font-bold text-navy text-2xl">{attorney.name}</h2>
                      <Link href={`/team/${attorney.slug}`} className="text-sm text-gold-400 font-semibold hover:text-gold-500">
                        Full bio →
                      </Link>
                    </div>
                    <p className="text-charcoal/60 mb-4">{attorney.title}</p>
                    <p className="text-sm text-charcoal/80 leading-relaxed mb-4 line-clamp-3">{attorney.bio.split('\n')[0]}</p>
                    <div className="flex flex-wrap gap-2">
                      {attorney.credentials.slice(0, 3).map((cred: string, i: number) => (
                        <span key={i} className="text-xs bg-cream border border-border px-3 py-1 rounded-full text-charcoal/70">{cred}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-section bg-white">
        <div className="max-w-lg mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="font-display text-display-sm text-navy mb-3">Ready to speak with our team?</h2>
            <p className="text-charcoal/70 text-sm">Book a free consultation — virtually or by phone.</p>
          </div>
          <LeadCapture />
        </div>
      </section>
    </>
  )
}
