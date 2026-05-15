'use client'

import { useState } from 'react'

interface CategoryFilterProps {
  categories: { id: string; label: string; count?: number }[]
  onFilter: (category: string) => void
  activeCategory?: string
}

export default function CategoryFilter({ categories, onFilter, activeCategory = 'all' }: CategoryFilterProps) {
  const [active, setActive] = useState(activeCategory)

  const handleClick = (id: string) => {
    setActive(id)
    onFilter(id)
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <button
        onClick={() => handleClick('all')}
        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
          active === 'all'
            ? 'bg-navy text-white'
            : 'bg-white border border-border text-charcoal/70 hover:border-navy hover:text-navy'
        }`}
      >
        All Posts
      </button>
      {categories.map(cat => (
        <button
          key={cat.id}
          onClick={() => handleClick(cat.id)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
            active === cat.id
              ? 'bg-navy text-white'
              : 'bg-white border border-border text-charcoal/70 hover:border-navy hover:text-navy'
          }`}
        >
          {cat.label}
          {cat.count !== undefined && (
            <span className="ml-1.5 text-xs opacity-60">({cat.count})</span>
          )}
        </button>
      ))}
    </div>
  )
}
