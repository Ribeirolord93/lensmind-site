'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-32 bg-ink relative overflow-hidden border-t border-ink-700">
      {/* Decorative ember glow */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-ember rounded-full blur-[200px]" />
      </div>

      <div className="container-padded relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto text-center"
        >
          <p className="eyebrow mb-8">Lensmind™ Edition 01</p>

          <h2 className="display-heading text-display-lg text-bone text-balance mb-8">
            El futuro está
            <br />
            en tu mirada.
          </h2>

          <p className="text-bone-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Cámara Sony 1080p · IA por voz · Traductor 40 idiomas.
            Envío en 24h con tracking activo.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <Link href="#comprar" className="btn-primary group text-base px-9 py-4">
              Comprar — $149.99 USD
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link href="#tecnologia" className="btn-secondary text-base px-9 py-4">
              Explorar tecnología
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] tracking-[0.18em] uppercase text-smoke-500">
            <span>Garantía 30 días</span>
            <span className="hidden sm:inline text-ink-600">·</span>
            <span>Envío gratis LATAM</span>
            <span className="hidden sm:inline text-ink-600">·</span>
            <span>Pago seguro Shopify</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
