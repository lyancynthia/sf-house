import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Cynthia',
  description:
    'Learn about Cynthia Luo, founder of SF Affordable Short Term Rentals. Former community housing manager helping newcomers and early-career professionals find affordable monthly housing in San Francisco.',
  keywords: [
    'cynthia luo san francisco housing',
    'sf affordable short term rentals founder',
    'hotel arbitrage san francisco',
    'sf monthly rental founder',
    'new grad housing sf',
    'community housing manager san francisco',
  ],
  openGraph: {
    title: 'About Cynthia | SF Affordable Short Term Rentals',
    description:
      'Founder of SF Affordable Short Term Rentals. Helping newcomers find affordable monthly housing in San Francisco.',
    url: 'https://sf-affordable-rentals.vercel.app/about',
    type: 'website',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'About - SF Affordable Short Term Rentals',
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-heading font-bold text-primary">
            SF Affordable Short Term Rentals
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
              FAQ
            </Link>
            <a
              href="/#contact"
              className="text-sm bg-primary text-white px-4 py-2 rounded-full"
            >
              Book Now
            </a>
          </div>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">About</span>
        </nav>

        <div className="space-y-8">
          {/* Intro */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-foreground">
              About the Founder
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hi, I&apos;m Cynthia Luo. I started this service to solve a problem I lived through firsthand.
            </p>
          </div>

          {/* Story */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10 space-y-5">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Why I Started This
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              When I first moved to San Francisco, I spent weeks fighting the city&apos;s housing market.
              As a newcomer — no local credit history, no rental references, competing against dozens of applicants
              for every listing — I quickly learned that finding an affordable place to live was one of the
              hardest parts of starting a new chapter here.
            </p>
            <p className="text-gray-700 leading-relaxed">
              I&apos;d previously managed housing initiatives for my own community, so I understood both the
              demand side (people needing flexible, affordable housing) and the supply side (hotels sitting
              empty on nightly inventory that could easily support monthly guests). I reached out directly to
              hotel operators in the city and negotiated group-rate monthly packages — rates that individual
              travelers never see because hotels don&apos;t typically market them.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Today, I partner with three affiliated hotels in San Francisco&apos;s Tenderloin/Union Square area,
              all within a short walk of Powell Street BART. I live at one of the properties myself, and I
              personally vet every guest before confirming a booking. This isn&apos;t a faceless platform —
              I&apos;m the person you text when something comes up.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-10 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">What I Believe</h2>
            <ul className="text-gray-700 leading-relaxed space-y-3">
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-1">→</span>
                <span><strong>Housing shouldn&apos;t be a barrier.</strong> Moving to a new city is hard enough without your landlord search becoming a full-time job. A month-to-month hotel stay gives you time to explore neighborhoods and commit to a lease only when you&apos;re ready.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-1">→</span>
                <span><strong>Transparency is non-negotiable.</strong> No hidden fees, no surprise charges. Your deposit is returned in full on move-out. What you see on this site is exactly what you pay.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold mt-1">→</span>
                <span><strong>Affordable and safe can coexist.</strong> The Tenderloin has a complicated reputation, but these properties are professionally managed, cleaned daily, and in buildings with active front desk staff. I wouldn&apos;t live here if I didn&apos;t feel safe.</span>
              </li>
            </ul>
          </div>

          {/* Who this is for */}
          <div className="rounded-2xl border border-border p-8 md:p-10 space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">Who Stays Here</h2>
            <p className="text-gray-700 leading-relaxed">
              Most of my guests fall into a few categories:
            </p>
            <ul className="text-gray-700 space-y-2 grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                'New grads starting jobs in SF',
                'Remote workers needing a city base',
                'Digital nomads between leases',
                'People bridging from one apartment to another',
                'Start-up employees on short project stints',
                'International visitors on extended stays',
                'Travel nurses and healthcare workers',
                'Journalists, artists, and creatives on assignment',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="text-primary">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10 text-center space-y-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              Get in Touch
            </h2>
            <p className="text-muted-foreground">
              Questions? I typically respond within a few hours.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="tel:+14152839224"
                className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
              >
                Text / Call: +1 (415) 283-9224
              </a>
              <a
                href="mailto:cynthiayluo11@gmail.com"
                className="bg-card border border-border text-foreground px-6 py-3 rounded-xl font-medium hover:border-primary/50 transition-colors"
              >
                Email Cynthia
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              <a
                href="https://www.linkedin.com/in/cynthia-y-luo/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                Connect on LinkedIn
              </a>{' '}
              to see posts about the community and housing tips.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
