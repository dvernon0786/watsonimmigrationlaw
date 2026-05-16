'use client'

import Image from 'next/image'

const LOGOS = [
  { src: '/above-the-law.webp', alt: 'Above the Law', w: 130 },
  { src: '/bloomberg-logo.png', alt: 'Bloomberg', w: 140 },
  { src: '/cnn-logo-black-and-white.png', alt: 'CNN', w: 80 },
  { src: '/entrepreneur.png', alt: 'Entrepreneur', w: 140 },
  { src: '/Forbes_Logo.png', alt: 'Forbes', w: 110 },
  { src: '/puget.png', alt: 'Puget Sound Business Journal', w: 130 },
  { src: '/The_Guardian.png', alt: 'The Guardian', w: 140 },
  { src: '/the-seattle.png', alt: 'The Seattle Times', w: 140 },
  { src: '/the-washington-post-logo.png', alt: 'The Washington Post', w: 140 },
  { src: '/yahoo-logo.png', alt: 'Yahoo', w: 100 },
  { src: '/npr.png', alt: 'NPR', w: 80 },
]

export default function MediaLogos() {
  const doubled = [...LOGOS, ...LOGOS]

  return (
    <section className="py-8 bg-white border-b border-border overflow-hidden">
      <div className="max-w-content mx-auto px-6 lg:px-8 mb-6">
        <p className="text-center text-xs font-semibold text-charcoal/50 uppercase tracking-widest">
          As seen in
        </p>
      </div>

      <div
        className="relative"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex animate-marquee [animation-play-state:running] hover:[animation-play-state:paused]">
          {doubled.map((logo, i) => (
            <div
              key={i}
              className="inline-flex items-center justify-center flex-shrink-0 mx-10"
              style={{ height: 44 }}
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={logo.w}
                height={44}
                className="object-contain grayscale opacity-40 hover:opacity-70 transition-opacity duration-200"
                style={{ height: 44, width: 'auto' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
