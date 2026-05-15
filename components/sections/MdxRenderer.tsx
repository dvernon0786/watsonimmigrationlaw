import { MDXRemote } from 'next-mdx-remote/rsc'

interface MdxRendererProps {
  source: string
}

export default function MdxRenderer({ source }: MdxRendererProps) {
  return (
    <div className="prose prose-lg max-w-none
      prose-headings:font-display prose-headings:text-navy
      prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
      prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
      prose-p:text-charcoal/80 prose-p:leading-relaxed
      prose-a:text-gold-400 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-navy
      prose-ul:text-charcoal/80 prose-ol:text-charcoal/80
      prose-li:leading-relaxed
      prose-blockquote:border-gold-400 prose-blockquote:text-charcoal/70
      prose-code:text-navy prose-code:bg-cream prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
      prose-pre:bg-navy prose-pre:text-white
      prose-img:rounded-xl2 prose-img:shadow-card
    ">
      <MDXRemote source={source} />
    </div>
  )
}
