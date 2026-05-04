'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-ink overflow-hidden">
      {/* Split layout — foto editorial à esquerda (lg+), painel dark à direita.
          No mobile/tablet: foto em cima (~55vh), conteúdo embaixo. */}
      <div className="flex flex-col lg:flex-row min-h-[100dvh]">

        {/* PHOTO PANEL */}
        <div className="relative w-full lg:w-1/2 h-[55vh] sm:h-[60vh] lg:h-auto lg:min-h-[100dvh] bg-bone">
          <Image
            src="/lensmind-hero-portrait.jpg"
            alt="Lensmind™ Edition 01 — gafas inteligentes con cámara y asistente de IA"
            fill
            priority
            quality={90}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-top lg:object-center"
          />
          {/* Mobile only: fade da foto branca pro painel dark embaixo */}
          <div
            aria-hidden
            className="lg:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-ink pointer-events-none"
          />
          {/* Desktop: leve sombra editorial na borda direita pra suavizar a transição */}
          <div
            aria-hidden
            className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-ink/20 pointer-events-none"
          />
        </div>

        {/* CONTENT PANEL */}
        <div className="relative w-full lg:w-1/2 bg-ink flex items-center">
          <div className="w-full px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-24 py-16 lg:py-20">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-xl"
            >
              <p className="eyebrow mb-6">Lensmind™ · Edition 01</p>

              <h1 className="display-heading text-4xl sm:text-5xl md:text-6xl xl:text-7xl text-bone mb-8 text-balance leading-[0.95]">
                La IA que vive
                <br />
                en tu mirada.
              </h1>

              <p className="text-bone-300 text-base sm:text-lg leading-relaxed mb-10 max-w-md">
                Cámara Sony 1080p. Asistente de IA por voz. Traductor en 40 idiomas.
                Diseñadas para Latinoamérica.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="#producto"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-bone text-ink font-medium rounded-sm hover:bg-bone/90 transition-colors group"
                >
                  <span>Comprar — $199 USD</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
                <Link
                  href="#tecnologia"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-bone/20 text-bone hover:bg-bone/[0.04] transition-colors rounded-sm"
                >
                  Ver tecnología
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
