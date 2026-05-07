'use client';

import { useState } from 'react';
import Image from 'next/image';
import { MapPin, Wifi, Wind, Utensils, Bath, Maximize, Check, Users, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Badge from '@/components/ui/badge';
import { Property } from '@/lib/types';
import { cn } from '@/lib/utils';

interface PropertyWithMedia extends Property {
  images: string[];
  video?: string;
}

const properties: PropertyWithMedia[] = [
  {
    id: 'herbert-private-ensuite',
    name: 'Private Room + Private Bathroom',
    nameCn: 'Private Room + Private Bathroom',
    description: 'Only 1 available! The Herbert hotel room with private bathroom. Available 5.7-6.12.',
    descriptionCn: 'Only 1 available! The Herbert hotel room with private bathroom. Available 5.7-6.12.',
    address: 'The Herbert Hotel, San Francisco, CA 94105',
    neighborhood: 'Near Powell BART',
    price: 1850,
    deposit: 1850,
    available: false,
    moveInDate: '2026-04-08',
    images: ['/images/IMG_3772.jpg', '/images/o.jpg'],
    video: '/images/IMG_3774.mp4',
    amenities: ['High-speed WiFi', 'Private Bathroom', 'Queen Bed', 'Table/Chair/Closet', 'Shared Kitchen', 'Laundry', 'Lobby'],
    amenitiesCn: ['High-speed WiFi', 'Private Bathroom', 'Queen Bed', 'Table/Chair/Closet', 'Shared Kitchen', 'Laundry', 'Lobby'],
    size: 'Private Room',
    floor: 1,
    petPolicy: 'Contact manager',
    petPolicyCn: 'Contact manager',
    featured: true,
  },
  {
    id: 'herbert-private-shared',
    name: 'Private Room + Shared Bathroom',
    nameCn: 'Private Room + Shared Bathroom',
    description: 'Shared bathroom (6 rooms share 2 bathrooms, cleaned multiple times daily). Queen bed or 2 single beds (limited).',
    descriptionCn: 'Shared bathroom (6 rooms share 2 bathrooms, cleaned multiple times daily). <strong>2 single beds (limited)</strong> or Queen bed.',
    address: 'The Herbert Hotel, San Francisco, CA 94105',
    neighborhood: 'Near Powell BART',
    price: 1350,
    deposit: 1350,
    available: true,
    moveInDate: 'Available now',
    images: ['/images/IMG_3823.jpg', '/images/IMG_2406.jpg', '/images/IMG_2404.jpg'],
    video: '/images/IMG_3759.mp4',
    amenities: ['High-speed WiFi', 'Queen Bed', 'Table/Chair/Closet', 'Shared Kitchen', 'Laundry', 'Lobby', 'Hallway Bathroom (6 rooms share 2)'],
    amenitiesCn: ['High-speed WiFi', 'Queen Bed', 'Table/Chair/Closet', 'Shared Kitchen', 'Laundry', 'Lobby', 'Hallway Bathroom (6 rooms share 2)'],
    size: 'Private Room',
    floor: 1,
    petPolicy: 'Contact manager',
    petPolicyCn: 'Contact manager',
    featured: true,
  },
];

const amenityIcons: Record<string, React.ReactNode> = {
  'High-speed WiFi': <Wifi className="w-4 h-4" />,
  'Private Bathroom': <Bath className="w-4 h-4" />,
  'Queen Bed': <Maximize className="w-4 h-4" />,
  'Table/Chair/Closet': <Maximize className="w-4 h-4" />,
  'Shared Kitchen': <Utensils className="w-4 h-4" />,
  'Laundry': <Wind className="w-4 h-4" />,
  'Lobby': <Users className="w-4 h-4" />,
  'Hallway Bathroom (6 rooms share 2)': <Bath className="w-4 h-4" />,
  'Gym': <Check className="w-4 h-4" />,
};

export default function PropertyListings() {
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState<string[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxType, setLightboxType] = useState<'image' | 'video'>('image');

  const openLightbox = (property: PropertyWithMedia) => {
    setLightboxImages(property.images);
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevImage = () => setLightboxIndex((i) => Math.max(0, i - 1));
  const nextImage = () => setLightboxIndex((i) => Math.min(lightboxImages.length - 1, i + 1));

  const getImageIndex = (propertyId: string) => activeImageIndex[propertyId] ?? 0;

  return (
    <section id="properties" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 reveal">
          <div className="accent-line mx-auto mb-6" />
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
            Our Rooms
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Fully furnished private rooms in San Francisco hotel
          </p>
        </div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {properties.map((property, index) => (
            <Card
              key={property.id}
              hover
              className={cn('reveal', property.featured && 'ring-2 ring-accent/30')}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                {/* Image Carousel */}
                <div className="relative mb-4 rounded-xl overflow-hidden bg-gray-100" style={{ height: '220px' }}>
                  {property.images.length > 0 ? (
                    <>
                      <img
                        src={property.images[getImageIndex(property.id)]}
                        alt={property.name}
                        className="w-full h-full object-cover"
                      />
                      {property.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex((prev) => ({
                                ...prev,
                                [property.id]: Math.max(0, getImageIndex(property.id) - 1),
                              }));
                            }}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex((prev) => ({
                                ...prev,
                                [property.id]: Math.min(property.images.length - 1, getImageIndex(property.id) + 1),
                              }));
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {property.images.map((_, i) => (
                              <button
                                key={i}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveImageIndex((prev) => ({ ...prev, [property.id]: i }));
                                }}
                                className={cn(
                                  'w-2 h-2 rounded-full transition-all',
                                  i === getImageIndex(property.id) ? 'bg-white' : 'bg-white/50'
                                )}
                              />
                            ))}
                          </div>
                          <button
                            onClick={() => openLightbox(property)}
                            className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                          >
                            <Maximize className="w-4 h-4" />
                          </button>
                          {property.video && (
                            <button
                              onClick={() => {
                                setLightboxType('video');
                                setLightboxImages([property.video!]);
                                setLightboxIndex(0);
                                setLightboxOpen(true);
                              }}
                              className="absolute top-2 left-2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
                            >
                              <div className="w-0 h-0 border-l-[10px] border-l-white ml-0.5 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent" />
                            </button>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-5xl">🛏️</span>
                    </div>
                  )}
                </div>

                {/* Title */}
                <div className="mb-3">
                  <h3 className="font-heading text-xl text-primary">
                    {property.name}
                  </h3>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{property.neighborhood}</span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {property.id === 'herbert-private-shared' ? (
                    <>
                      Shared bathroom (6 rooms share 2 bathrooms, cleaned multiple times daily).{' '}
                      <strong>2 single beds (limited)</strong> or Queen bed.
                    </>
                  ) : (
                    property.descriptionCn
                  )}
                </p>

                {/* Availability */}
                <div className="mb-4">
                  {property.id === 'herbert-private-ensuite' ? (
                    <Badge variant="warning">Available 5.7-6.12 (1 room only)</Badge>
                  ) : property.available ? (
                    <Badge variant="success">Available Now</Badge>
                  ) : (
                    <Badge variant="warning">Available from April 8, 2026</Badge>
                  )}
                </div>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.amenitiesCn.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-md"
                    >
                      {amenityIcons[amenity] || <Check className="w-3 h-3" />}
                      {amenity}
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="bg-primary/5 rounded-lg p-4 mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-primary font-heading text-2xl">
                      ${property.price.toLocaleString()}
                    </span>
                    <span className="text-gray-400 text-sm">/mo/person</span>
                  </div>
                  {property.id === 'herbert-private-shared' && (
                    <p className="text-xs text-primary mt-1">
                      $1,650/mo for 2 people
                    </p>
                  )}
                  {property.id === 'herbert-private-ensuite' && (
                    <p className="text-xs text-primary mt-1">
                      $2,350/mo for 2 people
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Deposit ${property.deposit.toLocaleString()}, fully refundable on move-out
                  </p>
                </div>
              </CardContent>

              {/* Card Footer / CTA */}
              <div className="px-6 pb-4 -mt-2">
                <button
                  onClick={() => {
                    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary-600 transition-colors"
                >
                  Select This Room
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Extra Info */}
        <div className="mt-12 text-center reveal">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 max-w-2xl mx-auto">
            <p className="text-amber-800 text-sm">
              <strong>Note:</strong> We operate three hotels, all within a 1-2 min walk of each other.
              Amenities are shared among all three properties. You can enjoy all amenities regardless of which hotel you stay in.
            </p>
          </div>
        </div>

        {/* Price Increase Warning */}
        <div className="mt-6 text-center reveal">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 max-w-2xl mx-auto">
            <p className="text-red-700 text-sm">
              <strong>Price Update:</strong> Starting May 7, 2026, or for move-ins after June 1, 2026,
              all room prices increase by <strong>$200/room/month</strong>.
              Book now to lock in current rates!
            </p>
          </div>
        </div>

        {/* Availability Note */}
        <div className="mt-6 text-center reveal">
          <p className="text-gray-500 text-sm">
            Minimum stay: <strong>1 month</strong>, flexible start date. Stays less than 1 month — please do not reach out.
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          {lightboxImages.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          {lightboxType === 'image' ? (
            <img
              src={lightboxImages[lightboxIndex]}
              alt=""
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <video
              src={lightboxImages[lightboxIndex]}
              controls
              autoPlay
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          )}
          {lightboxImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {lightboxIndex + 1} / {lightboxImages.length}
            </div>
          )}
        </div>
      )}
    </section>
  );
}