import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import BookCard from '@/components/sections/BookCard'
import EmailGate from '@/components/sections/EmailGate'
import { buildBreadcrumbSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: "Tahmina Watson's Books on Immigration | Watson Immigration Law",
  description: "Tahmina Watson is the author of four books on U.S. immigration, including The Startup Visa — the definitive guide for international founders and entrepreneurs. Available on Amazon.",
  alternates: { canonical: 'https://watsonimmigrationlaw.com/books' },
}

const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Books', path: '/books' }]

const BOOKS = [
  {
    title: 'The Startup Visa',
    subtitle: '2nd Edition — Updated & Expanded',
    description: 'The definitive guide to U.S. immigration for international startup founders and entrepreneurs. Covers every visa pathway available to founders — O-1A, EB-1A, EB-2 NIW, E-2, H-1B, and more. Includes real case studies and step-by-step guidance.',
    audience: 'Founders, entrepreneurs, startup attorneys',
    coverImage: '/books/startup-visa-2nd.jpg',
    amazonUrl: 'https://www.amazon.com/Startup-Visa-Immigration-Startups-Founders/dp/1735758574/',
    year: 2021,
    featured: true,
  },
  {
    title: 'La Visa Startup',
    subtitle: 'Spanish Edition — La Visa Startup para Fundadores',
    description: 'The complete startup visa guide in Spanish — making immigration knowledge accessible to Latin American founders, entrepreneurs, and investors seeking to build businesses in the United States.',
    audience: 'Spanish-speaking founders & entrepreneurs',
    coverImage: '/books/startup-visa-spanish.jpg',
    amazonUrl: 'https://www.amazon.com/Startup-Visa-Inmigraci%C3%B3n-Emergentes-Fundadores/dp/B0CKZKDHN7/',
    year: 2023,
    language: 'Spanish',
  },
  {
    title: 'The Startup Visa',
    subtitle: '1st Edition',
    description: 'The book that established Tahmina Watson as the leading voice on startup immigration. The original case for a dedicated startup visa and the immigration options available to international founders.',
    audience: 'Founders, investors, immigration professionals',
    coverImage: '/books/startup-visa-1st.jpg',
    amazonUrl: 'https://www.amazon.com/Startup-Visa-Economic-Prosperity-America/dp/1735758531/',
    year: 2015,
  },
  {
    title: 'Legal Heroes in the Trump Era',
    subtitle: 'Inspired, Bold, and Fearless',
    description: 'Powerful stories of immigration attorneys who stood up for their clients during the turbulent Trump years — challenging executive orders, defending detained immigrants, and fighting for justice in a polarized political climate.',
    audience: 'Legal professionals, immigration advocates, general readers',
    coverImage: '/books/legal-heroes.jpg',
    amazonUrl: 'https://www.amazon.com/Legal-Heroes-Trump-Era-Inspired/dp/1735758507/',
    year: 2019,
  },
]

export default function BooksPage() {
  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <section className="py-section bg-navy text-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">Published Works</p>
            <h1 className="font-display text-display-lg text-white mb-6 leading-tight">
              Books by Tahmina Watson
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              Tahmina is one of the few immigration attorneys who has written books making complex visa strategies accessible to founders and investors worldwide — in both English and Spanish.
            </p>
          </div>
        </div>
      </section>

      {/* Books */}
      <section className="py-section bg-cream">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="space-y-6 max-w-3xl mx-auto">
            {BOOKS.map((book, i) => (
              <BookCard key={i} {...book} />
            ))}
          </div>
        </div>
      </section>

      {/* Lead magnet */}
      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <EmailGate
              title="Download a free chapter of The Startup Visa"
              description="Get Chapter 1 of The Startup Visa (2nd Edition) delivered to your inbox — covering the core visa pathways for international founders who want to build their startup in the United States."
              buttonText="Send me the free chapter"
              downloadLabel="Chapter 1 of The Startup Visa (2nd Edition)"
            />
          </div>
        </div>
      </section>
    </>
  )
}
