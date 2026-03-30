// components/layout/Header.tsx — Sticky nav with dropdowns

'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const VISAS = [
  { slug: 'h-1b', name: 'H-1B Visa' },
  { slug: 'eb-5', name: 'EB-5 Investor Visa' },
  { slug: 'e-2', name: 'E-2 Investor Visa' },
  { slug: 'o-1', name: 'O-1 Extraordinary Ability Visa' },
  { slug: 'l-1', name: 'L-1 Intracompany Transfer Visa' },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isVisaDropdownOpen, setIsVisaDropdownOpen] = useState(false)
  const pathname = usePathname()
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>()

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-navy rounded flex items-center justify-center">
              <span className="text-gold-400 font-bold text-sm">WIL</span>
            </div>
            <span className="font-display font-bold text-navy text-lg">
              Watson Immigration Law
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {/* Visas Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => {
                if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current)
                setIsVisaDropdownOpen(true)
              }}
              onMouseLeave={() => {
                dropdownTimeoutRef.current = setTimeout(() => setIsVisaDropdownOpen(false), 150)
              }}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-navy transition-colors font-medium">
                <span>Visas</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isVisaDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-10">
                  {VISAS.map((visa) => (
                    <Link
                      key={visa.slug}
                      href={`/visas/${visa.slug}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-navy"
                    >
                      {visa.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/team"
              className={`font-medium transition-colors ${
                pathname.startsWith('/team') ? 'text-navy' : 'text-gray-700 hover:text-navy'
              }`}
            >
              Team
            </Link>

            <Link
              href="/blog"
              className={`font-medium transition-colors ${
                pathname.startsWith('/blog') ? 'text-navy' : 'text-gray-700 hover:text-navy'
              }`}
            >
              Blog
            </Link>

            <Link
              href="/contact"
              className={`font-medium transition-colors ${
                pathname === '/contact' ? 'text-navy' : 'text-gray-700 hover:text-navy'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="tel:+12062925237"
              className="inline-flex items-center px-4 py-2 bg-gold-400 text-navy font-semibold rounded-lg hover:bg-gold-500 transition-colors"
            >
              (206) 292-5237
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-100 py-4">
            <nav className="space-y-4">
              <div>
                <div className="font-medium text-gray-900 mb-2">Visas</div>
                <div className="pl-4 space-y-2">
                  {VISAS.map((visa) => (
                    <Link
                      key={visa.slug}
                      href={`/visas/${visa.slug}`}
                      className="block text-sm text-gray-700 hover:text-navy"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {visa.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/team"
                className="block font-medium text-gray-700 hover:text-navy"
                onClick={() => setIsMenuOpen(false)}
              >
                Team
              </Link>

              <Link
                href="/blog"
                className="block font-medium text-gray-700 hover:text-navy"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>

              <Link
                href="/contact"
                className="block font-medium text-gray-700 hover:text-navy"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>

              <a
                href="tel:+12062925237"
                className="inline-block mt-4 px-4 py-2 bg-gold-400 text-navy font-semibold rounded-lg"
              >
                (206) 292-5237
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}