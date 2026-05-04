'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function VideoShowcase() {
  return (
    <section className="bg-ink py-0">
      {/* Eyebrow + headline */}
      <div className="container-padded pt-24 md:pt-40 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="eyebrow mb-6">Lifestyle</p>
          <h2 className="display-heading text-display-lg text-bone text-balance">
            Hechas para vivir
            <br />
            tu día.
          </h2>
        </motion.div>
      </div>

      {/* Cinematic lifestyle photo */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 1.2 }}
        className="relative w-full aspect-video-ratio bg-ink-900 overflow-hidden"
      >
        <Image
          src="/lensmind-lifestyle-cdmx.jpg"
          alt="Lensmind™ — joven en el centro histórico de Ciudad de México durante la hora dorada"
          fill
          quality={88}
          sizes="100vw"
          className="object-cover"
        />
        {/* Subtle vignette for cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent pointer-events-none" />
      </motion.div>

      {/* Caption below photo */}
      <div className="container-padded py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <p className="text-bone-300 text-xl md:text-2xl leading-relaxed text-balance font-light">
            Una herramienta tan natural que olvidas que la usas.
            Diseñadas para no estorbar — siempre listas cuando las necesitas.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
