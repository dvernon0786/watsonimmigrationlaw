// lib/content.ts — Content loader utilities (updated with categories support)

import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

// ─── Visa data ───────────────────────────────────────────────────────────────

export async function getVisaData(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content/visas', `${slug}.json`)
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

// ─── Generated content (AI-generated JSON) ───────────────────────────────────

export async function getGeneratedContent(key: string) {
  try {
    const filePath = path.join(process.cwd(), 'content/generated', `${key}.json`)
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

// ─── Attorney data ───────────────────────────────────────────────────────────

export async function getAttorneyData(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content/attorneys', `${slug}.json`)
    const raw = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export async function getAttorneys() {
  try {
    const dir = path.join(process.cwd(), 'content/attorneys')
    const files = await fs.readdir(dir)
    const attorneys = await Promise.all(
      files
        .filter((f) => f.endsWith('.json'))
        .map(async (file) => {
          const filePath = path.join(dir, file)
          const raw = await fs.readFile(filePath, 'utf-8')
          return JSON.parse(raw)
        })
    )
    return attorneys
  } catch {
    return []
  }
}

// ─── Blog posts ──────────────────────────────────────────────────────────────

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  modified?: string
  author: string
  authorName: string
  /** WP-migrated posts use 'categories'; new posts may use 'tags' — code handles both */
  categories?: string[]
  tags?: string[]
  image?: string
  visa?: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const dir = path.join(process.cwd(), 'content/blog')
    const files = await fs.readdir(dir)
    const posts = await Promise.all(
      files
        .filter((f) => f.endsWith('.mdx'))
        .map(async (file) => {
          const filePath = path.join(dir, file)
          const raw = await fs.readFile(filePath, 'utf-8')
          const { data } = matter(raw)
          return {
            slug: file.replace('.mdx', ''),
            ...data,
            // Normalize: if only tags exist, also set categories (and vice versa)
            categories: data.categories || data.tags || [],
            tags: data.tags || data.categories || [],
          } as BlogPost
        })
    )
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  } catch {
    return []
  }
}

export async function getBlogPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content/blog', `${slug}.mdx`)
    const raw = await fs.readFile(filePath, 'utf-8')
    const { data, content } = matter(raw)
    return {
      frontmatter: {
        ...data,
        categories: data.categories || data.tags || [],
        tags: data.tags || data.categories || [],
      } as BlogPost,
      content,
    }
  } catch {
    return null
  }
}
