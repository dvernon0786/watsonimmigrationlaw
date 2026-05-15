import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LeadCapture from '@/components/sections/LeadCapture'
import { buildBreadcrumbSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: 'How We Work | Watson Immigration Law',
  description: 'Learn how Watson Immigration Law works with clients — from the initial consultation through visa approval and beyond. Transparent process, clear communication, and genuine care.',
  alternates: { canonical: 'https://watsonimmigrationlaw.com/how-we-work' },
}

const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'How We Work', path: '/how-we-work' }]

const PROCESS_STEPS = [
  { number: '01', title: 'Free consultation', description: 'We start with a free consultation — by Zoom, phone, or in our Seattle office. We listen to your situation, ask the right questions, and give you an honest assessment of your options. No pressure, no upsell.', duration: 'Usually 30–60 minutes' },
  { number: '02', title: 'Case strategy', description: 'If you decide to work with us, we develop a detailed case strategy: which visa category to pursue, what evidence is needed, the timeline, and the costs. You get clarity before we file anything.', duration: '1–2 weeks' },
  { number: '03', title: 'Document preparation', description: 'We guide you through every document we need — explaining what each document is, why we need it, and how to get it. We review everything before submission and catch issues before they become RFEs.', duration: 'Varies by case' },
  { number: '04', title: 'Filing', description: 'We prepare and file your petition with all supporting documentation. For cases where premium processing is available and appropriate, we recommend it. You receive copies of everything we file.', duration: 'Days to file; weeks to months to adjudicate' },
  { number: '05', title: 'Active monitoring', description: 'We monitor your case status and keep you updated. If USCIS issues a Request for Evidence (RFE) or Notice of Intent to Deny (NOID), we respond promptly and thoroughly.', duration: 'Throughout the process' },
  { number: '06', title: 'Beyond approval', description: 'Immigration is not a one-time event — it\'s a relationship. We help you plan your next status, renewals, and the path to permanent residence. We are here for the long term.', duration: 'Ongoing' },
]

const WHAT_TO_EXPECT = [
  { title: 'Honest assessments', description: 'We tell you what we genuinely think — including when a case is difficult or inadvisable. We won\'t take on cases we don\'t believe in just to collect fees.' },
  { title: 'Responsive communication', description: 'We respond to emails and calls within 1 business day. You will never feel like you\'re being ignored or passed around.' },
  { title: 'Transparent fees', description: 'We provide a written fee agreement before we begin. No surprise invoices.' },
  { title: 'You own your documents', description: 'Everything we file on your behalf belongs to you. We send you copies of all submissions and correspondence.' },
  { title: 'Virtual first', description: 'We\'re equipped for fully virtual client relationships. Most of our clients never visit our Seattle office and that\'s completely fine.' },
  { title: 'Long-term planning', description: 'We help you think beyond the immediate visa to your long-term U.S. immigration goals — green card, citizenship, or maintaining status flexibility.' },
]

export default function HowWeWorkPage() {
  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="py-section bg-navy text-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">Our Process</p>
            <h1 className="font-display text-display-lg text-white mb-6 leading-tight">How we work with you</h1>
            <p className="text-white/80 leading-relaxed">Immigration matters are personal, often urgent, and always consequential. Here is exactly how we approach working with our clients — from first contact to long-term immigration planning.</p>
          </div>
        </div>
      </section>

      <section className="py-section bg-cream">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">

              {/* Process */}
              <div>
                <h2 className="font-display text-display-sm text-navy mb-8">The process</h2>
                <div className="space-y-5">
                  {PROCESS_STEPS.map(step => (
                    <div key={step.number} className="flex gap-5 bg-white border border-border rounded-xl2 p-5 shadow-card">
                      <div className="font-display font-bold text-3xl text-gold-400 leading-none flex-shrink-0 w-12 text-center pt-0.5">
                        {step.number}
                      </div>
                      <div>
                        <div className="flex items-center justify-between gap-3 mb-1 flex-wrap">
                          <h3 className="font-semibold text-navy">{step.title}</h3>
                          <span className="text-xs text-charcoal/50 bg-cream border border-border px-2 py-0.5 rounded-full">{step.duration}</span>
                        </div>
                        <p className="text-sm text-charcoal/70 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What to expect */}
              <div>
                <h2 className="font-display text-display-sm text-navy mb-6">What you can expect from us</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {WHAT_TO_EXPECT.map(item => (
                    <div key={item.title} className="bg-white border border-border rounded-xl2 p-4 shadow-card">
                      <h3 className="font-semibold text-navy text-sm mb-1 flex items-center gap-2">
                        <span className="text-gold-400">✓</span> {item.title}
                      </h3>
                      <p className="text-xs text-charcoal/70 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
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
