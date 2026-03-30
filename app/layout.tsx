import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import JsonLd from '@/components/seo/JsonLd';
import { buildLegalServiceSchema } from '@/lib/schemas';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Watson Immigration Law | Seattle Immigration Attorneys',
  description: 'Expert immigration attorneys in Seattle specializing in H-1B, EB-5, E-2, O-1, and L-1 visas. Trusted legal counsel for businesses and individuals navigating U.S. immigration law.',
  keywords: 'immigration attorney, H-1B visa, EB-5 investor visa, E-2 treaty visa, O-1 extraordinary ability, L-1 intracompany transfer, Seattle immigration law',
  authors: [{ name: 'Watson Immigration Law' }],
  creator: 'Watson Immigration Law',
  publisher: 'Watson Immigration Law',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://watsonimmigrationlaw.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Watson Immigration Law | Seattle Immigration Attorneys',
    description: 'Expert immigration attorneys in Seattle specializing in work visas, investor visas, and business immigration. Get the legal help you need.',
    url: 'https://watsonimmigrationlaw.com',
    siteName: 'Watson Immigration Law',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Watson Immigration Law | Seattle Immigration Attorneys',
    description: 'Expert immigration attorneys in Seattle specializing in work visas, investor visas, and business immigration.',
    creator: '@watsonimmigration',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <JsonLd schema={buildLegalServiceSchema()} />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}