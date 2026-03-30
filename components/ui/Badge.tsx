// components/ui/Badge.tsx — Small pill tag

interface BadgeProps {
  variant?: 'navy' | 'gold' | 'gray'
  children: React.ReactNode
}

export default function Badge({ variant = 'navy', children }: BadgeProps) {
  const variantClasses = {
    navy: 'bg-navy text-white',
    gold: 'bg-gold-400 text-navy',
    gray: 'bg-gray-100 text-gray-800',
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}>
      {children}
    </span>
  )
}