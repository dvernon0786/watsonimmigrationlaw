// lib/schemas.ts — JSON-LD schema builders for EEAT signals

const FIRM = {
  name: 'Watson Immigration Law',
  url: 'https://watsonimmigrationlaw.com',
  telephone: '+12062925237',
  email: 'info@watsonimmigrationlaw.com',
  address: {
    streetAddress: '1700 7th Avenue, Suite 2100',
    addressLocality: 'Seattle',
    addressRegion: 'WA',
    postalCode: '98101',
    addressCountry: 'US',
  },
}

// ─── LegalService (root layout) ──────────────────────────────────────────────
export function buildLegalServiceSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: FIRM.name,
    url: FIRM.url,
    telephone: FIRM.telephone,
    email: FIRM.email,
    address: {
      '@type': 'PostalAddress',
      ...FIRM.address,
    },
    areaServed: {
      '@type': 'Country',
      name: 'United States',
    },
    serviceType: [
      'EB-5 Investor Visa',
      'E-2 Investor Visa',
      'H-1B Work Visa',
      'O-1 Extraordinary Ability Visa',
      'L-1 Intracompany Transfer Visa',
    ],
    founder: {
      '@type': 'Person',
      name: 'Tahmina Watson',
      jobTitle: 'Immigration Attorney',
      url: `${FIRM.url}/team/tahmina-watson`,
    },
    sameAs: [
      'https://www.linkedin.com/company/watson-immigration-law',
      'https://twitter.com/tahminawatson',
    ],
  }
}

// ─── Attorney (team pages) ────────────────────────────────────────────────────
export function buildAttorneySchema(attorney: {
  name: string
  slug: string
  jobTitle: string
  description: string
  image: string
  barAdmissions: string[]
  education: Array<{ degree: string; institution: string; year: number }>
  awards?: string[]
  sameAs?: string[]
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Attorney',
    name: attorney.name,
    jobTitle: attorney.jobTitle,
    description: attorney.description,
    image: `${FIRM.url}${attorney.image}`,
    url: `${FIRM.url}/team/${attorney.slug}`,
    worksFor: {
      '@type': 'LegalService',
      name: FIRM.name,
      url: FIRM.url,
    },
    alumniOf: attorney.education.map((e) => ({
      '@type': 'EducationalOrganization',
      name: e.institution,
    })),
    hasCredential: attorney.barAdmissions.map((bar) => ({
      '@type': 'EducationalOccupationalCredential',
      name: `Bar Admission: ${bar}`,
    })),
    award: attorney.awards,
    sameAs: attorney.sameAs,
  }
}

// ─── FAQPage (visa pages) ─────────────────────────────────────────────────────
export function buildFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

// ─── Article (blog posts) ─────────────────────────────────────────────────────
export function buildArticleSchema(post: {
  title: string
  slug: string
  description: string
  datePublished: string
  dateModified: string
  authorSlug: string
  authorName: string
  image?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    url: `${FIRM.url}/blog/${post.slug}`,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    image: post.image
      ? `${FIRM.url}${post.image}`
      : `${FIRM.url}/og-default.jpg`,
    author: {
      '@type': 'Person',
      name: post.authorName,
      url: `${FIRM.url}/team/${post.authorSlug}`,
    },
    publisher: {
      '@type': 'Organization',
      name: FIRM.name,
      logo: {
        '@type': 'ImageObject',
        url: `${FIRM.url}/logo.png`,
      },
    },
  }
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────
export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${FIRM.url}${item.path}`,
    })),
  }
}

// ─── Programmatic visa page (LegalService subtype) ───────────────────────────
export function buildVisaPageSchema(opts: {
  visaName: string
  locationName?: string
  countryName?: string
  industryName?: string
  slug: string
  description: string
  faqs: Array<{ question: string; answer: string }>
}) {
  const name = [
    opts.visaName,
    opts.locationName && `in ${opts.locationName}`,
    opts.countryName && `for ${opts.countryName} Nationals`,
    opts.industryName && `for ${opts.industryName}`,
  ]
    .filter(Boolean)
    .join(' ')

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description: opts.description,
      url: `${FIRM.url}${opts.slug}`,
      provider: {
        '@type': 'LegalService',
        name: FIRM.name,
        url: FIRM.url,
      },
      areaServed: opts.locationName
        ? { '@type': 'City', name: opts.locationName }
        : { '@type': 'Country', name: 'United States' },
    },
    buildFaqSchema(opts.faqs),
  ]
}