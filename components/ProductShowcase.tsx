'use client';

import { motion } from 'framer-motion';
import { Truck, Shield, RotateCcw, Zap, Eye, Users } from 'lucide-react';
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
      className="relative py-24 md:py-32 bg-ink overflow-hidden"
    >
      <div className="container mx-auto px-6">
        {/* Section heading */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <p className="text-[11px] tracking-[0.3em] uppercase text-ember mb-6 font-medium">
            · El Producto ·
          </p>
          <h2 className="display-heading text-5xl md:text-6xl text-balance">
            Diseñado para{' '}
            <span className="text-ember">vivir contigo</span>.
          </h2>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Galeria */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-24"
          >
            <ProductGallery images={images} productTitle={product.title} />
          </motion.div>

          {/* Detalhes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-7"
          >
            {/* Live activity badges */}
            <div className="flex flex-wrap items-center gap-3">
              {variant?.availableForSale && (
                <div className="flex items-center gap-2 text-xs">
                  <span className="relative flex w-2 h-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ember opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-ember" />
                  </span>
                  <span className="tracking-[0.15em] uppercase text-ember font-medium text-[11px]">
                    En stock
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-xs text-smoke-400">
                <Eye size={13} className="text-smoke-500" />
                <span>47 personas viendo ahora</span>
              </div>
            </div>

            {/* Eyebrow */}
            <p className="text-[11px] tracking-[0.3em] uppercase text-smoke-500">
              · {product.vendor || 'Lensmind'} · Edition 01
            </p>

            {/* Título */}
            <h2 className="display-heading text-3xl md:text-4xl lg:text-5xl text-balance leading-[1.05]">
              {product.title}
            </h2>

            {/* PRICE BLOCK — Refeito sem bug */}
            <div className="py-6 border-y border-ink-700">
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                <span className="text-4xl md:text-5xl text-bone font-light leading-none">
                  ${priceNum.toFixed(0)}
                </span>
                <span className="text-base text-smoke-400">USD</span>
                {compareAt && (
                  <>
                    <span className="text-base text-smoke-500 line-through decoration-1">
                      ${compareAtNum.toFixed(0)}
                    </span>
                    {discount > 0 && (
                      <span className="text-[10px] tracking-[0.2em] uppercase bg-ember/10 text-ember px-2.5 py-1 rounded-sm font-medium">
                        -{discount}%
                      </span>
                    )}
                  </>
                )}
              </div>

              {savings > 0 && (
                <p className="mt-3 text-xs text-ember font-medium">
                  ✨ Ahorras ${savings.toFixed(0)} USD comprando hoy
                </p>
              )}
            </div>

            {/* Bullet points */}
            <ul className="space-y-3 text-bone-200">
              {[
                'Cámara Sony 1080p HD con anti-shake',
                'Asistente de IA por voz integrado',
                'Traductor en tiempo real · 40 idiomas',
                'Audio direccional + 4 micrófonos',
              ].map((bullet, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="text-ember mt-1.5 flex-shrink-0">›</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Buy Button */}
            <div className="pt-2">
              <BuyButton
                variantId={variant?.id || ''}
                available={variant?.availableForSale ?? false}
              />
            </div>

            {/* Estimated delivery */}
            <div className="bg-ink-900/50 border-l-2 border-ember pl-4 py-3 text-sm">
              <p className="text-bone-200 font-medium">
                🚚 Entrega estimada:{' '}
                <span className="text-ember">15-22 de mayo, 2026</span>
              </p>
              <p className="text-xs text-smoke-400 mt-1">
                Pedidos de hoy se envían en 24h con seguimiento incluido
              </p>
            </div>

            {/* Value Stack */}
            <div className="glass p-5 rounded-sm">
              <p className="text-[11px] tracking-[0.25em] uppercase text-ember mb-4 font-medium">
                · Lo que incluye tu compra ·
              </p>
              <ul className="space-y-2.5 text-sm">
                <li className="flex items-center justify-between gap-3 pb-2.5 border-b border-ink-700/50">
                  <span className="text-bone-200">Lensmind™ Smart Glasses</span>
                  <span className="text-smoke-400">$329</span>
                </li>
                <li className="flex items-center justify-between gap-3 pb-2.5 border-b border-ink-700/50">
                  <span className="text-bone-200">Estuche premium + lentes</span>
                  <span className="text-smoke-400">Incluido</span>
                </li>
                <li className="flex items-center justify-between gap-3 pb-2.5 border-b border-ink-700/50">
                  <span className="text-bone-200">
                    🎁 Guía "50 Comandos IA"
                  </span>
                  <span className="text-smoke-500 line-through">$25</span>
                </li>
                <li className="flex items-center justify-between gap-3 pb-2.5 border-b border-ink-700/50">
                  <span className="text-bone-200">Envío express LATAM</span>
                  <span className="text-smoke-500 line-through">$20</span>
                </li>
                <li className="flex items-center justify-between gap-3 pt-2">
                  <span className="text-bone font-medium">
                    Valor total
                  </span>
                  <span className="text-smoke-500 line-through">$374</span>
                </li>
                <li className="flex items-center justify-between gap-3">
                  <span className="text-ember font-medium">Hoy pagas solo</span>
                  <span className="text-ember text-xl font-medium">$199</span>
                </li>
              </ul>
            </div>

            {/* Trust grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-ink-700">
              <div className="flex items-center gap-3 text-xs text-smoke-400">
                <Truck size={16} className="text-ember flex-shrink-0" />
                <span>Envío gratis · 10-17 días</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-smoke-400">
                <Shield size={16} className="text-ember flex-shrink-0" />
                <span>Pago 100% seguro</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-smoke-400">
                <RotateCcw size={16} className="text-ember flex-shrink-0" />
                <span>30 días de garantía</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-smoke-400">
                <Zap size={16} className="text-ember flex-shrink-0" />
                <span>Despacho en 24h</span>
              </div>
            </div>

            {/* Pagamento */}
            <div className="pt-6 border-t border-ink-700">
              <p className="text-[10px] tracking-[0.3em] uppercase text-smoke-500 mb-3">
                · Pagos Seguros ·
              </p>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-smoke-400">
                <span>💳 Visa</span>
                <span className="text-smoke-700">·</span>
                <span>💳 Mastercard</span>
                <span className="text-smoke-700">·</span>
                <span>💰 Mercado Pago</span>
                <span className="text-smoke-700">·</span>
                <span>🅿️ PayPal</span>
                <span className="text-smoke-700">·</span>
                <span>🍎 Apple Pay</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
