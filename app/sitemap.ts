import { MetadataRoute } from 'next'
import fs from 'fs/promises'
import path from 'path'
import { getBlogPosts } from '@/lib/content'

const BASE = 'https://watsonimmigrationlaw.com'

const VISAS = ['h-1b', 'eb-5', 'e-2', 'o-1', 'l-1', 'eb-1', 'eb-2-niw']
const CITIES = ['seattle', 'bellevue', 'redmond', 'kirkland', 'renton', 'tacoma', 'olympia', 'spokane', 'vancouver-wa', 'portland']
const COUNTRIES = ['india', 'china', 'canada', 'uk', 'australia', 'mexico', 'south-korea']
const PERSONAS = ['founders', 'investors', 'employees', 'companies']

// E-2 intersection pages — must stay in sync with PRIORITY_INTERSECTIONS in the page file
const E2_INTERSECTIONS = [
  { city: 'seattle', country: 'south-korea' },
  { city: 'seattle', country: 'japan' },
  { city: 'seattle', country: 'canada' },
  { city: 'seattle', country: 'taiwan' },
  { city: 'seattle', country: 'united-kingdom' },
  { city: 'miami', country: 'colombia' },
  { city: 'miami', country: 'mexico' },
  { city: 'miami', country: 'argentina' },
  { city: 'miami', country: 'spain' },
  { city: 'miami', country: 'italy' },
  { city: 'los-angeles', country: 'south-korea' },
  { city: 'los-angeles', country: 'japan' },
  { city: 'los-angeles', country: 'mexico' },
  { city: 'los-angeles', country: 'taiwan' },
  { city: 'los-angeles', country: 'australia' },
  { city: 'new-york', country: 'united-kingdom' },
  { city: 'new-york', country: 'italy' },
  { city: 'new-york', country: 'france' },
  { city: 'new-york', country: 'israel' },
  { city: 'new-york', country: 'south-korea' },
  { city: 'san-francisco', country: 'taiwan' },
  { city: 'san-francisco', country: 'israel' },
  { city: 'san-francisco', country: 'canada' },
  { city: 'san-francisco', country: 'australia' },
  { city: 'san-francisco', country: 'united-kingdom' },
  { city: 'houston', country: 'colombia' },
  { city: 'houston', country: 'mexico' },
  { city: 'houston', country: 'turkey' },
  { city: 'chicago', country: 'germany' },
  { city: 'chicago', country: 'poland' },
  { city: 'chicago', country: 'italy' },
  { city: 'chicago', country: 'south-korea' },
  { city: 'dallas', country: 'south-korea' },
  { city: 'dallas', country: 'mexico' },
  { city: 'dallas', country: 'taiwan' },
  { city: 'atlanta', country: 'south-korea' },
  { city: 'atlanta', country: 'japan' },
  { city: 'las-vegas', country: 'south-korea' },
  { city: 'las-vegas', country: 'japan' },
  { city: 'las-vegas', country: 'taiwan' },
  { city: 'austin', country: 'united-kingdom' },
  { city: 'austin', country: 'israel' },
  { city: 'austin', country: 'canada' },
  { city: 'boston', country: 'united-kingdom' },
  { city: 'boston', country: 'ireland' },
  { city: 'portland', country: 'japan' },
  { city: 'portland', country: 'south-korea' },
  { city: 'san-diego', country: 'mexico' },
  { city: 'san-diego', country: 'australia' },
  { city: 'denver', country: 'united-kingdom' },
]

async function readJsonDir(dirPath: string): Promise<string[]> {
  try {
    const files = await fs.readdir(dirPath)
    return files.filter((f) => f.endsWith('.json')).map((f) => f.replace('.json', ''))
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts()

  // E-2 programmatic page slugs (auto-grows as JSON files are added)
  const [e2TreatySlugs, e2NonTreatySlugs, e2CitySlugs, e2BusinessTypeSlugs, e2TopicSlugs] =
    await Promise.all([
      readJsonDir(path.join(process.cwd(), 'content/e2/countries')),
      readJsonDir(path.join(process.cwd(), 'content/e2/non-treaty')),
      readJsonDir(path.join(process.cwd(), 'content/e2/cities')),
      readJsonDir(path.join(process.cwd(), 'content/e2/business-types')),
      readJsonDir(path.join(process.cwd(), 'content/e2/topics')),
    ])

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

  // Original city/country pages (non-E-2 visa slugs + the 10 PNW city pages)
  const visaCityPages: MetadataRoute.Sitemap = VISAS.flatMap(slug =>
    CITIES.map(city => ({
      url: `${BASE}/visas/${slug}/${city}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))
  )

  const visaCountryPages: MetadataRoute.Sitemap = VISAS.filter(s => s !== 'e-2').flatMap(slug =>
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

  // ── E-2 programmatic pages (auto-grows with JSON files) ───────────────────

  const e2TreatyPages: MetadataRoute.Sitemap = e2TreatySlugs.map(slug => ({
    url: `${BASE}/visas/e-2/for/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const e2NonTreatyPages: MetadataRoute.Sitemap = e2NonTreatySlugs.map(slug => ({
    url: `${BASE}/visas/e-2/not-eligible/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const e2CityPages: MetadataRoute.Sitemap = e2CitySlugs.map(slug => ({
    url: `${BASE}/visas/e-2/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const e2IntersectionPages: MetadataRoute.Sitemap = E2_INTERSECTIONS.map(({ city, country }) => ({
    url: `${BASE}/visas/e-2/${city}/for/${country}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const e2BusinessTypePages: MetadataRoute.Sitemap = e2BusinessTypeSlugs.map(slug => ({
    url: `${BASE}/visas/e-2/business-type/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const e2TopicPages: MetadataRoute.Sitemap = e2TopicSlugs.map(slug => ({
    url: `${BASE}/visas/e-2/guide/${slug}`,
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
    ...e2TreatyPages,
    ...e2NonTreatyPages,
    ...e2CityPages,
    ...e2IntersectionPages,
    ...e2BusinessTypePages,
    ...e2TopicPages,
    ...blogPostPages,
  ]
}
