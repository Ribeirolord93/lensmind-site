'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

/**
 * FeatureSpotlight — bloco fullbleed narrativo de feature do produto.
 *
 * Estilo Apple/Meta/Oakley: imagem grande, copy curta, alta densidade visual.
 * Mobile: stack vertical (imagem em cima). Desktop: split 50/50 alternando.
 *
 * Uso:
 *   <FeatureSpotlight
 *     eyebrow="Audio espacial"
 *     headline="Escucha sin oídos tapados."
 *     subhead="Cuatro micrófonos direccionales..."
 *     microCopy="Sin Bluetooth de auriculares. Sin cables."
 *     image="/products/lensmind-audio-spatial.jpg"
 *     imageAlt="..."
 *     imagePosition="left"  // ou "right"
 *   />
 */

interface FeatureSpotlightProps {
  eyebrow: string;
  headline: string;
  subhead: string;
  microCopy?: string;
  image: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  priority?: boolean;
}

export default function FeatureSpotlight({
  eyebrow,
  headline,
  subhead,
  microCopy,
  image,
  imageAlt,
  imagePosition = 'left',
  priority = false,
}: FeatureSpotlightProps) {
  const imageOrderClass = imagePosition === 'left' ? 'lg:order-1' : 'lg:order-2';
  const textOrderClass = imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1';

  return (
    <section className="relative bg-ink overflow-hidden py-20 md:py-28 lg:py-36">
      <div className="container-padded">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-center max-w-7xl mx-auto">
          {/* Imagem */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`relative aspect-[4/3] lg:aspect-[3/2] rounded-2xl lg:rounded-3xl overflow-hidden bg-ink-900 ${imageOrderClass}`}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority={priority}
              quality={88}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          {/* Texto */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={`flex flex-col ${textOrderClass}`}
          >
            <p className="eyebrow text-ember mb-5 md:mb-6">{eyebrow}</p>
            <h2 className="display-heading text-3xl md:text-5xl lg:text-6xl text-bone tracking-tight leading-[1.05] mb-6 md:mb-8 text-balance">
              {headline}
            </h2>
            <p className="text-bone-300 text-lg md:text-xl leading-relaxed mb-6 md:mb-8 max-w-[52ch]">
              {subhead}
            </p>
            {microCopy && (
              <p className="text-smoke-400 text-sm md:text-[15px] leading-relaxed border-t border-ink-700 pt-6 max-w-[52ch]">
                {microCopy}
              </p>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
