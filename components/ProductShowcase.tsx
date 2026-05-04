'use client';

import { motion } from 'framer-motion';
import ProductGallery from './ProductGallery';
import BuyButton from './BuyButton';
import type { Product } from '@/types/shopify';

interface ProductShowcaseProps {
  product: Product;
}

export default function ProductShowcase({ product }: ProductShowcaseProps) {
  const variant = product.variants.edges[0]?.node;
  const images = product.images.edges.map((e) => e.node);
  const price = variant?.price.amount || product.priceRange.minVariantPrice.amount;
  const compareAt = variant?.compareAtPrice?.amount;

  const priceNum = parseFloat(price);
  const compareAtNum = compareAt ? parseFloat(compareAt) : 0;
  const savings = compareAtNum - priceNum;
  const discount = compareAtNum
    ? Math.round((savings / compareAtNum) * 100)
    : 0;

  return (
    <section
      id="producto"
      className="relative py-24 md:py-40 bg-ink"
    >
      <div className="container-padded">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mb-16 md:mb-24"
        >
          <p className="eyebrow mb-6">Producto</p>
          <h2 className="display-heading text-display-lg text-bone text-balance">
            Diseñadas para
            <br />
            vivir contigo.
          </h2>
        </motion.div>

        <div id="comprar" className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-24"
          >
            <ProductGallery images={images} productTitle={product.title} />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-8"
          >
            {/* In stock indicator */}
            {variant?.availableForSale && (
              <div className="flex items-center gap-2.5">
                <span className="relative flex w-2 h-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
                </span>
                <span className="text-[11px] tracking-[0.18em] uppercase text-bone-300 font-medium">
                  En stock · Envío en 24h
                </span>
              </div>
            )}

            {/* Title */}
            <h3 className="display-heading text-3xl md:text-4xl lg:text-5xl text-bone tracking-tight leading-[1.05]">
              {product.title}
            </h3>

            {/* Price */}
            <div className="py-6 border-y border-ink-700">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-2">
                <span className="text-5xl md:text-6xl text-bone font-semibold tracking-tighter leading-none">
                  ${priceNum.toFixed(0)}
                </span>
                <span className="text-base text-smoke-400">USD</span>
                {compareAt && (
                  <>
                    <span className="text-base text-smoke-500 line-through decoration-1 ml-2">
                      ${compareAtNum.toFixed(0)}
                    </span>
                    {discount > 0 && (
                      <span className="text-[11px] tracking-[0.18em] uppercase bg-ember/15 text-ember px-2.5 py-1 rounded-md font-semibold">
                        -{discount}%
                      </span>
                    )}
                  </>
                )}
              </div>

              {savings > 0 && (
                <p className="mt-2 text-sm text-bone-300">
                  Ahorras ${savings.toFixed(0)} USD vs precio regular
                </p>
              )}
            </div>

            {/* Key specs */}
            <ul className="space-y-3 text-bone-200">
              {[
                'Cámara Sony 1080p HD con anti-shake',
                'Asistente de IA por voz integrado',
                'Traductor en tiempo real · 40 idiomas',
                'Audio direccional + 4 micrófonos',
              ].map((spec, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px]">
                  <span className="text-ember mt-1.5 flex-shrink-0 text-xs">●</span>
                  <span>{spec}</span>
                </li>
              ))}
            </ul>

            {/* Buy button */}
            <div className="pt-4">
              <BuyButton
                variantId={variant?.id || ''}
                available={variant?.availableForSale ?? false}
              />

              {/* WhatsApp discreto — não FAB, só link textual */}
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5521967440808'}?text=${encodeURIComponent('Hola! Tengo dudas sobre Lensmind™ Edition 01.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-sm text-smoke-400 hover:text-bone transition-colors group"
              >
                <span>¿Dudas? Chat por WhatsApp</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>

            {/* Trust badges visuais */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-ink-800">
              <div className="flex items-center gap-1.5 text-[10px] tracking-[0.15em] uppercase text-smoke-500">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Pago seguro SSL
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-tight text-smoke-400 px-2 py-1 border border-ink-700 rounded">VISA</span>
                <span className="text-[10px] font-bold tracking-tight text-smoke-400 px-2 py-1 border border-ink-700 rounded">MC</span>
                <span className="text-[10px] font-bold tracking-tight text-smoke-400 px-2 py-1 border border-ink-700 rounded">AMEX</span>
                <span className="text-[10px] font-bold tracking-tight text-smoke-400 px-2 py-1 border border-ink-700 rounded">MP</span>
              </div>
            </div>

            {/* Delivery info */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-6 border-t border-ink-700">
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-smoke-500 mb-1.5">
                  Entrega
                </p>
                <p className="text-sm text-bone-200">
                  10-17 días LATAM
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-smoke-500 mb-1.5">
                  Garantía
                </p>
                <p className="text-sm text-bone-200">
                  30 días · 1 año fábrica
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-smoke-500 mb-1.5">
                  Envío
                </p>
                <p className="text-sm text-bone-200">
                  Internacional · tracking activo
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-smoke-500 mb-1.5">
                  Pago
                </p>
                <p className="text-sm text-bone-200">
                  Visa · MC · MP · cuotas
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
