import type { Metadata } from 'next'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Privacy Policy | Watson Immigration Law',
  description: 'Privacy policy for watsonimmigrationlaw.com — how we collect, use, and protect your information.',
  robots: { index: false },
}

const breadcrumbs = [{ name: 'Home', path: '/' }, { name: 'Privacy Policy', path: '/privacy-policy' }]

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <section className="py-section bg-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="max-w-3xl prose prose-headings:font-display prose-headings:text-navy prose-p:text-charcoal/80 prose-a:text-gold-400">
            <h1>Privacy Policy</h1>
            <p><strong>Last updated: January 1, 2025</strong></p>

            <p>Watson Immigration Law ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website watsonimmigrationlaw.com or contact us about our legal services.</p>

            <h2>Information we collect</h2>
            <p>We may collect information you voluntarily provide to us, including your name, email address, phone number, and details about your immigration situation when you submit a contact form, book a consultation, or subscribe to our newsletter.</p>
            <p>We also automatically collect certain information about your device and how you interact with our website, including IP address, browser type, and pages visited, through standard web analytics tools.</p>

            <h2>How we use your information</h2>
            <p>We use collected information to respond to your inquiries, provide legal services, send you relevant immigration updates and news (with your consent), improve our website, and comply with legal obligations.</p>

            <h2>Attorney-client privilege</h2>
            <p>Information you share in connection with a legal matter is protected by attorney-client privilege. We do not disclose confidential client information to third parties except as required by law or with your express consent.</p>

            <h2>Third-party services</h2>
            <p>Our website may use third-party services such as Google Analytics, Calendly (scheduling), and Resend (email). These services have their own privacy policies. We encourage you to review them.</p>

            <h2>Cookies</h2>
            <p>Our website uses cookies to improve your browsing experience. You may disable cookies through your browser settings, though some functionality may be affected.</p>

            <h2>Data retention</h2>
            <p>We retain information for as long as necessary to provide services, comply with legal obligations, and resolve disputes.</p>

            <h2>Your rights</h2>
            <p>Depending on your jurisdiction, you may have rights to access, correct, or delete your personal information. Contact us at privacy@watsonimmigrationlaw.com to exercise these rights.</p>

            <h2>Contact</h2>
            <p>For privacy-related questions, contact us at:<br />
            Watson Immigration Law<br />
            1700 7th Avenue, Suite 2100<br />
            Seattle, WA 98101<br />
            privacy@watsonimmigrationlaw.com</p>
          </div>
        </div>
      </section>
    </>
  )
}
