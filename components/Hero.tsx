'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative bg-ink min-h-[100dvh] overflow-hidden">

      {/* PHOTO LAYER
          Mobile/tablet (<lg): fullscreen background (inset-0)
          Desktop (lg+):       only left half  (inset-0 + right-1/2) */}
      <div className="absolute inset-0 lg:right-1/2 bg-bone">
        <Image
          src="/lensmind-hero-portrait.jpg"
          alt="Lensmind™ Edition 01 — gafas inteligentes con cámara y asistente de IA"
          fill
          priority
          quality={85}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-[40%_top] lg:object-center"
        />
        {/* Mobile/tablet only: editorial gradient over photo (v13 style) — strong toward bottom for text legibility */}
        <div
          aria-hidden
          className="lg:hidden absolute inset-0 bg-gradient-to-b from-ink/20 via-ink/55 to-ink pointer-events-none"
        />
        {/* Desktop only: leve sombra editorial na borda direita pra suavizar a transição com o painel dark */}
        <div
          aria-hidden
          className="hidden lg:block absolute inset-y-0 right-0 w-24 bg-gradient-to-r from-transparent to-ink/20 pointer-events-none"
        />
      </div>

      {/* CONTENT LAYER
          Mobile/tablet: bottom-overlay sobre a foto (sobre o gradient escuro)
          Desktop:       painel direito centrado verticalmente (cell direita do grid) */}
      <div className="relative z-10 min-h-[100dvh] grid grid-cols-1 lg:grid-cols-2">
        {/* Spacer cell — só existe em desktop pra empurrar conteúdo pra direita */}
        <div aria-hidden className="hidden lg:block" />

        <div className="flex items-end lg:items-center px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-24 pb-16 pt-32 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl w-full"
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
                <span>Comprar — $149.00 USD</span>
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

    </section>
  );
}
