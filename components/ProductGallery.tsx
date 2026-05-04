'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Image as ShopifyImage } from '@/types/shopify';

interface ProductGalleryProps {
  images: ShopifyImage[];
  productTitle: string;
}

// Local product photos — generated for Lensmind™ Edition 01.
// When env flag is enabled (or Shopify has no real photos), the gallery
// uses these instead of supplier photos with promotional text overlays.
// Local product photos — actual product photography of Lensmind™ Edition 01.
// These are used by default; supplier Shopify photos with promotional overlays
// can be enabled via NEXT_PUBLIC_USE_SHOPIFY_PHOTOS=true.
const LOCAL_PHOTOS = [
  {
    url: '/products/lensmind-product-front.jpg',
    alt: 'Lensmind™ Edition 01 — vista frontal mostrando lentes claras e oscuras intercambiables',
    aspectRatio: 'product' as const,
  },
  {
    url: '/products/lensmind-product-3quarter.jpg',
    alt: 'Lensmind™ Edition 01 — vista tres cuartos con lente removible y sistema modular visible',
    aspectRatio: 'product' as const,
  },
  {
    url: '/products/lensmind-product-camera-detail.jpg',
    alt: 'Lensmind™ Edition 01 — detalle macro de la cámara integrada y pines de carga dorados',
    aspectRatio: 'product' as const,
  },
  {
    url: '/products/lensmind-product-side.jpg',
    alt: 'Lensmind™ Edition 01 — perfil lateral con botón de control y diseño slim',
    aspectRatio: 'product' as const,
  },
];

export default function ProductGallery({
  images,
  productTitle,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // DEFAULT: use local clean photos (the 4 we generated).
  // Set NEXT_PUBLIC_USE_SHOPIFY_PHOTOS=true ONLY when Shopify product photos
  // are clean (no promotional text overlays). Until then, local photos win.
  const useShopifyPhotos =
    process.env.NEXT_PUBLIC_USE_SHOPIFY_PHOTOS === 'true';

  // Filter out Unsplash mock placeholders
  const realShopifyImages = images.filter(
    (img) => !img.url.includes('unsplash.com')
  );

  // Decide which set to use:
  //  - useShopifyPhotos=true AND Shopify has real images → use Shopify
  //  - otherwise → use local photos (default, safe path)
  const useLocal = !useShopifyPhotos || realShopifyImages.length === 0;

  if (useLocal) {
    const active = LOCAL_PHOTOS[activeIndex];

    return (
      <div className="space-y-3">
        {/* Main photo */}
        <div className="relative aspect-product bg-ink-900 overflow-hidden rounded-2xl group">
          <Image
            src={active.url}
            alt={active.alt}
            fill
            priority
            quality={92}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
        </div>

        {/* Thumbnails — 4 product photos */}
        <div className="grid grid-cols-4 gap-2">
          {LOCAL_PHOTOS.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square-ratio overflow-hidden rounded-xl transition-all duration-300 bg-ink-900 ${
                i === activeIndex
                  ? 'ring-1 ring-bone opacity-100'
                  : 'opacity-50 hover:opacity-100'
              }`}
              aria-label={`Ver imagen ${i + 1} de Lensmind™`}
            >
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Real Shopify photos path
  const active = realShopifyImages[activeIndex];

  return (
    <div className="space-y-3">
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

      {realShopifyImages.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {realShopifyImages.slice(0, 4).map((img, i) => (
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
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
