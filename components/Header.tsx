'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Building2 } from 'lucide-react';
import Button from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '#properties', label: 'Rooms' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#booking', label: 'Book Now' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 48);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <span
              className={cn(
                'font-heading text-xl transition-colors',
                isScrolled ? 'text-primary' : 'text-white'
              )}
            >
              SF Affordable Short Term Rentals
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isScrolled ? 'text-gray-600' : 'text-white/90'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              variant={isScrolled ? 'primary' : 'accent'}
              size="sm"
              onClick={() => {
                document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 animate-slide-up">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-gray-700 font-medium hover:text-primary transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                variant="primary"
                size="md"
                className="mt-2"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book Now
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}