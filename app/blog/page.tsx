import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import { buildBreadcrumbSchema } from '@/lib/schemas'
import { getBlogPosts } from '@/lib/content'
import BlogListingClient from './BlogListingClient'

export const metadata: Metadata = {
  title: 'Immigration Law Blog | Watson Immigration Law',
  description: 'Immigration news, visa guides, policy updates, and podcast episode recaps from Tahmina Watson and the team at Watson Immigration Law.',
  alternates: { canonical: 'https://watsonimmigrationlaw.com/blog' },
}

const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }]

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <section className="py-section bg-navy text-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">From the Blog</p>
            <h1 className="font-display text-display-lg text-white mb-4 leading-tight">Immigration insights from Tahmina Watson</h1>
            <p className="text-white/80 leading-relaxed">Visa updates, policy changes, founder immigration strategies, and recaps from the Tahmina Talks Immigration® podcast.</p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="py-section bg-cream">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          {posts.length === 0 ? (
            <div className="text-center py-16 text-charcoal/50">
              <p className="text-lg font-display text-navy mb-2">Blog posts coming soon</p>
              <p className="text-sm">Migrate your WordPress posts to see them here.</p>
            </div>
          ) : (
            <BlogListingClient posts={posts} />
          )}
        </div>
      </section>
    </>
  )
}
