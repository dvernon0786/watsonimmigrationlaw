'use client'

import { useState, useEffect } from 'react'

interface LeadCaptureProps {
  visaName?: string
  locationName?: string
}

type Tab = 'calendly' | 'form' | 'phone'

export default function LeadCapture({ visaName, locationName }: LeadCaptureProps) {
  const [activeTab, setActiveTab] = useState<Tab>('calendly')
  const [formState, setFormState] = useState({
    name: '', email: '', phone: '', message: '', submitted: false, loading: false,
  })

  // Load Calendly script only once
  useEffect(() => {
    if (typeof window !== 'undefined' && !document.querySelector('script[src*="calendly"]')) {
      const script = document.createElement('script')
      script.src = 'https://assets.calendly.com/assets/external/widget.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'calendly', label: 'Book Call',    icon: '📅' },
    { id: 'form',     label: 'Send Message', icon: '✉️' },
    { id: 'phone',    label: 'Call Now',     icon: '📞' },
  ]

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState((s) => ({ ...s, loading: true }))
    // POST to /api/contact (implement with Resend or Nodemailer)
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formState,
        visa: visaName,
        location: locationName,
      }),
    })
    setFormState((s) => ({ ...s, loading: false, submitted: true }))
  }

  return (
    <div className="bg-white rounded-xl3 border border-border shadow-card overflow-hidden mb-6">
      {/* Header */}
      <div className="bg-navy px-6 py-5">
        <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-1">
          Free Consultation
        </p>
        <h3 className="font-display text-xl text-white leading-snug">
          Speak With an Immigration Attorney
        </h3>
        {visaName && (
          <p className="text-white/60 text-sm mt-1">
            {visaName}{locationName ? ` · ${locationName}` : ''}
          </p>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-xs font-semibold transition-colors ${
              activeTab === tab.id
                ? 'text-navy border-b-2 border-gold-400 bg-cream'
                : 'text-gray-500 hover:text-navy'
            }`}
          >
            <span className="mr-1">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div className="p-6">

        {/* ── Calendly ── */}
        {activeTab === 'calendly' && (
          <div>
            <p className="text-sm text-charcoal/70 mb-4 leading-relaxed">
              Book a 30-minute consultation directly with our team. Select a time that works for you.
            </p>
            {/* Calendly inline embed */}
            <div
              className="calendly-inline-widget rounded-lg overflow-hidden"
              data-url="https://calendly.com/watsonimmigrationlaw/consultation?hide_gdpr_banner=1&primary_color=1a2e4a"
              style={{ minWidth: '100%', height: '380px' }}
            />
          </div>
        )}

        {/* ── Contact form ── */}
        {activeTab === 'form' && (
          formState.submitted ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h4 className="font-display text-lg text-navy mb-2">Message Sent</h4>
              <p className="text-sm text-charcoal/60">
                We'll respond within 1 business day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) => setFormState((s) => ({ ...s, name: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400 transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) => setFormState((s) => ({ ...s, email: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400 transition-colors"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formState.phone}
                  onChange={(e) => setFormState((s) => ({ ...s, phone: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400 transition-colors"
                  placeholder="+1 (---) --- ----"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">
                  Tell us about your situation *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-400/40 focus:border-gold-400 transition-colors resize-none"
                  placeholder={`I'm looking for help with ${visaName || 'immigration'}...`}
                />
              </div>
              <button
                type="submit"
                disabled={formState.loading}
                className="w-full py-3 bg-navy text-white text-sm font-semibold rounded-lg hover:bg-navy-500 transition-colors disabled:opacity-60 shadow-card"
              >
                {formState.loading ? 'Sending…' : 'Send Message'}
              </button>
              <p className="text-xs text-gray-400 text-center">
                Attorney-client privilege applies. We respond within 1 business day.
              </p>
            </form>
          )
        )}

        {/* ── Phone ── */}
        {activeTab === 'phone' && (
          <div className="text-center py-4">
            <p className="text-sm text-charcoal/70 mb-6 leading-relaxed">
              Call us directly during business hours (Mon–Fri, 9am–5pm PT). Leave a message and we'll return your call the same day.
            </p>
            <a
              href="tel:+12062925237"
              className="inline-flex items-center justify-center gap-3 w-full py-4 bg-gold-400 text-navy font-bold text-lg rounded-lg hover:bg-gold-500 transition-colors shadow-cta"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
              </svg>
              (206) 292-5237
            </a>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-gray-400 mb-2">Or email us at</p>
              <a
                href="mailto:info@watsonimmigrationlaw.com"
                className="text-sm text-navy font-semibold hover:text-gold-400 transition-colors"
              >
                info@watsonimmigrationlaw.com
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
