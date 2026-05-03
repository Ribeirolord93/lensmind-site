'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative py-32 md:py-48 bg-ink overflow-hidden">
      {/* Atmospheric gradient */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-ember/[0.06] rounded-full blur-[160px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="text-[11px] tracking-[0.4em] uppercase text-ember mb-8 font-medium">
            · Última Llamada ·
          </p>

          <h2 className="display-heading text-6xl sm:text-7xl md:text-[9rem] leading-[0.95] mb-10 text-balance">
            El futuro
            <br />
            <span className="text-ember">no espera</span>.
          </h2>

          <p className="text-smoke-400 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed text-balance">
            Únete a la primera generación de Latinoamérica en usar gafas con
            IA. Stock limitado de lanzamiento.
          </p>

          {/* Pricing reveal */}
          <div className="inline-flex items-baseline gap-4 mb-10 px-6 py-4 border border-ink-700 rounded-sm">
            <span className="text-smoke-500 text-base line-through">
              $329 USD
            </span>
            <span className="text-bone text-2xl md:text-3xl">
              $199 <span className="text-smoke-400 text-base">USD</span>
            </span>
            <span className="text-ember text-xs tracking-[0.2em] uppercase">
              Ahorra $130
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link href="#producto" className="btn-ember group">
              <span>Quiero las mías</span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>

          <p className="text-xs text-smoke-500 mt-8 tracking-wide">
            🚚 Envío gratis a México · Chile · Colombia · 30 días de garantía
          </p>
        </motion.div>
      </div>
    </section>
  );
}
