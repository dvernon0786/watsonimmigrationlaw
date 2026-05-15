import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import EmailGate from '@/components/sections/EmailGate'
import { buildBreadcrumbSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: 'Immigration Resources | Free Guides & Tools | Watson Immigration Law',
  description: 'Free immigration resources from Watson Immigration Law — visa guides, government links, fee schedules, processing time trackers, and free guides for founders and investors.',
  alternates: { canonical: 'https://watsonimmigrationlaw.com/resources' },
}

const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Resources', path: '/resources' }]

const GOV_LINKS = [
  { name: 'USCIS Processing Times', url: 'https://egov.uscis.gov/processing-times/', desc: 'Check current processing times for any USCIS form' },
  { name: 'USCIS Fee Schedule', url: 'https://www.uscis.gov/g-1055', desc: 'Current filing fees for all USCIS petitions and applications' },
  { name: 'Visa Bulletin (Priority Dates)', url: 'https://travel.state.gov/content/travel/en/legal/visa-law0/visa-bulletin.html', desc: 'Monthly visa bulletin from the State Department' },
  { name: 'I-9 Central', url: 'https://www.uscis.gov/i-9-central', desc: 'Official I-9 employer compliance resource' },
  { name: 'E-Verify', url: 'https://www.e-verify.gov/', desc: 'Employment eligibility verification system' },
  { name: 'PERM Labor Certification', url: 'https://www.dol.gov/agencies/eta/foreign-labor/programs/perm', desc: 'DOL PERM application portal and requirements' },
  { name: 'State Dept. Visa Wait Times', url: 'https://travel.state.gov/content/travel/en/us-visas/visa-information-resources/wait-times.html', desc: 'Consular appointment wait times by country' },
  { name: 'USCIS Case Status Check', url: 'https://egov.uscis.gov/casestatus/landing.do', desc: 'Check the status of your pending USCIS case' },
]

const GUIDES = [
  { title: 'H-1B Lottery Guide', description: 'Everything you need to know about the H-1B lottery process — registration, selection, petition filing, and what to do if you\'re not selected.', href: '/visas/h-1b', internal: true },
  { title: 'EB-5 Source of Funds Guide', description: 'A comprehensive overview of EB-5 source of funds documentation requirements — the most complex part of the EB-5 process.', href: '/visas/eb-5', internal: true },
  { title: 'O-1A Evidence Checklist', description: 'The 8 criteria USCIS uses to evaluate O-1A petitions — and the types of evidence that support each criterion.', href: '/visas/o-1', internal: true },
  { title: 'EB-2 NIW Dhanasar Framework', description: 'How USCIS evaluates National Interest Waiver petitions — the 3-prong Dhanasar test explained in plain English.', href: '/visas/eb-2-niw', internal: true },
  { title: 'Startup Founder Visa Comparison', description: 'Side-by-side comparison of the best visa options for startup founders: O-1A, EB-1A, EB-2 NIW, E-2, and H-1B.', href: '/for/founders', internal: true },
  { title: 'Post-Lottery Alternatives Guide', description: 'What to do if you were not selected in the H-1B lottery — comprehensive guide to all available alternatives.', href: '/blog', internal: true },
]

export default function ResourcesPage() {
  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="py-section bg-navy text-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">Resources</p>
            <h1 className="font-display text-display-lg text-white mb-6 leading-tight">Immigration resources & tools</h1>
            <p className="text-white/80 leading-relaxed">Free guides, government links, and tools to help you navigate U.S. immigration. Curated by the attorneys at Watson Immigration Law.</p>
          </div>
        </div>
      </section>

      <section className="py-section bg-cream">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">

              {/* Guides */}
              <div>
                <h2 className="font-display text-display-sm text-navy mb-6">Immigration guides</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {GUIDES.map((guide, i) => (
                    <Link
                      key={i}
                      href={guide.href}
                      className="group bg-white border border-border rounded-xl2 p-4 shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all"
                    >
                      <h3 className="font-semibold text-navy text-sm mb-1 group-hover:text-gold-400 transition-colors">{guide.title}</h3>
                      <p className="text-xs text-charcoal/60 leading-relaxed">{guide.description}</p>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Government links */}
              <div>
                <h2 className="font-display text-display-sm text-navy mb-6">Official government resources</h2>
                <div className="space-y-2">
                  {GOV_LINKS.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 bg-white border border-border rounded-xl2 p-4 hover:border-gold-400 group transition-colors"
                    >
                      <div className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy group-hover:text-gold-400 transition-colors">{link.name}</p>
                        <p className="text-xs text-charcoal/60">{link.desc}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <EmailGate
                title="Free chapter: The Startup Visa"
                description="Download Chapter 1 of Tahmina's bestselling guide for international founders and entrepreneurs."
                buttonText="Download free chapter"
              />
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
