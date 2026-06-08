import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: {
    default: 'FreelanceFeeCalc - Global Freelancer & Creator Profit Calculator',
    template: '%s | FreelanceFeeCalc',
  },
  description: 'Calculate your exact take-home profit after platform fees, payment processing, and taxes for 20+ platforms across 10 countries. Free tool for freelancers and creators.',
  keywords: [
    'freelancer calculator', 'platform fee calculator', 'creator earnings', 
    'freelance taxes', 'Upwork fees', 'Fiverr fees', 'YouTube revenue calculator',
    'freelance profit', 'self-employed tax calculator', 'gig economy earnings',
    'freelancefeecalc', 'freelance fee calc', 'freelancefeecalc.site'
  ],
  authors: [{ name: 'FreelanceFeeCalc' }],
  creator: 'FreelanceFeeCalc',
  metadataBase: new URL('https://www.freelancefeecalc.site'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.freelancefeecalc.site',
    siteName: 'FreelanceFeeCalc',
    title: 'FreelanceFeeCalc - Global Freelancer & Creator Profit Calculator',
    description: 'Calculate exact take-home profit after fees and taxes. 20+ platforms, 10 countries.',
    images: [
      {
        url: 'https://www.freelancefeecalc.site/og-image.png',
        width: 1200,
        height: 630,
        alt: 'FreelanceFeeCalc - Freelancer Profit Calculator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@freelancefeecalc',
    creator: '@freelancefeecalc',
    title: 'FreelanceFeeCalc - Freelancer Profit Calculator',
    description: 'Know exactly what you keep after fees and taxes.',
    images: ['https://www.freelancefeecalc.site/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://www.freelancefeecalc.site',
    languages: {
      'en-US': 'https://www.freelancefeecalc.site',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    shortcut: ['/favicon.svg'],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: 'https://www.freelancefeecalc.site/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'FreelanceFeeCalc',
    startupImage: [
      {
        url: 'https://www.freelancefeecalc.site/apple-touch-icon.png',
      },
    ],
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
  },
  category: 'finance',
};

export const viewport = {
  themeColor: '#3b82f6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-C74SD1HM60"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C74SD1HM60');
          `}
        </Script>
      </head>
      <body className={`${inter.className} min-h-screen relative`}>
        <div className="gradient-bg" aria-hidden="true" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}