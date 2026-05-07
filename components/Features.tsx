'use client';

import {
  Zap,
  Shield,
  MapPin,
  CreditCard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const features = [
  {
    icon: MapPin,
    title: 'Prime Location',
    titleCn: '4 min walk to Powell BART',
    description: 'In the heart of SF, walking distance to restaurants, shopping, and transit.',
    color: 'bg-primary/10 text-primary border-primary/20',
  },
  {
    icon: Zap,
    title: 'Flexible Terms',
    titleCn: '1 month minimum, flexible dates',
    description: 'Move-in date is flexible. Perfect for transitions, short-term projects, or anyone in between.',
    color: 'bg-accent/10 text-accent border-accent/20',
  },
  {
    icon: CreditCard,
    title: 'Transparent Pricing',
    titleCn: '$1,350~$1,850/mo',
    description: 'Prices all-inclusive. Deposit fully refunded on move-out. Payment via Zelle and PayPal.',
    color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    icon: Shield,
    title: 'Safe & Clean',
    titleCn: 'Personally verified',
    description: 'Not a hacker house — clean, safe, and standardized. Personally verified.',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
  },
];

export default function Features() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <div className="accent-line mx-auto mb-6" />
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
            Why Choose Us
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Short-term housing that actually works in SF.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={cn(
                'reveal p-6 rounded-xl border bg-background',
                'transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
              )}
              style={{ animationDelay: `${index * 0.08}s` }}
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-xl border flex items-center justify-center mb-4',
                  feature.color
                )}
              >
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-lg text-primary mb-1">
                {feature.titleCn}
              </h3>
              <p className="text-gray-400 text-sm mb-2">{feature.title}</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}