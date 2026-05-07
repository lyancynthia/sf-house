'use client';

import { useState } from 'react';
import { Camera, Video, X, ChevronLeft, ChevronRight, Grid3X3 } from 'lucide-react';
import { cn } from '@/lib/utils';

const galleryImages = [
  // Private Room + Private Bath
  { src: '/images/IMG_3772.jpg', label: 'Private Room', category: 'private-bath' },
  { src: '/images/o.jpg', label: 'Private Bath', category: 'private-bath' },
  // Private Room + Shared Bath (same room style as private bath, only bath type differs)
  { src: '/images/IMG_3823.jpg', label: 'Private Room', category: 'shared-bath' },
  { src: '/images/IMG_2406.jpg', label: 'Private Room', category: 'shared-bath' },
  { src: '/images/IMG_2404.jpg', label: 'Private Bath', category: 'shared-bath' },
  // Common Areas
  { src: '/images/IMG_3771.jpg', label: 'Kitchen', category: 'common' },
  { src: '/images/77145104405__0C72DE9B-1864-47D3-ACD0-CDAE5899A12A.jpg', label: 'Dining Room', category: 'common' },
  { src: '/images/IMG_3768.jpg', label: 'Laundry', category: 'common' },
];

const galleryVideos = [
  { src: '/images/IMG_3774.mp4', label: 'Private Room + Private Bath', category: 'private-bath' },
  { src: '/images/IMG_3759.mp4', label: 'Room + Hallway Shared Bath', category: 'shared-bath' },
  { src: '/images/IMG_3760.mp4', label: 'Hallway', category: 'common' },
  { src: '/images/IMG_3761.mp4', label: 'Hallway', category: 'common' },
];

type FilterType = 'all' | 'room' | 'common';

export default function MediaGallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxType, setLightboxType] = useState<'image' | 'video'>('image');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [filter, setFilter] = useState<FilterType>('all');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const filteredImages = filter === 'all' ? galleryImages : galleryImages.filter((i) => i.category === filter);
  const filteredVideos = filter === 'all' ? galleryVideos : galleryVideos.filter((v) => v.category === filter);

  const openImageLightbox = (index: number) => {
    setLightboxType('image');
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const openVideoLightbox = (index: number) => {
    setLightboxType('video');
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevItem = () => {
    if (lightboxType === 'image') {
      setLightboxIndex((i) => Math.max(0, i - 1));
    } else {
      setLightboxIndex((i) => Math.max(0, i - 1));
    }
  };

  const nextItem = () => {
    if (lightboxType === 'image') {
      setLightboxIndex((i) => Math.min(filteredImages.length - 1, i + 1));
    } else {
      setLightboxIndex((i) => Math.min(filteredVideos.length - 1, i + 1));
    }
  };

  const currentItem = lightboxType === 'image' ? filteredImages[lightboxIndex] : filteredVideos[lightboxIndex];
  const totalItems = lightboxType === 'image' ? filteredImages.length : filteredVideos.length;

  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 reveal">
          <div className="accent-line mx-auto mb-6" />
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
            Photo & Video Tour
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Take a look inside — rooms, shared spaces, and more.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-3 mb-10">
          {([
            { key: 'all', label: 'All' },
            { key: 'private-bath', label: 'Private Bath' },
            { key: 'shared-bath', label: 'Shared Bath' },
            { key: 'common', label: 'Common Areas' },
          ] as { key: FilterType; label: string }[]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={cn(
                'px-4 py-2 rounded-full text-sm font-medium border transition-all',
                filter === tab.key
                  ? 'bg-primary text-white border-primary'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Photo Grid */}
        {filteredImages.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <Camera className="w-5 h-5 text-primary" />
              <h3 className="font-heading text-xl text-primary">Photos</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredImages.map((img, index) => (
                <button
                  key={img.src}
                  onClick={() => openImageLightbox(index)}
                  className="relative rounded-xl overflow-hidden bg-gray-100 aspect-square group hover:ring-2 hover:ring-primary/50 transition-all"
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end">
                    <div className="w-full bg-gradient-to-t from-black/50 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs truncate">{img.label}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Video Grid */}
        {filteredVideos.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Video className="w-5 h-5 text-primary" />
              <h3 className="font-heading text-xl text-primary">Videos</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredVideos.map((vid, index) => (
                <div
                  key={vid.src}
                  className="relative rounded-xl overflow-hidden bg-gray-900 aspect-video"
                >
                  {playingVideo === vid.src ? (
                    <video
                      src={vid.src}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                      onEnded={() => setPlayingVideo(null)}
                    />
                  ) : (
                    <>
                      <video
                        src={vid.src}
                        className="w-full h-full object-cover"
                        muted
                        preload="metadata"
                      />
                      <button
                        onClick={() => openVideoLightbox(index)}
                        className="absolute inset-0 flex items-center justify-center group"
                      >
                        <div className="w-14 h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors shadow-lg">
                          <div className="w-0 h-0 border-l-[14px] border-l-primary ml-1 border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent" />
                        </div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <p className="text-white text-sm bg-black/50 rounded px-2 py-1 inline-block">{vid.label}</p>
                        </div>
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && currentItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>
          {totalItems > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevItem(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextItem(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          <div className="w-full max-w-5xl mx-auto px-4" onClick={(e) => e.stopPropagation()}>
            {lightboxType === 'image' ? (
              <img
                src={currentItem.src}
                alt={currentItem.label}
                className="max-h-[80vh] w-full object-contain rounded-lg"
              />
            ) : (
              <video
                src={(currentItem as typeof galleryVideos[0]).src}
                controls
                autoPlay
                className="max-h-[80vh] w-full object-contain rounded-lg"
              />
            )}
            <p className="text-white text-center mt-4 text-sm">
              {currentItem.label} — {lightboxIndex + 1} / {totalItems}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
