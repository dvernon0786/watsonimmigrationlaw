'use client'

import { useState } from 'react'

interface Faq {
  question: string
  answer: string
}

interface FaqAccordionProps {
  faqs: Faq[]
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  if (faqs.length === 0) return null

  return (
    <section className="py-section bg-cream">
      <div className="max-w-content mx-auto px-6">

        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="font-display text-display-md text-navy mb-4">Frequently Asked Questions</h2>
          <p className="text-charcoal/70 max-w-2xl mx-auto">Clear answers to common immigration questions.</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={index}
                className="bg-white border border-border rounded-xl2 p-5 shadow-card transition hover:shadow-card-hover"
              >
                {/* Question */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 text-left"
                >
                  <span className="text-base md:text-lg font-semibold text-navy leading-snug">{faq.question}</span>

                  {/* Icon */}
                  <span className="flex items-center justify-center w-8 h-8 rounded-full border border-border">
                    <svg
                      className={`w-4 h-4 text-gold-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      {isOpen ? (
                        <path d="M5 12h14" />
                      ) : (
                        <>
                          <path d="M5 12h14" />
                          <path d="M12 5v14" />
                        </>
                      )}
                    </svg>
                  </span>
                </button>

                {/* Answer */}
                {isOpen && (
                  <div className="mt-4 text-sm leading-relaxed text-charcoal/80">
                    <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                  </div>
                )}
              </div>
            )
          })}

        </div>

        {/* Bottom CTA */}
        <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-6 bg-white border border-border rounded-xl2 p-6 shadow-card">

          <p className="text-charcoal/70 text-sm">Still have questions? Speak directly with an immigration attorney.</p>

          <a href="/contact" className="px-6 py-3 bg-gold-400 text-navy font-semibold rounded-lg hover:bg-gold-500 transition">
            Contact Us
          </a>

        </div>

      </div>
    </section>
  )
}