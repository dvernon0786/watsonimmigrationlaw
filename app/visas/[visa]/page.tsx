import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import VisaHero from '@/components/sections/VisaHero';
import FaqAccordion from '@/components/sections/FaqAccordion';
import LeadCapture from '@/components/sections/LeadCapture';
import AttorneyCard from '@/components/sections/AttorneyCard';
import MediaLogos from '@/components/sections/MediaLogos';
import RelatedPages from '@/components/sections/RelatedPages';
import { buildVisaPageSchema, buildBreadcrumbSchema } from '@/lib/schemas';
import { getVisaData, getAttorneys } from '@/lib/content';

export async function generateMetadata({ params }: { params: { visa: string } }): Promise<Metadata> {
  const visaData = await getVisaData(params.visa);
  if (!visaData) return {};

  return {
    title: `${visaData.name} | Watson Immigration Law`,
    description: visaData.description,
    keywords: `${visaData.name}, visa, immigration, ${params.visa}`,
  };
}

export default async function VisaOverviewPage({ params }: { params: { visa: string } }) {
  const visaData = await getVisaData(params.visa);
  if (!visaData) notFound();

  const attorneys = await getAttorneys();

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Visas', path: '/visas' },
    { name: visaData.name, path: `/visas/${params.visa}` },
  ];

  const relatedPages = [
    {
      title: "H-1B Visa Services",
      description: "Specialty occupation visas for skilled professionals",
      href: "/visas/h-1b",
      image: "/visas/h-1b.jpg"
    },
    {
      title: "EB-5 Investor Program",
      description: "Green card through business investment",
      href: "/visas/eb-5",
      image: "/visas/eb-5.jpg"
    },
    {
      title: "E-2 Treaty Investor Visa",
      description: "Non-immigrant visa for treaty country investors",
      href: "/visas/e-2",
      image: "/visas/e-2.jpg"
    },
    {
      title: "O-1 Extraordinary Ability",
      description: "Visa for individuals with extraordinary ability",
      href: "/visas/o-1",
      image: "/visas/o-1.jpg"
    }
  ].filter(page => !page.href.includes(params.visa));

  return (
    <>
      <JsonLd schema={buildVisaPageSchema({
        visaName: visaData.name,
        locationName: '',
        slug: `/visas/${params.visa}`,
        description: visaData.description,
        faqs: visaData.faqs,
      })} />
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />

      <Breadcrumbs items={breadcrumbs} />

      <VisaHero
        headline={`${visaData.name} Visa Services`}
        subheadline={visaData.description}
        visaName={visaData.name}
        locationName=""
      />

      <MediaLogos />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none">
                <h2>Eligibility Requirements</h2>
                <ul>
                  {visaData.eligibility.requirements.map((req: string, index: number) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>

                <h2>Benefits</h2>
                <ul>
                  {visaData.eligibility.benefits.map((benefit: string, index: number) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>

                <h2>Processing Information</h2>
                <p><strong>Timeline:</strong> {visaData.processing.timeline}</p>
                <p><strong>Cost:</strong> {visaData.processing.cost}</p>

                <h3>Documents Required:</h3>
                <ul>
                  {visaData.processing.documents.map((doc: string, index: number) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <LeadCapture />
              <AttorneyCard
                name={attorneys[0]?.name || 'Tahmina Watson'}
                title={attorneys[0]?.title || 'Managing Attorney'}
                image={attorneys[0]?.image || '/attorneys/tahmina-watson.jpg'}
                slug={attorneys[0]?.slug || 'tahmina-watson'}
                credentials={attorneys[0]?.credentials || []}
              />
            </div>
          </div>
        </div>
      </section>

      <FaqAccordion faqs={visaData.faqs} />

      <RelatedPages pages={relatedPages} />
    </>
  );
}