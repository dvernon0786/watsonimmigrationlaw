import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import LeadCapture from '@/components/sections/LeadCapture';
import RelatedPages from '@/components/sections/RelatedPages';
import { buildArticleSchema, buildBreadcrumbSchema } from '@/lib/schemas';
import { getBlogPost, getBlogPosts } from '@/lib/content';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    keywords: post.frontmatter.tags.join(', '),
    authors: [{ name: post.frontmatter.authorName }],
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: 'article',
      publishedTime: post.frontmatter.date,
      modifiedTime: post.frontmatter.modified,
      authors: [post.frontmatter.authorName],
      tags: post.frontmatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  if (!post) notFound();

  const allPosts = await getBlogPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== params.slug)
    .filter(p => p.tags.some(tag => post.frontmatter.tags.includes(tag)))
    .slice(0, 3);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Blog', path: '/blog' },
    { name: post.frontmatter.title, path: `/blog/${params.slug}` },
  ];

  const relatedPages = relatedPosts.map(post => ({
    title: post.title,
    description: post.description,
    href: `/blog/${post.slug}`,
    image: post.image || '/blog/default.jpg',
  }));

  const articleData = {
    title: post.frontmatter.title,
    slug: params.slug,
    description: post.frontmatter.description,
    datePublished: post.frontmatter.date,
    dateModified: post.frontmatter.modified || post.frontmatter.date,
    authorSlug: post.frontmatter.author,
    authorName: post.frontmatter.authorName,
    image: post.frontmatter.image,
  };

  return (
    <>
      <JsonLd schema={buildArticleSchema(articleData)} />
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />

      <Breadcrumbs items={breadcrumbs} />

      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              {post.frontmatter.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.frontmatter.title}</h1>

            <div className="flex items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <span>By</span>
                <Link href={`/team/${post.frontmatter.author}`} className="text-blue-600 hover:text-blue-800">
                  {post.frontmatter.authorName}
                </Link>
              </div>
              <time dateTime={post.frontmatter.date}>
                {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
            </div>
          </header>

          {post.frontmatter.image && (
            <div className="mb-8">
              <img
                src={post.frontmatter.image}
                alt={post.frontmatter.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="prose prose-lg max-w-none mb-12">
            {/* This would be the MDX content rendered */}
            <div dangerouslySetInnerHTML={{ __html: post.content || '<p>Content coming soon...</p>' }} />
          </div>

          <footer className="border-t pt-8">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Last modified: {new Date(post.frontmatter.modified || post.frontmatter.date).toLocaleDateString()}
              </div>
              <div className="flex gap-4">
                <button className="text-blue-600 hover:text-blue-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="text-blue-600 hover:text-blue-800">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
              </div>
            </div>
          </footer>
        </div>
      </article>

      <LeadCapture />

      {relatedPages.length > 0 && (
        <RelatedPages pages={relatedPages} />
      )}
    </>
  );
}