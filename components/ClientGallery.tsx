'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

interface ClientGalleryProps {
  /** Quantas fotos exibir. Default: todas (32) */
  limit?: number;
  /** Layout: 'full' (carrossel horizontal) ou 'compact' (4 fotos lateral BuyButton) */
  variant?: 'full' | 'compact';
  /** Override do título */
  title?: string;
  /** Override do subtítulo */
  subtitle?: string;
}

// Lista das 32 fotos disponíveis em /public/clientes/
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

  // Keyboard navigation no lightbox
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

  // Variante COMPACT (4 fotos pequenas, lateral BuyButton)
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
                aria-label={`Ver foto ${idx + 1}`}
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

  // Variante FULL: CARROSSEL HORIZONTAL AUTO-SCROLL
  return (
    <>
      <HorizontalCarousel
        fotos={fotos}
        title={title}
        subtitle={subtitle}
        onPhotoClick={openLightbox}
      />
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

// ====================================================
// CARROSSEL HORIZONTAL COM AUTO-SCROLL + SETAS
// ====================================================
interface CarouselProps {
  fotos: string[];
  title: string;
  subtitle: string;
  onPhotoClick: (idx: number) => void;
}

function HorizontalCarousel({ fotos, title, subtitle, onPhotoClick }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number>(0);

  // Velocidade do auto-scroll (pixels por segundo)
  // 30px/s = lento e elegante, sem distrair
  const SCROLL_SPEED = 30;

  // Duplicamos as fotos pra criar loop infinito visual
  const fotosLoop = [...fotos, ...fotos];

  // Auto-scroll com requestAnimationFrame (suave + respeita refresh rate)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const tick = (timestamp: number) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const delta = (timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      if (!isPaused && container) {
        const moveBy = SCROLL_SPEED * delta;
        container.scrollLeft += moveBy;

        // Quando chegar na metade (que é o fim da 1ª cópia), reseta pro início
        // Cria ilusão de loop infinito sem cortes visuais
        const halfScroll = container.scrollWidth / 2;
        if (container.scrollLeft >= halfScroll) {
          container.scrollLeft = container.scrollLeft - halfScroll;
        }
      }

      animationRef.current = requestAnimationFrame(tick);
    };

    animationRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPaused]);

  // Navegação manual via setas
  const scrollByAmount = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;
    // Cada foto tem ~240px de largura no desktop, ~180px no mobile
    const itemWidth = window.innerWidth < 640 ? 200 : 280;
    const scrollAmount = itemWidth * 2; // navega 2 fotos por vez
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-4xl font-light tracking-tight text-neutral-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-3 text-sm md:text-base text-neutral-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Container do carrossel — full bleed (sem max-w pra dar sensação de fluxo) */}
      <div className="relative group">
        {/* Setas de navegação */}
        <button
          onClick={() => scrollByAmount('left')}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all opacity-70 hover:opacity-100 group-hover:opacity-100"
          aria-label="Foto anterior"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <button
          onClick={() => scrollByAmount('right')}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all opacity-70 hover:opacity-100 group-hover:opacity-100"
          aria-label="Foto siguiente"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-900">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Gradient masks nas bordas pra fade-out visual elegante */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Track do carrossel */}
        <div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => {
            // Resume autoplay 2s depois do user soltar (UX standard)
            setTimeout(() => setIsPaused(false), 2000);
          }}
        >
          {fotosLoop.map((src, idx) => {
            // idx % fotos.length pra mapear back ao index original (importante pro lightbox)
            const originalIdx = idx % fotos.length;
            return (
              <button
                key={`${src}-${idx}`}
                onClick={() => onPhotoClick(originalIdx)}
                className="relative flex-shrink-0 w-[180px] h-[240px] md:w-[260px] md:h-[340px] overflow-hidden rounded-xl bg-neutral-100 cursor-pointer group/photo"
                aria-label={`Ver foto ${originalIdx + 1} de nuestros clientes`}
              >
                <Image
                  src={src}
                  alt={`Cliente Lensmind ${originalIdx + 1}`}
                  fill
                  sizes="(max-width: 640px) 180px, 260px"
                  className="object-cover transition-transform duration-500 group-hover/photo:scale-105"
                />
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-center text-xs text-neutral-400 mt-8 px-4">
        Fotos publicadas por compradores en redes sociales. Lensmind no garantiza representatividad de uso. Edición 01 lanzada en mayo 2026.
      </p>

      {/* CSS pra esconder scrollbar (Webkit) */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

// ====================================================
// LIGHTBOX (mantido igual)
// ====================================================
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
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
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

      <div className="absolute top-4 left-4 md:top-6 md:left-6 z-10 px-3 py-1.5 rounded-full bg-white/10 text-white text-xs md:text-sm font-medium">
        {currentIndex + 1} / {totalCount}
      </div>

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
