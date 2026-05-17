'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface ClientGalleryProps {
  /** Quantas fotos exibir. Default: todas (46) */
  limit?: number;
  /** Layout: 'full' (home/produto) ou 'compact' (4 fotos lateral BuyButton) */
  variant?: 'full' | 'compact';
  /** Override do título */
  title?: string;
  /** Override do subtítulo */
  subtitle?: string;
}

// Lista das 46 fotos disponíveis em /public/clientes/
const CLIENTES_FOTOS = Array.from({ length: 32 }, (_, i) => {
  const num = (i + 1).toString().padStart(2, '0');
  return `/clientes/cliente-${num}.jpg`;
});

export default function ClientGallery({
  limit,
  variant = 'full',
  title = 'Nuestros clientes',
  subtitle = 'Fotos reales enviadas por nuestros compradores',
}: ClientGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const fotos = limit ? CLIENTES_FOTOS.slice(0, limit) : CLIENTES_FOTOS;

  const openLightbox = (idx: number) => setSelectedIndex(idx);
  const closeLightbox = useCallback(() => setSelectedIndex(null), []);

  const goNext = useCallback(() => {
    setSelectedIndex((curr) => {
      if (curr === null) return null;
      return (curr + 1) % fotos.length;
    });
  }, [fotos.length]);

  const goPrev = useCallback(() => {
    setSelectedIndex((curr) => {
      if (curr === null) return null;
      return curr === 0 ? fotos.length - 1 : curr - 1;
    });
  }, [fotos.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, closeLightbox, goNext, goPrev]);

  // Variante COMPACT: 4 fotos pequenas (lateral BuyButton)
  if (variant === 'compact') {
    const compactFotos = fotos.slice(0, 4);
    return (
      <>
        <div className="mt-6">
          <p className="text-xs uppercase tracking-wider text-neutral-500 mb-3 font-medium">
            {title}
          </p>
          <div className="grid grid-cols-4 gap-2">
            {compactFotos.map((src, idx) => (
              <button
                key={src}
                onClick={() => openLightbox(idx)}
                className="relative aspect-square overflow-hidden rounded-lg bg-neutral-100 hover:opacity-90 transition-opacity cursor-pointer"
                aria-label={`Ver foto ${idx + 1} de nuestros clientes`}
              >
                <Image
                  src={src}
                  alt={`Cliente Lensmind ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 25vw, 80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
        {selectedIndex !== null && (
          <Lightbox
            src={fotos[selectedIndex]}
            currentIndex={selectedIndex}
            totalCount={fotos.length}
            onClose={closeLightbox}
            onNext={goNext}
            onPrev={goPrev}
          />
        )}
      </>
    );
  }

  // Variante FULL: galeria completa masonry
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-base text-neutral-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Masonry grid: 2 cols mobile, 3 cols tablet, 4 cols desktop */}
        <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 md:gap-4 space-y-3 md:space-y-4">
          {fotos.map((src, idx) => (
            <button
              key={src}
              onClick={() => openLightbox(idx)}
              className="break-inside-avoid w-full overflow-hidden rounded-xl bg-neutral-100 hover:opacity-95 transition-all duration-300 cursor-pointer block group"
              aria-label={`Ver foto ${idx + 1} en grande`}
            >
              <div className="relative w-full">
                <Image
                  src={src}
                  alt={`Cliente Lensmind ${idx + 1}`}
                  width={400}
                  height={500}
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-neutral-400 mt-10">
          Imágenes compartidas por compradores. Apariencia y uso pueden variar.
        </p>
      </div>

      {selectedIndex !== null && (
        <Lightbox
          src={fotos[selectedIndex]}
          currentIndex={selectedIndex}
          totalCount={fotos.length}
          onClose={closeLightbox}
          onNext={goNext}
          onPrev={goPrev}
        />
      )}
    </section>
  );
}

// === LIGHTBOX INTERNO ===
interface LightboxProps {
  src: string;
  currentIndex: number;
  totalCount: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

function Lightbox({
  src,
  currentIndex,
  totalCount,
  onClose,
  onNext,
  onPrev,
}: LightboxProps) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Close button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        aria-label="Cerrar"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs md:text-sm font-medium">
        {currentIndex + 1} / {totalCount}
      </div>

      {/* Prev */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-2 md:left-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        aria-label="Foto anterior"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        aria-label="Foto siguiente"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Image */}
      <div
        className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={src}
          alt={`Cliente Lensmind ${currentIndex + 1}`}
          width={1200}
          height={1200}
          className="object-contain max-w-full max-h-[85vh] w-auto h-auto"
          priority
        />
      </div>
    </div>
  );
}
