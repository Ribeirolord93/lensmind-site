'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden border-t border-ink-700 min-h-[80vh] flex items-center">
      {/* Background image — skyline ao entardecer com personagem usando Lensmind */}
      <div className="absolute inset-0">
        <Image
          src="/lensmind-cta-bg.jpg"
          alt="Persona usando Lensmind™ Edition 01 contemplando el horizonte de una ciudad latinoamericana al atardecer"
          fill
          quality={88}
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Overlay escuro pra legibilidade — gradiente vertical revelando o céu laranja no meio */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/55 to-ink/90" />
      </div>

      {/* Ember glow sutil mantido como acento visual */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-[600px] h-[600px] bg-ember rounded-full blur-[220px]" />
      </div>

      <div className="container-padded relative z-10 py-20 md:py-32 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-5xl mx-auto text-center"
        >
          <p className="eyebrow mb-8 text-bone-300">Lensmind™ Edition 01</p>

          <h2 className="display-heading text-display-lg text-bone text-balance mb-8 drop-shadow-2xl">
            El futuro está
            <br />
            en tu mirada.
          </h2>

          <p className="text-bone-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            Cámara Sony 1080p · IA por voz · Traductor 40 idiomas.
            Despacho en 24h · Entrega 10-17 días con tracking activo.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <Link href="#comprar" className="btn-primary group text-base px-9 py-4">
              Comprar — $149.99 USD
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
            <Link href="#tecnologia" className="btn-secondary text-base px-9 py-4 backdrop-blur-sm">
              Explorar tecnología
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] tracking-[0.18em] uppercase text-smoke-400">
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
