'use client';

import { MessageSquare, CalendarCheck, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  {
    icon: CalendarCheck,
    number: '01',
    title: 'Contact Me',
    description:
      'Send your room preferences, move-in date, and questions via iMessage, email, or the form below.',
    descriptionCn: 'Text or email me if you have any questions.',
  },
  {
    icon: FileText,
    number: '02',
    title: 'Book a Tour or Book Directly',
    description:
      'Like what you see? Book online directly, or schedule a tour to see it in person first.',
    descriptionCn: 'Schedule a tour or skip it and book directly.',
  },
  {
    icon: CalendarCheck,
    number: '03',
    title: 'Sign Lease & Move In',
    description:
      "We'll send a sublease agreement via email with easy signing instructions.",
    descriptionCn: 'Sign the lease and move in with detailed instructions provided.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28 bg-primary relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <div className="w-12 h-0.5 bg-accent mx-auto mb-6" />
          <h2 className="font-heading text-4xl md:text-5xl text-white mb-4">
            How It Works
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Three simple steps from inquiry to move-in.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={cn(
                'reveal text-center group',
                index !== steps.length - 1 &&
                  'md:border-r md:border-white/10 md:pr-6'
              )}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Icon Circle */}
              <div className="relative inline-flex mb-6">
                <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:bg-accent/20 group-hover:border-accent/30 transition-all duration-300">
                  <step.icon className="w-8 h-8 text-accent" />
                </div>
                <span className="absolute -top-2 -right-2 text-xs font-bold text-accent bg-accent/10 border border-accent/20 rounded-full w-8 h-8 flex items-center justify-center">
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-heading text-2xl text-white mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed">
                {step.descriptionCn}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}