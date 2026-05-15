import type { Metadata } from 'next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Legal Disclaimer | Watson Immigration Law',
  description: 'Legal disclaimer and attorney advertising notice for watsonimmigrationlaw.com.',
  robots: { index: false },
}

const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Disclaimer', path: '/disclaimer' }]

export default function DisclaimerPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-3xl prose prose-headings:font-display prose-headings:text-navy prose-p:text-charcoal/80">
            <h1>Legal Disclaimer</h1>

            <h2>Attorney advertising</h2>
            <p>This website is an advertisement for legal services. The information provided on this website is for general informational purposes only and does not constitute legal advice. The information may not reflect current legal developments, verdicts, or settlements.</p>

            <h2>No attorney-client relationship</h2>
            <p>Visiting this website, submitting a contact form, or communicating with Watson Immigration Law through this website does not establish an attorney-client relationship. An attorney-client relationship is only formed through a signed engagement agreement.</p>

            <h2>No guarantee of results</h2>
            <p>Every immigration case is unique. Prior results described on this website do not guarantee or predict a similar outcome in any future matter. The outcome of any particular legal matter depends on the specific facts and applicable law.</p>

            <h2>Jurisdictional limits</h2>
            <p>Watson Immigration Law is licensed to practice in Washington State. Immigration law is federal law, and we handle immigration matters for clients in all U.S. states and internationally. However, we do not provide advice on state-specific matters outside Washington.</p>

            <h2>Accuracy of information</h2>
            <p>We make reasonable efforts to keep the information on this website current and accurate. However, immigration law changes frequently and the information on this website may not reflect the most recent legal developments. Always consult with a licensed immigration attorney before making any immigration decisions.</p>

            <h2>Third-party links</h2>
            <p>This website may link to third-party websites. We are not responsible for the accuracy or content of any linked site.</p>

            <h2>Contact</h2>
            <p>Watson Immigration Law<br />
            1700 7th Avenue, Suite 2100<br />
            Seattle, WA 98101<br />
            (206) 292-5237<br />
            info@watsonimmigrationlaw.com</p>
          </div>
        </div>
      </section>
    </>
  )
}
