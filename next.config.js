/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export if needed (Vercel handles this automatically)
  // output: 'export',

  // Image optimization
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'watsonimmigrationlaw.com' },
    ],
  },

  // Redirect old WordPress URLs to new structure
  async redirects() {
    return [
      // Practice areas
      {
        source: '/practice-areas',
        destination: '/visas',
        permanent: true,
      },
      {
        source: '/practice-areas/eb5-investor-visa',
        destination: '/visas/eb-5',
        permanent: true,
      },
      {
        source: '/practice-areas/e2-investor-visa',
        destination: '/visas/e-2',
        permanent: true,
      },
      // Team
      {
        source: '/team/about-tahmina-watson',
        destination: '/team/tahmina-watson',
        permanent: true,
      },
      {
        source: '/team/about-nicole-lockett',
        destination: '/team/nicole-lockett',
        permanent: true,
      },
      // Media
      {
        source: '/tahmina-watson-in-the-media',
        destination: '/media',
        permanent: true,
      },
      {
        source: '/tahmina-watson-in-the-media/:path*',
        destination: '/media',
        permanent: true,
      },
      // Blog — WordPress year/month URLs to flat slugs
      // WordPress: /2026/03/06/flash-sale-...
      // Next.js:   /blog/flash-sale-...
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      // Podcast
      {
        source: '/tahminawatsonpodcasts',
        destination: '/podcast',
        permanent: true,
      },
      // Resources
      {
        source: '/resources-links',
        destination: '/resources',
        permanent: true,
      },
    ]
  },

  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        ],
      },
      {
        // Cache static programmatic pages for 1 hour, revalidate in background
        source: '/visas/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=3600, stale-while-revalidate=86400',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig