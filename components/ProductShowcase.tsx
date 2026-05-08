'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Shield, Lock, Truck, RefreshCw } from 'lucide-react';
import ProductGallery from './ProductGallery';
import BuyButton from './BuyButton';
import ReviewsBar from './ReviewsBar';
import PaymentMethods from './PaymentMethods';
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
      className="relative py-16 md:py-28 bg-ink"
    >
      <div className="container-padded">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mb-12 md:mb-16"
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
            className="space-y-7"
          >
            {/* In stock + Reviews compact */}
            <div className="space-y-3">
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

              {/* Reviews — placeholder estrutural com fonte Trustpilot */}
              <ReviewsBar compact />
            </div>

            {/* Title — brand-controlled, ignores Shopify's keyword-stuffed title */}
            <div className="space-y-2">
              <h3 className="display-heading text-3xl md:text-4xl lg:text-5xl text-bone tracking-tight leading-[1.05]">
                Lensmind™ Edition 01
              </h3>
              <p className="text-bone-300 text-sm md:text-base">
                Gafas inteligentes con IA · Cámara 1080p · Traductor 40 idiomas
              </p>
            </div>

            {/* Price */}
            <div className="py-6 border-y border-ink-700">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-2">
                <span className="text-5xl md:text-6xl text-bone font-semibold tracking-tighter leading-none">
                  ${priceNum.toFixed(2)}
                </span>
                <span className="text-base text-smoke-400">USD</span>
                {compareAt && (
                  <>
                    <span className="text-base text-smoke-500 line-through decoration-1 ml-2">
                      ${compareAtNum.toFixed(2)}
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
                  Ahorras ${savings.toFixed(2)} USD vs precio regular
                </p>
              )}
              {!savings && (
                <p className="mt-2 text-sm text-bone-300">
                  Precio de lanzamiento — sube cuando se agote esta serie
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

            {/* Buy button — sem link WhatsApp redundante (já tem WhatsAppCTABlock logo abaixo) */}
            <div className="pt-2">
              <BuyButton
                variantId={variant?.id || ''}
                available={variant?.availableForSale ?? false}
                value={priceNum}
              />
            </div>

            {/* Trust badges expandidos — quatro garantias-clave */}
            <div className="grid grid-cols-2 gap-3 pt-5 border-t border-ink-800">
              {[
                {
                  icon: RefreshCw,
                  label: '30 días',
                  sub: 'Devolución total',
                },
                {
                  icon: Truck,
                  label: 'Envío',
                  sub: 'Reverso pagado',
                },
                {
                  icon: Shield,
                  label: '1 año',
                  sub: 'Garantía fábrica',
                },
                {
                  icon: Lock,
                  label: 'SSL',
                  sub: 'Pago protegido',
                },
              ].map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.label}
                    className="flex items-center gap-3 px-3 py-2.5 bg-ink-900 border border-ink-700 rounded-xl"
                  >
                    <Icon
                      size={18}
                      className="text-ember flex-shrink-0"
                      strokeWidth={1.75}
                    />
                    <div className="leading-tight">
                      <p className="text-bone text-xs font-semibold">
                        {b.label}
                      </p>
                      <p className="text-smoke-400 text-[11px]">{b.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pago aceitos — logos oficiais coloridas */}
            <div className="pt-4">
              <PaymentMethods size="sm" variant="dark" />
            </div>

            {/* Privacy link — pivot competitivo */}
            <Link
              href="/privacidad-datos"
              className="inline-flex items-center gap-2 text-xs text-smoke-400 hover:text-ember transition-colors group pt-2"
            >
              <Shield size={13} strokeWidth={1.75} />
              <span>Conoce cómo protegemos tu privacidad</span>
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>

            {/* Delivery info */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 pt-6 border-t border-ink-700">
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-smoke-500 mb-1.5">
                  Entrega
                </p>
                <p className="text-sm text-bone-200">10-17 días LATAM</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-smoke-500 mb-1.5">
                  Aranceles
                </p>
                <p className="text-sm text-bone-200">Pueden aplicar</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-smoke-500 mb-1.5">
                  Tracking
                </p>
                <p className="text-sm text-bone-200">Activo desde día 3</p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.18em] uppercase text-smoke-500 mb-1.5">
                  Soporte
                </p>
                <p className="text-sm text-bone-200">Español · Portugués</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
