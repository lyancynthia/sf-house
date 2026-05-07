'use client';

import { ArrowRight, MapPin } from 'lucide-react';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-8 w-24 h-24 bg-accent/20 rounded-full blur-3xl" />
      <div className="absolute bottom-32 right-12 w-32 h-32 bg-white/10 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8 animate-fade-in-up">
          <MapPin className="w-4 h-4 text-accent" />
          <span className="text-white/90 text-sm font-medium">
            4 min walk to Powell BART · San Francisco
          </span>
        </div>

        {/* Headline */}
        <h1
          className={cn(
            'font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
            'text-white leading-tight mb-6 animate-fade-in-up'
          )}
          style={{ animationDelay: '0.1s' }}
        >
          San Francisco
          <br />
          <span className="text-accent italic">Hotel Sublease</span>
        </h1>

        {/* Subheadline */}
        <p
          className={cn(
            'text-white/80 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto',
            'leading-relaxed mb-12 animate-fade-in-up'
          )}
          style={{ animationDelay: '0.2s' }}
        >
          A clean, safe, standardized place to live for those who need short-term housing in SF. 1 month minimum.
        </p>

        {/* CTA Buttons */}
        <div
          className={cn(
            'flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up'
          )}
          style={{ animationDelay: '0.3s' }}
        >
          <Button
            variant="accent"
            size="lg"
            className="w-full sm:w-auto group"
            onClick={() =>
              document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            Book Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto border-white/40 text-white hover:bg-white hover:text-primary"
            onClick={() =>
              document.getElementById('properties')?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            View Rooms
          </Button>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}