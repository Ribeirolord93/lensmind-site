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

  if (!images.length) {
    return (
      <div className="aspect-square-tall bg-ink-800 flex items-center justify-center">
        <span className="text-smoke-500">Sin imagen disponible</span>
      </div>
    );
  }

  const active = images[activeIndex];

  return (
    <div className="space-y-4">
      {/* Imagem principal */}
      <div className="relative aspect-square-tall bg-ink-900 overflow-hidden group">
        <Image
          src={active.url}
          alt={active.altText || productTitle}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />

        {/* Edição number overlay */}
        <div className="absolute top-6 left-6 text-[10px] tracking-[0.3em] uppercase text-bone-300 bg-ink/60 backdrop-blur-md px-3 py-1.5">
          {String(activeIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 sm:grid-cols-6 gap-2">
          {images.slice(0, 6).map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square overflow-hidden transition-all duration-300 ${
                i === activeIndex
                  ? 'ring-1 ring-ember opacity-100'
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
