'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col bg-ink overflow-hidden">
      {/* Hero portrait — fills viewport */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/lensmind-hero-portrait.jpg"
          alt="Lensmind™ Edition 01 — gafas inteligentes"
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-[65%_center] lg:object-[60%_center]"
        />

        {/* Editorial gradient — strong bottom for text legibility, lighter top to keep face/glasses visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/50 to-ink" />
        {/* Subtle left-side darkening on desktop for content area */}
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-end pb-20 lg:pb-32 pt-24">
        <div className="container-padded">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl"
          >
            <p className="eyebrow mb-6">Lensmind™ · Edition 01</p>

            <h1 className="display-heading text-display-xl text-bone mb-8 text-balance">
              La IA que vive
              <br />
              en tu mirada.
            </h1>

            <p className="text-bone-300 text-lg md:text-xl max-w-2xl leading-relaxed mb-10">
              Cámara Sony 1080p. Asistente de IA por voz. Traductor en 40 idiomas.
              Diseñadas para Latinoamérica.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="#comprar" className="btn-primary group">
                Comprar — $199 USD
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <Link href="#tecnologia" className="btn-secondary">
                Ver tecnología
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom-left scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="hidden lg:flex absolute bottom-8 right-8 z-10 items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-smoke-500">
          Desliza
        </span>
        <div className="w-12 h-px bg-smoke-700">
          <motion.div
            className="h-full bg-bone w-full origin-left"
            animate={{ scaleX: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
