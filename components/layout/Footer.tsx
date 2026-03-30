// components/layout/Footer.tsx — Footer with nav columns

import Link from 'next/link'

const VISAS = [
  { slug: 'h-1b', name: 'H-1B Visa' },
  { slug: 'eb-5', name: 'EB-5 Investor Visa' },
  { slug: 'e-2', name: 'E-2 Investor Visa' },
  { slug: 'o-1', name: 'O-1 Extraordinary Ability Visa' },
  { slug: 'l-1', name: 'L-1 Intracompany Transfer Visa' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="max-w-content mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gold-400 rounded flex items-center justify-center">
                <span className="text-navy font-bold text-sm">WIL</span>
              </div>
              <span className="font-display font-bold text-lg">
                Watson Immigration Law
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Expert immigration counsel for entrepreneurs, investors, and businesses.
              Seattle-based, serving clients worldwide.
            </p>
            <div className="space-y-2 text-sm">
              <p>1700 7th Avenue, Suite 2100</p>
              <p>Seattle, WA 98101</p>
              <p>
                <a href="tel:+12062925237" className="text-gold-400 hover:underline">
                  (206) 292-5237
                </a>
              </p>
              <p>
                <a href="mailto:info@watsonimmigrationlaw.com" className="text-gold-400 hover:underline">
                  info@watsonimmigrationlaw.com
                </a>
              </p>
            </div>
          </div>

          {/* Visas */}
          <div>
            <h3 className="font-semibold text-white mb-4">Practice Areas</h3>
            <ul className="space-y-2">
              {VISAS.map((visa) => (
                <li key={visa.slug}>
                  <Link
                    href={`/visas/${visa.slug}`}
                    className="text-white/70 hover:text-gold-400 transition-colors text-sm"
                  >
                    {visa.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Team & Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/team" className="text-white/70 hover:text-gold-400 transition-colors text-sm">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-white/70 hover:text-gold-400 transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-white/70 hover:text-gold-400 transition-colors text-sm">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/media" className="text-white/70 hover:text-gold-400 transition-colors text-sm">
                  Media
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/podcast" className="text-white/70 hover:text-gold-400 transition-colors text-sm">
                  Podcast
                </Link>
              </li>
              <li>
                <Link href="/books" className="text-white/70 hover:text-gold-400 transition-colors text-sm">
                  Books
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-white/70 hover:text-gold-400 transition-colors text-sm">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-gold-400 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a
              href="https://www.linkedin.com/company/watson-immigration-law"
              className="text-white/70 hover:text-gold-400 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com/tahminawatson"
              className="text-white/70 hover:text-gold-400 transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          </div>
          <div className="text-white/50 text-sm">
            © {new Date().getFullYear()} Watson Immigration Law. All rights reserved.
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 mt-8 pt-8">
          <p className="text-white/50 text-xs leading-relaxed">
            *Attorney Advertising. Prior results do not guarantee a similar outcome.
            This website is for informational purposes only and does not constitute legal advice.
            Contact us for a consultation.
          </p>
        </div>
      </div>
    </footer>
  )
}