'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-ink grain">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-ember/[0.08] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-ember/[0.05] rounded-full blur-[140px]" />
      </div>

      {/* Editorial frame */}
      <div className="absolute inset-x-6 top-24 hidden md:flex items-center justify-between text-[10px] tracking-[0.3em] uppercase text-smoke-500 z-10">
        <span>· Vol. 01 ·</span>
        <span>Lensmind™ Edition</span>
        <span>· 2026 ·</span>
      </div>

      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.35em] uppercase text-ember font-medium">
              <span className="w-8 h-px bg-ember" />
              La Nueva Generación
              <span className="w-8 h-px bg-ember" />
            </span>
          </motion.div>

          {/* Display headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="display-heading text-[14vw] sm:text-[10vw] md:text-[8vw] lg:text-[7rem] mb-6 text-balance"
          >
            La <span className="text-ember">IA</span> que vive
            <br />
            en tu <span className="text-ember not-italic">mirada</span>.
          </motion.h1>

          {/* Subhead */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="text-smoke-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed text-balance"
          >
            Gafas inteligentes con cámara Sony 1080p, traductor en tiempo real
            y asistente de IA. Todo lo del{' '}
            <span className="text-bone-200 italic">Ray-Ban Meta</span> — por
            menos de la mitad.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <Link href="#producto" className="btn-ember group">
              <span>Ver Lensmind</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link href="#tecnologia" className="btn-ghost">
              Cómo funciona
            </Link>
          </motion.div>

          {/* Price flash */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-16 flex items-baseline justify-center gap-3"
          >
            <span className="text-smoke-500 text-sm line-through">
              $329 USD
            </span>
            <span className="text-bone text-2xl md:text-3xl font-light">
              $199{' '}
              <span className="text-smoke-400 text-base">USD</span>
            </span>
            <span className="text-ember text-xs tracking-[0.2em] uppercase">
              · Envío Gratis
            </span>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-smoke-500"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-smoke-500 to-transparent" />
      </motion.div>
    </section>
  );
}
