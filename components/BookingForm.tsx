'use client';

import { useState } from 'react';
import { Check, ChevronRight, User, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
import { cn } from '@/lib/utils';

const STEPS = [
  { icon: User, label: 'Your Info' },
  { icon: FileText, label: 'Confirm' },
];

const DURATION_OPTIONS = [1, 2, 3, 4, 5, 6];

export default function BookingForm() {
  const [step, setStep] = useState(0);
  const [roomPreference, setRoomPreference] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    nationality: '',
    occupation: '',
    intro: '',
    moveInDate: '',
    duration: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message?: string; leaseUrl?: string } | null>(null);
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const validateStep = () => {
    const newErrors: Partial<Record<string, string>> = {};

    if (step === 0) {
      if (!formData.name.trim()) newErrors.name = 'Please enter your name';
      if (!formData.email.trim()) newErrors.email = 'Please enter your email';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        newErrors.email = 'Please enter a valid email';
      if (!formData.phone.trim()) newErrors.phone = 'Please enter your phone number';
      if (!formData.nationality.trim()) newErrors.nationality = 'Please enter your nationality';
      if (!formData.occupation.trim()) newErrors.occupation = 'Please enter your occupation';
      if (!formData.intro.trim()) newErrors.intro = 'Please introduce yourself';
      if (!formData.moveInDate) newErrors.moveInDate = 'Please select a move-in date';
      if (!roomPreference) newErrors.roomPreference = 'Please select a room preference';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (step === 1) {
        handleSubmit();
      } else {
        setStep((s) => s + 1);
      }
    }
  };

  const handleBack = () => {
    setStep((s) => Math.max(0, s - 1));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/lease', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          propertyId: roomPreference,
          moveInDate: formData.moveInDate,
          duration: formData.duration,
          nationality: formData.nationality,
          occupation: formData.occupation,
          intro: formData.intro,
        }),
      });
      const data = (await res.json()) as { success: boolean; message?: string; leaseUrl?: string };
      setResult(data);
      if (data.success) setStep(2);
    } catch {
      setResult({ success: false, message: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setStep(0);
    setRoomPreference('');
    setFormData({ name: '', email: '', phone: '', nationality: '', occupation: '', intro: '', moveInDate: '', duration: 1 });
    setResult(null);
    setErrors({});
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Step Indicator */}
      {step < 2 && (
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((s, i) => (
            <div key={s.label} className="flex items-center">
              <div
                className={cn(
                  'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                  i <= step
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-400'
                )}
              >
                <s.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {i < STEPS.length - 1 && (
                <ChevronRight
                  className={cn(
                    'w-4 h-4 mx-1',
                    i < step ? 'text-primary' : 'text-gray-300'
                  )}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <Card className="shadow-lg">
        <CardContent className="p-6 md:p-8">
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <div className="animate-slide-up">
              <h3 className="font-heading text-2xl text-primary mb-2">
                Your Information
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Fill in your details below and we'll get back to you within 24 hours.
              </p>

              <div className="space-y-4">
                <Input
                  label="Full Name *"
                  placeholder="Your full legal name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, name: e.target.value }))
                  }
                  error={errors.name}
                />
                <Input
                  label="Email *"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, email: e.target.value }))
                  }
                  error={errors.email}
                />
                <Input
                  label="Phone Number *"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, phone: e.target.value }))
                  }
                  error={errors.phone}
                />

                {/* Nationality */}
                <Input
                  label="Nationality *"
                  placeholder="e.g. American, Chinese, Indian..."
                  value={formData.nationality}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, nationality: e.target.value }))
                  }
                  error={errors.nationality}
                />

                <Input
                  label="Occupation *"
                  placeholder="e.g. Software Engineer, Founder, Student"
                  value={formData.occupation}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, occupation: e.target.value }))
                  }
                  error={errors.occupation}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Briefly Introduce Yourself (2-3 sentences) *
                  </label>
                  <textarea
                    placeholder="e.g. I'm a new grad starting a job in SF next month..."
                    value={formData.intro}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, intro: e.target.value }))
                    }
                    rows={3}
                    className={cn(
                      'w-full px-4 py-3 rounded-lg border bg-white text-gray-900 placeholder-gray-400',
                      'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none',
                      errors.intro ? 'border-red-500' : 'border-gray-200'
                    )}
                  />
                  {errors.intro && (
                    <p className="text-red-500 text-xs mt-1">{errors.intro}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Preferred Move-in Date *"
                    type="date"
                    value={formData.moveInDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) =>
                      setFormData((f) => ({ ...f, moveInDate: e.target.value }))
                    }
                    error={errors.moveInDate}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration *
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {DURATION_OPTIONS.map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() =>
                            setFormData((f) => ({ ...f, duration: d }))
                          }
                          className={cn(
                            'px-3 py-2 rounded-lg text-sm font-medium border transition-all',
                            formData.duration === d
                              ? 'border-primary bg-primary text-white'
                              : 'border-gray-200 text-gray-600 hover:border-gray-300'
                          )}
                        >
                          {d} {d === 1 ? 'month' : 'months'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Room Preference */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Preference *
                  </label>
                  {errors.roomPreference && (
                    <p className="text-red-500 text-xs mb-1">{errors.roomPreference}</p>
                  )}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setRoomPreference('shared-bath')}
                      className={cn(
                        'flex-1 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all text-left',
                        roomPreference === 'shared-bath'
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-100 hover:border-gray-200'
                      )}
                    >
                      <span className="font-medium text-gray-900">Shared Bathroom</span>
                      <span className="text-gray-400 ml-2">$1,350/mo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRoomPreference('private-bath')}
                      className={cn(
                        'flex-1 px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all text-left',
                        roomPreference === 'private-bath'
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-100 hover:border-gray-200'
                      )}
                    >
                      <span className="font-medium text-gray-900">Private Bathroom</span>
                      <span className="text-gray-400 ml-2">$1,850/mo</span>
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    See{' '}
                    <a href="#properties" className="text-primary hover:underline">
                      room details
                    </a>{' '}
                    for photos and availability
                  </p>
                </div>

                {/* Booking Info */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <ul className="text-amber-700 text-xs space-y-1">
                    <li>• Minimum stay: <strong>1 month</strong>, flexible move-in date</li>
                    <li>• Deposit: fully refundable on move-out</li>
                    <li>• 2 guests: price increases due to insurance — contact Cynthia for details</li>
                    <li>• Stays less than 1 month: please do not reach out</li>
                    <li className="text-red-600 font-medium">• May 7 or move-in after June 1: +$200/room/month</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Review & Confirm */}
          {step === 1 && (
            <div className="animate-slide-up">
              <h3 className="font-heading text-2xl text-primary mb-2">
                Confirm Your Booking
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                We'll send you a lease and contact you within 24 hours.
              </p>

              <div className="bg-gray-50 rounded-xl p-5 space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-500">Room</span>
                  <span className="font-medium text-gray-900">
                    {roomPreference === 'private-bath' ? 'Private Room + Private Bathroom ($1,850/mo)' : 'Private Room + Shared Bathroom ($1,350/mo)'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Name</span>
                  <span className="font-medium text-gray-900">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Nationality</span>
                  <span className="font-medium text-gray-900">{formData.nationality}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Occupation</span>
                  <span className="font-medium text-gray-900">{formData.occupation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Move-in Date</span>
                  <span className="font-medium text-gray-900">{formData.moveInDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-medium text-gray-900">{formData.duration} {formData.duration === 1 ? 'month' : 'months'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Email</span>
                  <span className="font-medium text-gray-900">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium text-gray-900">{formData.phone}</span>
                </div>
              </div>

              <p className="text-xs text-gray-400 mb-4">
                By clicking "Confirm Booking", a lease will be sent to your email. We'll also reach out within 24 hours.
              </p>
            </div>
          )}

          {/* Step 2: Success */}
          {step === 2 && result?.success && (
            <div className="animate-slide-up text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-3">
                Booking Submitted!
              </h3>
              <p className="text-gray-600 mb-2">
                We'll send you a lease at{' '}
                <strong>{formData.email}</strong>
              </p>
              <p className="text-gray-500 text-sm mb-2">
                Our team will contact you within 24 hours.
              </p>
              <p className="text-gray-400 text-sm mb-6">
                
              </p>
              {result.leaseUrl && (
                <a
                  href={result.leaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm hover:underline mb-6"
                >
                  <FileText className="w-4 h-4" />
                  View Lease
                </a>
              )}
              <Button variant="secondary" onClick={handleReset}>
                Submit Another
              </Button>
            </div>
          )}

          {/* Error State */}
          {step === 2 && !result?.success && (
            <div className="animate-slide-up text-center py-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl text-red-500">!</span>
              </div>
              <h3 className="font-heading text-2xl text-red-600 mb-3">
                Submission Failed
              </h3>
              <p className="text-gray-600 mb-6">{result?.message}</p>
              <Button variant="secondary" onClick={handleReset}>
                Try Again
              </Button>
            </div>
          )}

          {/* Navigation Buttons */}
          {step < 2 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="ghost"
                onClick={handleBack}
                disabled={step === 0}
                className={step === 0 ? 'invisible' : ''}
              >
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleNext}
                isLoading={isLoading}
              >
                {step === 1 ? 'Confirm Booking' : 'Next'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}