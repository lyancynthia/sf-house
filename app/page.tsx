'use client';

import { useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PropertyListings from '@/components/PropertyListings';
import About from '@/components/About';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import BookingForm from '@/components/BookingForm';
import QuestionsForm from '@/components/QuestionsForm';

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden">
      <Header />
      <HeroSection />
      <PropertyListings />
      <About />
      <HowItWorks />
      <Features />
      <section id="booking" className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <BookingForm />
        </div>
      </section>
      <QuestionsForm />
    </main>
  );
}