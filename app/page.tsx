import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import LeadCapture from '@/components/sections/LeadCapture'
import AttorneyCard from '@/components/sections/AttorneyCard'
import MediaLogos from '@/components/sections/MediaLogos'
import FaqAccordion from '@/components/sections/FaqAccordion'
import RelatedPages from '@/components/sections/RelatedPages'
import JsonLd from '@/components/seo/JsonLd'
import VisaCard from '@/components/sections/VisaCard'
import PersonaTile from '@/components/sections/PersonaTile'
import BlogPostCard from '@/components/sections/BlogPostCard'
import BookCard from '@/components/sections/BookCard'
import PodcastEpisodeCard from '@/components/sections/PodcastEpisodeCard'
import AboutFounder from '@/components/sections/AboutFounder'
import { buildFaqSchema, buildBreadcrumbSchema } from '@/lib/schemas'
import { getAttorneys, getBlogPosts } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Watson Immigration Law | Immigration Attorneys for Entrepreneurs & Investors in Seattle',
  description: 'Watson Immigration Law is a Seattle-based immigration firm specializing in H-1B, EB-5, E-2, O-1, L-1, and EB-2 NIW visas. Trusted by founders, investors, and businesses worldwide. Featured in NYT, Forbes, Bloomberg.',
  keywords: 'immigration attorney Seattle, H-1B visa lawyer, EB-5 investor visa, E-2 treaty visa, O-1 extraordinary ability, startup visa attorney, immigration law firm Seattle',
  alternates: { canonical: 'https://watsonimmigrationlaw.com' },
}

const VISAS = [
  { name: 'H-1B Visa', slug: 'h-1b', tagline: 'Work visa for specialty occupation professionals sponsored by a U.S. employer.', processingTime: '3–6 months', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
  { name: 'EB-5 Investor Visa', slug: 'eb-5', tagline: 'Green card through investment in a U.S. business creating American jobs.', processingTime: '3–6 years', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { name: 'E-2 Treaty Investor', slug: 'e-2', tagline: 'Start or buy a U.S. business — available to nationals of 80+ treaty countries.', processingTime: '2–8 weeks', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" /></svg> },
  { name: 'O-1 Extraordinary Ability', slug: 'o-1', tagline: 'For individuals with nationally or internationally recognized achievement. No lottery.', processingTime: '2–4 months', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg> },
  { name: 'L-1 Intracompany Transfer', slug: 'l-1', tagline: 'Transfer managers and key employees from your global office to the U.S.', processingTime: '1–6 months', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
  { name: 'EB-1 Priority Worker', slug: 'eb-1', tagline: 'The fastest green card — for extraordinary ability, outstanding researchers, and executives.', processingTime: '12–24 months', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg> },
  { name: 'EB-2 National Interest Waiver', slug: 'eb-2-niw', tagline: 'Self-petition for a green card if your work benefits the United States — no employer needed.', processingTime: '12–36 months', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg> },
]

const PERSONAS = [
  { title: 'For Founders', description: 'Visa pathways that don\'t require an employer sponsor — O-1A, EB-1A, EB-2 NIW, E-2, and more.', href: '/for/founders', highlight: 'Tahmina\'s specialty', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
  { title: 'For Investors', description: 'EB-5 green cards and E-2 visas for those investing capital in U.S. enterprises.', href: '/for/investors', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
  { title: 'For Employees', description: 'H-1B, O-1, and L-1 visas for professionals joining U.S. companies — including startups.', href: '/for/employees', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
  { title: 'For Companies', description: 'Corporate immigration programs for HR teams managing H-1B, L-1, and employer-sponsored green cards.', href: '/for/companies', icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
]

const BOOKS = [
  { title: 'The Startup Visa', subtitle: '2nd Edition', description: 'The definitive guide to U.S. immigration for international startup founders and entrepreneurs. Updated with the latest visa strategies and pathways.', audience: 'Founders & Entrepreneurs', coverImage: '/books/startup-visa-2nd.jpg', amazonUrl: 'https://www.amazon.com/Startup-Visa-Immigration-Startups-Founders/dp/1735758574/', year: 2021, featured: true },
  { title: 'The Startup Visa', subtitle: 'Spanish Edition — La Visa Startup', description: 'The complete startup visa guide in Spanish, making immigration knowledge accessible to Latin American founders and entrepreneurs.', audience: 'Spanish-speaking founders', coverImage: '/books/startup-visa-spanish.jpg', amazonUrl: 'https://www.amazon.com/Startup-Visa-Inmigraci%C3%B3n-Emergentes-Fundadores/dp/B0CKZKDHN7/', year: 2023, language: 'Spanish' },
  { title: 'The Startup Visa', subtitle: '1st Edition', description: 'The original startup visa guide that established Tahmina Watson as the leading voice on immigration for entrepreneurs.', audience: 'Founders & Investors', coverImage: '/books/startup-visa-1st.jpg', amazonUrl: 'https://www.amazon.com/Startup-Visa-Economic-Prosperity-America/dp/1735758531/', year: 2015 },
  { title: 'Legal Heroes in the Trump Era', description: 'Stories of immigration attorneys who stood up for their clients during one of the most turbulent periods in U.S. immigration history.', audience: 'Legal professionals & advocates', coverImage: '/books/legal-heroes.jpg', amazonUrl: 'https://www.amazon.com/Legal-Heroes-Trump-Era-Inspired/dp/1735758507/', year: 2019 },
]

const FAQS = [
  { question: 'What types of visas do you specialize in?', answer: 'We specialize in business and investor immigration: H-1B, O-1, L-1, EB-5, E-2, EB-1, and EB-2 NIW. Our attorneys have deep experience with complex cases including startup founder pathways, extraordinary ability petitions, investor green cards, and multinational executive transfers.' },
  { question: 'Do I need a U.S. employer to get a visa?', answer: 'Not always. Several visa categories allow self-petition or self-sponsorship. The O-1A (extraordinary ability), EB-1A (extraordinary ability green card), EB-2 NIW (national interest waiver), and E-2 (investor) do not require a traditional U.S. employer. Tahmina Watson literally wrote the book on startup founder immigration — we specialize in these pathways.' },
  { question: 'How long does the immigration process typically take?', answer: 'It varies significantly by visa type. E-2 visas can be approved in 2–8 weeks at most consulates. H-1B requires lottery selection in March and employment starting October 1. EB-5 takes 3–6 years for the full green card process. We provide detailed timelines during your initial consultation.' },
  { question: 'Do you serve clients outside Seattle?', answer: 'Yes — the majority of our clients are based outside Seattle, including internationally. We offer virtual consultations worldwide via Zoom and handle cases across all U.S. states and most countries.' },
  { question: 'What sets Watson Immigration Law apart?', answer: 'Tahmina Watson has over 15 years of experience and has been featured in The New York Times, Forbes, Bloomberg, The Guardian, CNN, and NPR. She has authored four books on immigration and hosts a widely-followed immigration podcast. We combine legal expertise with genuine advocacy for our clients\' futures.' },
]

export default async function HomePage() {
  const attorneys = await getAttorneys()
  const allPosts = await getBlogPosts()
  const recentPosts = allPosts.slice(0, 3)
  const podcastPosts = allPosts.filter(p => p.categories?.includes('podcast')).slice(0, 4)

  return (
    <>
      <JsonLd schema={buildFaqSchema(FAQS)} />
      <JsonLd schema={buildBreadcrumbSchema([{ name: 'Home', path: '/' }])} />

      {/* Hero */}
      <Hero />

      {/* Media logos */}
      <MediaLogos />

      {/* Who We Help */}
      <section className="py-section bg-cream">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Who We Help</p>
            <h2 className="font-display text-display-md text-navy mb-4">Immigration built around your situation</h2>
            <p className="text-charcoal/70 max-w-2xl mx-auto">Whether you're launching a startup, investing capital, joining a U.S. company, or building a global team — we have the right pathway.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PERSONAS.map(p => (
              <PersonaTile key={p.href} {...p} />
            ))}
          </div>
        </div>
      </section>

      {/* Visa services grid */}
      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Practice Areas</p>
            <h2 className="font-display text-display-md text-navy mb-4">Every path to U.S. immigration, covered</h2>
            <p className="text-charcoal/70 max-w-2xl mx-auto">From work visas to investor green cards, we handle the full spectrum of business and investor immigration.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {VISAS.map(v => (
              <VisaCard key={v.slug} {...v} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/visas" className="inline-flex items-center gap-2 px-6 py-3 border-2 border-navy text-navy font-semibold rounded-lg hover:bg-navy hover:text-white transition-colors">
              View all practice areas
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Lead capture */}
      <section className="py-section bg-cream">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Free Consultation</p>
              <h2 className="font-display text-display-md text-navy mb-4">Talk to an immigration attorney today</h2>
              <p className="text-charcoal/70 leading-relaxed mb-6">Every immigration situation is different. Book a free consultation to understand your options, timeline, and next steps — with no obligation.</p>
              <div className="space-y-3">
                {['15+ years of experience', 'Featured in NYT, Forbes, Bloomberg', 'Serving clients in 50+ countries', 'Virtual consultations available worldwide'].map(item => (
                  <div key={item} className="flex items-center gap-3 text-sm text-charcoal/80">
                    <div className="w-5 h-5 rounded-full bg-gold-400 flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-navy" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <LeadCapture />
            </div>
          </div>
        </div>
      </section>

      {/* About Founder */}
      <AboutFounder />

      {/* Books */}
      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Published Works</p>
            <h2 className="font-display text-display-md text-navy mb-4">Tahmina's bestselling books</h2>
            <p className="text-charcoal/70 max-w-2xl mx-auto">Tahmina Watson is one of the few immigration attorneys who has written books making complex visa strategies accessible to founders and investors worldwide.</p>
          </div>
          <div className="space-y-4 max-w-3xl mx-auto">
            {BOOKS.map((book, i) => (
              <BookCard key={i} {...book} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/books" className="inline-flex items-center gap-2 text-gold-400 font-semibold hover:text-gold-500">
              See all books & download a free chapter →
            </Link>
          </div>
        </div>
      </section>

      {/* Podcast */}
      {podcastPosts.length > 0 && (
        <section className="py-section bg-cream">
          <div className="max-w-content mx-auto px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <div>
                <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Tahmina Talks Immigration®</p>
                <h2 className="font-display text-display-md text-navy mb-4">The immigration podcast for founders & entrepreneurs</h2>
                <p className="text-charcoal/70 leading-relaxed mb-6">Tahmina interviews thought leaders, policymakers, investors, and founders at the intersection of immigration and entrepreneurship. Available on Spotify, Apple Podcasts, Amazon Music, and Pandora.</p>
                <div className="flex flex-wrap gap-3 mb-6">
                  {['Spotify', 'Apple Podcasts', 'Amazon Music', 'Pandora'].map(platform => (
                    <span key={platform} className="px-3 py-1.5 bg-white border border-border rounded-full text-sm text-charcoal/70 font-medium">
                      {platform}
                    </span>
                  ))}
                </div>
                <Link href="/podcast" className="inline-flex items-center gap-2 px-6 py-3 bg-navy text-white font-semibold rounded-lg hover:bg-navy-500 transition-colors">
                  Browse all episodes
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </Link>
              </div>
              <div className="space-y-3">
                {podcastPosts.map(post => (
                  <PodcastEpisodeCard
                    key={post.slug}
                    title={post.title}
                    slug={post.slug}
                    description={post.description}
                    date={post.date}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Attorneys */}
      {attorneys.length > 0 && (
        <section className="py-section bg-white">
          <div className="max-w-content mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">Our Team</p>
              <h2 className="font-display text-display-md text-navy mb-4">Meet our immigration attorneys</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {attorneys.map(attorney => (
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
      )}

      {/* FAQs */}
      <FaqAccordion faqs={FAQS} />

      {/* Recent blog posts */}
      {recentPosts.length > 0 && (
        <section className="py-section bg-white">
          <div className="max-w-content mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between mb-10">
              <div>
                <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-2">From the Blog</p>
                <h2 className="font-display text-display-sm text-navy">Latest immigration updates</h2>
              </div>
              <Link href="/blog" className="hidden sm:inline-flex items-center gap-1 text-gold-400 font-semibold text-sm hover:text-gold-500">
                All posts →
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {recentPosts.map(post => (
                <BlogPostCard
                  key={post.slug}
                  title={post.title}
                  slug={post.slug}
                  description={post.description}
                  date={post.date}
                  authorName={post.authorName}
                  categories={post.categories || post.tags}
                />
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <Link href="/blog" className="text-gold-400 font-semibold text-sm">View all posts →</Link>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
