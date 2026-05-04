'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Image as ShopifyImage } from '@/types/shopify';

interface ProductGalleryProps {
  images: ShopifyImage[];
  productTitle: string;
}

export default function ProductGallery({
  images,
  productTitle,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Filter out Unsplash placeholders for cleaner empty state
  const realImages = images.filter(
    (img) => !img.url.includes('unsplash.com')
  );

  // If we only have Unsplash mocks (no real Shopify images), show placeholder
  if (realImages.length === 0) {
    return (
      <div className="space-y-3">
        {/* Main placeholder */}
        <div className="media-placeholder aspect-product rounded-2xl">
          <div className="media-placeholder-label">
            <div className="text-center space-y-2">
              <div className="text-2xl">📷</div>
              <div className="text-smoke-400 text-xs tracking-[0.2em]">
                FOTO PRINCIPAL
              </div>
              <div className="text-smoke-600 text-[9px] normal-case tracking-wider">
                producto vista frontal · 4:5 · WebP
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail placeholders */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="media-placeholder aspect-square-ratio rounded-xl"
            >
              <div className="media-placeholder-label">
                <span className="text-smoke-600 text-[9px]">{`0${i}`}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const active = realImages[activeIndex];

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative aspect-product bg-ink-900 overflow-hidden rounded-2xl group">
        <Image
          src={active.url}
          alt={active.altText || productTitle}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      </div>

      {/* Thumbnails */}
      {realImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {realImages.slice(0, 4).map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square-ratio overflow-hidden rounded-xl transition-all duration-300 ${
                i === activeIndex
                  ? 'ring-1 ring-bone opacity-100'
                  : 'opacity-50 hover:opacity-100'
              }`}
              aria-label={`Ver imagen ${i + 1}`}
            >
              <Image
                src={img.url}
                alt={img.altText || ''}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
