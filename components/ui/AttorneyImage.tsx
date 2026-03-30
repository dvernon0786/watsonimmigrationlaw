'use client'

import SafeImage from '@/components/ui/SafeImage'

interface AttorneyImageProps {
  src: string
  alt: string
  className?: string
}

export default function AttorneyImage({ src, alt, className }: AttorneyImageProps) {
  return (
    <SafeImage
      src={src}
      alt={alt}
      className={className}
      fallbackSrc="/team/default.jpg"
    />
  )
}