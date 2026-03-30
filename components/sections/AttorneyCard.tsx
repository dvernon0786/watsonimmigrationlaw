'use client'

// components/sections/AttorneyCard.tsx — Sidebar mini-bio

import Link from 'next/link'

interface AttorneyCardProps {
  name: string
  title: string
  image: string
  slug: string
  credentials: string[]
}

export default function AttorneyCard({ name, title, image, slug, credentials }: AttorneyCardProps) {
  return (
    <div className="bg-white rounded-xl2 border border-gray-100 shadow-card p-6">
      <div className="flex gap-4">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'data:image/svg+xml,...'
          }}
        />
        <div className="flex-1 min-w-0">
          <Link
            href={`/team/${slug}`}
            className="font-semibold text-navy hover:text-gold-400 transition-colors"
          >
            {name}
          </Link>
          <p className="text-sm text-charcoal/60 mb-2">{title}</p>
          <ul className="space-y-1">
            {credentials.slice(0, 2).map((cred, i) => (
              <li key={i} className="text-xs text-charcoal/70 flex items-center gap-1">
                <span className="text-gold-400">•</span>
                {cred}
              </li>
            ))}
          </ul>
          <Link
            href={`/team/${slug}`}
            className="inline-block mt-3 text-sm text-gold-400 hover:text-gold-500 font-medium"
          >
            Read full bio →
          </Link>
        </div>
      </div>
    </div>
  )
}