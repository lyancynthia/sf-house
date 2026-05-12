import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Page Not Found | SF Affordable Short Term Rentals',
  description: 'The page you are looking for does not exist. Browse our available rooms in San Francisco or contact us.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-6">
        <div className="space-y-2">
          <p className="text-8xl font-heading font-bold text-primary/20">404</p>
          <h1 className="text-3xl font-heading font-bold text-foreground">Page Not Found</h1>
          <p className="text-muted-foreground">
            The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-foreground">Try these instead:</h2>
          <div className="grid grid-cols-1 gap-3">
            <Link
              href="/"
              className="block bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Browse Available Rooms
            </Link>
            <Link
              href="/faq"
              className="block bg-card border border-border text-foreground px-6 py-3 rounded-xl font-medium hover:border-primary/50 transition-colors"
            >
              Read FAQ
            </Link>
          </div>
          <p className="text-sm text-muted-foreground">
            Or contact us directly:{' '}
            <a href="mailto:cynthiayluo11@gmail.com" className="text-primary underline">
              cynthiayluo11@gmail.com
            </a>{' '}
            /{' '}
            <a href="tel:+14152839224" className="text-primary underline">
              +1 (415) 283-9224
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
