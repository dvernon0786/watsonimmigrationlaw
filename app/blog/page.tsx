import type { Metadata } from 'next';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema, buildArticleSchema } from '@/lib/schemas';
import { getBlogPosts } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Immigration Blog | Latest News & Updates | Watson Immigration Law',
  description: 'Stay informed with the latest immigration news, visa updates, and legal insights from Watson Immigration Law. Expert analysis on H-1B, EB-5, E-2, O-1, and L-1 visas.',
  keywords: 'immigration blog, visa news, H-1B updates, EB-5 news, immigration law updates',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
      ])} />

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Immigration Law Blog</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Stay informed with the latest immigration news, visa updates, and legal insights
              from our experienced attorneys. We cover everything from H-1B lottery changes to
              EB-5 investment opportunities.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-3">{post.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.authorName}</span>
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-600">No blog posts available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}