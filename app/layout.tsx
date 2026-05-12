import type { Metadata } from 'next';
import './globals.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'SF Affordable Short Term Rentals | San Francisco Hotel Sublease',
    template: '%s | SF Affordable Short Term Rentals',
  },
  description:
    'Fully furnished private rooms in San Francisco hotel just 4 min walk from Powell BART. Monthly sublease starting at $1,350/mo. Minimum 1 month stay. WiFi, kitchen, laundry included.',
  keywords: [
    'affordable sf housing',
    'short term rental san francisco',
    'monthly rental sf',
    'hotel room sublease san francisco',
    'sf affordable rent',
    'sf short term apartment',
    'san francisco temp housing',
    'budget sf housing',
    'sf monthly sublease',
    'short stay san francisco',
    'affordable short term rent sf',
    'private room san francisco hotel',
    'new grad housing sf',
    'sf monthly hotel',
    'san francisco cheap housing',
    'short term lease san francisco',
    'sf furnished room monthly',
    'hotel sublet san francisco',
    'powell bart housing sf',
    'union square sf monthly rental',
    'san francisco furnished room',
    'sf monthly hotel room',
    'soma san francisco monthly',
    'sf starter housing',
    'new job housing san francisco',
    'remote worker housing sf',
    'digital nomad san francisco',
    'sf bridge housing',
    'monthly sublet san francisco',
    'sf temporary housing',
    'hotel to apartment sf',
    'san francisco extended stay',
    'sf mid-term rental',
    'affordable housing near union square sf',
    'sf monthly accommodation',
  ],
  authors: [{ name: 'Cynthia Luo', url: 'https://sf-affordable-rentals.vercel.app' }],
  creator: 'Cynthia Luo',
  publisher: 'SF Affordable Short Term Rentals',
  openGraph: {
    title: 'SF Affordable Short Term Rentals | San Francisco Hotel Sublease',
    description: 'Private rooms in SF hotel. 4 min walk to Powell BART. Starting at $1,350/mo. Fully furnished, WiFi, kitchen, laundry.',
    url: 'https://sf-affordable-rentals.vercel.app',
    siteName: 'SF Affordable Short Term Rentals',
    locale: 'en_US',
    type: 'website',
        images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'SF Affordable Short Term Rentals - Private hotel rooms near Powell BART',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SF Affordable Short Term Rentals | San Francisco Hotel Sublease',
    description: 'Private rooms in SF hotel. 4 min walk to Powell BART. Starting at $1,350/mo.',
    images: ['/og-image.svg'],
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
  alternates: {
    canonical: 'https://sf-affordable-rentals.vercel.app',
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
        <meta name="google-site-verification" content="KWNiD6wrTGYVi0Rc7VGrg8ZKQpt_LjuXSdwl-mqC_yk" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LodgingBusiness',
              '@id': 'https://sf-affordable-rentals.vercel.app/#lodging',
              name: 'SF Affordable Short Term Rentals',
              description:
                'Fully furnished private rooms in San Francisco hotels for monthly sublease. Starting at $1,350/mo, just 4 min walk to Powell BART.',
              url: 'https://sf-affordable-rentals.vercel.app',
              telephone: '+1-415-283-9224',
              email: 'cynthiayluo11@gmail.com',
              image: 'https://sf-affordable-rentals.vercel.app/og-image.png',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'San Francisco',
                addressRegion: 'CA',
                postalCode: '94105',
                addressCountry: 'US',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 37.7855,
                longitude: -122.4085,
              },
              priceRange: '$1,350 - $1,850',
              amenityFeature: [
                { '@type': 'LocationFeatureSpecification', name: 'High-speed WiFi', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Shared Kitchen', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Laundry', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Lobby', value: true },
                { '@type': 'LocationFeatureSpecification', name: 'Near Powell BART', value: true },
              ],
              starRating: { '@type': 'Rating', ratingValue: '3', bestRating: '5' },
              sameAs: ['https://www.linkedin.com/in/cynthia-y-luo/'],
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                opens: '09:00',
                closes: '21:00',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Monthly Room Rentals',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: { '@type': 'HotelRoom', name: 'Shared Bathroom Room' },
                    price: '1350',
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock',
                    url: 'https://sf-affordable-rentals.vercel.app/#rooms',
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: { '@type': 'HotelRoom', name: 'Private Bathroom Room' },
                    price: '1850',
                    priceCurrency: 'USD',
                    availability: 'https://schema.org/InStock',
                    url: 'https://sf-affordable-rentals.vercel.app/#rooms',
                  },
                ],
              },
            }),
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2QF9JCF23H"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2QF9JCF23H');`,
          }}
        />
      </body>
    </html>
  );
}