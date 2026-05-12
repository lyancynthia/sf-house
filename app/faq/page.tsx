import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'FAQ | SF Affordable Short Term Rentals',
  description:
    'Frequently asked questions about renting a private room in San Francisco. Covers pricing ($1,350-$1,850/mo), deposits, move-in process, amenities, payment methods, and cancellation policy.',
  keywords: [
    'sf monthly rental faq',
    'san francisco short term housing questions',
    'hotel sublease san francisco',
    'sf affordable housing requirements',
    'monthly hotel room san francisco',
    'short term rental sf deposit',
    'san francisco temp housing faq',
    'sf new grad housing',
    'sf housing questions answers',
    'san francisco monthly sublet faq',
    'hotel room sf questions',
    'powell bart housing faq',
  ],
  openGraph: {
    title: 'FAQ | SF Affordable Short Term Rentals',
    description: 'Common questions about renting a private hotel room in SF, answered. Pricing, deposits, amenities.',
    url: 'https://sf-affordable-rentals.vercel.app/faq',
    type: 'website',
        images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'FAQ - SF Affordable Short Term Rentals',
      },
    ],
  },
};

const faqs = [
  {
    q: 'What is the minimum stay?',
    a: 'Minimum stay is 1 month. We do not offer stays shorter than one month. Move-in dates are flexible.',
  },
  {
    q: 'What is included in the monthly rent?',
    a: 'All utilities (high-speed WiFi, electricity, water) are included. Each room comes fully furnished with a bed, desk/chair, and closet. Shared amenities include a kitchen, laundry facilities, and a large lobby for work or meetings.',
  },
  {
    q: 'How much is the deposit? Is it refundable?',
    a: 'The security deposit equals one month\'s rent ($1,350 for shared bathroom, $1,850 for private bathroom). The deposit is fully refundable on move-out, provided there is no damage beyond normal wear and the agreed move-out date is met.',
  },
  {
    q: 'How do I pay rent and deposit?',
    a: 'We accept Zelle (preferred — 4152839228, Yan Luo) and PayPal (cynthiayluo11@gmail.com, Yan Luo). PayPal processing fees are the sender\'s responsibility. All payments must cover the exact amounts listed on your lease.',
  },
  {
    q: 'Can two people share one room?',
    a: 'Yes, but the price increases due to insurance requirements. For shared bathroom rooms: $1,650/mo for 2 guests. For private bathroom rooms: $2,350/mo for 2 guests. Contact us before booking if you plan to share.',
  },
  {
    q: 'Where is the property located?',
    a: 'We operate three affiliated hotels in the Tenderloin/Union Square area of San Francisco, all within a 1-2 minute walk of each other. The nearest BART station is Powell Street — about a 4-minute walk. You will receive your specific hotel address after booking confirmation.',
  },
  {
    q: 'What documents do I need to check in?',
    a: 'Bring a valid government-issued photo ID. You will sign your lease in person at the hotel front desk (Hotel Stratford, which serves all affiliated properties). Check-in is available after 3:00 PM on your lease start date.',
  },
  {
    q: 'Can I renew or extend my stay?',
    a: 'Yes. To renew, you must give at least 30 days written notice before your lease end date. Extensions are subject to room availability. Contact Cynthia directly via text or email to discuss renewal.',
  },
  {
    q: 'What are the house rules?',
    a: 'Key rules include: no smoking inside, quiet hours after 10 PM, keep the room clean, lock doors when leaving, no illegal activities on the network, and overnight guests require prior notice (max 3 nights per visit). A full list is included in your lease agreement.',
  },
  {
    q: 'What happens if I need to leave early?',
    a: 'Early termination is possible with at least 30 days written notice. Your deposit will be returned after deductions for any applicable charges (damage, unpaid bills, cleaning if needed). Contact Cynthia to initiate an early termination.',
  },
  {
    q: 'Is there a price increase coming?',
    a: 'Yes. Starting May 7, 2026, or for move-ins after June 1, 2026, all room prices increase by $200/room/month. New shared bathroom: $1,550/mo. New private bathroom: $2,050/mo. Book now to lock in current rates.',
  },
  {
    q: 'How do I contact the property manager?',
    a: 'The fastest way is iMessage or text: +1 (415) 283-9224 (Cynthia). You can also email cynthiayluo11@gmail.com. For front desk services (check-in questions, general building issues), visit Hotel Stratford.',
  },
  {
    q: 'What is the difference between shared bathroom and private bathroom rooms?',
    a: 'Shared bathroom rooms: 6 rooms share 2 bathrooms on the floor, cleaned multiple times daily. Private bathroom rooms: en-suite bathroom in your room. Both room types are fully furnished with the same amenities. Private bathroom rooms cost $500 more per month.',
  },
  {
    q: 'Are the rooms suitable for remote workers or students?',
    a: 'Absolutely. Rooms come with a desk and chair. The building has a large lobby, shared kitchen, and reliable high-speed WiFi — ideal for remote work or online classes. Many of our guests are new grads, startup employees, and digital nomads.',
  },
];

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  const localBusinessLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'SF Affordable Short Term Rentals',
    description:
      'Fully furnished private rooms in San Francisco hotels, available for monthly sublease. Starting at $1,350/mo near Powell BART.',
    url: 'https://sf-affordable-rentals.vercel.app',
    telephone: '+1-415-283-9224',
    email: 'cynthiayluo11@gmail.com',
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
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '21:00',
    },
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://sf-affordable-rentals.vercel.app',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'FAQ',
        item: 'https://sf-affordable-rentals.vercel.app/faq',
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border">
          <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-heading font-bold text-primary">
              SF Affordable Short Term Rentals
            </Link>
            <div className="flex items-center gap-6">
              <a href="/#rooms" className="text-sm text-muted-foreground hover:text-foreground">
                Rooms
              </a>
              <a href="/#how-it-works" className="text-sm text-muted-foreground hover:text-foreground">
                How It Works
              </a>
              <Link href="/faq" className="text-sm font-medium text-primary">
                FAQ
              </Link>
              <a href="/#contact" className="text-sm bg-primary text-white px-4 py-2 rounded-full">
                Book Now
              </a>
            </div>
          </nav>
        </header>

        {/* FAQ Content */}
        <main className="max-w-4xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need to know about renting a private room in San Francisco.
              Can&apos;t find your answer?{' '}
              <a href="mailto:cynthiayluo11@gmail.com" className="text-primary underline">
                Email us
              </a>{' '}
              or{' '}
              <a href="tel:+14152839224" className="text-primary underline">
                text Cynthia
              </a>
              .
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
              >
                <h2 className="text-lg font-semibold text-foreground mb-3 flex items-start gap-2">
                  <span className="text-primary mt-1 flex-shrink-0">Q.</span>
                  {faq.q}
                </h2>
                <p className="text-muted-foreground leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 bg-primary/5 border border-primary/20 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-heading font-bold text-foreground mb-3">
              Ready to book?
            </h3>
            <p className="text-muted-foreground mb-6">
              Fill out the booking form and we&apos;ll get back to you within 24 hours.
            </p>
            <a
              href="/#contact"
              className="inline-block bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
            >
              Start Booking
            </a>
          </div>
        </main>
      </div>
    </>
  );
}
