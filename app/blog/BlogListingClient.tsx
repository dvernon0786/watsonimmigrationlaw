'use client'

import { useState, useMemo } from 'react'
import type { Metadata } from 'next'
import BlogPostCard from '@/components/sections/BlogPostCard'
import CategoryFilter from '@/components/sections/CategoryFilter'

// NOTE: This page uses client-side filtering. For SSR category pages,
// add app/blog/category/[cat]/page.tsx as a complement.

const CATEGORIES = [
  { id: 'podcast', label: 'Podcast' },
  { id: 'h1b', label: 'H-1B' },
  { id: 'eb5', label: 'EB-5' },
  { id: 'e2', label: 'E-2' },
  { id: 'founders', label: 'Founders' },
  { id: 'news', label: 'News & Policy' },
  { id: 'events', label: 'Events' },
]

interface Post {
  slug: string
  title: string
  description: string
  date: string
  authorName: string
  categories?: string[]
  tags?: string[]
  image?: string
}

interface BlogListingClientProps {
  posts: Post[]
}

export default function BlogListingClient({ posts }: BlogListingClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return posts
    return posts.filter(p => {
      const cats = p.categories || p.tags || []
      return cats.some((c: string) => c.toLowerCase().includes(activeCategory))
    })
  }, [posts, activeCategory])

  const categoriesWithCount = CATEGORIES.map(cat => ({
    ...cat,
    count: posts.filter(p => {
      const cats = p.categories || p.tags || []
      return cats.some((c: string) => c.toLowerCase().includes(cat.id))
    }).length,
  }))

  const [featuredPost, ...restPosts] = filtered

  return (
    <div>
      {/* Filter */}
      <div className="mb-8">
        <CategoryFilter
          categories={categoriesWithCount}
          onFilter={setActiveCategory}
          activeCategory={activeCategory}
        />
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-charcoal/50">No posts found in this category.</div>
      )}

      {/* Featured post */}
      {featuredPost && (
        <div className="mb-8">
          <BlogPostCard
            title={featuredPost.title}
            slug={featuredPost.slug}
            description={featuredPost.description}
            date={featuredPost.date}
            authorName={featuredPost.authorName}
            categories={featuredPost.categories || featuredPost.tags}
            image={featuredPost.image}
            featured
          />
        </div>
      )}

      {/* Grid */}
      {restPosts.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restPosts.map(post => (
            <BlogPostCard
              key={post.slug}
              title={post.title}
              slug={post.slug}
              description={post.description}
              date={post.date}
              authorName={post.authorName}
              categories={post.categories || post.tags}
              image={post.image}
            />
          ))}
        </div>
      )}
    </div>
  )
}
