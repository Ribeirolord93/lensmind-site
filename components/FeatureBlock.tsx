'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ReactNode } from 'react';

interface FeatureBlockProps {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  mediaLabel: string;
  mediaSpec: string;
  reverse?: boolean;
  aspectRatio?: 'video' | 'square' | 'product' | 'landscape';
  imageSrc?: string;
  imageAlt?: string;
  children?: ReactNode;
}

export default function FeatureBlock({
  eyebrow,
  title,
  description,
  bullets,
  mediaLabel,
  mediaSpec,
  reverse = false,
  aspectRatio = 'video',
  imageSrc,
  imageAlt,
  children,
}: FeatureBlockProps) {
  const aspectClass = {
    video: 'aspect-video-ratio',
    square: 'aspect-square-ratio',
    product: 'aspect-product',
    landscape: 'aspect-landscape',
  }[aspectRatio];

  return (
    <section className="py-16 md:py-28 bg-ink overflow-hidden">
      <div className="container-padded">
        <div
          className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
            reverse ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* Media side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className={`relative ${aspectClass} rounded-2xl overflow-hidden ${
              imageSrc ? 'bg-ink-900' : 'media-placeholder'
            }`}
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt || title}
                fill
                quality={90}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="media-placeholder-label">
                <div className="text-center space-y-2">
                  <div>▶ {mediaLabel}</div>
                  <div className="text-smoke-600 text-[9px] tracking-wider normal-case">
                    {mediaSpec}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="max-w-xl"
          >
            <p className="eyebrow mb-6">{eyebrow}</p>

            <h2 className="display-heading text-display-md text-bone mb-6 text-balance">
              {title}
            </h2>

            <p className="text-bone-300 text-base md:text-lg leading-relaxed mb-8">
              {description}
            </p>

            {bullets && bullets.length > 0 && (
              <ul className="space-y-3 border-t border-ink-700 pt-6">
                {bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-bone-200 text-sm"
                  >
                    <span className="text-ember mt-1.5 flex-shrink-0 text-xs">
                      ●
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            {children}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
