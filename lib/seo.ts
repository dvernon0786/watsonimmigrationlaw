// lib/seo.ts — Shared SEO helpers

const BASE_URL = 'https://watsonimmigrationlaw.com'

export function buildCanonical(path: string): string {
  return `${BASE_URL}${path}`
}