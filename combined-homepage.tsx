// Combined homepage and related components
// Copy of app/page.tsx and its section components for easy reference.

// File: app/page.tsx
import type { Metadata } from 'next';
import { buildFaqSchema, buildBreadcrumbSchema } from './lib/schemas';
import { getAttorneys } from './lib/content';

// NOTE: This is a combined reference file. In the real app these components live
// in separate files under `app/` and `components/sections/`.

export const metadata: Metadata = {
  title: 'Watson Immigration Law | Expert Immigration Attorneys in Seattle',
  description: 'Leading immigration law firm in Seattle specializing in H-1B, EB-5, E-2, O-1, and L-1 visas. Trusted by entrepreneurs, investors, and businesses worldwide.',
  keywords: 'immigration attorney Seattle, H-1B visa lawyer, EB-5 investor visa, E-2 treaty visa, O-1 extraordinary ability, L-1 intracompany transfer',
};

export default async function CombinedHomepage() {
  const attorneys = await getAttorneys();

  const faqs = [
    {
      question: "What types of visas do you specialize in?",
      answer: "We specialize in work visas (H-1B, O-1, L-1), investor visas (EB-5, E-2), and business immigration. Our attorneys have extensive experience with complex cases including multinational transfers, extraordinary ability petitions, and investment-based green cards."
    },
    {
      question: "How long does the immigration process typically take?",
      answer: "Processing times vary by visa type and individual circumstances. H-1B petitions typically take 2-6 months, EB-5 can take 12-24 months, and E-2 visas are usually processed within 2-4 weeks. We provide detailed timelines during your consultation."
    },
    {
      question: "Do you represent both individuals and companies?",
      answer: "Yes, we represent both individual applicants and sponsoring companies. Our team handles the full spectrum of immigration needs, from individual visa applications to corporate immigration programs for growing businesses."
    },
    {
      question: "What sets Watson Immigration Law apart?",
      answer: "Our founder, Tahmina Watson, has over 15 years of experience and has been featured in Forbes, Bloomberg, and The New York Times. We combine deep legal expertise with a client-first approach, ensuring successful outcomes for even the most complex cases."
    },
    {
      question: "Do you offer remote consultations?",
      answer: "Yes, we offer virtual consultations via Zoom for clients worldwide. Many of our clients are based outside the Seattle area, and we provide the same level of service remotely as we do in person."
    }
  ];

  const relatedPages = [
    {
      title: "H-1B Visa Services",
      description: "Specialty occupation visas for skilled professionals",
      href: "/visas/h-1b",
      image: "/visas/h-1b.jpg"
    },
    {
      title: "EB-5 Investor Program",
      description: "Green card through business investment",
      href: "/visas/eb-5",
      image: "/visas/eb-5.jpg"
    },
    {
      title: "E-2 Treaty Investor Visa",
      description: "Non-immigrant visa for treaty country investors",
      href: "/visas/e-2",
      image: "/visas/e-2.jpg"
    },
    {
      title: "O-1 Extraordinary Ability",
      description: "Visa for individuals with extraordinary ability",
      href: "/visas/o-1",
      image: "/visas/o-1.jpg"
    }
  ];

  return (
    <>
      <JsonLd schema={buildFaqSchema(faqs)} />
      <JsonLd schema={buildBreadcrumbSchema([
        { name: 'Home', path: '/' }
      ])} />

      <Hero />

      <LeadCapture />

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Immigration Attorneys
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team combines deep legal expertise with a passion for helping clients achieve their immigration goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {attorneys.map((attorney) => (
              <AttorneyCard
                key={attorney.slug}
                name={attorney.name}
                title={attorney.title}
                image={attorney.image}
                slug={attorney.slug}
                credentials={attorney.credentials}
              />
            ))}
          </div>
        </div>
      </section>

      <MediaLogos />

      <FaqAccordion faqs={faqs} />

      <RelatedPages pages={relatedPages} />
    </>
  )
}


// --------------------------
// Inlined components below
// --------------------------

// File: components/seo/JsonLd.tsx
export function JsonLd({ schema }: { schema: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema, null, 2),
      }}
    />
  )
}

// File: components/sections/Hero.tsx
export function Hero() {
  return (
    <section className="py-section bg-navy-gradient text-white">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Headline */}
          <h1 className="font-display text-display-xl text-white mb-6 leading-tight">
            Immigration Law for
            <br />
            <span className="text-gold-400">Entrepreneurs, Investors & Businesses</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
            Expert counsel on EB-5, E-2, H-1B, O-1, and L-1 visas.
            Seattle-based firm serving clients worldwide.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gold-400 text-navy font-bold text-lg rounded-lg hover:bg-gold-500 transition-colors shadow-cta"
            >
              Book Free Consultation
            </a>
            <a
              href="/visas"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold text-lg rounded-lg hover:bg-white hover:text-navy transition-colors"
            >
              Our Practice Areas
            </a>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              15+ Years Experience
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Featured in NYT, Forbes, Bloomberg
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-gold-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              50+ Countries Served
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// File: components/sections/LeadCapture.tsx
// Note: original is a client component using hooks; kept as reference only.
export function LeadCapture() {
  return (
    <div className="bg-white rounded-xl3 border border-gray-100 shadow-card overflow-hidden mb-6">
      <div className="bg-navy px-6 py-5">
        <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-1">Free Consultation</p>
        <h3 className="font-display text-xl text-white leading-snug">Speak With an Immigration Attorney</h3>
        <p className="text-white/60 text-sm mt-1">Schedule a call or send a message.</p>
      </div>
      <div className="p-6">
        <p className="text-sm text-charcoal/70 mb-4 leading-relaxed">Use the embedded contact options to reach us.</p>
        <a href="/contact" className="inline-block w-full text-center py-3 bg-gold-400 text-navy rounded-lg">Contact Us</a>
      </div>
    </div>
  )
}

// File: components/sections/AttorneyCard.tsx
export function AttorneyCard({ name, title, image, slug, credentials }: any) {
  return (
    <div className="bg-white rounded-xl2 border border-gray-100 shadow-card p-6">
      <div className="flex gap-4">
        <img src={image || '/team/default.jpg'} alt={name} className="w-16 h-16 rounded-full object-cover flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <a href={`/team/${slug}`} className="font-semibold text-navy hover:text-gold-400 transition-colors">{name}</a>
          <p className="text-sm text-charcoal/60 mb-2">{title}</p>
          <ul className="space-y-1">
            {(credentials || []).slice(0,2).map((cred: string, i: number) => (
              <li key={i} className="text-xs text-charcoal/70 flex items-center gap-1"><span className="text-gold-400">•</span>{cred}</li>
            ))}
          </ul>
          <a href={`/team/${slug}`} className="inline-block mt-3 text-sm text-gold-400 hover:text-gold-500 font-medium">Read full bio →</a>
        </div>
      </div>
    </div>
  )
}

// File: components/sections/MediaLogos.tsx
export function MediaLogos() {
  const publications = [
    'New York Times',
    'Forbes',
    'Bloomberg',
    'The Guardian',
    'NPR',
  ]

  return (
    <section className="py-8 bg-white border-b border-gray-100">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold text-charcoal/60 uppercase tracking-widest mb-6">As seen in</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {publications.map((pub) => (
              <div key={pub} className="text-charcoal/40 font-display font-bold text-lg">{pub}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// File: components/sections/FaqAccordion.tsx
export function FaqAccordion({ faqs }: any) {
  return (
    <div className="space-y-4">
      {faqs.map((faq: any, index: number) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="w-full px-6 py-4 text-left bg-white flex items-center justify-between">
            <h3 className="font-semibold text-navy pr-4">{faq.question}</h3>
            <div className="w-5 h-5 text-gold-400">▾</div>
          </div>
          <div className="px-6 pb-4">
            <div className="text-charcoal/80 leading-relaxed prose prose-sm max-w-none">{faq.answer}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

// File: components/sections/RelatedPages.tsx
export function RelatedPages({ pages }: any) {
  if (!pages || pages.length === 0) return null
  return (
    <section className="py-section bg-gray-50">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <h2 className="font-display text-display-sm text-navy text-center mb-12">Related Pages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pages.map((page: any, index: number) => (
            <a key={index} href={page.href} className="group bg-white rounded-xl2 border border-gray-100 shadow-card hover:shadow-card-hover transition-all p-6 block">
              <h3 className="font-semibold text-navy group-hover:text-gold-400 transition-colors mb-2">{page.title}</h3>
              <p className="text-sm text-charcoal/60 group-hover:text-charcoal/80 transition-colors">{page.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// --------------------------
// End combined file
// --------------------------
