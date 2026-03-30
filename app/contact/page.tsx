import type { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import LeadCapture from '@/components/sections/LeadCapture';
import MediaLogos from '@/components/sections/MediaLogos';
import { buildLegalServiceSchema, buildBreadcrumbSchema } from '@/lib/schemas';

export const metadata: Metadata = {
  title: 'Contact Watson Immigration Law | Schedule Free Consultation',
  description: 'Contact Watson Immigration Law for expert immigration legal services. Schedule your free consultation today. Serving clients nationwide with offices in Seattle.',
  keywords: 'contact immigration attorney, free consultation, immigration lawyer Seattle, Watson Immigration Law',
};

export default function ContactPage() {
  const breadcrumbs = [
    { name: 'Home', path: '/' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <JsonLd schema={buildLegalServiceSchema()} />
      <JsonLd schema={buildBreadcrumbSchema(breadcrumbs)} />

      <Breadcrumbs items={breadcrumbs} />

      {/* Hero Section */}
      <section className="py-section bg-navy-gradient text-white">
        <div className="max-w-content mx-auto px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-display text-display-xl text-white mb-6 leading-tight">
              Contact Our Immigration Attorneys
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-2xl mx-auto">
              Ready to start your immigration journey? Schedule a free consultation with our experienced team.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="font-display text-display-md text-navy mb-8">
                Get In Touch
              </h2>

              <div className="space-y-8">
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-navy" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">Phone</h3>
                    <p className="text-charcoal/70 mb-2">Call us during business hours</p>
                    <a
                      href="tel:+12062925237"
                      className="text-gold-400 font-semibold hover:text-gold-500 transition-colors"
                    >
                      (206) 292-5237
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-navy" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">Email</h3>
                    <p className="text-charcoal/70 mb-2">Send us a message anytime</p>
                    <a
                      href="mailto:info@watsonimmigrationlaw.com"
                      className="text-gold-400 font-semibold hover:text-gold-500 transition-colors"
                    >
                      info@watsonimmigrationlaw.com
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-navy" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">Office</h3>
                    <p className="text-charcoal/70 mb-2">Visit our Seattle office</p>
                    <address className="text-charcoal/80 not-italic">
                      1234 Immigration Way<br />
                      Suite 500<br />
                      Seattle, WA 98101
                    </address>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gold-400 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-navy" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">Business Hours</h3>
                    <p className="text-charcoal/70 mb-2">When we're available to help</p>
                    <div className="text-charcoal/80">
                      <p>Monday - Friday: 9:00 AM - 5:00 PM PST</p>
                      <p>Emergency consultations available</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <LeadCapture />
            </div>
          </div>
        </div>
      </section>

      <MediaLogos />
    </>
  );
}