import Link from 'next/link'
import Image from 'next/image'
import { getAttorneyData } from '@/lib/content'

export default async function AboutFounder() {
  const attorney = await getAttorneyData('tahmina-watson')
  if (!attorney) return null

  const yearsActive = new Date().getFullYear() - 2006
  const paragraphs = attorney.bio.split('\n\n').filter(Boolean)

  return (
    <section className="py-section bg-cream">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image column */}
          <div className="relative hidden lg:block">
            <div className="rounded-xl3 overflow-hidden aspect-[475/533] bg-navy relative">
              <Image
                src="/Tahmina.png"
                alt={`${attorney.name}, Founder of Watson Immigration Law`}
                fill
                sizes="(max-width: 1024px) 0px, 475px"
                className="object-contain object-center"
                priority
              />
            </div>
            {/* Dynamic years badge */}
            <div className="absolute -bottom-6 -right-6 bg-gold-400 text-navy rounded-xl2 px-6 py-4 shadow-cta">
              <p className="font-display text-3xl font-bold leading-none">{yearsActive}+</p>
              <p className="text-xs font-semibold uppercase tracking-widest mt-1">Years of Practice</p>
            </div>
          </div>

          {/* Content column */}
          <div>
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-3">
              About Our Founder
            </p>
            <h2 className="font-display text-display-lg text-navy mb-5 leading-tight">
              {attorney.name} —{' '}
              <em className="italic text-gold-400">A Voice for Immigrants in America</em>
            </h2>

            {/* First 2 paragraphs from bio */}
            {paragraphs.slice(0, 2).map((p: string, i: number) => (
              <p key={i} className="text-charcoal/70 leading-relaxed mb-4">{p}</p>
            ))}

            {/* Media mentions */}
            {attorney.mediaMentions?.length > 0 && (
              <p className="text-charcoal/70 leading-relaxed mb-6">
                Her work has been cited in{' '}
                {attorney.mediaMentions.map((pub: string, i: number) => (
                  <span key={pub}>
                    <em className="not-italic font-medium text-charcoal">{pub}</em>
                    {i < attorney.mediaMentions.length - 2
                      ? ', '
                      : i === attorney.mediaMentions.length - 2
                      ? ', and '
                      : ''}
                  </span>
                ))}.
              </p>
            )}

            {/* Credentials */}
            <ul className="space-y-2 mb-8">
              {attorney.credentials.map((cred: string, i: number) => (
                <li key={i} className="flex items-start gap-2 text-sm text-charcoal/80">
                  <span className="text-gold-400 mt-0.5 flex-shrink-0">•</span>
                  {cred}
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-gold-400 text-navy font-bold text-base rounded-lg hover:bg-gold-500 transition-colors shadow-cta"
              >
                Schedule a Consultation
              </Link>
              <Link
                href="/team/tahmina-watson"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-navy text-navy font-bold text-base rounded-lg hover:bg-navy hover:text-white transition-colors"
              >
                Full bio →
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
