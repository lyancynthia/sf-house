import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SF Affordable Short Term Rentals | San Francisco Hotel Sublease',
  description:
    'Fully furnished private rooms in San Francisco hotel just 4 min walk from Powell BART. Monthly sublease starting at $1,350/mo. Minimum 1 month stay.',
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
  ],
  openGraph: {
    title: 'SF Affordable Short Term Rentals | San Francisco Hotel Sublease',
    description: 'Private rooms in SF hotel. 4 min walk to Powell BART. Starting at $1,350/mo.',
    url: 'https://sf-affordable-rentals.vercel.app',
    siteName: 'SF Affordable Short Term Rentals',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SF Affordable Short Term Rentals | San Francisco Hotel Sublease',
    description: 'Private rooms in SF hotel. 4 min walk to Powell BART. Starting at $1,350/mo.',
  },
  robots: { index: true, follow: true },
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