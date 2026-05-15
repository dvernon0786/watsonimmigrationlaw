import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LeadCapture from '@/components/sections/LeadCapture'
import { buildBreadcrumbSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: 'Contact Watson Immigration Law | Free Consultation',
  description: 'Contact Watson Immigration Law for a free immigration consultation. Based in Seattle, WA. Book online, call (206) 292-5237, or email info@watsonimmigrationlaw.com.',
  alternates: { canonical: 'https://watsonimmigrationlaw.com/contact' },
}

const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact' }]

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="py-section bg-navy text-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">Get in Touch</p>
            <h1 className="font-display text-display-lg text-white mb-4 leading-tight">Your immigration journey starts with a conversation</h1>
            <p className="text-white/80 leading-relaxed">Book a free consultation with our team. We'll listen to your situation and lay out your options — clearly, honestly, and without pressure.</p>
          </div>
        </div>
      </section>

      <section className="py-section bg-cream">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Lead capture */}
            <div>
              <h2 className="font-display text-display-sm text-navy mb-6">Book your free consultation</h2>
              <LeadCapture />
            </div>

            {/* Office details */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-display-sm text-navy mb-6">Contact information</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Address', value: '1700 7th Avenue, Suite 2100\nSeattle, WA 98101', href: 'https://goo.gl/maps/LLHg6zCJmLn', linkText: 'View on Google Maps' },
                    { label: 'Phone', value: '(206) 292-5237', href: 'tel:+12062925237' },
                    { label: 'Email', value: 'info@watsonimmigrationlaw.com', href: 'mailto:info@watsonimmigrationlaw.com' },
                  ].map(item => (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-gold-400" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wide">{item.label}</p>
                        <p className="text-sm text-charcoal/80 whitespace-pre-line">{item.value}</p>
                        {item.href && (
                          <a href={item.href} className="text-xs text-gold-400 hover:text-gold-500 font-medium" target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                            {item.linkText || item.value}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-border rounded-xl2 p-5">
                <h3 className="font-semibold text-navy mb-2">Business hours</h3>
                <div className="space-y-1 text-sm text-charcoal/70">
                  <div className="flex justify-between"><span>Monday – Friday</span><span>9:00 AM – 5:00 PM PT</span></div>
                  <div className="flex justify-between"><span>Saturday – Sunday</span><span>Closed</span></div>
                </div>
                <p className="text-xs text-charcoal/50 mt-3">Leave a voicemail outside hours — we return calls the same or next business day.</p>
              </div>

              <div className="bg-navy rounded-xl2 p-5 text-white">
                <h3 className="font-semibold mb-2">Virtual consultations available</h3>
                <p className="text-white/70 text-sm leading-relaxed">We serve clients across the United States and internationally. All consultations are available via Zoom — no need to come to our Seattle office.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map embed */}
      <div className="h-80 bg-cream border-t border-border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.8!2d-122.333!3d47.609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1700+7th+Avenue%2C+Seattle+WA+98101!5e0!3m2!1sen!2sus!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Watson Immigration Law office location"
        />
      </div>
    </>
  )
}
