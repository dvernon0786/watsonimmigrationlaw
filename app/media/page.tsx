import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import Breadcrumbs from '@/components/layout/Breadcrumbs'
import LeadCapture from '@/components/sections/LeadCapture'
import { buildBreadcrumbSchema } from '@/lib/schemas'

export const metadata: Metadata = {
  title: 'In the Media | Watson Immigration Law',
  description: 'Tahmina Watson has been featured in The New York Times, Forbes, Bloomberg, The Guardian, CNN, NPR, The Washington Post, and many other national and international publications.',
  alternates: { canonical: 'https://watsonimmigrationlaw.com/media' },
}

const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'In the Media', path: '/media' }]

const PRESS = [
  { publication: 'The New York Times', headline: 'Thousands of Tech Workers Could Lose Visas Under the New Law', url: 'https://www.nytimes.com/2022/12/09/us/tech-immigrant-workers-visas.html', date: 'December 2022', type: 'article', logo: '/media-logos/nyt.png' },
  { publication: 'Forbes', headline: "Tahmina Watson's 7 Travel Tips for U.S.-Based Immigrant Entrepreneurs", url: 'https://www.forbes.com/sites/ninaroberts/2017/04/11/tahmina-watsons-7-travel-tips-for-u-s-based-immigrant-entrepreneurs-from-muslim-majority-countries/', date: 'April 2017', type: 'article', logo: '/media-logos/forbes.png' },
  { publication: 'Bloomberg Law', headline: 'Immigration Attorneys on Their Toes in the Age of Trump', url: 'https://news.bloomberglaw.com/business-and-practice/immigration-attorneys-on-their-toes-in-the-age-of-trump', date: '2017', type: 'article', logo: '/media-logos/bloomberg.png' },
  { publication: 'The Guardian', headline: 'Guest Workers in the US Tech Industry Slowdown', url: 'https://www.theguardian.com/us-news/2022/dec/22/guest-workers-us-tech-industry-slowdown', date: 'December 2022', type: 'article', logo: '/media-logos/guardian.png' },
  { publication: 'CNN Money', headline: 'Immigration Reform Walk-Up', url: 'https://money.cnn.com/2014/11/20/smallbusiness/immigration-reform-walkup/index.html', date: 'November 2014', type: 'article', logo: '/media-logos/cnn.png' },
  { publication: 'NPR', headline: 'Featured Immigration Expert', url: 'https://www.npr.org/transcripts/1019423852', date: '2021', type: 'radio', logo: '/media-logos/npr.png' },
  { publication: 'The Washington Post', headline: "Travelers Caught Up in Muslim Ban — There's an App for That", url: 'https://www.washingtonpost.com/local/virginia-politics/travelers-caught-up-in-muslim-ban-who-need-help-theres-an-app-for-that/2017/02/07/714bf926-ed52-11e6-9662-6eedf1627882_story.html', date: 'February 2017', type: 'article', logo: '/media-logos/washington-post.png' },
  { publication: 'Business Insider', headline: 'Immigration Attorneys Helping Startups and Founders Secure Work Visas', url: 'https://www.businessinsider.com/immigration-attorneys-lawyers-helping-startups-founders-entrepreneurs-secure-work-visas-2021-8', date: 'August 2021', type: 'article', logo: '/media-logos/business-insider.png' },
  { publication: 'Entrepreneur Magazine', headline: '3 Ways to Be a Better Advocate for a Startup Visa', url: 'https://www.entrepreneur.com/leadership/3-ways-to-be-a-better-advocate-for-a-startup-visa/380177', date: '2021', type: 'article', logo: '/media-logos/entrepreneur.png' },
  { publication: 'Puget Sound Business Journal', headline: 'Women of Influence: Tahmina Watson', url: 'https://www.bizjournals.com/seattle/news/2020/11/13/woi-tahmina-watson.html', date: 'November 2020', type: 'article', logo: '/media-logos/psbj.png' },
  { publication: 'The Seattle Times', headline: "This July Fourth, Reflect on Immigrants' Contributions", url: 'https://www.seattletimes.com/opinion/this-july-fourth-reflect-on-immigrants-contributions-and-urge-reform/', date: 'July 2021', type: 'article', logo: '/media-logos/seattle-times.png' },
  { publication: 'Above the Law', headline: 'The H-1B Visa Program Needs Thoughtful and Urgent Reform', url: 'https://abovethelaw.com/2023/06/the-h-1b-visa-program-needs-thoughtful-and-urgent-reform/', date: 'June 2023', type: 'article', logo: '/media-logos/above-the-law.png' },
  { publication: 'Yahoo News', headline: 'Visa Holders Explore Options Amid Uncertainty', url: 'https://news.yahoo.com/visa-holders-explore-options-amid-165703727.html', date: '2022', type: 'article', logo: '/media-logos/yahoo.png' },
]

export default function MediaPage() {
  const articles = PRESS.filter(p => p.type === 'article')
  const radio = PRESS.filter(p => p.type === 'radio')

  return (
    <>
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />
      <Breadcrumbs items={breadcrumbs} />

      <section className="py-section bg-navy text-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-gold-400 text-xs font-semibold uppercase tracking-widest mb-4">Press & Media</p>
            <h1 className="font-display text-display-lg text-white mb-6 leading-tight">Tahmina Watson in the media</h1>
            <p className="text-white/80 leading-relaxed">Tahmina Watson is a nationally recognized voice on U.S. immigration law, regularly quoted in major national publications and featured on radio and podcast programs.</p>
          </div>
        </div>
      </section>

      <section className="py-section bg-cream">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-10">

              {/* Publication logo bar */}
              <div className="bg-white border border-border rounded-xl2 p-6">
                <p className="text-xs font-semibold text-charcoal/50 uppercase tracking-widest mb-5 text-center">Featured in</p>
                <div className="flex flex-wrap justify-center items-center gap-6">
                  {['New York Times', 'Forbes', 'Bloomberg', 'The Guardian', 'CNN', 'NPR', 'Washington Post', 'Business Insider'].map(pub => (
                    <span key={pub} className="text-charcoal/40 font-display font-bold text-sm">{pub}</span>
                  ))}
                </div>
              </div>

              {/* Articles */}
              <div>
                <h2 className="font-display text-display-sm text-navy mb-5">Articles & Publications</h2>
                <div className="space-y-3">
                  {articles.map((item, i) => (
                    <a
                      key={i}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block bg-white border border-border rounded-xl2 p-4 shadow-card hover:shadow-card-hover transition-all"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <p className="text-xs font-semibold text-gold-400 mb-1">{item.publication} · {item.date}</p>
                          <h3 className="text-sm font-semibold text-navy group-hover:text-gold-400 transition-colors leading-snug">{item.headline}</h3>
                        </div>
                        <svg className="w-4 h-4 text-charcoal/30 group-hover:text-gold-400 flex-shrink-0 mt-0.5 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Radio & Podcasts */}
              {radio.length > 0 && (
                <div>
                  <h2 className="font-display text-display-sm text-navy mb-5">Radio & Broadcast</h2>
                  <div className="space-y-3">
                    {radio.map((item, i) => (
                      <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="group block bg-white border border-border rounded-xl2 p-4 shadow-card hover:shadow-card-hover transition-all">
                        <p className="text-xs font-semibold text-gold-400 mb-1">{item.publication} · {item.date}</p>
                        <h3 className="text-sm font-semibold text-navy group-hover:text-gold-400 transition-colors">{item.headline}</h3>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Press contact */}
              <div className="bg-white border border-border rounded-xl2 p-6">
                <h2 className="font-semibold text-navy mb-2">Press inquiries</h2>
                <p className="text-sm text-charcoal/70 leading-relaxed mb-3">For media inquiries, interview requests, or expert commentary on U.S. immigration law, please contact us directly.</p>
                <a href="mailto:info@watsonimmigrationlaw.com?subject=Press Inquiry" className="inline-flex items-center gap-2 text-gold-400 font-semibold text-sm hover:text-gold-500">
                  info@watsonimmigrationlaw.com →
                </a>
              </div>
            </div>

            <aside>
              <LeadCapture />
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
