import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import AttorneyCard from '@/components/sections/AttorneyCard';
import LeadCapture from '@/components/sections/LeadCapture';
import MediaLogos from '@/components/sections/MediaLogos';
import { buildAttorneySchema, buildBreadcrumbSchema } from '@/lib/schemas';
import { getAttorneyData, getAttorneys } from '@/lib/content';
import AttorneyImage from '@/components/ui/AttorneyImage';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const attorney = await getAttorneyData(params.slug);
  if (!attorney) return {};

  return {
    title: `${attorney.name} | ${attorney.title} | Watson Immigration Law`,
    description: attorney.bio,
    keywords: `${attorney.name}, immigration attorney, ${attorney.title}, Seattle`,
  };
}

export default async function AttorneyPage({ params }: { params: { slug: string } }) {
  const attorney = await getAttorneyData(params.slug);
  if (!attorney) notFound();

  const allAttorneys = await getAttorneys();
  const otherAttorneys = allAttorneys.filter(a => a.slug !== params.slug);

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Team', path: '/team' },
    { name: attorney.name, path: `/team/${params.slug}` },
  ];

  return (
    <>
      <JsonLd schema={buildAttorneySchema(attorney)} />
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />

      <Breadcrumbs items={breadcrumbs} />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-8 mb-8">
                <AttorneyImage
                  src={attorney.image}
                  alt={attorney.name}
                  className="w-32 h-32 rounded-full object-cover"
                />
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{attorney.name}</h1>
                  <p className="text-xl text-gray-600 mb-4">{attorney.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {attorney.credentials.map((credential: string, index: number) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {credential}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed mb-8">{attorney.bio}</p>

                <h2>Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-4 mb-8">
                  <div>
                    <p><strong>Email:</strong> {attorney.email}</p>
                    <p><strong>Phone:</strong> {attorney.phone}</p>
                  </div>
                  <div>
                    <p><strong>Office:</strong> Seattle, Washington</p>
                    <p><strong>Languages:</strong> English</p>
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Schedule a Consultation</h3>
                  <p className="mb-4">
                    Ready to discuss your immigration needs? Contact {attorney.name.split(' ')[0]} directly
                    to schedule a consultation.
                  </p>
                  <div className="flex gap-4">
                    <a
                      href={`mailto:${attorney.email}`}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Email {attorney.name.split(' ')[0]}
                    </a>
                    <a
                      href={`tel:${attorney.phone}`}
                      className="px-6 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Call {attorney.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <LeadCapture />

              {otherAttorneys.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">Meet Our Other Attorneys</h3>
                  <div className="space-y-4">
                    {otherAttorneys.map((otherAttorney) => (
                      <AttorneyCard
                        key={otherAttorney.slug}
                        name={otherAttorney.name}
                        title={otherAttorney.title}
                        image={otherAttorney.image}
                        slug={otherAttorney.slug}
                        credentials={otherAttorney.credentials}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <MediaLogos />
    </>
  );
}