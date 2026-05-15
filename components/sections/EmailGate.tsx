'use client'

import { useState } from 'react'

interface EmailGateProps {
  title: string
  description: string
  buttonText?: string
  downloadLabel?: string
}

export default function EmailGate({ title, description, buttonText = 'Get Free Chapter', downloadLabel = 'Chapter 1 of The Startup Visa' }: EmailGateProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        message: `Lead magnet download request: ${downloadLabel}`,
        visaType: 'Lead Magnet',
      }),
    })
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="bg-navy rounded-xl2 p-8 text-white">
      <div className="max-w-lg mx-auto text-center">
        <div className="w-12 h-12 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="font-display text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white/70 mb-6 text-sm leading-relaxed">{description}</p>

        {submitted ? (
          <div className="bg-white/10 rounded-xl p-6">
            <svg className="w-10 h-10 text-gold-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-semibold text-white mb-1">Check your inbox!</p>
            <p className="text-white/70 text-sm">We've sent {downloadLabel} to {email}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 text-left">
            <input
              type="text"
              required
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-gold-400 text-sm"
            />
            <input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:border-gold-400 text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gold-400 text-navy font-bold rounded-lg hover:bg-gold-500 transition-colors disabled:opacity-60 text-sm"
            >
              {loading ? 'Sending…' : buttonText}
            </button>
            <p className="text-xs text-white/40 text-center">No spam. Unsubscribe anytime.</p>
          </form>
        )}
      </div>
    </div>
  )
}
