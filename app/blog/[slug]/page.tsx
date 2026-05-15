import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LeadCapture from '@/components/sections/LeadCapture'
import MdxRenderer from '@/components/sections/MdxRenderer'
import BlogPostCard from '@/components/sections/BlogPostCard'
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schemas'
import { getBlogPost, getBlogPosts } from '@/lib/content'

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}
  return {
    title: `${post.frontmatter.title} | Watson Immigration Law`,
    description: post.frontmatter.description,
    alternates: { canonical: `https://watsonimmigrationlaw.com/blog/${slug}` },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      authors: [post.frontmatter.authorName],
    },
  }
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) notFound()

  const allPosts = await getBlogPosts()
  const related = allPosts
    .filter(p => p.slug !== slug)
    .filter(p => {
      const postCats = post.frontmatter.categories || post.frontmatter.tags || []
      const pCats = p.categories || p.tags || []
      return pCats.some((c: string) => postCats.includes(c))
    })
    .slice(0, 3)

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.frontmatter.title, path: `/blog/${slug}` },
  ]

  return (
    <>
      <JsonLd schema={buildArticleSchema({
        title: post.frontmatter.title,
        slug: slug,
        description: post.frontmatter.description,
        datePublished: post.frontmatter.date,
        dateModified: post.frontmatter.modified || post.frontmatter.date,
        authorSlug: post.frontmatter.author,
        authorName: post.frontmatter.authorName,
        image: post.frontmatter.image,
      })} />
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />

      <Breadcrumbs items={breadcrumbs} />

      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">

            {/* Article */}
            <article className="lg:col-span-2">
              {/* Header */}
              <header className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {(post.frontmatter.categories || post.frontmatter.tags || []).slice(0, 3).map((tag: string) => (
                    <span key={tag} className="text-xs font-semibold bg-navy text-white px-3 py-1 rounded-full">
                      {tag === 'h1b' ? 'H-1B' : tag === 'eb5' ? 'EB-5' : tag === 'e2' ? 'E-2' : tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </span>
                  ))}
                </div>
                <h1 className="font-display font-bold text-navy text-3xl sm:text-4xl leading-tight mb-5">
                  {post.frontmatter.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-charcoal/60 border-b border-border pb-5">
                  <Link href={`/team/${post.frontmatter.author}`} className="flex items-center gap-2 hover:text-gold-400 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center text-white text-xs font-bold">
                      {post.frontmatter.authorName.charAt(0)}
                    </div>
                    {post.frontmatter.authorName}
                  </Link>
                  <time dateTime={post.frontmatter.date}>{formatDate(post.frontmatter.date)}</time>
                </div>
              </header>

              {/* Featured image */}
              {post.frontmatter.image && (
                <div className="mb-8 rounded-xl2 overflow-hidden">
                  <img src={post.frontmatter.image} alt={post.frontmatter.title} className="w-full h-56 object-cover" />
                </div>
              )}

              {/* Content */}
              <MdxRenderer source={post.content} />

              {/* Author bio */}
              <div className="mt-12 p-6 bg-cream rounded-xl2 border border-border flex gap-4 items-start">
                <div className="w-14 h-14 rounded-full bg-navy flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {post.frontmatter.authorName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs text-charcoal/50 uppercase tracking-wide mb-0.5">Written by</p>
                  <Link href={`/team/${post.frontmatter.author}`} className="font-semibold text-navy hover:text-gold-400 transition-colors">
                    {post.frontmatter.authorName}
                  </Link>
                  <p className="text-sm text-charcoal/70 mt-1">Immigration Attorney at Watson Immigration Law, specializing in business and investor immigration.</p>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              <LeadCapture />
              <div className="bg-cream rounded-xl2 p-5">
                <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-wide mb-3">Practice Areas</p>
                <nav className="space-y-1">
                  {['H-1B Visa', 'EB-5 Investor', 'E-2 Treaty Investor', 'O-1 Extraordinary Ability', 'L-1 Transfer', 'EB-1 Green Card', 'EB-2 NIW'].map(visa => {
                    const slug = visa === 'H-1B Visa' ? 'h-1b' : visa === 'EB-5 Investor' ? 'eb-5' : visa === 'E-2 Treaty Investor' ? 'e-2' : visa === 'O-1 Extraordinary Ability' ? 'o-1' : visa === 'L-1 Transfer' ? 'l-1' : visa === 'EB-1 Green Card' ? 'eb-1' : 'eb-2-niw'
                    return (
                      <Link key={visa} href={`/visas/${slug}`} className="block text-sm text-charcoal/70 hover:text-gold-400 py-1 border-b border-border last:border-0 transition-colors">
                        {visa} →
                      </Link>
                    )
                  })}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="py-section bg-cream">
          <div className="max-w-content mx-auto px-6 lg:px-8">
            <h2 className="font-display text-display-sm text-navy mb-8">Related articles</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map(p => (
                <BlogPostCard
                  key={p.slug}
                  title={p.title}
                  slug={p.slug}
                  description={p.description}
                  date={p.date}
                  authorName={p.authorName}
                  categories={p.categories || p.tags}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
