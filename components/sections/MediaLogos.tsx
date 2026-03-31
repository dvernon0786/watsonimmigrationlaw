// components/sections/MediaLogos.tsx — "As seen in" trust bar

export default function MediaLogos() {
  const publications = [
    'New York Times',
    'Forbes',
    'Bloomberg',
    'The Guardian',
    'NPR',
  ]

  return (
    <section className="py-8 bg-white border-b border-border">
      <div className="max-w-content mx-auto px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold text-charcoal/60 uppercase tracking-widest mb-6">
            As seen in
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {publications.map((pub) => (
              <div key={pub} className="text-charcoal/40 font-display font-bold text-lg">
                {pub}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}