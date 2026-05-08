'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Image as ShopifyImage } from '@/types/shopify';

interface ProductGalleryProps {
  images: ShopifyImage[];
  productTitle: string;
}

// v16: Fotos atualizadas — produção própria da Daiane.
// Capa (#1) é a foto com logo Lensmind™ gravado + LED vermelho aceso = trust máximo.
// Substitui as 4 fotos antigas (front, 3quarter, camera-detail, side).
//
// Quando NEXT_PUBLIC_USE_SHOPIFY_PHOTOS=true, usa as fotos do Shopify Admin.
// Default: usa as fotos locais abaixo.
const LOCAL_PHOTOS = [
  {
    url: '/products/lensmind-camera-led.jpg',
    alt: 'Lensmind™ Edition 01 — vista frontal con logo Lensmind™ grabado en la varilla y LED rojo encendido durante grabación',
    aspectRatio: 'product' as const,
  },
  {
    url: '/products/lensmind-profile-audio.webp',
    alt: 'Lensmind™ Edition 01 — perfil lateral con onda sonora direccional saliendo de la varilla',
    aspectRatio: 'product' as const,
  },
  {
    url: '/products/lensmind-camera-exploded.webp',
    alt: 'Lensmind™ Edition 01 — vista explotada del módulo de cámara mostrando sensor, lentes ópticas y componentes',
    aspectRatio: 'product' as const,
  },
  {
    url: '/products/lensmind-side-audio.webp',
    alt: 'Lensmind™ Edition 01 — vista lateral con micrófono direccional y onda sonora azul',
    aspectRatio: 'product' as const,
  },
  {
    url: '/products/lensmind-hinge-circuit.webp',
    alt: 'Lensmind™ Edition 01 — detalle constructivo de la bisagra con circuitos integrados visibles',
    aspectRatio: 'product' as const,
  },
];

export default function ProductGallery({
  images,
  productTitle,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // DEFAULT: use local clean photos (the 5 new ones from Daiane).
  // Set NEXT_PUBLIC_USE_SHOPIFY_PHOTOS=true ONLY when Shopify product photos
  // are clean (no promotional text overlays). Until then, local photos win.
  const useShopifyPhotos =
    process.env.NEXT_PUBLIC_USE_SHOPIFY_PHOTOS === 'true';

  const activePhotos = useShopifyPhotos && images.length > 0
    ? images.map((img) => ({
        url: img.url,
        alt: img.altText || productTitle,
        aspectRatio: 'product' as const,
      }))
    : LOCAL_PHOTOS;

  const currentPhoto = activePhotos[activeIndex] || activePhotos[0];

  if (!currentPhoto) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Main image */}
      <div
        className={`relative overflow-hidden rounded-2xl bg-ink-900 ${
          currentPhoto.aspectRatio === 'product'
            ? 'aspect-product'
            : 'aspect-square-ratio'
        }`}
      >
        <Image
          src={currentPhoto.url}
          alt={currentPhoto.alt}
          fill
          priority={activeIndex === 0}
          quality={85}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover transition-opacity duration-500"
        />
      </div>

      {/* Thumbnails */}
      {activePhotos.length > 1 && (
        <div className="grid grid-cols-5 gap-2 md:gap-3">
          {activePhotos.map((photo, i) => (
            <button
              key={photo.url}
              onClick={() => setActiveIndex(i)}
              className={`relative aspect-square-ratio overflow-hidden rounded-lg bg-ink-900 border transition-all duration-300 ${
                activeIndex === i
                  ? 'border-ember opacity-100'
                  : 'border-ink-700 opacity-60 hover:opacity-100 hover:border-ink-600'
              }`}
              aria-label={`Ver foto ${i + 1} de ${activePhotos.length}`}
              aria-current={activeIndex === i}
            >
              <Image
                src={photo.url}
                alt=""
                fill
                quality={70}
                sizes="(min-width: 1024px) 10vw, 20vw"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
