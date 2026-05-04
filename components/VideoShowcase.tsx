'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { useState } from 'react';

export default function VideoShowcase() {
  const [playing, setPlaying] = useState(false);

  return (
    <section className="relative py-24 md:py-32 bg-ink overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-12 md:mb-16 mx-auto text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-ember mb-6 font-medium">
            · Lensmind en Acción ·
          </p>
          <h2 className="display-heading text-4xl md:text-6xl text-balance leading-tight">
            Una mirada.{' '}
            <span className="text-ember">Mil posibilidades</span>.
          </h2>
        </div>

        {/* Video / Visual showcase */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Video container with cinematic aspect ratio */}
          <div className="relative aspect-cinema bg-ink-900 rounded-lg overflow-hidden group cursor-pointer"
               onClick={() => setPlaying(!playing)}>
            {/* Background image (lifestyle) */}
            <div className="absolute inset-0">
              <Image
                src="https://images.unsplash.com/photo-1536243298747-ea8874136d64?w=1600&q=85&auto=format&fit=crop"
                alt="Lensmind lifestyle - persona usando gafas inteligentes"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(min-width: 1024px) 1024px, 100vw"
              />
              {/* Cinematic overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/20" />
              <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/60" />
            </div>

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-ember/90 backdrop-blur-sm flex items-center justify-center shadow-[0_0_60px_rgba(217,119,6,0.4)]"
              >
                {/* Pulse ring */}
                <span className="absolute inset-0 rounded-full bg-ember animate-ping opacity-30" />
                <Play
                  size={32}
                  className="text-ink ml-1 relative z-10"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </motion.div>
            </div>

            {/* Bottom caption */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="grid md:grid-cols-3 gap-4 md:gap-8 text-center md:text-left">
                <div>
                  <p className="text-display italic text-2xl md:text-3xl text-bone mb-1">
                    Captura
                  </p>
                  <p className="text-xs text-smoke-300 tracking-wider">
                    Cualquier momento, sin sacar el celular
                  </p>
                </div>
                <div>
                  <p className="text-display italic text-2xl md:text-3xl text-bone mb-1">
                    Traduce
                  </p>
                  <p className="text-xs text-smoke-300 tracking-wider">
                    40 idiomas en tiempo real
                  </p>
                </div>
                <div>
                  <p className="text-display italic text-2xl md:text-3xl text-bone mb-1">
                    Conecta
                  </p>
                  <p className="text-xs text-smoke-300 tracking-wider">
                    Con la IA más potente del mercado
                  </p>
                </div>
              </div>
            </div>

            {/* Top right: duration badge */}
            <div className="absolute top-4 right-4 glass-strong px-3 py-1.5 rounded-full text-[10px] tracking-[0.2em] uppercase text-bone-200 font-medium">
              0:45
            </div>
          </div>

          {/* Caption below video */}
          <p className="text-center text-xs text-smoke-500 mt-6 tracking-wide">
            Filmado con Lensmind™ · Cámara Sony 1080p
          </p>
        </motion.div>
      </div>
    </section>
  );
}
