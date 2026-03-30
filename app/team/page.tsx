import type { Metadata } from 'next';
import AttorneyCard from '@/components/sections/AttorneyCard';
import LeadCapture from '@/components/sections/LeadCapture';
import MediaLogos from '@/components/sections/MediaLogos';
import JsonLd from '@/components/seo/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/schemas';
import { getAttorneys } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Our Team | Immigration Attorneys | Watson Immigration Law',
  description: 'Meet our experienced immigration attorneys in Seattle. Expert counsel on H-1B, EB-5, E-2, O-1, and L-1 visas with 15+ years combined experience.',
  keywords: 'immigration attorneys, lawyers, Seattle, Tahmina Watson, Nicole Lockett',
};

export default async function TeamPage() {
  const attorneys = await getAttorneys();

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Team', path: '/team' },
      ])} />

      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Immigration Attorneys</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team combines deep legal expertise with a passion for helping clients
              achieve their immigration goals. With over 15 years of combined experience, we provide
              trusted counsel for individuals and businesses navigating U.S. immigration law.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {attorneys.map((attorney) => (
              <div key={attorney.slug} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="p-8">
                  <AttorneyCard
                    name={attorney.name}
                    title={attorney.title}
                    image={attorney.image}
                    slug={attorney.slug}
                    credentials={attorney.credentials}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Team?</h2>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Proven Track Record</h3>
                <p className="text-gray-600">Successfully handled thousands of immigration cases with high approval rates.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Deep Expertise</h3>
                <p className="text-gray-600">Specialized knowledge in complex visa categories and immigration law.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2">Client-Focused</h3>
                <p className="text-gray-600">Personalized service with clear communication throughout your case.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LeadCapture />

      <MediaLogos />
    </>
  );
}