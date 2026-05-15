import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import PodcastEpisodeCard from '@/components/sections/PodcastEpisodeCard'
import LeadCapture from '@/components/sections/LeadCapture'
import { buildBreadcrumbSchema } from '@/lib/schemas'
import { getBlogPosts } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Tahmina Talks Immigration® Podcast | Watson Immigration Law',
  description: 'Tahmina Watson hosts Tahmina Talks Immigration® — conversations with founders, investors, policymakers, and thought leaders at the intersection of immigration and entrepreneurship.',
  alternates: { canonical: 'https://watsonimmigrationlaw.com/podcast' },
}

const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Podcast', path: '/podcast' }]

const PLATFORMS = [
  { name: 'Spotify', url: 'https://open.spotify.com', icon: '🎵' },
  { name: 'Apple Podcasts', url: 'https://podcasts.apple.com', icon: '🎙️' },
  { name: 'Amazon Music', url: 'https://music.amazon.com', icon: '🎶' },
  { name: 'Pandora', url: 'https://www.pandora.com', icon: '📻' },
  { name: 'iHeart Radio', url: 'https://www.iheart.com', icon: '❤️' },
]

export default async function PodcastPage() {
  const allPosts = await getBlogPosts()
  const episodes = allPosts.filter(p =>
    (p.categories || p.tags || []).some((c: string) => c.toLowerCase().includes('podcast'))
  )

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <section className="py-section bg-navy text-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">Podcast</p>
              <h1 className="font-display text-display-lg text-white mb-6 leading-tight">
                Tahmina Talks Immigration®
              </h1>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                Conversations with founders, investors, policymakers, and thought leaders at the intersection of immigration and entrepreneurship. Hosted by Tahmina Watson.
              </p>
              <div className="flex flex-wrap gap-3">
                {PLATFORMS.map(p => (
                  <a
                    key={p.name}
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm text-white transition-colors"
                  >
                    <span>{p.icon}</span> {p.name}
                  </a>
                ))}
              </div>
            </div>
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-52 h-52 bg-gold-400 rounded-3xl flex items-center justify-center shadow-2xl">
                <div className="text-center text-navy">
                  <div className="text-6xl mb-2">🎙️</div>
                  <p className="font-display font-bold text-sm leading-tight">Tahmina Talks<br/>Immigration®</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes */}
      <section className="py-section bg-cream">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-display text-display-sm text-navy mb-8">
                {episodes.length > 0 ? `All ${episodes.length} episodes` : 'Episodes'}
              </h2>

              {episodes.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-xl2 border border-border">
                  <p className="text-charcoal/50">Episodes will appear here after the blog migration.</p>
                  <p className="text-sm text-charcoal/40 mt-1">Each podcast blog post becomes an episode card.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {episodes.map(ep => (
                    <PodcastEpisodeCard
                      key={ep.slug}
                      title={ep.title}
                      slug={ep.slug}
                      description={ep.description}
                      date={ep.date}
                    />
                  ))}
                </div>
              )}
            </div>

            <aside className="space-y-6">
              <div className="bg-white border border-border rounded-xl2 p-5">
                <h3 className="font-semibold text-navy mb-3">About the show</h3>
                <p className="text-sm text-charcoal/70 leading-relaxed">
                  Tahmina Watson hosts wide-ranging conversations with entrepreneurs, investors, senators, advocates, and legal experts — all through the lens of immigration and opportunity.
                </p>
              </div>
              <LeadCapture />
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
