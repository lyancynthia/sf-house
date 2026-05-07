'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuestionFormData {
  name: string;
  email: string;
  phone: string;
  question: string;
}

export default function QuestionsForm() {
  const [formData, setFormData] = useState<QuestionFormData>({
    name: '',
    email: '',
    phone: '',
    question: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.question) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, phone: formData.phone || undefined }),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', question: '' });
      }
    } catch {
      console.error('Failed to submit question');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="questions" className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 reveal">
          <div className="accent-line mx-auto mb-6" />
          <h2 className="font-heading text-3xl md:text-4xl text-primary mb-4">
            Questions?
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Have questions? Text me or submit your question below — I'll reply within 24 hours.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 reveal">
          <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
            <a href="sms:+14152839224" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl hover:bg-primary-600 transition-colors font-medium text-sm">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
              </svg>
              iMessage / Text
            </a>
            <a href="mailto:cynthiayluo11@gmail.com" className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-900 transition-colors font-medium text-sm">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              Email
            </a>
          </div>

          <div className="text-center text-gray-400 text-sm mb-6">— or leave a message below —</div>

          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-xl font-heading text-gray-900 mb-2">Question Received!</h3>
              <p className="text-gray-500">I'll reply within 24 hours. Thank you!</p>
              {/* CRITICAL REMINDER */}
              <div className="bg-red-50 border-2 border-red-400 rounded-xl p-4 my-6 text-left">
                <p className="text-red-700 text-sm font-bold text-center leading-relaxed">
                  ⚠️ IMPORTANT: PLEASE also text Cynthia at{' '}
                  <a href="sms:+14152839224" className="underline">+1 (415) 283-9224</a>{' '}
                  to confirm!<br />
                  In case my automated system glitches 🙏
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Phone (optional)
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div>
                <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-1.5">
                  Your Question *
                </label>
                <textarea
                  id="question"
                  required
                  rows={5}
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  placeholder="What would you like to know?"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !formData.name || !formData.email || !formData.question}
                className={cn(
                  'w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all',
                  'bg-primary text-white hover:bg-primary-600',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Question
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}