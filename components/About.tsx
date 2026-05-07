'use client';

import { cn } from '@/lib/utils';

export default function About() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 reveal">
          <div className="w-12 h-0.5 bg-primary mx-auto mb-6" />
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
            About This
          </h2>
        </div>

        <div className="reveal">
          <div className="bg-primary/5 rounded-2xl p-8 md:p-10 space-y-5">
            <p className="text-gray-700 leading-relaxed text-lg font-medium italic">
              Finding a home in San Francisco shouldn't be the hardest part of moving here.
            </p>
            <p className="text-gray-700 leading-relaxed">
              When I first arrived in the city, I was struck by how inaccessible housing was for newcomers and early-career professionals. Having navigated the local landscape—and previously managed housing initiatives for my own community—I decided to bridge this gap.
            </p>
            <p className="text-gray-700 leading-relaxed">
              I now partner directly with established hotels in SF to offer long-term stay options. These properties typically only offer daily rentals, but through a partnership I originated while working on AI-native rental services, I've negotiated exclusive monthly rates for our community.
            </p>

            <div>
              <h3 className="font-heading text-lg text-gray-900 mb-2">Why this works</h3>
              <ul className="text-gray-700 leading-relaxed space-y-2">
                <li><strong>Trust & Safety:</strong> I've lived in these properties myself for months; they are established, safe, and professional.</li>
                <li><strong>Transparency:</strong> You sign your lease directly with the hotel, ensuring full legal clarity. I handle the payment coordination to secure the group rate for you.</li>
              </ul>
            </div>

            <p className="text-gray-700 leading-relaxed">
              Need a hassle-free, affordable base in SF? I'm happy to help.
            </p>

            <div className="pt-2">
              <a
                href="https://www.linkedin.com/in/cynthia-y-luo/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                Connect on LinkedIn (some posts about my hacker house community)
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
