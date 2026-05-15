import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/content'

const BASE = 'https://watsonimmigrationlaw.com'

const VISAS = ['h-1b', 'eb-5', 'e-2', 'o-1', 'l-1', 'eb-1', 'eb-2-niw']
const CITIES = ['seattle', 'bellevue', 'redmond', 'kirkland', 'renton', 'tacoma', 'olympia', 'spokane', 'vancouver-wa', 'portland']
const COUNTRIES = ['india', 'china', 'canada', 'uk', 'australia', 'mexico', 'south-korea']
const PERSONAS = ['founders', 'investors', 'employees', 'companies']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE}/visas`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/team/tahmina-watson`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/team/nicole-lockett`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/books`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/podcast`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE}/media`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/events`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.6 },
    { url: `${BASE}/resources`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/how-we-work`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/privacy-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/disclaimer`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const visaPages: MetadataRoute.Sitemap = VISAS.map(slug => ({
    url: `${BASE}/visas/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const visaCityPages: MetadataRoute.Sitemap = VISAS.flatMap(slug =>
    CITIES.map(city => ({
      url: `${BASE}/visas/${slug}/${city}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  const visaCountryPages: MetadataRoute.Sitemap = VISAS.flatMap(slug =>
    COUNTRIES.map(country => ({
      url: `${BASE}/visas/${slug}/for/${country}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  const personaPages: MetadataRoute.Sitemap = PERSONAS.map(persona => ({
    url: `${BASE}/for/${persona}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const blogPostPages: MetadataRoute.Sitemap = posts.map(post => ({
    url: `${BASE}/blog/${post.slug}`,
    lastModified: post.modified ? new Date(post.modified) : new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    ...staticPages,
    ...visaPages,
    ...visaCityPages,
    ...visaCountryPages,
    ...personaPages,
    ...blogPostPages,
  ]
}
