# Watson Immigration Law — Codebase Guide

## Project Overview

Immigration law firm website for Watson Immigration Law (Seattle, WA). Built with Next.js App Router, static generation, and Tailwind CSS. The primary technical focus is **programmatic SEO** — generating thousands of unique, legally accurate pages from structured JSON content files.

**Live site:** https://watsonimmigrationlaw.com  
**Stack:** Next.js 16, React 18, TypeScript, Tailwind CSS, MDX (blog)  
**Deployment:** Vercel (static generation at build time)

---

## Architecture

### Static-First, Data-Driven

All pages are statically generated at build time via `generateStaticParams`. No runtime database queries, no server rendering on page load. Content lives in JSON files committed to the repo.

**Content flow:**
```
content/[type]/[slug].json
        ↓
fs.readFile at build time
        ↓
generateStaticParams reads directory → builds URL list
        ↓
Page component renders → static HTML
        ↓
Served instantly, zero per-visit cost
```

**Adding a page requires no code changes** — drop a JSON file in the right directory and it appears at next build.

### Key Principle: CMS-Ready

All JSON schemas are designed so that a CMS (Payload) can read and write them directly. The page code does not change when a CMS is added — the CMS just becomes the UI that writes these same files.

---

## Directory Structure

```
app/                          Next.js App Router pages
  visas/
    [slug]/                   Individual visa type pages (h-1b, eb-5, etc.)
      page.tsx
      [city]/page.tsx         City-specific pages for each visa (10 PNW cities)
      for/
        [country]/page.tsx    Country pages — E-2 reads from content/e2/countries/,
                              other visas use 7-country hardcoded list
    e-2/                      E-2-specific routes (literal segment, wins over [slug])
      [city]/page.tsx         E-2 city pages (reads content/e2/cities/)
        for/
          [country]/page.tsx  E-2 intersection pages (hardcoded PRIORITY_INTERSECTIONS)
      not-eligible/
        [country]/page.tsx    Non-treaty country pages (reads content/e2/non-treaty/)
      business-type/
        [type]/page.tsx       Business type pages (reads content/e2/business-types/)
      guide/
        [topic]/page.tsx      Strategic guide pages (reads content/e2/topics/)
  for/[persona]/              Persona pages (founders, investors, employees, companies)
  blog/[slug]/                Blog posts from content/blog/*.mdx
  team/[slug]/                Attorney pages from content/attorneys/*.json
  sitemap.ts                  Auto-generated — reads content directories at build time
  robots.ts

components/
  layout/
    Header.tsx
    Footer.tsx
    Breadcrumbs.tsx           Accepts { name, path }[] — used on all programmatic pages
  sections/
    VisaHero.tsx              headline, subheadline, visaName, locationName props
    FaqAccordion.tsx          'use client' — faqs: { question, answer }[]
    LeadCapture.tsx           Optional visaName, locationName props
    RelatedPages.tsx          Pass pages prop explicitly — use href not path
    ProcessTimeline.tsx
    AttorneyCard.tsx
  seo/
    JsonLd.tsx                Renders schema.org JSON-LD as <script> tags
  ui/                         Badge, Button, Card, SafeImage

content/
  visas/                      JSON data for 7 visa types (h-1b, e-2, eb-5, etc.)
  attorneys/                  JSON profiles for Tahmina Watson, Nicole Lockett
  blog/                       MDX blog posts with gray-matter frontmatter
  e2/                         E-2 programmatic SEO content (see below)

lib/
  content.ts                  Data loaders: getVisaData, getAttorneys, getBlogPosts
  schemas.ts                  JSON-LD builders: buildVisaPageSchema, buildBreadcrumbSchema,
                              buildFaqSchema, buildArticleSchema, buildAttorneySchema

scripts/
  generate-content.ts         Old script — unused, generates markdown via Claude API
  seed-e2-data.ts             Idempotent stub generator — run when adding new cities/countries
```

---

## E-2 Programmatic SEO System

The core feature of the codebase. Generates 250+ pages at current launch, designed to scale to 1,000+.

### Content Directories

```
content/e2/
  countries/        75 files — E-2 treaty countries
  non-treaty/       24 files — Non-treaty countries (India, China, Brazil, etc.)
  cities/           80 files — US cities
  topics/           10 files — Strategic guide pages
  intersections/    0 files currently — City × country combinations
  business-types/   0 files currently — E-2 business type pages
```

### Authorship Status

| Type | Total | Fully authored | Stubs only |
|---|---|---|---|
| Treaty countries | 75 | 14 | 61 |
| Non-treaty countries | 24 | 0 | 24 |
| Cities | 80 | 10 | 70 |
| Topics/guides | 10 | 10 | 0 |
| Intersections | 0 | — | — |
| Business types | 0 | — | — |

**Fully authored = has intro + sections + faqs.** Stubs render valid pages with correct H1/meta but no body content — thin for SEO until filled in.

**Authored treaty countries:** australia, canada, colombia, france, germany, israel, italy, japan, mexico, portugal, south-korea, taiwan, turkey, united-kingdom

**Authored non-treaty countries:** brazil (stub), china (stub), india (stub), russia (stub), vietnam (stub) — note: the non-treaty files have `alternatives[]` pre-filled via seed script but no `intro` text authored yet

**Authored cities:** atlanta, chicago, dallas, houston, las-vegas, los-angeles, miami, new-york, san-francisco, seattle

**Authored topics (all 10):** denied, dual-citizenship, green-card-path, grenada-citizenship, minimum-investment, processing-time, renewal, spouse-work-authorization, substantial-investment, vs-eb5

### JSON Schemas

#### Treaty country (`content/e2/countries/[slug].json`)
```json
{
  "slug": "japan",
  "name": "Japan",
  "adjective": "Japanese",
  "treatyYear": 1953,
  "visaValidity": "5 years",
  "annualIssuances": 15367,
  "consulate": "U.S. Embassy Tokyo",
  "metaTitle": "...",
  "metaDescription": "...",
  "h1": "E-2 Visa for Japanese Investors",
  "intro": "...",
  "sections": [{ "heading": "...", "body": "..." }],
  "faqs": [{ "question": "...", "answer": "..." }],
  "relatedCountries": [{ "slug": "south-korea", "adjective": "Korean" }],
  "relatedCities": [{ "slug": "seattle", "name": "Seattle" }]
}
```

#### Non-treaty country (`content/e2/non-treaty/[slug].json`)
```json
{
  "slug": "india",
  "name": "India",
  "adjective": "Indian",
  "metaTitle": "...",
  "metaDescription": "...",
  "h1": "Can Indian Nationals Apply for the E-2 Visa?",
  "intro": "...",
  "alternatives": [
    { "visaType": "EB-5 Investor Visa", "description": "...", "href": "/visas/eb-5" }
  ],
  "faqs": [{ "question": "...", "answer": "..." }],
  "relatedPages": ["/visas/eb-5", "/visas/o-1"]
}
```

#### City (`content/e2/cities/[slug].json`)
```json
{
  "slug": "seattle",
  "name": "Seattle",
  "state": "Washington",
  "stateCode": "WA",
  "metaTitle": "...",
  "metaDescription": "...",
  "h1": "E-2 Treaty Investor Visa Attorney in Seattle, WA",
  "intro": "...",
  "sections": [{ "heading": "...", "body": "..." }],
  "stateTax": "No state income tax",
  "uscisOffice": "USCIS Seattle Field Office",
  "industries": ["Technology", "Hospitality"],
  "topNationalities": [{ "slug": "japan", "adjective": "Japanese" }],
  "faqs": [{ "question": "...", "answer": "..." }],
  "relatedCities": [{ "slug": "bellevue", "name": "Bellevue" }]
}
```

#### Intersection (`content/e2/intersections/[city]--[country].json`)
```json
{
  "city": "seattle",
  "country": "south-korea",
  "cityName": "Seattle",
  "cityStateCode": "WA",
  "countryAdjective": "Korean",
  "metaTitle": "...",
  "metaDescription": "...",
  "h1": "E-2 Visa for Korean Investors in Seattle, WA",
  "intro": "...",
  "sections": [{ "heading": "...", "body": "..." }],
  "faqs": [{ "question": "...", "answer": "..." }]
}
```
Note: filename format is `[city]--[country].json` (double dash). If no intersection file exists, the page falls back to combining city + country data automatically.

#### Topic/guide (`content/e2/topics/[slug].json`)
```json
{
  "slug": "vs-eb5",
  "metaTitle": "...",
  "metaDescription": "...",
  "h1": "...",
  "intro": "...",
  "sections": [{ "heading": "...", "body": "..." }],
  "faqs": [{ "question": "...", "answer": "..." }],
  "comparisonTable": {
    "headers": ["Factor", "E-2 Visa", "EB-5 Visa"],
    "rows": [["Status", "Nonimmigrant", "Immigrant"]]
  },
  "relatedPages": [{ "slug": "minimum-investment", "title": "E-2 Minimum Investment" }]
}
```
Note: `comparisonTable` is optional — only `vs-eb5.json` has it currently. `relatedPages` links to other guide slugs.

#### Business type (`content/e2/business-types/[slug].json`)
```json
{
  "slug": "franchise",
  "name": "Franchise",
  "metaTitle": "...",
  "metaDescription": "...",
  "h1": "...",
  "intro": "...",
  "sections": [{ "heading": "...", "body": "..." }],
  "faqs": [{ "question": "...", "answer": "..." }]
}
```

### Routes and URL Patterns

| URL pattern | Route file | Content source |
|---|---|---|
| `/visas/e-2/for/[country]` | `app/visas/[slug]/for/[country]/page.tsx` | `content/e2/countries/[country].json` |
| `/visas/e-2/not-eligible/[country]` | `app/visas/e-2/not-eligible/[country]/page.tsx` | `content/e2/non-treaty/[country].json` |
| `/visas/e-2/[city]` | `app/visas/e-2/[city]/page.tsx` | `content/e2/cities/[city].json` |
| `/visas/e-2/[city]/for/[country]` | `app/visas/e-2/[city]/for/[country]/page.tsx` | `content/e2/intersections/[city]--[country].json` |
| `/visas/e-2/business-type/[type]` | `app/visas/e-2/business-type/[type]/page.tsx` | `content/e2/business-types/[type].json` |
| `/visas/e-2/guide/[topic]` | `app/visas/e-2/guide/[topic]/page.tsx` | `content/e2/topics/[topic].json` |

**Routing rule:** Literal segments (`not-eligible`, `business-type`, `guide`) take priority over the dynamic `[city]` segment. No conflicts.

**Intersection pages** use a hardcoded `PRIORITY_INTERSECTIONS` array in the page file — they do NOT auto-grow from the directory. Adding a new intersection requires updating both the array in `app/visas/e-2/[city]/for/[country]/page.tsx` AND the `E2_INTERSECTIONS` array in `app/sitemap.ts`.

### Sitemap

`app/sitemap.ts` reads the `content/e2/` directories at build time and auto-generates URLs for all JSON files found. **Exception:** intersection pages are hardcoded in `E2_INTERSECTIONS` (matches the page file's `PRIORITY_INTERSECTIONS`).

---

## Key Library Files

### `lib/schemas.ts`

JSON-LD builders. All return plain objects for `<JsonLd>` rendering.

- `buildVisaPageSchema({ visaName, locationName?, countryName?, industryName?, slug, description, faqs })` — returns array `[Service schema, FAQPage schema]`
- `buildBreadcrumbSchema(items: { name, path }[])` — BreadcrumbList
- `buildFaqSchema(faqs)` — FAQPage only
- `buildAttorneySchema(attorney)` — Attorney type
- `buildArticleSchema(post)` — Article type
- `buildLegalServiceSchema()` — root LegalService for firm

### `lib/content.ts`

- `getVisaData(slug)` — reads `content/visas/[slug].json`
- `getAttorneys()` — reads all `content/attorneys/*.json`
- `getAttorneyData(slug)` — single attorney
- `getBlogPosts()` — reads all `content/blog/*.mdx`, normalizes `categories`/`tags`
- `getBlogPost(slug)` — single post with frontmatter + MDX content
- `getGeneratedContent(key)` — reads `content/generated/[key].json` (legacy, currently unused)

---

## Components Reference

### `RelatedPages`

Always pass the `pages` prop explicitly with `href` (not `path`):
```tsx
<RelatedPages pages={[
  { title: 'E-2 in Seattle', href: '/visas/e-2/seattle', description: '...' },
]} />
```
The auto-generation fallback uses wrong paths for E-2 routes — always bypass it.

### `VisaHero`

Never pass an empty string for `locationName` — renders a trailing separator. Use a meaningful string or a fallback:
```tsx
<VisaHero
  headline={data.h1}
  subheadline={data.intro}
  visaName="E-2 Visa"
  locationName={`${data.name}, ${data.stateCode}`}
/>
```

### `FaqAccordion`

`'use client'` component. Always guard before rendering to avoid empty state:
```tsx
{data.faqs?.length > 0 && <FaqAccordion faqs={data.faqs} />}
```

### `LeadCapture`

Sidebar component. Optional `visaName` and `locationName` props pre-fill the contact form context. Always include in the sidebar column on all programmatic pages.

---

## Scripts

### `npm run seed-e2`

Runs `scripts/seed-e2-data.ts`. Generates stub JSON files for all cities and countries listed in the script's master arrays. **Idempotent** — skips files that already exist. Safe to re-run at any time.

Use when: adding new cities or countries to the master list in the script.

### `npm run generate-content`

Runs `scripts/generate-content.ts`. Legacy script — generates markdown via Claude API. Not currently used by the live site. Do not delete (may be revived for future content generation workflows).

### `npm run build`

Standard Next.js build. Runs TypeScript checks then generates all static pages. Current output: ~379 static pages.

---

## SEO Conventions

### Every programmatic page must have:
- Unique `metaTitle` and `metaDescription` in the JSON file
- `generateMetadata` function in the page component using those fields
- `alternates.canonical` set to the page's full URL
- `<JsonLd>` with `buildBreadcrumbSchema` and `buildVisaPageSchema`
- Breadcrumb trail matching the URL structure

### Schema pattern (two separate JsonLd calls):
```tsx
<JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
<JsonLd schema={buildVisaPageSchema({ ... })} />
```
`buildVisaPageSchema` returns an array `[Service, FAQPage]` — this is valid per Google spec and renders as a single script tag containing a JSON array.

### Content quality threshold for ranking:
- `intro` field: non-empty paragraph
- `sections`: at least 3 entries with substantive `body` text
- `faqs`: at least 4 questions specific to that page's topic

Stubs (empty sections/faqs arrays) render valid pages but will not rank until content is filled in.

---

## What Still Needs To Be Done

### Priority 1 — Author content for seeded stubs

Fill `intro`, `sections`, and `faqs` in existing stub files. No code changes needed — just edit the JSON.

**Non-treaty countries (highest impact — entirely empty):**
All 24 files in `content/e2/non-treaty/` need authored `intro` text. The `alternatives[]` array is pre-filled by the seed script. Priority order: india, china, brazil, russia, vietnam, nigeria, south-africa, uae, saudi-arabia, venezuela.

**Treaty countries (61 stubs):**
Priority order based on FY2025 issuance volume and search demand:
spain, argentina, ireland, netherlands, switzerland, sweden, norway, poland, czech-republic, greece, singapore, new-zealand, chile, costa-rica, philippines, thailand, malaysia, indonesia, ukraine, denmark, finland, austria, belgium, slovakia, romania, hungary, croatia, albania, estonia, latvia, lithuania, bulgaria, jordan, egypt, morocco, georgia, grenada, trinidad-and-tobago, jamaica, panama, ecuador, honduras, paraguay.

**Cities (70 stubs):**
Priority order: austin, boston, washington-dc, phoenix, san-diego, denver, portland, nashville, orlando, minneapolis, charlotte, philadelphia, san-jose, detroit, raleigh, tampa, honolulu, denver, salt-lake-city, kansas-city. Then state capitals for regulatory/legal search intent.

### Priority 2 — Build intersection JSON files

50 intersection routes exist and fall back to combined city+country data. Creating dedicated JSON files produces much higher-quality, genuinely unique content — the highest commercial-intent pages on the site.

Filename format: `[city]--[country].json` (double dash).

Highest-value combinations to author first:
```
seattle--south-korea.json
seattle--japan.json
miami--colombia.json
los-angeles--south-korea.json
new-york--italy.json
new-york--france.json
san-francisco--taiwan.json
san-francisco--israel.json
houston--colombia.json
chicago--germany.json
```

### Priority 3 — Build business type JSON files

The route `/visas/e-2/business-type/[type]` exists but generates 0 pages — `content/e2/business-types/` is empty.

Create these 10 files to activate the route:
```
franchise.json
restaurant.json
tech-startup.json
retail.json
real-estate.json
service-business.json
manufacturing.json
e-commerce.json
existing-business.json
new-business.json
```

### Priority 4 — Add more intersection pairs

Current `PRIORITY_INTERSECTIONS` in `app/visas/e-2/[city]/for/[country]/page.tsx` has 50 pairs. Adding more requires updating both that array AND `E2_INTERSECTIONS` in `app/sitemap.ts` — they must stay in sync.

---

## Important Research Notes (Do Not Get Wrong)

These are areas where most competitor immigration sites publish incorrect or outdated information. All Watson content must reflect the correct 2025 position.

**AMIGOS Act (late 2022):** Imposes a 3-year domicile requirement on E-2 applications based on citizenship obtained through a CBI program. Grenada uniquely offers a spousal registration workaround (spouse who is a Grenadian citizen by birth can register the investor as a dependent — different treaty basis). Turkey CBI does not offer this workaround. Covered in `dual-citizenship.json` and `grenada-citizenship.json`.

**Spouse work authorization (post-November 2021):** The Shergill v. Mayorkas settlement made E-2 dependent spouse work authorization automatic via E-2S I-94 annotation — no separate EAD filing required. Many competitor pages still describe the old EAD process. Practical complications: employer HR unfamiliarity with I-94-based authorization, SSN process, CBP coding errors at entry. Covered in `spouse-work-authorization.json`.

**USCIS premium processing fee:** Currently $2,805 (not the older $1,225 figure). Guarantees 15 calendar days — not 30. Covered in `processing-time.json`.

**Israel E-2 visa validity:** Only 3 months (vs 2–5 years for most countries). Does not mean the investor must leave every 3 months — the U.S. admission period is still 2 years per entry. The 3-month figure is the visa stamp validity requiring consulate renewal, not the admission period. Covered in `content/e2/countries/israel.json`.

**Portugal E-2 treaty:** Added March 2025 — one of the newest eligible countries. Significant because: (1) Portuguese citizens from Golden Visa/naturalization (including Brazilians and others) are now E-2 eligible; (2) essentially zero competitor content exists yet for "E-2 visa Portugal." Covered in `content/e2/countries/portugal.json`.

**Taiwan AIT arrangement:** Taiwan is not formally a treaty country (no diplomatic relations with US) but has E-2 eligibility through the AIT-TECRO commercial agreement. Must be described accurately — not as a "treaty" per se but functionally equivalent. Covered in `content/e2/countries/taiwan.json`.

**Non-treaty country URLs:** Indian, Chinese, Brazilian nationals cannot apply for E-2 regardless of investment amount — purely a treaty eligibility issue. Their pages live at `/visas/e-2/not-eligible/[country]` (not `/visas/e-2/for/[country]`) to avoid the misleading implication that they can apply.
