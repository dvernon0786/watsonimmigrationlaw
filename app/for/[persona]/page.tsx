import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LeadCapture from '@/components/sections/LeadCapture'
import FaqAccordion from '@/components/sections/FaqAccordion'
import VisaCard from '@/components/sections/VisaCard'
import { buildBreadcrumbSchema } from '@/lib/schemas'

interface Props { params: Promise<{ persona: string }> }

const PERSONAS: Record<string, {
  title: string
  subtitle: string
  description: string
  visas: string[]
  faqs: { question: string; answer: string }[]
  whyUs: string
}> = {
  'founders': {
    title: 'Immigration for Startup Founders',
    subtitle: 'No employer required. Build your startup in the United States.',
    description: 'You have a vision for a company. Immigration shouldn\'t be the obstacle that stops you. Tahmina Watson literally wrote the book on startup founder immigration — and has spent 15+ years finding the right path for founders from every country.',
    visas: ['o-1', 'eb-2-niw', 'eb-1', 'e-2', 'h-1b'],
    faqs: [
      { question: 'Can a startup founder get a U.S. visa without an employer?', answer: 'Yes — several visa categories do not require a traditional U.S. employer. The O-1A (extraordinary ability), EB-1A (extraordinary ability green card), and EB-2 NIW (national interest waiver green card) all allow you to petition independently. The E-2 treaty investor visa lets you start or buy your own U.S. business. We help founders identify and build the strongest possible case for self-sponsored pathways.' },
      { question: 'I was not selected in the H-1B lottery. What are my options?', answer: 'Several strong alternatives exist: O-1A (extraordinary ability, no lottery), L-1 (if you have a qualifying foreign parent company), TN (if you\'re Canadian or Mexican), cap-exempt H-1B (if you can work at a qualifying university or nonprofit), E-3 (if you\'re Australian), and EB-2 NIW or EB-1A if you\'re ready to pursue permanent residence. We run annual post-lottery webinars covering all options.' },
      { question: 'What is the best visa for a serial entrepreneur?', answer: 'For most founders, the O-1A is the starting point if you have traction — media coverage, significant funding, notable clients, speaking invitations, or board roles. Once you have an approved O-1A, you\'re well-positioned for EB-1A (green card without employer). EB-2 NIW is an excellent parallel strategy. We help founders build the narrative and evidence package needed for these categories.' },
      { question: 'Can I be on H-1B at a company while also running my own startup?', answer: 'With careful structuring, yes — but this requires attention. H-1B status ties you to your sponsoring employer. Side work or equity-based work at your own startup without additional H-1B authorization from the startup company can create status issues. We help founders structure their immigration situation correctly.' },
      { question: 'My startup is incorporated in the U.S. but I\'m abroad. What visa do I need?', answer: 'This is one of the most common founder situations. Options include: O-1A through an agent or through the U.S. company if structured properly, E-2 if your country has a treaty and you\'re investing capital, EB-2 NIW if your work is of national importance, or L-1 if you have a qualifying foreign entity. Schedule a consultation so we can evaluate your specific situation.' },
    ],
    whyUs: 'Tahmina Watson has authored four books on startup founder immigration and has been the leading advocate for a U.S. startup visa for over a decade. She has helped hundreds of founders navigate the complex landscape of self-sponsored visas.',
  },
  'investors': {
    title: 'Immigration for Investors',
    subtitle: 'U.S. green cards and work visas through qualifying investment.',
    description: 'If you\'re a high-net-worth investor looking to establish a U.S. presence, EB-5 and E-2 offer two distinct paths. We help you understand the difference, structure your investment correctly, and navigate the process with confidence.',
    visas: ['eb-5', 'e-2', 'l-1', 'eb-1'],
    faqs: [
      { question: 'What is the difference between EB-5 and E-2?', answer: 'EB-5 leads to permanent residence (a green card) and requires a minimum investment of $800,000–$1.05M. It is available to nationals of all countries. E-2 is a renewable temporary visa (not a green card) available to nationals of 80+ treaty countries, with no set minimum investment. EB-5 is the better choice if your goal is permanent residence. E-2 is faster, more flexible, and more accessible for those whose country has a treaty.' },
      { question: 'How long does the EB-5 process take?', answer: 'The total EB-5 process typically takes 3–6 years from filing to unconditional green card. The I-526E petition takes 12–36 months. After approval, immigrant visa or adjustment of status takes 6–18 months. Then a 2-year conditional green card period, followed by the I-829 petition to remove conditions (another 12–24 months). We help clients manage this timeline and maintain valid status throughout.' },
      { question: 'What is the source of funds requirement for EB-5?', answer: 'Every dollar of the EB-5 investment must be traced to a lawful source. USCIS requires a comprehensive paper trail going back 5+ years — tax returns, bank statements, property sale records, business ownership documents, loan documents, gift letters, or other records explaining the origin of your wealth. This is the most document-intensive part of EB-5 and requires meticulous preparation.' },
      { question: 'Can I run my own business on an E-2 visa?', answer: 'Yes — the E-2 is specifically designed for investors who own and actively manage their U.S. business. You must own at least 50% of the enterprise and have operational control. You can start a new business or acquire an existing one. The business must be non-marginal (capable of generating significantly more than just a living for you) and the investment must be substantial and at risk.' },
    ],
    whyUs: 'Watson Immigration Law has extensive experience with both EB-5 Regional Center investments and direct EB-5 investments, as well as E-2 treaty investor cases for clients from dozens of countries. We help investors structure their immigration and investment strategy together.',
  },
  'employees': {
    title: 'Immigration for Professionals & Employees',
    subtitle: 'Work visas for skilled professionals joining U.S. companies.',
    description: 'Whether your employer is sponsoring you or you\'re navigating the immigration system independently, we help professionals at every stage — from initial work visas to permanent green cards.',
    visas: ['h-1b', 'o-1', 'l-1', 'eb-1', 'eb-2-niw'],
    faqs: [
      { question: 'My employer is sponsoring my H-1B. What should I expect?', answer: 'Your employer files a Labor Condition Application with the DOL (7–10 business days), then registers for the annual lottery in March. If selected, the full petition is filed from April onward with premium processing available. If approved, employment starts October 1. The process is employer-driven, but we help employees understand what\'s happening and what rights they have.' },
      { question: 'What are my options if I\'m laid off while on H-1B?', answer: 'You have a 60-day grace period after your H-1B employment ends to find a new employer, file to change status, or depart the U.S. Act quickly. You can transfer to a new employer\'s H-1B, change to a different visa category (O-1, student visa, etc.), or apply for a change of status. Don\'t wait — the 60-day window runs from the last day of employment.' },
      { question: 'Can I switch jobs while waiting for my green card?', answer: 'Yes, with careful planning. H-1B portability and AC-21 rules allow you to change employers once your I-140 is approved and your I-485 has been pending for 180+ days, provided the new job is in the same or similar occupational classification. Get professional advice before any job change during the green card process.' },
      { question: 'My employer won\'t sponsor a green card. What can I do?', answer: 'There are self-sponsored green card options that don\'t require employer involvement: EB-1A (extraordinary ability) and EB-2 NIW (national interest waiver). Both require meeting substantive criteria, but both allow you to control your own immigration destiny without depending on an employer. We\'ve helped many professionals in this situation build successful self-sponsored cases.' },
    ],
    whyUs: 'We represent both employers and employees, giving us a full-picture view of how employment-based immigration works in practice — not just on paper. We help employees protect their rights and navigate their options at every career stage.',
  },
  'companies': {
    title: 'Corporate Immigration Programs',
    subtitle: 'Strategic immigration management for HR teams and growing companies.',
    description: 'If you\'re managing immigration for a team of 5 or 500, you need more than just a law firm that files paperwork. You need a strategic partner who understands your business, anticipates your needs, and keeps your compliance airtight.',
    visas: ['h-1b', 'l-1', 'eb-1', 'eb-2-niw'],
    faqs: [
      { question: 'We\'re a startup — can we sponsor H-1B visas?', answer: 'Yes. Even pre-revenue, seed-funded startups can sponsor H-1B visas. The key requirements are that your company is a legitimate U.S. employer with an EIN, has a valid employer-employee relationship with the worker, and the role qualifies as a specialty occupation. We regularly help early-stage startups hire international talent through H-1B and other visa categories.' },
      { question: 'What does a corporate immigration program look like?', answer: 'A well-run corporate immigration program includes: proactive calendar management (H-1B registration, annual renewals, expiration tracking), I-9 compliance audits, policies for job changes and promotions that trigger immigration reviews, employee immigration "town halls" to ensure employees understand their status, and a trusted attorney relationship for rapid turnaround when issues arise.' },
      { question: 'How do we handle I-9 compliance?', answer: 'I-9 compliance requires verifying the identity and work authorization of every employee hired after November 6, 1986. Common issues include incomplete forms, incorrect reverification, and missing re-verification for expiring work authorization. We conduct I-9 audits and help companies remediate errors before they become DOL enforcement issues.' },
      { question: 'We have an employee who was not selected in the H-1B lottery. What do we do?', answer: 'Evaluate alternatives immediately: O-1A if the employee has outstanding credentials, L-1 if there\'s a qualifying foreign entity, TN if the employee is Canadian or Mexican, cap-exempt H-1B if your company has a qualifying affiliation, or E-3 for Australian nationals. We help HR teams evaluate these options quickly after lottery results.' },
    ],
    whyUs: 'We understand that companies need reliability, speed, and strategic thinking — not just legal accuracy. We become an extension of your HR team, handling complexity so you can focus on building your business.',
  },
}

const VISA_DETAILS: Record<string, { name: string; tagline: string; processingTime: string }> = {
  'h-1b': { name: 'H-1B Visa', tagline: 'Work visa for specialty occupation professionals.', processingTime: '3–6 months' },
  'eb-5': { name: 'EB-5 Investor', tagline: 'Green card through qualifying U.S. investment.', processingTime: '3–6 years' },
  'e-2': { name: 'E-2 Treaty Investor', tagline: 'Start a U.S. business — no lottery required.', processingTime: '2–8 weeks' },
  'o-1': { name: 'O-1 Extraordinary Ability', tagline: 'For top performers — no cap, no lottery.', processingTime: '2–4 months' },
  'l-1': { name: 'L-1 Intracompany Transfer', tagline: 'Transfer managers and key staff to the U.S.', processingTime: '1–6 months' },
  'eb-1': { name: 'EB-1 Priority Worker', tagline: 'Fastest green card — no PERM required.', processingTime: '12–24 months' },
  'eb-2-niw': { name: 'EB-2 NIW', tagline: 'Self-petition for a green card — no employer needed.', processingTime: '12–36 months' },
}

export async function generateStaticParams() {
  return Object.keys(PERSONAS).map(persona => ({ persona }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { persona: personaKey } = await params
  const persona = PERSONAS[personaKey]
  if (!persona) return {}
  return {
    title: `${persona.title} | Watson Immigration Law`,
    description: persona.description,
    alternates: { canonical: `https://watsonimmigrationlaw.com/for/${personaKey}` },
  }
}

export default async function PersonaPage({ params }: Props) {
  const { persona: personaKey } = await params
  const persona = PERSONAS[personaKey]
  if (!persona) notFound()

  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: persona.title, path: `/for/${personaKey}` },
  ]

  const visasForPersona = persona.visas.map(slug => ({
    ...VISA_DETAILS[slug],
    slug,
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  }))

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      {/* Hero */}
      <section className="py-section bg-navy text-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-display-lg text-white mb-4 leading-tight">{persona.title}</h1>
            <p className="text-xl text-gold-400 font-medium mb-4">{persona.subtitle}</p>
            <p className="text-white/80 leading-relaxed">{persona.description}</p>
          </div>
        </div>
      </section>

      {/* Visa pathways */}
      <section className="py-section bg-cream">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <h2 className="font-display text-display-sm text-navy mb-8">Recommended visa pathways</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visasForPersona.map(v => (
              <VisaCard key={v.slug} name={v.name} slug={v.slug} tagline={v.tagline} processingTime={v.processingTime} icon={v.icon} />
            ))}
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {/* Why Watson */}
              <div className="bg-cream rounded-xl2 p-6 mb-10">
                <h2 className="font-display text-display-sm text-navy mb-3">Why Watson Immigration Law?</h2>
                <p className="text-charcoal/80 leading-relaxed">{persona.whyUs}</p>
              </div>
              {/* FAQs */}
              <FaqAccordion faqs={persona.faqs} />
            </div>
            <aside>
              <LeadCapture />
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
