'use client';

import { useState } from 'react';
import { Calendar, Clock, Check, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { cn } from '@/lib/utils';

const TIME_SLOTS = [
  '09:00', '09:30',
  '10:00', '10:30',
  '11:00', '11:30',
  '12:00', '12:30',
  '13:00', '13:30',
  '14:00', '14:30',
];

export default function TourScheduler() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.preferredDate || !formData.preferredTime) {
      setError('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, type: 'tour' }),
      });
      const data = (await res.json()) as { success: boolean; message: string };
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message);
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto">
        <Card className="shadow-lg">
          <CardContent className="p-10 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="font-heading text-2xl text-primary mb-3">
              Tour Request Submitted!
            </h3>
            <p className="text-gray-600 mb-2">
              We\'ll get back to you within <strong>24 hours</strong> to confirm your tour.
            </p>
            <p className="text-gray-500 text-sm mb-4">
              Confirmation email sent to {formData.email}
            </p>
            <p className="text-gray-500 text-sm mb-6">
              
            </p>
            <Button
              variant="secondary"
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: '', email: '', phone: '', preferredDate: '',
                  preferredTime: '', message: '',
                });
              }}
            >
              Request Another Tour
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-heading text-xl text-primary">
                Schedule a Tour
              </h3>
              <p className="text-gray-400 text-sm">
                Tours on weekdays, every 30 min (9am–2:30pm)
              </p>
            </div>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6 text-sm text-amber-800">
            <strong>Tours:</strong> Weekdays 9am–2:30pm.
            Or use the form — we confirm within 24 hours.
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Name *"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, name: e.target.value }))
                }
                required
              />
              <Input
                label="Phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, phone: e.target.value }))
                }
              />
            </div>

            <Input
              label="Email *"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData((f) => ({ ...f, email: e.target.value }))
              }
              required
            />

            {/* Date Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Tour Date *
              </label>
              <input
                type="date"
                value={formData.preferredDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, preferredDate: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                required
              />
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Tour Time * <span className="text-gray-400 font-normal">(9am–2:30pm)</span>
              </label>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {TIME_SLOTS.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() =>
                      setFormData((f) => ({ ...f, preferredTime: time }))
                    }
                    className={cn(
                      'py-2 px-1 rounded-lg text-sm font-medium border transition-all flex items-center justify-center gap-1',
                      formData.preferredTime === time
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 text-gray-600 hover:border-gray-300'
                    )}
                  >
                    <Clock className="w-3 h-3" />
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (optional)
              </label>
              <textarea
                placeholder="Any special requests or questions?"
                value={formData.message}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, message: e.target.value }))
                }
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-900 placeholder-gray-400 resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm bg-red-50 rounded-lg px-4 py-2">
                {error}
              </p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isLoading}
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Tour Request
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}