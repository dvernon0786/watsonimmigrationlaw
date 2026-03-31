import type { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import LeadCapture from '@/components/sections/LeadCapture';
import AttorneyCard from '@/components/sections/AttorneyCard';
import MediaLogos from '@/components/sections/MediaLogos';
import FaqAccordion from '@/components/sections/FaqAccordion';
import RelatedPages from '@/components/sections/RelatedPages';
import JsonLd from '@/components/seo/JsonLd';
import { buildFaqSchema, buildBreadcrumbSchema } from '@/lib/schemas';
import { getAttorneys } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Watson Immigration Law | Expert Immigration Attorneys in Seattle',
  description: 'Leading immigration law firm in Seattle specializing in H-1B, EB-5, E-2, O-1, and L-1 visas. Trusted by entrepreneurs, investors, and businesses worldwide.',
  keywords: 'immigration attorney Seattle, H-1B visa lawyer, EB-5 investor visa, E-2 treaty visa, O-1 extraordinary ability, L-1 intracompany transfer',
};

export default async function HomePage() {
  const attorneys = await getAttorneys();

  const faqs = [
    {
      question: "What types of visas do you specialize in?",
      answer: "We specialize in work visas (H-1B, O-1, L-1), investor visas (EB-5, E-2), and business immigration. Our attorneys have extensive experience with complex cases including multinational transfers, extraordinary ability petitions, and investment-based green cards."
    },
    {
      question: "How long does the immigration process typically take?",
      answer: "Processing times vary by visa type and individual circumstances. H-1B petitions typically take 2-6 months, EB-5 can take 12-24 months, and E-2 visas are usually processed within 2-4 weeks. We provide detailed timelines during your consultation."
    },
    {
      question: "Do you represent both individuals and companies?",
      answer: "Yes, we represent both individual applicants and sponsoring companies. Our team handles the full spectrum of immigration needs, from individual visa applications to corporate immigration programs for growing businesses."
    },
    {
      question: "What sets Watson Immigration Law apart?",
      answer: "Our founder, Tahmina Watson, has over 15 years of experience and has been featured in Forbes, Bloomberg, and The New York Times. We combine deep legal expertise with a client-first approach, ensuring successful outcomes for even the most complex cases."
    },
    {
      question: "Do you offer remote consultations?",
      answer: "Yes, we offer virtual consultations via Zoom for clients worldwide. Many of our clients are based outside the Seattle area, and we provide the same level of service remotely as we do in person."
    }
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
  ];

  return (
    <>
      <JsonLd schema={buildFaqSchema(faqs)} />
      <JsonLd schema={buildBreadcrumbSchema([
        { name: 'Home', path: '/' }
      ])} />

      <Hero />

      <LeadCapture />

      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Immigration Attorneys
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team combines deep legal expertise with a passion for helping clients achieve their immigration goals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {attorneys.map((attorney) => (
              <AttorneyCard
                key={attorney.slug}
                name={attorney.name}
                title={attorney.title}
                image={attorney.image}
                slug={attorney.slug}
                credentials={attorney.credentials}
              />
            ))}
          </div>
        </div>
      </section>

      <MediaLogos />

      <FaqAccordion faqs={faqs} />

      <RelatedPages pages={relatedPages} />
    </>
  );
}