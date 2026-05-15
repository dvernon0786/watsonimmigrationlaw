import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LeadCapture from '@/components/sections/LeadCapture'
import { buildBreadcrumbSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: 'Events & Speaking | Watson Immigration Law',
  description: 'Upcoming events, webinars, and speaking appearances by Tahmina Watson. Immigration law seminars, entrepreneur events, and policy discussions.',
  alternates: { canonical: 'https://watsonimmigrationlaw.com/events' },
}

const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Events', path: '/events' }]

const UPCOMING_EVENTS: any[] = []
// Populate from content/events.json once created

const PAST_EVENTS = [
  { title: 'SelectUSA ASEAN', date: 'February 2026', location: 'ASEAN Region', type: 'Speaking', description: 'Tahmina spoke to startup founders and investors across Southeast Asia about U.S. immigration pathways and visa strategies for international entrepreneurs.' },
  { title: 'Rotary Club of Mercer Island', date: 'April 21, 2026', location: 'Mercer Island, WA', type: 'Speaking', description: '"What Businesses Need to Know Now: Navigating Rapid Changes in U.S. Immigration" — presentation on immigration policy changes affecting Pacific Northwest employers.' },
  { title: 'H-1B Lottery Webinar: What to Do If You Weren\'t Selected', date: 'April 2026', location: 'Virtual', type: 'Webinar', description: 'Free public webinar covering alternative visa options for professionals not selected in the H-1B lottery, including O-1, L-1, TN, and cap-exempt H-1B options.' },
  { title: 'The Detention Lottery Theatre Event', date: 'March 2026', location: 'Seattle, WA', type: 'Community', description: 'Watson Immigration Law supported this powerful theatre experience exploring the realities of America\'s immigration court system.' },
  { title: 'Legal Foundation of Washington Goldmark Lunch', date: 'February 2026', location: 'Seattle, WA', type: 'Networking', description: 'Tahmina attended the annual Goldmark Lunch celebrating 40 years of the Legal Foundation of Washington.' },
]

const SPEAKING_TOPICS = [
  'U.S. immigration strategies for international startup founders',
  'Investor visa options: EB-5, E-2, and beyond',
  'H-1B reform and what it means for employers',
  'The case for a U.S. startup visa',
  'Immigration law and entrepreneurship: building inclusive business ecosystems',
  'Legal heroes: immigration attorneys as advocates',
]

export default function EventsPage() {
  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="py-section bg-navy text-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">Events & Appearances</p>
            <h1 className="font-display text-display-lg text-white mb-6 leading-tight">Events & Speaking Appearances</h1>
            <p className="text-white/80 leading-relaxed">Tahmina Watson speaks at conferences, webinars, and community events on U.S. immigration, entrepreneurship, and policy. If you'd like to invite her to speak, get in touch.</p>
          </div>
        </div>
      </section>

      <section className="py-section bg-cream">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">

              {/* Upcoming */}
              <div>
                <h2 className="font-display text-display-sm text-navy mb-6">Upcoming events</h2>
                {UPCOMING_EVENTS.length === 0 ? (
                  <div className="bg-white border border-border rounded-xl2 p-8 text-center text-charcoal/50">
                    <p>No upcoming events listed at this time.</p>
                    <p className="text-sm mt-1">Subscribe to our newsletter or follow us on social media for announcements.</p>
                  </div>
                ) : null}
              </div>

              {/* Past events */}
              <div>
                <h2 className="font-display text-display-sm text-navy mb-6">Recent appearances</h2>
                <div className="space-y-4">
                  {PAST_EVENTS.map((event, i) => (
                    <div key={i} className="bg-white border border-border rounded-xl2 p-5 shadow-card">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h3 className="font-semibold text-navy">{event.title}</h3>
                        <span className="text-xs bg-gold-400/20 text-navy font-semibold px-2 py-0.5 rounded-full">{event.type}</span>
                      </div>
                      <p className="text-xs text-charcoal/50 mb-2">{event.date} · {event.location}</p>
                      <p className="text-sm text-charcoal/70 leading-relaxed">{event.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Speaking topics */}
              <div className="bg-white border border-border rounded-xl2 p-6">
                <h2 className="font-semibold text-navy mb-4">Speaking topics</h2>
                <ul className="space-y-2">
                  {SPEAKING_TOPICS.map((topic, i) => (
                    <li key={i} className="text-sm text-charcoal/80 flex gap-2">
                      <span className="text-gold-400 flex-shrink-0">•</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="bg-navy text-white rounded-xl2 p-5">
                <h3 className="font-semibold mb-2">Book Tahmina to speak</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-4">Interested in having Tahmina speak at your event, conference, or organization? Get in touch with details about your event.</p>
                <a href="mailto:info@watsonimmigrationlaw.com?subject=Speaking Inquiry" className="block text-center py-2 bg-gold-400 text-navy font-semibold rounded-lg text-sm hover:bg-gold-500 transition-colors">
                  Send speaking inquiry
                </a>
              </div>
              <LeadCapture />
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
