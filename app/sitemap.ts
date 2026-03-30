// app/sitemap.ts
// Generates XML sitemap for all 200+ programmatic pages

import type { MetadataRoute } from 'next'

const BASE_URL = 'https://watsonimmigrationlaw.com'

const VISAS = ['h-1b', 'eb-5', 'e-2', 'o-1', 'l-1']

const CITIES = [
  'seattle', 'new-york', 'san-francisco', 'los-angeles',
  'miami', 'chicago', 'houston', 'austin', 'boston', 'washington-dc',
]

const COUNTRIES = [
  'india', 'china', 'canada', 'uk', 'germany',
  'france', 'brazil', 'south-korea', 'japan', 'australia',
]

const INDUSTRIES = [
  'tech', 'healthcare', 'finance', 'real-estate',
  'manufacturing', 'hospitality', 'education',
]

const ATTORNEYS = ['tahmina-watson', 'nicole-lockett']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const urls: MetadataRoute.Sitemap = []

  // ── Static pages ──────────────────────────────────────────────────────────
  const staticPages = [
    { path: '/',              priority: 1.0,  changeFrequency: 'weekly'  },
    { path: '/visas',         priority: 0.9,  changeFrequency: 'monthly' },
    { path: '/team',          priority: 0.8,  changeFrequency: 'monthly' },
    { path: '/blog',          priority: 0.8,  changeFrequency: 'daily'   },
    { path: '/case-studies',  priority: 0.7,  changeFrequency: 'monthly' },
    { path: '/contact',       priority: 0.9,  changeFrequency: 'monthly' },
    { path: '/events',        priority: 0.6,  changeFrequency: 'weekly'  },
    { path: '/books',         priority: 0.6,  changeFrequency: 'monthly' },
    { path: '/podcast',       priority: 0.6,  changeFrequency: 'weekly'  },
    { path: '/media',         priority: 0.5,  changeFrequency: 'monthly' },
  ] as const

  for (const page of staticPages) {
    urls.push({
      url: `${BASE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency as MetadataRoute.Sitemap[0]['changeFrequency'],
      priority: page.priority,
    })
  }

  // ── Visa overview pages ───────────────────────────────────────────────────
  for (const visa of VISAS) {
    urls.push({
      url: `${BASE_URL}/visas/${visa}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    })
  }

  // ── Visa × City pages ─────────────────────────────────────────────────────
  for (const visa of VISAS) {
    for (const city of CITIES) {
      urls.push({
        url: `${BASE_URL}/visas/${visa}/${city}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.85,
      })
    }
  }

  // ── Visa × Country pages ──────────────────────────────────────────────────
  for (const visa of VISAS) {
    for (const country of COUNTRIES) {
      urls.push({
        url: `${BASE_URL}/visas/${visa}/for/${country}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  // ── Visa × Industry pages ─────────────────────────────────────────────────
  for (const visa of VISAS) {
    for (const industry of INDUSTRIES) {
      urls.push({
        url: `${BASE_URL}/visas/${visa}/industry/${industry}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  }

  // ── Attorney bio pages ────────────────────────────────────────────────────
  for (const attorney of ATTORNEYS) {
    urls.push({
      url: `${BASE_URL}/team/${attorney}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  // ── Blog posts (dynamic — read from content/blog/) ────────────────────────
  try {
    const { glob } = await import('glob')
    const blogFiles = await glob('content/blog/*.mdx', { cwd: process.cwd() })
    for (const file of blogFiles) {
      const slug = file.replace('content/blog/', '').replace('.mdx', '')
      urls.push({
        url: `${BASE_URL}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.7,
      })
    }
  } catch {
    // Blog files not found — skip
  }

  return urls
}