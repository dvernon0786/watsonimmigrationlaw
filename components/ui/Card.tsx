// components/ui/Card.tsx — White card with shadow

import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-xl2 border border-border shadow-card hover:shadow-card-hover transition-shadow ${className}`}>
      {children}
    </div>
  )
}